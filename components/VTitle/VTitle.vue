<template>
  <div
    v-if="isAdmin"
    class="v-title__admin-wrapper"
  >
    <nuxt-link
      v-for="link in breadcrumbs"
      :key="link.title"
      class="v-title--admin-link"
      :to="{
        name: link.to
      }"
    >
      {{ link.title }}
    </nuxt-link>
    <h2 :class="classes">
      {{ title }}
    </h2>
  </div>
  <div
    v-else
    class="v-title__wrapper"
  >
    <div v-if="primary">
      <h1 :class="classes">
        {{ title }}
      </h1>
    </div>
    <h2
      v-else
      :class="classes"
    >
      {{ title }}
    </h2>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'
import { CssClasses } from '@/types/css-classes'

@Component({})
export default class VTitle extends Vue {
  @Prop({ required: true, type: String }) title!: string
  @Prop({ required: false, default: false, type: Boolean }) primary!: boolean
  @Prop({ required: false, default: false, type: Boolean }) hideInMobileMode!: boolean

  /**
   * Computed property for getting object with classes that
   * will be applied to title
   * @returns {CssClasses} js-object with classes
   */
  private get classes (): CssClasses {
    return {
      'v-title': true,
      'visually-hidden-mobile': this.hideInMobileMode,
      'v-title--primary': this.primary,
      'v-title--secondary': !this.primary
    }
  }

  /**
   * Defines whether we are in admin panel or not
   * @returns {boolean} true if we are on admin page, otherwise - false
   */
  private get isAdmin (): boolean {
    return this.$route.path.includes('admin')
  }

  /**
   * Retrieves breadcrums array for title on admin page
   * @returns {array} array of breadcrumbs basing on current page
   */
  private get breadcrumbs (): { title: string, to: string }[] {
    const breadcrumbs = []
    breadcrumbs.push({
      title: 'Home page / ',
      to: 'index'
    })

    if (this.$route.name === 'admin-quizes-id') {
      breadcrumbs.push({
        title: 'Admin quizes / ',
        to: 'admin-quizes'
      })
    }

    return breadcrumbs
  }
}
</script>
<style lang="scss">
.v-title {
  text-align: center;
  margin: 2rem 0rem;
  align-self: stretch;

  &--primary {
    font-size: $font-size-title-desktop--primary;
    color: $color-white;
    font-weight: bold;

    @include mobile {
      font-size: $font-size-title-desktop--secondary;
      line-height: $line-height-mobile;
      margin: 0px;
    }

    @media screen and (max-width: 320px) {
      font-size: $font-size-title-mobile--320px;
      line-height: $line-height-mobile--320px;
    }
  }

  &--secondary {
    font-size: $font-size-title-desktop--secondary;
    background: url("~@/assets/images/white-brush-stroke.png") 50% 50%;
    background-size: cover;
    color: $color-complementary--dark;
    font-weight: 600;

    @include mobile {
      margin: 1rem 0rem;
    }
  }

  &--admin-link {
    margin: 0;
    padding: 0;
    font-size: $font-size-title-desktop--secondary;
    font-weight: 600;
    color: $color-complementary--dark;
  }

  &__admin-wrapper {
    margin: 0;
    padding: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url("~@/assets/images/white-brush-stroke.png") 50% 50%;
    background-size: cover;
  }

  &__wrapper {
    margin: 0;
    padding: 0;
    width: 100%;
  }
}
</style>
