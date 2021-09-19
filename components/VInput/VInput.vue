<template>
  <div class="v-input__wrapper">
    <label
      :for="inputId"
      class="v-input__label"
      :style="{ color: labelColor }"
    >
      {{ name }}
    </label>
    <input
      :id="inputId"
      :value="model"
      :type="type"
      class="v-input__input"
      :class="classes"
      :disabled="disabled"
      @input="inputHandler($event.target.value)"
    >
    <transition name="error">
      <small
        v-if="errors.length"
        class="v-input__error-message"
      >
        {{ errors[0] }}
      </small>
    </transition>
  </div>
</template>
<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator'
import { CssClasses } from '@/types/css-classes'

@Component({})
export default class VInput extends Vue {
  @Prop({ required: true, type: String }) name!: string
  @Prop({ required: true, type: String }) type!: string
  @Prop({ required: false, type: Array, default: () => [] }) errors!: string[]
  @Prop({ required: false, type: String, default: 'white' }) labelColor!: string
  @Prop({ required: false, type: Boolean, default: false }) disabled!: boolean
  @Prop({ required: true }) model!: string
  @Prop({ required: false, type: Boolean, default: false }) toLower!: boolean

  /**
   * Retrieves an id for input
   * @returns {string} computed id for input
   */
  private get inputId (): string {
    return `${this.name}${Math.random()}`
  }

  /**
   * Basing on prop values retrieves all css classes for component
   * @returns {CssClasses} object defining what classes will be applied
   */
  private get classes (): CssClasses {
    return {
      'v-input__input--error': this.errors.length > 0
    }
  }

  /**
   * Updates v-model of 'model' prop in parent component
   * @param {string} value - current value of the input
   */
  private inputHandler (value: string): void {
    this.$emit('update:model', this.toLower ? value.toLowerCase(): value)
  }
}
</script>
<style lang="scss">
.v-input {
  &__wrapper {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    margin-bottom: 1rem;
  }

  &__label {
    font-size: 2rem;
  }

  &__input {
    line-height: 2rem;
    font-size: 1.5rem;
    transition: all 0.3s ease-in;
    margin: 0.5rem 0;
    padding: 0 0.5rem;
    box-sizing: content-box;

    &--error {
      border: 2px solid $color-red;
    }

    &:focus {
      outline: none;
      box-shadow: $box-shadow--white;
    }
  }

  &__error-message {
    color: $color-black;
    font-size: 1rem;
    font-weight: bold;
  }
}

.error {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.4s ease-in-out;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }
  &-enter-to,
  &-leave {
    opacity: 1;
  }
}
</style>
