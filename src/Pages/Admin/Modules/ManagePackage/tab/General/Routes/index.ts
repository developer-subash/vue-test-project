import TheAdminLayout from '@/Pages/Admin/Includes/TheLayOut.vue';
import PackageList from '@/Pages/Admin/Modules/ManagePackage/Controllers/PackageList';
import CreatePackageList from '@/Pages/Admin/Modules/ManagePackage/tab/CreatePackage';

import GeneralTab from '@/Pages/Admin/Modules/ManagePackage/tab/General/GeneralTab';
import General from '@/Pages/Admin/Modules/ManagePackage/tab/General/General/Controllers/General';

import PriceDuration from '@/Pages/Admin/Modules/ManagePackage/tab/General/PriceDuration/Controllers/PriceDuration';
import PriceRule from '@/Pages/Admin/Modules/ManagePackage/tab/General/PricingRule/Controllers/PriceRule';
import Destinations from '@/Pages/Admin/Modules/ManagePackage/tab/General/Destinations/Controllers/Destinations';
import Highlights from '@/Pages/Admin/Modules/ManagePackage/tab/General/Highlights/Controllers/Highlights';
import Notes from '@/Pages/Admin/Modules/ManagePackage/tab/General/Notes/Controllers/Notes';

export default [
    {
        path: '/package/treks',
        name: 'generaltab-layout',
        title: 'AdminLayout',
        component: TheAdminLayout,
        redirect: { name: 'generaltab-business-package-trek' },
        children: [
            {
                path: '/',
                name: 'generaltab-business-package-trek',
                component: PackageList,
            },
            {
                path: 'create',
                name: 'generaltab-business-package',
                component: CreatePackageList,
                redirect: { name: 'create-generaltab-trek-generaltab' },
                children: [
                    {
                        path: '/',
                        name: 'create-generaltab-trek-generaltab',
                        component: GeneralTab,
                        redirect: { name: 'create-generaltab-trek-general' },
                        children: [
                            {
                                path: 'general',
                                name: 'create-generaltab-trek-general',
                                component: General,
                            },
                            {
                                path: 'priceduration',
                                name: 'create-generaltab-business-package-trek-priceduration',
                                component: PriceDuration,
                            },
                            {
                                path: 'pricingrule',
                                name: 'create-generaltab-business-package-trek-pricing-rule',
                                component: PriceRule,
                            },
                            {
                                path: 'destinations',
                                name: 'create-generaltab-business-package-trek-destinations',
                                component: Destinations,
                            },
                            {
                                path: 'highlights',
                                name: 'create-generaltab-business-package-trek-highlights',
                                component: Highlights,
                            },
                            {
                                path: 'notes',
                                name: 'create-generaltab-business-package-trek-notes',
                                component: Notes,
                            },
                        ],
                    },
                ],
            },
        ],
    },

];
