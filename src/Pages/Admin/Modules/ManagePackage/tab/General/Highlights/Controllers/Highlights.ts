import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from '@/Pages/Admin/Modules/ManagePackage/tab/General/Highlights/Views/highlights.html';
import {trekService} from '@/Pages/Admin/Modules/ManagePackage/Services/Trekservice';
import GeneralModule from '@/Pages/Admin/Modules/ManagePackage/Store/General';
import { common } from '@/Pages/Admin/Modules/Common/Services/Common';
import ValidationError from '@/Pages/Admin/Modules/Common/Controllers/ValidationError';
import EditHighlights from '@/Pages/Admin/Modules/ManagePackage/tab/General/Highlights/Controllers/EditHighlights.ts';

import { flashService } from '@/Pages/Admin/Modules/Common/Services/FlashMessage/FlashService';

@WithRender
@Component({
  components: {
    EditHighlights,
      'validation-error': ValidationError,
  },
})
export default class Highlights extends Vue {
  protected ui: any = {};
  protected errors: any = {};
  protected errorsMessage: any = {};
  protected errorsModal: any = {};
  protected isError: boolean = false;

  protected activeHighlight: any = {};
  protected shouldEditHighlight: boolean = false;
  protected ListId: any = {};
  protected DeleteIndex: any = {};

  protected Message: any = {};
  protected SaveEditMessage: any = {};
  protected EditHighlight: any = {};

  protected HighlightsData: any = {};
  protected HighlightList: any = [];
  protected AddDestinationStatus: boolean = false;

  protected UpIndexHighlight: any = {};
  protected UpIndex: number = 0;
  protected DownIndexHighlight: any = {};
  protected DownIndex: number = 0;
  


  constructor() {
    super();
    this.ui.IsLoading = false;
    this.ui.PostLoading = false;
    this.ui.ArrowPostLoading = false;

    this.HighlightsData.IconId = '';
    this.HighlightsData.Description = '';

    this.ListId.id = '';

    this.EditHighlight.icon_id = '';
    this.EditHighlight.id = '';
    this.EditHighlight.description = '';
    this.EditHighlight.index = '';
    this.EditHighlight.DeleteIndex = '';

  }
  public hideModal() {
    this.isError = false;
    //Empty the modal
    this.HighlightsData = {};
    this.HighlightsData.IconId = '';
    this.HighlightsData.Description = '';
    this.Message = '';
  }
  public mounted() {
    this.GetAllHighlightList();
  }

  get getAllTourTypeList() {
    return GeneralModule.Icons;
  }
  public customLabel( name: any) {
    return name;
  }

  public GetAllHighlightList() {
    this.ui.IsLoading = true;
    let data = {
      trek_id: this.$route.query.id,
    };
    trekService
    .getHighlightList(data)
    .then((res: any) => {
      // console.log("GetAllTourTypeList", res);
      this.HighlightList = res.data.data;
    })
    .catch((error: any) => {
        this.errors = error;
    })
    .finally(() => {
        this.ui.IsLoading = false;
    });
  }
  // @Watch('getgetAllHighlightList')
  get getAllHighlightList() {
    return GeneralModule.HighlightList;
  }

  protected createHighlight() {
    this.errors = {};
    this.errorsMessage = {};
    this.isError = false;

    if (!this.IsValidationTrue()) return;
    let data = {
      trek_id: this.$route.query.id,
      icon_id: this.HighlightsData.IconId.id,
      description: this.HighlightsData.Description,
    };
    this.ui.PostLoading = true;
    trekService
    .addHighlight(data)
    .then((res: any) => {
      this.HighlightList.unshift(res.data.data);
      // this.Message = res.data.message;
      flashService.Success('Highight Added', res.data.message);
      this.errors = {};
      this.isError = false;
      this.HighlightsData.IconId = '';
      this.HighlightsData.Description = '';
      this.GetAllHighlightList();
      console.log('then');
    })
    .catch((error: any) => {
      common.sdCatchErr(error, this.errorsMessage)
        .then((res) => {
          this.errorsMessage = res;
        });
        console.log('catch');

    })
    .finally(() => {
      this.ui.PostLoading = false;
    });
  }
  protected IsValidationTrue() {
    if (!this.HighlightsData.IconId) {
        Object.assign(this.errors, { icon_id: ['The icon id field is required.'] });
    }
    if (!this.HighlightsData.Description) {
        Object.assign(this.errors, { description: ['The description field is required.'] });
    }
    if (common.notEmpty(this.errors)) {
        this.isError = true;
        return false;
    } else {
      return true;
    }
  }

