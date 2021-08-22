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
