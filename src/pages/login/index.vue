<!-- src/pages/login/index.vue -->
<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import logoPng from '@/assets/images/logo.png';
import AccountPassword from '@/components/LoginDialog/components/FormLogin/AccountPassword.vue';
import RegistrationForm from '@/components/LoginDialog/components/FormLogin/RegistrationForm.vue';
import QrCodeLogin from '@/components/LoginDialog/components/QrCodeLogin/index.vue';
import SvgIcon from '@/components/SvgIcon/index.vue';
import { useUserStore } from '@/stores';
import { useLoginFormStore } from '@/stores/modules/loginForm';

console.log('Login page script setup');

console.log('Login page mounted');
const router = useRouter();
const userStore = useUserStore();
const loginFromStore = useLoginFormStore();

const loginFormType = computed(() => {
  console.log('loginFormType:', loginFromStore.LoginFormType);
  return loginFromStore.LoginFormType || 'AccountPassword';
});

const isQrMode = ref(false);

function toggleLoginMode() {
  isQrMode.value = !isQrMode.value;
}

watch(() => userStore.token, (newToken) => {
  console.log('Token changed:', newToken);
  if (newToken) {
    router.push({ path: '/' });
  }
});
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <div class="left-section">
        <div class="logo-wrap">
          <img :src="logoPng" class="logo-img" alt="Logo">
          <span class="logo-text">Element Plus X</span>
        </div>
        <div class="ad-banner">
          <SvgIcon name="p-bangong" class-name="animate-up-down" />
        </div>
      </div>
      <div class="right-section">
        <div class="mode-toggle" @click.stop="toggleLoginMode">
          <SvgIcon v-if="!isQrMode" name="erweimadenglu" />
          <SvgIcon v-else name="zhanghaodenglu" />
        </div>
        <div class="content-wrapper">
          <div v-if="!isQrMode" class="form-box">
            <div v-if="loginFormType === 'AccountPassword'" class="form-container">
              <span class="content-title">登录后免费使用完整功能</span>
              <el-divider content-position="center">
                账号密码登录
              </el-divider>
              <AccountPassword />
            </div>
            <div v-if="loginFormType === 'RegistrationForm'" class="form-container">
              <span class="content-title">登录后免费使用完整功能</span>
              <el-divider content-position="center">
                邮箱注册账号
              </el-divider>
              <RegistrationForm />
            </div>
          </div>
          <div v-else class="qr-container">
            <QrCodeLogin />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0; /* Adjust to match company style */
}
.login-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1200px;
  height: 80%;
  overflow: hidden;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 24px rgb(0 0 0 / 10%);
}
.left-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  padding: 20px;
  background: linear-gradient(
    233deg,
    rgb(113 161 255 / 60%) 17.67%,
    rgb(154 219 255 / 60%) 70.4%
  );
}
.left-section .logo-wrap {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
}
.left-section .logo-img {
  width: 40px;
  height: 40px;
  padding: 4px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 8%);
  filter: drop-shadow(0 4px 4px rgb(0 0 0 / 10%));
}
.left-section .logo-text {
  font-size: 16px;
  font-weight: 600;
  color: #000000;
}
.left-section .ad-banner {
  position: relative;
  width: 100%;
  height: 100%;
}
.left-section .ad-banner .svg-icon {
  position: absolute;
  width: 100%;
  height: 310px;
}
.right-section {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 20px;
}
.right-section .content-wrapper {
  flex: 1;
  padding: 8px 0;
  overflow: auto;
}
.right-section .content-title {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 20px;
  font-weight: 700;
}
.right-section .mode-toggle {
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 24px;
  color: #000000;
  cursor: pointer;
  transition: color 0.3s;
}
.right-section .form-container,
.right-section .qr-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.right-section .form-box {
  width: 260px;
  height: 100%;
  padding: 20px;
  border-radius: 8px;
}

@media (width <= 800px) {
  .left-section {
    display: none;
  }
  .login-container {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
  .right-section {
    width: 100%;
    padding: 12px;
  }
  .content-wrapper {
    padding: 4px 0;
  }
}
.animate-up-down {
  animation: up-down 5s linear 0ms infinite;
}

@keyframes up-down {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
