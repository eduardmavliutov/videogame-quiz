<template>
  <v-page name="auth">
    <v-title title="Authentication" />
    <validation-observer
      v-slot="{ handleSubmit }"
      tag="div"
      class="auth-form__wrapper"
    >
      <form
        class="auth-form"
        @submit.prevent="handleSubmit(submitHandler)"
      >
        <v-input
          v-for="input in form"
          :key="`${input.name}-${input.rules}`"
          :rules="input.rules"
          :name="input.name"
          :type="input.type"
          :model.sync="form[input.type].value"
        />
        <div class="auth-form--buttons">
          <button
            class="auth-form--submit"
            type="submit"
            @click="submitType = 'login'"
          >
            Login
          </button>
          <button
            class="auth-form--submit"
            type="submit"
            @click="submitType = 'signUp'"
          >
            Sign up
          </button>
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
    </validation-observer>
  </v-page>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VPage from '@/components/VPage/VPage.vue'
import VTitle from '@/components/VTitle/VTitle.vue'
import VInput from '@/components/VInput/VInput.vue'
import { extend, ValidationObserver } from 'vee-validate'
import { required, email, min } from 'vee-validate/dist/rules'
import { namespace } from 'vuex-class'
import firebase from '@/firebase/firebase'
import { PASSWORD_MIN_LENGTH } from '@/helpers/constants'
import { AuthForm } from '@/types/views/auth.interface'
import { SetUserPayload } from '@/types/store/user/user.interface'

const userModule = namespace('user')

extend('required', {
  ...required,
  message: '{_field_} field is required'
})

extend('email', {
  ...email,
  message: 'Enter valid email'
})

extend('min', {
  ...min,
  message: `{_field_} must have length more than ${PASSWORD_MIN_LENGTH}`
})

extend('password', {
  validate: (value) => {
    const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})')
    return regex.test(value)
  },
  message: 'Password must contain at least 1 lowercase character, 1 uppercase character, 1 numeric character'
})

@Component({
  components: {
    VPage,
    VTitle,
    VInput,
    ValidationObserver
  }
})
export default class Auth extends Vue {
  @userModule.Mutation('SET_USER') SET_USER!: (payload: SetUserPayload) => void

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
    email: {
      value: '',
      rules: 'required',
      name: 'Email',
      type: 'email'
    },
    password: {
      value: '',
      rules: `required|min:${PASSWORD_MIN_LENGTH}|password`,
      name: 'Password',
      type: 'password'
    }
  }

  /**
   * Submit handler for auth form
   */
  async submitHandler (): Promise<void> {
    this.submitType === 'login'
      ? this.loginHandler()
      : this.signUpHandler()
  }

  /**
   * Signs up a new user, then creates a user directory using received created user id.
   * Puts received tokens and user info in store
   */
  async signUpHandler (): Promise<void> {
    firebase.auth().createUserWithEmailAndPassword(this.form.email.value, this.form.password.value)
      .then((loginStatus) => {
        const userId = `${loginStatus.user?.uid}`
        firebase.database().ref(`/users/${userId}/`).set({
          email: this.form.email.value,
          name: '',
          quizes: [],
          points: 0
        })
        return firebase.database().ref(`/users/${userId}`)
      })
      .then((result) => {
        result.on('value', (snapshot) => {
          const { email, name, points, quizes = [] } = snapshot.val()
          this.SET_USER({
            email,
            name,
            quizes,
            points
          })
        })
      })
      .catch((error) => {
        this.handleError(error.response.data.error.message)
      })

    this.showMessage('Registration is successful!', 'info')

    const timeout = setTimeout(() => {
      this.$router.push('/')
      clearTimeout(timeout)
    }, 1000)
  }

  /**
   * Logins existing user, then fetches their data. Stores authdata and userdata in the store
   */
  async loginHandler (): Promise<void> {
    const authData = {
      email: this.form.email.value.toLowerCase(),
      password: this.form.password.value,
      returnSecureToken: true
    }
    firebase.auth().signInWithEmailAndPassword(authData.email, authData.password)
      .then((loginStatus) => {
        const userId = `${loginStatus.user?.uid}`
        return firebase.database().ref(`/users/${userId}`)
      })
      .then((result) => {
        result.on('value', (snapshot) => {
          const { email, name, points, quizes = [] } = snapshot.val()
          this.SET_USER({
            email,
            name,
            quizes,
            points
          })
        })
      })
      .catch((error) => {
        console.log(error)
      })

    this.showMessage('Authentication is successful!', 'info')

    const timeout = setTimeout(() => {
      this.$router.push('/')
      clearTimeout(timeout)
    }, 1000)
  }

  /**
   * Error handler, shows message depending on type of error
   */
  handleError (message: string): void {
    const errorMessage = message === 'EMAIL_EXISTS'
      ? this.message = 'User with this email is already exists!'
      : this.message = 'Server error, try later.'
    this.showMessage(errorMessage, 'error')
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
