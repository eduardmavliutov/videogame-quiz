<template>
  <v-page name="auth">
    <v-title :title="computedTitle" />
    <validation-observer
      class="auth-form-container"
      v-slot="{ handleSubmit }"
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
        <div class="auth-form-buttons">
          <button
            class="auth-form-submit"
            type="submit"
          >{{ buttonText }}</button>
        </div>
      </form>
    </validation-observer>
  </v-page>
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'
import VPage from '@/components/VPage/VPage.vue'
import VTitle from '@/components/VTitle/VTitle.vue'
import VInput from '@/components/VInput/VInput.vue'
import { extend, ValidationObserver } from 'vee-validate'
import { required, email, min } from 'vee-validate/dist/rules'
import { PASSWORD_MIN_LENGTH } from '@/helpers/constants'
import { AuthForm } from '@/types/views/auth.interface'

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
  @Prop({ required: true, type: String }) mode!: string

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

  get computedTitle (): string {
    return this.mode === 'login'
      ? 'Login'
      : 'Sing up'
  }

  get buttonText () {
    return this.mode === 'login'
      ? 'Login'
      : 'Sign up'
  }

  submitHandler () {
    console.log('submitted!')
  }
}
</script>
<style lang="scss">
.auth-form {
  display: flex;
  justify-content: center;
  flex-flow: column nowrap;

  &-container {
    margin: 0rem 3rem;
    padding: 1rem;
    background-color: $main-color;
    backdrop-filter: blur(2px);
    box-shadow: $box-shadow--dark;
    position: relative;
    display: flex;
    justify-content: center;
    flex-flow: column nowrap;
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
  }

  &-buttons {
    display: flex;
    justify-content: center;
  }

  &-submit {
    background-color: $color-complementary--light;
    border: none;
    padding: 0.5rem 2rem;
    font-weight: bold;
    font-size: 1rem;
  }
}
</style>
