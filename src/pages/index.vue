<template>
    <div class="template">
      <Header></Header>
      <transition :name="transitionType" mode="out-in">
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
      components: {Footer, Header},
      data: function () {
          return{
            transitionType : 'slide-left'
          }
      },
      watch: {
        '$route' (to, from) {
          const toDepth = to.path.split('/').length;
          const fromDepth = from.path.split('/').length;
          this.transitionType = toDepth < fromDepth ? 'slide-right' : 'slide-left'
        }
      },
      created(){
        this.$nextTick(()=> {
            this.$store.dispatch('loadData');
            this.$store.dispatch('loadCategories')
          }
        )
      }
    }
</script>
<style lang="scss" scoped>
  .slide-left-enter, .slide-right-leave-to {
    -webkit-transform: translate(40px, 0);
    transform: translate(40px, 0);
    opacity: 0;
  }
  .slide-left-leave-to, .slide-right-enter {
    -webkit-transform: translate(-40px, 0);
    transform: translate(-40px, 0);
    opacity: 0;
  }
  .slide-right-enter-active,
  .slide-left-enter-active,
  .slide-right-leave-active,
  .slide-left-leave-active {
    transition: all .3s ease-out;
  }


  .slide-fade-enter-active {
    transition: all .8s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(50px);
    opacity: 0;
  }
</style>
