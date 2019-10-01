import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import WithRender from "@/Pages/Admin/Modules/ManagePackage/tab/Includes/Views/includes.html";
import GeneralModule from "@/Pages/Admin/Modules/ManagePackage/Store/General";
import { trekService } from "@/Pages/Admin/Modules/ManagePackage/Services/Trekservice";
import { common } from "@/Pages/Admin/Modules/Common/Services/Common";
import ValidationError from '@/Pages/Admin/Modules/Common/Controllers/ValidationError';


import { flashService } from "@/Pages/Admin/Modules/Common/Services/FlashMessage/FlashService";

@WithRender
@Component({
  components: {
    'validation-error': ValidationError,
  },
})
export default class Includes extends Vue {
  protected ui: any = {};
  protected errors: any = {};
  protected errorsMessage: any = {};
  protected errorsModal: any = {};
  protected isError: boolean = false;
  protected Message: any = {};
  protected EditIndex: any = {};

  protected IncludesList: any = {};

  protected EditIncludes: any = {};
  protected IncludesData: any = {};
  protected TempIncludes: any = {};

  protected SelectedDeleteIncludeIndex: any = {};
  protected SelectedDeleteInclude: any = {};
  protected AddDestinationStatus: boolean = false;

  protected UpIndexInclude: any = {};
  protected UpIndex: number = 0;
  protected DownIndexInclude: any = {};
  protected DownIndex: number = 0;


  constructor() {
    super();
    this.ui.IsLoading = false;
    this.ui.PostLoading = false;

    this.IncludesData.IconId = "";
    this.IncludesData.title = "";

    this.EditIncludes.id = "";
    this.EditIncludes.icon_id = "";
    this.EditIncludes.title = "";
  }

  public mounted() {
    this.GetIncludesList();
  }
  public hideModal() {
    this.IncludesData.IconId = "";
    this.IncludesData.title = "";
    this.errors = {};
    this.errorsModal = {};
    this.isError = false;
  }
  get getAllTourTypeList() {
    return GeneralModule.Icons;
  }

  public GetIncludesList() {
    let data = {
      trek_id: this.$route.query.id
    };
    this.ui.IsLoading = true;
    trekService
      .getIncludesList(data)
      .then((res: any) => {
        // console.log(res.data.data);
        res.data.data.filter((list: any) => {
          list.IsActive = false;
          // console.log(this.Pricing.List);
        });
        this.IncludesList = res.data.data;
      })
      .catch((error: any) => {
        // console.log("ERROR", error);
        common.sdCatchErr(error, this.errors).then((res: any) => {
          this.isError = true;
          this.errors = res;
        });
      })
      .finally(() => {
        this.ui.IsLoading = false;
      });
  }
  public customLabel( name: any) {
    return name;
  }

