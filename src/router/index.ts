import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'
import Quiz from '@/components/Quiz/Quiz.vue'
import Auth from '@/views/Auth.vue'
import ActiveQuestion from '@/components/ActiveQuestion/ActiveQuestion.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/quiz/:quizId',
    component: Quiz
  },
  {
    path: '/quiz/:quizId/:questionId',
    props: ({ params }) => ({
      quizId: params.quizId,
      questionId: Number(params.questionId)
    }),
    component: ActiveQuestion
  },
  {
    path: '/auth/',
    component: Auth
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
