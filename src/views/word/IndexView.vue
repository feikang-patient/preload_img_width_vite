<template>
    <div>
        <el-upload
            :limit="1"
            :file-list="fileList"
            accept=".docx"
            :beforeUpload="beforeUpload"
            action=""
        >
            <el-button size="small" type="warning">点击上传</el-button>
        </el-upload>
        <vue-office-docx :src="src" />
        <vue-office-docx
            :src="docx"
            style="height: 100vh"
            @rendered="renderedHandler"
            @error="errorHandler"
        />
    </div>
</template>
<script lang="ts" setup>
import VueOfficeDocx from '@vue-office/docx';
import '@vue-office/docx/lib/index.css';
import { ref } from 'vue';
const src = ref();
const docx =  'http://static.shanhuxueyuan.com/test6.docx' //设置文档网络地址，可以是相对地址
const fileList = ref([]);
const beforeUpload = (file: File) => {
    let reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (loadEvent: ProgressEvent<FileReader>) => {
        let arrayBuffer = loadEvent.target?.result as ArrayBuffer | null;
        src.value = arrayBuffer;
    };
    return false;
};
const renderedHandler = () => {
    console.log("渲染成功")
}
const errorHandler = ()=> {
    console.log("渲染失败")
}
</script>
