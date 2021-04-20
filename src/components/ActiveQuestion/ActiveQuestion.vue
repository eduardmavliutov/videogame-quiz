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
import { CreateParticipatedQuizPaylod, EditLetterPayload, ParticipatedQuestion } from '@/types/store/user/user.interface'

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

  @userModule.Getter('isQuizParticipated') isQuizParticipated!: (quizId: string) => boolean
  @userModule.Getter('participatedQuestion') participatedQuestion!: (quizId: string, questionId: number) => ParticipatedQuestion
  @userModule.Mutation('CREATE_PARTICIPATED_QUIZ') CREATE_PARTICIPATED_QUIZ!: (payload: CreateParticipatedQuizPaylod) => void
  @userModule.Mutation('ADD_LETTER') ADD_LETTER!: (payload: EditLetterPayload) => void
  @userModule.Mutation('REMOVE_LETTER') REMOVE_LETTER!: (payload: EditLetterPayload) => void

  addLetterHandler (index: number) {
    this.ADD_LETTER({
      questionId: Number(this.questionId),
      quizId: this.quizId,
      value: index
    })
  }

  removeLetterHandler (index: number) {
    this.REMOVE_LETTER({
      questionId: Number(this.questionId),
      quizId: this.quizId,
      value: index
    })
  }

  // НАМ НАДО НА КАЖДЫЙ КЛИК ДЕЛАТЬ ЭКШН С ОТПРАВКОЙ
  // ДАННЫХ НА СЕРВЕР И ЗАГРУЖАТЬ ОБНОВЛЕННЫЕ ДАННЫЕ (НО Я НЕ УВЕРЕН)
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

  created (): void {
    // проверяем, что есть ли указанный квиз в списке квизов,
    // в которых участвовал пользователь
    // если у него нет ни квиза, ни вопроса,
    // то создаем и квиз, и вопрос

    if (!this.isQuizParticipated(this.quizId)) {
      this.CREATE_PARTICIPATED_QUIZ({
        quiz: this.quiz(this.quizId),
        quizId: this.quizId
      })
      console.log('создали квиз', this.participatedQuestion(this.quizId, Number(this.questionId)))
    } else {
      console.log('квиз не создавали', this.participatedQuestion(this.quizId, Number(this.questionId)))
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
