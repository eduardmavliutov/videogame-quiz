import { Context } from '@nuxt/types'
import { Route, NavigationGuardNext  } from 'vue-router'

export default (context: Context, to: Route) => {
  if (to.name === 'quiz-question' && !context.app.store?.getters('user/isAuthenticated')) {
    context.app.router?.push({
      name: 'auth'
    })
  }
}