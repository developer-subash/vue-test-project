import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from '@/Pages/Admin/Modules/ManageDeparture/Views/manage-departure-package.html';

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
  protected Message: any = {};
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

  protected paging: any = {};

  protected StatusList: any = [ {id: '1', name: 'Active'},
                                {id: '0', name: 'InActive'},
                                {id: '2', name: 'Cancelled'}];

  protected Status: any = '';
  protected Season: any = '';
  protected GetStartDate: any = '';
  protected GetEndDate: any = '';
  protected GetTrek: any = '';
  protected SelectList: any = '';


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

    this.EditSelectedDeparture.StartDate = '';
    this.EditSelectedDeparture.EndDate = '';
    this.EditSelectedDeparture.Time = '';
    this.EditSelectedDeparture.MinQuota = '';
    this.EditSelectedDeparture.MaxQuota = '';
    this.EditSelectedDeparture.Season = '';
    this.EditSelectedDeparture.Id = '';
    this.EditSelectedDeparture.Index = '';

    this.CurrentPage = 1;
  }
  public hideModal() {
    this.Departure.StartDate = '';
    this.Departure.EndDate = '';
    this.Departure.Time = '';
    this.Departure.Min = '';
    this.Departure.Max = '';
    this.Departure.Season = '';
  }
  public mounted() {
    this.GetTrekList();
    this.GetAllSeasons();
    this.GetPackageDepartureList();  
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
  public GetPackageDepartureList() {
    this.errorsMessage = {};
    this.TempStart = new Date(this.GetStartDate);
    this.FilterStartDate =  this.TempStart;

    this.TempEnd = new Date(this.GetEndDate);
    this.FilterEndDate =  this.TempEnd;

    let data = {
        paging:
        {
          current_page : this.paging.current_page,
          last_page: this.paging.last_page,
          per_page : this.paging.per_page,
        },
      search: {
        title: "",
        tour_type_id: "",
        duration: "",
        difficulty_level_id: "",
        pricing_basis_id: "",
        base_price: "",
      },
      sorting: {
        sort_by: 'trek_id',
        sort_order: 'desc',
      },
    };
    this.ui.IsLoading = true;
    trekService
      .departureList(data)
      .then((res: any) => {
        console.log("Package", res.data.data);
        this.paging.last_page = res.data.data.last_page;
        this.paging.per_page = res.data.data.per_page;
        res.data.data.data.filter((departure: any) => {
          departure.IsActive = false;
        });
        this.DepartureList = res.data.data.data;
      })
      .catch((error: any) => {
        // console.log('ERROR', error);
        common.sdCatchErr(error, this.errorsMessage).then((res: any) => {
          this.isError = true;
          this.errorsMessage = res;
        });
      })
      .finally(() => {
        this.ui.IsLoading = false;
      });
  }
  // clear all Filter
  public clearAllFilter() {
    // alert('clear');
    this.GetTrek = '';
    this.Season = '';
    this.GetStartDate = '';
    this.GetEndDate = '';
    this.Status = '';
  }
  public GetTrekList() {
    this.ui.IsLoading = true;
    trekService
      .getTrek()
      .then((res: any) => {
        this.TrekList = res.data.data;
        // console.log("hello",this.TrekList);
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
  public deleteDep(index: any, departure: any){
    this.isError = false;
    this.errors = {};
    this.errorsEdit = {};
    $("#delete").modal("show");
    console.log(index);
    console.log(departure);
    this.DepartureIndex = index;
    this.DepartureId = departure;
    this.DepartureTrekId = '';
    if (departure.trek_id) {
      // alert( "click");
      this.DepartureTrekId = departure.trek_id;
    } else {
      // alert("route");
      this.DepartureTrekId = this.$route.query.id;
    }
  }
  public DeleteDeparture() {
    this.isError = false;
    this.errors = {};
    this.errorsEdit = {};
    // console.log(departure);
    // alert('Delete Departure');
    let data = {
      trek_id: this.DepartureTrekId,
      id: this.DepartureId.id,
    };
    // console.log(payLoad);
    this.ui.PostLoading = true;
    trekService
    .deleteDeparture(data)
    .then((res: any) => {
      console.log(res.data.data);
      // this.DepartureList.push(res.data.data);
      flashService.Success('Departure', 'Selected Deleted');
      // this.Message = res.data.message;
      this.$delete(this.DepartureList, this.DepartureIndex);
      this.hideDeleteModal();
    })
    .catch((error: any) => {
      common.sdCatchErr(error, this.errorsEdit).then(res => {
        this.errorsEdit = res;
      });
    })
    .finally(() => {
      this.ui.PostLoading = false;
    });
  }
  public SaveDeparture() {
    this.isError = false;
    this.errors = {};
    this.errorsSave = {};
    if (!this.IsValidationTrueEdit()) return;
    this.EditStart = new Date(this.EditSelectedDeparture.StartDate);
    this.EditStartDate =  this.EditStart.toISOString().slice(0, 10);

    this.EditEnd = new Date(this.EditSelectedDeparture.EndDate);
    this.EditEndDate =  this.EditEnd.toISOString().slice(0, 10);

    this.EditTimeChange = new Date(this.EditSelectedDeparture.Time);
    // console.log(this.EditTimeChange)
    this.EditTime =  this.EditTimeChange.toISOString().slice(11, 16);
    // console.log(this.EditTime);

    let data = {
      trek_id: this.DepartureTrekId,
      id: this.EditSelectedDeparture.Id,
      start_date: this.EditStartDate,
      end_date: this.EditEndDate ,
      start_time: this.EditTime,
      min_quota: Number(this.EditSelectedDeparture.MinQuota),
      max_quota: Number(this.EditSelectedDeparture.MaxQuota),
      season_id: this.EditSelectedDeparture.Season.id,
    };
    // console.log(payLoad);
    this.ui.PostLoading = true;
    trekService
    .editDeparture(data)
    .then((res: any) => {
      // console.log(res.data.data);
      // this.DepartureList.push(res.data.data);
      flashService.Success('Departure', res.data.message);
      // this.Message = res.data.message;
      this.$set(this.DepartureList, this.EditSelectedDeparture.Index, res.data.data);
      this.hideDepartureEditModal();
    })
    .catch((error: any) => {
      common.sdCatchErr(error, this.errorsSave).then(res => {
        this.errorsSave = res;
      });
    })
    .finally(() => {
      this.ui.PostLoading = false;
    });
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
  protected hideDepartureModal() {
    $("#addDeparture").modal("hide");
    $(".modal-backdrop").remove();
    this.errors = {};
    this.isError = false;
    this.Departure.StartDate = '';
    this.Departure.EndDate = '';
    this.Departure.Time = '';
    this.Departure.MinQuota = '';
    this.Departure.MaxQuota = '';
    this.Departure.Season = '';
  }
  public departureModal(){
    this.isError = false;
    this.errors = {};
    $("#addDeparture").modal("show");
    // console.log();

  }
  protected CreateDeparture() {
    this.isError = false;
    this.errors = {};
    // alert();
    if (!this.IsValidationTrue()) return;
    this.start = new Date(this.Departure.StartDate);
    this.StartDate =  this.start.toISOString().slice(0, 10);

    this.end = new Date(this.Departure.EndDate);
    this.EndDate =  this.end.toISOString().slice(0, 10);

    this.TimeChange = new Date(this.Departure.Time);
    this.Time =  this.TimeChange.toISOString().slice(11, 16);

    // console.log(this.StartDate);
    // console.log(this.EndDate);
    // console.log(this.Time);
    let data = {
      trek_id: this.$route.query.id,
      start_date: this.StartDate,
      end_date: this.EndDate,
      start_time: this.Time,
      min_quota: this.Departure.MinQuota,
      max_quota: this.Departure.MaxQuota,
      season_id: this.Departure.Season.id,
    };
    // console.log(payLoad);
    this.ui.PostLoading = true;
    trekService
    .addDeparture(data)
    .then((res: any) => {
      // console.log(res.data.data);
      // this.DepartureList.push(res.data.data);
      flashService.Success('Departure', 'A Departure are saved');
      // this.Message = res.data.message;
      this.DepartureList.unshift(res.data.data);
      this.hideDepartureModal();
    })
    .catch((error: any) => {
      common.sdCatchErr(error, this.errorsModal).then(res => {
        this.errorsModal = res;
      });
      // flashService.Error('Error', 'Error while saving Departure');
    })
    .finally(() => {
      this.ui.PostLoading = false;
    });
  }
  public CloseDeparture() {
    this.hideModal();
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
    this.GetPackageDepartureList();
  }
}
