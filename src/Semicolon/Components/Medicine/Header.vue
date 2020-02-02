<template>
    <div class="app-page-title">
        <div class="page-title-wrapper">
            <div class="page-title-heading">
                <div class="page-title-icon">
                    <i :class="icon"/>
                </div>
                <div>
                    {{heading}}
                    <div
                        v-if="subheading"
                        class="page-title-subheading">
                        {{subheading}}
                    </div>
                </div>
            </div>
            <div class="page-title-actions">
                <!-- <button type="button" class="btn-shadow mr-3 btn btn-dark">
                    <font-awesome-icon icon="star"/>
                </button> -->
                <button type="button" class="btn-shadow d-inline-flex align-items-center btn btn-primary mr-3" @click="openGenericDialog">
                    <font-awesome-icon class="mr-2" icon="plus"/>
                    Add Generic
                </button>
                <button type="button" class="btn-shadow d-inline-flex align-items-center btn btn-success" @click="openDialog">
                    <font-awesome-icon class="mr-2" icon="plus"/>
                    Add Medicine
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import {library} from '@fortawesome/fontawesome-svg-core'
    import {
        faStar,
        faPlus
    } from '@fortawesome/free-solid-svg-icons'
    import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

    library.add(
        faStar,
        faPlus,
    );

    export default {
        components: {
            'font-awesome-icon': FontAwesomeIcon,
        },
        props: {
            icon: String,
            heading: String,
            subheading: String,
        },
        data: () => ({

        }),
        methods: {
            openDialog() {
              this.$emit('add-dialog');
            },
            openGenericDialog() {
              this.$emit('add-generic');
            },
            createNew() {
            // this.infoModal.title = 'Patient Name: '
            // this.infoModal.content = JSON.stringify(item, null, 2)
            // this.$root.$emit('bv::show::modal', this.createNewModal.id, button)
            this.$root.$emit('bv::show::modal')
          }
        }
    }
</script>
