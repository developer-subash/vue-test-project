import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from '@/Pages/Admin/Modules/ManagePackage/tab/General/PricingRule/Views/price-rule.html';
import { trekService } from '@/Pages/Admin/Modules/ManagePackage/Services/Trekservice.ts';
import { common } from '@/Pages/Admin/Modules/Common/Services/Common';
import GeneralStore from '@/Pages/Admin/Modules/ManagePackage/Store/General';
import ValidationError from '@/Pages/Admin/Modules/Common/Controllers/ValidationError';

import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

import { flashService } from '@/Pages/Admin/Modules/Common/Services/FlashMessage/FlashService';

@WithRender
@Component({
  components: {
    PulseLoader,
    'validation-error': ValidationError,
  },
})
export default class PriceRule extends Vue {
  protected ui: any = {};
  protected errors: any = {};
  protected errorsMessage: any = {};
  protected errorsModal: any = {};
  protected isError: boolean = false;
  protected DiscountTypeStatus: boolean = false;
  protected Pricing: any = {};
  protected EditPrice: any = {};
  protected IsActive: boolean = false;
  protected disableAddingPrice: boolean = false;
  protected Message: any = {};
  protected PricingList: any = [];
  protected SelectedIndexDelete: any = {};
  protected SelectedIndex: any = {};
  protected DiscountType: any = {};
  protected DiscountTypeTitle: any = {};
  protected DiscountTitle: any = {};
  protected DiscountPlaceholder: any = {};
  protected AddDestinationStatus: boolean = false;
  protected RequestDurationList: any = [ {id: 'percent', name: 'Percentage (%)'},
                                          {id: 'flat', name: 'Flat'}];

  constructor() {
    super();
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
    this.errors = {};
    this.isError = false;
    this.errorsMessage = '';
    this.Pricing.AddMin = '';
    this.Pricing.AddMax = '';
    this.Pricing.AddDiscount = '';
  }

  public mounted(this: any) {
    alert();
    this.flashMessage.show({status: 'error', title: 'Error Message Title', message: 'Oh, you broke my heart! Shame on you!'})

    this.setDefaultDiscountType();
    this.GetPricingList();
  }
  public setDefaultDiscountType() {
    this.DiscountType = {id: 'percent', name: 'Percentage (%)'};
    this.changeDiscountType();
  }

  // get Pricing Rules List
  public async GetPricingList() {
    this.ui.IsLoading = true;
    let data = {
      trek_id: this.$route.query.id,
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
        this.PricingList = res.data.data.trek_pricing_rule ? res.data.data.trek_pricing_rule : [];
        console.log(this.PricingList);
        if (!this.PricingList.length) {
            this.DiscountTypeStatus = true;
        }
      })
      .catch((error: any) => {
        this.errors = error;
      })
      .finally(() => {
        this.ui.IsLoading = false;
      });
  }

  public preventNonNumericalInput(event: any) {
    common.preventNonNumericalInput(event);
  }
  public selectDiscountType() {
    $("#informOperator").modal("show");
  }

  public changeDiscountType() {
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
    this.GetPricingList();

  }
  public hideModalSegment() {
    $("#informOperator").modal("hide");
    $(".modal-backdrop").remove();
  }

  public AddPricing() {

    this.errors = {};
    this.isError = false;
    if (!this.IsValidationTrue()) {
      return;
    }
    let data = {
      trek_id: this.$route.query.id,
      min_quota: this.Pricing.AddMin,
      max_quota: this.Pricing.AddMax,
      discount: this.Pricing.AddDiscount,
      discount_type: this.DiscountType.id,
    };
    // console.log(data);
    this.ui.PostLoading = true;
    this.disableAddingPrice = true;
    trekService
      .addPricing(data)
      .then((res: any) => {
        this.PricingList.push(res.data.data);
        // this.PricingList.unshift(res.data.data);
        // this.PricingList.unshift({...res.data.data});
        // Object.assign(this.PricingList, res.data.data);
        // this.PricingList(Object.assign({}, this.PricingList));

        flashService.Success('Pricing Rule Added', res.data.message);
        // this.Message.Add = res.data.message
        // console.log("Response check", res.data.data);
        this.GetPricingList();
        this.disableAddingPrice = false;
        // Object.assign(res.data.data, { IsActive: false});
        this.hideModal();
        this.ui.PostLoading = false;
        // alert("inside the then");
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
  if (this.DiscountType.id === 'percent') {
    if (this.Pricing.AddDiscount >= 100) {
      Object.assign(this.errors, {
        discount_percent: ['The discount field must be less than 100 %'],
      });
    }
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
    if (this.PricingList) {
      let count = 0;
    //   // if (this.DiscountType.id === 'percent') {
    //     // if (this.EditPrice.AddDiscount >= 100) {
    //     //       Object.assign(this.errors, {
    //     //         edit_discount_percent: ['The discount field must be less than 100 %'],
    //     //       });
    //     // }
    //   // if {
      this.PricingList.forEach((item: any) => {
            // count++;
            if (!this.EditPrice.AddDiscount) {
              Object.assign(this.errors, {
                edit_discount_percent: ['The discount percent field is required.'],
              });
            }
        });
    //     // }
    // }
    }
    // if (this.DiscountType.id === 'percent') {
    //   if (this.EditPrice.AddDiscount >= 100) {
    //     Object.assign(this.errors, {
    //       edit_discount_percent: ['The discount field must be less than 100 %'],
    //     });
    //   }
    // }
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
    console.log("Check index", price.id);
    console.log("HERE ID",this.EditPrice.id);
    // console.log("INDEX VAL",this.EditPrice.index);
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
