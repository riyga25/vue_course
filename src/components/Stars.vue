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
        :value="rating"
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
      data : function () {
        return{
          ratings: [1,2,3,4,5],
          temp_value : null
        }
      },
      props: {
        'name': String,
        'value': null,
        'id': String,
        'disabled': Boolean,
        'required': Boolean
      },
      methods:{
        star_over: function(index) {
          if (!this.disabled) {
            this.temp_value = this.value;
            return this.value = this.index;
          }

        },

        /*
         * Behaviour of the stars on mouseout.
         */
        star_out: function() {
          var self = this;

          if (!this.disabled) {
            return this.value = this.temp_value;
          }
        },
        set: function(value) {
          if (!this.disabled) {
            this.temp_value = value;
            return this.value = value;
          }
        }
      }
    }
</script>

<style lang="scss" scoped>
.star-rating{

  &__checkbox{
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
  }
  &__star{
    display: inline-block;
    padding: 3px;
    vertical-align: middle;
    line-height: 1;
    font-size: 1.5em;
    color: #ABABAB;
    transition: color .2s ease-out;

    &:hover {
      cursor: pointer;
    }

    &.active {
      color: #FFD700;
    }

    &.disabled:hover {
      cursor: default;
    }
  }
}
</style>
