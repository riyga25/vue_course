import Vue from 'vue';
import Vuex from  'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    filters:{
      stars : 4,
      place : null,
      rangeMin : 20,
      rangeMax : 70,
      howMach : 2000
    },
    places :[
      {
        id: 6,
        name: 'boo0',
        category: {
          name: 'Ресторан',
          id: 2
        },
        averageCheck: 2000,
        address: 'ул. Улица, 1a',
        coords:[54.297565, 48.371761],
        review: [
          {
            id: 3,
            rating: 3.5,
            author: 'user_name_111',
            text: 'Были с семьей в Ульяновске, по отзывам пошли в Gonzo, и не пожалели!!! Стейки улёт, соотношение цены и качества - просто супер!!! Очень хороший официант был у нас, человек своего дела, все показал, рассказал, порекомендовал!!! По его рекомендации попробовали очень вкусные салаты, просто супер!!! Пиво вкусное!!! В общем, из всех заведений, что посетили за время нашей поездки, это оказалось лучшее!!!',
          },
          {
            id: 2,
            rating: 5,
            author: 'user_name_222',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut \
          labore et dolore magna aliqua.',
          }
        ]
      },
      {
        id: 5,
        name: 'boo1',
        category: {
          name: 'Кафе',
          id: 1
        },
        averageCheck: 3000,
        address: 'ул. Улица, 12',
        coords:[54.315233, 48.392704],
        review: [
          {
            id: 1,
            rating: 5,
            author: 'user_name_111',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut \
          labore et dolore magna aliqua.',
          },
          {
            id: 2,
            rating: 5,
            author: 'user_name_222',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut \
          labore et dolore magna aliqua.',
          },
          {
            id: 3,
            rating: 5,
            author: 'user_name_233',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut \
          labore et dolore magna aliqua.',
          }
        ]
      },
      {
        id: 4,
        name: 'boo2',
        category: {
          name: 'Ресторан',
          id: 2
        },
        averageCheck: 500,
        address: 'ул. Улица, 17',
        coords:[54.305898, 48.396652],
      },
      {
        id: 3,
        name: 'boo3',
        category: {
          name: 'Кафе',
          id: 1
        },
        averageCheck: 1500,
        address: 'ул. Улица, 1',
        coords:[54.328780, 48.393219],
      },
      {
        id: 2,
        name: 'boo4',
        category: {
          name: 'Кафе',
          id: 1
        },
        averageCheck: 1000,
        address: 'ул. Улица, 2',
        coords:[54.327877, 48.477848],
      },
      {
        id: 1,
        name: 'boo5',
        category: {
          name: 'Кинотеатр',
          id: 3
        },
        averageCheck: 800,
        address: 'ул. Улица, 75',
        coords:[54.347136, 48.550632],
        review: [
          {
            id: 1,
            rating: 2,
            author: 'user_name_111',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut \
          labore et dolore magna aliqua.',
          }
        ]
      },
    ]
  },
  actions: {
    addPlace({commit}, place) {
      commit('addPlace', place)
    },
    deletePlace({commit}, place) {
      commit('deletePlace', place);
    },
    addReview({commit}, review) {
      commit('addReview', review);
    },
    updatePlace({commit}, place) {
      commit('updatePlace', place);
    },
  },
  mutations: {
    howmachUpdate(state,n){
      state.filters.howMach = n.money;
    },
    rangeMaxUpdate(state,n){
      state.filters.rangeMax = n.count;
    },
    rangeMinUpdate(state,n){
      state.filters.rangeMin = n.count;
    },
    ratingUpdate(state,n){
      state.filters.stars = n.rating;
    },
    addPlace(state,place){
      place.id = state.places.length + 1;
      state.places.push(place);
    },
    deletePlace(state,placeID){
      let index = state.places.findIndex(place => place.id === placeID);
      if (index > -1) {
        state.places.splice(index, 1);
      }
    },
    updatePlace(state,item){
      let thisPlace = state.places.find(place => place.id === item.id);
      thisPlace = item;
    },
    addReview(state,review){
      let place = state.places.find(place => place.id === review.id);

      if(place.review){
        let reviewId = place.review.length + 1;
        review.id = reviewId;
      }
      else{
        place.review = [];
        review.id = 1;
      }
      place.review.push(review);
    }
  },
  getters: {
    findPage : state => id =>{
      return state.places.find(place => place.id === id)
    }
  },
  modules: {}
});

export default store;
