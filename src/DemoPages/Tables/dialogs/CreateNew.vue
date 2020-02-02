<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn class="btn-shadow d-inline-flex align-items-center btn success" v-on="on">
            <font-awesome-icon class="mr-2" icon="plus"/> Create New
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add New Patient</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Full Name*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Sex*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Address*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select
                  :items="['AB+', 'AB-', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-']"
                  label="Blood Type*"
                  required
                ></v-select>
                <v-flex xs12>
                  <h5 class="card-title">Birthdate</h5>
                <b-dropdown no-flip text="Select Month" class="mb-2 mr-2" variant="primary">
                  <ul class="nav flex-column">
                    <li class="nav-item-header nav-item">January</li>
                    <li class="nav-item-header nav-item">February</li>
                    <li class="nav-item-header nav-item">March</li>
                    <li class="nav-item-header nav-item">April</li>
                    <li class="nav-item-header nav-item">May</li>
                    <li class="nav-item-header nav-item">June</li>
                    <li class="nav-item-header nav-item">July</li>
                    <li class="nav-item-header nav-item">August</li>
                    <li class="nav-item-header nav-item">September</li>
                    <li class="nav-item-header nav-item">October</li>
                    <li class="nav-item-header nav-item">November</li>
                    <li class="nav-item-header nav-item">December</li>
                    
                    <li class="nav-item"><a href="javascript:void(0);" class="nav-link">Recover Password</a></li>
                    
                  </ul>
                </b-dropdown>

              </v-flex>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
    import {library} from '@fortawesome/fontawesome-svg-core'
    import {faPlus} from '@fortawesome/free-solid-svg-icons'
    import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
    library.add(faPlus)
    export default {
        components: {
            'font-awesome-icon': FontAwesomeIcon,
        },
        data: () => ({
        dialog: false
        })
    }
</script>

<style scoped>
.other_info{
  width: 188px;
  height: 30px;
}
</style>
