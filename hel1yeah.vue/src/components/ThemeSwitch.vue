<template>
  <div class="theme-switch__wrapper">
    <label class="theme-switch__label">
      <input class="theme-switch__input" type="checkbox" v-model="cheked" />
      <div class="theme-switch__checkbox">
        <div class="theme-switch__checkbox-circle">
          
        </div>
      </div>
      <div class="theme-switch__description">{{ theme }}</div>
    </label>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ThemeSwitch',
  data() {
    return {
      cheked: true
    }
  },
  computed: {
    ...mapState({
      theme: (state) => (state.isTheme)
    })
  }
}
</script>

<style lang="scss" scoped>
.theme-switch__wrapper {
}
.theme-switch__label {
  position: relative;
}
.theme-switch__input {
  position: absolute;
  appearance: none;
  &:checked + .theme-switch__checkbox{
    border: 3px solid var( --color-green-light);
  }
  &:checked + .theme-switch__checkbox > .theme-switch__checkbox-circle{
    background-color: var(--color-green);
    left: 66%;
  }
}
.theme-switch__checkbox {
  width: 60px;
  height: 25px;
  border-radius: 12px;
  border: 3px solid var(--color-green);
  position: relative;
  transition: 0.7s;
  padding:1px;
}
.theme-switch__checkbox-circle{
  border-radius: 50%;
  width: 18px;
  height: 18px;
  background-color: var(--color-dark);
  transition: 0.7s;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0px;
}
.theme-switch__description {

}
</style>