<template>
    <div id="map"></div>
</template>

<script>
    export default {
      name: "Map",
      props: ['places'],
      data(){
        return{
          dots: this.places,
          place: Array
        }
      },
      methods:{

        mapAdd(){
          const yaMapScript = document.createElement('SCRIPT');
          const yaMapSourse = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";

          yaMapScript.setAttribute('src', yaMapSourse);
          yaMapScript.setAttribute('defer','');
          document.body.appendChild(yaMapScript);
          yaMapScript.onload = () =>{
            window.ymaps.ready(this.mapInit(this.dots,this.place));
          };
          yaMapScript.onerror = (err)=> handleError(err);
        },

        mapInit(dots,place){
          return function () {
            var $myMap,
                placemark;

            $myMap = new ymaps.Map("map", {
              center: [54.316855, 48.402557],
              zoom: 12,
              controls: ['zoomControl']
            });

            if(dots){
              if(dots.length){
                dots.forEach(function (dot) {
                  placemark = new ymaps.Placemark(dot.coords);
                  $myMap.geoObjects.add(placemark);
                })
              }
              else{
                placemark = new ymaps.Placemark(dots.coords);
                $myMap.geoObjects.add(placemark);
              }
            }

            $myMap.events.add('click', function (e) {
              let coords = e.get('coords');
              console.log(coords);
              this.place = coords;
            });
          };
        },
      },
      mounted(){
        this.mapAdd();
      }
    }
</script>
<style lang="scss" scoped>
  #map{
    width: 100%;
    height: 100%;
  }
</style>
