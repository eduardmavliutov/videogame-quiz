<template>
  <v-page name="admin">
    <v-title
      title="Admin panel"
    />
    <section class="admin__main-wrapper">
      <admin-side-bar
        :quizes="quizes"
        @select-quiz="onQuizClickHandler"
      />
      <admin-quiz-question-list :quiz="quizes[selectedQuiz]"/>
    </section>
  </v-page>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import VPage from '@/components/VPage/VPage.vue'
import VTitle from '@/components/VTitle/VTitle.vue'
import { Quiz } from '@/types/store/quiz/quiz.interface'
import AdminSideBar from '@/components/AdminSideBar/AdminSideBar.vue'
import AdminQuizQuestionList from '@/components/AdminQuizQuestionList/AdminQuizQuestionList.vue'

@Component({
  components: {
    VPage,
    VTitle,
    AdminSideBar,
    AdminQuizQuestionList
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
  private selectedQuiz = 0

  onQuizClickHandler (index: number) {
    this.selectedQuiz = index
  }
}
</script>
<style lang="scss">
.admin {
  &__main-wrapper {
    margin-bottom: 2rem;
    display: grid;
    grid-template-columns: 25% 75%;
    align-items: stretch;
    gap: 1vw;
    flex-grow: 1;
  }
}
</style>