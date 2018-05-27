<template>
  <div  class="template">
    <Header></Header>
    <main>
      <div class="preheader">
        <div class="wrapper">
          <div class="preheader__range">
            <Range></Range>
          </div>
          <div class="preheader__stars">
            <Stars></Stars>
          </div>
          <div class="preheader__select">

          </div>
        </div>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
    import Header from "../components/Header";
    import Footer from "../components/Footer";
    import Range from "../components/Range";
    import Stars from "../components/Stars";

    export default {
        name: "Home",
      components: {Stars, Range, Footer, Header}
    }
</script>

<style lang="sass" scoped>

</style>
