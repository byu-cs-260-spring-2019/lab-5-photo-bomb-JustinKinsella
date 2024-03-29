import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase';
import firestore from 'firebase/firestore'
import { db } from '@/main'


Vue.use(Vuex)

// const app = express();
// var db = firebase.firestore();
// var itemsRef = db.collection('info');

export default new Vuex.Store({
  state: {
    user: null,
    items: null
  },
  getters: {
      getItems: state => {
        return state.items
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setItems: state => {
      let items = []
 
      db.collection('items').orderBy('created_at').onSnapshot((snapshot) => {
        items = []
        snapshot.forEach((doc) => {
          items.push({ id: doc.id, name: doc.data().name })
        })
 
        state.items = items
      })
    }
  },
  actions: {
    async register(context, data) {
      try {
        let response = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.message;
      }
    },
    async login(context, data) {
      try {
        let response = await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.message;
      }
    },
    async logout(context) {
      try {
        await firebase.auth().signOut();
        context.commit('setUser', null);
        return "";
      } catch (error) {
        return error.message;
      }
    },
    async getUser(context) {
      try {
        let response = await  firebase.auth().currentUser;
        context.commit('setUser', response.user);
        return "";
      } catch (error) {
        return "";
      }
    },

    setItems: context => {
      context.commit('setItems')
    }

  }
})