<template>
      <header class="header">
        <div class="wrapper header__container">
          <router-link class="header__left" :to="{name:'home'}" >Прогуляй стипендию!</router-link>
          <div class="header__center">
            Размер стипендии <input type="text" class="h-money" @keyup="changeMoney" :value="money"> ₽
          </div>
          <router-link :to="{name:'add'}" class="header__right">
            Добавить место
          </router-link>
        </div>
      </header>
</template>

<script>
    export default {
      name: "Header",
      data(){
        return {
          money: Number
        }
      },
      methods:{
        changeMoney(self){
          this.money = self.target.value;
          this.$store.commit('howmachUpdate',{money: this.money});
        }
      },
      beforeMount() {
        this.money = this.$store.state.filters.howMach;
      }
    }
</script>
