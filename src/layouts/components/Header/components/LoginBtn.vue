<!-- src/layouts/components/Header/components/LoginBtn.vue -->
<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

// Click handler: Redirect to login page
function handleClickLogin() {
  console.log('Login button clicked'); // Add this to confirm click
  router.push('/login');
}
</script>

<template>
  <div class="login-btn-wrapper">
    <div
      class="login-btn bg-#191c1f c-#fff font-size-14px rounded-8px flex-center text-overflow p-10px pl-12px pr-12px min-w-49px h-16px cursor-pointer hover:bg-#232629 select-none"
      @click="handleClickLogin"
    >
      登录
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
