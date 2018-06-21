<template>
  <main>
    <div class="preheader">
      <div class="wrapper">
        <router-link :to="{name: 'home'}" class="preheader__desk preheader__desk_back">Вернуться к списку</router-link>
        <div class="p-detail">
          <div class="p-detail__name">{{findPlace.name}}</div>
          <div class="p-detail__rating">
            <Stars :inValue="findPlace.rating" :disabled="true"></Stars>
          </div>
          <div class="p-detail__address">
            <div class="gray-text">{{findPlace.category.name}},</div>
            {{findPlace.address}}
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
              <span class="text-gray">Средний чек</span> {{findPlace.averageCheck}} ₽<br>
              <span class="gray-text">Здесь можно прогулять</span> <br>
              {{checkAvg}} % стипендии
            </div>
            <div class="m-detail__img" v-if="findPlace.image">
              <img :src="findPlace.image" alt="">
            </div>
            <div class="m-detail__map">
              <Map :places="findPlace"></Map>
            </div>
          </div>
          <div class="m-detail__right">
            <div class="m-detail__head">
              <div class="m-detail__count">
                Отзывы: <span class="gray-text" v-if="findPlace.reviews" >({{findPlace.reviews.length}})</span>
              </div>
              <div class="m-detail__btn" @click="callModal">Написать отзыв</div>
            </div>
            <div class="m-detail__list" v-if="findPlace.reviews">
              <div class="m-detail__item detail-item" v-for="review in findPlace.reviews" :key="findPlace.reviews.id">
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

    <div v-if="modalActive" class="modal-back">
        <div class="modal">
          <div class="modal__title">Оставить отзыв</div>
          <div class="modal__close" @click="callModal"></div>
          <div class="modal__inputs">
            <div class="inputs__item">
              <label>Имя:</label>
              <input required type="text" v-model.lazy="modal.author" placeholder="Введите свое имя">
            </div>
            <div class="modal__textarea">
              <label>Текст отзыва</label>
              <textarea v-model.lazy="modal.text" required rows="5"></textarea>
            </div>
          </div>
          <div class="modal__bottom">
            <div class="modal__stars">
              <div class="gray-text">Оцените заведение</div>
              <Stars @rating="getRating"></Stars>
            </div>
            <div class="modal__send" @click="addReview(modal)">Отправить отзыв</div>
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
      data(){
        return{
          place: {},
          modalActive : false,
          modal:{
            author: '',
            text: '',
            rating: Number,
            id: 0,
            placeId: this.$route.params.id
          }
        }
      },
      methods:{
        callModal(){
          this.modalActive = !this.modalActive;
        },
        addReview(modal){

          if(this.place.reviews){
            this.modal.id = place.reviews.length + 100;
          }
          else{
            this.place.reviews = [];
            this.modal.id = 100;
          }

          this.$store.dispatch('addReview',modal);
          this.callModal();
        },
        getRating(rating){
          this.modal.rating = rating;
        }
      },
      computed:{
        findPlace(){
          let placeID = this.$route.params.id;
          return this.$store.getters.findPage(placeID);
        },
        checkAvg(){
          let place = this.findPlace.averageCheck;
          let money = this.$store.state.filters.howMach;

          return Math.round(place /(money / 100));
        }
      }
    }
</script>
