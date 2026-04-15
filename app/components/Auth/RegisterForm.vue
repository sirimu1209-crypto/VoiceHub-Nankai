<template>
  <div class="register-form">
    <div class="form-header">
      <h2>创建账号</h2>
      <p>{{ siteTitleText }}</p>
    </div>

    <form :class="['auth-form', { 'has-error': !!error }]" @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="name">姓名</label>
        <div class="input-wrapper">
          <svg
            class="input-icon"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <input
            id="name"
            v-model="name"
            :class="{ 'input-error': error && nameError }"
            placeholder="请输入真实姓名"
            required
            type="text"
            @input="error = ''"
          >
        </div>
      </div>

      <div class="form-group">
        <label for="username">用户名</label>
        <div class="input-wrapper">
          <svg
            class="input-icon"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <input
            id="username"
            v-model="username"
            :class="{ 'input-error': error && usernameError }"
            placeholder="请输入用户名（仅支持英文、数字、下划线）"
            required
            type="text"
            @input="error = ''"
          >
        </div>
      </div>

      <div class="form-group">
        <label for="password">密码</label>
        <div class="input-wrapper">
          <svg
            class="input-icon"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <rect height="11" rx="2" ry="2" width="18" x="3" y="11" />
            <circle cx="12" cy="16" r="1" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <input
            id="password"
            v-model="password"
            :class="{ 'input-error': error && passwordError }"
            :type="showPassword ? 'text' : 'password'"
            placeholder="请输入密码（至少8个字符）"
            required
            @input="error = ''"
          >
          <button class="password-toggle" type="button" @click="showPassword = !showPassword">
            <svg
              v-if="showPassword"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
              />
              <line x1="1" x2="23" y1="1" y2="23" />
            </svg>
            <svg v-else fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        </div>
      </div>

      <div class="form-group">
        <label for="confirmPassword">确认密码</label>
        <div class="input-wrapper">
          <svg
            class="input-icon"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <rect height="11" rx="2" ry="2" width="18" x="3" y="11" />
            <circle cx="12" cy="16" r="1" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            :class="{ 'input-error': error && confirmPasswordError }"
            :type="showConfirmPassword ? 'text' : 'password'"
            placeholder="请再次输入密码"
            required
            @input="error = ''"
          >
          <button class="password-toggle" type="button" @click="showConfirmPassword = !showConfirmPassword">
            <svg
              v-if="showConfirmPassword"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
              />
              <line x1="1" x2="23" y1="1" y2="23" />
            </svg>
            <svg v-else fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        </div>
      </div>

      <div class="form-group">
        <label for="grade">年级</label>
        <div class="select-wrapper">
          <select
            id="grade"
            v-model="grade"
            :class="{ 'select-error': error && gradeError }"
            required
            @change="handleGradeChange"
          >
            <option value="">-- 请选择年级 --</option>
            <option value="高一年级">高一年级</option>
            <option value="高二年级">高二年级</option>
            <option value="高三年级">高三年级</option>
          </select>
          <svg
            class="select-icon"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      <div class="form-group">
        <label for="class">班级</label>
        <div class="input-wrapper">
          <svg
            class="input-icon"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <input
            id="class"
            v-model="selectedClass"
            :class="{ 'input-error': error && classError }"
            placeholder="请输入班级（正整数）"
            required
            type="number"
            min="1"
            step="1"
            @input="error = ''"
          >
        </div>
      </div>

      <div v-if="error" class="error-container">
        <svg
          class="error-icon"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" x2="12" y1="8" y2="12" />
          <line x1="12" x2="12.01" y1="16" y2="16" />
        </svg>
        <span class="error-message">{{ error }}</span>
      </div>

      <div v-if="success" class="success-container">
        <svg
          class="success-icon"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22,4 12,14.01 9,11.01" />
        </svg>
        <span class="success-message">{{ success }}</span>
      </div>

      <button :disabled="loading" class="submit-btn" type="submit">
        <svg v-if="loading" class="loading-spinner" viewBox="0 0 24 24">
          <circle
            cx="12"
            cy="12"
            fill="none"
            r="10"
            stroke="currentColor"
            stroke-dasharray="31.416"
            stroke-dashoffset="31.416"
            stroke-linecap="round"
            stroke-width="2"
          >
            <animate
              attributeName="stroke-dasharray"
              dur="2s"
              repeatCount="indefinite"
              values="0 31.416;15.708 15.708;0 31.416"
            />
            <animate
              attributeName="stroke-dashoffset"
              dur="2s"
              repeatCount="indefinite"
              values="0;-15.708;-31.416"
            />
          </circle>
        </svg>
        <span v-if="loading">注册中...</span>
        <span v-else>注册</span>
      </button>
    </form>

    <div class="form-footer">
      <p class="help-text">
        已有账号？
        <NuxtLink to="/login" class="login-link">立即登录</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSiteConfig } from '~/composables/useSiteConfig'
