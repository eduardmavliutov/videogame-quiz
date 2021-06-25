<template>
  <main :class="`v-page v-page-${name}`">
    <div class="v-page-container">
      <slot></slot>
    </div>
  </main>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class VPage extends Vue {
  @Prop({ required: true, type: String }) name!: string
}
</script>
<style lang="scss">
.v-page {
  display: flex;
  flex-grow: 1;
  flex-flow: column nowrap;
  z-index: 0;

  &-home {
    margin-top: 2rem;
  }

  &-container {
    flex-grow: 1;
    padding: 0 40px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    @include mobile {
      padding: 0 16px;
    }
  }
}
</style>
