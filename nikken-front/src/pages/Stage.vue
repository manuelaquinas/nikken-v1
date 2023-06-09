<script setup>
import LevelCard from '../components/LevelCard.vue'
import LevelContent from '../components/LevelContent.vue'
import UserService from '../services/user.service'
import StagesService from '../services/stages.service'
import BackToTop from '../components/BackToTop.vue'

defineProps({
    code: {
        type: String,
        required: true
    },
})
</script>

<template>
    <head>
        <title>{{'Stage ' + code + ' | ' + stage_name }}</title>
    </head>
    <!-- <nav class="navbar d-flex align-items-center justify-content-between"> -->
    <nav class="navigation">
        <!-- <div class="m-3 p-4" id="top-page"> -->
        <div>
            <a :href="getHomeURL">
                <img src="/images/logo.svg" class="logo" alt="">
            </a>
        </div>
        <div>
            <p class="stage-name">{{'Stage ' + code + ' | ' + stage_name }}</p>
        </div>
        <!-- <div class="user-name m-3 flex-column"> -->
        <div class="user-name">
            <p class="m-0 p-0 user">{{ getUser }}</p>
        </div>
    </nav>
    <main class="main">
        <div class="rn-section-gap section-separator" id="journey">
        <!-- <div class="rn-section-gap" id="journey"> -->
            <div class="container">
                <div class="col-12 section-stage">
                    <div data-aos="fade-up" data-aos-duration="200" data-aos-delay="100" data-aos-once="true">
                        <img :src="`/images/stages/stage${code}.png`" alt="">
                    </div>

                    <div class="stageDescription">{{ description_stage }}</div>

                    <div class="col-12 d-none d-md-flex flex-wrap justify-content-between py-4" data-aos="fade-up"
                        data-aos-duration="300" data-aos-delay="200" data-aos-once="true">
                        <template v-for="level in getLevels">

                            <div v-if="(code < getCurrentStage) || (code == getCurrentStage && level.code <= getCurrentLevel)" class="col-6 col-md-4 position-relative  p-4 ">
                                <a :href="`#nivel-${level.stage_code}-${level.code}`" class=" row align-items-center justify-content-center justify-content-md-around">
                                <div class="col-3 number-level">{{ level.code }}</div>
                                <div class="col-8 title-level" v-html="level.title"></div>
                            </a>
                            <div v-if="level.code === getCurrentLevel && code == getCurrentStage" class="flag-new">NEXT</div>
                            </div>
                            <div v-else:
                                class="col-6 col-md-4 row align-items-center justify-content-center justify-content-md-around  p-4"
                                style="filter: grayscale();">
                                <div class="col-3 number-level">{{ level.code }}</div>
                                <div class="col-8 title-level" v-html="level.title"></div>
                            </div>
                        </template>
                    </div>

                    <div class="col-12 d-flex d-md-none flex-nowrap justify-content-between py-4 list-mobile"
                        data-aos="fade-up" data-aos-duration="300" data-aos-delay="200" data-aos-once="true">
                        <template v-for="level in getLevels">

                            <div v-if="(code < getCurrentStage) || (code == getCurrentStage && level.code <= getCurrentLevel)"
                                class="col-8 col-md-4 p-4  position-relative">
                                <a :href="`#nivel-${level.stage_code}-${level.code}`"
                                    class="row align-items-center justify-content-center justify-content-md-around">
                                    <div class="col-3 number-level">{{ level.code }}</div>
                                    <div class="col-8 title-level mb--0" v-html="level.title"></div>
                                </a>
                                <div class="flag-new">NEXT</div>
                            </div>
                            <div v-else:
                                class="col-8 col-md-4 row align-items-center justify-content-center justify-content-md-around  p-4"
                                style="filter: grayscale();">
                                <div class="col-3 number-level">{{ level.code }}</div>
                                <div class="col-8 title-level" v-html="level.title"></div>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="row" v-for="level in getLevels">
                    <LevelCard :stage_id="level.stage_code" :level_id="level.code" :title="level.title"
                        :is_active="(code < getCurrentStage) || (code == getCurrentStage && level.code <= getCurrentLevel)" />
                </div>
            </div>
                <template v-for="level in getLevels">
                    <LevelContent 
                    :stage_id="code" 
                    :level_id="String(level.code)" 
                    :description="level.description"
                    :title="level.title" 
                    :video_url="level.video_url" 
                    :pdf_url="level.pdf_url"
                    :image_route="level.image_route" 
                    @update="update" 
                    />
                </template>   
        </div>
    <BackToTop/>
    </main>
