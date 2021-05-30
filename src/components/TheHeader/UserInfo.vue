<template>
  <div class="user-info">
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
        <span class="user-info__points-counter">{{ pointsToDisplay }}</span>
      </div>
      <div class="user-info__finished-quizes">
        <img
          width="16px"
          src="~@/assets/icons/completed-quizes.svg"
          alt="points"
          class="user-info__stat-image-quizes"
        >
        <span class="user-info__finished-quizes-counter">{{ completedQuizes }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Prop, Component, Vue, Watch } from 'vue-property-decorator'

@Component({})
export default class UserInfo extends Vue {
  @Prop({ required: true, type: String }) userName!: string
  @Prop({ required: true, type: Number }) points!: number
  @Prop({ required: true, type: Number }) completedQuizes!: number

  /**
   * Value that will be displayed to user
   */
  private pointsToDisplay = 0

  /**
   * Defines whether animation for points image
   * will be applied or not
   */
  private animateCoin = false

  /**
   * Watcher for points property
   */
  @Watch('points')
  onPointsChange (): void {
    this.animatePoints()
  }

  /**
   * Method for current point value that will be displayed
   * to user
   */
  animatePoints (): void {
    if (this.points !== 0) {
      this.animateCoin = true
      const interval = setInterval(() => {
        this.points - this.pointsToDisplay >= 100
          ? this.pointsToDisplay += 100
          : this.pointsToDisplay += 1
        if (this.pointsToDisplay >= this.points) {
          clearInterval(interval)
          this.animateCoin = false
        }
      }, 50)
    }
  }

  /**
   * Created hook starts the animation of the points counter
   */
  created (): void {
    this.animatePoints()
  }
}
</script>
<style lang="scss">
@keyframes coin-animation {
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
  display: flex;
  justify-content: center;
  flex-flow: column nowrap;
  background-color: $color-complementary--light;
  border-radius: 10px;
  padding: 0.5rem;
  color: $main-color;
  font-weight: bold;

  @include mobile {
    padding: 0 8px;
  }

  @media screen and (max-width: 320px) {
    font-size: $font-size-normal-mobile;
    line-height: $line-height-mobile--320px;
  }

  &__name {
    cursor: pointer;
    max-width: 8rem;
    font-weight: bold;
    flex-shrink: 2;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__stats {
    display: flex;
    justify-content: space-around;
    flex-flow: row nowrap;
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
      animation-name: coin-animation;
      animation-duration: 0.6s;
      animation-fill-mode: backwards;
      animation-iteration-count: infinite;
    }
  }
}
</style>
