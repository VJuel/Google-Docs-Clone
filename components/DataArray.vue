<template>
  <div>
    <button @click="createDocument">Créer et Remplacer les Balises</button>

    <!-- Affichage de l'ID du document créé -->
    <div v-if="documentId">
      <p>Document créé avec succès. ID : {{ documentId }}</p>
    </div>

    <!-- Affiche le contenu du document s'il est disponible -->
    <div v-if="documentContent && documentContent.length > 0">
      <h2>Contenu du document :</h2>
      <pre>{{ documentContent }}</pre>
    </div>
    <div v-else-if="documentId">
      <p>Chargement du contenu du document...</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useFetch } from "#app";

const documentId = ref(null); // Référence réactive pour l'ID du document
const documentContent = ref(null); // Référence réactive pour le contenu du document

async function createDocument() {
  try {
    // Appel à l'API pour créer un document Google Docs
    const { data, error } = await useFetch("/api/googleDocs", {
      method: "POST",
    });

    if (error.value) {
      console.error("Erreur lors de la création du document", error.value);
      return;
    }

    documentId.value = data.value.documentId;

    // Appel pour récupérer le contenu du document
    const docResponse = await useFetch(`/api/googleDocs/${documentId.value}`, {
      method: "GET",
    });

    if (docResponse.error) {
      console.error(
        "Erreur lors de la récupération du contenu du document",
        docResponse.error,
      );
      return;
    }

    // Parse le contenu du document et l'assigne à documentContent
    documentContent.value = docResponse.data.body.content
      .map((item) => {
        return item.paragraph
          ? item.paragraph.elements
              .map((el) => (el.textRun ? el.textRun.content : ""))
              .join("")
          : "";
      })
      .join("\n");
  } catch (error) {
    console.error(
      "Erreur lors de la création du document ou de la récupération du contenu",
      error,
    );
  }
}
</script>
