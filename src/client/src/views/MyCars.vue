<template>
  <v-container>
    <div class="d-flex flex-row justify-space-between align-center">
      <h1>My Cars 🚘</h1>
      <v-btn
        depressed
        color="primary"
        class="mr-4"
        @click.stop="dialog = true"
      >
        Add new car
      </v-btn>
    </div>
    <div class="mt-6 d-flex flex-row">
      <v-card
    max-width="344"
    elevation="2"

  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          Code
        </div>
        <v-list-item-title class="text-h5 mb-1">
          Brand
        </v-list-item-title>
      </v-list-item-content>

    </v-list-item>

    <v-card-actions>
      <v-btn
        outlined
        rounded
        text
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
      >
      <v-icon left>
        mdi-delete
      </v-icon>
        Remove
      </v-btn>
    </v-card-actions>
      </v-card>
    </div>

    <v-dialog
      v-model="dialog"
      max-width="590"
    >
      <v-card>
        <v-card-title class="text-h5">
         New car
        </v-card-title>
        <div class="mx-6 mt-6">
          <v-text-field
            label="Brand"
            filled
            v-model="brand"
            required
          ></v-text-field>

          <v-text-field
            label="Code"
            filled
            v-model="code"
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
            @click="dialog = false"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>

</template>
<script>
  export default {
    name: 'MyCars',
    data () {
      return {
        dialog: false,
      }
    },
  }
</script>
