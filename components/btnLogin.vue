<template>
  <button @click="loginWithGoogle">Se connecter avec Google</button>
</template>

<script setup>
async function loginWithGoogle() {
  // Appel à l'API backend pour obtenir l'URL de Google
  const { data } = await $fetch("/api/auth");

  // Rediriger l'utilisateur vers l'URL d'authentification Google
  window.location.href = data;
}
</script>
