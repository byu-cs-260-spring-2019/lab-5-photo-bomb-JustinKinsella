<template>
  <div class="hello">
    <h1>Tell us more about you!</h1>
    
    <form @submit.prevent="addToDo">
        <p>Name</p> <input v-model="name" type="text">
        <button type="submit">Submit</button>
    </form>
    <div v-if="errors !== ''" id="errors">{{ errors }}</div>

    <div v-if="this.$store.getters.getItems && this.$store.getters.getItems.length > 0">
    <div class ="title"> People who have enetered their name...</div>

     <div v-for="item in this.$store.getters.getItems" :key="item.id">
       {{ item.name }}<br /><br /><small style="text-decoration:underline;" @click="deleteItem(item.id)">Delete</small>
       <hr />
     </div>
   </div>

  </div>
</template>

<script>
import firebase from 'firebase'
import { db } from '@/main'


export default {
  name: 'FavPics',
  beforeCreate: function () {
    this.$store.dispatch('setItems')
  },
  data: function() {
      return {
          items: [] ,
          name: '',
          bday: '',
          color: '',
          errors: '',
      }
  },
  firestore() {
    return {
      info: db.collection('items')
    }
  },
  // methods: {
  //   pushData: function() {
  //     this.errors = '';
  //     if(this.name !== ""){
  //       db.collection('items').add({
  //       name: this.name,
  //       bday: this.bday,
  //       color: this.color,
  //       timestamp: new Date()
  //       }).then((response) => {
  //         if(response) {
  //           this.items = '';
  //         }
  //       }).catch((error) => {
  //         this.errors = error;
  //       })

  //     }
  //     else {
  //       this.errors = "Please enter your name";
  //     };
  //   },
 
  // }

  methods: {
    addToDo: function () {
      this.errors = ''

      if (this.myTodo !== '') {
        db.collection('items').add({
          name: this.name,
          created_at: Date.now()
        }).then((response) => {
          if (response) {
            this.myTodo = ''
          }
        }).catch((error) => {
          this.errors = error
        })
      } else {
        this.errors = 'Please enter some text or refresh your page'
      }
    },
    deleteItem: function (id) {
      if (id) {
        db.collection("items").doc(id).delete().then(function() {
          console.log('Document successfully deleted')
        }).catch(function(error) {
          this.error = error
        })
      } else {
        this.error = 'Invalid ID'
      }
    }
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

* {
  box-sizing:border-box;
}

body, html, #app {
  background:#8ac8e5;
}

.home {
  width:300px;
  margin:auto;
}

#vue-logo {
  width:100px;
}

input, button {
  border:0;
  width:100%;
  margin:0 0 10px;
  padding:7px;
}

input {
  font-size:12px;
}

button {
  background:#43b823;
  border:0;
  text-transform:uppercase;
  color:#fff;
  font-weight:700;
  cursor:pointer;
}

.title {
  font-size:14px;
  font-weight:700;
  padding:0 0 10px 0;
  margin:0 0 10px 0;
  border-bottom:1px solid #666;
}

#errors {
  background:#a52222;
  color:#fff;
  padding:5px;
}
</style>
