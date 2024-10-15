/**
 * @param {File} targetFile 目标上传文件
 * @param {number} baseChunkSize 上传分块大小，单位Mb
 * @param {string} uploadUrl 上传文件的后端接口地址
 * @param {string} vertifyUrl 验证文件上传的接口地址
 * @param {string} mergeUrl 请求进行文件合并的接口地址
 * @param {Function} progress_cb 更新上传进度的回调函数
 * @returns {Promise}
 */

async function uploadFile(file, baseChunkSize, uploadUrl, vertifyUrl, mergeUrl, progress_cb) {
    //     1. 将文件进行分片并计算Hash值
    //            得到 allChunkList---所有分片   fileHash---文件的hash值
    //     2. 通过fileHash请求服务端，判断文件上传状态
    //            得到 neededFileList---待上传文件分片
    //     3. 同步上传进度，针对不同文件上传状态调用 progress_cb
    //     4. 发送上传请求
    //     5. 发送文件合并请求
}

/**
 * 将目标文件分片 并 计算文件Hash
 * @param {File} targetFile 目标上传文件
 * @param {number} baseChunkSize 上传分块大小，单位Mb
 * @returns {chunkList:ArrayBuffer,fileHash:string}
 */
async function sliceFile(targetFile, baseChunkSize = 1) {
    return new Promise((resolve, reject) => {
        //初始化分片方法，兼容问题
        let blobSlice =
            File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
        //分片大小 baseChunkSize Mb
        let chunkSize = baseChunkSize * 1024 * 1024;
        //分片数
        let targetChunkCount = targetFile && Math.ceil(targetFile.size / chunkSize);
        //当前已执行分片数
        let currentChunkCount = 0;
        //当前以收集的分片
        let chunkList = [];
        //创建sparkMD5对象
        let spark = new SparkMD5.ArrayBuffer();
        //创建文件读取对象
        let fileReader = new FileReader();
        let fileHash = null;

        //FilerReader onload事件
        fileReader.onload = (e) => {
            //当前读取的分块结果 ArrayBuffer
            const curChunk = e.target.result;
            //将当前分块追加到spark对象中
            spark.append(curChunk);
            currentChunkCount++;
            chunkList.push(curChunk);
            //判断分块是否全部读取成功
            if (currentChunkCount >= targetChunkCount) {
                //全部读取，获取文件hash
                fileHash = spark.end();
                resolve({ chunkList, fileHash });
            } else {
                loadNext();
            }
        };

        //FilerReader onerror事件
        fileReader.onerror = () => {
            reject(null);
        };

        //读取下一个分块
        const loadNext = () => {
            //计算分片的起始位置和终止位置
            const start = chunkSize * currentChunkCount;
            let end = start + chunkSize;
            if (end > targetFile.size) {
                end = targetFile.size;
            }
            //读取文件，触发onLoad
            fileReader.readAsArrayBuffer(blobSlice.call(targetFile, start, end));
        };

        loadNext();
    });
}

async function uploadFile2(file, baseChunkSize, uploadUrl, vertifyUrl, mergeUrl, progress_cb) {
    const { chunkList, fileHash } = await sliceFile(file, baseChunkSize);
    //所有分片 ArrayBuffer[]
    let allChunkList = chunkList;
    //需要上传的分片序列 number[]
    let neededChunkList = [];
    //上传进度
    let progress = 0;
    //发送请求,获取文件上传状态
    if (vertifyUrl) {
        const { data } = await requestInstance.post(vertifyUrl, {
            fileHash,
            totalCount: allChunkList.length,
            extname: '.' + file.name.split('.').pop()
        });
        const { neededFileList, message } = data;
        if (message) console.info(message);
        //无待上传文件，秒传
        if (!neededFileList.length) {
            progress_cb(100);
            return;
        }

        //部分上传成功，更新unUploadChunkList
        neededChunkList = neededFileList;
    }

    //同步上传进度，断点续传情况下
    progress = ((allChunkList.length - neededChunkList.length) / allChunkList.length) * 100;

    //上传
    if (allChunkList.length) {
        const requestList = allChunkList.map(async (chunk, index) => {
            if (neededChunkList.includes(index + 1)) {
                const response = await uploadChunk(chunk, index + 1, fileHash, uploadUrl);
                //更新进度
                progress += Math.ceil(100 / allChunkList.length);
                if (progress >= 100) progress = 100;
                progress_cb(progress);
                return response;
            }
        });
        Promise.all(requestList).then(() => {
            //发送请求，通知后端进行合并 //后缀名可通过其他方式获取，这里以.mp4为例
            requestInstance.post(mergeUrl, { fileHash, extname: '.mp4' });
        });
    }
}

/*

在上传时我们调用了uploadChunk()方法，由于我们的请求不仅包含文件，还包含分片索引以及hash值，
因此我们的请求体应该是formData，
还有一点需要就是此时我们传入的chunk的类型是ArrayBuffer,而formData中文件的类型应该是Blob。 
*/

async function uploadChunk(chunk, index, fileHash, uploadUrl) {
    let formData = new FormData();
    //注意这里chunk在之前切片之后未ArrayBuffer，而formData接收的数据类型为 blob|string
    formData.append('chunk', new Blob([chunk]));
    formData.append('index', index);
    formData.append('fileHash', fileHash);
    return requestInstance.post(uploadUrl, formData);
}

// 不能只是了解前端，还要掌握后端

/*
可能你看完前面还是不是很了解分片上传到底是如何工作的，这里我先给出一个示例，方便你更好的理解文件在后端是怎么变化的；

示例：假设此时我们上传一个10Mb的文件，分片大小为5MB，那么前端将传输两个分片；

服务端接收到一个请求，请求包含分片文件，整个文件的hash，以及分片的索引
然后服务端将会创建一个文件夹，文件夹名为hash值；
然后将分片命名为chunk-文件索引保存在文件夹中；
上述三个步骤就是我们判断文件上传状态的依据，我们只需要知道文件的hash以及文件的总分块数就可以判断了；
现在你是不是清楚多了，实际上前端的逻辑并不复杂，但是整个过程涉及多个请求，这样我们就要搞清楚后端到底干了什么才能更清楚的理解！
*/
