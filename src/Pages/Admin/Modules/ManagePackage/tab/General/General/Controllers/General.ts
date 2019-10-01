import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import WithRender from "@/Pages/Admin/Modules/ManagePackage/tab/General/General/Views/general.html";
import Spinner from "@/Pages/Admin/Modules/Common/Controllers/Spinner";
import GeneralStore from "@/Pages/Admin/Modules/ManagePackage/Store/General";


import { trekService } from "@/Pages/Admin/Modules/ManagePackage/Services/Trekservice";
import { common } from "@/Pages/Admin/Modules/Common/Services/Common";
import ValidationError from "@/Pages/Admin/Modules/Common/Controllers/ValidationError";

import { flashService } from "@/Pages/Admin/Modules/Common/Services/FlashMessage/FlashService";

// import CreatePackage from '@/Pages/Admin/Modules/ManagePackage/tab/CreatePackage';
// import { General } from '@/Pages/Admin/Modules/ManagePackage/tab/General/General/Controllers/General';
// import { Destinations } from '@/Pages/Admin/Modules/ManagePackage/tab/General/Destinations/Controllers/Destinations';

@WithRender
@Component({
  components: {
    Spinner,
    "validation-error": ValidationError
    // CreatePackage,
  }
})
export default class General extends Vue {
  protected ui: any = {};
  protected errors: any = {};
  protected errorsMessage: any = {};
  protected isError: boolean = false;
  protected Message: any = {};
  protected PreLoadData: any = {};
  protected TempData: any = {};
  protected message: any = {};
  protected DestinationMasterData: any = [];

  protected ButtonStatus: boolean = false;
  protected GeneralList: any = {};
  protected GeneralData: any = {};

  constructor() {
    super();
    this.ui.IsLoading = false;
    this.ui.PostLoading = false;
    this.message = '';

    this.GeneralData.Title = "";
    this.GeneralData.TeaserTitle = "";
    this.GeneralData.TourTypeValue = "";
    this.GeneralData.DifficultyLevelValue = "";
    this.GeneralData.AltitudeInMeter = "";
    this.GeneralData.AltitudeInFeet = "";
    this.GeneralData.Description = "";
    this.GeneralData.Destination = "";
    this.GeneralData.Price = "";
    this.GeneralData.PricingBasis = "";
    // flashService.Success('hello', 'subash');
  }
  public hideModal() {
    this.errors = {};
    this.isError = false;
    // $("#addproduct").modal("hide");
    // //Empty the modal
    this.GeneralData.Title = "";
    this.GeneralData.TeaserTitle = "";
    this.GeneralData.TourTypeValue = "";
    this.GeneralData.DifficultyLevelValue = "";
    this.GeneralData.AltitudeInMeter = "";
    this.GeneralData.AltitudeInFeet = "";
    this.GeneralData.Description = "";
    this.errors.clear();
  }

  public beforeMount() {
    this.GetGeneralData();
    this.GetAllTourTypeList();
    this.GetALLDifficultyLevelList();
    this.getALLMasterDestinationList();
    this.GetGeneral();
    this.GetALLPricingBasis();
  }
  async mounted() {
    // this.message = 'updated';
    // console.log(this.$el.textContent) // 'not updated'
    // await this.$nextTick()
    // console.log(this.$el.textContent) // 'updated'
    // this.GeneralData.Title = this.GeneralList.title;
    // this.GeneralData.TeaserTitle = this.GeneralList.teaser_title;
    // this.GeneralData.TourTypeValue = this.GeneralList.tour_type_id;
    // this.GeneralData.DifficultyLevelValue = this.GeneralList;
    // this.GeneralData.AltitudeInMeter = this.GeneralList;
    // this.GeneralData.AltitudeInFeet = this.GeneralList;
    // this.GeneralData.Description = this.GeneralList;
    // console.log(this.getAllGeneralList);
  }
  public GetALLPricingBasis() {
    this.ui.IsLoading = true;
    GeneralStore.GetPricingBasis()
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
    return GeneralStore.PricingBasis;
  }

  public GetAllTourTypeList() {
    this.ui.IsLoading = true;
    GeneralStore.GetTourTypeList()
      .then((res: any) => {
        // console.log("GetAllTourTypeList", res);
      })
      .catch((error: any) => {
        this.errors = error;
      })
      .finally(() => {
        this.ui.IsLoading = false;
      });
  }
  get getAllTourTypeList() {
    return GeneralStore.TourTypeList;
  }
  public GetGeneralData() {
    this.ui.IsLoading = true;
    let data = {
      trek_id: this.$route.query.id
    };
    GeneralStore.GetPackageTitle(data)
      .then((res: any) => {
        // console.log("GetAllTourTypeList", res);
      })
      .catch((error: any) => {
        this.errors = error;
      })
      .finally(() => {
        this.ui.IsLoading = false;
      });
  }
  get getPackagetitle() {
    return GeneralStore.GeneralTabBasic;
  }

  public GetALLDifficultyLevelList() {
    this.ui.IsLoading = true;
    GeneralStore.GetDifficultyLevelList()
      .then((res: any) => {
        // console.log("GetAllTourTypeList", res);
      })
      .catch((error: any) => {
        this.errors = error;
      })
      .finally(() => {
        this.ui.IsLoading = false;
      });
  }

