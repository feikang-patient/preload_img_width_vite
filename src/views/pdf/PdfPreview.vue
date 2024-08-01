<template>
    <div v-loading="state.loading" element-loading-text="加载中。。。">
        <div v-show="!state.loading" class="pdf-preview">
            <div class="pdf-wrap">
                <vue-pdf-embed
                    ref="pdfRef"
                    :source="state.source"
                    :style="scale"
                    :page="state.pageNum"
                    @rendered="handleDocumentRender"
                />
            </div>
            <div class="page-tool">
                <div class="page-tool-item" @click="lastPage">上一页</div>
                <div class="page-tool-item" @click="nextPage">下一页</div>
                <div class="page-tool-item">
                    {{ state.pageNum }}/{{ state.numPages }}
                </div>
                <div class="page-tool-item" @click="pageZoomOut">放大</div>
                <div class="page-tool-item" @click="pageZoomIn">缩小</div>
                <div class="page-tool-item" @click="downloadPDF">下载</div>
                <div class="page-tool-item" @click="printPdf">打印</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, defineProps } from "vue";
import VuePdfEmbed from "vue-pdf-embed";

import { reactive, onMounted, computed, watch } from "vue";

const props = defineProps({
    pdfUrl: {
        type: String,
        required: true,
    },
});
const pdfRef = ref<any>();
const totalPage = ref<number>();
const state = reactive({
    source: props.pdfUrl, // 预览pdf文件地址
    pageNum: 0, //当前页面
    scale: 1, // 缩放比例
    numPages: 0, // 总页数
    loading: true, //加载效果
});
// 下载pdf
function downloadPDF() {
    // fetch(encodeURI(props.pdfUrl)).then((res) => {
    //     res.blob().then((myBlob) => {
    //         const href = URL.createObjectURL(myBlob);
    //         const a = document.createElement("a");
    //         a.href = href;
    //         a.download = "test.pdf"; // 下载文件重命名，并指定文件扩展名为 ".pdf"
    //         document.body.appendChild(a); // 将<a>元素添加到文档中，以便进行点击下载
    //         a.click();
    //         document.body.removeChild(a); // 下载完成后移除<a>元素
    //     });
    // });
    pdfRef.value.download("test.pdf");
}

onMounted(() => {
    // state.pageNum = 1;
});
const scale = computed(() => `transform:scale(${state.scale})`);

const lastPage = () => {
    if (state.pageNum > 1) {
        state.pageNum -= 1;
    }
};

const nextPage = () => {
    if (state.pageNum < state.numPages) {
        state.pageNum += 1;
    }
};

const pageZoomOut = () => {
    if (state.scale < 2) {
        state.scale += 0.1;
    }
};

const pageZoomIn = () => {
    if (state.scale > 1) {
        state.scale -= 0.1;
    }
};
watch(totalPage, () => {
    state.pageNum = 1;
    console.log("watch");
});
const handleDocumentRender = () => {
    state.loading = false;
    state.numPages = pdfRef.value.pageCount;
    totalPage.value = state.numPages;
    console.log(state.numPages);
    console.log(state.pageNum);
};
const printPdf = () => {
    pdfRef.value.print(50, "test", false);
};
</script>
<style lang="less" scoped>
.pdf-preview {
    position: relative;
    padding: 20px 0;
    height: 100%;
    background-color: #e9e9e9;
    box-sizing: border-box;
}

.pdf-wrap {
    overflow-y: auto;
}

.vue-pdf-embed {
    margin: 0 auto;
    width: 515px;
    text-align: center;
    border: 1px solid #e5e5e5;
    box-sizing: border-box;
}

.page-tool {
    position: absolute;
    bottom: 35px;
    z-index: 100;
    display: flex;
    align-items: center;
    padding-right: 15px;
    padding-left: 15px;
    margin-left: 50%;
    color: white;
    background: rgb(66 66 66);
    border-radius: 19px;
    cursor: pointer;
    transform: translateX(-50%);
}

.page-tool-item {
    padding: 8px 15px;
    padding-left: 10px;
    cursor: pointer;
}
</style>
