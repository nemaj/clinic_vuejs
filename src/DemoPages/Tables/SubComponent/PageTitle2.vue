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
                        class="page-title-subheading">
                        {{subheading}}
                    </div>
                </div>
            </div>
            <div class="page-title-actions">
                <!-- <button type="button" class="btn-shadow mr-3 btn btn-dark">
                    <font-awesome-icon icon="star"/>
                </button> -->
                <!-- <button type="button" @click="createNew()" class="btn-shadow d-inline-flex align-items-center btn btn-success">
                    <font-awesome-icon class="mr-2" icon="plus"/>
                    Create New
                </button> -->
            <CreateNew></CreateNew>
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
    // import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
    import CreateNew from "../dialogs/CreateNew"

    library.add(
        faStar,
        faPlus,
    );

    export default {
        components: {
            // 'font-awesome-icon': FontAwesomeIcon,
            CreateNew
        },
        props: {
            icon: String,
            heading: String,
            subheading: String,
        },
        data: () => ({
            
        }),
        methods: {
            createNew() {
            // this.infoModal.title = 'Patient Name: '
            // this.infoModal.content = JSON.stringify(item, null, 2)
            // this.$root.$emit('bv::show::modal', this.createNewModal.id, button)
            this.$root.$emit('bv::show::modal', this.createNewModal.id)
          }
        }
    }
</script>
