<template>
  <v-page name="home">
    <quiz-list
      v-if="!loading"
      :quizes="quizes"
    />
    <v-loader v-else />
  </v-page>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import VPage from '@/components/VPage/VPage.vue'
import VLoader from '@/components/Loader/Loader.vue'
import QuizList from '@/components/QuizList/QuizList.vue'
import { Quiz } from '@/types/store/quiz/quiz.interface'

@Component({
  components: {
    VPage,
    QuizList,
    VLoader
  }
})
export default class Home extends Vue {
  // private quizes!: { [key: string]: Quiz }
  // ! временно пока доступ в firebase не будет возобновлен
  private quizes: { [key: string]: Quiz } = {
    '324rfsd': {
      id: '324rfsd',
      title: 'PS4 exclusives',
      image: {
        src: require('@/assets/images/quizes/ps4-exclusives/ps4-exclusives.jpeg'),
        alt: 'ps4-exclusives'
      },
      questions: [
        {
          rightAnswer: 'god of war',
          image: {
            src: require('@/assets/images/quizes/ps4-exclusives/god-of-war.jpeg'),
            alt: 'quiz-picture-alt'
          },
          imagePreview: {
            src: require('@/assets/images/quizes/ps4-exclusives/god-of-war-thumb.jpeg'),
            alt: 'quiz-picture-alt'
          },
          letterPool: [
            { value: 'f' },
            { value: 'g' },
            { value: 'o' },
            { value: 'd' },
            { value: 'w' },
            { value: 'o' },
            { value: 'f' },
            { value: 'a' },
            { value: '6' },
            { value: 'r' },
            { value: 'n' },
            { value: 'm' },
            { value: 'u' },
            { value: '5' }
          ],
          openedLetters: [
            { value: '' },
            { value: '' },
            { value: '' },
            { value: ' ' },
            { value: '' },
            { value: '' },
            { value: ' ' },
            { value: '' },
            { value: '' },
            { value: '' }
          ]
        },
        {
          rightAnswer: 'uncharted 4',
          image: {
            src: require('@/assets/images/quizes/ps4-exclusives/uncharted-4.jpeg'),
            alt: 'quiz-picture-alt'
          },
          imagePreview: {
            src: require('@/assets/images/quizes/ps4-exclusives/uncharted-4-thumb.jpeg'),
            alt: 'quiz-picture-alt'
          },
          letterPool: [
            { value: 'c' },
            { value: 'h' },
            { value: 'u' },
            { value: 'a' },
            { value: 'n' },
            { value: '4' },
            { value: 'd' },
            { value: 'n' },
            { value: 'e' },
            { value: 't' },
            { value: 'r' }
          ],
          openedLetters: [
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: ' ' },
            { value: '' }
          ]
        },
        {
          rightAnswer: 'persona 5',
          image: {
            src: require('@/assets/images/quizes/ps4-exclusives/persona-5.jpeg'),
            alt: 'quiz-picture-alt'
          },
          imagePreview: {
            src: require('@/assets/images/quizes/ps4-exclusives/persona-5-thumb.jpeg'),
            alt: 'quiz-picture-alt'
          },
          letterPool: [
            { value: 'e' },
            { value: 'p' },
            { value: 'r' },
            { value: 'o' },
            { value: 's' },
            { value: 'n' },
            { value: '5' },
            { value: '3' },
            { value: 'a' },
            { value: 'a' },
            { value: 's' },
            { value: 'a' },
            { value: 'w' },
            { value: 'm' }
          ],
          openedLetters: [
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: ' ' },
            { value: '' }
          ]
        }
      ],
    }
  }
  private loading = false

  async created () {
    // try {
    //   this.loading = true
    //   const snapshot = await this.$fire.database.ref('/quizes').once('value')
    //   this.quizes = snapshot.val()
    // } catch (error) {
    //   console.log(error)
    // } finally {
    //   this.loading = false
    // }
  }
}
</script>
