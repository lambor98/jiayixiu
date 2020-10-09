<template>
  <div id="apps">
    <Nav />
    <router-view />
    <Footer/>
  </div>
</template>

<script>
 /* eslint-disable */
// import "@/assets/style/mobile.scss";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
export default {
  name: 'App',
  components: {
    Nav,
    Footer
  },
  
}
</script>

  

<style lang="scss">
.banner{
  img{
    width: 100%;
  }
}
</style>
