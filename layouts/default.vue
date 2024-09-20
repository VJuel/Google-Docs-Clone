<template>
  <div class="layout">
    <slot />
  </div>
</template>

<script>
export default {
  data() {
    return {
      layout: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    };
  },
  computed: {
    classObject() {
      return {
        active: this.isActive && !this.error,
        "text-danger": this.error && this.error.type === "fatal",
      };
    },
  },
};
</script>
