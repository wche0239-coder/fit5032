<template>
  <div class="container mt-4">
    <h2>Firebase Sign In & Log Out</h2>
    <p class="text-muted">
      Sign in with credentials, switch user accounts, or log out from Firebase.
    </p>

    <!-- Current login status display card -->
    <div class="card p-3 mb-4 bg-light border-0">
      <div v-if="currentUser">
        <p class="mb-1"><strong>Status:</strong> <span class="badge bg-success">Signed In</span></p>
        <p class="mb-1"><strong>Current Email:</strong> {{ currentUser.email }}</p>
        <p class="mb-1">
          <strong>Role:</strong> <span class="badge bg-primary">{{ currentRole }}</span>
        </p>
        <p class="mb-0 text-muted small"><strong>UID:</strong> {{ currentUser.uid }}</p>
      </div>
      <div v-else>
        <p class="mb-0 text-muted">
          <strong>Status:</strong> <span class="badge bg-secondary">Signed Out</span> (No active
          session)
        </p>
      </div>
    </div>

    <!-- Standard credentials form -->
    <form @submit.prevent="handleSignIn">
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

      <!-- Action buttons: Sign In, Log Out, and Switch User -->
      <div class="d-flex gap-2">
        <button type="submit" class="btn btn-primary">Sign In</button>
        <button
          type="button"
          class="btn btn-danger"
          :disabled="!currentUser"
          @click="handleSignOut"
        >
          Log Out
        </button>
        <button type="button" class="btn btn-outline-secondary" @click="handleSwitchUser">
          Switch User
        </button>
      </div>
    </form>

    <!-- Status and feedback alerts -->
    <p v-if="errorMsg" class="text-danger mt-3">
      {{ errorMsg }}
      <router-link v-if="showRegisterLink" to="/fireregister" class="ms-2">
        Go to Register
      </router-link>
    </p>
    <p v-if="successMsg" class="text-success mt-3">{{ successMsg }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { auth } from '../Firebase/init'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'

const email = ref('')
const password = ref('')
const errorMsg = ref('')
const successMsg = ref('')
const showRegisterLink = ref(false)
const currentUser = ref(null)
const currentRole = ref('None')

// Preset user accounts for quick switching
const PRESET_USERS = [
  {
    role: 'Admin',
    email: 'wuiqing777@gmail.com',
    password: 'qwe123123！',
  },
  {
    role: 'Member',
    email: 'kylecheng404@gmail.com',
    password: 'qwe123123！',
  },
]

let activeIndex = 0

// 1. Standard email and password sign-in handler
const handleSignIn = async () => {
  errorMsg.value = ''
  successMsg.value = ''
  showRegisterLink.value = false

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user
    successMsg.value = `Signed in as ${user.email}`

    console.log(' [Developer Console] Firebase Sign-In Successful!')
    console.log('Current User Object (auth.currentUser):', auth.currentUser)
  } catch (error) {
    console.error(' [Developer Console] Sign-in Error:', error)
    if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
      errorMsg.value = 'Account not registered or incorrect password. Please register first!'
      showRegisterLink.value = true
    } else {
      errorMsg.value = `${error.code}: ${error.message}`
    }
  }
}

// 2. Sign-out handler
const handleSignOut = async () => {
  errorMsg.value = ''
  successMsg.value = ''
  showRegisterLink.value = false

  try {
    const prevEmail = auth.currentUser?.email || 'User'
    await signOut(auth)
    currentRole.value = 'None'
    email.value = ''
    password.value = ''
    successMsg.value = `${prevEmail} has been logged out.`

    console.log(' [Developer Console] User Logged Out.')
    console.log('Current User Object (auth.currentUser):', auth.currentUser)
  } catch (error) {
    console.error(' [Developer Console] Sign-out Error:', error)
    errorMsg.value = `${error.code}: ${error.message}`
  }
}

// 3. Switch user: cycles between preset accounts and signs in automatically
const handleSwitchUser = async () => {
  errorMsg.value = ''
  successMsg.value = ''
  showRegisterLink.value = false

  // Pick next target user in round-robin order
  const targetUser = PRESET_USERS[activeIndex % PRESET_USERS.length]
  activeIndex++

  email.value = targetUser.email
  password.value = targetUser.password

  try {
    const cred = await signInWithEmailAndPassword(auth, targetUser.email, targetUser.password)
    currentRole.value = targetUser.role
    successMsg.value = `Switched and signed in as ${targetUser.role} (${cred.user.email})`

    console.log(` [Developer Console] Switched User to [${targetUser.role}]`)
    console.log('Current User Object (auth.currentUser):', auth.currentUser)
  } catch (error) {
    console.error(' [Developer Console] Switch User Error:', error)
    if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
      errorMsg.value = `Account (${targetUser.email}) is not registered or incorrect password. Please register first!`
      showRegisterLink.value = true
    } else {
      errorMsg.value = `${error.code}: ${error.message}`
    }
  }
}

// 4. Listen for Firebase authentication state changes
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    currentUser.value = user
    if (user) {
      const match = PRESET_USERS.find((r) => r.email.toLowerCase() === user.email.toLowerCase())
      currentRole.value = match ? match.role : 'Custom User'
      console.log(' [onAuthStateChanged] Current signed-in user:', user)
    } else {
      currentRole.value = 'None'
      console.log(' [onAuthStateChanged] No user is signed in.')
    }
  })
})
</script>

<style scoped>
.container {
  max-width: 700px;
}
</style>
