<template>
  <v-container>
    <v-data-table
      dense
      :headers="headers"
      :items="problems"
      class="elevation-1"
  ></v-data-table>
  </v-container>
</template>

<script>
  export default {
    name: 'Home',

    data: () => ({
      headers: [
        { text: 'Problème', value: 'title' },
        { text: 'Auteur', value: 'author' },
        { text: 'Difficulté', value: 'level' },
      ],
      problems: []
    }),
    mounted() {
      // On charge les informations sur le thème à utiliser depuis le localstorage du browser
      const theme = localStorage.getItem("dark_theme");
      if (theme) {
          if (theme == "true") {
              this.$vuetify.theme.dark = true;
          } else {
              this.$vuetify.theme.dark = false;
          }
      }

      this.init();
    },
    methods: {
      init() {
        // On récupère la liste des problèmes
        for (let i=0; i<= 50; i++) {
          this.problems.push({
            id: i,
            title: `Problème n°${i}`,
            level: 3,
          })
        }
      }
    }
  }
</script>
