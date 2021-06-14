<template>
  <validation-provider
    v-slot="{ errors }"
    :rules="rules"
    :name="name"
    class="v-input__wrapper"
  >
    <label
      :for="name"
      class="v-input__label"
    >
      {{ name }}
    </label>
    <input
      :value="model"
      :type="type"
      :id="name"
      class="v-input__input"
      :class="{ 'v-input__input--error' : errors.length}"
      @input="$emit('update:model', $event.target.value)"
    />
    <transition name="error">
      <small
        v-if="errors.length"
        class="v-input__error-message"
      >
        {{ errors[0] }}
      </small>
    </transition>
  </validation-provider>
</template>
<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import { ValidationProvider } from 'vee-validate'

@Component({
  components: {
    ValidationProvider
  }
})
export default class VInput extends Vue {
  @Prop({ required: true, type: String }) rules!: string
  @Prop({ required: true, type: String }) name!: string
  @Prop({ required: true, type: String }) type!: string
  @Prop({ required: false, type: Boolean, default: false }) disabled!: boolean
  @Prop({ required: true }) model!: string
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
