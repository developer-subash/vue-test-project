
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from '@/Pages/Admin/Modules/ManageUsers/ChangePassword/Views/change-password.html';
import { trekService } from "@/Pages/Admin/Modules/ManagePackage/Services/Trekservice";
import { common } from "@/Pages/Admin/Modules/Common/Services/Common";
import { Cookie } from "@/Pages/Admin/Modules/Common/Services/CookieService";
import ValidationError from "@/Pages/Admin/Modules/Common/Controllers/ValidationError";

import { flashService } from "@/Pages/Admin/Modules/Common/Services/FlashMessage/FlashService";

@WithRender
@Component({
    components: {
      "validation-error": ValidationError
    },
  })
export default class ChangePassword extends Vue {
    private ui: any = {};
    private errors: any = {};
    private Password: any = {};
    private errorsMessage: any = {};
    private isError: boolean = false;
    private password: any = '';
    private passwordFieldType: any = 'password';
    private passwordFieldTypeConform: any = 'password';
    constructor() {
        super();
        this.Password.Old = '';
        this.Password.New = '';
        this.Password.NewConfirm = '';
    }
    public switchVisibilityNew() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
      $('#passwordNew').toggleClass('fas fa-eye-slash').toggleClass('fa fa-fw fa-eye');
    }
    public switchVisibilityConform() {
      this.passwordFieldTypeConform = this.passwordFieldTypeConform === 'password' ? 'text' : 'password';
      $('#passwordConform').toggleClass('fas fa-eye-slash').toggleClass('fa fa-fw fa-eye');
    }
    public changePassword() {
        // alert();
        this.isError = false;
        this.errors = {};
        this.errorsMessage = {};
        // console.log(this.TempIndex );
        if (!this.IsValidationPasswordTrue()) {
            return;
          }
        let data = {
            old_password : this.Password.Old,
            password : this.Password.New,
            confirm_password : this.Password.NewConfirm,
        };
        this.ui.PostLoading = true;
        trekService
        .updatePassword(data)
        .then((res: any) => {
            flashService.Success("Successfully Updated Password", res.data.message);
            this.Password.Old = '';
            this.Password.New = '';
            this.Password.NewConfirm = '';
            this.ui.PostLoading = false;
            this.isError = false;
            this.errorsMessage = {};
            this.errors = {};
            if (Cookie.check("business_auth_token")) {
              Cookie.delete("business_auth_token");
              this.$router.push({
                name: "business-login"
              });
            }
        })
        .catch((error: any) => {
            common.sdCatchErr(error, this.errorsMessage).then(res => {
            this.errorsMessage = res;
            });
        })
        .finally(() => {
            this.ui.PostLoading = false;
        });
    }
    protected IsValidationPasswordTrue() {
        if (!this.Password.Old) {
          Object.assign(this.errors, {
            old_password: ["The first name field is required."]
          });
        }
        if (!this.Password.New) {
          Object.assign(this.errors, {
            new_password: ["The password field is required."]
          });
        }
        if (!this.Password.NewConfirm) {
          Object.assign(this.errors, {
            new_confirm_password: ["The confirm password field is required."]
          });
        }
        if (this.Password.New != this.Password.NewConfirm) {
          Object.assign(this.errors, {
            new_confirm_password: ["The confirm password  & password doesnot match."]
          });
        }
        if (common.notEmpty(this.errors)) {
          this.isError = true;
          return false;
        } else {
          return true;
        }
      }

}
