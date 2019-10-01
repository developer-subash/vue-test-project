import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from '@/Pages/Admin/Modules/ManageDeparture/Views/add-departure.html';

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
export default class AddDeparture extends Vue {
  protected ui: any = {};
  protected errors: any = {};
  protected errorsMessage: any = {};
  protected errorsModal: any = {};
  protected errorsEdit: any = {};
  protected errorsSave: any = {};
  protected isError: boolean = false;
  protected ButtonStatus: boolean = false;
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
  protected PriceDisable: boolean = true;
  protected DiscountType: any = {};
  protected DiscountTypeTitle: any = {};
  protected DiscountPlaceholder: any = {};
  protected RequestDurationList: any = [ {id: 'percent', name: 'Percentage (%)'},
                                          {id: 'flat', name: 'Flat'}];

  protected Pricing: any = {};
  protected EditPrice: any = {};
  protected IsActive: boolean = false;
  protected PricingList: any = {};
  protected SelectedIndexDelete: any = {};
  protected SelectedIndex: any = {};
  protected DiscountTitle: any = {};
  protected AddDestinationStatus: boolean = false;


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


    this.EditSelectedDeparture.StartDate = '';
    this.EditSelectedDeparture.EndDate = '';
    this.EditSelectedDeparture.Time = '';
    this.EditSelectedDeparture.MinQuota = '';
    this.EditSelectedDeparture.MaxQuota = '';
    this.EditSelectedDeparture.Season = '';
    this.EditSelectedDeparture.Id = '';
    this.EditSelectedDeparture.Index = '';
    this.EditSelectedDeparture.Trek = '';
    this.EditSelectedDeparture.Title = '';
    this.EditSelectedDeparture.Price = '';

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
    this.GetTrekList();
    this.setDefaultDiscountType();
    this.GetPricingList();
  }
  public priceChange() {
    // alert();
    let tempPrice = 0;
    // console.log(this.Departure.Price);
    if (this.Departure.CheckPrice === true) {
      tempPrice = this.DepartureList.base_price;
      this.PriceDisable = false;
      // this.Departure.CheckPrice = this.DepartureList.base_price;
      // console.log("inside if", tempPrice);
      // console.log("inside if price", this.Departure.Price);
    } else {
      // tempPrice = this.Departure.CheckPrice;
      this.Departure.Price = this.DepartureList.base_price;
      this.PriceDisable = true;
      // console.log("inside else", this.DepartureList.base_price);
    }
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
              // this.TrekStatusDisable = true;
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
  public getTrekPrice() {
    this.ui.IsLoading = true;
    if (this.DiscountType.id === 'percent') {
      this.DiscountTypeTitle = 'Discount percent(%)';
      this.DiscountPlaceholder = '%';
    } else {
      this.DiscountTypeTitle = 'flat';
      this.DiscountPlaceholder = 'Amount';
    }
    // console.log(this.GetTrek);
    this.Id = 0;
    if (this.$route.query.id) {
      this.Id = this.$route.query.id;
      // this.TrekStatusDisable = true;
      // this.GetTrek = true;
    } else {
      this.Id = this.Departure.Trek.id ? this.Departure.Trek.id : '';
    }
    let data = {
      trek_id: this.Id,
      discount_type: this.DiscountType.id,
    };
    console.log(data);
    trekService
      .trekRetrievePrice(data)
      .then((res: any) => {
        this.DepartureList = res.data.data;
        console.log("hello", this.DepartureList);
        console.log("Base Price", this.DepartureList.base_price);
        this.Departure.Price = this.DepartureList.base_price;
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
  public preventNonNumericalInput(event: any) {
    common.preventNonNumericalInput(event);
  }

  protected CreateDeparture() {
    this.isError = false;
    this.errors = {};
    this.Id = 0;
    if (this.$route.query.id) {
      this.Id = this.$route.query.id;
      this.TrekStatusDisable = true;
    } else {
      this.Id = this.Departure.Trek.id ? this.Departure.Trek.id : '';
    }
    let priceStatus = '0';
    if (this.Departure.CheckPrice === true) {
      priceStatus = '1';
    } else {
      priceStatus = '0';
    }
    // alert();
    this.ButtonStatus = true;
    if (!this.IsValidationTrue()) return;
    // alert();
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
      trek_id: Number(this.Id),
      start_date: this.StartDate,
      end_date: this.EndDate,
      start_time: this.Time,
      min_quota: this.Departure.MinQuota,
      max_quota: this.Departure.MaxQuota,
      season_id: this.Departure.Season.id,
      price : this.Departure.Price,
      has_departure_price: priceStatus,
    };
    // console.log(payLoad);
    this.ui.PostLoading = true;
    trekService
    .addDeparture(data)
    .then((res: any) => {
      console.log(res.data.data);
      // this.DepartureList.push(res.data.data);
      flashService.Success('Departure', 'A Departure are saved');
      // this.Message = res.data.message;
      this.hideDepartureModal();
      this.$router.push({
        name: 'business-manage-departure-detail',
        query: {
          id: res.data.data.id,
        },
      });
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

  protected IsValidationTrue() {
    if (!this.Departure.Trek) {
        Object.assign(this.errors, { trek: ['The trek field is required.'] });
    }
    if (!this.Departure.Price) {
        Object.assign(this.errors, { price: ['The price field is required.'] });
    }
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
  protected hideDepartureModal() {
    this.errors = {};
    this.isError = false;
    this.Departure.StartDate = '';
    this.Departure.EndDate = '';
    this.Departure.Time = '';
    this.Departure.MinQuota = '';
    this.Departure.MaxQuota = '';
    this.Departure.Season = '';
    this.Departure.Trek = '';
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

  // get Pricing Rules List
  protected async GetPricingList() {
    this.ui.IsLoading = true;
    let data = {
      trek_id: '1',
      // trek_id: this.$route.query.id,
      discount_type: this.DiscountType.id,
    };
    trekService
      .pricingList(data)
      .then((res: any) => {
        // console.log(res.data.data);
        this.Pricing.BasePrice = res.data.data.base_price;
        // console.log(res.data.data.trek_pricing_rule);
        res.data.data.trek_pricing_rule.filter((price: any, index: number) => {
          price.IsActive = false;
          // console.log(this.Pricing.List);
        });
        this.PricingList = res.data.data.trek_pricing_rule;
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
      this.DiscountTitle = 'Percentage (%)';
    } else {
      this.DiscountTypeTitle = 'Flat';
      this.DiscountPlaceholder = 'Amount';
      this.DiscountTitle = 'Flat';
    }
    // post the discount type
    this.ui.PostLoading = true;
    let data = {
      discount_type: this.DiscountType.id,
    };
    console.log(data);
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
    this.GetPricingList();

  }
  protected hideModalSegment() {
    $("#informOperator").modal("hide");
    $(".modal-backdrop").remove();
  }

  protected AddPricing() {

    this.errors = {};
    this.isError = false;
    // if (!this.IsValidationTrueRule()) {
    //   return;
    // }
    let data = {
      // trek_id: this.Departure.Trek.id,
      trek_id: '1',
      min_quota: this.Pricing.AddMin,
      max_quota: this.Pricing.AddMax,
      discount: this.Pricing.AddDiscount,
      discount_type: this.DiscountType.id,
    };
    console.log(data);
    this.ui.PostLoading = true;
    trekService
      .addPricing(data)
      .then((res: any) => {
        flashService.Success('Pricing Rule Added', res.data.message);
        // this.Message.Add = res.data.message;
        Object.assign(res.data.data, { IsActive: false});
        this.PricingList.unshift(res.data.data);
        this.hideModalRule();
        this.ui.PostLoading = false;
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
    if ((this.Pricing.AddMin) >= (this.Pricing.AddMax)) {
      Object.assign(this.errors, {
        max_quota: ['The max quota must be greater than min quota.'],
      });
    }
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
      trek_id: this.$route.query.id,
      id: this.SelectedIndexDelete,
    };
    this.ui.PostLoading = true;
    trekService
      .deletePrice(data)
      .then((res: any) => {
        flashService.Success('Pricing Rule Deleted', res.data.message);
        this.$delete(this.PricingList, this.SelectedIndex);
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
      trek_id: this.$route.query.id,
      id: this.EditPrice.id,
      min_quota: Number(this.EditPrice.AddMin),
      max_quota: Number(this.EditPrice.AddMax),
      discount: Number(this.EditPrice.AddDiscount),
      discount_type: this.DiscountType.id,
    };
    this.ui.EditPostLoading = true;
    trekService
      .editPricing(data)
      .then((res: any) => {
        // console.log(res.data.data);
        // this.Message = res.data.message;
        flashService.Success('Pricing Rule', res.data.message);
        this.$set(this.PricingList, this.EditPrice.index, res.data.data);
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
    // console.log(price);
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
    this.AddDestinationStatus = true;
  }
}
