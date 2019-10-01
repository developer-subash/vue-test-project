import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import WithRender from "@/Pages/Admin/Modules/ManagePackage/tab/Itinerary/Views/itinerary.html";
import GeneralModule from "@/Pages/Admin/Modules/ManagePackage/Store/General";

import { trekService } from "@/Pages/Admin/Modules/ManagePackage/Services/Trekservice";
import { trekapi } from "@/Pages/Admin/Modules/ManagePackage/Services/Trekapi";
import { common } from "@/Pages/Admin/Modules/Common/Services/Common";

import ValidationError from "@/Pages/Admin/Modules/Common/Controllers/ValidationError";

import UploadFile from "@/Pages/Admin/Modules/Common/Controllers/UploadAny";

import { flashService } from "@/Pages/Admin/Modules/Common/Services/FlashMessage/FlashService";

@WithRender
@Component({
  components: {
    UploadFile,
    "validation-error": ValidationError
  }
})
export default class Itinerary extends Vue {
  protected ui: any = {};
  protected errors: any = {};
  protected errorsAttraction: any = {};
  protected errorsSegmentEdit: any = {};
  protected isError: boolean = false;
  protected Pricing: any = {};
  protected IsActive: boolean = false;
  protected ActiveTab: number = 0;
  protected ItineraryList: any = [];
  protected AddTrekSegmentTitle: string = "";
  protected Attraction: any = {};
  protected AttractionList: any = [];
  protected AttractionTypeList: any = [];
  protected AttractionIndex: any = {};
  protected EditAttractionList: any = {};
  protected ImageList: any = [];
  protected AttractionImageList: any = [];
  protected SelectedSegment: any = {};
  protected DeleteIndex: any = {};
  protected EditAttractionIndex: any = {};
  protected SelectedDelete: any = {};
  protected UnitList: any = [];
  protected ErrorsSegment: any = {};
  // protected SelectedTab: any = {};
  protected TempData: any = {};
  protected TempIndex: any = {};
  protected ButtonStatus: boolean = false;

  protected DeleteStatus: boolean = false;

  protected SelectedDeleteIndex: any = {};
  protected SelectedDeleteImage: any = {};

  protected titles: any = {};
  protected limitdata: any = {};
  protected postdata: any = {};
  protected postdataattraction: any = {};
  protected shouldfileupload: boolean = false;
  protected checkTitle: boolean = false;
  protected AddImgToList: any = {};
  protected errorsDelete: any = {};

  protected IsActiveItinerary: boolean = false;

  // protected StatusSegment: boolean = true;

