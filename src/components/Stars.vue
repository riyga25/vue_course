<template>
  <div class="star-rating">
    <label class="star-rating__star"
      v-for="rating in ratings"
      :class="{'active': ((value >= rating) && rating != null), 'disabled': disabled}"
      @click="set(rating)"
      @mouseover="star_over(rating)"
      @mouseout="star_out"
    >
    ★
    <input class="star-rating__checkbox" type="radio"
      :inValue="rating"
      v-model="value"
      :disabled="disabled"
      :name="name"
    >
    </label>
  </div>
</template>

<script>
    export default {
      name: "Stars",
      props : ['inValue','disabled'],
      data : function () {
        return{
          ratings: [1,2,3,4,5],
          temp_value : null,
          name : 'rating',
          value : this.inValue,
        }
      },
      methods:{
        star_over: function(index) {
          if (!this.disabled) {
            this.temp_value = this.value;
            return this.value = index;
          }
        },
        star_out: function() {
          if (!this.disabled) {
            return this.value = this.temp_value;
          }
        },
        set: function(value) {
          if (!this.disabled) {
            this.temp_value = value;
            this.value = value;
            this.$store.commit('ratingUpdate',{rating:this.value});
            this.$emit('rating',this.value);
          }
        }
      }
    }
</script>

<style lang="scss" scoped>
  %visually-hidden {
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    height: 1px; width: 1px;
    margin: -1px; padding: 0; border: 0;
  }

  .star-rating {

    &__star {
      display: inline-block;
      padding: 1px;
      vertical-align: middle;
      letter-spacing: -3px;
      line-height: 13px;
      font-size: 20px;
      color: #BDBDBD;
      transition: color .2s ease-out;
      cursor: pointer;

      &.active{
        color: #FF3333;
      }

      &.disabled:hover {
        cursor: default;
      }
    }

    &__checkbox {
      @extend %visually-hidden;
    }
  }

</style>
