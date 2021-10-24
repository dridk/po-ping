<template>
  <v-app>
    <v-navigation-drawer app v-model="drawerOpen">
    <!-- -->
  </v-navigation-drawer>

    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-app-bar-nav-icon
          v-if="!$vuetify.breakpoint.lgAndUp"
          data-cy="menuButton"
          @click.stop="drawerOpen = !drawerOpen"
        />

        Panda Oneliner
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <v-icon left>fas fa-user-circle</v-icon>
        <span class="mr-2">dridk</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
        <v-dialog
      v-model="notif.displayed"
      class="msgDiallog"
      width="500px"
    >
      <v-card>
        <v-card-title class="annonce">
          <v-icon
            color="#fff"
            left
          >
            fas fa-info-circle
          </v-icon> {{ notif.title }}
        </v-card-title>
        <v-container
          grid-list-sm
          class="pa-4"
        >
          <div v-html="notif.msg" />
        </v-container>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click="notif.displayed=false"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="warning.displayed"
      class="msgDiallog"
      width="500px"
    >
      <v-card>
        <v-card-title class="warning">
          <v-icon
            color="#fff"
            left
          >
            fas fa-exclamation-triangle
          </v-icon> Attention
        </v-card-title>
        <v-container
          grid-list-sm
          class="pa-4"
        >
          <div v-html="warning.msg" />
        </v-container>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click="warning.displayed=false"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="error.displayed"
      class="msgDiallog"
      width="500px"
    >
      <v-card>
        <v-card-title class="error">
          <v-icon
            color="#fff"
            left
          >
            fas fa-exclamation-circle
          </v-icon> Une erreur s'est produite
        </v-card-title>
        <v-container
          grid-list-sm
          class="pa-4"
        >
          <pre><span style="font-weight: bold">Date:    </span> {{ error.log }}</pre>
          <pre><span style="font-weight: bold">Requête: </span> {{ error.query ? error.query : "-" }}</pre>
          <pre><span style="font-weight: bold">Status:  </span> {{ error.htmlError ? error.htmlError : "-" }}</pre>
          <pre style="border: 1px solid #999; margin-top: 10px; padding: 5px; white-space: pre-line;">{{ error.msg ? error.msg : "Aucune information sur l'erreur :(" }}</pre>
        </v-container>
        <v-card-actions>
          <v-btn
            text
            @click="copyError()"
          >
            <v-icon left>
              far fa-copy
            </v-icon> Copier l'erreur
          </v-btn>
          <v-spacer />
          <v-btn
            text
            @click="error.displayed=false"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import store from "./store";
import { mapState } from "vuex";
import { logoutUser } from "./middleware/authHelper"

export default {
  name: "App",
  store,
  data: () => ({
    drawerOpen: false
  }),
  computed: {
    ...mapState([
        "user",
        "notifications",
        "unreadNotifications",
        "error",
        "warning",
        "notif"
    ])
  },
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

      if (this.user) {
          this.init();
      }
  },
  methods: {
    init() {
        // On initialise le store
        store.dispatch("initStore");
    },
    logout() {
        logoutUser(store);
        this.$router.push("/login");
    },
  }
};
</script>
