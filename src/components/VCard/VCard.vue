<template>
  <div :class="`v-card v-card--${name}`">
    <slot
      class="v-card-image"
      name="image"
    ></slot>
    <div class="v-card-content">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class VCard extends Vue {
  @Prop({ required: true, type: String }) name!: string
}
</script>
<style lang="scss">
.v-card {
  display: flex;
  justify-content: center;
  flex-flow: row nowrap;
  box-shadow: $box-shadow--dark;

  &-content {
    padding: 1rem;
    background-color: $main-color;
    position: relative;
    display: flex;
    justify-content: center;
    backdrop-filter: blur(2px);
    flex-flow: column nowrap;
    flex-grow: 2;
    &::after {
      content: "";
      background: url("~@/assets/images/questions.png");
      background-size: 10%;
      opacity: 0.05;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      position: absolute;
      z-index: -1;
    }
  }

  &--quiz-active-question {
    width: 80%;
  }

  &--auth {
    width: 60%;
  }
}
</style>
