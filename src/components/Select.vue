<template>
  <div class="select-container">
    <select name="category" id="place-category" v-model="category.id" v-on:change="wtfCategory">
      <option value="all" selected="selected">Все</option>
      <option v-for="option in options" :key="option.id" :value="option.id">{{option.name}}</option>
    </select>
  </div>
</template>

<script>
    export default {
        name: "Select",
        data(){
          return{
            category:{},
          }
        },
      computed:{
        options(){
          return this.$store.state.categories;
        }
      },
      methods:{
        wtfCategory(){
          var cat = this.category;
          var options = this.options;

          options.forEach(function (option) {
            if(option.id === cat.id){
              cat.name = option.name;
              cat.id = option.id;
            }
          });

          this.$emit('selectCategory',cat);
        }
      }
    }
</script>

<style lang="scss" scoped>

  .select-container{
    position: relative;

    &::after,
    &::before{
      content: '';
      position: absolute;
      top: 24px;
      height: 1px;
      width: 13px;
      background: #bdbdbd;
    }
    &::after{
      transform: rotate(45deg);
      right: 18px;
    }
    &::before{
      transform: rotate(-45deg);
      right: 10px;
    }
  }

</style>
