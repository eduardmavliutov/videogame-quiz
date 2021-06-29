import { Middleware } from '@nuxt/types'

const guardedRoutes: string[] = ['quiz-question', 'user-settings']

const routerMiddleware: Middleware = ({ store, route, redirect }) => {
  if (!store.getters['user/isAuthenticated'] && guardedRoutes.includes(`${route.name}`)) {
    redirect({
      name: 'auth'
    })
  }
}

export default routerMiddleware
