import Vue from 'vue';
import Vuex from  'vuex';
import axios from 'axios';

Vue.use(Vuex);

axios.defaults.headers.common['Authorization'] = 'Basic Y291cnNlcy1mcm9udGVuZDpybEdFT29WUndL';


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
    addPlace (context, place) {
      console.log(place);
      return axios.post('/api/graphql', {
        query: `mutation ($newPlace: EntityInput!, $id: ID!) {
          createEntity(input: $newPlace, categoryId: $id) {name id}
        }`,
        variables: {
          'id': place.category.id + 100,
          'newPlace': {
            'name': place.name,
            'address': place.address,
            'averageCheck': place.averageCheck,
            'image': place.image,
            'lat': place.lat,
            'lon': place.lon
          }
        }
      })
    },
    deletePlace (context, id) {
      return axios.post('/api/graphql', {
        query: `mutation {
          removeEntity(id: ${id}) {id name}}`
      })
    },

    updatePlace (context, place) {
      let object = {
        name: place.name,
        address: place.address,
        averageCheck: place.averageCheck,
        image: place.image,
        lat: place.lat,
        lon: place.lon
      };
      axios.post('/api/graphql', {
        query: `mutation ($id: ID!, $newPlace: EntityInput!){
          updateEntity(id: $id, input: $newPlace) {name id}
        }`,
        variables: {
          'id': place.id,
          'newPlace': object
        }
      })
        .then(response => {
          console.log('Updated data recieved', response.data)
        })
        .catch(err => console.log('updatePlace error: ', err))
    },
    addReview (context, review) {
      return axios.post('/api/graphql', {
        query: `mutation ($newReview: ReviewInput!, $entityId: ID!) {
          createReview(input: $newReview, entityId: $entityId) {
            author,
            text,
            id,
            entity {id}, 
            rating
          }
        }`,
        variables: {
          'newReview': review.review,
          'entityId': review.placeId
        }
      })
    },
    resetFilters({commit}){
      commit('resetFilters');
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
    addPlace(state,place){
      place.id = state.places.length + 101;
      state.places.push(place);
    },
    resetFilters(state){
      let filter = state.filters;

      filter.stars = 0;
      filter.category = 'all';
      filter.rangeMin = 0;
      filter.rangeMax = 100;
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
  modules: {}
});

export default store;