  protected addIncludes() {
    this.errors = {};
    this.errorsMessage = {};
    this.isError = false;

    if (!this.IsValidationAddInclude()) {
      return;
    }
    let data = {
      trek_id: this.$route.query.id,
      icon_id: this.IncludesData.IconId.id,
      title: this.IncludesData.title,
    };
    // console.log(data);
    this.ui.PostLoading = true;
    trekService
      .addIncludes(data)
      .then((res: any) => {
        this.IncludesList.unshift(res.data.data);
        flashService.Success('Incudes Added', res.data.message);
        // this.Message = res.data.message;
        this.errors = {};
        this.isError = false;
        this.IncludesData.title = '';
        this.IncludesData.IconId = '';
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
  protected IsValidationAddInclude() {
    if (!this.IncludesData.title) {
      Object.assign(this.errors, {
        title: ['The title field is required.'],
      });
    }
    if (!this.IncludesData.IconId) {
      Object.assign(this.errors, {
        icon_id: ['The icon id field is required.'],
      });
    }
    if (common.notEmpty(this.errors)) {
      this.isError = true;
      return false;
    } else {
      return true;
    }
  }
  protected hideDeleteModal(){
    $('#deleteSelectedIncludes').modal('hide');
    $('.modal-backdrop').remove();
    this.errors = {};
    this.errorsMessage = {};
    this.isError = false;
  }
  protected selectedDelete(index: any, list: any) {
    this.errors = {};
    this.errorsMessage = {};
    this.isError = false;
    $('#deleteSelectedIncludes').modal('show');
    this.SelectedDeleteIncludeIndex = index;
    this.SelectedDeleteInclude = list;
  }
  protected deleteIncludes() {
    this.errors = {};
    this.errorsModal = {};
    this.isError = false;
    // console.log(list);
    let data = {
      trek_id: this.$route.query.id,
      id: this.SelectedDeleteInclude.id,
    };
    // console.log(data);
    this.ui.PostLoading = true;
    trekService
      .deleteSelectedIncludes(data)
      .then((res: any) => {
        this.$delete(this.IncludesList, this.SelectedDeleteIncludeIndex);
        flashService.Success('Include Deleted', res.data.message);
        // this.Message = res.data.message;
        this.hideDeleteModal();
      })
      .catch((error: any) => {
        common.sdCatchErr(error, this.errorsModal)
        .then((res) => {
          this.errorsModal = res;
        });
      })
      .finally(() => {
        this.ui.PostLoading = false;
        this.hideModal();
      });
  }
  protected saveIncludes() {
    // console.log( "save", this.EditIncludes.title);
    // console.log(include);
    this.errors = {};
    this.errorsMessage = {};
    this.isError = false;

    if (!this.IsValidationEditInclude()) {
      return;
    }
    let data = {
      trek_id: this.$route.query.id,
      id: this.EditIncludes.id,
      icon_id: this.EditIncludes.icon_id.id,
      title: this.EditIncludes.title,
    };
    this.ui.PostLoading = true;
    trekService
      .editIncludes(data)
      .then((res: any) => {
        this.$set(this.IncludesList, this.EditIndex, res.data.data);
        flashService.Success('Include Edited', res.data.message);
        // this.Message = res.data.message;
        this.errors = {};
        this.isError = false;
      })
      .catch((error: any) => {
        common.sdCatchErr(error, this.errorsMessage)
        .then((res) => {
          this.errorsMessage = res;
        });
      })
      .finally(() => {
        this.ui.PostLoading = false;
      });
  }
  protected IsValidationEditInclude() {
    if (!this.EditIncludes.title) {
      Object.assign(this.errors, {
        edit_title: ['The title field is required.'],
      });
    }
    if (!this.EditIncludes.icon_id) {
      Object.assign(this.errors, {
        edit_icon_id: ['The icon id field is required.'],
      });
    }
    if (common.notEmpty(this.errors)) {
      this.isError = true;
      return false;
    } else {
      return true;
    }
  }
  // protected hideDeleteModal(){
  //   $('#deleteSelectedIncludes').modal('hide');
  //   $('.modal-backdrop').remove();
  //   this.errors = {};
  //   this.isError = false;
  // }
  protected editIncludes(index: any, list: any) {
    this.EditIncludes.icon = '';
    this.EditIncludes.title = '';
    this.errors = {};
    this.isError = false;
    list.IsActive = true;
    // this.TempIncludes = list;
    this.EditIndex = index;
    this.EditIncludes.id = list.id;
    this.EditIncludes.icon_id = list.icon;
    this.EditIncludes.title = list.title;
    console.log(list);
    
  }
  protected cancelIncludes(index: any, list: any) {
    // console.log("cancel", list);
    list.IsActive = false;
    this.errors = {};
    this.isError = false;
    // this.GetIncludesList();
    // this.EditIncludes.title
    this.EditIncludes.title = this.TempIncludes.title;
    this.EditIncludes.icon = this.TempIncludes.icon;
  }
  protected showAddDestination() {
    this.AddDestinationStatus = true;
  }
  protected moveIncludetUp(index: any, destination: any) {
    // alert("Move Up");
    this.UpIndexInclude = '';
    this.UpIndex = 0;
  
    this.UpIndexInclude = this.IncludesList[index -1];
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
    this.$set(this.IncludesList, this.UpIndex, destination);
    this.$set(this.IncludesList, index, this.UpIndexInclude);
      //   destination.IsActive = false;
      // })
      // .catch((error: any) => {
      //   common.sdCatchErr(error, this.errorsMessage).then(res => {
      //     this.errorsMessage = res;
      //   });
      //   flashService.Error('Error', 'Error while saving Destination Datas');
      // })
      // .finally(() => {
    this.ui.ArrowPostLoading = false;
      // });
  }
  protected moveIncludeDown(index: any, destination: any) {
    // alert("Move Down");
    this.DownIndexInclude = '';
    this.DownIndex = 0;
  
    this.DownIndexInclude = this.IncludesList[index +1];
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
    this.$set(this.IncludesList, this.DownIndex, destination);
    this.$set(this.IncludesList, index, this.DownIndexInclude);
      //   destination.IsActive = false;
      // })
      // .catch((error: any) => {
      //   common.sdCatchErr(error, this.errorsMessage).then(res => {
      //     this.errorsMessage = res;
      //   });
      //   flashService.Error('Error', 'Error while saving Destination Datas');
      // })
      // .finally(() => {
    this.ui.ArrowPostLoading = false;
      // });
  }
}
