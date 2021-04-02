import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'
import Quiz from '@/components/Quiz/Quiz.vue'
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
    component: Quiz,
    children: [
      {
        path: ':questionId',
        props: true,
        component: ActiveQuestion
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
