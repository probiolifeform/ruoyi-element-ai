// src/routers/modules/dynamicRouter.ts
import router from '@/routers/index';
// import { useUserStore } from '@/stores';
import { useAuthStore } from '@/stores/modules/auth';

export async function initDynamicRouter() {
  // const userStore = useUserStore();
  const authStore = useAuthStore();

  try {
    // 1、获取菜单列表
    await authStore.requestAuthMenuList();
    console.log('authMenuList:', authStore.authMenuList);

    // 2、判断当前用户是否拥有菜单权限
    if (authStore.authMenuList == null || authStore.authMenuList.length === 0) {
      console.log('No menu permissions, skipping dynamic routes');
      return;
    }

    // 3、添加动态路由
    authStore.authMenuList.forEach((item: any) => {
      if (item.isFull === '0') {
        console.log('Adding full-screen route:', item);
        router.addRoute(item);
      }
      else {
        console.log('Adding layout route:', item);
        router.addRoute('layout', item);
      }
    });
  }
  catch (error) {
    console.error('Error in initDynamicRouter:', error);
  }
}
