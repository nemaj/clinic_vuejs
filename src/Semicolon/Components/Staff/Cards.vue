<template>
<div class="row mt-4">
<div class="col-md-12 col-lg-6 col-xl-4" v-for="user in local_users">
    <div class="card-shadow-primary card-border mb-3 card">
        <div class="dropdown-menu-header">
            <div class="dropdown-menu-header-inner" v-bind:class="[{'bg-success': user.active}, 'bg-secondary']">
                <div class="menu-header-image" style="background-image: url('assets/images/dropdown-header/city2.jpg');"></div>
                <div class="menu-header-content">

                    <div class="avatar-icon-wrapper avatar-icon-lg">

                    <v-badge>
                        <template v-slot:badge v-if="user.active">&#10004;</template>
                        <template v-slot:badge v-else>&#10007;</template>
                        
                        <div class="avatar-icon rounded btn-hover-shine" v-if="user.avatar.file">                    
                            <img :src="apiURL+'/'+user.avatar.file.replace('public','storage')" />
                        </div>    
                        
                        <div class="avatar-icon rounded btn-hover-shine" v-if="!user.avatar.file">                    
                            <font-awesome-icon icon="user-md" style="color:white;" title="Doctor" size="3x" 
                            v-if="user.type == 'D'" />
                            <font-awesome-icon icon="user-ninja" style="color:white;" title="Assistant" size="3x" 
                            v-if="user.type == 'A'" />
                            <font-awesome-icon icon="laptop-medical" style="color:white;" title="Medical Technologist" size="3x" 
                            v-if="user.type == 'M'" />
                            <font-awesome-icon icon="user-lock" style="color:white;" title="Admin" size="3x" 
                            v-if="user.type == 'AD'" />

                            <font-awesome-icon icon="band-aid" style="color:white;" title="Pharmacist" size="3x" 
                            v-if="user.type == 'P'" />
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
                        
                        <button class="btn-icon btn-icon-only btn btn-dark btn-sm mr-2" title="Edit" 
                         @click="$emit('open-modal', user.id)">
                            <i class="pe-7s-pen btn-icon-wrapper"></i>
                        </button>

                        <span>{{ user.age }} yrs</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-3">
            <ul class="rm-list-borders list-group list-group-flush">
                <li class="list-group-item">
                    <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                            <div class="widget-content-left mr-3">
                                <div class="font-size-xlg text-muted">
                                    <font-awesome-icon icon="id-card" style="color:blue;" />
                                </div>
                            </div>
                            <div class="widget-content-right">
                                <div class="font-size-xlg">
                                    {{ user.ref }}
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="list-group-item">
                    <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                            <div class="widget-content-left mr-3">
                                <div class="font-size-xlg text-muted">
                                    <font-awesome-icon icon="birthday-cake" style="color:#d2691e;" />
                                </div>
                            </div>
                            <div class="widget-content-right">
                                <div class="font-size-xlg">
                                    {{ user.birthday }}
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="list-group-item">
                    <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                            <div class="widget-content-left mr-3">
                                <div class="font-size-xlg text-muted">
                                    <font-awesome-icon icon="tint" style="color:red;" />
                                </div>
                            </div>
                            <div class="widget-content-right">
                                <div class="font-size-lg">
                                    {{ user.blood_type }}
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="list-group-item">
                    <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                            <div class="widget-content-left mr-3">
                                <div class="font-size-xlg text-muted">
                                    <font-awesome-icon icon="briefcase" style="color:#000000;" />
                                </div>
                            </div>
                            <div class="widget-content-right">
                                <div class="font-size-lg" v-if="user.active">
                                    Since {{ moment(new Date(user.created_at), "YYYYMMDD").fromNow() }}
                                </div>
                                 <div class="font-size-lg" v-else>
                                    Inactive
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="list-group-item" v-if="user.email">
                    <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                            <div class="widget-content-left mr-3">
                                <div class="font-size-xlg text-muted">
                                    <font-awesome-icon icon="envelope" style="color:#d2b48c;" />
                                </div>
                            </div>
                            <div class="widget-content-right">
                                <div class="font-size-lg">
                                    {{ user.email }}
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>

</div>
</template>
<script>
import moment from "moment";

export default {
    props: ['users'],
    data: () => ({
        local_users: [],
        moment: moment,
        apiURL: localStorage.getItem("apiURL")
    }),
    watch: {
        users: function(val){
            this.local_users = this.users;
        }
    }
}
</script>