  public get buttonName() {
    if (this.ui.PostLoading) {
      return 'Processing...';
    }
    return 'Save';
  }
   // Edit the Highlight item
  protected EditHighlightItem(index: any, List: any) {
    console.log("Index: ", index);
    console.log("Edit List: ", List);
    this.EditHighlight = List;
  }

  protected editHighlightUi(index: any, item: any) {
    $("#edithighlights").modal("show");
    // this.activeHighlight = item;
    console.log(item);
    this.EditHighlight.index = index;
    this.EditHighlight.id = item.id;
    this.EditHighlight.description =  item.description;
    this.EditHighlight.icon_id =  item.icon;
    // this.shouldEditHighlight = true;
  }
  protected hideDeleteModal() {
    $("#edithighlights").modal("hide");
    $(".modal-backdrop").remove();
    this.errors = {};
    this.isError = false;
    this.EditHighlight.icon_id = '';
    this.EditHighlight.description = '';
  }
    // Edit the Highlight item
  protected SaveEditHighlightItem() {
    this.errors = {};
    this.isError = false;

    if (!this.IsValidationEdit()){
      return;
    }
    let data = {
      trek_id: this.$route.query.id,
      id: this.EditHighlight.id,
      icon_id: this.EditHighlight.icon_id.id,
      description: this.EditHighlight.description,
    };
    // console.log("EDIT  POST DATA", data);
    this.ui.ArrowPostLoading = true;
    trekService
    .editHighlight(data)
    .then((res: any) => {
      this.$set(this.HighlightList, this.EditHighlight.index, res.data.data);
      flashService.Success('Highlight Edited', res.data.message);
      this.hideDeleteModal();
      // this.SaveEditMessage = res.data.message;
    })
    .catch((error: any) => {
      common.sdCatchErr(error, this.errorsModal).then(res => {
        this.errorsModal = res;
      });
    })
    .finally(() => {
      this.ui.ArrowPostLoading = false;
    });
  }
  protected IsValidationEdit() {
    if (!this.EditHighlight.icon_id) {
        Object.assign(this.errors, { edit_icon_id: ['The icon id field is required.'] });
    }
    if (!this.EditHighlight.description) {
        Object.assign(this.errors, { edit_description: ['The description field is required.'] });
    }
    if (common.notEmpty(this.errors)) {
        this.isError = true;
        return false;
    } else {
      return true;
    }
  }
  protected hideDelete() {
    $("#delete").modal("hide");
    $(".modal-backdrop").remove();
    this.errors = {};
    this.isError = false;
    this.EditHighlight.DeleteIndex = '';
  }
  protected deleteHighlightUi(index: any, item: any) {
    $("#delete").modal("show");
    this.DeleteIndex = index;
    this.EditHighlight.DeleteIndex = item.id;
  }
  protected DeleteHighlightItem() {
    let data = {
      trek_id: this.$route.query.id,
      id: this.EditHighlight.DeleteIndex,
    };
    this.ui.PostLoading = true;
    trekService
    .deleteHighlight(data)
    .then((res: any) => {
      flashService.Success('Highlight Deleted', res.data.message);
      this.$delete(this.HighlightList, this.DeleteIndex);
      this.hideDelete();
    })
    .catch((error: any) => {
      common.sdCatchErr(error, this.errors)
        .then((res) => {
          this.errors = res;
        });
      flashService.Error('Error', 'Error while deleting Highlight');
    })
    .finally(() => {
      this.ui.PostLoading = false;
    });
  }

  public get buttonSave() {
    if (this.ui.PostLoading) {
      return 'Processing...';
    }
    return 'Save';
  }

  protected updateHighlight(data: any) {
    this.shouldEditHighlight = false;
    // console.log(data);
  //   this.HighlightList.forEach((item: any, index: number) => {
  //     if (item.OldSize == data.OldSize) {
  //         item.Size = data.Size;
  //         item.Fit = data.Fit;
  //     }
  // });
  }
protected closeHighlighModal() {
    this.shouldEditHighlight = false;
}
protected showAddDestination() {
  this.AddDestinationStatus = true;
}
protected moveHighlightUp(index: any, destination: any) {
  // alert("Move Up");
  this.UpIndexHighlight = '';
  this.UpIndex = 0;

  this.UpIndexHighlight = this.HighlightList[index -1];
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
  this.$set(this.HighlightList, this.UpIndex, destination);
  this.$set(this.HighlightList, index, this.UpIndexHighlight);
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
protected moveHighlightDown(index: any, destination: any) {
  // alert("Move Down");
  this.DownIndexHighlight = '';
  this.DownIndex = 0;

  this.DownIndexHighlight = this.HighlightList[index +1];
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
  this.$set(this.HighlightList, this.DownIndex, destination);
  this.$set(this.HighlightList, index, this.DownIndexHighlight);
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
