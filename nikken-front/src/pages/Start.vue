<script setup>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import UserService from "../services/user.service";
import StagesService from "../services/stages.service";
import BackToTop from "../components/BackToTop.vue";
import encryptionService from "../services/encryption.service";
import introJs from "intro.js";
import "intro.js/introjs.css";
</script>

<template>
  <head>
    <title>Nikken | WE Journey</title>
  </head>
  <nav class="d-flex align-items-center justify-content-between">
    <div class="m-3 p-4" id="top-page">
      <a :href="getHomeURL">
        <img src="/images/logo.svg" class="logo" alt="" />
      </a>
    </div>
    <div class="user-name m-3 flex-column">
      <p class="m-0 p-0 user">{{ getUser }}</p>
    </div>
  </nav>
  <div
    class="rn-hello-area rn-section-gap section-separator"
    id="hello"
  >
    <div class="container card-demo">
      <div class="col-lg-12">
        <div
          class="data-aos card-demo"
          data-aos="fade-up"
          data-aos-duration="500"
          data-aos-delay="100"
          data-aos-once="true"
          data-title="Welcome!"
          data-intro="Welcome to <b>Nikken!</b>👋<br><br> 
          Let's Start your We start Journey!"
        >
          <img
            src="/images/home/start.png"
            alt=""
            class="section-start d-none d-md-block"
          />
          <img
            src="/images/home/start-m.png"
            alt=""
            class="section-start d-block d-md-none"
          />
        </div>
        <div
          class="row section-start align-items-center card-demo"
          data-title="Stages section"
          data-intro="In this section you will find each of the Stages that make up the course. By clicking on a Stage you will be able to access each of the levels that compose it.<br><br>

          Let's get started!"
        >
          <div class="col-3" v-for="stage in getStages()">
            <div v-if="stage.code <= getCurrentStage()">
              <router-link :to="`/stage/${String(stage.code)}`">
                <img
                  :src="`/images/home/${String(stage.code)} ${stage.name}.png`"
                  alt=""
                />
              </router-link>
            </div>
            <div v-else>
              <img
                :src="`/images/home/${String(stage.code)} ${stage.name}.png`"
                alt=""
                style="filter: grayscale()"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <BackToTop />
</template>

<style>
.logo {
  height: 60px;
}
.user-name {
  padding: 10px 30px;
  background-color: #bddfe0;
  border-radius: 10px;
}
.user {
  color: #0e656f;
  font-size: 18px;
  font-weight: 600;
  line-height: 95%;
}
.section-start {
  padding: 10px 60px;
}
@media only screen and (max-width: 767px) {
  .section-start {
    padding: 10px 20px;
  }
}
</style>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    setTimeout(() => {
      introJs().start();
    }, 500);
  },
  computed: {
    getUser() {
      return this.$store.state.user.name;
    },
  },
  async created() {
    const route = useRoute();
    const store = useStore();
    if (!route.query.consultant_id || !route.query.name || !route.query.lang) {
      window.alert("Missing parameters, redirecting to nikken site");
      window.location.href = "http://mynikken.com/";
      return;
    }
    // let nikken_id = await encryptionService.decrypt(route.query.consultant_id);
    // let name = await encryptionService.decrypt(route.query.name);
    // let language = await encryptionService.decrypt(route.query.lang);
    let nikken_id = route.query.consultant_id;
    let name = route.query.name;
    let language = route.query.lang;
    if (!nikken_id || !name || !language) {
      window.alert(
        "The provided user does not exist, redirecting to nikken site"
      );
      window.location.href = "http://mynikken.com/";
      return;
    }
    var user_data = await UserService.getUser(nikken_id);
    if (!user_data) {
      var isUserCreated = await UserService.createUser(
        nikken_id,
        name,
        language
      );
      if (!isUserCreated) {
        //Create server error page
        return;
      }
      user_data = {
        nikken_id: nikken_id,
        name: name,
        language: language,
      };
    }
    if (document.cookie.indexOf("session") == -1) {
      await UserService.logUser(nikken_id);
    }
    store.commit("updateUser", user_data);
    var progress_data = await UserService.getUserProgress(nikken_id);
    store.commit("updateProgress", progress_data);
    let stages = await StagesService.getStages();
    store.commit("updateStages", stages);
    store.commit("updateHomeURL", window.location.href);
  },
  methods: {
    getCurrentStage() {
      return this.$store.state.user.progress.stage_code;
    },
    getStages() {
      return this.$store.state.stages;
    },
  },
};
</script>
