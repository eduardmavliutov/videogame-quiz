<template>
  <div id="app" class="app">
    <the-header />
    <router-view />
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

  backdrop-filter: blur(10px);

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
</style>
