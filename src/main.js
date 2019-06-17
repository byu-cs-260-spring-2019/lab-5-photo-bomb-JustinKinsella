import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase';
import firestore from 'firebase/firestore';

Vue.config.productionTip = false;

//I added this script from firebase, its not int the tutorial.
//<script src="https://www.gstatic.com/firebasejs/6.2.0/firebase-app.js"></script>


var firebaseConfig = {
  apiKey: "AIzaSyA41tGrU9Y1GD4AXbgbQfANLT5ZwUtAmyQ",
  authDomain: "justink260lab.firebaseapp.com",
  databaseURL: "https://justink260lab.firebaseio.com",
  projectId: "justink260lab",
  storageBucket: "justink260lab.appspot.com",
  messagingSenderId: "75455445520",
  appId: "1:75455445520:web:e2a1e058b6e03e8a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();


new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

firebase.auth().onAuthStateChanged(user => {
  if(user){
    store.commit('setUser',user);
  }
  else {
    store.commit('setUser',null);
  }
});