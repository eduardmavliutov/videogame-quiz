<template>
  <div :class="`v-page v-page-${name}`">
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class VPage extends Vue {
  @Prop({ required: true, type: String }) name!: string
}
</script>
<style lang="scss">
.v-page {
  margin-top: 1rem;
  display: flex;
  flex-grow: 1;
  flex-flow: column nowrap;

  .container {
    flex-grow: 1;
    padding: 0 40px;
  }
}
</style>
