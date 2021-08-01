<template>
  <button
    class="v-button"
    :class="classes"
    :type="type"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class VButton extends Vue {
  @Prop({ required: false, type: String, default: 'button' }) type!: string
  @Prop({ required: false, type: Boolean, default: false }) disabled!: boolean

  get classes (): string {
    const classes = []

    if (this.disabled) {
      classes.push('v-button--disabled')
    }

    return classes.join(' ')
  }
}
</script>
<style lang="scss">
.v-button {
  padding: 0.2rem 1rem;
  background-color: $color-white;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  border: 1px solid $color-white;
  transition: 0.2s all ease;
  flex-shrink: 1;

  &:hover {
    box-shadow: 0 0 5px 2px $color-white;
    border: 1px solid gray;
  }

  &:active {
    box-shadow: 0 0 5px 2px $color-white;
    border: 1px solid gray;
    color: $color-white;
    background-color: rgba(128, 128, 128, 0.513);
  }

  &--disabled {
    color: gray;

    &:hover {
      box-shadow: none;
      border: 1px solid $color-white;
    }

    &:active {
      box-shadow: none;
      border: none;
      color: gray;
      background-color: rgba(128, 128, 128, 0.513);
    }
  }
}
</style>