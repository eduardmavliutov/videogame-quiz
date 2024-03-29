<template>
  <header class="header">
    <div class="header__logo">
      <nuxt-link to="/">
        <img
          class="header__logo-image"
          src="@/assets/images/gpad.png"
          alt="logo-image"
        >
      </nuxt-link>
      <h1 class="header__logo-title">Videogame Quiz!</h1>
      <v-title
        :title="quizTitle"
        primary
        class="header__logo-title--mobile"
      />
    </div>
    <nuxt-link
      v-if="showAdminRoute"
      :to="{ name: 'admin-quizes' }"
      class="header__admin-link"
    >
      Admin
    </nuxt-link>
    <div class="header__auth">
      <transition
        name="header__auth"
        mode="out-in"
      >
        <user-info
          v-if="isAuthenticated"
          :user-name="activeUser"
          :points="points"
          :completed-quizes="completedQuizes"
          @logout="logoutHandler"
          @settings="settingsHandler"
        />
        <nuxt-link
          v-else
          class="header__auth-button"
          to="/auth"
        >
          Login
        </nuxt-link>
      </transition>
    </div>
  </header>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import UserInfo from '@/components/TheHeader/UserInfo.vue'
import VTitle from '@/components/VTitle/VTitle.vue'
import { namespace } from 'vuex-class'
import { Quiz } from '@/types/store/quiz/quiz.interface'

const userModule = namespace('user')
const quizModule = namespace('quiz')

@Component({
  components: {
    UserInfo,
    VTitle
  }
})
export default class TheHeader extends Vue {
  @userModule.Getter('isAuthenticated') isAuthenticated!: boolean
  @userModule.State('email') userEmail!: string
  @userModule.State('name') userName!: string
  @userModule.State('points') points!: number
  @userModule.Getter('completedQuizes') completedQuizes!: number
  @userModule.Action('logout') logout!: () => Promise<void>

  @quizModule.Getter('quiz') quiz!: (quizId: string) => Quiz

  /**
   * Retrieves current user`s name if there is one set or their email
   * @returns {string} user`s name or email
   */
  private get activeUser (): string {
    return this.userName || this.userEmail
  }

  /**
   * Retrieves the title of current quiz if there is quizId in route params.
   * @returns {string} the title of current quiz or default app title (depending on presence
   * of `quizId` param in $route)
   */
  private get quizTitle (): string {
    return this.$route.params.quizId && this.$route.params.questionId
      ? this.quiz(this.$route.params.quizId).title
      : 'Videogame Quiz'
  }

  /**
   * Defines whether to show link to admin panel or not
   * @returns {boolean} true if current user's email is admin's email, otherwise - false
   */
  private get showAdminRoute (): boolean {
    if (!this.isAuthenticated) {
      return false
    }
    return this.userEmail === this.$config.secret
  }

  /**
   * Handler for logout event
   */
  private logoutHandler (): void {
    this.logout()
    if (this.$route.path !== '/') {
      this.$router.push({
        name: 'index'
      })
    }
  }

  /**
   * Redirects to user settings
   */
  private settingsHandler (): void {
    this.$router.push({
      name: 'user-settings'
    })
  }
}
</script>
<style lang="scss">
@keyframes logo {
  0% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
.header {
  padding: 0.5rem;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: row nowrap;
  background: $main-color;
  box-shadow: $box-shadow--dark;
  transition: all 0.4s ease-in;
  height: 5.5rem;
  z-index: 1;

  @include mobile {
    z-index: 1;
    height: 4.5rem;
    padding: 8px 8px 8px 0px;
  }

  @media screen and (max-width: 320px) {
    height: 3rem;
  }

  &::after {
    content: "";
    background: url("~@/assets/images/questions.png");
    background-size: 5%;
    opacity: 0.05;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  }

  &__logo {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 16px;

    @include mobile {
      justify-content: flex-start;
      padding-right: 8px;
      flex-grow: 1;
    }

    &-image {
      filter: invert(100%);
      width: 5rem;
      transition: 0.3s all ease-in;
      animation-name: logo;
      animation-fill-mode: forwards;
      animation-duration: 0.5s;

      @media screen and (max-width: 320px) {
        width: 3rem;
      }
    }

    &-title {
      font-size: $font-size-title-desktop--primary;
      color: $color-white;
      font-weight: bold;

      @include mobile {
        display: none;
      }

      &--mobile {
        display: none;

        @include mobile {
          display: block;
          flex-grow: 1;
          text-align: center;
        }
      }

      @media screen and (max-width: 320px) {
        font-size: 1.5rem;
      }
    }
  }

  &__auth {
    display: flex;

    &-enter-to,
    &-leave {
      transform: translateX(0%);
    }

    &-enter-active,
    &-leave-active {
      transition: all 0.2s ease-in-out;
    }

    &-enter,
    &-leave-to {
      transform: translateX(100%);
    }

    &-button {
      text-decoration: none;
      padding: 1rem;
      font-weight: bold;
      color: $color-white;

      @include mobile {
        padding: 0.5rem;
      }
    }
  }

  &__admin-link {
    color: $color-white;
    font-weight: bold;
    justify-self: flex-end;
  }
}
</style>
