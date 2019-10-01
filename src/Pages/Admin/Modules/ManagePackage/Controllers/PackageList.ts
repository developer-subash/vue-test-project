import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from '@/Pages/Admin/Modules/ManagePackage/Views/package-list.html';
import Trek from '@/Pages/Admin/Modules/ManagePackage/Store/Trek';
import Pager from '@/Pages/Admin/Modules/Common/Controllers/Pager';
import Spinner from '@/Pages/Admin/Modules/Common/Controllers/Spinner';
import { common } from '@/Pages/Admin/Modules/Common/Services/Common';
import ValidationError from '@/Pages/Admin/Modules/Common/Controllers/ValidationError';
import GeneralStore from '@/Pages/Admin/Modules/ManagePackage/Store/General';

import { trekService } from '@/Pages/Admin/Modules/ManagePackage/Services/Trekservice';


import { flashService } from '@/Pages/Admin/Modules/Common/Services/FlashMessage/FlashService';


@WithRender
@Component({
    components: {
        Pager,
        Spinner,
        'validation-error': ValidationError,
    },
})
export default class PackageList extends Vue {
    protected Title: string = '';
    protected Destination: any = {};
    protected Price: any = '';
    protected paging: any = {};
    protected PackageLists: any = {};
    protected ButtonStatus: boolean = false;

    protected IsLoading: boolean = false;
    protected PostLoading: boolean = false;
    protected ui: any = {};
    protected errors: any = {};
    protected errorsModal: any = {};
    protected errorsPackage: any = {};
    protected isError: boolean = false;
    protected RequestDurationList: any = [ {id: '1-7', name: '1 -7 Days'},
                                          {id: '7-15', name: '7 - 15 Days'},
                                          {id: '15-45', name: '15 - 45 Days'}];

    protected RequestBasePriceList: any = [ {id: '1-500', name: '$1 - $500'},
                                          {id: '500-1000', name: '$500 - $1000'},
                                          {id: '1000-1500', name: '$1000 - $1500'},
                                          {id: '1500-2000', name: '$1500 - $2000'}];

    protected RequestTitle: string = '';
    protected RequestTourType: any = '';
    protected RequestDifficultyLevel: any = '';
    protected RequestPricingBasis: any = '';
    protected RequestDuration: any = '';
    protected RequestBasePrice: any = '';
    protected DestinationMasterData: any = [];