</template>
<style>
.navigation{
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  width: 100%;
  max-width: 1200px;
  height: 120px;
  background-color: #ebeff0;
  z-index: 999;
  border: 1px solid #c7c7c76c;
  border-radius: 10px 10px;
  padding: 0 30px;
  border-radius: 0 0 10px 10px;
}
.stage-name{
    color: #38696d;
    font-weight: 600;
    font-size: 25px;
    user-select: none;
}
.main{
    margin-top: 60px;
}
.stageDescription{
    margin: 40px 0;
    font-size: 24px;
}
#confetti-canvas {
    z-index: 100000000;
}
.logo {
    height: 60px;
}
.user-name{
    padding: 10px 30px;
    background-color: #bddfe0;
    border-radius: 10px;
    user-select: none;
}
.user{
    color: #0e656f;
    font-size: 18px;
    font-weight: 600;
    line-height: 95%;
}
.section-stage {
    padding: 10px 30px;
}

.number-level {
    font-size: 84px;
    font-weight: 900;
    color: #95D6D7;
    opacity: 1;
    line-height: 90%;
    display: flex;
    justify-content: center;
}

.title-level {
    color: #252525;
    font-size: 18px;
    font-weight: 600;
    line-height: 95%;
}

.title-level p {
    margin: 0;
    line-height: 95%;
    font-size: 16px;
}

.flag-new {
    background-color: #4fbabd;
    width: 60px;
    border-radius: 10px;
    position: absolute;
    top: 0px;
    color: white;
    padding: 4px 10px;
    right: 0px;
    font-weight: 600;
    font-size: 15px;
}

@media only screen and (min-width: 1400px) {
    .section-stage {
        padding: 10px 30px;
    }

    .number-level {
        font-size: 105px;
        font-weight: 900;
        color: #95D6D7;
        opacity: 1;
        line-height: 90%;
        display: flex;
        justify-content: center;
    }

    .title-level {
        color: #252525;
        font-size: 22px;
        font-weight: 600;
        line-height: 95%;
    }

    .title-level p {
        margin: 0;
        line-height: 95%;
        font-size: 18px;
    }

}

@media only screen and (max-width: 767px) {

    .list-mobile {
        overflow-x: scroll;
    }

    .logo {
        height: 40px;
    }

    .section-stage {
        padding: 10px 0px;
    }

    .number-level {
        font-size: 50px;
        font-weight: 900;
        color: #95D6D7;
        opacity: 1;
        line-height: 90%;
        display: flex;
        justify-content: center;
    }

    .title-level {
        color: #252525;
        font-size: 18px;
        font-weight: 600;
        line-height: 95%;
    }

    .title-level p {
        margin: 0;
        line-height: 95%;
        font-size: 16px;
    }
}
</style>
<script>
export default {
    data() {
        return {
            current_level: 0,
            levels: [],
            stage_name: '',
            description_stage: '',
        }
    },
    computed: {
        getLevels() {
            return this.levels;
        },
        getCurrentLevel() {
            return this.current_level;
        },
        getCurrentStage() {
            return this.$store.state.user.progress.stage_code;
        },
        getHomeURL() {
            return this.$store.state.home_url;
        },
        getUser() {
            return this.$store.state.user.name;
        },
    
    },
    async created() {
        if(!this.$store.state.stages[this.code-1]) {
            this.$router.push('/page-not-found')
        } else {
            this.current_level = this.$store.state.user.progress.level_code;
            this.levels = await StagesService.getStageLevels(this.code);
            this.stage_name = this.$store.state.stages[this.code-1].name;
            this.description_stage = this.$store.state.stages[this.code-1].description;
        }
    },
    methods: {
        // goToPreviousLevel() {
        //     console.log("Previus Level", `#ModalCenter-${this.stage_id}-${this.level_id--}`)
        //     // this.current_level--;
        //     // console.log(this.current_level)
        //     window.$(`#ModalCenter-${this.stage_id}-${this.level_id--}`).modal("show");
        // },
        // goToNextLevel() {
        //     console.log("Next Level", `#ModalCenter-${this.stage_id}-${this.level_id++}`)
        //     // this.current_level++;
        //     // console.log(this.current_level)
        //     window.$(`#ModalCenter-${this.stage_id}-${this.level_id++}`).modal("show");
        // },
        async update() {
            if(document.cookie.indexOf('session') == -1) {
                window.location.href = this.getHomeURL
            }
            let passedLevel = await UserService.updateUserProgress(this.$store.state.user.nikken_id, true, true);
            if (passedLevel) {
                let progress_data = await UserService.getUserProgress(this.$store.state.user.nikken_id);
                this.$store.commit('updateProgress', progress_data);
                if (this.$store.state.user.progress.stage_code == this.code) {
                    this.current_level = this.$store.state.user.progress.level_code;
                } else {
                    this.$confetti.start();
                    window.alert('Congratulations! you passed onto the next stage');
                }
            }
        }
    }
}
</script>