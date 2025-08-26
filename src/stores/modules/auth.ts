// src/stores/modules/auth.ts
import { defineStore } from 'pinia';

// 权限状态管理
export const useAuthStore = defineStore('auth', () => {
  // 权限菜单列表
  const authMenuList = ref<any[]>([]);

  // 请求权限菜单列表
  const requestAuthMenuList = async () => {
    // Mock response (replace with actual API call when backend is ready)
    authMenuList.value = [];
    console.log('requestAuthMenuList called, authMenuList:', authMenuList.value);
  };

  return {
    authMenuList,
    requestAuthMenuList,
  };
});
