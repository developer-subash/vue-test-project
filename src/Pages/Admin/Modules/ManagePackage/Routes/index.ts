import PackageList from '@/Pages/Admin/Modules/ManagePackage/Controllers/PackageList';
import CreatePackageList from '@/Pages/Admin/Modules/ManagePackage/Controllers/CreatePackage';
import TheAdminLayout from '@/Pages/Admin/Includes/TheLayOut.vue';
export default [
    {
        path: '/package/treks/',
        name: 'business-layout',
        title: 'AdminLayout',
        component: TheAdminLayout,
        redirect: { name: 'business-package-trek-list' },
        children: [
            {
                path: '/',
                name: 'business-package-trek-list',
                component: PackageList,
            },
            {
                path: 'create',
                name: 'business-create-package-trek',
                component: CreatePackageList,
            },
        ],
    },

];