import { validateOAuthRegisterCredentials } from '~/utils/oauth-register'

const { siteTitle } = useSiteConfig()

const siteTitleText = computed(() => siteTitle.value || 'VoiceHub')

const name = ref('')
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const grade = ref('')
const selectedClass = ref('')
const error = ref('')
const success = ref('')
const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const gradeClassMap: Record<string, number> = {
  '高一年级': 20,
  '高二年级': 22,
  '高三年级': 22
}

const nameError = computed(() => name.value && (name.value.length < 2 || name.value.length > 50))
const usernameError = computed(() => {
  if (!username.value) return false
  if (username.value.length < 3 || username.value.length > 30) return true
  return !/^[a-zA-Z0-9_-]+$/.test(username.value)
})
const passwordError = computed(() => password.value && password.value.length < 8)
const confirmPasswordError = computed(() => confirmPassword.value && password.value !== confirmPassword.value)
const gradeError = computed(() => !grade.value)
const classError = computed(() => {
  if (!selectedClass.value) return false
  const num = parseInt(selectedClass.value)
  return isNaN(num) || num <= 0
})

const handleGradeChange = () => {
  selectedClass.value = ''
}

const handleRegister = async () => {
  error.value = ''
  success.value = ''

  if (!name.value) {
    error.value = '请输入姓名'
    return
  }

  if (nameError.value) {
    error.value = '姓名长度需要在2-50个字符之间'
    return
  }

  if (!username.value) {
    error.value = '请输入用户名'
    return
  }

  if (usernameError.value) {
    error.value = '用户名长度需要在3-30个字符之间，仅支持英文、数字、下划线和连字符'
    return
  }

  if (!password.value) {
    error.value = '请输入密码'
    return
  }

  if (passwordError.value) {
    error.value = '密码长度至少为8个字符'
    return
  }

  if (!confirmPassword.value) {
    error.value = '请确认密码'
    return
  }

  if (confirmPasswordError.value) {
    error.value = '两次输入的密码不一致'
    return
  }

  if (!grade.value) {
    error.value = '请选择年级'
    return
  }

  if (!selectedClass.value) {
    error.value = '请输入班级'
    return
  }

  const classNum = parseInt(selectedClass.value)
  if (isNaN(classNum) || classNum <= 0) {
    error.value = '班级必须是正整数'
    return
  }

  loading.value = true

  try {
    const response = await $fetch('/api/auth/register', {
      method: 'POST',
      body: {
        name: name.value,
        username: username.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
        grade: grade.value,
        class: selectedClass.value
      }
    })

    if (response.success) {
      success.value = '注册成功！正在跳转...'
      setTimeout(() => {
        navigateTo('/login?message=RegistrationSuccess')
      }, 1500)
    } else {
      error.value = '注册失败，请稍后重试'
    }
  } catch (err: any) {
    error.value = err.data?.message || err.message || '注册失败，请稍后重试'
    console.error('Registration error:', err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-form {
  width: 100%;
  max-width: 400px;
  animation: fadeInUp 0.4s ease both;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-header {
  text-align: center;
  margin-bottom: 32px;
}

.form-header h2 {
  font-size: 28px;
  font-weight: var(--font-bold);
  color: var(--text-primary);
  margin: 0 0 8px 0;
}

.form-header p {
  font-size: 16px;
  color: var(--text-tertiary);
  margin: 0;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-wrapper,
.select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.input-icon,
.select-icon {
  position: absolute;
  left: 12px;
  width: 20px;
  height: 20px;
  color: var(--text-tertiary);
}

input,
select {
  width: 100%;
  padding: 12px 12px 12px 44px;
  border: 1px solid var(--border-secondary);
  border-radius: var(--radius-lg);
  background: var(--bg-input);
  color: var(--text-primary);
  outline: none;
}

.password-toggle {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-secondary);
}

.error-container,
.success-container {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-radius: var(--radius-lg);
}

.error-container {
  background: rgba(255, 59, 48, 0.08);
  border: 1px solid rgba(255, 59, 48, 0.18);
  color: var(--text-danger);
}

.success-container {
  background: rgba(34, 197, 94, 0.08);
  border: 1px solid rgba(34, 197, 94, 0.18);
  color: var(--text-success);
}

.submit-btn {
  width: 100%;
  padding: 14px 20px;
  border: none;
  border-radius: var(--radius-xl);
  background: var(--primary);
  color: white;
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: background 0.2s ease;
}

.submit-btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.form-footer {
  text-align: center;
}

.help-text {
  color: var(--text-tertiary);
  font-size: 14px;
}

.login-link {
  color: var(--primary);
  text-decoration: none;
  font-weight: var(--font-semibold);
}

.login-link:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .register-form {
    padding: 0 8px;
  }
}
</style>
