import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from '@/Pages/Admin/Modules/ManageDeparture/Views/detail-departure.html';

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
export default class DetailDeparture extends Vue {
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
  protected Id: any = 0;
  protected TrekStatusDisable: boolean = false;
  protected showDepartureRule: boolean = false;
  protected DiscountType: any = {};
  protected DiscountTypeTitle: any = {};
  protected DiscountPlaceholder: any = {};
  protected RequestDurationList: any = [ {id: 'percent', name: 'Percentage (%)'},
                                          {id: 'flat', name: 'Flat'}];

  protected Pricing: any = {};
  protected EditPrice: any = {};
  protected IsActive: boolean = false;
  protected StatusDeparture: boolean = false;
  protected PricingList: any = {};
  protected SelectedIndexDelete: any = {};
  protected SelectedIndex: any = {};
  protected DiscountTitle: any = {};
  protected TrekGeneralPricingRule: any = {};
  protected TrekDeparturePricingRule: any = {};
  protected AddDestinationStatus: boolean = false;
  protected ShowStartDate: any = '';
  protected ShowEditDate: any = '';
  protected DiscountPlaceholderGeneral: any = '';
  protected DiscountAmount: any = '';
  protected DeparturePriceStatus: boolean = false;
  protected DeparturePriceStatusDisable: boolean = false;


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
    this.Departure.Price = '';
    this.Departure.CheckPrice = false;
    this.Departure.ShouldEdit = false;

    this.CurrentPage = 1;

    this.DiscountType = '';
    this.DiscountTypeTitle = '';
    this.DiscountPlaceholder = '';

    this.Pricing.AddMin = '',
    this.Pricing.AddMax = '',
    this.Pricing.AddDiscount = '',

    this.EditPrice.EditDisabled = false,
    this.EditPrice.index = '',
    this.EditPrice.AddMin = '',
    this.EditPrice.id = '',
    this.EditPrice.AddMax = '',
    this.EditPrice.AddDiscount = '',
    this.Pricing.List = [];

