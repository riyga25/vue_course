<template>
    <div id="map"></div>
</template>

<script>
    export default {
      name: "Map",
      props: ['places','placeAdd'],
      data(){
        return{
          place: [],
          myMap: null
        }
      },
      computed:{
        getPlaces(){
            return this.places;
        },
      },
      methods:{
        mapAdd(){
          let element = document.getElementById('mapID');
          const yaMapScript = document.createElement('SCRIPT');
          const yaMapSourse = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";

          let createMap = () =>{
            yaMapScript.setAttribute('src', yaMapSourse);
            yaMapScript.setAttribute('defer','');
            yaMapScript.setAttribute('id','mapID');
            document.body.appendChild(yaMapScript);
            yaMapScript.onload = () =>{
              window.ymaps.ready(this.mapSave);
            };
            yaMapScript.onerror = (err)=> handleError(err);
          };

          if(!element){
            createMap();
          }
          else{
            element.outerHTML = '';
            createMap();
          }

        },

        mapSave(){
          let $Map = {};
          let dots = this.getPlaces;
          console.log(dots);

          $Map = new ymaps.Map("map", {
            center: [54.316855, 48.402557],
            zoom: 12,
            controls: ['zoomControl']
          });

          let addMark = (coords) => {
            let placemark;
            placemark = new ymaps.Placemark([coords.lat, coords.lon],
              {iconCaption: coords.name});
              $Map.geoObjects.add(placemark);
          };

          if(dots){
            if(dots.length){
              dots.forEach((dot)=> {
                addMark(dot);
              })
            }
            else{
              addMark(dots);
            }
          }

          if(this.placeAdd){
            $Map.events.add('click', (e) => {
              $Map.geoObjects.removeAll();

              let co = e.get('coords');
              this.place = co;
              this.sendCoords();

              let placemark = new ymaps.Placemark(co);
              $Map.geoObjects.add(placemark);
            });
          }
        },

        sendCoords(){
          this.$emit('sendCoords',this.place);
        },
      },
      beforeMount(){
        this.$nextTick(
            this.mapAdd
        )
      }
    }
</script>
<style lang="scss" scoped>
  #map{
    width: 100%;
    height: 100%;
  }
</style>
