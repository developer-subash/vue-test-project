import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from '@/Pages/Admin/Modules/ManageBooking/Views/manage-booking.html';

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
  protected DepartureList: any = {};
  protected Departure: any = {};
  protected EditSelectedDeparture: any = {};
  protected DepartureId: any = {};
  protected DepartureIndex: any = {};
  protected DepartureTrekId: any = {};

  protected start: any = {};
  protected end: any = {};
  protected StartDate: any = {};
  protected EndDate: any = {};
  protected TimeChange: any = {};
  protected Time: any = {};
  protected EditTimeChange: any = {};
  protected EditTime: any = {};
  protected EditStart: any = {};
  protected EditStartDate: any = {};
  protected TempStart: any = '';
  protected TempEnd: any = '';
  protected FilterStartDate: any = '';
  protected FilterEndDate: any = '';
  protected EditEnd: any = {};
  protected EditEndDate: any = {};
  protected CurrentPage: number = 0;
  protected LastPage: number = 0;
  protected PerPage: number = 0;
  protected TrekList: any = [];
  protected FilterDepartureList: any = [];
  protected SelectedBooking: any = {};

  protected paging: any = {};

  protected StatusList: any = [ {id: '1', name: 'Active'},
                                {id: '0', name: 'InActive'},
                                {id: '2', name: 'Cancelled'}];
  protected BookingTypeList: any = [ {id: 'booking', name: 'Booking'},
                                {id: 'pre-booking', name: 'Pre-Booking'}];
  protected PaymentMethodList: any = [ {id: 'manual', name: 'Manual'},
                                {id: 'stripe', name: 'Stripe'}];
  protected PaymentStatusList: any = [ {id: '0', name: 'Unpaid'},
                                {id: '1', name: 'Paid'}];

  protected BookingType: any = '';
  protected DepartureDate: any = '';
  protected SearchByName: any = '';
  protected SearchByNumber: any = '';
  protected SearchByEmail: any = '';
  protected SearchByPayment: any = '';
  protected SearchByPaymentStatus: any = '';
  protected Status: any = '';
  protected Season: any = '';
  protected GetStartDate: any = '';
  protected GetEndDate: any = '';
  protected GetTrek: any = '';
  protected SelectList: any = '';
  protected Id: any = 0;
  protected TrekStatusDisable: boolean = false;
  protected DetailStatus: boolean = false;


  constructor() {
    super();
    this.paging.current_page = 1;
    this.paging.last_page = 0;
    this.paging.per_page = 0;

    this.Departure.StartDate = '';
    this.Departure.EndDate = '';
    this.Departure.Time = '';
    this.Departure.MinQuota = '';
    this.Departure.MaxQuota = '';
    this.Departure.Season = '';
    this.Departure.Trek = '';


    this.EditSelectedDeparture.StartDate = '';
    this.EditSelectedDeparture.EndDate = '';
    this.EditSelectedDeparture.Time = '';
    this.EditSelectedDeparture.MinQuota = '';
    this.EditSelectedDeparture.MaxQuota = '';
    this.EditSelectedDeparture.Season = '';
    this.EditSelectedDeparture.Id = '';
    this.EditSelectedDeparture.Index = '';
    this.EditSelectedDeparture.Trek = '';

    this.SelectedBooking.Name = '';
    this.SelectedBooking.ContactNumber = '';
    this.SelectedBooking.Email = '';
    this.SelectedBooking.Country = '';
    this.SelectedBooking.DOB = '';
    this.SelectedBooking.BookingsList = [];
    this.SelectedBooking.PreBookingsList = [];
    this.SelectedBooking.BookingsCount = '';
    this.SelectedBooking.BookingStatus = '';
    this.SelectedBooking.Trek = '';

    this.CurrentPage = 1;
  }
  // public hideModal() {
  //   this.Departure.StartDate = '';
  //   this.Departure.EndDate = '';
  //   this.Departure.Time = '';
  //   this.Departure.Min = '';
  //   this.Departure.Max = '';
  //   this.Departure.Season = '';
  // }
  public mounted() {
    this.checkTrekId();
    this.GetTrekList();
    this.GetAllSeasons();
    this.getDepartureByFilter();
  }
  public async GetAllSeasons() {
    this.ui.IsLoading = true;
    await GeneralModule.GetSeasons()
      .then((res: any) => {
        // console.log('GetAllGeneralTabData', res);
      })
      .catch((error: any) => {
        this.errors = error;
      })
      .finally(() => {
        this.ui.IsLoading = false;
      });
  }
  get getSeasons() {
    return GeneralModule.Seasons;
  }
  public GetTrekList() {
    this.ui.IsLoading = true;
    trekService
      .getTrek()
      .then((res: any) => {
        this.TrekList = res.data.data;
        // console.log("hello",this.TrekList);
        if (this.$route.query.id) {
          let array: Array<number> = [];
          this.TrekList.forEach((item: any) => {
            // console.log("inside loop", item);
            if (this.$route.query.id == item.id) {
              // console.log(item);
              this.GetTrek = item;
              this.TrekStatusDisable = true;
            }
        });
        }
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
  public checkTrekId() {
    if (this.$route.query.id) {
      this.getDepartureList();
    }
  }
  public getDepartureList() {
    this.ui.IsLoading = true;
    // console.log(this.GetTrek);
    this.Id = 0;
    if (this.$route.query.id) {
      this.Id = this.$route.query.id;
      // this.TrekStatusDisable = true;
      // this.GetTrek = true;
    } else {
      this.Id = this.GetTrek.id ? this.GetTrek.id : '';
    }
    let data = {
      trek_id: this.Id,
    };
    trekService
      .departuresList(data)
      .then((res: any) => {
        this.FilterDepartureList = res.data.data;
        // console.log("hello", this.FilterDepartureList);
        this.getDepartureByFilter();
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
  public getDepartureByFilter() {
    this.DepartureList = {};
    this.TempStart = new Date(this.GetStartDate);
    this.FilterStartDate =  this.TempStart;

    this.TempEnd = new Date(this.GetEndDate);
    this.FilterEndDate =  this.TempEnd;


    this.Id = 0;
    if (this.$route.query.id) {
      this.Id = this.$route.query.id;
      this.TrekStatusDisable = true;
    } else {
      this.Id = this.GetTrek ? this.GetTrek : '';
    }
    let data = {
        paging:
        {
          current_page :	this.paging.current_page,
          last_page: this.paging.last_page,
          per_page : this.paging.per_page,
        },
      search: {
        trek_id: this.Id,
        departure_id: this.DepartureDate.id,
        type: this.BookingType,
        payment_method: this.SearchByPayment,
        payment_status: this.SearchByPaymentStatus,
        start_date: this.FilterStartDate,
        end_date: this.FilterEndDate,
        customer_name: this.SearchByName,
        email: this.SearchByEmail,
        contact_number: this.SearchByNumber,
      },
      sorting: {
        sort_by: 'trek_id',
        sort_order: 'desc',
      },
    };
    this.ui.IsLoadingFilter = true;
    trekService
    .searchBookiingByFilter(data)
    .then((res: any) => {
      // console.log("Departure Filter ",res.data.data);
      this.paging.last_page = res.data.data.last_page;
      this.paging.per_page = res.data.data.per_page;
      let list: any = [];
      // this.DepartureList = res.data.data.data;
      res.data.data.data.forEach((item: any) => {
        list.push(item);
      });
      this.DepartureList = list;
      this.ui.IsLoadingFilter = false;
    })
    .catch ((error: any) => {
      common.sdCatchErr(error, this.errorsMessage)
      .then((res: any) => {
        this.isError = true;
        this.errorsMessage = res;
      });
    })
  }
  public openAdvanceFilter(){
    $(".advance-filter").slideToggle("medium");
  }
  public shrinkTable(item: any, index: any) {
    $(".manage-booking-table .table-container").toggleClass('change-width');
    $(".manage-booking-table .booking-details").toggleClass('d-inline-block');
    console.log("index", index);
    console.log("item", item);
    this.DetailStatus = true;
    this.SelectedBooking.Name = item.firstname + " " + item.lastname;
    this.SelectedBooking.ContactNumber = item.contact_number;
    this.SelectedBooking.Email = item.email;
    let data = item.departure;
    // console.log("check data", data);
    if (item.trek) {
      this.SelectedBooking.Trek = item.trek;
    }
    // if (data.bookings) {
    // data.bookings.forEach((item: any) => {
    //   this.SelectedBooking.BookingsList.push(item);
    // });
    // data.prebookings.forEach((item: any) => {
    //   this.SelectedBooking.PreBookingsList.push(item);
    // });
    // }
    // this.SelectedBooking.BookingsCount = data.bookings_count;
    this.SelectedBooking.Country = item.country;
    this.SelectedBooking.Adult = item.no_of_adult;
    this.SelectedBooking.Youth = item.no_of_infant;
    this.SelectedBooking.Infant = item.no_of_youth;
    this.SelectedBooking.DOB = item.dob;
    this.DetailStatus = false;
  }
  // clear all Filter
  public clearAllFilter() {
    // alert('clear');
    if (this.$route.query.id) {
      this.BookingType = '';
      this.DepartureDate = '';
      // this.GetTrekList();
      let array: Array<number> = [];
        this.TrekList.forEach((item: any) => {
            // console.log("inside loop", item);
          if (this.$route.query.id == item.id) {
              // console.log(item);
            this.GetTrek = item;
            this.TrekStatusDisable = true;
            }
        });
      this.getDepartureByFilter();
    } else {
      this.GetTrek = '';
      this.DepartureDate = '';
      this.GetStartDate = '';
      this.GetEndDate = '';
      this.BookingType = '';
      this.SearchByName = '';
      this.SearchByEmail = '';
      this.SearchByNumber = '';
      this.getDepartureByFilter();
    }
  }
  public viewDetail(index: any, item: any) {
    console.log(item.id);
    this.$router.push({
      name: 'business-manage-booking-view-details',
      query: {
        id: item.id,
      },
    });
    console.log("index", index);
    console.log("item", item);
    this.DetailStatus = true;
    this.SelectedBooking.Name = item.firstname + " " + item.lastname;
    this.SelectedBooking.ContactNumber = item.contact_number;
    this.SelectedBooking.Email = item.email;
    let data = item.departure;
    // console.log("check data", data);
    if (item.trek) {
      this.SelectedBooking.Trek = item.trek;
    }
    // if (data.bookings) {
    // data.bookings.forEach((item: any) => {
    //   this.SelectedBooking.BookingsList.push(item);
    // });
    // data.prebookings.forEach((item: any) => {
    //   this.SelectedBooking.PreBookingsList.push(item);
    // });
    // }
    // this.SelectedBooking.BookingsCount = data.bookings_count;
    this.SelectedBooking.Country = item.country;
    this.SelectedBooking.Adult = item.no_of_adult;
    this.SelectedBooking.Youth = item.no_of_infant;
    this.SelectedBooking.Infant = item.no_of_youth;
    this.SelectedBooking.DOB = item.dob;
    this.DetailStatus = false;
  }
  public hideDepartureEditModal() {
    $("#EditDeparture").modal("hide");
    $(".modal-backdrop").remove();
    this.errors = {};
    this.isError = false;
    this.EditSelectedDeparture.StartDate = '';
    this.EditSelectedDeparture.EndDate = '';
    this.EditSelectedDeparture.Time = '';
    this.EditSelectedDeparture.MinQuota = '';
    this.EditSelectedDeparture.MaxQuota = '';
    this.EditSelectedDeparture.Season = '';
    this.EditSelectedDeparture.Id = '';
    this.EditSelectedDeparture.Index = '';
    this.DepartureTrekId = '';
  }

  public EditDeparture(index: any, departure: any) {
    this.isError = false;
    this.errors = {};
    $("#EditDeparture").modal("show");
    // departure.IsActive = true;
    // console.log(departure);
    this.EditSelectedDeparture.Index = index;
    this.EditSelectedDeparture.Id = departure.id;
    this.EditSelectedDeparture.StartDate = departure.start_date;
    this.EditSelectedDeparture.EndDate = departure.end_date;
    this.EditSelectedDeparture.Time = departure.start_time;
    this.EditSelectedDeparture.MinQuota = departure.min_quota;
    this.EditSelectedDeparture.MaxQuota = departure.max_quota;
    this.EditSelectedDeparture.Season = departure.season;
    this.DepartureTrekId = '';
    if (departure.trek_id) {
      // alert( "click");
      this.DepartureTrekId = departure.trek_id;
    } else {
      // alert("route");
      this.DepartureTrekId = this.$route.query.id;
    }
  }
  public hideDeleteModal() {
    $("#delete").modal("hide");
    $(".modal-backdrop").remove();
    this.isError = false;
    this.errors = {};
    this.errorsEdit = {};
    this.DepartureId = '';
    this.DepartureTrekId = '';
  }
  protected IsValidationTrueEdit() {
    if (!this.EditSelectedDeparture.StartDate) {
        Object.assign(this.errors, { edit_start_date: ['The start date field is required.'] });
    }
    if (!this.EditSelectedDeparture.EndDate) {
        Object.assign(this.errors, { edit_end_date: ['The end date field is required.'] });
    }
    if (!this.EditSelectedDeparture.Time) {
        Object.assign(this.errors, { edit_start_time: ['The start time field is required.'] });
    }
    if (!this.EditSelectedDeparture.MinQuota) {
        Object.assign(this.errors, { edit_min_quota: ['The min quota field is required.'] });
    }
    if (!this.EditSelectedDeparture.MaxQuota) {
        Object.assign(this.errors, { edit_max_quota: ['The max quota field is required.'] });
    }
    if (!this.EditSelectedDeparture.Season) {
        Object.assign(this.errors, { edit_season_id: ['The season id field is required.'] });
    }
    if (common.notEmpty(this.errors)) {
        this.isError = true;
        return false;
    } else {
      return true;
    }
  }
  protected IsValidationTrue() {
    if (!this.Departure.StartDate) {
        Object.assign(this.errors, { start_date: ['The start date field is required.'] });
    }
    if (!this.Departure.EndDate) {
        Object.assign(this.errors, { end_date: ['The end date field is required.'] });
    }
    if (!this.Departure.Time) {
        Object.assign(this.errors, { start_time: ['The start time field is required.'] });
    }
    if (!this.Departure.MinQuota) {
        Object.assign(this.errors, { min_quota: ['The min quota field is required.'] });
    }
    if (!this.Departure.MaxQuota) {
        Object.assign(this.errors, { max_quota: ['The max quota field is required.'] });
    }
    if (!this.Departure.Season) {
        Object.assign(this.errors, { season_id: ['The season id field is required.'] });
    }
    if (common.notEmpty(this.errors)) {
        this.isError = true;
        return false;
    } else {
      return true;
    }
  }
  protected onPaging(CurrentPage: number) {
    // alert(CurrentPage);
    this.paging.current_page = CurrentPage;
    this.getDepartureByFilter();
  }
}
