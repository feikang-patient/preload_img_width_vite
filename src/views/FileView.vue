<template>
    <canvas id="canvas" width="450" height="240"></canvas>
    <button @click="saveSignature">保存签名</button>
    <img :src="dataUrls" />
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { fabric } from 'fabric';
onMounted(() => {
    // 实例化fabric canvas
    let canvas = new fabric.Canvas("canvas", {
        isDrawingMode: true,//表示可以进行绘图操作。
    });
});
const saveSignature = () => {
    let dataUrl = canvas.toDataURL({
        format: "png",
        quality: 1,
    });
    console.log(dataUrl);

}
</script>
