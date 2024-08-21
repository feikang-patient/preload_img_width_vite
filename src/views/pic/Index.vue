<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
// loading-image
const imgUrl = ref(new URL('/src/assets/loading.png', import.meta.url).href);
let observer: IntersectionObserver;
onMounted(() => {
    // 注册观察者
    observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                // 获取到目标元素img标签
                const imgTarget = entry.target as HTMLImageElement;
                imgTarget.src = imgTarget.dataset.src ?? '';
                observer && observer.unobserve(imgTarget);
            }
        }
    });

    // 遍历所有class为lazy-image的图片
    const imgs: HTMLCollection = document.getElementsByClassName('lazy-image');
    for (const img of Array.from(imgs)) {
        img && observer.observe(img);
    }
    // 断开所有观察
    onUnmounted(() => {
        observer.disconnect();
    });
});
</script>

<template>
    <div class="card" v-for="item in 100" :key="item">
        <div>
            <img
                class="lazy-image"
                data-src="https://picsum.photos/id//400/300?random=1"
                :src="imgUrl"
                alt="某网站logo"
            />
        </div>
        <div>
            <img
                class="lazy-image"
                data-src="https://picsum.photos/id/257/400/300?random=2"
                :src="imgUrl"
                alt="某网站logo"
            />
        </div>
    </div>
</template>

<style scoped>
.lazy-image {
    width: 400px;
    height: 300px;
}
.read-the-docs {
    color: #888;
}
.card {
    display:  flex;
    padding: 10px;
}
</style>
