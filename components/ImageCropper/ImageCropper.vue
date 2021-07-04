<template>
  <div class="image-cropper__backdrop">
    <div class="image-cropper__wrapper">
      <slim-cropper
        class="image-cropper"
        ref="cropper"
        :src="src"
      />
      <button @click="cropButtonHandler">CROP</button>
      <button>CANCEL</button>
    </div>
  </div>
</template>´
<script lang="ts">
import { Component, Prop, Vue, Ref } from 'nuxt-property-decorator'
import VBackDrop from '@/components/VBackDrop/VBackDrop.vue'
import { namespace } from 'vuex-class'
import { SetQuestionImageSrcPayload } from '@/types/store/questionForm/questionForm'

const cropperModule = namespace('cropper')
const newQuizQuestionModule = namespace('questionForm')

@Component({
  components: {
    VBackDrop
  }
})
export default class ImageCropper extends Vue {
  @cropperModule.Getter('src') src!: string
  @cropperModule.Mutation('CLEAR_SRC') CLEAR_SRC!: () => void
  @newQuizQuestionModule.Mutation('SET_QUESTION_IMAGE_SRC') SET_QUESTION_IMAGE_SRC!: (payload: SetQuestionImageSrcPayload) => void

  @Ref('cropper') private readonly cropper!: HTMLElement

  private async cropButtonHandler () {
    const blob = await this.$refs.cropper?.getCroppedBlob()
    const fileReader = new FileReader()
    fileReader.onloadend = () => {
      const src = `${fileReader.result}`;  
      this.SET_QUESTION_IMAGE_SRC({
        src
      })
      this.CLEAR_SRC()
    }
    fileReader.readAsDataURL(blob)
    
  }
}
</script>
<style lang="scss">

.image-cropper {
  &__backdrop {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: $transparent-background-color;
  }
  &__wrapper {
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
