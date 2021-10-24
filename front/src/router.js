import Vue from "vue";
import VueRouter from "vue-router"
import Home from "./views/Home.vue";
import E404 from "./views/E404.vue";
import About from "./views/About.vue";

Vue.use(VueRouter);

export const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            component: Home,
        },
        {
            path: "/about",
            component: About
        },

        // Error management
        {
            path: "/404",
            component: E404
        },
        {
            path: "*",
            redirect: "/404"
        }
    ]
});
