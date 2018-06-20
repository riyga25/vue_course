import Vue from 'vue';
import Vuex from  'vuex';
import axios from 'axios';

Vue.use(Vuex);

axios.defaults.headers.common['Authorization'] = 'Basic Y291cnNlcy1mcm9udGVuZDpybEdFT29WUndL';


const store = new Vuex.Store({
  state: {
    filters:{
      stars : 0,
      place : null,
      rangeMin : 0,
      rangeMax : 100,
      howMach : 2000,
      category : 'all'
    },
    places :[],
    categories :[]
  },
  actions: {
    loadData({commit}){
      axios.post(
        '/api/graphql',
        {query: `{entities {id name image address averageCheck rating lat lon category {id, name} reviews {id, text, author, rating}}
        }`}).then(
        response => {
          commit('loadData', response.data.data.entities);
        }
      ).catch( e =>
        console.log('get places error. . . '+e)
      )
    },
    loadCategories({commit}){
      axios.post(
        'api/graphql',
        {query: `{categories{id name}}`}).then(
          response => {
            commit('loadCategories',response.data.data.categories);
          }
        ).catch( e =>
          console.log('get categories error. . . '+e)
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
      state.places = places;
    },
    loadCategories(state,categories){
      state.categories = categories;
    },
    categoryUpdate(state,category){
      state.filters.category = category;
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
      place.id = state.places.length + 101;
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

      if(place.reviews){
        let reviewId = place.reviews.length + 101;
        review.id = reviewId;
      }
      else{
        place.reviews = [];
        review.id = 100;
      }
      place.reviews.push(review);
    }
  },
  getters: {
    findPage : state => id =>{
      return state.places.find(place => place.id === id)
    },
    filterRange:(state)=>{
      let count = state.filters.howMach;
      let maxNum = state.filters.rangeMax;
      let minNum = state.filters.rangeMin;
      let places = [];

      state.places.forEach((place)=>{
        let check = place.averageCheck;

        if(check/(count / 100) > minNum && check/(count / 100) < maxNum){
          places.push(place);
        }
      });

      return places;
    },
    filterCategory:(state)=>{
      let places = [];

      if(state.filters.category != 'all'){
        state.places.forEach((place)=>{
          if(place.category.id === state.filters.category){
            places.push(place);
          }
        });
      }
      else{
        places = state.places;
      }

      return places;
    },
    filterStars:(state)=>{
      let places = [];

      if(state.filters.stars != 0){
        state.places.forEach((place)=>{
          if(place.rating >= state.filters.stars || place.rating === 0){
            places.push(place);
          }
        });
      }
      else{
        places = state.places;
      }

      return places;
    }
  },
  modules: {}
});

export default store;
