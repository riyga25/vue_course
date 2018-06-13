<template>
  <main>
    <div class="preheader">
      <div class="wrapper">
        <router-link :to="{name: 'home'}" class="preheader__desk preheader__desk_back">Вернуться к списку</router-link>
        <div class="p-detail">
          <div class="p-detail__name">{{place.name}}</div>
          <div class="p-detail__rating">
            <Stars :inValue="place.averageRating" :disabled="true"></Stars>
          </div>
          <div class="p-detail__address">
            <div class="gray-text">{{place.category.name}},</div>
            {{place.address}}
          </div>
        </div>
      </div>
    </div>
    <div class="main-info">
      <div class="wrapper">
        <div class="m-detail">
          <div class="m-detail__left">
            <div class="m-detail__bg"></div>
            <div class="m-detail__info">
              <span class="text-gray">Средний чек</span> {{place.averageCheck}} <br>
              <span class="gray-text">Здесь можно прогулять</span> <br>
              {{place.averageCheck_percent}}% стипендии
            </div>
            <div class="m-detail__img"></div>
            <div class="m-detail__map">
              <Map :places="place"></Map>
            </div>
          </div>
          <div class="m-detail__right">
            <div class="m-detail__head">
              <div class="m-detail__count">
                Отзывы: <span class="gray-text" v-if="place.review" >({{place.review.length}})</span>
              </div>
              <div class="m-detail__btn">Написать отзыв</div>
            </div>
            <div class="m-detail__list" v-if="place.review">
              <div class="m-detail__item detail-item" v-for="review in place.review" :key="place.review.id">
                <div class="detail-item__head">
                  <div class="detail-item__name gray-text">
                    {{review.author}}
                  </div>
                  <div class="detail-item__rating">
                    <Stars :inValue="review.rating" :disabled="true"></Stars>
                  </div>
                </div>
                <div class="detail-item__text">
                  {{review.text}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
    import Stars from "../components/Stars";
    import Map from "../components/Map";
    export default {
      name: "Detail",
      components: {Map, Stars},
      computed:{
        place(){
          var placeID = this.$route.params.id;
          var place = this.$store.getters.findPage(placeID);

          return place;
        }
      }
    }
</script>
