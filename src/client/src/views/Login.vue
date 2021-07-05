<template>
<v-container class="d-flex justify-center align-center">
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
      v-model="email"
      :rules="emailRules"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
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
      @click="validate"
    >
      Login
    </v-btn>

    <v-btn
      depressed
      class="mr-4"
      @click="redirect()"
    >
      Register
    </v-btn>
  </v-form>
</v-card>
</v-col>
</v-container>
</template>

<script>
  export default {
    name: 'Login',
    data: () => ({
      valid: true,
      email: '',
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
    },
  }
</script>
