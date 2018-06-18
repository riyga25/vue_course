<template>
    <div id="map"></div>
</template>

<script>
    export default {
      name: "Map",
      props: ['places','placeAdd'],
      data(){
        return{
          dots: this.places,
          place: []
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
            window.ymaps.ready(this.mapInit(this.dots));
          };
          yaMapScript.onerror = (err)=> handleError(err);
        },

        mapInit(dots){
          return () => {
            let $myMap;
            let placemark;

            $myMap = new ymaps.Map("map", {
              center: [54.316855, 48.402557],
              zoom: 12,
              controls: ['zoomControl']
            });

            let addMark = (coords) =>{
              console.log(coords);
              placemark = new ymaps.Placemark([coords.lat, coords.lon],
                {iconCaption: coords.name});
              $myMap.geoObjects.add(placemark);
            };

            if(dots){
              if(dots.length){
                dots.forEach(function (dot) {
                  addMark(dot);
                })
              }
              else{
                addMark(dots);
              }
            }

            if(this.placeAdd){
              $myMap.events.add('click', (e) => {
                $myMap.geoObjects.removeAll();

                let coords = e.get('coords');
                this.place = coords;
                this.sendCoords();

                placemark = new ymaps.Placemark(coords);
                $myMap.geoObjects.add(placemark);
              });
            }

          };
        },

        sendCoords(){
            this.$emit('coords',this.place);
        },
      },
      mounted(){
        this.$nextTick(
            this.mapAdd()
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