  constructor() {
    super();
    this.Attraction.Title = "";
    this.Attraction.Description = "";
    this.Attraction.Icon = "";
    this.Attraction.Link = "";
    this.errors.Segment = {};
    this.errors.Attraction = {};

    this.EditAttractionList.Id = "";
    this.EditAttractionList.Title = "";
    this.EditAttractionList.Description = "";
    this.EditAttractionList.Icon = "";
    this.EditAttractionList.Link = "";
    this.EditAttractionList.AttractionTypeId = "";
    this.EditAttractionList.SelectSegmentID = "";

    this.SelectedSegment.SegmentId = 0;
    this.SelectedSegment.SegmentTitle = "";
    this.SelectedSegment.Title = "";
    this.SelectedSegment.Description = "";
    this.SelectedSegment.AltitudeInMeter = '';
    this.SelectedSegment.AltitudeInFeet = '';
    this.SelectedSegment.MinDuration = "";
    this.SelectedSegment.MaxDuration = "";
    this.SelectedSegment.Unit = "";
    this.SelectedSegment.Images = {};
    this.SelectedSegment.Attractions = {};
    this.SelectedSegment.IsActive = false;

    this.titles.btn_title = "Upload Image";
    this.titles.modal_title = "Upload Image";
    this.titles.browse_title = "Browse Image File";
    this.titles.document_title = "Title or description for the Upload Image";

    // for limitdata
    this.limitdata.extensions = 'jpg|jpeg|bmp|png';
    this.limitdata.maxSizeInMB = "20";
    this.limitdata.fileType = "";
    this.limitdata.invalidSizeMsg = "Exceeded maximum File Upload  size 20 MB";
    this.limitdata.invalidFileTypeMsg = "Only Jpeg, png files are supported";
    this.limitdata.titleRequiredMsg = "Title field is required.";

    // for postdata
    this.postdata.post_url = "";
    this.checkTitle = true;
  }
  public preventNonNumericalInput(event: any){
    common.preventNonNumericalInput(event);
  }
  public hideModalSegment() {
    $("#addSegment").modal("hide");
    $(".modal-backdrop").remove();
    this.SelectedSegment.SegmentId = '';
    this.AddTrekSegmentTitle = '';
    this.ErrorsSegment = {};
    this.isError = false;
    this.errors = {};
    this.selectedSegment(this.TempIndex , this.ItineraryList[this.TempIndex]);
    // this.selectedSegment(0, this.ItineraryList[0]);
  }
  public hideModalSegmentClose() {
    $("#addSegment").modal("hide");
    $(".modal-backdrop").remove();
    this.SelectedSegment.SegmentId = '';
    this.AddTrekSegmentTitle = '';
    this.ErrorsSegment = {};
    this.isError = false;
    this.errors = {};
    // this.selectedSegment(this.TempIndex , this.ItineraryList[this.TempIndex]);
    // this.selectedSegment(0, this.ItineraryList[0]);
  }
  public hideModalDelete() {
    $("#deleteSelectedAttraction").modal("hide");
    $(".modal-backdrop").remove();
    this.errors = {};
    this.isError = false;
  }
  public deleteModalSegment() {
    $("#deleteSelectedSegment").modal("hide");
    $(".modal-backdrop").remove();
    this.errorsDelete = {};
    this.isError = false;
    this.SelectedSegment.SegmentId = 0;
    this.SelectedSegment.SegmentTitle = "";
    this.SelectedSegment.Title = "";
    this.SelectedSegment.Description = "";
    this.SelectedSegment.AltitudeInMeter = '';
    this.SelectedSegment.AltitudeInFeet = '';
    this.SelectedSegment.MinDuration = "";
    this.SelectedSegment.MaxDuration = "";
    this.SelectedSegment.Unit = "";
    this.SelectedSegment.Images = {};
    this.SelectedSegment.Attractions = {};
    if (this.ActiveTab == 0) {
      this.selectedSegment(this.TempIndex , this.ItineraryList[this.TempIndex ]);
    } else {
      this.selectedSegment(this.TempIndex-1 , this.ItineraryList[this.TempIndex-1 ]);

    }
    // console.log("Active", this.ActiveTab);
    // console.log("Temp Index", this.TempIndex);
  }
  public cancelModalSegment() {
    $("#deleteSelectedSegment").modal("hide");
    $(".modal-backdrop").remove();
    this.DeleteStatus = false;
    this.errorsDelete = {};
    this.isError = false;
    this.SelectedSegment.SegmentId = 0;
    this.SelectedSegment.SegmentTitle = "";
    this.SelectedSegment.Title = "";
    this.SelectedSegment.Description = "";
    this.SelectedSegment.AltitudeInMeter = '';
    this.SelectedSegment.AltitudeInFeet = '';
    this.SelectedSegment.MinDuration = "";
    this.SelectedSegment.MaxDuration = "";
    this.SelectedSegment.Unit = "";
    this.SelectedSegment.Images = {};
    this.SelectedSegment.Attractions = {};
    this.selectedSegment(this.TempIndex , this.ItineraryList[this.TempIndex ]);
    // console.log("Active", this.ActiveTab);
    // console.log("Temp Index", this.TempIndex);
  }

