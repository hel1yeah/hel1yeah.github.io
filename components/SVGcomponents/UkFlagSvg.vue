<template>
  <svg
    class="flag-svg"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 24"
    width="32"
    height="24"
  >
    <!-- Blue background -->
    <rect width="32" height="24" fill="#012169" />

    <!-- White diagonals (wider for St Patrick's background) -->
    <g fill="none" stroke="white" stroke-width="5.3">
      <path d="M0,0 L32,24" />
      <path d="M32,0 L0,24" />
    </g>

    <!-- Red diagonals (St Patrick's Cross) -->
    <g fill="none" stroke="#C8102E" stroke-width="3.2">
      <path d="M0,0 L32,24" />
      <path d="M32,0 L0,24" />
    </g>

    <!-- White cross (wider for St George's background) -->
    <g fill="none" stroke="white" stroke-width="8">
      <path d="M16,0 L16,24" />
      <path d="M0,12 L32,12" />
    </g>

    <!-- Red cross (St George's Cross) -->
    <g fill="none" stroke="#C8102E" stroke-width="4.8">
      <path d="M16,0 L16,24" />
      <path d="M0,12 L32,12" />
    </g>
  </svg>
</template>

<script>
export default {
  name: "UkFlagSvg",
};
</script>

<style lang="scss" scoped>
.flag-svg {
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}
</style>
