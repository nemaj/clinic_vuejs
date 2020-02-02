<template>
<div class="row mt-4">
<div class="col-md-12 col-lg-6 col-xl-4" v-for="user in local_users">
    <div class="card-shadow-primary card-border mb-3 card">
        <div class="dropdown-menu-header">
            <div class="dropdown-menu-header-inner" style="background-color: #ffff00;color: #000000">
                <div class="menu-header-image" style="background-image: url('assets/images/dropdown-header/city2.jpg');"></div>
                <div class="menu-header-content">

                    <div class="avatar-icon-wrapper avatar-icon-lg">

                    <v-badge>
                        <template v-slot:badge v-if="user.active">S</template>
                        
                        <div class="avatar-icon rounded btn-hover-shine">                    
        <font-awesome-icon icon="female" style="color:pink;" title="Female Guest" size="3x" 
        v-if="user.type == 'G' && user.sex == 'F'" />
        <font-awesome-icon icon="male" style="color:blue;" title="Male Guest" size="3x" 
        v-if="user.type == 'G' && user.sex == 'M'" />
        <font-awesome-icon icon="user-md" style="color:#000000;" title="Doctor" size="3x" 
        v-if="user.type == 'D'" />
        <font-awesome-icon icon="crown" style="color:#000000;" title="Special" size="3x" 
        v-if="user.type == 'S'" />
        <font-awesome-icon icon="blind" style="color:#000000;" title="Senior Citizen" size="3x" 
        v-if="user.type == 'SC'" />
        <font-awesome-icon icon="user-ninja" style="color:#000000;" title="Support" size="3x" 
        v-if="user.type == 'A'" />
        <font-awesome-icon icon="laptop-medical" style="color:#000000;" title="Medical Technologist" size="3x" 
        v-if="user.type == 'M'" />
                    </div>    
                    

                    </v-badge>
                    
                </div>
                    <div>
                        <h5 class="menu-header-title">
                            {{ user.last_name }}, {{ user.first_name }} {{ user.middle_name }}
                        </h5>
                    </div>
                    <div class="menu-header-btn-pane">
                        <font-awesome-icon icon="female" style="color:pink;" class="mr-2" title="Female" 
                        size="3x" v-if="user.type != 'G' && user.sex == 'F'" />
                        <font-awesome-icon icon="male" style="color:blue;" class="mr-2" title="Male" size="3x"
                        v-if="user.type != 'G' && user.sex == 'M'" />
                        
                        <button class="btn-icon btn-icon-only btn btn-dark btn-sm mr-2" title="Today's Test" 
                        @click="$emit('open-modal', user.id)">
                            <i class="pe-7s-pen btn-icon-wrapper"></i>
                        </button>

                        <span>{{ user.age }} yrs</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="scroll-area-sm">
            <VuePerfectScrollbar class="scrollbar-container">
                <urinalysis-timeline :results="user.urinalyses" v-on:view-log="openViewDialog"></urinalysis-timeline>
            </VuePerfectScrollbar>
        </div>
    </div>
</div>

</div>
</template>
<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import UrinalysisTimeline from "../../../Components/Urinalysis/Timeline";

export default {
    components: {
        VuePerfectScrollbar,
        UrinalysisTimeline
    },
    props: ['users'],
    data: () => ({
        local_users: []
    }),
    methods: {
        openViewDialog(labResultID){
            this.$emit('view-log', labResultID);
        }
    },
    watch: {
        users: function(val){
            this.local_users = this.users;
        }
    }
}
</script>