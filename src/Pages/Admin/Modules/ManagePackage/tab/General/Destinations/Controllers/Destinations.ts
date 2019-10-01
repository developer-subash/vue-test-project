import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from '@/Pages/Admin/Modules/ManagePackage/tab/General/Destinations/Views/destinations.html';
import {trekService} from '@/Pages/Admin/Modules/ManagePackage/Services/Trekservice';
import { common } from '@/Pages/Admin/Modules/Common/Services/Common';
import ValidationError from '@/Pages/Admin/Modules/Common/Controllers/ValidationError';
import GeneralModule from '@/Pages/Admin/Modules/ManagePackage/Store/General';

import { flashService } from '@/Pages/Admin/Modules/Common/Services/FlashMessage/FlashService';



@WithRender
@Component({
  components: {
      'validation-error': ValidationError,
  },
})
export default class Destinations extends Vue {
  protected ui: any = {};
  protected errors: any = {};
  protected errorsMessage: any = {};
  protected errorsModal: any = {};
  protected isError: boolean = false;
  protected StatusSeason: boolean = false;
  protected TempData: any = {};
  protected Destination: any = {};
  protected SelectedDestination: any = {};
  protected DeleteDestination: any = {};
  protected DeleteDestinationIndex: any = {};

  protected DestinationData: any = [];
  protected DestinationMasterData: any = [];
  protected DestinationIndex: any = 0;
  protected DestinationId: any = 0;
  protected list: any = ['Foo', 'Bar', 'Baz'];
  protected el: any = 'body';

  protected UpIndexDestination: any = {};
  protected UpIndex: number = 0;
  protected DownIndexDestination: any = {};
  protected DownIndex: number = 0;
  protected AddDestinationStatus: boolean = false;


