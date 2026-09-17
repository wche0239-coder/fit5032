<template>
  <div class="container mt-4" style="max-width: 500px">
    <h2>Login</h2>

    <form @submit.prevent="handleSignIn" class="mt-3">
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          placeholder="Enter email"
          required
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          placeholder="Enter password"
          required
        />
      </div>

      <button type="submit" class="btn btn-primary w-100">Sign In</button>
    </form>

    <p v-if="errorMsg" class="text-danger mt-3">{{ errorMsg }}</p>
    <p v-if="successMsg" class="text-success mt-3">{{ successMsg }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '@/Firebase/init'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'

const email = ref('')
const password = ref('')
const errorMsg = ref('')
const successMsg = ref('')
const router = useRouter()

const handleSignIn = () => {
  errorMsg.value = ''
  successMsg.value = ''

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user
      successMsg.value = `Signed in as ${user.email}`
      console.log('✅ Signed in user:', user)
      console.log('Current user from auth:', auth.currentUser)
      router.push('/')
    })
    .catch((error) => {
      errorMsg.value = `${error.code}: ${error.message}`
      console.error('❌ Sign-in Error:', error)
    })
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('🔔 Current signed-in user:', user)
  } else {
    console.log('🔔 No user is signed in.')
  }
})
</script>
