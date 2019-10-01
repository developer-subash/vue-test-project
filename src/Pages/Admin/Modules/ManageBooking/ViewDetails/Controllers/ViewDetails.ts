import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from '@/Pages/Admin/Modules/ManageBooking/ViewDetails/Views/view-details.html';

import GeneralModule from '@/Pages/Admin/Modules/ManagePackage/Store/General';
import {trekService} from '@/Pages/Admin/Modules/ManagePackage/Services/Trekservice';
import { common } from '@/Pages/Admin/Modules/Common/Services/Common';
import ValidationError from '@/Pages/Admin/Modules/Common/Controllers/ValidationError';
import Pager from '@/Pages/Admin/Modules/Common/Controllers/Pager';


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
  protected errorsMessage: any = {};
  protected errorsModal: any = {};
  protected errorsEdit: any = {};
  protected errorsSave: any = {};
  protected isError: boolean = false;
  protected BookingList: any = {};
  protected TrekList: any = {};
  protected SubTotal: any = 0;
  protected DepartureList: any = {};
  protected CustomerList: any = {};
  protected PackageCreater: any = {};


  constructor() {
    super();
  }
  public mounted() {
    this.getBookingList();
  }
  public getBookingList() {
    this.ui.IsLoading = true;
    let data = {
      booking_id: this.$route.query.id,
    };
    trekService
      .bookingDetailsList(data)
      .then((res: any) => {
        this.BookingList = res.data.data;
        this.TrekList = res.data.data.trek;
        this.DepartureList = res.data.data.departure;
        this.CustomerList = res.data.data.customer;
        this.PackageCreater = res.data.data.account;
        // console.log("hello", this.BookingList);
        this.subTotal();
      })
      .catch((error: any) => {
        // console.log('ERROR', error);
        common.sdCatchErr(error, this.errors).then((res: any) => {
          this.isError = true;
          this.errors = res;
        });
      })
      .finally(() => {
        this.ui.IsLoading = false;
      });
  }
  public showModal(){
    $("#cancelBooking").modal("show");
  }
  public cancelModal() {
    $("#cancelBooking").modal("hide");
    $(".modal-backdrop").remove();
  }
  public subTotal() {
    this.SubTotal = Number(this.BookingList.total_price) + Number(this.BookingList.saved_price);
  }

  public hideDeleteModal() {
    $("#delete").modal("hide");
    $(".modal-backdrop").remove();
    this.isError = false;
    this.errors = {};
    this.errorsEdit = {};
  }
  public downloadPdf() {
    // alert();
    this.ui.IsLoading = true;
    let data = {
      booking_id: this.BookingList.uuid,
    };
    console.log("UUID Check", data);
    trekService
      .downloadPdf(data)
      .then((res: any) => {
        console.log("Download Pdf", res.data.data);
        this.subTotal();
        window.open(res.data.data, '_blank');
      })
      .catch((error: any) => {
        // console.log('ERROR', error);
        common.sdCatchErr(error, this.errors).then((res: any) => {
          this.isError = true;
          this.errors = res;
        });
      })
      .finally(() => {
        this.ui.IsLoading = false;
      });
  }
}
