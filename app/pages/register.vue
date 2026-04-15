<template>
  <div class="auth-layout">
    <div class="auth-container">
      <div class="form-section">
        <div class="logo-row">
          <img
            v-if="schoolLogoHomeUrl && schoolLogoHomeUrl.trim()"
            :src="schoolLogoHomeUrl"
            alt="学校Logo"
            class="school-logo"
          >
        </div>
        <ClientOnly>
          <RegisterForm />
        </ClientOnly>
      </div>
    </div>
    <!-- 页脚信息显示 -->
    <SiteFooter />
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import RegisterForm from '~/components/Auth/RegisterForm.vue'
import logo from '~~/public/images/logo.svg'
import { useSiteConfig } from '~/composables/useSiteConfig'

// 使用站点配置
const { siteTitle, initSiteConfig, logoUrl, schoolLogoHomeUrl, icp: icpNumber } = useSiteConfig()

// 主品牌Logo优先使用SVG，其次使用站点配置中非ICO的地址
const brandLogoSrc = computed(() => {
  const url = logoUrl.value
  if (url && !url.endsWith('.ico')) return url
  return logo
})

// 在组件挂载后初始化站点配置
onMounted(async () => {
  // 初始化站点配置
  await initSiteConfig()

  // 设置页面标题
  if (typeof document !== 'undefined' && siteTitle.value) {
    document.title = `注册 | ${siteTitle.value}`
  }
})
</script>

<style scoped>
.auth-layout {
  min-height: 100vh;
  background: var(--bg-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  /* 响应式尺寸变量 */
  --brand-logo-size: clamp(48px, 8vw, 96px);
  --school-logo-size: clamp(96px, 16vw, 160px);
  --logo-gap: clamp(12px, 2vw, 24px);
  --divider-height: clamp(32px, 10vw, 96px);
  --content-footer-gap: clamp(16px, 4vh, 40px);
}

.auth-container {
  width: 100%;
  max-width: 480px;
  background: var(--bg-secondary);
  border-radius: var(--radius-2xl);
  border: 1px solid var(--border-primary);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  margin: auto 0; /* 在纵向布局中居中 */
  margin-bottom: var(--content-footer-gap); /* 与底部footer保持最小距离 */
}

.form-section {
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.form-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: none;
  opacity: 0;
}

.form-section > * {
  position: relative;
  z-index: 1;
}

.logo-row {
  text-align: center;
  margin-bottom: 28px;
  margin-top: 8px;
}

.school-logo {
  max-width: 150px;
  height: auto;
  max-height: 60px;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15));
  transition: transform var(--transition-slow), filter var(--transition-slow);
}

.school-logo:hover {
  transform: translateY(-3px) scale(1.02);
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.25));
}

/* 响应式设计 */
@media (max-width: 480px) {
  .auth-layout {
    padding: 12px;
  }

  .auth-container {
    max-width: 100%;
    border-radius: var(--radius-xl);
  }

  .form-section {
    padding: 24px;
  }

  .logo-row {
    margin-bottom: 16px;
  }

  .school-logo {
    max-height: 100px;
  }
}
</style>