  public hideModal() {
    //Empty the modal
    this.Attraction.Title = "";
    this.Attraction.Description = "";
    this.Attraction.Icon = "";
    this.Attraction.Link = "";

    this.SelectedSegment.SegmentId = 0;
    this.SelectedSegment.SegmentTitle = "";
    this.SelectedSegment.Title = "";
    this.SelectedSegment.Description = "";
    this.SelectedSegment.AltitudeInMeter = '';
    this.SelectedSegment.AltitudeInFeet = '';
    this.SelectedSegment.MinDuration = "";
    this.SelectedSegment.MaxDuration = "";
    this.SelectedSegment.Unit = "";
    this.SelectedSegment.Images = {};
    this.SelectedSegment.Attractions = {};
    this.SelectedSegment.IsActive = false;
  }

  get getAllTourTypeList() {
    return GeneralModule.Icons;
  }
  public mounted() {
    this.getAllItineraryList();
    this.getAllUnitLists();
    this.getAttractionTypeList();
    // this.checkItineraryListLength();
  }
  // public checkItineraryListLength() {
  //   if (this.ItineraryList == 0) {
  //     return this.IsActiveItinerary = true;
  //   } else {
  //     return this.IsActiveItinerary = false;
  //   }
  // }

  // get Unit List
  public async getAllUnitLists() {
    this.ui.IsLoading = true;
    trekService
      .getUnitList()
      .then((res: any) => {
        this.UnitList = res.data.data;
      })
      .catch((error: any) => {
        this.errors = error;
      })
      .finally(() => {
        this.ui.IsLoading = false;
      });
  }
  // get Attraction Type List
  public async getAttractionTypeList() {
    this.ui.IsLoading = true;
    trekService
      .getAttractionType()
      .then((res: any) => {
        this.AttractionTypeList = res.data.data;
      })
      .catch((error: any) => {
        this.errors = error;
      })
      .finally(() => {
        this.ui.IsLoading = false;
      });
  }

  public async getAllItineraryList() {
    this.ui.IsLoading = true;
    let data = {
      trek_id: this.$route.query.id,
    };
    // console.log(data);
    trekService
      .retrieveItinerary(data)
      .then((res: any) => {
        // console.log(res.data.data);
        res.data.data.filter((segment: any) => {
          segment.IsActive = false;
        });
        this.ItineraryList = res.data.data;
        // console.log(this.ItineraryList);
        this.selectedSegment(this.ActiveTab, this.ItineraryList[this.ActiveTab]);
      })
      .catch((error: any) => {
        this.errors = error;
      })
      .finally(() => {
        this.ui.IsLoading = false;
      });
    // this.getAttractionsList();
  }
  public changeSaveStatus(SelectedSegment: any) {
    // console.log(segment);
    SelectedSegment.IsActive = true;
  }
  public cancelSelectedSegment(SelectedSegment: any) {
    // console.log(segment);
    SelectedSegment.IsActive = false;
    this.errors = {};
    this.isError = false;
  }
  // Segment Image List
  // public segmentImageList() {
  //   this.errors = {};
  //   this.isError = false;

