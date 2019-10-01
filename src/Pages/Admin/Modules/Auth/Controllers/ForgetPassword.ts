import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import WithRender from '@/Pages/Admin/Modules/Auth/Views/forget-password.html';
import { authService } from '../Services/AuthService';
import { common } from '../../Common/Services/Common';
import ValidationError from "@/Pages/Admin/Modules/Common/Controllers/ValidationError.ts";
@WithRender
@Component({
    components: {
        'validation-error': ValidationError
    }
})
export default class ForgetPassword extends Vue {
    public user: any = {
        email: '',
    }
    public errors: object = {};
    public isError: boolean = false;
    public postLoading: boolean = false;
    public forgetpasswordAction() {
        this.isError = false;
        this.errors = {};
        if (!this.IsValidationTrue()) return;
        let data = {
            email: this.user.email,
        }
        this.postLoading = true;
        authService.businessForgetPassword(data)
            .then((res: any) => {
                console.log(res);
            })
            .catch((error: any) => {
                common.sdCatchErr(error, this.errors)
                    .then((res: any) => {
                        this.isError = true;
                        this.errors = res;
                    })
            })
            .finally(() => {
                this.postLoading = false;
            })
    }
    public IsValidationTrue() {
        if (!this.user.email) {
            Object.assign(this.errors, { email: ["The email field is required."] })
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
            return 'Send email';
    }
}