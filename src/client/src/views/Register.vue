<template>
<v-container class="d-flex justify-center align-center">
  <v-col md="6">
<v-card elevation="2" class="pa-6">
  <v-btn
      depressed
      class="mr-4 mb-4"
      @click="back()"
    >
      Return
    </v-btn>
   <h1 class="mb-6">Register</h1>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      label="Name"
      filled
      v-model="registerData.name"
      required
    ></v-text-field>

    <v-text-field
      label="E-mail"
      filled
      v-model="registerData.email"
      :rules="emailRules"
      required
    ></v-text-field>

    <v-text-field
      v-model="registerData.password"
      filled
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show1 ? 'text' : 'password'"
      @click:append="show1 = !show1"
      label="Password"
      required
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      depressed
      color="primary"
      class="mr-4"
      @click="register()"
    >
      Register now !
    </v-btn>
  </v-form>
</v-card>
</v-col>
</v-container>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'Register',
    data: () => ({
      registerData: {"name":"","email":"","password":""},
      valid: true,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      show1: false,
    }),

    methods: {
      back(){
        this.$router.go(-1)
      },
      validate () {
        this.$refs.form.validate()
      },

    register(){
        var data = {
          name: this.registerData.name,
          email: this.registerData.email,
          password: this.registerData.password,
        }

        axios.post('http://localhost:3000/api/users', data)
        .then((res) => {
          var user = res.data.user;
          if (user != null) {
            localStorage.setItem('user', JSON.stringify(user));
            this.$router.push('/MyCars');
          }
        })
      }
    },
  }

</script>
