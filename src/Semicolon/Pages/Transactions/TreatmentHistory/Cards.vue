<template>
<div class="row mt-4">
	<div class="col-md-12 col-lg-6 col-xl-4" v-for="result in local_results">
     	<div class="card-shadow-primary profile-responsive card-border mb-3 card">
            <div class="dropdown-menu-header">
                <div class="dropdown-menu-header-inner" :class="[{'bg-success': (result.active && (result.type == 'D' || result.type == 'A' || result.type == 'M' || result.type == 'AD' || result.type == 'P')) }, {'bg-secondary': (!result.active && (result.type == 'D' || result.type == 'A' || result.type == 'M'|| result.type == 'AD' || result.type == 'P'))}
                , {'bg-warning': result.type == 'G' ||  result.type == 'SC' ||  result.type == 'S'}]">
                    <div class="menu-header-image" style="background-image: url('assets/images/dropdown-header/abstract1.jpg')"></div>
                    <div class="menu-header-content btn-pane-right">
                        <div class="avatar-icon-wrapper mr-2 avatar-icon-lg">

                    <v-badge>                        

                        <template v-slot:badge v-if="(result.type == 'D' || result.type == 'A' || result.type == 'M' || result.type == 'AD' || result.type == 'P') && result.active">&#10004;</template>
                        <template v-slot:badge v-else-if="(result.type == 'D' || result.type == 'A' || result.type == 'M'|| result.type == 'AD' || result.type == 'P') && !result.active">&#10007;</template>

                        <div class="avatar-icon rounded btn-hover-shine" v-if="result.avatar.file">
                            <img :src="apiURL+'/'+result.avatar.file.replace('public','storage')" />
                        </div>

                        <div class="avatar-icon rounded btn-hover-shine" v-if="!result.avatar.file">
                            <font-awesome-icon 
                                icon="female" 
                                style="color:pink;" 
                                title="Female Guest" 
                                size="3x"
                                v-if="result.type == 'G' && result.sex == 'F'" 
                            />
                            
                            <font-awesome-icon 
                                icon="male" 
                                style="color:blue;" 
                                title="Male Guest" 
                                size="3x"
                                v-if="result.type == 'G' && result.sex == 'M'" 
                            />
                            
                            <font-awesome-icon 
                                icon="user-md" 
                                :class="[{'text-white': (!result.active && (result.type == 'D' || result.type == 'A' || result.type == 'M'|| result.type == 'AD'))}, {'text-dark': (result.active && (result.type == 'D' || result.type == 'A' || result.type == 'M' || result.type == 'AD'))}, {'text-dark': result.type == 'G' || result.type == 'SC' || result.type == 'S'}]"
                                title="Doctor" 
                                size="3x"
                                v-if="result.type == 'D'" 
                            />

                            <font-awesome-icon 
                                icon="crown" 
                                style="color:yellow;" 
                                title="Special" 
                                size="3x"
                                v-if="result.type == 'S'" 
                            />
                            
                            <font-awesome-icon 
                                icon="blind" 
                                style="color:#000000;" 
                                title="Senior Citizen" 
                                size="3x"
                                v-if="result.type == 'SC'" 
                            />
                            
                            <font-awesome-icon 
                                icon="user-ninja" 
                                :class="[{'text-white': (!result.active && (result.type == 'D' || result.type == 'A' || result.type == 'M'|| result.type == 'AD'))}, {'text-dark': (result.active && (result.type == 'D' || result.type == 'A' || result.type == 'M' || result.type == 'AD'))}, {'text-dark': result.type == 'G' || result.type == 'SC' || result.type == 'S'}]"
                                title="Support" 
                                size="3x"
                                v-if="result.type == 'A'" 
                            />
                            
                            <font-awesome-icon 
                                icon="laptop-medical" 
                                :class="[{'text-white': (!result.active && (result.type == 'D' || result.type == 'A' || result.type == 'M'|| result.type == 'AD'))}, {'text-dark': (result.active && (result.type == 'D' || result.type == 'A' || result.type == 'M' || result.type == 'AD'))}, {'text-dark': result.type == 'G' || result.type == 'SC' || result.type == 'S'}]"
                                title="Medical Technologist" 
                                size="3x"
                                v-if="result.type == 'M'" 
                            />

                            <font-awesome-icon 
                                icon="user-lock" 
                                :class="[{'text-white': (!result.active && (result.type == 'D' || result.type == 'A' || result.type == 'M'|| result.type == 'AD'))}, {'text-dark': (result.active && (result.type == 'D' || result.type == 'A' || result.type == 'M' || result.type == 'AD'))}, {'text-dark': result.type == 'G' || result.type == 'SC' || result.type == 'S'}]"
                                title="Admin" 
                                size="3x"
                                v-if="result.type == 'AD'" 
                            />

                            <font-awesome-icon 
                                icon="band-aid" 
                                :class="[
                                    {'text-white': (!result.active && (result.type == 'P'))}, 
                                    {'text-dark': (result.active && (result.type == 'P'))}
                                ]"
                                title="Pharmacist" 
                                size="3x"
                                v-if="result.type == 'P'" 
                            />
                        </div>

                    </v-badge>


                        </div>
                        <div>
                        	<h5 class="menu-header-title" :class="[{'text-white': (!result.active && (result.type == 'D' || result.type == 'A' || result.type == 'M'|| result.type == 'AD'|| result.type == 'P'))}, {'text-dark': (result.active && (result.type == 'D' || result.type == 'A' || result.type == 'M' || result.type == 'AD' || result.type == 'P'))}, {'text-dark': result.type == 'G' || result.type == 'SC' || result.type == 'S'}]">
                                {{ result.first_name }}
                                {{ result.middle_name }}
                                {{ result.last_name }}
                                {{ result.name_suffix }}   
                            </h5>
                        	<h6 class="menu-header-subtitle" :class="[{'text-white': (!result.active && (result.type == 'D' || result.type == 'A' || result.type == 'M'|| result.type == 'AD' || result.type == 'P'))}, {'text-dark': (result.active && (result.type == 'D' || result.type == 'A' || result.type == 'M' || result.type == 'AD' || result.type == 'P'))}, {'text-dark': result.type == 'G' || result.type == 'SC' || result.type == 'S'}]">
                                {{ result.age }} yrs. old
                            </h6>
                        </div>
                        <div class="menu-header-btn-pane">
                            <font-awesome-icon 
                                icon="female" 
                                style="color:pink;" 
                                class="mr-2" 
                                title="Female" 
                                size="2x" 
                                v-if="result.type != 'G' && result.sex == 'F'" 
                            />

                            <font-awesome-icon 
                                icon="male" 
                                style="color:blue;" 
                                class="mr-2" 
                                title="Male" 
                                size="2x"
                                v-if="result.type != 'G' && result.sex == 'M'" 
                            />
                        
                            <button class="btn-icon btn btn-info btn-sm" @click="$emit('preview-treatment', result.id)">
                                <font-awesome-icon icon="eye" title="View Treatment" style="color:#FFFFFF;" />
                                View Treatment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <div class="widget-content p-0">
                            <div class="widget-content-wrapper">
                                <div class="widget-content-left">
                                    <div class="widget-heading">
                                    {{ moment(new Date(result.created_at)).format("MMM D, YYYY") }}
                                    </div>
                                </div>
                                <div class="widget-content-right">
                                    <div class="widget-heading"><i>{{ result.type_text }}</i></div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
        </div>
	</div>
</div>
</template>
<script>
import moment from 'moment';

export default {
    props: ['results'],
    data: () => ({
        moment: moment,
        local_results: [],
        apiURL: localStorage.getItem("apiURL")
    }),
    watch: {
        results: function(val){
            this.local_results = this.results;
        }
    }
}
</script>
