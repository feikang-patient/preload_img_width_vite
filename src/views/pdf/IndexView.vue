<template>
    <div>
        <h2>pdf预览和打印</h2>
        <PdfPreview v-if="data && data.content" :pdf-url="data.content" />
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import PdfPreview from "./PdfPreview.vue";
const data = ref<any>(null);
data.value = {
    content:
        "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf",
};
</script>
<style scoped>
h2 {
    text-align: center;
}

/* https://github.com/hrynko/vue-pdf-embed?tab=readme-ov-file */
</style>
