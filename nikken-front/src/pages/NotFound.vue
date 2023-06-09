<template>
     <head>
        <title>404 | Page not found</title>
    </head>
    <nav>
        <div class="m-4 p-4">
            <a :href="getHomeURL">
               <img src="/images/logo.svg" class="logo" alt="">
            </a>
        </div>
    </nav>
     <img src="\images\error\404-error.png">
</template>

<script>
export default {
     computed: {
        getHomeURL() {
          return this.$store.state.home_url;
        },
     },
}
</script>