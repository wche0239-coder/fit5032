import { ref } from 'vue'

// Activity 6.1: Simple global authentication state.
// Because this ref is created once at module load and exported, every
// component that imports it shares the SAME reactive reference — that's
// what makes it behave like a tiny global store without needing Pinia.
const isAuthenticated = ref(false)

// Hardcoded credentials for this exercise (Activity 6.1, hint 2).
const VALID_USERNAME = 'admin'
const VALID_PASSWORD = 'admin123'

const login = (username, password) => {
  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    isAuthenticated.value = true
    return true
  }
  return false
}

const logout = () => {
  isAuthenticated.value = false
}

export { isAuthenticated, login, logout }
