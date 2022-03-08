<template>
  <div class="theme-switch__wrapper">
    <label class="theme-switch__label">
      <input class="theme-switch__input" type="checkbox" v-model="cheked" @click="changeTheme" />
      <div class="theme-switch__checkbox">
        <div class="theme-switch__checkbox-circle"></div>
      </div>
      <!-- <div class="theme-switch__description">{{ theme }}</div> -->
    </label>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ThemeSwitch',
  data() {
    return {
      cheked: null
    }
  },
  computed: {
    ...mapState({
      theme: (state) => (state.isTheme)
    }),


  },
  methods: {
    ...mapActions([
      'changeTheme',
      'checkTheme'
    ]),
    getTheme() {
      const isTheme = localStorage.getItem('theme')
      if (isTheme) {
        this.cheked = false
        this.checkTheme(isTheme);
      } else {
        this.cheked = true
        this.checkTheme(theme);
      }
    },
  },
  mounted() {
    this.getTheme()
  }
}
</script>

<style lang="scss" scoped>
.theme-switch__wrapper {
  z-index: 100;
  position: fixed;
  bottom: 2rem;
  right: 1rem;
  // transform: rotate(deg);
}
.theme-switch__label {
  position: relative;
  cursor: pointer;
}
.theme-switch__input {
  position: absolute;
  appearance: none;
  &:checked + .theme-switch__checkbox {
    border: 2px solid var(--color-green-light);
  }
  &:checked + .theme-switch__checkbox > .theme-switch__checkbox-circle {
    background-color: var(--color-bright);
    top: 66%;
  }
}
.theme-switch__checkbox {
  width: 26px;
  height: 60px;
  border-radius: 12px;
  border: 2px solid var(--color-green);
  position: relative;
  transition: 0.7s;
  padding: 1px;
}
.theme-switch__checkbox-circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  background-color: var(--color-bright);
  transition: 0.7s;
  position: absolute;
  top: 1px;
  left: 50%;
  transform: translateX(-50%);
}
.theme-switch__description {
}
</style>