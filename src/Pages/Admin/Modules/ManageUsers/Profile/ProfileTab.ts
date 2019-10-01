
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from '@/Pages/Admin/Modules/ManageUsers/Profile/profile-tab.html';
import { common } from '@/Pages/Admin/Modules/Common/Services/Common';


@WithRender
@Component({
  })
export default class ProfileTab extends Vue {
    private ui: any = {};
    private errors: any = {};
    private TempCompanyData: any = {};
    private errorsMessage: any = {};
    private isError: boolean = false;
    public redirectToAbout() {
        this.$router.push({
            name: 'business-dashboard-manage-profile-tab-about',
            // query: {
            //   id: this.$route.query.id,
            // },
        });
    }
    public redirectToSocialAccount() {
        this.$router.push({
            name: 'business-dashboard-manage-profile-tab-social-account',
            // query: {
            //   id: this.$route.query.id,
            // },
        });
    }
    public redirectToContact() {
        this.$router.push({
            name: 'business-dashboard-manage-profile-tab-contact',
            // query: {
            //   id: this.$route.query.id,
            // },
        });
    }
    public redirectToBanner() {
        this.$router.push({
            name: 'business-dashboard-manage-profile-tab-banner-image',
            // query: {
            //   id: this.$route.query.id,
            // },
        });
    }
    public redirectToOffice() {
        this.$router.push({
            name: 'business-dashboard-manage-profile-tab-office',
            // query: {
            //   id: this.$route.query.id,
            // },
        });
    }
}
