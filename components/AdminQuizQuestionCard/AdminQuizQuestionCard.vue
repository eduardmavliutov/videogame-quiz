<template>
  <div class="admin__quiz-question-card">
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
      class="quiz-question-card__cropper"
    />
    <footer class="quiz-question-card__footer">
      <label
        for="rightAnswer"
        class="quiz-question-card__title-label"
      >
        Right answer
      </label>
      <input
        :id="`rightAnswer${questionId}`"
        type="text"
        name="Right asnwer"
        :value="rightAnswer"
        class="quiz-question-card__title-input"
        @input="rightAnswerInputHandler($event.target.value)"
      >
    </footer>
    <div
      v-if="isEditMode"
      class="quiz-question-card__edit-buttons"
    >
      <v-button @click.native="saveQuestionButtonHandler">
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
    <span class="quiz-question-card__question-number"><i>{{ questionNumber }}</i></span>
    <transition name="quiz-question-card__delete-button">
      <button
        v-if="isEditMode"
        class="quiz-question-card__delete-button"
        @click="deleteButtonHandler"
      >
        X
      </button>
    </transition>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'
import VInput from '@/components/VInput/VInput.vue'
import { VueCroppa } from '@/types/vue-croppa'
import { ImageProps } from '@/types/image'

@Component({
  components: {
    VInput
  }
})
export default class AdminQuizQuestionCard extends Vue {
  @Prop({ required: true, type: Number }) questionId!: number
  @Prop({ required: true, type: String }) rightAnswer!: string
  @Prop({ required: false, type: Object }) image!: ImageProps

  private myCroppa = {} as VueCroppa

  private isEditMode = false

  /**
   * Computes current question's number 
   * @returns {string} computed question's number
   */
  private get questionNumber (): string {
    return `#${this.questionId + 1}`
  }

  /**
   * Method is triggered if 'Save' button is pressed. Updates
   * image's v-model in parent component and turnes off edit mode'
   */
  private saveQuestionButtonHandler (): void {
    const croppedImage = this.myCroppa.generateDataUrl()
    this.$emit('update:image', {
      src: croppedImage,
      alt: 'quiz-question-image'
    })
    this.isEditMode = false
  }

  /**
   * Updates rightAnswer's v-model in parent component trimming its value first
   */
  private rightAnswerInputHandler (value: string): void {
    this.$emit('update:rightAnswer', value.trim().toLowerCase())
  }

  /**
   * Turnes off the edit mode
   */
  private editButtonHandler (): void {
    this.isEditMode = true
  }

  /**
   * Method is triggered when 'Delete' button is pressed. Emits
   * 'delete-question' event to a parent component
   */
  private deleteButtonHandler (): void {
    if (confirm('Are you sure?')) {
      this.$emit('delete-question', this.questionId)
    }
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
.admin__quiz-question-card {
  position: relative;
  background: linear-gradient(
    to top,
    $main-color 20%,
    $color-white 40%,
    $color-white 100%
  );
  border-radius: 10px;
  padding: 1rem;
  width: 17rem;
  height: 27rem;
  box-shadow: $box-shadow--default;
  z-index: 1;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-between;
  transition: 0.3s all ease-out;

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

  .quiz-question-card {
    &__footer {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
    }

    &__title-label {
      font-weight: bold;
      font-size: 2rem;
      color: black;
    }

    &__title-input {
      align-self: stretch;
      font-size: 1.5rem;
      margin-bottom: 0.5rem;

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
      background: black;
    }

    &__cropper {
      margin-bottom: 1rem;
      box-shadow: 0 0 5px 2px black;
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

    &__question-number {
      position: absolute;
      bottom: 0;
      right: 0.5rem;
      font-size: 2rem;
      line-height: 2.5rem;
      color: rgba(255, 255, 255, 0.5);
    }

    &__delete-button {
      height: 100%;
      width: 30px;
      position: absolute;
      top: 0;
      left: -25px;
      z-index: -1;
      color: $color-white;
      font-weight: bold;
      background: linear-gradient(to right, red 30%, transparent 80%);
      border: none;
      border-bottom-left-radius: 10px;
      border-top-left-radius: 10px;
      transition: 0.3s all ease;

      &:hover {
        transform: translateX(-5px);
        font-size: 20px;
        border-left: 2px solid gray;
      }

      &:active {
        transform: translateX(-5px);
        font-size: 20px;
        color: black;
        border-left: 2px solid gray;
      }

      &-enter,
      &-leave-to {
        left: 0px;
        opacity: 0;
      }

      &-enter-to,
      &-leave {
        left: -25px;
        opacity: 1;
      }
    }
  }
}
.admin__question-card {
  background-color: rgba(255, 255, 255, 0.815);
  border-radius: 10px;
  padding: 1rem;
  width: 15rem;
  box-shadow: $box-shadow--default;
}
.card {
  &__image {
    overflow: hidden;
  }
}
</style>