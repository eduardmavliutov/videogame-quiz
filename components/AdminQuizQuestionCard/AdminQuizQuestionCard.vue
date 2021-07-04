<template>
  <div class="admin__question-card">
    <div
      v-if="quizQuestion"
      class="card__image"
    >
      <img :src="quizQuestion.image.src" />
    </div>
    <div v-if="isNew">
      <input
        type="file"
        accept="image/*"
        ref="file"
        @change="uploadFileHandler($refs.file.files[0])"
      />
      <img :src="imageSrc" />
    </div>
    <v-input
      rules="required"
      type="text"
      name="rightAnswer"
      :model.sync="rightAnswer"
    />
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'
import VInput from '@/components/VInput/VInput.vue'
import { QuizQuestion } from '@/types/store/quiz/quiz.interface'
import { SetSrcPayload } from '@/types/store/cropper/cropper.interface'
import { namespace } from 'vuex-class'

const cropperModule = namespace('cropper')
const questionFormModule = namespace('questionForm')

@Component({
  components: {
    VInput
  }
})
export default class AdminQuizQuestionCard extends Vue {
  @Prop({ required: false, type: Object }) quizQuestion!: QuizQuestion
  @Prop({ required: false, type: Number }) questionId!: number
  @Prop({ required: false, type: String }) quizId!: string
  @Prop({ required: false, type: Boolean, default: false }) isNew!: boolean

  @cropperModule.Mutation('SET_SRC') SET_SRC !: (payload: SetSrcPayload) => void
  @questionFormModule.Getter('rightAnswer') rightAnswer!: string
  @questionFormModule.Getter('imageSrc') imageSrc!: string


  private uploadFileHandler (file: Blob) {
    const onImageLoad = () => {
      if (this.questionId && this.quizId) {
        this.SET_SRC({
          src: String(fileReader.result),
          quizData: {
            questionId: this.questionId,
            id: this.quizId
          }
        })
      } else {
        this.SET_SRC({
          src: String(fileReader.result),
        })
      }
      
      fileReader.removeEventListener('load', onImageLoad)
    }
    const fileReader = new FileReader()
    fileReader.addEventListener('load', onImageLoad)
    fileReader.readAsDataURL(file)
  }
}
</script>
<style lang="scss">
.admin__question-card {
  background-color: rgba(255, 255, 255, 0.815);
  border-radius: 10px;
  padding: 1rem;
  width: 15rem;
  height: 15rem;
  box-shadow: $box-shadow--default;
}
.card {
  &__image {
    overflow: hidden;
  }
}
</style>