<template>
    <div :class="sidebarbg" class="app-sidebar sidebar-shadow" @mouseover="toggleSidebarHover('add','closed-sidebar-open')" @mouseleave="toggleSidebarHover('remove','closed-sidebar-open')">
        <div class="app-header__logo">
            <!-- <div class="logo-src"/> -->
            <h2>RCMS</h2>
            <div class="header__pane ml-auto">
                <button type="button" class="hamburger close-sidebar-btn hamburger--elastic" v-bind:class="{ 'is-active' : isOpen }" @click="toggleBodyClass('closed-sidebar')">
                    <span class="hamburger-box">
                        <span class="hamburger-inner"></span>
                    </span>
                </button>
            </div>
        </div>
        <div class="app-sidebar-content">
            <VuePerfectScrollbar class="app-sidebar-scroll" v-once>
                <sidebar-menu showOneChild :menu="menu"/>
            </VuePerfectScrollbar>
        </div>

    </div>
</template>

<script>
// if (localStorage.getItem("user")) {
    var loggedUser = JSON.parse(localStorage.getItem("user"));
    var user_menu_access = [
        {
            header: true,
            title: 'Admin'
        },
        {
            icon: 'pe-7s-id',
            title: "Staff",
            href: '/staff'
        },
        {
            header: true,
            title: 'Main Navigation',
        },
        {
            title: 'Analytics',
            icon: 'pe-7s-graph1',
            href: '/analytics'
        },
        {
            icon: 'pe-7s-id',
            title: "Patient's Records",
            href: '/patients-records',
        },
        {
            icon: 'pe-7s-id',
            title: "Check Up",
            href: '/checkup',
        },
        {
            icon: 'pe-7s-eyedropper',
            title: "Laboratory",
            href: '/laboratory',
        },
        {
            icon: 'pe-7s-plus',
            title: 'Diagnosis',
            href: '/diagnosis'
        },
        /*{
            icon: 'pe-7s-plus',
            title: 'Medicines',
            href: '/medicines'
        },*/
        {
            icon: 'pe-7s-plus',
            title: 'Generic',
            href: '/generic'
        },
        {
            header: true,
            title: 'Transactions',
        },
        {
            title: 'Treatment History',
            href: '/transactions/treatment-history'
        },
        {
            title: 'PhilHealth CF4',
            href: 'PhilHealth_ClaimForm4.pdf',
            attributes: {target: "_blank"}
        }
    ];

    // switch(loggedUser.type) {
    //     case 'AD'://admin
    //         user_menu_access;
    //         break;
    //     case 'D'://doctor
    //         user_menu_access;
    //         break;
    //     case 'M'://med tech
    //         user_menu_access = [
    //             {
    //                 icon: 'pe-7s-id',
    //                 title: "Patient's Records",
    //                 href: '/patients-records',
    //             },
    //             {
    //                 icon: 'pe-7s-eyedropper',
    //                 title: "Laboratory",
    //                 href: '/laboratory',
    //             }
    //         ];
    //         break;
    //     case 'A'://assistant
    //         user_menu_access = [
    //             {
    //                 icon: 'pe-7s-id',
    //                 title: "Patient's Records",
    //                 href: '/patients-records',
    //             },
    //             {
    //                 icon: 'pe-7s-id',
    //                 title: "Check Up",
    //                 href: '/checkup',
    //             },
    //             {
    //                 header: true,
    //                 title: 'Transactions',
    //             },
    //             {
    //                 title: 'Treatment History',
    //                 href: '/transactions/treatment-history'
    //             },
    //             {
    //                 title: 'PhilHealth CF4',
    //                 href: 'PhilHealth_ClaimForm4.pdf',
    //                 attributes: {target: "_blank"}
    //             }
    //         ];
    //         break;
    //     default:
    //         user_menu_access = [
    //             {
    //                 icon: 'pe-7s-id',
    //                 title: "Patient's Records",
    //                 href: '/patients-records',
    //             }
    //         ];
    // }
// } else {
//     var user_menu_access = [];
// }
    import {SidebarMenu} from 'vue-sidebar-menu'
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'

    export default {
        components: {
            SidebarMenu,
            VuePerfectScrollbar
        },
        data() {
            return {
                isOpen: false,
                sidebarActive: false,

                menu: user_menu_access,
                collapsed: true,

                windowWidth: 0,

            }
        },
        props: {
            sidebarbg: String,

        },
        methods: {

            toggleBodyClass(className) {
                const el = document.body;
                this.isOpen = !this.isOpen;

                if (this.isOpen) {
                    el.classList.add(className);
                } else {
                    el.classList.remove(className);
                }
            },
            toggleSidebarHover(add, className) {
                const el = document.body;
                this.sidebarActive = !this.sidebarActive;

                this.windowWidth = document.documentElement.clientWidth;

                if (this.windowWidth > '992') {
                    if (add === 'add') {
                        el.classList.add(className);
                    } else {
                        el.classList.remove(className);
                    }
                }
            },
            getWindowWidth() {
                const el = document.body;

                this.windowWidth = document.documentElement.clientWidth;

                if (this.windowWidth < '1350') {
                    el.classList.add('closed-sidebar', 'closed-sidebar-md');
                } else {
                    el.classList.remove('closed-sidebar', 'closed-sidebar-md');
                }
            },
        },
        mounted() {
            this.$nextTick(function () {
                window.addEventListener('resize', this.getWindowWidth);

                //Init
                this.getWindowWidth()
            });
        },

        beforeDestroy() {
            window.removeEventListener('resize', this.getWindowWidth);
        }
    }
</script>

<style>
.logo-src{
    height: 23px;
    width: 97px;
}
</style>
