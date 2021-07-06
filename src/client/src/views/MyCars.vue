<template>
  <v-container>
    <div class="d-flex flex-row justify-space-between align-center">
      <h1>Welcome {{user.name}} to your Cars pannel 🚘 </h1>
      <v-btn
        depressed
        color="primary"
        class="mr-4"
        @click.stop="newCar = true"
      >
        Add new car
      </v-btn>
    </div>
    <div class="mt-6 d-flex flex-row">
      <template v-for="(car, index) in cars" > 
        <v-card max-width="344" elevation="2"  v-bind:key="index">
          <v-list-item three-line  >
            <v-list-item-content>
                <div class="text-overline mb-4">
              {{car.code}}
              </div>
            <v-list-item-title class="text-h5 mb-1">
              {{car.brand}}
            </v-list-item-title>
            </v-list-item-content>

          </v-list-item>
          <v-card-actions> 
            <v-btn
              outlined
              rounded
              text
              @click="carToEdit(index)"
            >
            <v-icon left>
              mdi-pencil
            </v-icon>
              Edit
            </v-btn>
            <v-btn
              outlined
              rounded
              text
              @click="deleteCar(car._id)"
            >
            <v-icon left>
              mdi-delete
            </v-icon>
              Remove
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </div>

    <v-dialog
      v-model="dialog"
      max-width="590"
      transition="scale-transition"
    >
    <v-card>
        <v-card-title class="text-h5">
         Edit car
        </v-card-title>
        <div class="mx-6 mt-6">
          <v-text-field
            label="Brand"
            filled
            v-model="carEdit.brand"
            required
          ></v-text-field>

          <v-text-field
            label="Code"
            filled
            v-model="carEdit.code"
            required
          ></v-text-field>
          </div>
          <v-card-actions>
          
          <v-spacer></v-spacer>

          <v-btn
            depressed
            @click="dialog = false"
          >
            Close
          </v-btn>

          <v-btn
            depressed
            color="primary"
            @click="updateCar(carEdit._id)"
          >
            Update
          </v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog
      v-model="newCar"
      max-width="590"
      transition="scale-transition"
    >
    <v-card>
        <v-card-title class="text-h5">
         Add car
        </v-card-title>
        <div class="mx-6 mt-6">
          <v-text-field
            label="Brand"
            filled
            v-model="carToCreate.brand"
            required
          ></v-text-field>

          <v-text-field
            label="Code"
            filled
            v-model="carToCreate.code"
            required
          ></v-text-field>
          </div>
          <v-card-actions>
          
          <v-spacer></v-spacer>

          <v-btn
            depressed
            @click="newCar = false"
          >
            Close
          </v-btn>
          <v-btn
            depressed
            color="primary"
            @click="addCar()"
          >
            Add
          </v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
  </v-container>

</template>
<script>
  import axios from 'axios';

  export default {
    name: 'MyCars',
    data () {
      return {
        user: new Object(),
        cars: [],
        dialog: false,
        carEdit: new Object(),
        carToCreate: new Object(),
        newCar: false,
      }
    },

    mounted() {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.getCars();
    },

    methods: {
      getCars() {
        var id = this.user._id;
        axios.get(`http://localhost:3000/api/cars/${id}`)
        .then ((res) => {
          this.cars = res.data.cars;
        })
      },

      carToEdit(index){
        this.dialog = true;
        this.carEdit = this.cars[index];
      },

      updateCar(id) {
        var data = {
          brand: this.carEdit.brand,
          code: this.carEdit.code,
        }
        axios.put(`http://localhost:3000/api/cars/${id}`, data)
        .then ((res) => {
          console.log(res.data.message);
          this.getCars();
        })
        this.dialog = false
      },

      addCar() {
        var data = {
          brand: this.carToCreate.brand,
          code: this.carToCreate.code,
        };
        var userId = this.user._id;
         axios.post(`http://localhost:3000/api/cars/${userId}`, data)
        .then ((res) => {
          console.log(res.data.message);
          this.newCar = false;
          this.getCars();
        })

      },
      
      deleteCar(id) {
        axios.delete(`http://localhost:3000/api/cars/${id}`)
        .then ((res) => {
          console.log(res.data.message);
          this.getCars();
        })
      }
    }
  }  
</script>