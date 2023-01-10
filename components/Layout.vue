<template>
    <div class="layout-content">
        <div class="d-flex flex-column h-100">
            <Header/>
            <div class="w-100" style="flex: 1">
                <component :is="content"/>
            </div>
            <Footer/>
        </div>
    
        <!-- Preloader -->
        <div class="pre-load" id="preloder-block" v-show="this.$store.state.loadingContent">
          <div class="loader-block">
              <img src="/beta/back-trans.svg?ver=0.2" style="max-width: 100px;" />
          </div>
        </div>
    </div>
</template>

<script>

export default {
  fetch({redirect}){
    redirect("/")
  },
  name: 'Layout',
  props: [ 'content', 'title' ],
  data() {
  },
}
</script>

<style scoped>
.layout-content {
    width: 100%;
    height: 100vh;
}
</style>
