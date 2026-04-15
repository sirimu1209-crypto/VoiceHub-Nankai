<template>
  <div class="register-form">
    <div class="form-header">
      <h2>创建南开之声账号</h2>
      <p>Nankai Secondary School</p>
    </div>

    <form :class="['auth-form', { 'has-error': !!error }]" @submit.prevent="handleRegister">
      <!-- 姓名 -->
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

      <!-- 用户名 -->
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

      <!-- 密码 -->
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

      <!-- 确认密码 -->
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

      <!-- 年级 -->
      <div class="form-group">
        <label for="grade">年级</label>
        <div class="select-wrapper">
          <select
            id="grade"
            v-model="grade"
            :class="{ 'select-error': error && gradeError }"
            required
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

      <!-- 班级 -->
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

      <!-- 错误提示 -->
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

      <!-- 成功提示 -->
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

      <!-- 提交按钮 -->
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

    <!-- 页脚 -->
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

// 年级对应的班级数量
const gradeClassMap: Record<string, number> = {
  '高一年级': 20,
  '高二年级': 22,
  '高三年级': 22
}

const classOptions = computed(() => {
  if (!grade.value) return []
  const maxClass = gradeClassMap[grade.value] || 0
  return Array.from({ length: maxClass }, (_, i) => i + 1)
})

// 验证字段错误
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
  // 重置班级选择
  selectedClass.value = ''
}

const handleRegister = async () => {
  // 清除之前的错误
  error.value = ''
  success.value = ''

  // 验证所有字段
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
      // 延迟跳转，让用户看到成功消息
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
  gap: 14px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 14px;
  font-weight: var(--font-medium);
  color: var(--text-secondary);
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper::after {
  content: '';
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 8px;
  height: 2px;
  background: var(--primary);
  border-radius: 2px;
  opacity: 0;
  transform: scaleX(0.2);
  transition:
    transform var(--transition-normal),
    opacity var(--transition-normal);
}

.input-wrapper:focus-within::after {
  opacity: 0.35;
  transform: scaleX(1);
}

.input-icon {
  position: absolute;
  left: 16px;
  width: 20px;
  height: 20px;
  color: var(--text-quaternary);
  z-index: 1;
}

.input-wrapper input {
  width: 100%;
  padding: 12px 12px 12px 44px;
  background: var(--input-bg);
  border: 1px solid var(--input-border);
  border-radius: var(--radius-lg);
  color: var(--input-text);
  font-size: 14px;
  transition:
    border-color var(--transition-normal),
    box-shadow var(--transition-normal);
}

.input-wrapper input::placeholder {
  color: var(--input-placeholder);
}

.input-wrapper input:focus {
  outline: none;
  border-color: var(--input-border-focus);
  box-shadow: var(--input-shadow-focus);
}

.input-wrapper input:focus + .input-icon,
.input-wrapper input:not(:placeholder-shown) + .input-icon {
  color: var(--primary);
}

.input-wrapper input:hover {
  filter: brightness(1.03);
}

.input-wrapper input.input-error {
  border-color: var(--error);
  box-shadow: 0 0 0 3px var(--error-light);
}

.password-toggle {
  position: absolute;
  right: 16px;
  width: 20px;
  height: 20px;
  background: none;
  border: none;
  color: var(--text-quaternary);
  cursor: pointer;
  transition:
    color 0.2s ease,
    transform var(--transition-fast);
  z-index: 1;
}

.password-toggle:hover {
  color: var(--text-primary);
}

.password-toggle:active {
  transform: scale(0.95);
}

.password-toggle svg {
  width: 100%;
  height: 100%;
}

.select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.select-wrapper::after {
  content: '';
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 8px;
  height: 2px;
  background: var(--primary);
  border-radius: 2px;
  opacity: 0;
  transform: scaleX(0.2);
  transition:
    transform var(--transition-normal),
    opacity var(--transition-normal);
}

.select-wrapper:focus-within::after {
  opacity: 0.35;
  transform: scaleX(1);
}

.select-icon {
  position: absolute;
  right: 12px;
  width: 20px;
  height: 20px;
  color: var(--text-quaternary);
  z-index: 1;
  pointer-events: none;
}

.select-wrapper select {
  width: 100%;
  padding: 12px 44px 12px 16px;
  background: var(--input-bg);
  border: 1px solid var(--input-border);
  border-radius: var(--radius-lg);
  color: var(--input-text);
  font-size: 14px;
  cursor: pointer;
  appearance: none;
  transition:
    border-color var(--transition-normal),
    box-shadow var(--transition-normal);
}

.select-wrapper select:hover:not(:disabled) {
  filter: brightness(1.03);
}

.select-wrapper select:focus {
  outline: none;
  border-color: var(--input-border-focus);
  box-shadow: var(--input-shadow-focus);
}

.select-wrapper select:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.select-wrapper select.select-error {
  border-color: var(--error);
  box-shadow: 0 0 0 3px var(--error-light);
}

.select-wrapper select option {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.error-container {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: var(--error-light);
  border: 1px solid var(--error-border);
  border-radius: var(--radius-lg);
  color: var(--error);
  font-size: 14px;
}

.success-container {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: var(--success-light);
  border: 1px solid var(--success-border);
  border-radius: var(--radius-lg);
  color: var(--success);
  font-size: 14px;
}

.auth-form.has-error {
  animation: shake 0.4s ease;
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }
  15% {
    transform: translateX(-6px);
  }
  30% {
    transform: translateX(6px);
  }
  45% {
    transform: translateX(-4px);
  }
  60% {
    transform: translateX(4px);
  }
  75% {
    transform: translateX(-2px);
  }
  90% {
    transform: translateX(2px);
  }
  100% {
    transform: translateX(0);
  }
}

.error-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.success-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.error-message {
  font-size: 14px;
  font-weight: var(--font-medium);
}

.success-message {
  font-size: 14px;
  font-weight: var(--font-medium);
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background: var(--btn-primary-bg);
  color: var(--btn-primary-text);
  border: 1px solid var(--btn-primary-border);
  border-radius: var(--radius-lg);
  font-size: 16px;
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition:
    background var(--transition-normal),
    box-shadow var(--transition-normal),
    transform var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  overflow: hidden;
  margin-top: 8px;
}

.submit-btn::before {
  content: none;
}

.submit-btn:hover:not(:disabled) {
  background: var(--btn-primary-hover);
  box-shadow: var(--shadow-lg);
  transform: translateY(-1px);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0);
}

.loading-spinner {
  width: 20px;
  height: 20px;
}

.form-footer {
  margin-top: 20px;
  text-align: center;
}

.help-text {
  font-size: 12px;
  color: var(--text-quaternary);
  margin: 0;
  line-height: 1.5;
}

.login-link {
  color: var(--primary);
  text-decoration: none;
  font-weight: var(--font-medium);
  transition: color var(--transition-fast);
}

.login-link:hover {
  color: var(--primary-hover);
  text-decoration: underline;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .form-header h2 {
    font-size: 24px;
  }

  .form-header p {
    font-size: 14px;
  }

  .input-wrapper input,
  .select-wrapper select {
    padding: 10px 10px 10px 40px;
    font-size: 16px; /* 防止iOS缩放 */
  }

  .submit-btn {
    padding: 12px;
    font-size: 16px;
  }

  .auth-form {
    gap: 16px;
  }
}
</style>
