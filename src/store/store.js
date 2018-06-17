import Vue from 'vue';
import Vuex from  'vuex';
import axios from 'axios';

Vue.use(Vuex);

// axios.defaults.baseURL = 'https://courses-frontend.simbirsoft1.com/api/graphql?';
// axios.defaults.headers.common['Authorization'] = 'Basic Y291cnNlcy1mcm9udGVuZDpybEdFT29WUndL';

const instance = axios.create({
  baseURL: 'https://courses-frontend.simbirsoft1.com/api/graphql?',
  timeout: 1000,
  headers: {
    'Authorization': 'Basic Y291cnNlcy1mcm9udGVuZDpybEdFT29WUndL'
  }
});

const store = new Vuex.Store({
  state: {
    filters:{
      stars : 4,
      place : null,
      rangeMin : 20,
      rangeMax : 70,
      howMach : 2000
    },
    places :[]
  },
  actions: {
    loadData({commit}){
      instance.post().then(
        response => {
          commit('loadData', response.data)
        }
      ).catch( e =>
        console.log('error-> '+e)
      )
    },
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
    loadData(state,places){
      console.log(places);
    },
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
