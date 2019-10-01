import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from '@/Pages/Admin/Modules/ManagePackage/tab/General/PriceDuration/Views/price-duration.html';
import GeneralModule from '@/Pages/Admin/Modules/ManagePackage/Store/General';

import { common } from '@/Pages/Admin/Modules/Common/Services/Common';
import { trekService } from '@/Pages/Admin/Modules/ManagePackage/Services/Trekservice';
import ValidationError from '@/Pages/Admin/Modules/Common/Controllers/ValidationError';

import { flashService } from '@/Pages/Admin/Modules/Common/Services/FlashMessage/FlashService';

@WithRender
@Component({
  components: {
    'validation-error': ValidationError,
  }
})
export default class PriceDuration extends Vue {
  protected ui: any = {};
  protected errors: any = {};
  protected errorsMessage: any = {};
  protected isError: boolean = false;
  protected PriceData: any = {};
  protected PriceDurationList: any = {};
  protected TempData: any = {};
  protected TempSeason: any = {};


  protected ButtonStatus: boolean = false;

  constructor() {
    super();
    this.ui.IsLoading = false;
    this.ui.PostLoading = false;

    this.PriceData.Season = [];
    this.PriceData.Min = '';
    this.PriceData.Max = '';
    this.PriceData.MinAge = '';
    this.PriceData.MaxAge = '';
    this.PriceData.Nights = '';
    this.PriceData.Days = '';
    this.PriceData.PricingBasis = '';
    this.PriceData.Price = '';
  }
  public mounted() {
    this.GetPriceDuration();
    this.GetALLPricingBasis();
    this.GetAllSeasons();
  }
  public GetPriceDuration() {
    this.ui.IsLoading = true;
    let data = {
      trek_id: this.$route.query.id,
    };
    trekService.getPriceDuration(data)
    .then((res: any) => {
      // this.PriceData.Season.forEach((item: any) => {
      //   array.push(item.id);
      // });
      // console.log("Price Duration Tab", res.data.data);
      this.PriceDurationList = res.data.data;
      this.PriceData.Price = this.PriceDurationList.base_price;
      this.PriceData.Min = this.PriceDurationList.min_people;
      this.PriceData.Max = this.PriceDurationList.max_people;
      this.PriceData.MinAge = this.PriceDurationList.min_age;
      this.PriceData.MaxAge = this.PriceDurationList.max_age;
      this.PriceData.Nights = this.PriceDurationList.duration_nights;
      this.PriceData.Days = this.PriceDurationList.duration_days;
      this.PriceData.PricingBasis = res.data.data.pricing_basis;
      // this.PriceData.Season = this.PriceDurationList.trek_seasons.forEach((item:any) =>{
      //   array.push(item.seasons);
      // });
      this.PriceData.Season = this.PriceDurationList.trek_seasons;
      let array: Array<number> = [];
      this.PriceData.Season.forEach((item: any) => {
      array.push(item.seasons);
      });
      // console.log(array);
      this.TempData = array;
      // console.log(this.PriceData.Season);
      
      // this.MapData = res.data.data;
    })
    .catch((error: any) => {
        this.errors = error;
    })
    .finally(() => {
        this.ui.IsLoading = false;
    });
  }
  public GetALLPricingBasis() {
    this.ui.IsLoading = true;
    GeneralModule.GetPricingBasis()
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
  get getPricingBasis() {
    return GeneralModule.PricingBasis;
  }
  public emptyModal() {
    this.PriceData.Season = [];
    this.PriceData.test = [];
    this.PriceData.Min = '';
    this.PriceData.Max = '';
    this.PriceData.MinAge = '';
    this.PriceData.MaxAge = '';
    this.PriceData.Nights = '';
    this.PriceData.Days = '';
    this.PriceData.PricingBasis = '';
    this.PriceData.Price = '';
  }

  public GetAllSeasons() {
    this.ui.IsLoading = true;
    GeneralModule.GetSeasons()
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

  protected createPricingRule() {
    this.errors = {};
    this.errorsMessage = {};
    this.isError = false;

    if (!this.IsValidationTrue()) {
      return;
    }

    let array: Array<number> = [];
    this.TempData.forEach((item: any) => {
      array.push(item.id);
    });
    this.errors = {};
    this.isError = false;

    let data = {
      trek_id: Number(this.$route.query.id),
      seasons: array,
      // seasons: this.PriceData.test,
      min_people: Number(this.PriceData.Min),
      max_people: Number(this.PriceData.Max),
      min_age: Number(this.PriceData.MinAge),
      max_age: Number(this.PriceData.MaxAge),
      duration_nights: Number(this.PriceData.Nights),
      duration_days: Number(this.PriceData.Days),
      // pricing_basis_id: this.PriceData.PricingBasis.id,
      // base_price: Number(this.PriceData.Price),
    };
    // console.log("Save Data Here",data);
    // console.log('from Price Duration', this.PriceData.Season);
    this.ui.PostLoading = true;
    trekService
      .editPrice(data)
      .then((res: any) => {
        // console.log(res.data.data)
        // this.PriceData.Price = res.data.data.base_price;
        this.PriceData.Min = res.data.data.min_people;
        this.PriceData.Max = res.data.data.max_people;
        this.PriceData.MinAge = res.data.data.min_age;
        this.PriceData.MaxAge = res.data.data.max_age;
        this.PriceData.Nights = res.data.data.duration_nights;
        this.PriceData.Days = res.data.data.duration_days;
        // this.PriceData.PricingBasis = res.data.data.pricing_basis;
        this.PriceData.Season = res.data.data.trek_seasons;
        // // this.GetPriceDuration();
        this.ButtonStatus = false;
        flashService.Success('Price Duration Saved', res.data.message);
        this.errors = {};
        this.isError = false;
        // console.log('response', res.data.data);
        // this.Message = res.data.message;
        // this.emptyModal();
        // console.log(res.data.data);
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
  protected IsValidationTrue() {
    // if (!this.PriceData.PricingBasis) {
    //   Object.assign(this.errors, {
    //     pricing_basis_id: ['The price base field is required.'],
    //   });
    // }
    // if (!this.PriceData.Price) {
    //   Object.assign(this.errors, {
    //     base_price: ['The base price field is required.'],
    //   });
    // }
    if (!this.PriceData.MaxAge) {
      Object.assign(this.errors, {
        max_age: ['The max age field is required.'],
      });
    }
    if ((this.PriceData.MinAge) >= (this.PriceData.MaxAge)) {
      Object.assign(this.errors, {
        max_age: [`The maximum age must be greater than minimum age.`],
      });
    }
    if (!this.PriceData.MinAge) {
      Object.assign(this.errors, {
        min_age: ['The min age field is required.'],
      });
    }
    if (!this.PriceData.Max) {
      Object.assign(this.errors, {
        max_people: ['The max people field is required.'],
      });
    }
    if ((this.PriceData.Min) >= (this.PriceData.Max)) {
      Object.assign(this.errors, {
        max_people: [`The max people must be greater than minimum people.`],
      });
    }
    if ((this.PriceData.Nights) >= (this.PriceData.Days)) {
      Object.assign(this.errors, {
        max_days: [`The day must be greater tthan specified night.`],
      });
    }
    if (!this.PriceData.Min) {
      Object.assign(this.errors, {
        min_people: ['The min people field is required.'],
      });
    }
    if (common.notEmpty(this.errors)) {
      this.isError = true;
      return false;
    } else {
      return true;
    }
  }
  protected editPricingRule() {
    // this.PriceData.Season = this.PriceDurationList.trek_seasons;
    // let array: Array<number> = [];
    // this.PriceData.Season.forEach((item: any) => {
    //   array.push(item.name);
    // });
    // this.TempSeason = array;
    // console.log("Edit Data here", this.PriceDurationList.trek_seasons);
    this.ButtonStatus = true;
  }
  protected cancelPricingRule() {
    this.errors = {};
    this.isError = false;
    this.ButtonStatus = false;
    // this.GetPriceDuration();
    // this.PriceData.Price = this.PriceDurationList.base_price;
    this.PriceData.Min = this.PriceDurationList.min_people;
    this.PriceData.Max = this.PriceDurationList.max_people;
    this.PriceData.MinAge = this.PriceDurationList.min_age;
    this.PriceData.MaxAge = this.PriceDurationList.max_age;
    this.PriceData.Nights = this.PriceDurationList.duration_nights;
    this.PriceData.Days = this.PriceDurationList.duration_days;
    // this.PriceData.PricingBasis = this.PriceDurationList.pricing_basis;
    this.PriceData.Season = this.PriceDurationList.trek_seasons;
      let array: Array<number> = [];
      this.PriceData.Season.forEach((item: any) => {
      array.push(item.seasons);
      });
      console.log(array);
      this.TempData = array;
    
  }
}
