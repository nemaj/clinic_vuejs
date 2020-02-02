<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn class="dropdown-item info text-white other_info" v-on="on"><i class="dropdown-icon lnr-file-empty"></i>Insert Other Info</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">INSERT OTHER INFO</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-select
                  :items="from_api"
                  item-text="mDate"
                  item-value="id"
                  return-object
                  box
                  label="Search Other Info History"
                  v-on:change="setValues"
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Enter Complaint*" v-model="txtComplaint" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Enter Height*" v-model="txtHeight" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Enter Weight*" v-model="txtWeight" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Enter Blood Pressure*" v-model="txtBP" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Enter Temperature*" v-model="txtTemp" required></v-text-field>
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
  export default {
    data: () => ({
      dialog: false,
      from_api: [
        {
          id: 1,
          mDate: 'September 4, 2019',
          mComplaint: 'Wala Naman Po',
          mHeight: "5'6",
          mWeight: '56kg',
          mBP: '90',
          mTemp: '37 deg Cel'
        },
        {
          id: 2,
          mDate: 'September 1, 2019',
          mComplaint: 'Masakit ulo ko po',
          mHeight: "5'8",
          mWeight: '58kg',
          mBP: '135',
          mTemp: '37 deg Cel'
        },
        {
          id: 3,
          mDate: 'August 25, 2019',
          mComplaint: 'Nahihilo po ako',
          mHeight: "5'2",
          mWeight: '52kg',
          mBP: '160',
          mTemp: '28 deg Cel'
        },
        {
          id: 4,
          mDate: 'August 25, 2019',
          mComplaint: 'Lagi po ako nilalagnat',
          mHeight: "7'2",
          mWeight: '72kg',
          mBP: '190',
          mTemp: '40 deg Cel'
        }
      ],
      txtComplaint: '',
      txtHeight: '',
      txtWeight: '',
      txtBP: '',
      txtTemp: ''
    }),
    methods:{
      setValues(data){
        //console.log("setValues", data);
        this.txtComplaint = data.mComplaint;
        this.txtHeight = data.mHeight;
        this.txtWeight = data.mWeight;
        this.txtBP = data.mBP;
        this.txtTemp = data.mTemp;
      }
    }
  }
</script>

<style scoped>
.other_info{
  width: 188px;
  height: 30px;
}
</style>
