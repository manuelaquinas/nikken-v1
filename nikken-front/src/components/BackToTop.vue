<template>
    <div>
      <div class="backto-top" @click="scrollToTop">
        <div>
          <img src="/images/stages/arrow-up.svg" alt="">
        </div>
      </div>
      ...
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      },
    },
  }
  </script>