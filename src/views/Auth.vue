<template>
  <v-page name="auth">
    <v-title title="Authentication" />
    <v-card name="auth">
      <validation-observer v-slot="{ handleSubmit }">
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
            >Login</button>
            <button
              class="auth-form-submit"
              type="submit"
            >Sign up</button>
          </div>
        </form>
      </validation-observer>
    </v-card>
  </v-page>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VPage from '@/components/VPage/VPage.vue'
import VTitle from '@/components/VTitle/VTitle.vue'
import VInput from '@/components/VInput/VInput.vue'
import VCard from '@/components/VCard/VCard.vue'
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
    VCard,
    ValidationObserver
  }
})
export default class Auth extends Vue {
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

  @include mobile {
    padding: 1rem;
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

  &-submit:not(:last-child) {
    margin-right: 1rem;
  }
}
</style>
