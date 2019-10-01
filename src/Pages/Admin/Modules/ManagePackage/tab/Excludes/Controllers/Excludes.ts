import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import WithRender from "@/Pages/Admin/Modules/ManagePackage/tab/Excludes/Views/excludes.html";
import GeneralModule from "@/Pages/Admin/Modules/ManagePackage/Store/General";
import { trekService } from "@/Pages/Admin/Modules/ManagePackage/Services/Trekservice";
import { common } from "@/Pages/Admin/Modules/Common/Services/Common";

import ValidationError from "@/Pages/Admin/Modules/Common/Controllers/ValidationError";
import { flashService } from "@/Pages/Admin/Modules/Common/Services/FlashMessage/FlashService";

@WithRender
@Component({
  components: {
    "validation-error": ValidationError
  }
})
export default class Excludes extends Vue {
  protected ui: any = {};
  protected errors: any = {};
  protected errorsMessage: any = {};
  protected errorsModal: any = {};
  protected isError: boolean = false;
  protected Message: any = {};
  protected EditIndex: any = {};


  protected ExcludesList: any = {};

  protected EditExcludes: any = {};
  protected ExcludesData: any = {};

  protected TempIncludes: any = {};


  protected SelectedDeleteExcludeIndex: any = {};
  protected SelectedDeleteExclude: any = {};
  protected AddDestinationStatus: boolean = false;

  protected UpIndexExclude: any = {};
  protected UpIndex: number = 0;
  protected DownIndexExclude: any = {};
  protected DownIndex: number = 0;


  constructor() {
    super();
    this.ui.IsLoading = false;
    this.ui.PostLoading = false;

    this.ExcludesData.IconId = "";
    this.ExcludesData.title = "";

    this.EditExcludes.index = "";
    this.EditExcludes.icon_id = "";
    this.EditExcludes.id = "";
    this.EditExcludes.title = "";
  }
  public mounted() {
    this.GetExcludesList();
  }
  public hideModal() {
    this.ExcludesData.IconId = "";
    this.ExcludesData.title = "";
    this.errors = {};
    this.isError = false;
  }
  get getAllTourTypeList() {
    return GeneralModule.Icons;
  }
  public GetExcludesList() {
    let data = {
      trek_id: this.$route.query.id
    };
    this.ui.IsLoading = true;
    trekService
      .getExcludesList(data)
      .then((res: any) => {
        // console.log(res.data.data);
        res.data.data.filter((list: any) => {
          list.IsActive = false;
          // console.log(this.Pricing.List);
        });
        this.ExcludesList = res.data.data;
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

  protected addNewExcludes() {
    this.errors = {};
    this.errorsMessage = {};
    this.isError = false;

    if (!this.IsValidationAddInclude()) {
      return;
    }
    let data = {
      trek_id: this.$route.query.id,
      icon_id: this.ExcludesData.IconId.id,
      title: this.ExcludesData.title
    };
    // console.log(data);
    this.ui.PostLoading = true;
    trekService
      .addExcludes(data)
      .then((res: any) => {
        this.ExcludesList.unshift(res.data.data);
        flashService.Success("Exclude Added", res.data.message);
        (this.ExcludesData.IconId = ""), (this.ExcludesData.title = "");
        // this.Message = res.data.message;
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
    if (!this.ExcludesData.title) {
      Object.assign(this.errors, {
        title: ["The title field is required."]
      });
    }
    if (!this.ExcludesData.IconId) {
      Object.assign(this.errors, {
        icon_id: ["The icon id field is required."]
      });
    }
    if (common.notEmpty(this.errors)) {
      this.isError = true;
      return false;
    } else {
      return true;
    }
  }
  protected hideDeleteModal() {
    $("#deleteSelectedExcludes").modal("hide");
    $(".modal-backdrop").remove();
    this.errors = {};
    this.errorsModal = {};
    this.isError = false;
  }
  protected selectedDelete(index: any, list: any) {
    $("#deleteSelectedExcludes").modal("show");
    this.SelectedDeleteExcludeIndex = index;
    this.SelectedDeleteExclude = list;
  }
  protected deleteExcludes() {
    this.errors = {};
    this.errorsModal = {};
    this.isError = false;
    // console.log(list);
    let data = {
      trek_id: this.$route.query.id,
      id: this.SelectedDeleteExclude.id
    };
    // console.log(data);
    this.ui.PostLoading = true;
    trekService
      .deleteSelectedExcludes(data)
      .then((res: any) => {
        this.$delete(this.ExcludesList, this.SelectedDeleteExcludeIndex);
        flashService.Success("Exclude Deleted", res.data.message);
        // this.Message = res.data.message;
        this.hideDeleteModal();
      })
      .catch((error: any) => {
        common.sdCatchErr(error, this.errorsModal).then(res => {
          this.errorsModal = res;
        });
        flashService.Error("Error", "Error while deleting Exclude.");
      })
      .finally(() => {
        this.ui.PostLoading = false;
      });
  }

  protected saveExcludes() {
    this.errors = {};
    this.errorsMessage = {};
    this.isError = false;

    if (!this.IsValidationEditInclude()) {
      return;
    }
    let data = {
      trek_id: this.$route.query.id,
      id: this.EditExcludes.id,
      icon_id: this.EditExcludes.icon_id.id,
      title: this.EditExcludes.title,
    };
    this.ui.PostLoading = true;
    trekService
      .editExclude(data)
      .then((res: any) => {
        this.$set(this.ExcludesList, this.EditIndex, res.data.data);
        // this.Message = res.data.message;
        flashService.Success("Exclude Saved", res.data.message);
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
  protected IsValidationEditInclude() {
    if (!this.EditExcludes.title) {
      Object.assign(this.errors, {
        edit_title: ["The title field is required."]
      });
    }
    if (!this.EditExcludes.icon_id) {
      Object.assign(this.errors, {
        edit_icon_id: ["The icon id field is required."]
      });
    }
    if (common.notEmpty(this.errors)) {
      this.isError = true;
      return false;
    } else {
      return true;
    }
  }

  protected editExcludes(index: any, list: any) {
    this.TempIncludes = list;
    this.EditExcludes.title = list.title;
    this.EditExcludes.id = list.id;
    this.EditExcludes.icon_id = list.icon;
    this.EditIndex = index;
    this.errors = {};
    this.isError = false;
    list.IsActive = true;
  }
  protected cancelExcludes(index: any, list: any) {
    list.IsActive = false;
    this.errors = {};
    this.isError = false;
    this.EditExcludes.title = this.TempIncludes.title;
    this.EditExcludes.icon = this.TempIncludes.icon;
  }
  protected showAddDestination() {
    this.AddDestinationStatus = true;
  }
  protected moveExcludetUp(index: any, destination: any) {
    // alert("Move Up");
    this.UpIndexExclude = '';
    this.UpIndex = 0;
  
    this.UpIndexExclude = this.ExcludesList[index -1];
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
    this.$set(this.ExcludesList, this.UpIndex, destination);
    this.$set(this.ExcludesList, index, this.UpIndexExclude);
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
  protected moveExcludeDown(index: any, destination: any) {
    // alert("Move Down");
    this.DownIndexExclude = '';
    this.DownIndex = 0;
  
    this.DownIndexExclude = this.ExcludesList[index +1];
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
    this.$set(this.ExcludesList, this.DownIndex, destination);
    this.$set(this.ExcludesList, index, this.DownIndexExclude);
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
