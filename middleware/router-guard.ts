import { Middleware } from '@nuxt/types'

const adminRequiredRoutes: string[] = ['admin-quizes', 'admin-quizes-id']

const authRequiredRoutes: string[] = ['quiz-question', 'user-settings', ...adminRequiredRoutes]

const routerMiddleware: Middleware = ({ store, route, redirect, $config, $fire }) => {
  const currentUser = $fire.auth.currentUser
  
  if (!store.getters['user/isAuthenticated'] && authRequiredRoutes.includes(`${route.name}`)) {
    redirect({
      name: 'auth'
    })
  }

  if (adminRequiredRoutes.includes(`${route.name}`) && currentUser?.email !== $config.secret) {
    redirect({
      name: 'index'
    })
  }
}

export default routerMiddleware
