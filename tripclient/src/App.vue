<script setup>
import Footer from "./components/common/Footer.vue";
import Navbar from "./components/common/Navbar.vue";
</script>

<template>
  <div class="layout">
    <Navbar />
    <div class="content">
      <RouterView />
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex-grow: 1;
}

footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px 0;
}
</style>

