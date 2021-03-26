<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/">
        <img
          class="header__logo-image"
          src="@/assets/images/gpad.png"
        >
      </router-link>
      <h1 class="header__logo-title">Videogame Quiz!</h1>
    </div>
    <div class="header__auth">
      <router-link
        class="header__auth-button"
        to="/"
      >Login</router-link>
      <router-link
        class="header__auth-button"
        to="/"
      >Sign in</router-link>
    </div>
  </header>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class TheHeader extends Vue {

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
  height: 5rem;
  padding: 0px 1rem;
  position: relative;
  box-shadow: $box-shadow--dark;

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
    }
  }

  &__auth {
    &-button {
      text-decoration: none;
      padding: 1rem;
      font-weight: bold;
      color: $color-white;
    }
  }
}
</style>
