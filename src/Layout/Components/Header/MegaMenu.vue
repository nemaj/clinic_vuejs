<template>
    <div></div>    
</template>

<script>
    //import VuePerfectScrollbar from 'vue-perfect-scrollbar'

    import {library} from '@fortawesome/fontawesome-svg-core'
    import {
        faAngleDown,
    } from '@fortawesome/free-solid-svg-icons'
    //import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

    library.add(
        faAngleDown,
    );

    export default {
        components: {
      //      VuePerfectScrollbar,
            //'font-awesome-icon': FontAwesomeIcon,
        },

        methods: {
            onPopoverShow() {
                this.$refs.PopoverMegaMenu._toolpop.getTipElement().classList.add('rm-max-width')
            }
        }
    }

</script>
