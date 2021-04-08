<template>
  <h2 class="v-title">{{ title }}</h2>
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'

@Component({})
export default class VTitle extends Vue {
  @Prop({ required: true, type: String }) title!: string
}
</script>
<style lang="scss">
.v-title {
  text-align: center;
  color: $color-complementary--dark;
  background: url("~@/assets/images/white-brush-stroke.png") 50% 50%;
  background-size: 90%;
  font-size: 2rem;
  font-weight: 600;
  margin: 2rem 0rem;
  align-self: stretch;

  @include mobile {
    margin: 1rem 0rem;
    background-size: 100%;
  }
}
</style>
