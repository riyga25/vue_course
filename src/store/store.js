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
        averageCheck_percent: '',
        averageRating: '',
        address: 'ул. Улица, 1a',
        review: [
          {
            id: 3,
            rating: 3.5,
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
        averageCheck_percent: '',
        averageRating: '',
        address: 'ул. Улица, 12',
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
        averageCheck_percent: '',
        averageRating: '',
        address: 'ул. Улица, 17'
      },
      {
        id: 3,
        name: 'boo3',
        category: {
          name: 'Кафе',
          id: 1
        },
        averageCheck: 1500,
        averageCheck_percent: '',
        averageRating: '',
        address: 'ул. Улица, 1'
      },
      {
        id: 2,
        name: 'boo4',
        category: {
          name: 'Кафе',
          id: 1
        },
        averageCheck: 1000,
        averageCheck_percent: '',
        averageRating: '',
        address: 'ул. Улица, 2'
      },
      {
        id: 1,
        name: 'boo5',
        category: {
          name: 'Кинотеатр',
          id: 3
        },
        averageCheck: 800,
        averageCheck_percent: '',
        averageRating: '',
        address: 'ул. Улица, 75',
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
  actions: {},
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
    }
  },
  getters: {
    ratingFilter : state => {
      return state.places.filter(place => (place.averageRating >= state.filters.stars))
    },
    checkFilter : state => {
      return state.places.filter(place => ( place.averageCheck_percent < state.filters.rangeMax))
    }

  },
  modules: {}
});

export default store;
