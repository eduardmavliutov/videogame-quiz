<template>
  <div class="app-wrapper">
    <the-header />
    <nuxt />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import TheHeader from '@/components/TheHeader/TheHeader.vue';

@Component({
  components: {
    TheHeader
  }
})
export default class DefaultLayout extends Vue {
  
}
</script>
<style lang="scss">
html {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.app-wrapper {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-flow: column nowrap;
  height: 100vh;
  overflow-y: auto;

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
