import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from '@/Pages/Admin/Modules/ManagePackage/tab/General/general-tab.html';
import GeneralModule from '@/Pages/Admin/Modules/ManagePackage/Store/General';


@WithRender
@Component
export default class GeneralTab extends Vue {
  protected ui: any = {};
  protected errors: any = {};
  protected isError: boolean = false;
  constructor() {
    super();
    this.ui.Isloading = false;
  }
  public redirectToGeneral() {
    this.$router.push({
      name: 'create-generaltab-trek-general',
      query: {
        id: this.$route.query.id,
      },
    });
  }
  public redirectToPricingRule() {
    this.$router.push({
      name: 'create-generaltab-business-package-trek-pricing-rule',
      query: {
        id: this.$route.query.id,
      },
    });
  }
  public redirectToPriceDuration() {
    this.$router.push({
      name: 'create-generaltab-business-package-trek-priceduration',
      query: {
        id: this.$route.query.id,
      },
    });
  }
  public redirectToDestinations() {
    this.$router.push({
      name: 'create-generaltab-business-package-trek-destinations',
      query: {
        id: this.$route.query.id,
      },
    });
  }
  public redirectToHighlights() {
    this.$router.push({
      name: 'create-generaltab-business-package-trek-highlights',
      query: {
        id: this.$route.query.id,
      },
    });
  }
  public redirectToImportantNotes() {
    this.$router.push({
      name: 'create-generaltab-business-package-trek-notes',
      query: {
        id: this.$route.query.id,
      },
    });
  }
  public mounted() {
    this.GetAllIcons();
  }
  public GetAllIcons() {
    this.ui.IsLoading = true;
    GeneralModule.GetIconsList()
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
}