  get getALLDifficultyLevelList() {
    return GeneralStore.DifficultyLevelList;
  }

  protected async getALLMasterDestinationList() {
    this.ui.IsLoading = true;
    trekService
      .getMasterDestinationList()
      .then((res: any) => {
        res.data.data.filter((destination: any) => {
          destination.IsActive = false;
          // console.log(this.Pricing.List);
        });
        this.DestinationMasterData = res.data.data;
        // console.log(this.DestinationData);
      })
      .catch((error: any) => {
        this.errors = error;
      })
      .finally(() => {
        this.ui.IsLoading = false;
      });
  }

  protected GetGeneral() {
    this.ui.IsLoading = true;
    let data = {
      trek_id: this.$route.query.id,
    };
    trekService
      .getGeneralTabData(data)
      .then((res: any) => {
        // console.log("GetAllGeneralTabData", res.data.data);
        this.GeneralList = res.data.data;
          // console.log(this.GeneralList);
        this.GeneralData.Title = this.GeneralList.title;
        this.GeneralData.TeaserTitle = this.GeneralList.teaser_title;
        this.GeneralData.TourTypeValue = this.GeneralList.tour_type;
        this.GeneralData.DifficultyLevelValue = this.GeneralList.difficulty_level;
        this.GeneralData.AltitudeInMeter = this.GeneralList.altitude_in_meter;
        this.GeneralData.AltitudeInFeet = this.GeneralList.altitude_in_feet;
        this.GeneralData.Description = this.GeneralList.description;
        this.GeneralData.Destination = this.GeneralList.destination;
        this.GeneralData.Price = this.GeneralList.base_price;
        this.GeneralData.PricingBasis = this.GeneralList.pricing_basis;
        // this.MapData = res.data.data;
      
      })
      .catch((error: any) => {
        this.errors = error;
      })
      .finally(() => {
        this.ui.IsLoading = false;
      });
  }

  protected createProduct() {
    this.errors = {};
    this.errorsMessage = {};
    this.isError = false;

    // if (!this.IsValidationTrue()) {
    //   return;
    // }
    let data = {
      trek_id: this.$route.query.id,
      title: this.GeneralData.Title,
      teaser_title: this.GeneralData.TeaserTitle,
      tour_type_id: this.GeneralData.TourTypeValue.id,
      difficulty_level_id: this.GeneralData.DifficultyLevelValue.id,
      altitude_in_meter: this.GeneralData.AltitudeInMeter,
      altitude_in_feet: this.GeneralData.AltitudeInFeet,
      description: this.GeneralData.Description,
      destination_id: this.GeneralData.Destination.id,
      pricing_basis_id: this.GeneralData.PricingBasis.id,
      base_price: this.GeneralData.Price,
    };
    console.log(data);
    this.ui.PostLoading = true;
    trekService
      .PutGeneral(data)
      .then((res: any) => {
        flashService.Success('General Data Saved', res.data.message);
        // this.Message = res.data.message;
        this.ButtonStatus = false;
        this.errors = {};
        this.isError = false;
        // this.hideModal();
        GeneralStore.UpdatePackageTitle(res.data.data);
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
  public preventNonNumericalInput(event: any){
    common.preventNonNumericalInput(event);
  }

  protected ConvertToFeet() {
    this.GeneralData.AltitudeInFeet = common.ConvertToFeet(
      this.GeneralData.AltitudeInMeter,
    );
  }
  protected ConvertToMeter() {
    this.GeneralData.AltitudeInMeter = common.ConvertToMeter(
      this.GeneralData.AltitudeInFeet,
    );
  }

  protected IsValidationTrue() {
    if (!this.GeneralData.Title) {
      Object.assign(this.errors, { title: ["The title field is required."] });
    }
    if (!this.GeneralData.TeaserTitle) {
      Object.assign(this.errors, {
        teaser_title: ["The teaser title field is required."]
      });
    }
    if (!this.GeneralData.TourTypeValue) {
      Object.assign(this.errors, {
        tour_type_id: ["The tour type field is required."]
      });
    }
    if (!this.GeneralData.DifficultyLevelValue) {
      Object.assign(this.errors, {
        difficulty_level_id: ["The difficulty level field is required."]
      });
    }
    if (!this.GeneralData.Description) {
      Object.assign(this.errors, {
        description: ["The description field is required."]
      });
    }
    if (!this.GeneralData.Destination) {
      Object.assign(this.errors, {
        destination_id: ["The destination field is required."]
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
    this.TempData = this.GeneralList;
    console.log(this.TempData);
    // alert();
    this.ButtonStatus = true;
  }
  protected cancelPricingRule() {
    this.ButtonStatus = false;
    // this.hideModal();
    this.errors = {};
    this.isError = false;
    // this.GetGeneral();
    this.GeneralData.Title = this.TempData.title;
    this.GeneralData.TeaserTitle = this.TempData.teaser_title;
    this.GeneralData.TourTypeValue = this.TempData.tour_type;
    this.GeneralData.DifficultyLevelValue = this.TempData.difficulty_level;
    this.GeneralData.AltitudeInMeter = this.TempData.altitude_in_meter;
    this.GeneralData.AltitudeInFeet = this.TempData.altitude_in_feet;
    this.GeneralData.Description = this.TempData.description;
    this.GeneralData.Destination = this.TempData.description;
  }
}
