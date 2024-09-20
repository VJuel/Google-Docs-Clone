<template>
  <button @click="loginWithGoogle">Se connecter avec Google</button>
</template>

<script setup>
async function loginWithGoogle() {
  const { data } = await useAsyncData("auth", () => $fetch("/api/auth"));
}
</script>
