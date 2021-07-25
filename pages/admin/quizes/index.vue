<template>
  <v-page name="admin">
    <v-title title="Admin panel" />
    <section class="admin__quiz-list-wrapper">
      <ul class="admin__quiz-list">
        <li
          v-for="quiz in quizes"
          :key="quiz.id"
        >
          <nuxt-link
            :to="{
              name: 'admin-quizes-id',
              params: { id: quiz.id }
            }"
          >
            {{ quiz.title }}
          </nuxt-link>
        </li>
      </ul>
    </section>
  </v-page>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import VPage from '@/components/VPage/VPage.vue'
import VTitle from '@/components/VTitle/VTitle.vue'
import { Quiz } from '@/types/store/quiz/quiz.interface'
import { namespace } from 'vuex-class'

const quizModule = namespace('quiz')

@Component({
  components: {
    VPage,
    VTitle
  },
  layout: 'admin',
  async asyncData ({ $fire }) {
    try {
      const snapshot = await $fire.database.ref('/quizes').once('value')
      const quizes = snapshot.val()
      return {
        quizes
      }
    } catch (error) {
      console.log(error)
    }
  }
})
export default class AdminPage extends Vue {
  private quizes!: Quiz[]

  quizClickHandler (index: number): void {
    console.log('I am heading to the quiz')
  }

  createQuizHandler (): void {
    console.log('New quiz is going to be created')
  }
}
</script>
<style lang="scss">
.admin {
  &__quiz-list-wrapper {
    margin-bottom: 2rem;
    padding: 1rem;
    display: flex;
    flex-flow: column wrap;
    justify-content: flex-start;
    align-items: center;
    align-self: stretch;
    background-color: rgba(255, 255, 255, 0.815);
    border-radius: 10px;
    flex-grow: 1;
  }
}
</style>