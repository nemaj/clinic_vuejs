import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    mode: 'history',
    scrollBehavior() {
        return window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    routes: [
        {
            path: '/',
            redirect: {name: "home"}
        },
        // Dashboards
        {
            path: '/dashboards/advertisement',
            name: 'advertisement',
            component: () => import('../DemoPages/Dashboards/Advertisement.vue'),
        },
        {
            path: '/dashboards/management',
            name: 'management',
            component: () => import('../DemoPages/Dashboards/Management.vue'),
        },
        {
            path: '/dashboards/helpdesk',
            name: 'helpdesk',
            component: () => import('../DemoPages/Dashboards/Helpdesk.vue'),
        },
        {
            path: '/dashboards/monitoring',
            name: 'monitoring',
            component: () => import('../DemoPages/Dashboards/Monitoring.vue'),
        },
        {
            path: '/dashboards/crypto',
            name: 'crypto',
            component: () => import('../DemoPages/Dashboards/Crypto.vue'),
        },
        {
            path: '/dashboards/project-management',
            name: 'project-management',
            component: () => import('../DemoPages/Dashboards/ProjectManagement.vue'),
        },
        {
            path: '/dashboards/product',
            name: 'product',
            component: () => import('../DemoPages/Dashboards/Product.vue'),
        },
        {
            path: '/dashboards/statistics',
            name: 'statistics',
            component: () => import('../DemoPages/Dashboards/Statistics.vue'),
        },

        // Applications

        {
            path: '/apps/mailbox',
            name: 'mailbox',
            meta: {layout: 'apps'},
            component: () => import('../DemoPages/Applications/Mailbox.vue'),
        },
        {
            path: '/apps/chat',
            name: 'chat',
            meta: {layout: 'apps'},
            component: () => import('../DemoPages/Applications/Chat.vue'),
        },
        {
            path: '/apps/forums-listing',
            name: 'forums-listing',
            component: () => import('../DemoPages/Applications/ForumsListing.vue'),
        },
        {
            path: '/apps/forums-threads',
            name: 'forums-threads',
            component: () => import('../DemoPages/Applications/ForumsThreads.vue'),
        },
        {
            path: '/apps/forums-discussion',
            name: 'forums-discussion',
            component: () => import('../DemoPages/Applications/ForumsDiscussion.vue'),
        },

        // Pages

        {
            path: '/pages/login',
            name: 'login1',
            meta: {layout: 'userpages'},
            component: () => import('../DemoPages/UserPages/Login.vue'),
        },
        {
            path: '/pages/login-boxed',
            name: 'login-boxed',
            meta: {layout: 'userpages'},
            component: () => import('../DemoPages/UserPages/LoginBoxed.vue'),
        },
        {
            path: '/pages/register',
            name: 'register',
            meta: {layout: 'userpages'},
            component: () => import('../DemoPages/UserPages/Register.vue'),
        },
        {
            path: '/pages/register-boxed',
            name: 'register-boxed',
            meta: {layout: 'userpages'},
            component: () => import('../DemoPages/UserPages/RegisterBoxed.vue'),
        },
        {
            path: '/pages/forgot-password',
            name: 'forgot-password',
            meta: {layout: 'userpages'},
            component: () => import('../DemoPages/UserPages/ForgotPassword.vue'),
        },
        {
            path: '/pages/forgot-password-boxed',
            name: 'forgot-password-boxed',
            meta: {layout: 'userpages'},
            component: () => import('../DemoPages/UserPages/ForgotPasswordBoxed.vue'),
        },
        {
            path: '/staff',
            name: 'staff',
            component: () => import('../Semicolon/Pages/Admin/Staff.vue'),
            beforeEnter: (to, from, next) => {
                var allowedUsers = ['D', 'AD'];

                var loggedUser = JSON.parse(localStorage.getItem("user"));

                if (allowedUsers.indexOf(loggedUser.type) == -1) next('/login')
                else next()
            }
        },
        {
            path: '/analytics',
            name: 'analytics',
            component: () => import('../DemoPages/Dashboards/Analytics.vue'),
            beforeEnter: (to, from, next) => {
                var allowedUsers = ['D', 'AD'];

                var loggedUser = JSON.parse(localStorage.getItem("user"));

                if (allowedUsers.indexOf(loggedUser.type) == -1) next('/login')
                else next()
            }
        },
        {
            path: '/patients-records',
            name: 'patients-records',
            component: () => import('../Semicolon/Pages/PatientsRecords.vue'),
            // beforeEnter: (to, from, next) => {
            //     var allowedUsers = ['D', 'AD', 'A', 'M', 'P'];
            //
            //     var loggedUser = JSON.parse(localStorage.getItem("user"));
            //
            //     if (allowedUsers.indexOf(loggedUser.type) == -1) next('/login')
            //     else next()
            // }
        },
        {
            path: '/checkup',
            name: 'checkup',
            component: () => import('../Semicolon/Pages/CheckUp.vue'),
            beforeEnter: (to, from, next) => {
                var allowedUsers = ['D', 'AD', 'A'];

                var loggedUser = JSON.parse(localStorage.getItem("user"));

                if (allowedUsers.indexOf(loggedUser.type) == -1) next('/login')
                else next()
            }
        },
        {
            path: '/laboratory',
            name: 'laboratory',
            component: () => import('../Semicolon/Pages/Laboratory.vue'),
            // beforeEnter: (to, from, next) => {
            //     var allowedUsers = ['D', 'AD', 'M'];
            //
            //     var loggedUser = JSON.parse(localStorage.getItem("user"));
            //
            //     if (allowedUsers.indexOf(loggedUser.type) == -1) next('/login')
            //     else next()
            // }
        },
        {
            path: '/diagnosis',
            name: 'diagnosis',
            component: () => import('../Semicolon/Pages/Diagnosis.vue'),
            beforeEnter: (to, from, next) => {
                var allowedUsers = ['D', 'AD'];

                var loggedUser = JSON.parse(localStorage.getItem("user"));

                if (allowedUsers.indexOf(loggedUser.type) == -1) next('/login')
                else next()
            }
        },
        {
            path: '/medicines',
            name: 'medicines',
            component: () => import('../Semicolon/Pages/Medicine.vue'),
            beforeEnter: (to, from, next) => {
                var allowedUsers = ['D', 'AD'];

                var loggedUser = JSON.parse(localStorage.getItem("user"));

                if (allowedUsers.indexOf(loggedUser.type) == -1) next('/login')
                else next()
            }
        },
        {
            path: '/generic',
            name: 'generic',
            component: () => import('../Semicolon/Pages/Generic.vue'),
            beforeEnter: (to, from, next) => {
                var allowedUsers = ['D', 'AD'];

                var loggedUser = JSON.parse(localStorage.getItem("user"));

                if (allowedUsers.indexOf(loggedUser.type) == -1) next('/login')
                else next()
            }
        },
        {
            path: '/transactions/treatment-history',
            name: 'treatment-history',
            component: () => import('../Semicolon/Pages/Transactions/TreatmentHistory.vue'),
            beforeEnter: (to, from, next) => {
                var allowedUsers = ['D', 'AD', 'A'];

                var loggedUser = JSON.parse(localStorage.getItem("user"));

                if (allowedUsers.indexOf(loggedUser.type) == -1) next('/login')
                else next()
            }
        },
        {
            path: '/lab-results/blood-chemistry',
            name: 'blood-chemistry',
            component: () => import('../Semicolon/Pages/LabResults/BloodChemistry.vue'),
            beforeEnter: (to, from, next) => {
                //var allowedUsers = ['D', 'M', 'AD'];//real allowed users
                var allowedUsers = ['D', 'M', 'AD', 'A'];//fake allowed users

                var loggedUser = JSON.parse(localStorage.getItem("user"));

                if (allowedUsers.indexOf(loggedUser.type) == -1) next('/login')
                else next()
            }
        },
        {
            path: '/lab-results/fecalysis',
            name: 'fecalysis',
            component: () => import('../Semicolon/Pages/LabResults/Fecalysis.vue'),
            beforeEnter: (to, from, next) => {
                //var allowedUsers = ['D', 'M', 'AD'];//real allowed users
                var allowedUsers = ['D', 'M', 'AD', 'A'];//fake allowed users

                var loggedUser = JSON.parse(localStorage.getItem("user"));

                if (allowedUsers.indexOf(loggedUser.type) == -1) next('/login')
                else next()
            }
        },
        {
            path: '/lab-results/urinalysis',
            name: 'urinalysis',
            component: () => import('../Semicolon/Pages/LabResults/Urinalysis.vue'),
            beforeEnter: (to, from, next) => {
                //var allowedUsers = ['D', 'M', 'AD'];//real allowed users
                var allowedUsers = ['D', 'M', 'AD', 'A'];//fake allowed users

                var loggedUser = JSON.parse(localStorage.getItem("user"));

                if (allowedUsers.indexOf(loggedUser.type) == -1) next('/login')
                else next()
            }
        },
        {
            path: '/lab-results/hematology',
            name: 'hematology',
            component: () => import('../Semicolon/Pages/LabResults/Hematology.vue'),
            beforeEnter: (to, from, next) => {
                //var allowedUsers = ['D', 'M', 'AD'];//real allowed users
                var allowedUsers = ['D', 'M', 'AD', 'A'];//fake allowed users

                var loggedUser = JSON.parse(localStorage.getItem("user"));

                if (allowedUsers.indexOf(loggedUser.type) == -1) next('/login')
                else next()
            }
        },
        {
            path: '/lab-results/misc',
            name: 'misc',
            component: () => import('../Semicolon/Pages/LabResults/MiscLabResult.vue'),
            beforeEnter: (to, from, next) => {
                //var allowedUsers = ['D', 'M', 'AD'];//real allowed users
                var allowedUsers = ['D', 'M', 'AD', 'A'];//fake allowed users

                var loggedUser = JSON.parse(localStorage.getItem("user"));

                if (allowedUsers.indexOf(loggedUser.type) == -1) next('/login')
                else next()
            }
        },
        {
            path: '/lab-results/special',
            name: 'special',
            component: () => import('../Semicolon/Pages/LabResults/SpecialTestLabResult.vue'),
            beforeEnter: (to, from, next) => {
                //var allowedUsers = ['D', 'M', 'AD'];//real allowed users
                var allowedUsers = ['D', 'M', 'AD', 'A'];//fake allowed users

                var loggedUser = JSON.parse(localStorage.getItem("user"));

                if (allowedUsers.indexOf(loggedUser.type) == -1) next('/login')
                else next()
            }
        },

        // Tables

        {
            path: '/tables/regular-tables',
            name: 'regular-tables',
            component: () => import('../DemoPages/Tables/RegularTables.vue')
        },
        {
            path: '/tables/dynamic-tables',
            name: 'dynamic-tables',
            component: () => import('../DemoPages/Tables/DynamicTables.vue')
        },
        {
            path: '/login',
            name: 'login',
            meta: {layout: 'userpages'},
            component: () => import('../Semicolon/Pages/Login.vue'),
            beforeEnter: (to, from, next) => {//All user types can access
                if (localStorage.getItem("loggedInToken")) next('/home')
                else next()
            }
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('../Semicolon/Pages/Home.vue'),
            beforeEnter: (to, from, next) => {//All user types can access
                if (!localStorage.getItem("loggedInToken")) next('/login')
                else next()
            }
        },
        {
            path: '/forms/dropzone',
            name: 'dropzone',
            component: () => import('../DemoPages/Forms/Components/Dropzone.vue'),
        },
        {
            path: '/user-other-infos/uploads/:user_other_info_id',
            name: 'user_other_info_uploads',
            component: () => import('../Semicolon/Components/Patients/PatientImages.vue'),
            beforeEnter: (to, from, next) => {
                //var allowedUsers = ['D', 'M', 'AD'];real allowed users
                var allowedUsers = ['D', 'M', 'AD', 'A'];//fake allowed users

                var loggedUser = JSON.parse(localStorage.getItem("user"));

                if (allowedUsers.indexOf(loggedUser.type) == -1) next('/login')
                else next()
            }
        },
        {
            path: '/treated-patients',
            name: 'treated-patients',
            component: () => import('../Semicolon/Pages/TreatedPatients.vue'),
            beforeEnter: (to, from, next) => {
                //var allowedUsers = ['D', 'M', 'AD'];real allowed users
                var allowedUsers = ['D', 'M', 'AD', 'A'];//fake allowed users

                var loggedUser = JSON.parse(localStorage.getItem("user"));

                if (allowedUsers.indexOf(loggedUser.type) == -1) next('/login')
                else next()
            }
        }
    ]
})
