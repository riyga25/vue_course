<template>
    <div class="template">
      <Header></Header>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
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
