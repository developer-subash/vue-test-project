import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import WithRender from '@/Pages/Admin/Modules/Auth/Views/register.html';
import { authService } from '../Services/AuthService';
import { common } from '../../Common/Services/Common';
import ValidationError from '@/Pages/Admin/Modules/Common/Controllers/ValidationError.ts';
import { flashService } from "@/Pages/Admin/Modules/Common/Services/FlashMessage/FlashService";

@WithRender
@Component({
    components: {
        'validation-error': ValidationError,
    },
})
export default class Register extends Vue {
    public page: any = {
        user: {}
    };
    public isLoading: boolean = false;
    public postLoading: boolean = false;
    public errors: object = {};
    public isError: boolean = false;
    private passwordFieldType: any = 'password';
    private passwordFieldTypeConform: any = 'password';
    constructor() {
        super();
        this.page.user = {};
        this.page.user.email = '';
        this.page.user.companyname = '';
        this.page.user.firstname = '';
        this.page.user.lastname = '';
        this.page.user.password = '';
        this.page.user.confirm_password = '';
    }
    public businessRegisterAction() {
        this.isError = false;
        this.errors = {};
        if (!this.IsValidationTrue()) return;
        let data = {
            firstname: this.page.user.firstname,
            lastname: this.page.user.lastname,
            email: this.page.user.email,
            company_name: this.page.user.companyname,
            password: this.page.user.password,
            confirm_password: this.page.user.confirm_password,
        }
        this.postLoading = true;
        authService.BusinessRegister(data)
            .then((res: any) => {
                // console.log(res);
                flashService.Success('User Registered Successfully!', "We just sent you an activation code through your email. Please check your mail");
                this.emptyForm();
                this.$router.push({
                    name: 'business-login',
                });
            })
            .catch((error: any) => {
                flashService.Error('Error!', "Error while registration");
                // common.ErrorMsg("Error while registration");
                common.sdCatchErr(error, this.errors)
                    .then((res: any) => {
                        this.isError = true;
                        this.errors = res;
                    });
            })
            .finally(() => {
                this.postLoading = false;
            });
    }
    public switchVisibilityNew() {
        this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
        $('#passwordNew').toggleClass('fas fa-eye-slash').toggleClass('fa fa-fw fa-eye');
    }
    public switchVisibilityConform() {
        this.passwordFieldTypeConform = this.passwordFieldTypeConform === 'password' ? 'text' : 'password';
        $('#passwordConform').toggleClass('fas fa-eye-slash').toggleClass('fa fa-fw fa-eye');
}
    public emptyForm() {
        this.page.user.firstname = '';
        this.page.user.lastname = '';
        this.page.user.email = '';
        this.page.user.companyname = '';
        this.page.user.password = '';
        this.page.user.confirm_password = '';
    }
    public IsValidationTrue() {
        if (!this.page.user.companyname) {
            Object.assign(this.errors, { conmpanyname: ["The companyname field is required."] })
        }
        if (!this.page.user.email) {
            Object.assign(this.errors, { email: ["The email field is required."] })
        }
        if (!this.page.user.password) {
            Object.assign(this.errors, { password: ["The password field is required."] })
        }
        if (!this.page.user.firstname) {
            Object.assign(this.errors, { firstname: ["The firstname field is required."] })
        }
        if (!this.page.user.lastname) {
            Object.assign(this.errors, { lastname: ["The lastname field is required."] })
        }
        if (!this.page.user.confirm_password) {
            Object.assign(this.errors, { confirm_password: ["The confirm password field is required."] })
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
            return 'Register';
    }
}