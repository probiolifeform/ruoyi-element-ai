// src/stores/modules/loginForm.ts
import { defineStore } from 'pinia';

type LoginFormType = 'AccountPassword' | 'RegistrationForm';

export const useLoginFormStore = defineStore(
  'loginForm',
  () => {
    const LoginFormType = ref<LoginFormType>('AccountPassword');

    // 设置登录表单类型
    const setLoginFormType = (type: LoginFormType) => {
      console.log('Setting LoginFormType to:', type);
      LoginFormType.value = type;
    };

    return {
      LoginFormType,
      setLoginFormType,
    };
  },
  {
    persist: true, // Persist LoginFormType to localStorage
  },
);
