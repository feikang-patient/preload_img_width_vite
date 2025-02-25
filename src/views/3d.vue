<template>
    <div ref="container" class="three-container"></div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import * as THREE from 'three';
  
  const container = ref(null);
  
  onMounted(() => {
    // 创建场景
    const scene = new THREE.Scene();
  
    // 创建摄像机
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  
    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xeeeeee, 1);
    container.value.appendChild(renderer.domElement);
  
    // 添加环境光源和点光源，模拟光泽感
    const ambientLight = new THREE.AmbientLight(0x555555); // 环境光
    scene.add(ambientLight);
  
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(20, 20, 20);
    scene.add(pointLight);
  
    // 创建地球模型（白色球体，带有网格纹理）
    const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0xeeeeee,
      roughness: 0.1,
      metalness: 0.5,
      wireframe: true,
    });
    const earth = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(earth);
  
    // 创建多个小圆点（模拟地球表面上的连接点）
    const dotMaterial = new THREE.MeshBasicMaterial({ color: 0xff5733 });
    const dotGeometry = new THREE.SphereGeometry(0.1, 8, 8); // 小球体
    const dots = [];
    const linePositions = [];
  
    // 生成点的位置
    for (let i = 0; i < 50; i++) {
      const theta = Math.random() * Math.PI * 2; // 经度
      const phi = Math.random() * Math.PI - Math.PI / 2; // 纬度
  
      const x = 5 * Math.cos(phi) * Math.cos(theta);
      const y = 5 * Math.cos(phi) * Math.sin(theta);
      const z = 5 * Math.sin(phi);
  
      // 生成小圆点并添加到场景
      const dot = new THREE.Mesh(dotGeometry, dotMaterial);
      dot.position.set(x, y, z);
      dots.push(dot);
      scene.add(dot);
  
      // 创建线条，从中心到每个点
      linePositions.push(0, 0, 0, x, y, z); // 起点到终点
    }
  
    // 创建 BufferGeometry 来存储线条的顶点数据
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);
  
    // 设置摄像机位置
    camera.position.z = 15;
  
    // 动画循环
    function animate() {
      requestAnimationFrame(animate);
  
      // 球体旋转动画
      earth.rotation.x += 0.01;
      earth.rotation.y += 0.01;
  
      // 渲染场景
      renderer.render(scene, camera);
    }
  
    animate();
  
    // 窗口调整
    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });
  });
  </script>
  
  <style scoped>
  .three-container {
    width: 100%;
    height: 100vh;
    background-color: #f0f0f0;
  }
  </style>
  