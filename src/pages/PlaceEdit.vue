<template>
  <main>
    <div class="preheader">
      <div class="wrapper">
        <router-link :to="{name: 'home'}" class="preheader__desk preheader__desk_back">Вернуться к списку</router-link>
        <h2 class="perheader__title">Изменение места</h2>
      </div>
    </div>
    <div class="main-info">
      <div class="wrapper flex-container">
        <div class="inputs">
          <div class="inputs__list">
            <div class="inputs__item">
              <label for="place-name">Название</label>
              <input required type="text" id="place-name" v-model="place.name" placeholder="Введите название места">
            </div>
            <div class="inputs__item">
              <label for="place-address">Адрес:</label>
              <input required type="text" id="place-address" v-model="place.address" placeholder="Введите точный адрес места">
            </div>
            <div class="inputs__item">
              <label for="place-average">Средний чек:</label>
              <input required type="text" id="place-average" v-model="place.averageCheck" placeholder="Введите размер среднего чека, руб.">
            </div>
            <div class="inputs__item">
              <label>Категория:</label>
              <Select @selectCategory="getCategory"></Select>
            </div>
            <div class="inputs__item upload-file">
              <label class="upload-file__label" for="place-photo">
                Фото:
                <input class="upload-file__input" type="text" v-model="place.image"  id="place-photo">
              </label>
              <div class="upload-file__preview" v-if="place.image">
                <img :src="place.image" alt="image">
              </div>
            </div>
          </div>
        </div>
        <div class="big-map">
          <div class="big-map__label">Укажите место на карте:</div>
          <div class="big-map__img">
            <Map :placeAdd="true" :places="place" @sendCoords="getCoords"></Map>
          </div>
        </div>
      </div>
      <a @click="updatePlace(place)" class="add-place">Изменить место</a>
    </div>
  </main>
</template>

<script>
  import Map from "../components/Map";
  import Select from "../components/Select";

  export default {
    name: "PlaceEdit",
    components: {Select, Map},
    data(){
      return{
        place:{}
      }
    },
    computed:{
      getPlace(){
        let placeID = this.$route.params.id;
        this.place = this.$store.getters.findPage(placeID);
      }
    },
    methods:{
      updatePlace(thisPlace){
        this.$store.dispatch('updatePlace',thisPlace)
      },
      getCategory(category){
        this.place.category = category;
      },
      getCoords(coords){
        this.place.lat = parseFloat(coords[0]);
        this.place.lon = parseFloat(coords[1]);
      }
    },
    mounted(){
      this.getPlace
    }
  }
</script>
