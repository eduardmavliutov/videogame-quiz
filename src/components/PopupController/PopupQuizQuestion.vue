<template>
  <div class="quiz-question">
    <h1>QuizQuestion</h1>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class PopupQuizQuestion extends Vue {

}

</script>

<style lang="scss">
.quiz-question {
  width: 300px;
  height: 400px;
  background: white;
}

</style>
