<script setup>
defineProps({
  stage_id: {
    type: Number,
    required: true
  },
  level_id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  is_active: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <div data-aos="fade-up" data-aos-delay="100" data-aos-once="true" class="col-12 mt--50 mt_md--30 mt_sm--30 "
    :id="'nivel-' + String(stage_id) + '-' + String(level_id)">
    <div class="container">
      <div class="active level-item section-stage">
        <div class="inner">
          <div class="thumbnail">

            <div class="activeLevelCard" data-bs-toggle="modal"
              :data-bs-target="`#ModalCenter-${String(stage_id)}-${String(level_id)}`" v-if="is_active">
              <div class="row level-card-container align-items-center">
                <img :src="`/images/levels/level${String(stage_id)}-${String(level_id)}.png`" alt=""
                  class="col-md-6 py-4">
                <h1 class="levelCardTitle col-md-6" v-html="title"></h1>
              </div>
              <div class="line"></div>
              <div v-if="level_id === getCurrentLevel && stage_id == getCurrentStage" class="flag-new-card">NEXT</div>
            </div>

            <div v-else>

              <div class="row level-card-container align-items-center" style="filter: grayscale();">
                <img :src="`/images/levels/level${String(stage_id)}-${String(level_id)}.png`" alt=""
                  class="col-md-6 py-4">
                <h1 class="levelCardTitle col-md-6" v-html="title"></h1>
              </div>
              
              <div class="line"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.activeLevelCard {
  cursor: pointer;
}

.level-card-container {
  border: solid 16px #ffffff;
  padding: 64px 51px;
  border-radius: 30px;
}

.levelCardTitle {
  font-size: 34px;
  color: #252525;
  margin: 0;
}

.levelCardTitle p {
  font-size: 28px;
  font-weight: 600;
  margin: 0;
}
.flag-new-card{
  background-color: #4fbabd;
  width: 80px;
  border-radius: 10px;
  position: absolute;
  top: 0px;
  color: white;
  padding: 5px 18px;
  right: 60px;
  font-weight: 600;
  font-size: 18px;
}
.line {
  border-right: 1px solid #686868;
  border-top: 1px solid #686868;
  width: 120px;
  height: 120px;
  position: absolute;
  top: 70px;
  right: 70px;
}
.levelCardTitleModal{
  font-size: 34px;
  color: #252525;
  margin: 0;
  font-weight: 700;
}
.levelCardTitleModal p{
  margin: 0 0 10px;
  font-weight: 500;
}
@media only screen and (min-width: 1400px) {
  .levelCardTitle {
  font-size: 54px;
  color: #252525;
  margin: 0;
  font-weight: 700;
}

.levelCardTitle p {
  font-size: 38px;
  font-weight: 600;
  margin: 0;
}
}
@media only screen and (max-width: 767px) {
  .line {
    display: none;
  }
  .flag-new-card{
    right: 30px;
}
  .level-card-container {
    border: solid 16px #ffffff;
    padding: 30px 30px;
    border-radius: 30px;
  }
  .levelCardTitle {

  padding-top: 24px;
}
.levelCardTitleModal{
  font-size: 24px;
  color: #252525;
  margin: 0;
  font-weight: 700;
}
.levelCardTitleModal p{
  font-size: 18px;
  margin: 0 0 10px;
}
}</style>

<script>
export default {
    data() {
      return {
        current_level: 0,
        current_stage: 0,
      }
    },
    computed: {
      getCurrentStage() {
          return this.$store.state.user.progress.stage_code;
        },
        getCurrentLevel() {
          return this.$store.state.user.progress.level_code;
        },
    },
    async created() {
      this.current_level = this.$store.state.user.progress.level_code;
      this.current_stage = this.$store.state.user.progress.stage_code;
    },
}
</script>