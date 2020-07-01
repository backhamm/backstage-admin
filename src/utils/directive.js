import Vue from 'vue'
import store from '../store'

export const hasRole = (role) => {
  return store.getters.roles.includes(role)
}

Vue.directive('auth', {
  inserted(el, binding, vnode) {
    const authList = store.getters.roles
    const val = binding.value
    if (Array.isArray(val)) {
      const arr = val.filter(item => authList.includes(item))
      !arr.length && vnode.elm.parentElement.removeChild(vnode.elm)
    } else {
      if (!authList.includes(val)) {
        vnode.elm.parentElement.removeChild(vnode.elm)
      }
    }
  }
})
