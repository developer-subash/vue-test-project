import Vue from 'vue';
import Router from 'vue-router';
import TheAdminLayout from '@/Pages/Admin/Includes/TheLayOut.vue';
import AuthRoute from '@/Pages/Admin/Modules/Auth/Routes/AuthRoute';
import Dashboard from '@/Pages/Admin/Modules/Admin/Controllers/Dashboard';
import TrekRoute from '@/Pages/Admin/Modules/ManagePackage/tab/Routes/index';
import ProfileRoute from '@/Pages/Admin/Modules/ManageUsers/Profile/Routes/index';
import GeneralModuleRoute from '@/Pages/Admin/Modules/ManagePackage/tab/General/Routes/index';
import ManageDeparture from '@/Pages/Admin/Modules/ManageDeparture/Controllers/ManageDeparture';
import AddDeparture from '@/Pages/Admin/Modules/ManageDeparture/Controllers/AddDeparture';
import EditDeparture from '@/Pages/Admin/Modules/ManageDeparture/Controllers/EditDeparture';
import DetailDeparture from '@/Pages/Admin/Modules/ManageDeparture/Controllers/DetailDeparture';
import ManageDeparturePackage from '@/Pages/Admin/Modules/ManageDeparture/Controllers/ManageDeparturePackage';
import ManageUsers from '@/Pages/Admin/Modules/ManageUsers/Controllers/ManageUsers';
import ManageBooking from '@/Pages/Admin/Modules/ManageBooking/Controllers/ManageBooking';
// import Profile from '@/Pages/Admin/Modules/ManageUsers/Profile/Controllers/Profile';
import ProfileTab from '@/Pages/Admin/Modules/ManageUsers/Profile/ProfileTab';
import AboutProfile from '@/Pages/Admin/Modules/ManageUsers/Profile/About/Controllers/AboutProfile';
import SocialAccount from '@/Pages/Admin/Modules/ManageUsers/Profile/SocialAccounts/Controllers/SocialAccount';
import Contact from '@/Pages/Admin/Modules/ManageUsers/Profile/Contacts/Controllers/Contact';
import BannerImage from '@/Pages/Admin/Modules/ManageUsers/Profile/BannerImage/Controllers/BannerImage';
import OfficeDay from '@/Pages/Admin/Modules/ManageUsers/Profile/OfficeDays/Controllers/OfficeDay';
import ChangePassword from '@/Pages/Admin/Modules/ManageUsers/ChangePassword/Controllers/ChangePassword';

import Invite from '@/Pages/Admin/Modules/ManageUsers/Invite/Controllers/Invite';
import PendingList from '@/Pages/Admin/Modules/ManageUsers/PendingInvite/Controllers/PendingInvite';
import ViewDetails from '@/Pages/Admin/Modules/ManageBooking/ViewDetails/Controllers/ViewDetails';

import TestProfile from '@/Pages/Admin/Modules/ManageUsers/Profile/Controllers/Profile';


Vue.use(Router);
const baseRoutes: any[] = [
    {
        path: '/',
        name: 'admin-layout',
        title: 'AdminLayout',
        component: TheAdminLayout,
        redirect: { name: 'business-dashboard' },
        children: [
            {
                path: 'dashboard',
                name: 'business-dashboard',
                component: Dashboard,
            },
            {
                path: 'departure',
                name: 'business-manage-departure-trek-list',
                component: ManageDeparture,
            },
            {
                path: 'departure/add',
                name: 'business-manage-departure-add',
                component: AddDeparture,
            },
            {
                path: 'departure/detail',
                name: 'business-manage-departure-detail',
                component: DetailDeparture,
            },
            {
                path: 'departure/edit',
                name: 'business-manage-departure-edit',
                component: EditDeparture,
            },
            {
                path: 'booking',
                name: 'business-manage-booking',
                component: ManageBooking,
            },
            // {
            //     path: 'booking',
            //     name: 'business-manage-booking',
            //     component: ManageBooking,
            // },
            {
                path: 'booking/viewdetails',
                name: 'business-manage-booking-view-details',
                component: ViewDetails,
            },
            {
                path: 'testprofile',
                name: 'business-dashboard-manage-testProfile',
                component: TestProfile,
            },
            {
                path: 'profile',
                name: 'business-dashboard-manage-profile-tab',
                component: ProfileTab,
                redirect: { name: 'business-dashboard-manage-profile-tab-about' },
                children: [
                    {
                        path: 'about',
                        name: 'business-dashboard-manage-profile-tab-about',
                        component: AboutProfile,
                    },
                    {
                        path: 'socialaccount',
                        name: 'business-dashboard-manage-profile-tab-social-account',
                        component: SocialAccount,
                    },
                    {
                        path: 'contact',
                        name: 'business-dashboard-manage-profile-tab-contact',
                        component: Contact,
                    },
                    {
                        path: 'image',
                        name: 'business-dashboard-manage-profile-tab-banner-image',
                        component: BannerImage,
                    },
                    {
                        path: 'officehour',
                        name: 'business-dashboard-manage-profile-tab-office',
                        component: OfficeDay,
                    },
                ],
            // },
            // {
            //     path: '/',
            //     name: 'user-profile-tab',
            //     component: ProfileTab,
            //     redirect: { name: 'business-dashboard-manage-profile-tab' },
            //     children: [
            //         {
            //             path: 'profile',
            //             name: 'business-dashboard-manage-profile-tab',
            //             component: ProfileTab,
            //         },
            //     ],
            },
            // {
            //     path: 'profile/about',
            //     name: 'business-dashboard-manage-profile-tab-about',
            //     component: AboutProfile,
            // },
            
            // {
            //     path: 'profile/socialaccount',
            //     name: 'business-dashboard-manage-profile-tab-social-account',
            //     component: SocialAccount,
            // },
            
            // {
            //     path: 'profile/contact',
            //     name: 'business-dashboard-manage-profile-tab-contact',
            //     component: Contact,
            // },
            
            // {
            //     path: 'profile/image',
            //     name: 'business-dashboard-manage-profile-tab-banner-image',
            //     component: BannerImage,
            // },
            
            // {
            //     path: 'profile/officehour',
            //     name: 'business-dashboard-manage-profile-tab-office',
            //     component: OfficeDay,
            // },
            
            {
                path: 'changepassword',
                name: 'user-profile-change-password',
                component: ChangePassword,
            },

            {
                path: 'manage-users',
                name: 'user-manage-dashboard',
                component: ManageUsers,
            },
            {
                path: 'manage-users/invite',
                name: 'user-invite',
                component: Invite,
            },
            {
                path: 'manage-users/invitepending',
                name: 'user-pending-invite',
                component: PendingList,
            },
        ],
    },
];
const routes = baseRoutes.concat(AuthRoute, TrekRoute, GeneralModuleRoute);
export default new Router({
    // mode: 'history',
    routes,
});
