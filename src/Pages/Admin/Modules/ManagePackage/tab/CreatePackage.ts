import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import GeneralModule from '@/Pages/Admin/Modules/ManagePackage/Store/General';


import WithRender from '@/Pages/Admin/Modules/ManagePackage/tab/create-package.html';

@WithRender
@Component
export default class CreatePackage extends Vue {
  protected ui: any = {};
  protected errors: any = {};

  // @Prop(Object)
  // GeneralData!: any;



  constructor() {
    super();
    this.redirectToGeneral();
  }
  public mounted() {
    this.GetGeneralData();
  }

  public GetGeneralData() {
    this.ui.IsLoading = true;
    let data = {
      trek_id: this.$route.query.id,
    };
    GeneralModule.GetPackageTitle(data)
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
  get getPackagetitle() {
    return GeneralModule.GeneralTabBasic;
  }

  public redirectToGeneral() {
    this.$router.push({
      name: 'create-generaltab-trek-general',
      query: {
        id: this.$route.query.id,
      },
    });
  }
  public redirectToItinerary() {
    this.$router.push({
      name: 'create-business-package-trek-itinerary',
      query: {
        id: this.$route.query.id,
      },
    });
  }
  public redirectToIncludes() {
    this.$router.push({
      name: 'create-business-package-trek-includes',
      query: {
        id: this.$route.query.id,
      },
    });
  }
  public redirectToExcludes() {
    this.$router.push({
      name: 'create-business-package-trek-excludes',
      query: {
        id: this.$route.query.id,
      },
    });
  }
  public redirectToGallery() {
    this.$router.push({
      name: 'create-business-package-trek-gallery',
      query: {
        id: this.$route.query.id,
      },
    });
  }
  public redirectToDepartureSchedule() {
    this.$router.push({
      name: 'create-business-package-trek-departure',
      query: {
        id: this.$route.query.id,
      },
    });
  }
  public redirectToBooking() {
    this.$router.push({
      name: 'create-business-package-trek-booking',
      query: {
        id: this.$route.query.id,
      },
    });
    // alert();
  }
  public redirectToUpcommingDeparture() {
    this.$router.push({
      name: 'create-business-upcomming-departure',
      query: {
        id: this.$route.query.id,
      },
    });
  }
  // public redirectToBooking() {
  //   this.$router.push({
  //     name: 'create-business-package-trek-booking',
  //     query: {
  //       id: this.$route.query.id,
  //     },
  //   });
  // }
  public redirectToGalleryPreBooking() {
    this.$router.push({
      name: 'create-business-package-trek-prebooking',
      query: {
        id: this.$route.query.id,
      },
    });
  }
  public redirectToOfferService() {
    this.$router.push({
      name: 'create-business-package-offer-services',
      query: {
        id: this.$route.query.id,
      },
    });
  }
  public redirectToReviews() {
    this.$router.push({
      name: 'create-business-package-trek-reviews',
      query: {
        id: this.$route.query.id,
      },
    });
  }
   // General tab basic Datas
   get getGeneralTabData() {
    return GeneralModule.GeneralTabBasic;
  }
}
