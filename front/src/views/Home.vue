<template>
  <v-container>
     <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            prepend-icon="fas fa-search"
            label="Rechercher un problème, un auteur, ..."
            single-line
            hide-details
          />
          <v-spacer />
        </v-card-title>

        <v-data-table
          dense
          :headers="headers"
          :items="problems"
          :search="search"
          :items-per-page="15"  
        >
          <template #[`item.completed`]="{ item }">
            <v-tooltip bottom v-if="item.completed">
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  small
                  v-bind="attrs"
                  v-on="on"
                  color="accent"
                >
                  far fa-check-square
                </v-icon>
              </template>
              <span>Vous avez terminé l'exercice le {{ completed }}</span>
            </v-tooltip>
            <v-icon
              v-else
              small
            >
              far fa-square
            </v-icon>
          </template>

          <template #[`item.creation`]="{ item }">
            <router-link
              :to="'/profile/' + item.creation.author"
            >{{ item.creation.author }}</router-link>
            le {{ item.creation.date }}
          </template>

          <template #[`item.level`]="{ item }">
            <v-icon
            v-for="i in item.level" v-bind:key="i"
              small
              color="accent"
            >
              fas fa-star
            </v-icon>
          </template>

          

          <template #[`item.successRate`]="{ item }">
              <div style="display: inline-block; width: 100px; height: 10px; background: #eee; border: 1px solid #aaa">
                <div style="height: 8px; background: #03a9f4" :style="{ width: `${Math.floor(100 * item.successRate)}px` }" >
                </div>
              </div>
          </template>

          <template #[`item.actions`]="{ item }">
            <v-icon
              small
              class="mr-2"
            >
              fa-pen
            </v-icon>
            <v-icon
              small
              class="mr-2"
              @click="deleteConfirmation(item)"
            >
              fas fa-trash
            </v-icon>
          </template>
        </v-data-table>
  
      </v-card>
  </v-container>
</template>

<script>
  export default {
    name: 'Home',

    data: () => ({
      headers: [
        { text: '', value: 'completed', width: "20px" },
        { text: 'Difficulté', value: 'level', width: "125px" },
        { text: 'Problème', value: 'title' },
        { text: 'Auteur', value: 'creation', },
        { text: 'Taux de réussite', value: 'successRate', align: "right", width: "120px" },
      ],
      search: "",
      problems: [],
      prolemEditor: {
        open: false,
        id: null,
        title: "",
        author: "",
        tags: [],
        text: "",
        input: null,
        answer: null,
      }
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
          const s = Math.floor(Math.random() * 2000);
          this.problems.push({
            id: i,
            title: `Problème n°${i}`,
            level: Math.floor(Math.random() * 5) + 1,
            creation: { author: "dridk", date: "13/05/2020" },
            completed: Math.floor(Math.random() * 5) === 1 ? "22/10/2021" : null,
            stats: { try: 2340, success: s },
            successRate: s / 2340.0,
            actions: true
          })
        }
      },
      resetDialog (open = false) {
        this.prolemEditor.open = open;
        this.prolemEditor.id = null;
        this.prolemEditor.title = null;
        this.prolemEditor.text = null;
        this.prolemEditor.year = new Date().getFullYear();
      },
      deleteConfirmation(problem) {
        console.log("supprimer le probleme ?", problem)
      },
      filterByAuthor(author) {
        this.search += ` ${author}`;
      }
    }
  }
</script>
