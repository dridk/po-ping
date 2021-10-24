import '@fortawesome/fontawesome-free/css/all.css';
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'fa'
    },
    
  theme: {
    themes: {
      light: {
        primary: colors.lightBlue,
        secondary: colors.grey,
        accent: colors.blue,
        error: colors.red,
        warning: colors.orange,
      },
      dark: {
        primary: colors.blue.lighten3,
      },
    },
  },
});
