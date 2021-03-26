<template>
  <transition name="grid">
    <div class="v-grid">
      <slot></slot>
    </div>
  </transition>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class VGrid extends Vue { }
</script>
<style lang="scss">
.v-grid {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;

  &-item {
    margin-bottom: 1rem;
  }

  &-item:not(:last-child) {
    margin-right: 1rem;
  }
}

.grid-enter,
.grid-leave {
  transition: all 0.5s ease-in;
}

.grid-enter-to,
.grid-leave-from {
  opacity: 1;
}

.grid-enter-from,
.grid-leave-to {
  opacity: 0;
}
</style>