  //   // if (!this.IsValidationTrue()) return;
  //   let data = {
  //     trek_id: this.$route.query.id,
  //     segment_id: this.SelectedSegment.SegmentId,
  //   };
  //   this.ui.IsLoading = true;
  //   trekService
  //     .segmentImageList(data)
  //     .then((res: any) => {
  //       res.data.data.filter((image: any) => {
  //         image.IsActive = false;
  //       });
  //       // console.log(res.data.data);
  //       this.ImageList = res.data.data;
  //     })
  //     .catch((error: any) => {
  //       // console.log('ERROR', error);
  //       common.sdCatchErr(error, this.errors).then((res: any) => {
  //         this.isError = true;
  //         this.errors = res;
  //       });
  //     })
  //     .finally(() => {
  //       this.ui.IsLoading = false;
  //     });
  // }
  public selectedSegment(index: any, data: any) {
    // console.log(data);
    this.errors = {};
    this.isError = false;
    // console.log(data);
    this.TempData = data;
    this.TempIndex = index;
    this.ActiveTab = index;
    this.SelectedSegment.SegmentId = data.id;
    this.SelectedSegment.SegmentTitle = data.segment_title;
    this.SelectedSegment.Title = data.title;
    this.SelectedSegment.Unit = data.unit;
    this.SelectedSegment.Description = data.description;
    this.SelectedSegment.AltitudeInMeter = data.altitude_in_meter;
    this.SelectedSegment.AltitudeInFeet = data.altitude_in_feet;
    this.SelectedSegment.MinDuration = data.min_duration;
    this.SelectedSegment.MaxDuration = data.max_duration;
    this.ImageList = data.images ? data.images : [];
    // this.AttractionList = [];
    this.AttractionList = data.attractions ? data.attractions : [];
    this.SelectedSegment.Attractions = data.IsActive;
    // console.log(this.SelectedSegment.SegmentId);
    // this.getAttractionsList();
    // this.segmentImageList();
    this.$router.push({
      name: "create-business-package-trek-itinerary",
      query: {
        id: this.$route.query.id,
        day: index + 1,
      },
    });
  }
  protected ConvertToFeet() {
    this.SelectedSegment.AltitudeInFeet = common.ConvertToFeet(
      this.SelectedSegment.AltitudeInMeter
    );
  }
  protected ConvertToMeter() {
    this.SelectedSegment.AltitudeInMeter = common.ConvertToMeter(
      this.SelectedSegment.AltitudeInFeet
    );
  }
  protected showSegmentModal() {
    $("#addSegment").modal("show");
  }
  protected addTrekSegment() {
    // alert();
    this.isError = false;
    this.errors = {};
    this.ErrorsSegment = {};
    this.ButtonStatus = true;
    if (!this.IsValidationAddSegment()) return;
    let data = {
      trek_id: this.$route.query.id,
      segment_title: this.AddTrekSegmentTitle,
    };
    this.ui.PostLoading = true;
    trekService
      .addSegment(data)
      .then((res: any) => {
        this.ItineraryList.push(res.data.data);
        let index = this.ItineraryList.lastIndexOf(res.data.data);
        this.selectedSegment(index, this.ItineraryList[index]);
        flashService.Success("Trek Segment Added", res.data.message);
        this.hideModalSegment();
        this.ui.PostLoading = false;
        this.ButtonStatus = false;
      })
      .catch((error: any) => {
        common.sdCatchErr(error, this.ErrorsSegment).then(res => {
          this.ErrorsSegment = res;
        });
        // flashService.Error("Error", "Error while adding Segment.");
      })
      .finally(() => {
        this.ui.PostLoading = false;
      });
  }
  // protected testDelete(SelectedSegment: any){
  //   console.log(SelectedSegment);
  //   console.log("Selected Index", this.ActiveTab);

  // }
  protected deleteSegment() {
    this.isError = false;
    this.errorsDelete = {};
    this.errors = {};
    $("#deleteSelectedSegment").modal("show");
    // console.log();
  }
  protected deleteTrekSegment() {
    this.isError = false;
    this.errorsDelete = {};
    // console.log(this.TempIndex );
    let data = {
      trek_id: this.$route.query.id,
      id: this.SelectedSegment.SegmentId,
    };
    this.ui.PostLoading = true;
    trekService
      .deletSegment(data)
      .then((res: any) => {
        flashService.Success("Trek Segment Deleted", res.data.message);
        this.$delete(this.ItineraryList, this.ActiveTab);
        // this.ItineraryList = {};
        this.deleteModalSegment();
        // this.selectedSegment(`${this.TempIndex -1}` , this.ItineraryList['${this.TempIndex -1}' ]);
        this.isError = false;
        this.errorsDelete = {};
      })
      .catch((error: any) => {
        common.sdCatchErr(error, this.errorsDelete).then(res => {
          this.errorsDelete = res;
          this.DeleteStatus = true;
        });
      })
      .finally(() => {
        this.ui.PostLoading = false;
      });
  }

