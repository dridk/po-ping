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
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    drawerOpen: false
  }),
};
</script>
