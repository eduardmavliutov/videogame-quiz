<template>
  <v-page name="auth">
    <v-title title="Authentication" />
    <div class="auth-form__wrapper">
      <form
        class="auth-form"
        @submit.prevent="submitHandler"
      >
        <v-input
          name="E-mail"
          type="text"
          :errors="emailErrors"
          :model.sync="form.email"
        />
        <v-input
          name="Password"
          type="password"
          :errors="passwordErrors"
          :model.sync="form.password"
        />
        <div class="auth-form--buttons">
          <v-button
            type="submit"
            :loading="isAuthLoading"
            :disabled="isAuthenticated"
            @click.native="submitType = 'login'"
          >
            Login
          </v-button>
          <v-button
            type="submit"
            :loading="isAuthLoading"
            :disabled="isAuthenticated"
            @click.native="submitType = 'signUp'"
          >
            Sign up
          </v-button>
        </div>
        <transition name="error">
          <span
            v-if="message"
            class="auth-form--message"
            :class="{ error: messageStyle === 'error', info: messageStyle === 'info' }"
          >
            {{ message }}
          </span>
        </transition>
      </form>
    </div>
  </v-page>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import VPage from '@/components/VPage/VPage.vue'
import VTitle from '@/components/VTitle/VTitle.vue'
import VInput from '@/components/VInput/VInput.vue'
import VButton from '@/components/VButton/VButton.vue'
import { namespace } from 'vuex-class'
import { AuthForm } from '@/types/views/auth.interface'
import { FetchUserData, SetUserPayload, SubscribeUserModulePayload } from '@/types/store/user/user.interface'
import { SetIsAuthLoadingPayload } from '@/types/store/auth/auth.interface'
import { PASSWORD_MIN_LENGTH } from '@/helpers/constants'
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'

const userModule = namespace('user')
const authModule = namespace('auth')

@Component({
  components: {
    VPage,
    VTitle,
    VInput,
    VButton
  },
  mixins: [validationMixin],
  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(PASSWORD_MIN_LENGTH)
      }
    }
  }
})
export default class Auth extends Vue {
  @userModule.Mutation('SET_USER') SET_USER!: (payload: SetUserPayload) => void
  @userModule.Action('fetchUserData') fetchUserData!: (payload: FetchUserData) => Promise<void>
  @userModule.Action('subscribeUserModule') subscribeUserModule!: (payload: SubscribeUserModulePayload) => Promise<void>
  @userModule.Getter('isAuthenticated') isAuthenticated !: boolean
  @authModule.Mutation('SET_IS_AUTH_LOADING') SET_IS_AUTH_LOADING !: (payload: SetIsAuthLoadingPayload) => void
  @authModule.Getter('isAuthLoading') isAuthLoading!: boolean

  /**
   * Might be 'login' or 'signUp', defines handler that will be used
   */
  private submitType = ''

  /**
   * Info message in the bottom of the auth form
   */
  private message = ''

  /**
   * Might be 'info' or 'error', defines styles that will be used
   * for message
   */
  private messageStyle = ''

  /**
   * Represents auth form for a new or an existing user
   */
  private form: AuthForm = {
    email: '',
    password: ''
  }

  private get emailErrors (): string[] {
    const errors: string[] = []

    if (!this.$v.form.email?.$dirty) {
      return errors
    }

    if (!this.$v.form.email.required) {
      errors.push('E-mail is required')
    }

    if (!this.$v.form.email.email) {
      errors.push('E-mail is invalid')
    }

    return errors
  }

  private get passwordErrors (): string[] {
    const errors: string[] = []

    if (!this.$v.form.password?.$dirty) {
      return errors
    }

    if (!this.$v.form.password?.required) {
      errors.push('Password must be filled')
    }

    if (!this.$v.form.password.minLength) {
      errors.push(`Password must be at least ${PASSWORD_MIN_LENGTH} long`)
    }

    return errors
  }

  /**
   * Submit handler for auth form
   */
  submitHandler (): void {
    this.$v.$touch()
    if (!this.$v.$invalid) {
      this.submitType === 'login'
        ? this.loginHandler()
        : this.signUpHandler()
    }
  }

  /**
   * Signs up a new user, then creates a user directory using received created user id.
   * Puts received tokens and user info in store
   */
  async signUpHandler (): Promise<void> {
    const email = this.form.email.trim().toLowerCase()
    const password = this.form.password

    this.SET_IS_AUTH_LOADING({
      isAuthLoading: true
    })
    await this.$fire.auth.createUserWithEmailAndPassword(email, password)
      .then((loginStatus) => {
        const userId = `${loginStatus.user?.uid}`
        this.$fire.database.ref(`/users/${userId}/`).set({
          email: this.form.email,
          name: '',
          quizes: [],
          points: 0
        })
        return this.$fire.database.ref(`/users/${userId}`)
      })
      .then((result) => {
        this.subscribeUserModule({
          reference: result
        })
      })
      .then(() => {
        this.showMessage('Registration is successful!', 'info')
        const timeout = setTimeout(() => {
          this.$router.push('/')
          clearTimeout(timeout)
        }, 1000)
      })
      .catch((error) => {
        this.showMessage(error.message, 'error')
      })
      .finally(() => {
        this.SET_IS_AUTH_LOADING({
          isAuthLoading: false
        })
      })
  }

  /**
   * Logins existing user, then fetches their data. Stores authdata and userdata in the store
   */
  async loginHandler (): Promise<void> {
    const email = this.form.email.trim().toLowerCase()
    const password = this.form.password

    this.SET_IS_AUTH_LOADING({
      isAuthLoading: true
    })
    await this.$fire.auth.signInWithEmailAndPassword(email, password)
      .then((loginStatus) => {
        const userId = `${loginStatus.user?.uid}`
        this.fetchUserData({ userId })
      })
      .then(() => {
        this.showMessage('Authentication is successful!', 'info')
        const timeout = setTimeout(() => {
          this.$router.push('/')
          clearTimeout(timeout)
        }, 1000)
      })
      .catch((error) => {
        this.showMessage(error.message, 'error')
      })
      .finally(() => {
        this.SET_IS_AUTH_LOADING({
          isAuthLoading: false
        })
      })
  }

  /**
   * Set value for message variable and shows it for 2 seconds
   * @param {string} message - text that is to be shown,
   * @param {string} style - class that will be applied to the given message (info/error)
   */
  showMessage (message: string, style: string): void {
    this.message = message
    this.messageStyle = style
    setTimeout(() => {
      this.message = ''
    }, 2000)
  }
}
</script>
<style lang="scss">
.auth-form {
  padding: 1rem;
  display: flex;
  justify-content: center;
  flex-flow: column nowrap;
  flex-grow: 1;
  transition: height 0.5s ease-in-out;

  &__wrapper {
    position: relative;
    z-index: 10;
    display: flex;
    justify-content: center;
    justify-self: center;
    width: 60vw;
    flex-flow: row nowrap;
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
  }

  @include mobile {
    padding: 1rem;
  }

  &--buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  &--submit {
    background-color: $color-complementary--light;
    border: none;
    padding: 0.5rem 2rem;
    font-weight: bold;
    font-size: 1rem;
  }

  &--submit:not(:last-child) {
    margin-right: 1rem;
  }

  &--message {
    font-weight: bold;
    padding: 0.5rem;
    text-align: center;
    transition: all 0.5s ease-in-out;

    &.error {
      color: $color-black;
    }

    &.info {
      color: $color-white;
    }
  }
}
</style>
