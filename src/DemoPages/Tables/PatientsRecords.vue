<template>
  <div>
    <page-title :heading=heading :subheading=subheading :icon=icon></page-title>
    
    <!-- <b-card title="Bootstrap Table Options" class="main-card mb-4">
    
    <b-form-checkbox v-model="striped">Striped</b-form-checkbox>
    <b-form-checkbox v-model="bordered">Bordered</b-form-checkbox>
    <b-form-checkbox v-model="outlined">Outlined</b-form-checkbox>
    <b-form-checkbox v-model="small">Small</b-form-checkbox>
    <b-form-checkbox v-model="hover">Hover</b-form-checkbox>
    <b-form-checkbox v-model="dark">Dark</b-form-checkbox>
    <b-form-checkbox v-model="fixed">Fixed</b-form-checkbox>
    <b-form-checkbox v-model="footClone">Foot Clone</b-form-checkbox>
    </b-card> -->

    <b-card title="Records" class="main-card mb-4">
      <b-table :striped="striped"
                :bordered="bordered"
                :outlined="outlined"
                :small="small"
                :hover="hover"
                :dark="dark"
                :fixed="fixed"
                :foot-clone="footClone"
                :items="items"
                :fields="fields">

              <!-- <template slot="actions" slot-scope="row"> -->
              <template slot="actions">
                <b-dropdown variant="link" size="sm" class="dropdown-menu-rounded" no-caret menu-class="dropdown-menu-sm">
                  <span slot="button-content">
                      <button class="btn-shadow btn btn-info" >
                        <span class="lnr-menu"></span>
                      </button>
                  </span>
                
                  <OtherInfoDialog ></OtherInfoDialog>
                  <div tabindex="-1" class="dropdown-divider"></div>
                  <button type="button" tabindex="0" class="dropdown-item success "><i class="dropdown-icon pe-7s-paper-plane"> </i>Send to Check-up</button>
                  <button type="button" tabindex="0" class="dropdown-item"><i class="dropdown-icon lnr-pencil"> </i>Edit Record</button>
                  <button type="button" tabindex="0" class="dropdown-item"><i class="dropdown-icon lnr-trash"> </i>Delete Record</button>
                
                </b-dropdown>
                
               
              </template>
      </b-table>
      

    </b-card>
  </div>
</template>

<script>

  import PageTitle from "./SubComponent/PageTitle";
  import OtherInfoDialog from "./dialogs/OtherInfo"

  export default {
    components: {
      PageTitle,
      OtherInfoDialog
    },
    data: () => ({
      heading: "Patient's Records",
      subheading: 'All recorded data of a patient.',
      icon: 'pe-7s-id icon-gradient bg-happy-itmeo',

      fields: [ 'name', 'actions', 'sex', 'age', 'birth_date', 'blood_type', 'date_registered', 'last_appointment' ],
      items: [
        { name: 'Ricardo Dalisay',
          sex: 'Male',
          age: '32',
          birth_date: 'MM-DD-YYYY',
          blood_type: 'AB+',
          date_registered: 'MM-DD-YYYY',
          last_appointment: 'MM-DD-YYYY',
          actions: ''
        },
        { name: 'John Doe',
          sex: 'Male',
          age: '23',
          birth_date: 'MM-DD-YYYY',
          blood_type: 'AB+',
          date_registered: 'MM-DD-YYYY',
          last_appointment: 'MM-DD-YYYY',
          actions: ''
        },
        { name: 'Augustus Caesar',
          sex: 'Male',
          age: '56',
          birth_date: 'MM-DD-YYYY',
          blood_type: 'B+',
          date_registered: 'MM-DD-YYYY',
          last_appointment: 'MM-DD-YYYY',
          actions: ''
        }
      ],
      striped: false,
      bordered: false,
      outlined: false,
      small: false,
      hover: true,
      dark: false,
      fixed: false,
      footClone: false,
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      },
      createNewModal: {
        id: 'create-new-modal',
        title: '',
        content: ''
      }
    }),

    methods: {
       info(item) {
        this.infoModal.title = 'Patient Name: '
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id)
      },
      createNew() {
        // this.infoModal.title = 'Patient Name: '
        // this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.createNewModal.id)
      }
    }
  }
</script>

<style>
  .modal-backdrop
  {
      opacity:0.5 !important;
  }
</style>
