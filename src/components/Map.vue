<template>
    <div id="map"></div>
</template>

<script>
    export default {
      name: "Map",
      props: ['places','placeAdd'],
      data(){
        return{
          dots:[],
          place: [],
          myMap: null
        }
      },
      methods:{
        getPlaces(){
          this.dots = this.places;
        },
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
              window.ymaps.ready(this.mapSave());
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
          return ()=>{
            console.log('mapSave');
            this.myMap = new ymaps.Map("map", {
              center: [54.316855, 48.402557],
              zoom: 12,
              controls: ['zoomControl']
            });
          }
        },
        mapInit(dots){
          return () => {
            console.log('mapInit');
            if(dots){
              if(dots.length){
                dots.forEach((dot)=> {
                  this.addMark(dot);
                })
              }
              else{
                this.addMark(dots);
              }
            }

            if(this.placeAdd){
              // this.myMap.events.add('click', (e) => {
              //   this.myMap.geoObjects.removeAll();
			  //
              //   let coords = e.get('coords');
              //   this.place = coords;
              //   this.sendCoords();
			  //
              //   let placemark = new ymaps.Placemark(coords);
              //   this.myMap.geoObjects.add(placemark);
              // });
            }

          };
        },
        addMark(coords){
          console.log('marks');
          let placemark;
          placemark = new ymaps.Placemark([coords.lat, coords.lon],
            {iconCaption: coords.name});
          this.myMap.geoObjects.add(placemark);
        },

        sendCoords(){
            this.$emit('coords',this.place);
        },
      },
      beforeMount(){
        this.$nextTick(
            this.getPlaces(),
            this.mapAdd()
        )
      },
      mounted(){
        this.$nextTick(
          this.mapInit()
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
