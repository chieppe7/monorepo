import { reactive } from 'vue'

const savedUser = localStorage.getItem('user')

export type UserData = {
  name: string,
  role: string,
}

export const authStore = reactive({
  user: savedUser ? JSON.parse(savedUser) : null,

  login(userData: UserData) {
    this.user = userData
    localStorage.setItem('user', JSON.stringify(userData))
  },

  logout() {
    this.user = null
    localStorage.removeItem('user')
  },

  isAdmin() {
    return this.user?.role === 'admin'
  }

})