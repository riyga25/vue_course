import Vue from 'vue';
import Vuex from  'vuex';
import api from './modules/api';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    filters:{
      stars : 0,
      rangeMin : 0,
      rangeMax : 100,
      howMach : 10000,
      category : 'all'
    },
    places :[],
    categories :[]
  },
  actions: {
    resetFilters({commit}){
      commit('resetFilters');
    },
    categoryUpdate({commit},category){
      commit('categoryUpdate',category);
    }
  },
  mutations: {
    loadData(state,places){
      let arr = [];
      places.forEach((place)=>{
        if(place != null){
          arr.push(place);
        }
      });
      state.places = arr;
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
    resetFilters(state){
      let filter = state.filters;

      filter.stars = 0;
      filter.category = 'all';
      filter.rangeMin = 0;
      filter.rangeMax = 100;
    },
    addPlace(state, place) {
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
    addReview(state,{review,item}){
      let thisPlace = state.places.find(place => place.id === item.id);
      thisPlace.reviews.push(review);
    }
  },
  getters: {
    findPage : state => id =>{
      return state.places.find(place => place.id === id)
    },
    stars:(state)=>{
      return state.filters.stars;
    },
    allPlaces:(state)=>{
      return state.places.length;
    },

    Filters:(state)=>{

      function category(items){
        let newItems = [];

        if(state.filters.category != 'all'){
          items.forEach((place)=>{
            if(place.category.id === state.filters.category){
              newItems.push(place);
            }
          });
        }
        else{newItems = items}

        return newItems;
      }

      function range(items) {
        let newItems = [];
        let count = state.filters.howMach;
        let maxNum = state.filters.rangeMax;
        let minNum = state.filters.rangeMin;

        items.forEach((place)=>{
          let check = place.averageCheck;

          if(check/(count / 100) > minNum && check/(count / 100) < maxNum){
            newItems.push(place);
          }
        });

        return newItems;
      }

      function stars(items) {
        let newItems = [];

        if(state.filters.stars != 0){
          items.forEach((place)=>{
            if(place.rating >= state.filters.stars || place.rating === 0){
              newItems.push(place);
            }
          });
        }
        else{
          newItems = items;
        }

        return newItems;
      }

      return category(stars(range(state.places)));
    }
  },
  modules: {
    api
  }
});

export default store;