  constructor() {
    super();
    this.ui.IsLoading = false;
    this.ui.PostLoading = false;
    this.ui.ArrowIsLoading = false;
    this.ui.ArrowPostLoading = false;

    this.DestinationData.Add = '';
    // this.DestinationData.IconId = '';
    this.DestinationData.Destination = '';
    this.DestinationData.season = '';
  }
  public mounted() {
    this.getAllDestinationList();
    this.getALLMasterDestinationList();
    // this.DestinationData.Destination = this.getAllGeneralList.seasons;
  }
  protected onUpdate(event: any) {
    this.list.splice(event.newIndex, 0, this.list.splice(event.oldIndex, 1)[0]);
  }
  get getAllGeneralList(): any {
    return GeneralModule.GeneralTabBasic;
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
  protected async getAllDestinationList() {
    this.ui.IsLoading = true;
    let data = {
      trek_id: this.$route.query.id,
    };
    trekService
      .getDestinationsList(data)
      .then((res: any) => {
        res.data.data.filter((destination: any) => {
          destination.IsActive = false;
          // console.log(this.Pricing.List);
        });
        this.DestinationData = res.data.data;
        // console.log(this.DestinationData);
      })
      .catch((error: any) => {
        this.errors = error;
      })
      .finally(() => {
        this.ui.IsLoading = false;
      });
  }
  protected deleteDestination(index: any, destination: any){
    // console.log("Hello", destination);
    this.DeleteDestination = destination;
    this.DeleteDestinationIndex = index;
    this.isError = false;
    this.errorsModal = {};
    this.errors = {};
    this.errorsMessage = {};
    $("#delete").modal("show");
  }
  protected hideModalDestination() {
    $("#delete").modal("hide");
    $(".modal-backdrop").remove();
    this.DeleteDestination = '';
    this.DeleteDestinationIndex = '';
    this.errors = {};
    this.isError = false;
    this.errorsModal = {};
  }
  protected DeletePricing() {
    this.errors = {};
    this.isError = false;
    // console.log("Hello", destinaton);
    // console.log("Destination Id :", destinaton);
    let data = {
      trek_id: this.$route.query.id,
      id : this.DeleteDestination.id,
    };
    // console.log(data)
    this.ui.PostLoading = true;
    trekService
      .deleteDestination(data)
      .then((res: any) => {
        flashService.Success('Destination Deleted', 'A Destination Data is Deleted');
        this.$delete(this.DestinationData, this.DeleteDestinationIndex);
        this.hideModalDestination();
      })
      .catch((error: any) => {
        common.sdCatchErr(error, this.errorsModal).then(res => {
          this.errorsModal = res;
        });
      })
      .finally(() => {
      //   this.$router.push({
      //     name: 'create-generaltab-business-package-trek-destinations',
      //     query: {
      //       d: this.$route.query.id,
      //       },
      // });
        this.ui.PostLoading = false;
      });
  }

  protected AddDestination() {
    // alert();
    this.errors = {};
    this.errorsMessage = {};
    this.isError = false;
    if (!this.IsValidationTrue()) {
      return;
    }

    let data = {
      trek_id: this.$route.query.id,
      destination_id : this.DestinationData.Destination.id,
    };
    // console.log(data);
    this.ui.PostLoading = true;
    trekService
      .addDestination(data)
      .then((res: any) => {
        flashService.Success('Destination Saved', 'A Destination Datas are saved');
        this.DestinationData.push(res.data.data);
        this.DestinationData.Destination = '';
        this.getAllDestinationList();
        this.errors = {};
        this.errorsMessage = {};
        this.isError = false;
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
    if (!this.DestinationData.Destination) {
      Object.assign(this.errors, { destination_id: ["The destination field is required."] });
    }
    if (common.notEmpty(this.errors)) {
      this.isError = true;
      return false;
    } else {
      return true;
    }
  }

  protected SavePricing(destination: any) {
    this.errors = {};
    this.isError = false;
    this.errorsMessage = {};
  // console.log(destination);
    if (!this.IsValidationTrueSave()) {
      return;
    }
    let data = {
      trek_id: this.$route.query.id,
      destination_id : this.Destination.id, // new replace Destination in the old selected
      id: this.DestinationId, // Old Selected
    };
    // console.log("Destination Check", this.Destination);
    this.ui.PostLoading = true;
    trekService
      .editDestination(data)
      .then((res: any) => {
        flashService.Success('General Data Edited', 'A Destination Datas are saved');
        this.$set(this.DestinationData, this.DestinationIndex, res.data.data);
        this.getAllDestinationList();
        destination.IsActive = false;
      })
      .catch((error: any) => {
        common.sdCatchErr(error, this.errorsMessage).then(res => {
          this.errorsMessage = res;
        });
        flashService.Error('Error', 'Error while saving Destination Datas');
      })
      .finally(() => {
        this.ui.PostLoading = false;
      });
  }
  protected IsValidationTrueSave() {
    if (!this.Destination) {
      Object.assign(this.errors, { edit_destination_id: ["The destination field is required."] });
    }
    if (common.notEmpty(this.errors)) {
      this.isError = true;
      return false;
    } else {
      return true;
    }
  }
  protected CancelPricing(index: any, destinaton: any) {
    destinaton.IsActive = false;
  }
  protected EditPricing(index: any, destination: any) {
    this.errors = {};
    this.isError = false;
    // console.log(destination);
    destination.IsActive = true;
    this.TempData = destination.destination;
    // console.log(this.TempData);
    // this.Destination.id = destination.id;
    this.Destination = this.TempData;
    this.DestinationId = destination.id;
    // console.log("Destination", this.DestinationId);
    // console.log("Destination ID", this.DestinationId);
  }

  protected moveDestinationUp(index: any, destination: any) {
    // alert("Move Up");
    this.UpIndexDestination = '';
    this.UpIndex = 0;

    this.UpIndexDestination = this.DestinationData[index -1];
    this.UpIndex = index -1;

    this.errors = {};
    this.isError = false;
    this.errorsMessage = {};
  // console.log(destination);
    // if (!this.IsValidationTrueSave()) {
    //   return;
    // }
    // let data = {
    //   // trek_id: this.$route.query.id,
    //   destination_id : this.Destination.id, // new replace Destination in the old selected
    //   id: this.DestinationId, // Old Selected
    // };
    // console.log("Destination Check", this.Destination);
    this.ui.ArrowIsLoading = true;
    // trekService
    //   .editDestination(data)
    //   .then((res: any) => {
    //     flashService.Success('General Data Edited', 'A Destination Datas are saved');
    this.$set(this.DestinationData, this.UpIndex, destination);
    this.$set(this.DestinationData, index, this.UpIndexDestination);
      //   destination.IsActive = false;
      // })
      // .catch((error: any) => {
      //   common.sdCatchErr(error, this.errorsMessage).then(res => {
      //     this.errorsMessage = res;
      //   });
      //   flashService.Error('Error', 'Error while saving Destination Datas');
      // })
      // .finally(() => {
      this.ui.ArrowIsLoading = false;
      // });
  }
  protected moveDestinationDown(index: any, destination: any) {
    // alert("Move Down");
    this.DownIndexDestination = '';
    this.DownIndex = 0;

    this.DownIndexDestination = this.DestinationData[index +1];
    this.DownIndex = index +1;

    this.errors = {};
    this.isError = false;
    this.errorsMessage = {};
  // console.log(destination);
    // if (!this.IsValidationTrueSave()) {
    //   return;
    // }
    // let data = {
    //   // trek_id: this.$route.query.id,
    //   destination_id : this.Destination.id, // new replace Destination in the old selected
    //   id: this.DestinationId, // Old Selected
    // };
    // console.log("Destination Check", this.Destination);
    this.ui.ArrowIsLoading = true;
    // trekService
    //   .editDestination(data)
    //   .then((res: any) => {
    //     flashService.Success('General Data Edited', 'A Destination Datas are saved');
    this.$set(this.DestinationData, this.DownIndex, destination);
    this.$set(this.DestinationData, index, this.DownIndexDestination);
      //   destination.IsActive = false;
      // })
      // .catch((error: any) => {
      //   common.sdCatchErr(error, this.errorsMessage).then(res => {
      //     this.errorsMessage = res;
      //   });
      //   flashService.Error('Error', 'Error while saving Destination Datas');
      // })
      // .finally(() => {
    this.ui.ArrowIsLoading = false;
      // });
  }

  protected showAddDestination() {
    this.AddDestinationStatus = true;
  }
}
