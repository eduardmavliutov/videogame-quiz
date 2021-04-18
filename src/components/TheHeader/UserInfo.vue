<template>
  <div class="user-info">
    <h2 class="user-info__name">
      {{ userName }}
    </h2>
    <div class="user-info__stats">
      <div class="user-info__points">
        <img
          width="16px"
          src="~@/assets/icons/points.svg"
          alt="points"
          class="user-info__stat-image"
        >
        <span>{{ points }}</span>
      </div>
      <div class="user-info__finished-quizes">
        <img
          width="16px"
          src="~@/assets/icons/completed-quizes.svg"
          alt="points"
          class="user-info__stat-image"
        >
        <span>{{ completedQuizes }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'

@Component({})
export default class UserInfo extends Vue {
  @Prop({ required: true, type: String }) userName!: string
  @Prop({ required: true, type: Number }) points!: number
  @Prop({ required: true, type: Number }) completedQuizes!: number
}
</script>
<style lang="scss">
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
    align-items: baseline;
  }

  &__stat-image {
    margin-right: 0.2rem;
  }
}
</style>
