<template>
  <section class="admin__side-bar">
    <h2 class="side-bar__title">Quizes:</h2>
    <ul
      v-for="quiz in quizes"
      :key="quiz.id"
    >
      <li>{{ quiz.title }}</li>
    </ul>
  </section>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Quiz } from '@/types/store/quiz/quiz.interface'

@Component
export default class AdminSideBar extends Vue {
  @Prop({ required: true, type: Array }) quizes!: Quiz[]
}
</script>
<style lang="scss">
.admin__side-bar {
  color: $main-color;
  font-size: 25px;
  background-color: rgba(255, 255, 255, 0.815);
  border-radius: 10px;
  padding: 0.5rem 1rem;
}
.side-bar {
  &__title {
    text-align: center;
    font-weight: bold;
  }
}
</style>