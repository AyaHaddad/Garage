<template>
<v-container class="d-flex justify-center align-center" v-if="hasAccount">
  <v-col md="6">
<v-card elevation="2" class="pa-6">
   <h1 class="mb-6">Login</h1>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      label="E-mail"
      filled
      :rules="emailRules"
      required
       v-model="loginData.email"
    ></v-text-field>

    <v-text-field
      filled
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show1 ? 'text' : 'password'"
      @click:append="show1 = !show1"
      label="Password"
      required
      v-model="loginData.password"
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      depressed
      color="primary"
      class="mr-4"
      @click="login()"
    >
      Login
    </v-btn>

    <v-btn
      depressed
      class="mr-4"
      @click="redirect(), hasAccount = false"
    >
      Register
    </v-btn>
  </v-form>
</v-card>
</v-col>
</v-container>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'Login',
    data: () => ({
      hasAccount: true,
      loginData: {"email":"","password":""},
      valid: true,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      show1: false,
    }),

    methods: {
      redirect(){
        this.$router.push({path: '/register'});
      },
      validate () {
        this.$refs.form.validate()
      },

      login(){
        var data = {
          email: this.loginData.email,
          password: this.loginData.password,
        }

        axios.post('http://localhost:3000/api/login', data)
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
