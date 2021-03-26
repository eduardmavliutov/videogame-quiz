<template>
  <div class="popup-backdrop">
    <div v-if="isShown"></div>
    <component :is="activeComponent">
    </component>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const popupModule = namespace('popup')
const PopupQuizQuestion = () => import('./PopupQuizQuestion.vue')

@Component({
  components: {
    PopupQuizQuestion
  }
})
export default class PopupController extends Vue {
  @popupModule.State('isShown') isShown!: boolean
  @popupModule.State('activeComponent') activeComponent!: string
}

</script>
