<template>
  <main class="home-page">
    <div class="preheader">
      <div class="wrapper">
        <div class="preheader__range">
          <Range></Range>
        </div>
        <div class="preheader__stars">
          <div class="gray-text">Как:</div>
          <Stars :inValue="getStars"> </Stars>
        </div>
        <div class="preheader__select">
          <div class="gray-text">Где:</div>
          <Select @selectCategory="getCategory"></Select>
        </div>
      </div>
    </div>
    <div class="main-info">
      <div class="wrapper">
        <div class="main-info__count gray-text">
          Показано {{places.length}} из {{$store.getters.allPlaces}} <span @click="resetFilters">(очистить фильтры)</span>
        </div>
        <div class="main-page">
          <div class="main-page__map">
            <Map :places="places"></Map>
          </div>
          <div class="main-page__places" v-if="places" >
            <div class="main-page__place m-place"
                 v-for=" place in places"
                 :key="place.id"
                 v-bind:class="{ active: place.active}"
                 @click="addActive(place)">
              <div class="m-place__hidden">
                <router-link :to="{ name: 'edit',params: { id: place.id }}">
                  <svg xmlns="http://www.w3.org/2000/svg" class="m-place__icon m-place__icon_edit" viewBox="0 0 528.899 528.899"><path d="M328.883 89.125l107.59 107.589-272.34 272.34L56.604 361.465l272.279-272.34zm189.23-25.948l-47.981-47.981c-18.543-18.543-48.653-18.543-67.259 0l-45.961 45.961 107.59 107.59 53.611-53.611c14.382-14.383 14.382-37.577 0-51.959zM.3 512.69c-1.958 8.812 5.998 16.708 14.811 14.565l119.891-29.069L27.473 390.597.3 512.69z"/></svg>
                </router-link>
                <span @click="deleteItem(place.id)">
                  <svg xmlns="http://www.w3.org/2000/svg" class="m-place__icon m-place__icon_basket" viewBox="0 0 489.7 489.7"><path d="M411.8 131.7c-9.5 0-17.2 7.7-17.2 17.2v288.2c0 10.1-8.2 18.4-18.4 18.4H113.3c-10.1 0-18.4-8.2-18.4-18.4V148.8c0-9.5-7.7-17.2-17.1-17.2-9.5 0-17.2 7.7-17.2 17.2V437c0 29 23.6 52.7 52.7 52.7h262.9c29 0 52.7-23.6 52.7-52.7V148.8c0-9.5-7.7-17.1-17.1-17.1zM457.3 75.9H353V56.1C353 25.2 327.8 0 296.9 0H192.7c-31 0-56.1 25.2-56.1 56.1v19.8H32.3c-9.5 0-17.1 7.7-17.1 17.2s7.7 17.1 17.1 17.1h425c9.5 0 17.2-7.7 17.2-17.1-.1-9.6-7.7-17.2-17.2-17.2zM170.9 56.1c0-12 9.8-21.8 21.8-21.8h104.2c12 0 21.8 9.8 21.8 21.8v19.8H170.9V56.1z"/><path d="M262 396.6V180.9c0-9.5-7.7-17.1-17.1-17.1s-17.1 7.7-17.1 17.1v215.7c0 9.5 7.7 17.1 17.1 17.1 9.4 0 17.1-7.6 17.1-17.1zM186.1 396.6V180.9c0-9.5-7.7-17.1-17.2-17.1s-17.1 7.7-17.1 17.1v215.7c0 9.5 7.7 17.1 17.1 17.1 9.5 0 17.2-7.6 17.2-17.1zM337.8 396.6V180.9c0-9.5-7.7-17.1-17.1-17.1s-17.1 7.7-17.1 17.1v215.7c0 9.5 7.7 17.1 17.1 17.1s17.1-7.6 17.1-17.1z"/></svg>
                </span>
              </div>
              <router-link class="m-place__title" :to="{ name: 'place', params: { id: place.id }}">{{place.name}}</router-link>
              <div class="m-place__rating">
                <Stars :inValue="place.rating" :disabled="true"></Stars>
              </div>
              <div class="m-place__reviews gray-text">
                <span>
                  (Отзывов: {{place.reviews.length}})
                </span>
              </div>
              <div class="m-place__avr">
                <div class="gray-text">Средний чек</div>
                {{place.averageCheck}}р ( {{place.averageCheck_percent}}% стипендии)
              </div>
              <div class="m-place__address">
                <div class="gray-text">{{place.category.name}},</div>
                {{place.address}}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
    import Range from "../components/Range";
    import Stars from "../components/Stars";
    import Map from "../components/Map";
    import Select from "../components/Select";

    export default {

      name: "Home",
      components: {Select, Map, Stars, Range},
      data(){
        return{
          editPlace:{}
        }
      },
      computed: {
        places() {
          var places = this.$store.getters.Filters;
          var filters = this.$store.state.filters;

          if(places){
            places.forEach((item) => {
              if(item.averageCheck){
                var check = item.averageCheck;
                var filter = filters.howMach;
                var result = Math.round(check /(filter / 100));

                this.$set(item,'averageCheck_percent',result);
              }

              this.$set(item,'editing',false);
              this.$set(item,'active',false);
            })
          }
          return places;
        },
        getStars(){
          this.stars = this.$store.getters.stars;
        }
      },
      methods:{
        addActive(item){
          this.places.forEach((place)=>{
            place.active = false;
          });
          item.active = !item.active;
        },
        deleteItem(item){
          this.$store.dispatch('deletePlace',item);
        },
        getCategory(category){
          this.$store.dispatch('categoryUpdate',category.id);
        },
        resetFilters(){
          this.$store.dispatch('resetFilters');
        }
      },
    }
</script>
