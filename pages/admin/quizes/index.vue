<template>
  <v-page name="admin">
    <v-title title="Admin panel" />
    <section class="admin__quiz-list-wrapper">
      <ul class="admin__quiz-list">
        <li
          v-for="quizId in Object.keys(quizes)"
          :key="quizId"
          class="admin__quiz-list-item"
        >
          <nuxt-link
            :to="{
              name: 'admin-quizes-id',
              params: { id: quizId }
            }"
            class="admin__quiz-list-item-link"
          >
            {{ quizes[quizId].title }}
          </nuxt-link>
        </li>
        <li class="admin__quiz-list-item--new">
          <nuxt-link
            :to="{
              name: 'admin-quizes-id',
              params: { id: 'new' }
            }"
            class="admin__quiz-list-item-link"
          >
            {{ 'Create new quiz' }}
          </nuxt-link>
        </li>
      </ul>
    </section>
  </v-page>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import VPage from '@/components/VPage/VPage.vue'
import VTitle from '@/components/VTitle/VTitle.vue'
import { AdminQuiz } from '@/types/store/quiz/quiz.interface'

@Component({
  components: {
    VPage,
    VTitle
  },
  layout: 'admin',
  async asyncData ({ $fire }) {
    try {
      const snapshot = await $fire.database.ref('/quizes').once('value')
      const quizes = snapshot.val()
      return {
        quizes
      }
    } catch (error) {
      console.log(error)
    }
  }
})
export default class AdminPage extends Vue {
  private quizes!: { [key: string]: AdminQuiz }
}
</script>
<style lang="scss">
.admin {
  &__quiz-list-wrapper {
    margin-bottom: 2rem;
    padding: 1rem;
    display: flex;
    flex-flow: column wrap;
    justify-content: flex-start;
    align-items: center;
    align-self: stretch;
    background-color: rgba(255, 255, 255, 0.815);
    border-radius: 10px;
    flex-grow: 1;
  }

  &__quiz-list-item,
  &__quiz-list-item--new {
    padding: 1rem;
    border-radius: 10px;
    margin: 0.5rem 0;
    cursor: pointer;
    transition: 0.3s all ease;
  }

  &__quiz-list-item {
    background: $color-white;

    &:hover {
      box-shadow: inset -4px -4px 6px 3px lightgrey;
    }

    &:active {
      box-shadow: 
        inset -4px -4px 6px 3px lightgrey,
        inset -4px -6px 6px 3px $main-color;
    }

    &-link {
      font-weight: 600;
      color: $main-color;

      &:hover {
        color: $main-color;
      }
    }
  }

  &__quiz-list-item--new {
    padding: 1rem;
    border-radius: 10px;
    margin: 0.5rem 0;
    background: $color-analogous-two;

    &:hover {
      box-shadow: inset -4px -4px 6px 3px $color-white;
    }

    &:active {
      box-shadow: 
        inset -4px -4px 6px 3px $color-white,
        inset -4px -6px 6px 3px $main-color;
    }

    .admin__quiz-list-item-link {
      font-weight: 600;
      color: $color-white;
    }
  }
}
</style>