  protected IsValidationAddSegment() {
    if (!this.AddTrekSegmentTitle) {
      Object.assign(this.errors, {
        add_segment_title: ["The segment title field is required."]
      });
    }
    if (common.notEmpty(this.errors)) {
      this.isError = true;
      return false;
    } else {
      return true;
    }
  }
  protected editSelectedSegment(Segment: any) {
    this.errors = {};
    this.isError = false;

    if (!this.IsValidationSegmentTrue()) {
      return;
    }
    let data = {
      trek_id: this.$route.query.id,
      segment_id: this.SelectedSegment.SegmentId,
      segment_title: this.SelectedSegment.SegmentTitle,
      title: this.SelectedSegment.Title,
      description: this.SelectedSegment.Description,
      min_duration: this.SelectedSegment.MinDuration,
      max_duration: this.SelectedSegment.MaxDuration,
      duration_unit: this.SelectedSegment.Unit.id,
      altitude_in_meter: this.SelectedSegment.AltitudeInMeter,
      altitude_in_feet: this.SelectedSegment.AltitudeInFeet,
    };
    this.ui.PostLoading = true;
    trekService
      .editSegment(data)
      .then((res: any) => {
        this.$set(this.ItineraryList, this.ActiveTab, res.data.data);
        // this.ItineraryList[this.ActiveTab].segment_title, this.SelectedSegment.SegmentTitle;
        flashService.Success("Segment set", res.data.message);
        this.SelectedSegment.IsActive = false;
        Segment.IsActive = false;
        this.errors.Segment = {};
        this.isError = false;
        // this.getAllItineraryList();
      })
      .catch((error: any) => {
        common.sdCatchErr(error, this.errors.Segment).then(res => {
          this.errors.Segment = res;
        });
        // flashService.Error("Error", "Error while saving segment Itinerary.");
      })
      .finally(() => {
        this.ui.PostLoading = false;
      });
  }
  protected IsValidationSegmentTrue() {
    if (!this.SelectedSegment.SegmentTitle) {
      Object.assign(this.errors, {
        segment_title: ["The segment title field is required."]
      });
    }
    if (!this.SelectedSegment.Title) {
      Object.assign(this.errors, { title: ["The title field is required."] });
    }
    if (!this.SelectedSegment.MinDuration) {
      Object.assign(this.errors, {
        min_duration: ["The min duration field is required."]
      });
    }
    if (!this.SelectedSegment.MaxDuration) {
      Object.assign(this.errors, {
        max_duration: ["The max duration field is required."]
      });
    }
    if (!this.SelectedSegment.Unit) {
      Object.assign(this.errors, {
        duration_unit: ["The duration unit field is required."]
      });
    }
    if (common.notEmpty(this.errors)) {
      this.isError = true;
      return false;
    } else {
      return true;
    }
  }
  // protected segmentId(index: any, segment: any) {
  //   console.log(segment);
  // }
  protected attractionModal() {
    $("#exampleModal").modal("show");
  }
  protected hideattractionModal() {
    let tab = this.ActiveTab;
    $("#exampleModal").modal("hide");
    $(".modal-backdrop").remove();
    this.errors = {};
    this.errorsAttraction = {};
    this.isError = false;
    this.SelectedSegment.SegmentId = '';
    this.Attraction.Title = '';
    this.Attraction.Icon = '';
    this.Attraction.Description = '';
    this.Attraction.Link = '';
    this.selectedSegment(tab, this.ItineraryList[tab]);
    this.getAllItineraryList();
  }
  protected AddSelectedAttraction() {
    this.errors = {};
    this.errorsAttraction = {};
    this.isError = false;

    if (!this.IsValidationSegmentTrueAttraction()) {
      return;
    }
    this.ui.PostLoading = true;
    let data = {
      trek_id: this.$route.query.id,
      segment_id: this.SelectedSegment.SegmentId,
      title: this.Attraction.Title,
      attraction_type_id: this.Attraction.Icon.id,
      description: this.Attraction.Description,
      other_info: this.Attraction.Link,
    };
    // console.log(data);
    trekService
      .addAttraction(data)
      .then((res: any) => {
        this.AttractionList.unshift(res.data.data);
        flashService.Success('Attraction Added', res.data.message);
        this.hideattractionModal();
      })
      .catch((error: any) => {
        alert('sharma');
        this.isError = true;
        common.sdCatchErr(error, this.errorsAttraction)
        .then((res) => {
          this.errorsAttraction = res;
        });
      })
      .finally(() => {
        this.ui.PostLoading = false;
      });
  }
  protected IsValidationSegmentTrueAttraction() {
      if (!this.Attraction.Icon) {
        Object.assign(this.errors, {
          attraction_type_id: ["The attraction type id field is required."]
        });
      }
      if (!this.Attraction.Title) {
        Object.assign(this.errors, { attraction_title: ["The title field is required."] });
      }
      if (this.Attraction.Link) {
        let url = this.Attraction.Link;
        if (url) {
          if (url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g) !== null){
            // alert("OK");
          // return true;
          } else {
            // alert("WORNG FORMAT");
              Object.assign(this.errors, { attraction_link: ["Please enter valid URL."] });
            // return false;
          }
        }
      }
      if (common.notEmpty(this.errors)) {
        this.isError = true;
        return false;
      } else {
        return true;
      }
  }

  protected editAttraction(index: any, attraction: any) {
    console.log("edit", attraction);
    $("#editAttractionModal").modal("show");
    this.errors = {};
    this.errors.Attraction = {};
    this.isError = false;
    this.EditAttractionIndex = index;
    this.EditAttractionList.Id = attraction.id;
    this.EditAttractionList.Title = attraction.title;
    this.EditAttractionList.Description = attraction.description;
    this.EditAttractionList.AttractionType = attraction.attraction_type;
    this.EditAttractionList.Link = attraction.other_info;
    this.EditAttractionList.SelectSegmentID = attraction.segment_id;
  }
  protected hideAttractionSegment() {
    $("#editAttractionModal").modal("hide");
    $(".modal-backdrop").remove();
    this.errors = {};
    this.errors.Attraction = {};
    this.isError = false;
    this.EditAttractionList.Id = '';
    this.EditAttractionList.Title = '';
    this.EditAttractionList.AttractionType = '';
    this.EditAttractionList.Description = '';
    this.EditAttractionList.Link = '';
  }
  protected IsValidationAttraction() {
    if (!this.EditAttractionList.AttractionType) {
      Object.assign(this.errors, {
        edit_attraction_type_id: ["The attraction type id field is required."]
      });
    }
    if (!this.EditAttractionList.Title) {
      Object.assign(this.errors, {
        edit_attraction_title: ["The title field is required."]
      });
    }
    if (common.notEmpty(this.errors)) {
      this.isError = true;
      return false;
    } else {
      return true;
    }
  }
  protected SaveEditedAttraction() {
    // alert();
    this.errors = {};
    this.errorsSegmentEdit = {};
    this.errorsSegmentEdit = {};
    this.isError = false;
    if (!this.IsValidationSegmentTrueAttractionEdit()) {
      return;
    }
    this.ui.PostLoading = true;
    let data = {
      trek_id: this.$route.query.id,
      attraction_type_id : this.EditAttractionList.AttractionType.id,
      id: this.EditAttractionList.Id,
      segment_id: this.EditAttractionList.SelectSegmentID,
      title: this.EditAttractionList.Title,
      description: this.EditAttractionList.Description,
      other_info: this.EditAttractionList.Link,
    };
    trekService
      .editAttraction(data)
      .then((res: any) => {
        this.$set(this.AttractionList, this.EditAttractionIndex, res.data.data);
        flashService.Success("Edit Attraction", res.data.message);
        this.hideAttractionSegment();
      })
      .catch((error: any) => {
        common.sdCatchErr(error, this.errorsSegmentEdit).then(res => {
          this.errorsSegmentEdit = res;
        });
      })
      .finally(() => {
        this.ui.PostLoading = false;
      });
  }
  protected IsValidationSegmentTrueAttractionEdit() {
    if (!this.EditAttractionList.AttractionType) {
      Object.assign(this.errors, {
        edit_attraction_type_id: ["The attraction type id field is required."]
      });
    }
    if (!this.EditAttractionList.Title) {
      Object.assign(this.errors, { edit_attraction_title: ["The title field is required."] });
    }
    if (this.EditAttractionList.Link) {
      let url = this.EditAttractionList.Link;
      if (url) {
        if (url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g) !== null){
          // alert("OK");
        // return true;
        } else {
          // alert("WORNG FORMAT");
            Object.assign(this.errors, { edit_attraction_link: ["Please enter valid URL."] });
          // return false;
        }
      }
    }
    if (common.notEmpty(this.errors)) {
      this.isError = true;
      return false;
    } else {
      return true;
    }
}
  protected deleteSelected(index: any, attraction: any) {
    this.errors = {};
    this.isError = false;
    $("#deleteSelectedAttraction").modal("show");
    this.DeleteIndex = index;
    this.SelectedDelete = attraction;
  }
  protected deleteAttraction() {
    // console.log( "Delete Attraction Here", attraction);
    this.errors = {};
    this.isError = false;
    let data = {
      trek_id: this.$route.query.id,
      segment_id: this.SelectedDelete.segment_id,
      id: this.SelectedDelete.id
    };
    this.ui.PostLoading = true;
    trekService
      .deleteSegmentAttraction(data)
      .then((res: any) => {
        this.$delete(this.AttractionList, this.DeleteIndex);
        flashService.Success("Attraction Deleted", res.data.message);
        this.hideModalDelete();
      })
      .catch((error: any) => {
        this.isError = true;
        common.sdCatchErr(error, this.errors).then(res => {
          this.errors = res;
        });
        // console.log(error);
        // flashService.Error('Error', 'Error occur while Deleting Attraction');
        // flashService.Error('Error', 'Error while deleting Attraction');
      })
      .finally(() => {
        this.ui.PostLoading = false;
      });
  }
  // Delete Selected Image in Attraction
  protected deleteSelectedAttractionImage(index: any, image: any) {
    // console.log(image);
    let data = {
      trek_id: this.$route.query.id,
      id: image.id,
      segment_id: this.SelectedSegment.SegmentId
    };
    this.ui.PostLoading = true;
    trekService
      .deleteAttractionImage(data)
      .then((res: any) => {
        this.AttractionList[index].image = "";
        flashService.Success("Attraction Image Deleted", res.data.message);
        // this.hideModal();
      })
      .catch((error: any) => {
        common.sdCatchErr(error, this.errors).then(res => {
          this.errors = res;
        });
        flashService.Error("Error", "Error while deleting Attraction Image.");
      })
      .finally(() => {
        this.ui.PostLoading = false;
      });
  }
  protected cancelSelectedAttraction(index: any, attraction: any) {
    attraction.IsActive = false;
  }
  protected selectedDelete(index: any, image: any) {
    this.SelectedDeleteIndex = index;
    this.SelectedDeleteImage = image;
    // console.log(this.SelectedDeleteIndex);
    // console.log( this.SelectedDeleteImage);
  }
  protected deleteSelectedImage() {
    // console.log(image);
    this.errors = {};
    this.isError = false;
    let data = {
      trek_id: this.$route.query.id,
      segment_id: this.SelectedDeleteImage.segment_id,
      id: this.SelectedDeleteImage.id
    };
    this.ui.PostLoading = true;
    trekService
      .segmentImageDelete(data)
      .then((res: any) => {
        this.$delete(this.ImageList, this.SelectedDeleteIndex);
        flashService.Success("Itinerary Image Deleted", res.data.message);
      })
      .catch((error: any) => {
        this.isError = true;
        common.sdCatchErr(error, this.errors).then(res => {
          this.errors = res;
        });
        // console.log(error);
        flashService.Error("Error", "Error while deleting Itinerary Image.");
      })
      .finally(() => {
        this.ui.PostLoading = false;
      });
  }

  protected cancelDeleteAttraction() {
    this.hideModalDelete();
  }

  protected DeleteSegment() {
    alert("Selected Segment is deleted");
  }
  protected setBannerImage(index: any, image: any) {
    // console.log("Set Banner Image", image);
    this.errors = {};
    this.isError = false;
    let data = {
      trek_id: this.$route.query.id,
      segment_id: image.segment_id,
      id: image.id
    };
    this.ui.PostLoading = true;
    trekService
      .segmentMakeDefaultImage(data)
      .then((res: any) => {
        flashService.Success("Banner Image Set", res.data.message);
        this.$set(this.ImageList, index, res.data.data);
        this.getAllItineraryList();
      })
      .catch((error: any) => {
        common.sdCatchErr(error, this.errors).then(res => {
          this.errors = res;
        });
        flashService.Error("Error", "Error while Setting Banner Image");
      })
      .finally(() => {
        this.ui.PostLoading = false;
      });
  }

  protected documentUploaded(data: any) {
    if (data.file_type === "image/png" || "image/jpeg" || "image/jpg"){
      if (data.attraction_id) {
        this.AttractionList[this.AttractionIndex].image = data;
      } else {
        // console.log(data);
        this.ImageList.unshift(data);
        this.getAllItineraryList();
      }}
    // } else {
    //   alert('Not valid');
    // }
  }
  protected onUploadFile(uploadType: string, SelectedSegment: any) {
    // console.log(SelectedSegment);
    this.postdata.post_url = trekapi.AddSegmentImage();
    this.postdata.uploadType = uploadType;
    if (uploadType === "video") {
      this.titles.btn_title = "Upload Video";
      this.titles.browse_title = "Browse Video";
      this.titles.modal_title = "Upload Video";
    }
    if (uploadType === "image") {
      this.titles.btn_title = "Upload Image";
      this.titles.browse_title = "Browse Image";
      this.titles.modal_title = "Upload Image";
    }
    this.shouldfileupload = true;
    this.postdata.trek_id = Number(this.$route.query.id);
    this.postdata.segment_id = Number(this.SelectedSegment.SegmentId);

    // console.log(uploadType);
  }
  protected attractionUploaded(data: any) {
    this.AttractionImageList.unshift(data);
  }
  protected onUploadFileAttraction(
    uploadType: string,
    index: any,
    SelectedSegment: any
  ) {
    // console.log(SelectedSegment);
    this.AttractionIndex = index;
    this.postdata.post_url = trekapi.AddAttractionImage();
    this.postdataattraction.uploadType = uploadType;
    if (uploadType === "video") {
      this.titles.btn_title = "Upload Video";
      this.titles.browse_title = "Browse Video";
      this.titles.modal_title = "Upload Video";
    }
    if (uploadType === "image") {
      this.titles.btn_title = "Upload Image";
      this.titles.browse_title = "Browse Image";
      this.titles.modal_title = "Upload Image";
    }
    this.shouldfileupload = true;
    this.postdata.trek_id = Number(this.$route.query.id);
    this.postdata.segment_id = Number(this.SelectedSegment.SegmentId);
    this.postdata.attraction_id = Number(SelectedSegment.id);

    console.log(this.postdata.trek_id);
    console.log(this.postdata.segment_id);
    console.log(this.postdata.attraction_id);
  }
  public async closeUploadModal() {
    this.shouldfileupload = false;
  }
}
