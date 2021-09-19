<template>
  <div class="admin__quiz-card">
    <header class="quiz-card__header">
      <label
        for="quizTitle"
        class="quiz-card__title-label"
      >
        Quiz title
      </label>
      <input
        id="quizTitle"
        type="text"
        name="Quiz title"
        :value="title"
        class="quiz-card__title-input"
        @input="titleInputHandler($event.target.value)"
      >
    </header>
    <hr class="quiz-card__line" />
    <croppa
      v-model="myCroppa"
      :height="400"
      :width="400"
      :disabled="!isEditMode"
      canvas-color="white"
      :show-remove-button="isEditMode"
      remove-button-color="red"
      :initial-image="image.src"
      :placeholder-font-size="16"
      class="quiz-card__cropper"
    />
    <div
      v-if="isEditMode"
      class="quiz-card__edit-buttons"
    >
      <v-button @click.native="cropImageButtonHandler">
        Save
      </v-button>
      <v-button @click.native="cancelButtonHandler">
        Cancel
      </v-button>
    </div>
    <v-button
      v-else
      @click.native="editButtonHandler"
    >
      Edit
    </v-button>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'
import VInput from '@/components/VInput/VInput.vue'
import VButton from '@/components/VButton/VButton.vue'
import { VueCroppa } from '@/types/vue-croppa'
import { ImageProps } from '@/types/image'

@Component({
  components: {
    VInput,
    VButton
  }
})
export default class AdminQuizCard extends Vue {
  @Prop({ required: false, type: String }) title!: string
  @Prop({ required: false, type: Object }) image!: ImageProps

  private myCroppa = {} as VueCroppa

  private isEditMode = false

  /**
   * Method is triggered if 'Crop' button is clicked. Updates image's v-model
   * in parent component
   */
  private cropImageButtonHandler (): void {
    const croppedImage = this.myCroppa.generateDataUrl()
    this.$emit('update:image', {
      src: croppedImage,
      alt: this.title.trim().toLowerCase().replaceAll(new RegExp(' ', 'g'), '-', )
    })
    this.isEditMode = false
  }

  /**
   * Updates title's v-model in parent component
   */
  private titleInputHandler (value: string): void {
    this.$emit('update:title', value.trim())
  }

  /**
   * Sets 'isEditMode' variable to true if 'Edit' button
   * is clicked
   */
  private editButtonHandler (): void {
    this.isEditMode = true
  }

  /**
   * Sets 'isEditMode' to false and refreshes Croppa component
   * if 'Cancel' button is clicked
   */
  private cancelButtonHandler (): void {
    this.isEditMode = false
    this.myCroppa.refresh()
  }

  /**
   * Sets 'isEditMode' variable to true if we are creating new quiz
   */
  created () {
    if (this.$route.params.id === 'new') {
      this.isEditMode = true
    }
  }
}
</script>
<style lang="scss">
.admin__quiz-card {
  width: 17rem;
  height: 27rem;
  position: relative;
  background: $main-color;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: $box-shadow--default;
  z-index: 1;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-between;

  &::after {
    content: "";
    background: url("~@/assets/images/questions.png");
    background-size: 50%;
    opacity: 0.05;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  }

  .quiz-card {
    &__header {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
    }

    &__title-label {
      font-weight: bold;
      font-size: 2rem;
    }

    &__title-input {
      align-self: stretch;
      font-size: 1.5rem;

      &:focus {
        outline: none;
        transition: 0.3s ease all;
        box-shadow: $box-shadow--white;
      }
    }

    &__line {
      margin: 1rem 0;
      align-self: stretch;
      border-radius: 10px;
    }

    &__cropper {
      margin-bottom: 1rem;
      box-shadow: 0 0 5px 2px $color-white;
      border-radius: 10px;

      canvas {
        border-radius: 10px;
      }

      .icon-remove {
        stroke-width: 3rem;
        stroke: black;
      }
    }

    &__edit-buttons {
      display: flex;
      justify-content: space-between;
      gap: 0.5rem;
    }
  }
}
</style>