    this.DiscountType = '';
    this.DiscountTypeTitle = '';
    this.DiscountPlaceholder = '';
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
    this.GetAllSeasons();
    // this.GetTrekList();
    this.setDefaultDiscountType();
    this.GetPricingList();
    this.departureList();
    // this.Departure.Trek = this.$route.query.id;
  }
  @Watch ('DeparturePriceStatus')
 public departurePrice() {
  //  alert();
    this.DeparturePriceStatus = true;
    if (this.DeparturePriceStatus === true) {
      this.StatusDeparture = true;
      this.DeparturePriceStatus = false;
      this.DeparturePriceStatusDisable = true;
      // this.DeparturePriceStatus = true;
    } else {
      this.StatusDeparture = false;
      // this.DeparturePriceStatus = false;
    }
    this.DeparturePriceStatus = false;
 }
  // get Pricing Rules List
  public async departureList() {
    this.ui.IsLoading = true;
    let data = {
      id: this.$route.query.id,
    };
    trekService
      .retrieveDepartureAll(data)
      .then((res: any) => {
        // console.log(res.data.data);
        this.DepartureList = res.data.data;
        this.TrekList = res.data.data.trek;
        // this.TrekDeparturePricingRule = res.data.data.trek.trek_pricing_rules;
        // map to UI
        this.Departure.Season = this.DepartureList.season;
        this.Departure.MaxQuota = this.DepartureList.max_quota;
        this.Departure.MinQuota = this.DepartureList.min_quota;
        this.Departure.EndDate = res.data.data.end_date;
        this.Departure.StartDate = res.data.data.start_date;
        this.Departure.Price = res.data.data.price;
        this.Departure.Time = this.DepartureList.start_time;
        let tempStart = new Date(this.DepartureList.start_date);
        this.ShowStartDate =  tempStart.toISOString().slice(0, 10);

        let tempEnd = new Date(this.DepartureList.end_date);
        this.EditEndDate =  tempEnd.toISOString().slice(0, 10);
        res.data.data.trek.trek_pricing_rules.filter((price: any, index: number) => {
          price.IsActive = false;
          // console.log(this.Pricing.List);
        });
        this.TrekGeneralPricingRule = res.data.data.trek.trek_pricing_rules;
        // res.data.data.trek.trek_pricing_rules.filter((price: any, index: number) => {
        //   price.IsActive = false;
        //   // console.log(this.Pricing.List);
        // });
        // this.TrekDeparturePricingRule = res.data.data.trek.trek_pricing_rules;
      })
      .catch((error: any) => {
        this.errors = error;
      })
      .finally(() => {
        this.ui.IsLoading = false;
      });
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
  public preventNonNumericalInput(event: any) {
    common.preventNonNumericalInput(event);
  }
  public enableEditMode() {
    this.Departure.ShouldEdit = true;
  }
  public upcommingPriceList() {
    if (!this.showDepartureRule) {
      this.showDepartureRule = true;
    } else {
      this.showDepartureRule = false;
    }
  }
  public closeFloating(){
    console.log('Hewl');
  }
  protected hideDepartureModal() {
    this.errors = {};
    this.isError = false;
    this.Departure.ShouldEdit = false;
  }
  protected SaveDeparture() {
    alert();
    this.isError = false;
    this.errors = {};
    this.errorsSave = {};
    if (!this.IsValidationTrueSaveDeparture()) return;
    this.start = new Date(this.Departure.StartDate);
    console.log("Main",this.Departure.StartDate);
    this.StartDate =  this.start.toISOString().slice(0, 10);
    console.log("Edit",this.StartDate);

    this.end = new Date(this.Departure.EndDate);
    this.EndDate =  this.end.toISOString().slice(0, 10);

    // let timeChange = new Date(this.Departure.Time);
    // this.Time =  timeChange.toString().slice(15, 21);
    // // console.log("TIME T",timeChange);
    // // console.log("TIME",this.Time);
    let timeChange = new Date(this.Departure.Time);
    this.Time =  timeChange.toTimeString().slice(0, 5);
    // console.log("TIME T",timeChange);
    // console.log("TIME",this.Time);

    let data = {
      trek_id: Number(this.DepartureList.trek_id),
      id: Number(this.$route.query.id),
      start_date: this.StartDate,
      end_date: this.EndDate,
      start_time: this.Time,
      min_quota: Number(this.Departure.MinQuota),
      max_quota: Number(this.Departure.MaxQuota),
      season_id: Number(this.Departure.Season.id),
      price : Number(this.Departure.Price),
      has_departure_price: 1,
    };
    // console.log(payLoad);
    this.ui.PostLoading = true;
    trekService
    .editDeparture(data)
    .then((res: any) => {
      console.log(res.data.data);
      this.hideDepartureModal();
      // this.DepartureList.push(res.data.data);
      // Vue.set(this.DepartureList, this.DepartureList, res.data.data);
      this.departureList();
      this.Departure.ShouldEdit = false;
      // this.$set(this.DepartureList, 0, res.data.data);
      flashService.Success('Departure', res.data.message);
      // this.Message = res.data.message;
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
  protected IsValidationTrueSaveDeparture() {
    if (!this.Departure.Price) {
        Object.assign(this.errors, { price: ['The price field is required.'] });
    }
    if (!this.Departure.Time) {
        Object.assign(this.errors, { start_time: ['The start date field is required.'] });
    }
    if (!this.StartDate) {
        Object.assign(this.errors, { start_date: ['The end date field is required.'] });
    }
    if (!this.EndDate) {
        Object.assign(this.errors, { end_date: ['The start time field is required.'] });
    }
    if (!this.Departure.MinQuota) {
        Object.assign(this.errors, { min_quota: ['The min quota field is required.'] });
    }
    if (!this.Departure.MaxQuota) {
        Object.assign(this.errors, { max_quota: ['The max quota field is required.'] });
    }
    if (!this.Departure.Season) {
        Object.assign(this.errors, { season_id: ['The season field is required.'] });
    }
    if (common.notEmpty(this.errors)) {
        this.isError = true;
        return false;
    } else {
      return true;
    }
  }

  // pricing rule
  protected hideModalRule() {
    this.errors = {};
    this.isError = false;
    this.errorsMessage = '';
    this.Pricing.AddMin = '';
    this.Pricing.AddMax = '';
    this.Pricing.AddDiscount = '';
  }

  protected setDefaultDiscountType() {
    this.DiscountType = {id: 'percent', name: 'Percentage (%)'};
    this.changeDiscountType();
  }

  // get Pricing Rules List of selected Departure
  protected async GetPricingList() {
    this.ui.IsLoading = true;
    let data = {
      id: this.$route.query.id,
    };
    trekService
      .priceListDeparture(data)
      .then((res: any) => {
        console.log(res.data.data);
        // this.Pricing.BasePrice = res.data.data.base_price;
        // console.log(res.data.data.trek_pricing_rule);
        res.data.data.filter((price: any, index: number) => {
          price.IsActive = false;
          // console.log(this.Pricing.List);
        });
        this.TrekDeparturePricingRule = res.data.data;
        // console.log(this.PricingList);
      })
      .catch((error: any) => {
        this.errors = error;
      })
      .finally(() => {
        this.ui.IsLoading = false;
      });
  }

  protected selectDiscountType() {
    $("#informOperator").modal("show");
  }

  protected changeDiscountType() {
    $("#informOperator").modal("hide");
    $(".modal-backdrop").remove();
    // alert();
    if (this.DiscountType.id === 'percent') {
      this.DiscountTypeTitle = 'Discount percent(%)';
      this.DiscountPlaceholder = '%';
      this.DiscountPlaceholderGeneral = '%';
      this.DiscountTitle = 'Percentage (%)';
    } else {
      this.DiscountTypeTitle = 'Flat';
      this.DiscountPlaceholder = 'Amount';
      this.DiscountPlaceholderGeneral = '';
      this.DiscountTitle = 'Flat';
    }
    // post the discount type
    this.ui.PostLoading = true;
    let data = {
      discount_type: this.DiscountType.id,
    };
    // console.log(data);
    // trekService
    //   .pricingList(data)
    //   .then((res: any) => {
    //     // console.log(res.data.data);
    //   })
    //   .catch((error: any) => {
    //     common.sdCatchErr(error, this.errorsMessage)
    //     .then((res) => {
    //       this.errorsMessage = res;
    //     });
    //   })
    //   .finally(() => {
          this.ui.PostLoading = false;
    //   });
    // this.GetPricingList();

  }
  protected hideModalSegment() {
    $("#informOperator").modal("hide");
    $(".modal-backdrop").remove();
  }

  protected AddPricing() {

    this.errors = {};
    this.isError = false;
    if (!this.IsValidationTrueRule()) {
      return;
    }
    let data = {
      departure_id: Number(this.$route.query.id),
      has_departure_pricing_rule: '1',
      min_quota: Number(this.Pricing.AddMin),
      max_quota: Number(this.Pricing.AddMax),
      discount: Number(this.Pricing.AddDiscount),
      discount_type: this.DiscountType.id,
    };
    console.log(data);
    this.ui.PostLoading = true;
    trekService
      .addPriceDeparture(data)
      .then((res: any) => {
        console.log(res.data.data);
        flashService.Success('Pricing Rule Added', res.data.message);
        // this.Message.Add = res.data.message;
        Object.assign(res.data.data, { IsActive: false});
        this.TrekDeparturePricingRule.unshift(res.data.data);
        this.hideModalRule();
        this.ui.PostLoading = false;
        this.DeparturePriceStatusDisable = false;
        this.DeparturePriceStatus = false;
      })
      .catch((error: any) => {
        common.sdCatchErr(error, this.errorsMessage)
        .then((res) => {
          this.errorsMessage = res;
        });
        // flashService.Error('Error', this.errors);
        // console.log(this.errors);
      })
      .finally(() => {
        this.ui.PostLoading = false;
      });
    }

  protected IsValidationTrueRule() {
    if (!this.Pricing.AddMin) {
      Object.assign(this.errors, {
        min_quota: ['The min quota field is required.'],
      });
    }
    if (!this.DiscountType.id) {
      Object.assign(this.errors, {
        discount_type: ['The Discount type field is required.'],
      });
    }
    if (!this.Pricing.AddMax) {
      Object.assign(this.errors, {
        max_quota: ['The max quota field is required.'],
      });
    }
    if (!this.Pricing.AddDiscount) {
      Object.assign(this.errors, {
        discount_percent: ['The discount field is required.'],
      });
    }
    // if (this.Pricing.AddMax && this.Pricing.AddMin) {
    //  if (this.Pricing.AddMax < this.Pricing.AddMin) {
    //   Object.assign(this.errors, {
    //     max_quota: ['The max quota must be greater than min quota.'],
    //   });
    // }
    // }
    // if ((this.Pricing.AddMin) >= (this.Pricing.AddMax)) {
    //   Object.assign(this.errors, {
    //     max_quota: ['The max quota must be greater than min quota.'],
    //   });
    // }
    if (common.notEmpty(this.errors)) {
      this.isError = true;
      return false;
    } else {
      return true;
    }
  }

  protected selectedToDelete(index: any, price: any) {
    this.SelectedIndexDelete = price.id;
    this.SelectedIndex = index;
    // console.log(this.SelectedIndexDelete);
  }
  protected DeletePricing() {
    this.errors = {};
    this.errorsMessage = {};
    this.isError = false;
    // console.log(index, price);
    // price.IsActive = false;
    let data = {
      departure_id: this.$route.query.id,
      id: this.SelectedIndexDelete,
    };
    this.ui.PostLoading = true;
    trekService
      .deletePriceDeparture(data)
      .then((res: any) => {
        flashService.Success('Pricing Rule Deleted', res.data.message);
        this.$delete(this.TrekDeparturePricingRule, this.SelectedIndex);
        this.errors = {};
        this.isError = false;
        this.ui.PostLoading = false;
        // this.Message = res.data.message;
        this.errorsMessage = '';
      })
      .catch((error: any) => {
        // alert();
        this.isError = true;
        common.sdCatchErr(error, this.errorsMessage)
        .then((res) => {
          this.errorsMessage = res;
        });
        // console.log(error);
        flashService.Error('Error', 'Error while deleting Pricing Rule');
      })
      .finally(() => {
        this.ui.PostLoading = false;
      });
  }
  protected SavePricing(index: any, price: any) {
    this.errors = {};
    this.errorsMessage = {};
    this.isError = false;

    if (!this.IsValidationTrueEdit()) {
      return;
    }
    let data = {
      departure_id: this.$route.query.id,
      id: this.EditPrice.id,
      min_quota: Number(this.EditPrice.AddMin),
      max_quota: Number(this.EditPrice.AddMax),
      discount: Number(this.EditPrice.AddDiscount),
      discount_type: this.DiscountType.id,
    };
    this.ui.EditPostLoading = true;
    trekService
      .editPriceDeparture(data)
      .then((res: any) => {
        console.log(res.data.data);
        // this.Message = res.data.message;
        flashService.Success('Pricing Rule', res.data.message);
        this.$set(this.TrekDeparturePricingRule, this.EditPrice.index, res.data.data);
        this.errors = {};
        this.isError = false;
        price.IsActive = false;
        this.EditPrice.EditDisabled = false;
      })
      .catch((error: any) => {
        common.sdCatchErr(error, this.errorsMessage)
        .then((res) => {
          this.errorsMessage = res;
        });
      })
      .finally(() => {
        this.ui.EditPostLoading = false;
      });
  }
  protected IsValidationTrueEdit() {
    if (!this.EditPrice.AddMin) {
      Object.assign(this.errors, {
        edit_min_quota: ['The min quota field is required.'],
      });
    }
    if (!this.EditPrice.AddMax) {
      Object.assign(this.errors, {
        edit_max_quota: ['The max quota field is required.'],
      });
    }
    if (!this.EditPrice.AddDiscount) {
      Object.assign(this.errors, {
        edit_discount_percent: ['The discount percent field is required.'],
      });
    }
    if (!this.DiscountType.id) {
      Object.assign(this.errors, {
        discount_type: ['The Discount type field is required.'],
      });
    }
    // if (this.EditPrice.AddMin >= this.EditPrice.AddMax) {
    //   Object.assign(this.errors, {
    //     edit_max_quota: ['The max quota must be greater than min quota.'],
    //   });
    // }
    if (common.notEmpty(this.errors)) {
      this.isError = true;
      return false;
    } else {
      return true;
    }
  }
  protected CancelPricing(index: any, price: any) {
    price.IsActive = false;
    this.errors = {};
    this.isError = false;
    this.EditPrice.EditDisabled = false;
  }
  protected EditPricing( index: any, price: any) {
    this.errors = {};
    this.isError = false;
    console.log(price);
    price.IsActive = true;
    this.EditPrice.index = index;
    this.EditPrice.EditDisabled = true;
    this.EditPrice.id = price.id;
    this.EditPrice.AddMin = price.min_quota;
    this.EditPrice.AddMax = price.max_quota;
    if (price.discount_percent) {
      this.EditPrice.AddDiscount = price.discount_percent;
    } else {
      this.EditPrice.AddDiscount = price.discount_price;
    }
  }

  protected showAddDestination() {
    this.StatusDeparture = true;
  }
  protected destinationPricingRule() {
    // alert();
    this.AddDestinationStatus = true;
    this.StatusDeparture = false;
    // this.cancelPricingRule();
  }
  protected cancelPricingRule() {
    // alert();
    // this.DeparturePriceStatus = false;
    this.AddDestinationStatus = false;
    this.StatusDeparture = false;
    this.DeparturePriceStatusDisable = false;
  }
  protected cancelOption(){
    console.log('Hello');
  }
}
