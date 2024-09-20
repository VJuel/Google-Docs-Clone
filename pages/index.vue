<script setup>
import AppAlert from "~/components/AppAlert.vue";
import DataArray from "~/components/DataArray.vue";
import { ref } from "vue";

const title = ref("Home");
const documentContent = ref(null); // Initialisez documentContent à null
const isAuthenticated = ref(false);

useHead({
  title: "My App",
  meta: [{ name: "description", content: "My amazing site." }],
  bodyAttrs: {
    class: "test",
  },
});

// Fonction pour se connecter via Google
async function login() {
  try {
    const { data, error } = await useFetch("/api/auth"); // Redirige vers Google pour l'authentification
    if (error) {
      console.error("Erreur lors de la connexion :", error);
    } else {
      isAuthenticated.value = true;
    }
  } catch (error) {
    console.error("Erreur de connexion :", error);
  }
}

// Fonction pour se déconnecter
async function logout() {
  try {
    const { error } = await useFetch("/api/auth/logout", { method: "POST" });
    if (error) {
      console.error("Erreur lors de la déconnexion :", error);
    } else {
      isAuthenticated.value = false;
      documentContent.value = null;
    }
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
  }
}

// Fonction pour récupérer un document Google Docs
async function getDocument() {
  try {
    const { data, error } = await useFetch("/api/googleDocs", {
      method: "GET",
    });
    if (error) {
      console.error("Erreur lors de la récupération du document :", error);
    } else {
      documentContent.value = parseDocumentContent(data.value);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du document :", error);
  }
}

// Fonction pour parser le contenu du document Google Docs
function parseDocumentContent(content) {
  let parsedContent = "";
  content.body.content.forEach((element) => {
    if (element.paragraph) {
      element.paragraph.elements.forEach((elem) => {
        parsedContent += elem.textRun ? elem.textRun.content : "";
      });
    }
  });
  return parsedContent;
}
</script>

<template>
  <h1>{{ title }}</h1>

  <div>
    <button v-if="!isAuthenticated" @click="login">
      Se connecter avec Google
    </button>
    <button v-if="isAuthenticated" @click="logout">Se déconnecter</button>
    <button v-if="isAuthenticated" @click="getDocument">
      Récupérer le document
    </button>

    <div v-if="documentContent && documentContent.length > 0">
      <h2>Contenu du document :</h2>
      <pre>{{ documentContent }}</pre>
    </div>
    <div v-else-if="isAuthenticated">
      <p>Aucun contenu de document disponible pour le moment.</p>
    </div>
  </div>

  <DataArray />
</template>
