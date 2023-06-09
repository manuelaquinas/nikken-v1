<script setup>
    import {Modal} from "bootstrap"
    import $ from "jquery"
    defineProps({
        stage_id: {
            type: String,
            required: true
        },
        level_id: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false,
            default: ''
        },
        video_url: {
            type: String,
            required: false,
            default: ''
        },
        pdf_url: {
            type: String,
            required: false,
            default: ''
        },
        image_route: {
            type: String,
            required: false,
            default: ''
        }
    })
</script>

<template>
    <div class="modal fade" :id="`ModalCenter-${stage_id}-${level_id}`" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-news" role="document">
            <div class="modal-content">
                <div style="background-image: url(/images/bg/bg-modal.jpg); background-size: cover;">
                    <div class="modal-structure">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" v-on:click="setShowFinishButton(false, 'close')"></button>
                        <div class="col-12 modal-space">
                            <div class="col-md-6 col-12"  v-if="video_url != ''">
                                <iframe width="560" height="315" :src="video_url"
                                    title="YouTube video player" frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowfullscreen></iframe>
                            </div>
                            <div class="col-md-6 col-12" v-if="image_route != ''">
                                <img :src="image_route" class="pdf-img">
                            </div>  
                            <div class="col-md-12 col-12 py-3">
                                <span v-html="title" class="levelCardTitleModal"></span>
                            </div>
                            <div class="description col-md-12 col-12" v-if="description != ''">
                                <span v-html="description"></span>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between" v-if="pdf_url != ''">
                            <button v-on:click="goToPreviousLevel"  data-bs-dismiss="modal"><img  v-if="level_id > 1 && getCurrentStage >= stage_id" class="changeLevel" src="/images/levels/arrow-left-circle-fill.svg" alt=""></button>
                            <div class="d-flex justify-content-center">
                                <a :href="pdf_url" target="_blank"><button class="rn-btn w-auto btn-center m-0  m-md-5" >Download file</button></a>
                                <button v-on:click="emitUpdateLevel('finish')" class="rn-btn w-auto m-0 mx-3 m-md-5" type="button" data-bs-dismiss="modal" aria-label="Close">Finish level</button>
                            </div>
                            <button v-on:click="goToNextLevel" data-bs-dismiss="modal"><img v-if="getCurrentLevel > level_id && getCurrentStage >= stage_id" class="changeLevel" src="/images/levels/arrow-right-circle-fill.svg" alt=""></button>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                showFinishButton: true,
            }
        },
        computed: {
            getCurrentLevel() {
                return this.$store.state.user.progress.level_code;
            },
            getCurrentStage() {
                return this.$store.state.user.progress.stage_code;
            },
            getShowFinishNButton() {
                return this.showFinishButton;
            },
        },
        created () {
        },
        methods: {
            async emitUpdateLevel(origin) {
                // this.showFinishButton = true;
                this.$emit("update");
                if(this.$store.state.user.progress.stage_code > this.stage_id) {
                    this.$confetti.stop();
                    if(origin === 'finish') {
                        window.location.href = window.location.href.replace(`/stage/${this.stage_id}`, `/stage/${this.$store.state.user.progress.stage_code}`)
                    }
                }
            },
            async setShowFinishButton(value, origin) {
                this.showFinishButton = value
                if(this.$store.state.user.progress.stage_code > this.stage_id) {
                    this.$confetti.stop();
                    if(origin === 'finish') {
                        window.location.href = window.location.href.replace(`/stage/${this.stage_id}`, `/stage/${this.$store.state.user.progress.stage_code}`)
                    }
                }
            },
            goToPreviousLevel() {
                console.log("Previus Level", `#ModalCenter-${this.stage_id}-${this.level_id--}`)
                // $(`#ModalCenter-${this.stage_id}-${this.level_id}`).modal("hide");
                $(`#ModalCenter-${this.stage_id}-${this.level_id--}`).modal("show");
            },
            goToNextLevel() {
                // console.log("Next Level", `#ModalCenter-${this.stage_id}-${this.level_id++}`)
                // window.$(`#ModalCenter-${this.stage_id}-${this.level_id++}`).modal("show");
                
                // var myModal = new bootstrap.Modal(document.getElementById(`ModalCenter-${this.stage_id}-${this.level_id++}`), {
                //     keyboard: false
                // })
                // var modalToggle = document.getElementById(`ModalCenter-${this.stage_id}-${this.level_id++}`) // relatedTarget
                // myModal.show(modalToggle)
                console.log("Next level", `#ModalCenter-${this.stage_id}-${this.level_id}`)
                // var myModalEl = document.getElementById(`#ModalCenter-${this.stage_id}-${this.level_id}`)
                
                // var modal = Modal.getInstance(myModalEl)
                // modal.hide()
                // myModal = new Modal(document.getElementById(`#ModalCenter-${this.stage_id}-${this.level_id}`), {})
                // myModal.hide()
                // $(`#ModalCenter-${this.stage_id}-${this.level_id}`).modal("hide");
                $(`#ModalCenter-${this.stage_id}-${this.level_id++}`).modal("show");
            
            }
        }
    }
</script>
<style>
    .description{
        line-height: 35px;
    }
    .changeLevel{
        width: 40px;
    }
    .changeLevel:hover{
        cursor: pointer;
    }

</style>