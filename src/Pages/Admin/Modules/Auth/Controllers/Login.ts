import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import Spinner from "@/Pages/Admin/Modules/Common/Controllers/Spinner.ts";
import WithRender from '@/Pages/Admin/Modules/Auth/Views/login.html';
import ValidationError from "@/Pages/Admin/Modules/Common/Controllers/ValidationError.ts";
import { authService } from '@/Pages/Admin/Modules/Auth/Services/AuthService';
import { common } from '../../Common/Services/Common';
import { Cookie } from '../../Common/Services/CookieService';
import { flashService } from "@/Pages/Admin/Modules/Common/Services/FlashMessage/FlashService";

import GeneralStore from "@/Pages/Admin/Modules/ManagePackage/Store/General";

@WithRender
@Component({
    components: {
        'validation-error': ValidationError,
    }
})
export default class Login extends Vue {
    public page: any = {
        user: {},
        currentUserDetails: {}
    };
    public isLoading: boolean = false;
    public uuID: any = '';
    public postLoading: boolean = false;
    private passwordFieldType: any = 'password';
    public errors: any = {};
    public isError: boolean = false;
    constructor() {
        super();
        this.page.user.email = '';
        this.page.user.password = '';
    }
    public mounted() {
        this.checkIfUserHasToken();
    }
    public checkIfUserHasToken() {
        // alert();
        this.isError = false;
        this.errors = {};
        if (this.$route.query.token) {
            this.isLoading = true;
            let data = {
                token: this.$route.query.token,
            };
            authService.businessClientActivate(data)
                .then((res: any) => {
                    flashService.Success('Your account has been activated successfully!', "You can now login to your account.");
                    this.$router.push({ name: "business-login" });
                })
                .catch((error: any) => {
                    // alert();
                    flashService.Error('Already Activated !', "You have been already activated");
                    this.$router.push({ name: "business-login" });
                    common.sdCatchErr(error, this.errors)
                        .then((res: any) => {
                            this.isError = true;
                            this.errors = res;
                        });
                })
                .finally(() => {
                    this.isLoading = false;
                });
        }

    }
    public switchVisibility() {
        this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
        $('#passwordLogin').toggleClass('fas fa-eye-slash').toggleClass('fa fa-fw fa-eye');
    }
    public loginAction() {
        this.isError = false;
        this.errors = {};
        if (!this.IsValidationTrue()) return;
        const data = {
            email: this.page.user.email,
            password: this.page.user.password,
        }
        this.postLoading = true;
        authService.businessLogin(data)
            .then((res: any) => {
                // GeneralStore.UserDetailList(res.data.data);
                // console.log(res.data.data);
                this.uuID = res.data.data.uuid;
                console.log("UID Check", this.uuID);
                this.page.currentUserDetails.uid = res.data.data.uuid;
                this.page.currentUserDetails.firstname = res.data.data.firstname;
                this.page.currentUserDetails.lastname = res.data.data.lastname;
                this.page.currentUserDetails.fullname = res.data.data.full_name;
                this.page.currentUserDetails.email = res.data.data.email;
                this.page.currentUserDetails.created = res.data.data.created_at;
                this.page.currentUserDetails.accounts = res.data.data.accounts;
                this.page.currentUserDetails.status = res.data.data.status;
                this.page.currentUserDetails.isVerified = res.data.data.is_verified;

                localStorage.setItem('current_business_user', JSON.stringify(this.page.currentUserDetails));

                Cookie.set('business_auth_token', res.data.data.token);
                if (Cookie.check('business_auth_token')) {
                    // console.log("",);
                    this.$router.push({ name: 'business-dashboard' });
                } else {
                    this.$router.push({ name: 'business-login' });
                    window.localStorage.clear();
                }
            })
            .catch((error: any) => {
                common.sdCatchErr(error, this.errors)
                    .then((res: any) => {
                        this.isError = true;
                        this.errors = res;
                    });
            })
            .finally(() => {
                this.postLoading = false;
            })
    }
    @Watch("this.uuID")
    public onCheckUId() {
        this.$router.push({ name: 'business-login' });
    }
    public IsValidationTrue() {
        if (!this.page.user.email) {
            Object.assign(this.errors, { email: ["The email field is required."] })
        }
        if (!this.page.user.password) {
            Object.assign(this.errors, { password: ["The password field is required."] })
        }
        if (common.notEmpty(this.errors)) {
            this.isError = true;
            return false;
        } else
            return true;

    }
    public get btnName() {
        if (this.postLoading)
            return 'Processing...';
        else
            return 'Login';
    }
}
