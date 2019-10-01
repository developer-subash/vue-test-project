
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from '@/Pages/Admin/Modules/ManageUsers/Invite/Views/invite.html';
import {trekService} from '@/Pages/Admin/Modules/ManagePackage/Services/Trekservice';
import { common } from '@/Pages/Admin/Modules/Common/Services/Common';
import ValidationError from '@/Pages/Admin/Modules/Common/Controllers/ValidationError';


@WithRender
@Component({
    components: {
        'validation-error': ValidationError,
    },
  })
export default class Invite extends Vue {
    protected ui: any = {};
    protected errors: any = {};
    protected errorsMessage: any = {};
    protected email: any = '';
    protected isError: boolean = false;
    constructor() {
        super();
        this.ui.IsLoading = false;
        this.ui.PostLoading = false;
    }
    public inviteUser() {
        this.isError = false;
        this.errors = {};
        if (!this.IsValidationTrue()){
            return;
        }
        // alert(this.email);
        let data = {
            // trek_id: this.Id,
            start_date: this.email,
        };
        // console.log(payLoad);
        this.ui.PostLoading = true;
        trekService
        .addDeparture(data)
        .then((res: any) => {
        // console.log(res.data.data);
        // this.DepartureList.push(res.data.data);
            // flashService.Success('Departure', 'A Departure are saved');
            // // this.Message = res.data.message;
            // this.DepartureList.unshift(res.data.data);
        })
        .catch((error: any) => {
            common.sdCatchErr(error, this.errorsMessage).then(res => {
              this.errorsMessage = res;
            });
            // flashService.Error('Error', 'Error while saving Departure');
        })
        .finally(() => {
            this.ui.PostLoading = false;
        });
    }
    protected IsValidationTrue() {
        if (!this.email) {
            Object.assign(this.errors, { email: ['The email field is required.'] });
        }
        if (common.notEmpty(this.errors)) {
            this.isError = true;
            return false;
        } else {
          return true;
        }
      }
}
