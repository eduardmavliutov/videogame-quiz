<template>
  <v-page name="user-settings">
    <v-title title="User Settings" />
    <form
      class="user-form"
      @submit.prevent="onFormSubmit"
    >
      <v-input
        name="Email"
        type="text"
        :model="email"
        disabled
      />
      <v-input
        name="Name"
        type="text"
        :model.sync="name"
      />
      <div class="user-form__buttons">
        <v-button
          type="submit"
          :loading="loading"
        >
          Save
        </v-button>
      </div>
    </form>
  </v-page>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import VTitle from '@/components/VTitle/VTitle.vue'
import VPage from '@/components/VPage/VPage.vue'
import VInput from '@/components/VInput/VInput.vue'
import VButton from '@/components/VButton/VButton.vue'
import { namespace } from 'vuex-class'
import { UpdateUserName } from '@/types/store/user/user.interface'

const userModule = namespace('user')

@Component({
  components: {
    VPage,
    VTitle,
    VInput,
    VButton
  }
})
export default class UserSettingsPage extends Vue {
  @userModule.State('email') email!: string
  @userModule.Action('updateUserName') updateUserName!: (payload: UpdateUserName) => void

  private name = this.$store.state.user.name
  private loading = false

  async onFormSubmit (): Promise<void> {
    this.loading = true
    if (this.name.trim()) {
      await this.updateUserName({
        name: this.name
      })
    }

    this.loading = false
    this.$router.push('/')
  }
}
</script>
<style lang="scss">
.user-form {
  position: relative;
  padding: 1rem;
  z-index: 0;
  display: flex;
  justify-content: center;
  width: 60vw;
  flex-flow: column nowrap;
  box-shadow: $box-shadow--dark;
  background-color: $main-color;
  transition: all 0.5s ease-in-out;

  @include mobile {
    width: unset;
    align-self: stretch;
  }

  &::before {
    content: "";
    background: url("~@/assets/images/questions.png");
    background-size: 10%;
    opacity: 0.05;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  }

  &__buttons {
    display: flex;
    justify-content: center;
  }
}
</style>
