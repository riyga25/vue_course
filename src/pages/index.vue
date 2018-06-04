<template>
    <div class="template">
      <Header></Header>
      <router-view></router-view>
      <Footer></Footer>
    </div>
</template>

<script>
    import Header from "../components/Header";
    import Footer from "../components/Footer";
    export default {
        name: "index",
      components: {Footer, Header}
    }
</script>
