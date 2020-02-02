<template>
    <div></div>    
</template>

<script>

    //import VuePerfectScrollbar from 'vue-perfect-scrollbar'
    //import CountryFlag from 'vue-country-flag'

    import {library} from '@fortawesome/fontawesome-svg-core'
    import {
        faArrowUp,
        faCog,
    } from '@fortawesome/free-solid-svg-icons'
    //import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

    library.add(
        faArrowUp,
        faCog,
    );

    export default {
        components: {
      //      VuePerfectScrollbar,
        //    CountryFlag,
      //      'font-awesome-icon': FontAwesomeIcon,
        },
        data: () => ({}),
        methods: {}
    }
</script>