    constructor() {
        super();
        this.paging.current_page = 1;
        this.paging.last_page = 0;
        this.paging.per_page = 0;
    }
    public hideModal() {
      this.Title = '';
    }
    public beforeMount() {
      this.GetAllTourTypeList();
      this.GetALLDifficultyLevelList();
      this.GetALLPricingBasis();
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
    public GetALLDifficultyLevelList() {
      this.ui.IsLoading = true;
      GeneralStore.GetDifficultyLevelList()
      .then((res: any) =>{
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
    public mounted() {
        this.CallPackagesList();
        this.getALLMasterDestinationList();
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

    protected CallPackagesList() {
      // alert();
      this.errorsPackage = {};
      this.PackageLists = {};
      this.IsLoading = true;
      let data = {
        paging: {
          current_page :	this.paging.current_page,
          last_page: this.paging.last_page,
          per_page : this.paging.per_page,
        },
        search: {
          title: this.RequestTitle,
          tour_type_id: this.RequestTourType,
          difficulty_level_id: this.RequestDifficultyLevel,
          pricing_basis_id : this.RequestPricingBasis,
          duration: this.RequestDuration ? this.RequestDuration.id : '',
          base_price : this.RequestBasePrice ? this.RequestBasePrice.id : '',
        },
        sorting: {
          sort_by:"title",
          sort_order:"desc",
      },
    };
      trekService.searchTrekByFilter(data)
      .then((res: any) => {
        this.PackageLists = res.data.data.data;
        // console.log("Package response", res.data.data)
        this.paging.last_page = res.data.data.last_page;
        this.paging.per_page = res.data.data.per_page;
       })
      .catch((error: any) => {
        common.sdCatchErr(error, this.errorsPackage).then(res => {
          this.errorsPackage = res;
        });
      })
      .finally(() => {
          this.IsLoading = false;
      });
  }
  // clear all Filter
  public clearAllFilter() {
    // alert('clear');
    this.RequestTitle = '';
    this.RequestTourType = '';
    this.RequestDifficultyLevel = '';
    this.RequestPricingBasis = '';
    this.RequestDuration = '';
    this.RequestBasePrice = '';
    this.CallPackagesList();
  }
  //   public CallPackagesList() {
  //     this.IsLoading = true;
  //     let data = {
  //       current_page: this.paging.current_page,
  //     };
  //     trekService.PackageList(data)
  //     .then((res: any) =>{
  //       this.PackageLists = res.data.data.data;
  //       // console.log("Package response", res.data.data)
  //       this.paging.last_page = res.data.data.last_page;
  //       this.paging.per_page = res.data.data.per_page;
  //      })
  //     .catch((error: any) => {
  //         this.errors = error;
  //     })
  //     .finally(() => {
  //         this.IsLoading = false;
  //     });
  // }
  public packageModal(){
    $("#createPackage").modal("show");
  }
  public hideModalSegment() {
    $("#createPackage").modal("hide");
    $(".modal-backdrop").remove();
    this.Title = "";
    this.errors = {};
    this.isError = false;
  }
  protected preventNonNumericalInput(event: any) {
    common.preventNonNumericalInput(event);
  }

    protected CreateTrek() {
        // alert();
    this.errors = {};
    this.errorsModal = {};
    this.isError = false;
    this.ButtonStatus = true;
    if (!this.IsValidationTrue()) {
      return;
    }
    this.PostLoading = true;
    const data = {
        title: this.Title,
        destination_id: this.Destination.id,
        base_price: Number(this.Price),
    };
    console.log(data);
    Trek.AddTrek(data)
    .then((res: any) => {
            // console.log("add Trek controller", res.data.data.id);
            // console.log("from Vue", res.data.data);
      this.hideModal();
      this.$router.push({
          name: 'create-business-package-trek-generaltab',
          query: {
            id: res.data.data.id,
          },
      });
      flashService.Success('Package Created', 'A new Package Created Successfully');
      this.ButtonStatus = false;
      this.hideModalSegment();
    })
    .catch((error: any) => {
      common.sdCatchErr(error, this.errorsModal).then(res => {
          this.errorsModal = res;
      });
    })
    .finally(() => {
        this.PostLoading = false;
    });
    }
    protected CancelTrek() {
      this.hideModal();
    }
    protected IsValidationTrue() {
    if (!this.Title) {
            Object.assign(this.errors, { title: ['The title field is required.'] });
    }
    if (!this.Destination.id) {
            Object.assign(this.errors, { destination_id: ['The destination field is required.'] });
    }
    if (!this.Price) {
            Object.assign(this.errors, { base_price: ['The price field is required.'] });
    }
    if (common.notEmpty(this.errors)) {
            this.isError = true;
            return false;
    } else {
            return true;
    }
    }

    public deleteModal(){
      $('#delete').modal('show');
    }
    public hidedeleteModal() {
      $('#delete').modal('hide');
      $('.modal-backdrop').remove();
      this.errors = {};
      this.isError = false;
    }
    public onPaging(CurrentPage: number) {
        // alert(CurrentPage);
        this.paging.current_page = CurrentPage;
        // this.PackageLists = {};
        this.CallPackagesList();
    }
      // Edit Tab for the selected Package
      public ManageDeparture(Id: any) {
        this.$router.push({
          name: 'business-manage-departure-trek-list',
          query: {
              id: Id,
            },
      });
    }
      // Edit Tab for the selected Package
      public ViewPackage(Id: any) {
          alert('Package view function in future !!!');
        //   console.log('Package view function in future of id: ', Id);
      }
      // Edit Tab for the selected Package
      public EditPackage(Id: any) {
          this.$router.push({
            name: 'create-business-package-trek-booking-view',
            query: {
                id: Id,
              },
        });
      }
      public TrekBooking(Id: any) {
        // alert();
          this.$router.push({
            name: 'create-business-package-trek-booking',
            query: {
                id: Id,
              },
        });
      }
    public deletePackage() {
      this.hidedeleteModal();
        alert('Package delete function in future !!!');
    }
    public canceldeletePackage() {
      this.hidedeleteModal();
        // alert('Cancel !!!');
    }



}
