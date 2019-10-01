
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from '@/Pages/Admin/Modules/ManageUsers/PendingInvite/Views/pending-invite.html';
import Pager from '@/Pages/Admin/Modules/Common/Controllers/Pager';
import { trekService } from '@/Pages/Admin/Modules/ManagePackage/Services/Trekservice';
import { common } from '@/Pages/Admin/Modules/Common/Services/Common';

import ValidationError from '@/Pages/Admin/Modules/Common/Controllers/ValidationError';
import { flashService } from '@/Pages/Admin/Modules/Common/Services/FlashMessage/FlashService';

@WithRender
@Component({
  components: {
      Pager,
      'validation-error': ValidationError,
  },
})
export default class PendingInvite extends Vue {
    protected ui: any = {};
    protected errors: any = {};
    protected isError: boolean = false;
    protected errorsAttraction: any = {};
    protected PendingList: any = {};
    protected paging: any = {};
    constructor() {
        super();
        this.ui.IsLoading = false;
        this.ui.PostLoading = false;

        this.paging.current_page = 1;
        this.paging.last_page = 0;
        this.paging.per_page = 0;
    }
    public mounted() {
        this.getAllPendingList();
    }
    // get all user pending invite list
    public async getAllPendingList() {
        this.paging.last_page = 1;
        this.isError = false;
        this.errors = {};
        this.ui.IsLoading = true;
        let data = {
          trek_id: this.$route.query.id,
        };
        // console.log(data);
        // trekService
        //   .retrieveItinerary(data)
        //   .then((res: any) => {
        //     // console.log(res.data.data);
        //     this.PendingList = res.data.data;
        //   })
        //   .catch((error: any) => {
        //     common.sdCatchErr(error, this.errors).then(res => {
        //       this.errors = res;
        //     });
        //   })
        //   .finally(() => {
        //     this.ui.IsLoading = false;
        //   });
    }
    // re invite
    protected reSendInvitation(invite: any, index: any) {
        alert();
        this.isError = false;
        this.errors = {};
        // console.log("Selected Invitation data", invite );
        // console.log("Index", index );
        let data = {
          trek_id: this.$route.query.id,
        };
        console.log(data);
    //     this.ui.PostLoading = true;
    //     trekService
    //       .deletSegment(data)
    //       .then((res: any) => {
    //         // flashService.Success('Trek Segment Deleted', res.data.message);
    //         // this.$delete(this.ItineraryList, this.ActiveTab);
    //         // this.ItineraryList = {};
    //         this.deleteModalSegment();
    //         // this.selectedSegment(`${this.TempIndex -1}` , this.ItineraryList['${this.TempIndex -1}' ]);
    //         this.isError = false;
    //         this.errors = {};
    //       })
    //       .catch((error: any) => {
    //         common.sdCatchErr(error, this.errors).then(res => {
    //           this.errors = res;
    //         });
    //       })
    //       .finally(() => {
    //         this.ui.PostLoading = false;
    //       });
      }
      protected onPaging(CurrentPage: number) {
        // alert(CurrentPage);
        this.paging.current_page = CurrentPage;
        this.getAllPendingList();
      }
}
