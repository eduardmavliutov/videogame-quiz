<template>
  <v-page name="quiz-active-question">
    <v-title :title="`${quizTitle} / #${activeQuestionIdForTitle}`" />
    <div class="quiz-active-question__main">
      <v-card name="quiz-active-question">
        <template #image>
          <div class="quiz-active-question__image-wrapper">
            <img
              :src="activeQuestionImage.src"
              :alt="activeQuestionImage.alt"
              class="quiz-active-question__image"
            >
          </div>
        </template>
        <div class="quiz-active-question__bottom">
          <opened-letters
            :openedLetters="activeQuizQuestion.openedLetters"
            @remove-letter="removeLetterHandler"
          />
          <letter-pool
            :letterPool="activeQuizQuestion.letterPool"
            @add-letter="addLetterHandler"
          />
          <div class="quiz-active-question__opened-letters"></div>
        </div>
      </v-card>
    </div>
  </v-page>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import LetterPool from '@/components/ActiveQuestion/LetterPool.vue'
import OpenedLetters from '@/components/ActiveQuestion/OpenedLetters.vue'
import VPage from '@/components/VPage/VPage.vue'
import VTitle from '@/components/VTitle/VTitle.vue'
import VCard from '@/components/VCard/VCard.vue'
import { namespace } from 'vuex-class'
import { Quiz, QuizQuestion } from '@/types/store/quiz/quiz.interface'
import { ImageProps } from '@/types/image'
import { CreateParticipatedQuizPayload, EditLetterPayload, ParticipatedQuestion } from '@/types/store/user/user.interface'

const quizModule = namespace('quiz')
const userModule = namespace('user')

@Component({
  components: {
    LetterPool,
    OpenedLetters,
    VPage,
    VTitle,
    VCard
  }
})
export default class ActiveQuestion extends Vue {
  @Prop({ required: true, type: String }) quizId!: string
  @Prop({ required: true, type: String }) questionId!: string

  @quizModule.Getter('quizQuestion') quizQuestion!: (quizId: string, questionId: number) => QuizQuestion
  @quizModule.Getter('quiz') quiz!: (quizId: string) => Quiz
  @quizModule.Getter('quizQuestionImage') image!: (quizId: string, questionId: number) => ImageProps

  @userModule.State('quizes') participatedQuizes!: { [key: string]: ParticipatedQuestion[] }
  @userModule.Getter('isQuizParticipated') isQuizParticipated!: (quizId: string) => boolean
  @userModule.Getter('participatedQuestion') participatedQuestion!: (quizId: string, questionId: number) => ParticipatedQuestion
  @userModule.Action('createParticipatedQuiz') createParticipatedQuiz!: (payload: CreateParticipatedQuizPayload) => Promise<void>
  @userModule.Action('addLetter') addLetter!: (payload: EditLetterPayload) => void
  @userModule.Action('removeLetter') removeLetter!: (payload: EditLetterPayload) => void

  addLetterHandler (index: number): void {
    this.addLetter({
      questionId: Number(this.questionId),
      quizId: this.quizId,
      value: index
    })
  }

  removeLetterHandler (index: number): void {
    this.removeLetter({
      questionId: Number(this.questionId),
      quizId: this.quizId,
      value: index
    })
  }

  get quizTitle (): string {
    return this.quiz(this.quizId).title
  }

  get activeQuestionIdForTitle (): number {
    return +this.questionId + 1
  }

  get activeQuizQuestion (): ParticipatedQuestion {
    return this.participatedQuestion(this.quizId, Number(this.questionId))
  }

  get activeQuestionImage () {
    return this.image(this.quizId, Number(this.questionId))
  }

  async created (): Promise<void> {
    // Checking if current quiz is in participated quizes
    if (!this.isQuizParticipated(this.quizId)) {
      // if current quiz is not participated we create new participated
      // quiz and then we send that blank quiz to the server
      this.createParticipatedQuiz({
        quiz: this.quiz(this.quizId),
        quizId: this.quizId
      })
    }
  }
}
</script>
<style lang="scss">
.quiz-active-question {
  &__main {
    display: flex;
    align-items: center;
    flex-flow: column nowrap;
    flex-grow: 1;

    @include mobile {
      justify-content: center;
    }
  }

  &__image {
    @media screen and (max-width: 320px) {
      width: 90%;
      padding: 1rem 1rem 0rem;
    }

    &-wrapper {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
