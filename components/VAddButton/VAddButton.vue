<template>
  <button
    type="button"
    class="v-add-button"
    @click="$emit('add')"
  ></button>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class VAddButton extends Vue {

}
</script>
<style lang="scss">
.v-add-button {
  width: 7rem;
  height: 7rem;
  background-image: url("~@/assets/images/plus-icon.png");
  background-size: cover;
  background-color: transparent;
  border: none;
  align-self: center;
  justify-self: center;
  border-radius: 50%;
  transition: 0.3s all ease-in-out;

  &:hover {
    box-shadow: $box-shadow--default;
  }
}
</style>