<template>
  <svg
    class="flag-svg"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 24"
    width="32"
    height="24"
  >
    <rect width="32" height="12" y="0" fill="#0057B7" />
    <rect width="32" height="12" y="12" fill="#FFD700" />
  </svg>
</template>

<script>
export default {
  name: "UkraineFlagSvg",
};
</script>

<style lang="scss" scoped>
.flag-svg {
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}
</style>
