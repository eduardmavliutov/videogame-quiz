<template>
  <button
    class="v-button"
    :class="classes"
    :type="type"
    :disabled="disabled"
  >
    <slot v-if="!loading" />
    <div
      v-else
      class="lds-ellipsis"
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </button>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { CssClasses } from '@/types/css-classes'

@Component
export default class VButton extends Vue {
  @Prop({ required: false, type: String, default: 'button' }) type!: string
  @Prop({ required: false, type: Boolean, default: false }) disabled!: boolean
  @Prop({ required: false, type: Boolean, default: false }) loading!: boolean

  /**
   * Basing on prop values retrieves all css classes for component
   * @returns {CssClasses} object defining what classes will be applied
   */
  private get classes (): CssClasses {
    return {
      'v-button': true,
      'v-button--disabled': this.disabled
    }
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
  transition: 0.3s all ease;
  flex-shrink: 1;
  position: relative;

  &:hover {
    box-shadow: $box-shadow--buttons;
    transform: scale(1.1);
  }

  &:active {
    box-shadow: 2px 4px 5px 2px $color-white;
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

.lds-ellipsis {
  display: inline-block;
  width: 5rem;
  height: 1rem;
}
.lds-ellipsis div {
  position: absolute;
  top: 25%;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: $main-color;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 22%;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 22%;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 44%;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 66%;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(20px, 0);
  }
}
</style>