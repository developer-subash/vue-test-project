import TheAdminLayout from '@/Pages/Admin/Includes/TheLayOut.vue';
import CreatePackageList from '@/Pages/Admin/Modules/ManagePackage/tab/CreatePackage';
import GeneralTab from '@/Pages/Admin/Modules/ManagePackage/tab/General/GeneralTab';

import Itinerary from '@/Pages/Admin/Modules/ManagePackage/tab/Itinerary/Controllers/Itinerary';
import Gallery from '@/Pages/Admin/Modules/ManagePackage/tab/Gallery/Controllers/Gallery';
import Highlights from '@/Pages/Admin/Modules/ManagePackage/tab/General/Highlights/Controllers/Highlights';
import Notes from '@/Pages/Admin/Modules/ManagePackage/tab/General/Notes/Controllers/Notes';
import Includes from '@/Pages/Admin/Modules/ManagePackage/tab/Includes/Controllers/Includes';
import Excludes from '@/Pages/Admin/Modules/ManagePackage/tab/Excludes/Controllers/Excludes';
import Departure from '@/Pages/Admin/Modules/ManagePackage/tab/Departure/DepartureSchedule';
import Booking from '@/Pages/Admin/Modules/ManagePackage/tab/Booking/Controllers/Booking';
import UpcommingDeparture from '@/Pages/Admin/Modules/ManagePackage/tab/UpcommingDeparture/Controllers/UpcommingDeparture';
import EditUpcommingDeparture from '@/Pages/Admin/Modules/ManagePackage/tab/UpcommingDeparture/Controllers/EditUpcommingDeparture';
import PreBooking from '@/Pages/Admin/Modules/ManagePackage/tab/PreBooking/PreBooking';
import Reviews from '@/Pages/Admin/Modules/ManagePackage/tab/Reviews/Reviews';
import OfferServices from '@/Pages/Admin/Modules/ManagePackage/tab/OfferServices/Controllers/OfferServices';
import ViewBookingDetail from '@/Pages/Admin/Modules/ManagePackage/tab/Booking/Controllers/ViewBookingDetail';


export default [
    {
        path: '/package/treks',
        name: 'business-layout',
        title: 'AdminLayout',
        component: TheAdminLayout,
        redirect: { name: 'business-package-trek' },
        children: [
            {
                path: '/',
                name: 'business-package-trek',
                component: () => import("@/Pages/Admin/Modules/ManagePackage/Controllers/PackageList"),
            },
            {
                path: 'create',
                name: 'create-business-package-trek',
                component: CreatePackageList,
                redirect: { name: 'create-business-package-trek-generaltab' },
                children: [
                    {
                        path: '/',
                        name: 'create-business-package-trek-generaltab',
                        component: GeneralTab,
                        redirect: { name: 'create-business-package-trek-general' },
                        children: [
                            {
                                path: 'general',
                                name: 'create-business-package-trek-general',
                                component: () =>
                                import('@/Pages/Admin/Modules/ManagePackage/tab/General/General/Controllers/General'),
                            },
                            {
                                path: 'priceduration',
                                name: 'create-business-package-trek-priceduration',
                                component: () =>
                            import('@/Pages/Admin/Modules/ManagePackage/tab/General/PriceDuration/Controllers/PriceDuration'),
                            },
                            {
                                path: 'pricingrule',
                                name: 'create-business-package-trek-pricing-rule',
                                component: () =>
                                import('@/Pages/Admin/Modules/ManagePackage/tab/General/PricingRule/Controllers/PriceRule'),
                            },
                            {
                                path: 'destinations',
                                name: 'create-business-package-trek-destinations',
                                component: () =>
                                import('@/Pages/Admin/Modules/ManagePackage/tab/General/Destinations/Controllers/Destinations'),
                            },
                            {
                                path: 'highlights',
                                name: 'create-business-package-trek-highlights',
                                component: Highlights,
                            },
                            {
                                path: 'notes',
                                name: 'create-business-package-trek-notes',
                                component: Notes,
                            },
                        ],
                    },
                    {
                        path: 'itinerary',
                        name: 'create-business-package-trek-itinerary',
                        component: Itinerary,
                    },
                    {
                        path: 'includes',
                        name: 'create-business-package-trek-includes',
                        component: Includes,
                    },
                    {
                        path: 'excludes',
                        name: 'create-business-package-trek-excludes',
                        component: Excludes,
                    },
                    {
                        path: 'gallery',
                        name: 'create-business-package-trek-gallery',
                        component: Gallery,
                    },
                    {
                        path: 'departure',
                        name: 'create-business-package-trek-departure',
                        component: Departure,
                    },
                    {
                        path: 'booking',
                        name: 'create-business-package-trek-booking',
                        component: Booking,
                    },
                    {
                        path: 'booking/view',
                        name: 'create-business-package-trek-booking-view',
                        component: ViewBookingDetail,
                    },
                    {
                        path: 'upcommingdeparture',
                        name: 'create-business-upcomming-departure',
                        component: UpcommingDeparture,
                    },
                    {
                        path: 'upcommingdeparture/edit',
                        name: 'create-business-upcomming-departure-edit',
                        component: EditUpcommingDeparture,
                    },
                    {
                        path: 'prebooking',
                        name: 'create-business-package-trek-prebooking',
                        component: PreBooking,
                    },
                    {
                        path: 'services',
                        name: 'create-business-package-offer-services',
                        component: OfferServices,
                    },
                    {
                        path: 'reviews',
                        name: 'create-business-package-trek-reviews',
                        component: Reviews,
                    },
                ],
            },
        ],
    },

];
