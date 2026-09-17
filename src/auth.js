import { ref } from 'vue'

const isAuthenticated = ref(false)
const currentUser = ref(null)

// 预设的多角色账号列表
export const PRESET_USERS = [
  {
    username: 'admin',
    password: 'admin123',
    role: 'Administrator',
    permissions: ['read', 'write', 'delete', 'manage_users'],
  },
  {
    username: 'librarian',
    password: 'lib123',
    role: 'Librarian',
    permissions: ['read', 'write', 'borrow_records'],
  },
  {
    username: 'member',
    password: 'member123',
    role: 'Library Member',
    permissions: ['read', 'borrow_self'],
  },
]

// 原有的普通表单登录
const login = (username, password) => {
  const found = PRESET_USERS.find((u) => u.username === username && u.password === password)
  if (found) {
    isAuthenticated.value = true
    currentUser.value = {
      username: found.username,
      role: found.role,
      permissions: found.permissions,
      authType: 'Local Mock Auth',
      timestamp: new Date().toLocaleTimeString(),
    }
    return true
  }
  return false
}

// 快速切换角色登录
const quickLogin = (role) => {
  const found = PRESET_USERS.find((u) => u.role.toLowerCase() === role.toLowerCase())
  if (found) {
    isAuthenticated.value = true
    currentUser.value = {
      username: found.username,
      role: found.role,
      permissions: found.permissions,
      authType: 'Preset Fast Switch',
      timestamp: new Date().toLocaleTimeString(),
    }
    return true
  }
  return false
}

const logout = () => {
  isAuthenticated.value = false
  currentUser.value = null
}

export { isAuthenticated, currentUser, login, quickLogin, logout }
