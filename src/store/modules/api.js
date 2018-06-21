import axios from 'axios';

axios.defaults.headers.common['Authorization'] = 'Basic Y291cnNlcy1mcm9udGVuZDpybEdFT29WUndL';

export default {
  actions: {
    loadData({commit}){
      axios.post(
        '/api/graphql',
        {query: `{entities {id name image address averageCheck rating lat lon 
                  category {id, name} 
                  reviews {id, text, author, rating}}
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
    addPlace(context,newPlace) {
      axios.post('/api/graphql', {
        query: `mutation ($newPlace: EntityInput!, $categoryId: ID!) {
                    createEntity(input: $newPlace, categoryId: $categoryId) {
                        id,
                        name,
                        address,
                        averageCheck,
                        image,
                        lat,
                        lon,
                        category {
                            id,
                            name
                        }
                    }
                }`,
        variables: {
          newPlace: {
            name: newPlace.name,
            address: newPlace.address,
            averageCheck: newPlace.averageCheck,
            image: newPlace.image,
            lat: newPlace.lat,
            lon: newPlace.lon
          },
          categoryId: newPlace.category.id
        }
      }).then(response => {
        newPlace.id = response.data.data.createEntity.id;
        context.commit('addPlace', newPlace);
        this.$router.push('/');
      }).catch(error => console.log('new place error. . . '+error));
    },
    updatePlace(context,place) {
      axios.post('/api/graphql', {
        query: `mutation ($placeId: ID!, $place: EntityInput!) {
                    updateEntity(id: $placeId, input: $place) {
                        id
                    }
                }`,
        variables: {
          place: {
            name: place.name,
            address: place.address,
            averageCheck: place.averageCheck,
            image: place.image,
            lat: place.lat,
            lon: place.lon
          },
          placeId: place.id
        }
      }).then(response => {
        context.commit('updatePlace', place);
      }).catch(error => console.log('update place error. . . '+error));
    },
    deletePlace(context, placeId) {
      axios.post('/api/graphql', {
        query: `mutation ($placeId: ID!) {
                    removeEntity(id: $placeId) {
                        id
                    }
                }`,
        variables: {
          placeId: placeId
        }
      }).then(response => {
        context.commit('deletePlace', response.data.data.removeEntity.id);
      }).catch(error => console.log('delete place error. . . '+error));
    },
    addReview(context, { review, place }) {
      console.log(review+" eee "+place);
      axios.post('/api/graphql', {
        query: `mutation ($newReview: ReviewInput!, $placeId: ID!) {
                    createReview(input: $newReview, entityId: $placeId) {
                        text,
                        author,
                        rating
                    }
                }`,
        variables: {
          newReview: {
            text: review.text,
            author: review.author,
            rating: review.rating
          },
          placeId: place
        }
      }).then(response => {
        context.commit('addReview', { review: review, place: place });
      }).catch(error => console.log('add review error. . . '+error));
    }
  }
}
