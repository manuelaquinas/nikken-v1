import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Start from './pages/Start.vue'
import Stage from './pages/Stage.vue'
import NotAllowed from './pages/NotAllowed.vue'
import NotFound from './pages/NotFound.vue'
import VuexPersistence from 'vuex-persist'
import VueConfetti from 'vue-confetti'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import 'jquery'
import 'aos'

import './assets/css/style.css'
import './assets/css/plugins/feature.css'


const routes = [
    { path: '/', component: Start },
    { path: '/stage/:code', component: Stage, props: true },
    { path: '/not-allowed', component:  NotAllowed },
    { path: '/page-not-found', component: NotFound },
    { path: '/:pathMatch(.*)*', redirect: "/page-not-found" },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

const store = createStore({
    state () {
        return {
            user: {
                nikken_id: '',
                name: '',
                language: 'en',
                progress: {}
            },
            stages: [],
            home_url: '',
        }
    },
    mutations: {
        updateUser (state, user_data) {
            state.user.nikken_id = user_data.nikken_id;
            state.user.name = user_data.name;
            state.user.language = user_data.language;
        },
        updateProgress (state, progress) {
            state.user.progress = progress;
        },
        updateStages (state, stages) {
            state.stages = stages;
        },
        updateHomeURL (state, home_url) {
            state.home_url = home_url
        }
    },
    plugins: [
        new VuexPersistence().plugin
    ]
});

const app = createApp(App);
app.use(router);
app.use(store);
app.use(VueConfetti);
app.mount('#app');