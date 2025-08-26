// src/stores/modules/user.ts
import type { LoginUser } from '@/api/auth/types';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref<string | undefined>(undefined);
    const router = useRouter();

    const setToken = (value: string) => {
      console.log('Setting token:', value);
      token.value = value;
    };

    const clearToken = () => {
      console.log('Clearing token');
      token.value = undefined;
    };

    const userInfo = ref<LoginUser | undefined>(undefined);
    const setUserInfo = (value: LoginUser) => {
      console.log('Setting userInfo:', value);
      userInfo.value = value;
    };

    const clearUserInfo = () => {
      console.log('Clearing userInfo');
      userInfo.value = undefined;
    };

    const logout = async () => {
      console.log('Logging out, clearing token and userInfo');
      clearToken();
      clearUserInfo();
      console.log('Redirecting to login page');
      await router.push({ name: 'login' });
    };

    return {
      token,
      setToken,
      clearToken,
      userInfo,
      setUserInfo,
      clearUserInfo,
      logout,
    };
  },
  {
    persist: true, // Persist token and userInfo to localStorage
  },
);
