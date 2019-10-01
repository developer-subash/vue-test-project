
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from '@/Pages/Admin/Modules/ManageUsers/Views/manage-users.html';
import Pager from '@/Pages/Admin/Modules/Common/Controllers/Pager';
import ValidationError from '@/Pages/Admin/Modules/Common/Controllers/ValidationError';
import { flashService } from '@/Pages/Admin/Modules/Common/Services/FlashMessage/FlashService';


@WithRender
@Component({
  components: {
      Pager,
      'validation-error': ValidationError,
  },
})
export default class ManageDeparture extends Vue {
    protected ui: any = {};
    protected errors: any = {};
    protected isError: boolean = false;
    protected errorsAttraction: any = {};
    protected PendingList: any = {};
    protected SearchBy: any = {};
    protected paging: any = {};
    protected StatusList: any = [ {id: '0', name: 'Inactive'},
                                {id: '1', name: 'Active'}];
    constructor() {
        super();
        this.ui.IsLoading = false;
        this.ui.PostLoading = false;

        this.paging.current_page = 1;
        this.paging.last_page = 0;
        this.paging.per_page = 0;

        this.SearchBy.Username = '';
        this.SearchBy.Email = '';
        this.SearchBy.Status = '';
    }
    public mounted() {
      this.searchUser();
    }
    public searchUser() {
      this.paging.last_page = 1;
      let data = {
        username : this.SearchBy.Username,
        email : this.SearchBy.email,
        status : this.SearchBy.Status,
      };
      // console.log(data);
    }
    protected onPaging(CurrentPage: number) {
      // alert(CurrentPage);
      this.paging.current_page = CurrentPage;
      this.searchUser();
    }
    protected redirectToInvite() {
      this.$router.push({
          name: 'user-invite',
      });
    }
    protected redirectToPendingList() {
      this.$router.push({
          name: 'user-pending-invite',
      });
    }
}
