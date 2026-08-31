<template>
  <div class="login-view">
    <h1 class="mb-3">Member Login</h1>
    <p class="text-muted">Log in to access restricted areas of the library site.</p>

    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="login-username" class="form-label">Username</label>
        <input type="text" class="form-control" id="login-username" v-model="username" />
      </div>

      <div class="mb-3">
        <label for="login-password" class="form-label">Password</label>
        <input type="password" class="form-control" id="login-password" v-model="password" />
      </div>

      <div v-if="errorMessage" class="text-danger mb-3">{{ errorMessage }}</div>

      <button type="submit" class="btn btn-primary">Log In</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { login } from '../auth'

const username = ref('')
const password = ref('')
const errorMessage = ref(null)

const router = useRouter()
const route = useRoute()

const handleSubmit = () => {
  const success = login(username.value, password.value)

  if (success) {
    errorMessage.value = null
    // Activity 6.1: send the user back to whichever page they were
    // originally trying to reach (set by the navigation guard below),
    // or Home if they came here directly.
    const redirectTo = route.query.redirect || '/'
    router.push(redirectTo)
  } else {
    errorMessage.value = 'Invalid username or password'
  }
}
</script>

<style scoped>
.login-view {
  max-width: 400px;
  margin: 0 auto;
}
</style>
