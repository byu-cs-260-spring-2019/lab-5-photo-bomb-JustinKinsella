<template>
  <div class="hello">
    <h1>Tell us more about you!</h1>
    
    <form @submit.prevent="pushData">
        <p>Name</p> <input v-model="name" type="text">
        <p>Birthday</p> <input v-model="bday" type="text">
        <p>Favorite color</p> <input v-model="color" type="text">
        <br>
        <button type="submit">Submit</button>
    </form>
    <ul>
      <li>Name: {{info.name}}</li>
      <li>Birthday: {{info.bday}}</li>
      <li>Favorite Color: {{info.color}}</li>
    </ul>
  </div>
</template>

<script>
import firebase from 'firebase'
import { db } from 'firebase/firestore'


export default {
  name: 'FavPics',
  data() {
      return {
          info: [] ,
          name: '',
          bday: '',
          color: '',
      }
  },
  firestore() {
    return {
      info: db.collection('info')
    }
  },
  methods: {
    pushData: function() {
      this.$firestore.info.add({
        name: this.name,
        bday: this.bday,
        color: this.color,
        timestamp: new Date()
      });
    },
 
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
