<template>
  <div
    id="app"
    class="app"
  >
    <the-header />
    <transition
      name="route-change"
      mode="out-in"
      appear
    >
      <router-view />
    </transition>
    <popup-controller />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TheHeader from '@/components/TheHeader/TheHeader.vue'
import PopupController from '@/components/PopupController/PopupController.vue'

@Component({
  components: {
    TheHeader,
    PopupController
  }
})
export default class App extends Vue {
}
</script>

<style lang="scss">
.app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-flow: column nowrap;
  height: 100%;

  &::after {
    content: "";
    background: border-box url("~@/assets/images/bricks-bg.jpeg") repeat;
    background-size: cover;
    opacity: 0.65;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  }
}

.route-change {
  &-enter-active,
  &-leave-active {
    transition: 0.3s opacity ease;
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
