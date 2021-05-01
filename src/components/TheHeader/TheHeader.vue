<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/">
        <img
          class="header__logo-image"
          src="@/assets/images/gpad.png"
        >
      </router-link>
      <h2 class="header__logo-title">Videogame Quiz!</h2>
    </div>
    <div class="header__auth">
      <router-link
        v-if="!isAuthenticated"
        class="header__auth-button"
        to="/auth"
      >
        Login
      </router-link>
      <user-info
        v-else
        :userName="activeUser"
        :points="points"
        :completed-quizes="completedQuizes"
        @click.native="logoutHandler"
      />
    </div>
  </header>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UserInfo from '@/components/TheHeader/UserInfo.vue'
import { namespace } from 'vuex-class'

const userModule = namespace('user')

@Component({
  components: {
    UserInfo
  }
})
export default class TheHeader extends Vue {
  @userModule.Getter('isAuthenticated') isAuthenticated!: boolean
  @userModule.State('email') userEmail!: string
  @userModule.State('name') userName!: string
  @userModule.State('points') points!: number
  @userModule.Getter('completedQuizes') completedQuizes!: number
  @userModule.Action('logout') logout!: () => Promise<void>

  get activeUser (): string {
    return this.userName || this.userEmail
  }

  logoutHandler () {
    this.logout()
    if (this.$route.path !== '/') {
      this.$router.push('/')
    }
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: row nowrap;
  background: $main-color;
  backdrop-filter: blur(2px);
  padding: 0.5rem;
  position: relative;
  box-shadow: $box-shadow--dark;
  transition: all 0.4s ease-in;

  @include mobile {
    padding: 8px;
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
    }

    &-title {
      font-size: $font-size-title-desktop;
      color: $color-white;
      font-weight: bold;

      @include mobile {
        text-align: center;
        font-size: 2rem;
        line-height: 2rem;
        flex-grow: 1;
      }

      @media screen and (max-width: 320px) {
        font-size: 1.5rem;
      }
    }
  }

  &__auth {
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

  &__active-user {
    color: $color-analogous-two;
    font-weight: bold;
    cursor: pointer;
    max-width: 8rem;
    flex-shrink: 2;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
