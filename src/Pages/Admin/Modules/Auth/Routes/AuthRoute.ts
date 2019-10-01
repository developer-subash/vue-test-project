import BusinessLogin from '@/Pages/Admin/Modules/Auth/Controllers/Login';
import BusinessRegister from '@/Pages/Admin/Modules/Auth/Controllers/Register.ts';
import BusinessForgetPassword from '@/Pages/Admin/Modules/Auth/Controllers/ForgetPassword.ts';
// import Authentication from '@/views/Authentication.vue';
export default [
    {
        path: '/login',
        name: 'business-login',
        component: BusinessLogin,
    },
    {
        path: '/register',
        name: 'business-register',
        component: BusinessRegister,
    },
    {
        path: '/forgetPassword',
        name: 'business-forgetPassword',
        component: BusinessForgetPassword,
    },

];
