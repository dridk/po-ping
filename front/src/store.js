import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { parseAxiosResponse } from './middleware/commonHelper';
import { format } from "date-fns";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isInitialized: false, // est-ce que le store a été initialisé ou pas
        user: null, // les infos sur l'utilisateur connecté
        notifications: [], // les notifications affichées dans la bar d'application
        unreadNotifications: 0, // le nombre de notification non lu par
        settings: null, // les paramètres actuels du site
        // Notification popup
        notif: {
            displayed: false,
            title: "",
            msg: "",
            log: ""
        },
        // Warning popup
        warning: {
            displayed: false,
            msg: "",
            log: ""
        },
        // Erreur popup
        error: {
            displayed: false,
            query: "",
            msg: "",
            log: ""
        }
    },
    mutations: {
        setCurrentUser(state, user) {
            if (user) {
                // Get user avatar url
                const idAsStr = `${user.id}`;
                user.avatarUrl = `/files/avatars/${idAsStr.padStart(3, '0')}.png`;
            } else {
                state.user = null;
            }

            state.user = user;
        },
        updateUser(state, user) {
            state.user = user;
        },
        updateSettings(state, settings) {
            state.settings = settings;
            // TODO: déterminer en fonction de la dernière visite du user si il faut lui afficher l'annonce ou pas (1x par jour pas plus)
        },

        // ========
        // NOTIF methods
        onNotif(state, info) {
            state.notif.title = info[0];
            state.notif.msg = info[1];
            state.notif.displayed = true;
        },
        onWarning(state, message) {
            state.warning.msg =  message;
            state.warning.log = format(new Date(), "yyyy.MM.dd.HH.mm.ss");
            state.warning.displayed = true;
        },
        onError(state, axiosError) {
            console.log(axiosError)
            state.error.query = axiosError && axiosError.config ? `${axiosError.config.method.toUpperCase()} ${axiosError.config.url}` : "";
            state.error.log = format(new Date(), "yyyy.MM.dd.HH.mm.ss");
            state.error.displayed = true;

            if (axiosError.response) {
                state.error.htmlError = `${axiosError.response.status} ${axiosError.response.statusText}`;
                state.error.msg =  axiosError.response.data ? axiosError.response.data.message : axiosError;
            } else if (axiosError.request) {
                state.error.htmlError = `${axiosError.request.status} ${axiosError.request.statusText}`;
                state.error.msg =  axiosError;
            } else {
                state.error.htmlError = "Probleme IHM (probablement)";
                state.error.msg =  axiosError;
            }
        },
    },
    actions: {
        initStore(state) {
            if (!state.isInitialized) {
                // On récupère les infos de base
                axios.get(`/api/welcom`).then(response => {
                    const data = parseAxiosResponse(response);
                    // On met à jour le modèle
                    this.commit("updateSettings", data.settings);
                    this.commit("updateCitation", data.citation);
                    this.commit("updateNotifications", data.notifications);

                    // On indique que le modèle est initialisé, pour éviter de le refaire
                    state.isInitialized = true;
                });
            }
        },
    }
});
