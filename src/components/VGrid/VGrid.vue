<template>
  <div :class="`v-grid v-grid--${name}`">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class VGrid extends Vue {
  @Prop({ required: false, type: String }) name!: string
}
</script>
<style lang="scss">
.v-grid {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  width: 100%;

  @include mobile {
    flex-flow: column nowrap;
    align-items: center;
    justify-content: space-around;
  }

  &-item {
    margin-bottom: 1rem;
  }

  &-item:not(:last-child) {
    margin-right: 1rem;

    @include mobile {
      margin-right: 0;
    }
  }
}

.v-grid.v-grid--quiz {
  @include mobile {
    flex-flow: row wrap;
  }

  .v-grid-item:not(:last-child) {
    // margin-right: 1rem;
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
