<!-- src/components/LoginDialog/components/FormLogin/AccountPassword.vue -->
<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus';
import type { LoginDTO, LoginUser } from '@/api/auth/types';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores';
import { useLoginFormStore } from '@/stores/modules/loginForm';
import { useSessionStore } from '@/stores/modules/session';

// Mock login function (replace with real API call when backend is available)
async function login(form: LoginDTO): Promise<{ data: { token: string; userInfo: LoginUser } }> {
  console.log('Mock login called with:', form);
  // Simulate successful login for specific credentials
  if (form.username === 'testuser' && form.password === 'password123') {
    return {
      data: {
        token: 'mock-token-12345',
        userInfo: {
          username: form.username,
          id: '123',
          email: 'testuser@example.com',
        },
      },
    };
  }
  throw new Error('Invalid credentials');
}

const userStore = useUserStore();
const sessionStore = useSessionStore();
const loginFromStore = useLoginFormStore();

const formRef = ref<FormInstance>();

const formModel = reactive<LoginDTO>({
  username: '',
  password: '',
});

const rules = reactive<FormRules<LoginDTO>>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});

const router = useRouter();
async function handleSubmit() {
  try {
    await formRef.value?.validate();
    const res = await login(formModel);
    console.log('Login response:', res);
    if (res.data.token) {
      userStore.setToken(res.data.token);
    }
    if (res.data.userInfo) {
      userStore.setUserInfo(res.data.userInfo);
    }
    ElMessage.success('登录成功');
    // Mock session list (replace with real call when backend is available)
    await sessionStore.requestSessionList(1, true);
    console.log('Navigating to home after login');
    router.push('/');
  }
  catch (error) {
    console.error('Login error:', error);
    ElMessage.error('登录失败，请检查用户名和密码');
  }
}
</script>

<template>
  <div class="custom-form">
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      style="width: 230px"
      @submit.prevent="handleSubmit"
    >
      <el-form-item prop="username">
        <el-input v-model="formModel.username" placeholder="请输入用户名">
          <template #prefix>
            <el-icon>
              <User />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="formModel.password"
          placeholder="请输入密码"
          type="password"
          show-password
        >
          <template #prefix>
            <el-icon>
              <Lock />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%" native-type="submit">
          登录
        </el-button>
      </el-form-item>
    </el-form>

    <!-- 注册登录 -->
    <div class="form-tip font-size-12px flex items-center">
      <span>没有账号？</span>
      <span
        class="c-[var(--el-color-primary,#409eff)] cursor-pointer"
        @click="loginFromStore.setLoginFormType('RegistrationForm')"
      >
        立即注册
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.custom-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.form-group {
  display: flex;
  gap: 8px;
  align-items: center;
}
.login-btn {
  padding: 12px;
  margin-top: 24px;
  color: white;
  cursor: pointer;
  background: #409eff;
  border: none;
  border-radius: 4px;
}
</style>
