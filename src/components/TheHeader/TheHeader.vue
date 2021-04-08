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
        class="header__auth-button"
        to="/auth"
      >Login</router-link>
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
  transition: all 0.4s ease-in;

  @include mobile {
    padding: 0 8px;
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

    @include mobile {
      justify-content: flex-start;
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

      @include mobile {
        text-align: center;
        font-size: 1.5rem;
        line-height: 2rem;
        flex-grow: 1;
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
}
</style>
