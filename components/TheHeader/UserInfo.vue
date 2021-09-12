<template>
  <div
    class="user-info"
    :class="{ 'menu-is-open': showUserMenu }"
    @click="showUserMenu = !showUserMenu"
    @mouseleave="showUserMenu = false"
  >
    <p class="user-info__name">
      {{ userName }}
    </p>
    <div class="user-info__stats">
      <div class="user-info__points">
        <img
          width="16px"
          src="~@/assets/icons/points.svg"
          alt="points"
          class="user-info__stat-image-points"
          :class="{ animate: animateCoin }"
        >
        <span class="user-info__points-counter">{{ animatedPoints }}</span>
      </div>
      <div class="user-info__finished-quizes">
        <img
          width="16px"
          src="~@/assets/icons/trophy.svg"
          alt="completed-quizes"
          class="user-info__stat-image-quizes"
          :class="{ animate: animateCompletedQuizes }"
        >
        <span class="user-info__finished-quizes-counter">{{ animatedCompletedQuizes }}</span>
      </div>
    </div>
    <transition
      name="menu"
      mode="out-in"
    >
      <ul
        v-if="showUserMenu"
        class="user-info__menu"
      >
        <li
          class="user-info__menu-item"
          @click.stop="editProfileClickHandler"
        >
          Edit profile
        </li>
        <li
          class="user-info__menu-item"
          @click.stop="logoutClickHandler"
        >
          Logout
        </li>
      </ul>
    </transition>
  </div>
</template>
<script lang="ts">
import { Prop, Component, Vue, Watch } from 'vue-property-decorator'
import { NavigationGuardNext, Route } from 'vue-router'
import gsap from 'gsap'

@Component({})
export default class UserInfo extends Vue {
  @Prop({ required: true, type: String }) userName!: string
  @Prop({ required: true, type: Number }) points!: number
  @Prop({ required: true, type: Number }) completedQuizes!: number


  private pointsToDisplay = 0

  /**
   * Points that will be displayed to user
   */
  private get animatedPoints () {
    return this.pointsToDisplay.toFixed(0)
  }

  private completedQuizesToDisplay = 0

  /**
   * Completed quizes counter that will be displayed to user
   */
  private get animatedCompletedQuizes () {
    return this.completedQuizesToDisplay.toFixed(0)
  }

  /**
   * Defines whether animation for points image
   * will be applied or not
   */
  private animateCoin = false

  /**
   * Defines whether animation for completed quizes image
   * will be applied or not
   */
  private animateCompletedQuizes = false

  /**
   * Defines whether to show user menu or not
   */
  private showUserMenu = false

  /**
   * Watcher for 'points' property
   */
  @Watch('points', { immediate: true })
  onPointsChange (newValue: number): void {
    this.animateCoin = true
    gsap.to(this.$data, {
      duration: 0.5,
      pointsToDisplay: newValue
    }).then(() => this.animateCoin = false)
  }

  /**
   * Watcher for 'compoletedQuizes' property
   */
  @Watch('completedQuizes', { immediate: true })
  onCompletedQuizesChange (newValue: number): void {
    this.animateCompletedQuizes = true
    gsap.to(this.$data, {
      duration: 0.5,
      completedQuizesToDisplay: newValue
    }).then(() => this.animateCompletedQuizes = false)
  }

  /**
   * Handler for clicking on 'Edit profile' in settings menu
   */
  editProfileClickHandler () {
    this.showUserMenu = false
    this.$emit('settings')
  }

  /**
   * Handler for clicking on 'Logout' in settings menu
   */
  logoutClickHandler () {
    this.showUserMenu = false
    this.$emit('logout')
  }

  beforeRouteLeave (_: Route, __: Route, next: NavigationGuardNext) {
    this.showUserMenu = false
    next()
  }
}
</script>
<style lang="scss">
@keyframes stat-animation {
  50% {
    filter: drop-shadow(0px 0px 5px $main-color);
    transform: scale(1.3);
  }
  100% {
    filter: none;
    transform: none;
  }
}
.user-info {
  position: relative;
  display: flex;
  justify-content: center;
  flex-flow: column nowrap;
  background-color: $color-complementary--light;
  padding: 0.5rem;
  color: $main-color;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  border-radius: 10px;

  &.menu-is-open {
    border-radius: unset;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;

    @include mobile {
      border-radius: 10px;
    }
  }

  @include mobile {
    position: unset;
    padding: 0 8px;
  }

  @media screen and (max-width: 320px) {
    font-size: $font-size-normal-mobile;
    line-height: $line-height-mobile--320px;
  }

  &__name {
    cursor: pointer;
    font-weight: bold;
    flex-shrink: 2;
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
    text-overflow: ellipsis;

    @include mobile {
      max-width: 8rem;
    }
  }

  &__stats {
    display: flex;
    justify-content: space-around;
    flex-flow: row nowrap;
  }

  &__points {
    margin-right: 0.5rem;
  }

  &__points,
  &__finished-quizes {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  &__stat-image-quizes,
  &__stat-image-points {
    margin-right: 0.2rem;

    &.animate {
      animation-name: stat-animation;
      animation-duration: 0.6s;
      animation-fill-mode: backwards;
      animation-iteration-count: infinite;
    }
  }

  &__menu {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-flow: column nowrap;
    top: 4rem; // 4rem + 0.5rem padding in TheHeader component
    left: 0px;
    z-index: 10;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top: 2px solid $main-color;
    overflow: hidden;

    &.hidden {
      display: none;
    }

    @include mobile {
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.01) 0%,
        $color-complementary--light 10%
      );
      border-radius: unset;
      border-top: none;
      padding-top: 1rem;
      top: 3.5rem;
      z-index: 20;
      width: 100vw;
      height: 100vh;
    }

    @media screen and (max-width: 320px) {
      top: 3rem;
      padding-top: 0;
    }

    &-item {
      padding: 1rem;
      transition: all 0.1s ease-in-out;
      background-color: rgba(#e8e8e8, 0.95);

      &:not(:last-child) {
        border-bottom: 2px $main-color solid;
      }

      &:hover {
        background-color: #e8e8e8;
      }

      &:active {
        box-shadow: inset $box-shadow--default;
      }
    }
  }
}
// TODO: Переместить внутрь основных стилей
.menu {
  &-enter,
  &-leave-to {
    opacity: 0;
    transform: translateY(-5rem);
  }
  &-enter-to,
  &-leave {
    opacity: 1;
    transform: translateY(0rem);
  }
  &-enter-active,
  &-leave-active {
    transition: 0.2s all ease-in-out;
  }
}
</style>
