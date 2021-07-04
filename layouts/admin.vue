<template>
  <div class="app-wrapper">
    <nuxt />
    <image-cropper v-if="src" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ImageCropper from '@/components/ImageCropper/ImageCropper.vue'
import { namespace } from 'vuex-class'

const cropperModule = namespace('cropper')

@Component({
  components: {
    ImageCropper
  }
})
export default class AdminLayout extends Vue {
  @cropperModule.Getter('src') src!: string
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
  flex-flow: row nowrap;
  height: 100vh;
  position: relative;

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
