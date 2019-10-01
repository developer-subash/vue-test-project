import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from '@/Pages/Admin/Modules/ManagePackage/tab/Gallery/Views/gallery.html';
import { trekService } from '@/Pages/Admin/Modules/ManagePackage/Services/Trekservice';
import { trekapi } from '@/Pages/Admin/Modules/ManagePackage/Services/Trekapi';
import { common } from '@/Pages/Admin/Modules/Common/Services/Common';

import { flashService } from '@/Pages/Admin/Modules/Common/Services/FlashMessage/FlashService';
import UploadFile from '@/Pages/Admin/Modules/Common/Controllers/UploadAny';


@WithRender
@Component({
  components: {
    UploadFile,
  },
})
export default class Gallery extends Vue {
  protected ui: any = {};
  protected errors: any = {};
  protected isError: boolean = false;
  protected Pricing: any = {};
  protected IsActive: boolean = false;
  protected ImageList: any = {};
  protected SelectedImage: any = {};
  protected SelectedIndex: any = {};
  protected ImageTitle: string = '';

  protected titles: any = {};
  protected limitdata: any = {};
  protected postdata: any = {};
  protected postdataattraction: any = {};
  protected shouldfileupload: boolean = false;
  protected checkTitle: boolean = false;
  protected InternetConnection: boolean = false;
  protected AddImgToList: any = {};

  constructor() {
    super();
    console.log(navigator.onLine);
    this.titles.btn_title = 'Upload Image';
    this.titles.modal_title = 'Upload Image';
    this.titles.browse_title = 'Browse Image File';
    this.titles.document_title = 'Title or description for the Upload Image';

    // for limitdata
    this.limitdata.extensions = 'jpg|jpeg|bmp|png';
    this.limitdata.maxSizeInMB = '1';
    this.limitdata.fileType = '';
    this.limitdata.invalidSizeMsg = 'Exceeded maximum File Upload  size 1 MB';
    this.limitdata.invalidFileTypeMsg = 'Only Jpeg, png files are supported';
    this.limitdata.titleRequiredMsg = 'Title field is required.';

    // for postdata
    this.postdata.post_url = '';
    this.checkTitle = true;
  }
  public get internetConnectivitystatus() {
    return navigator.onLine;
  }
  public mounted() {
    this.getAllImageList();
  }
  public async getAllImageList() {
    this.ui.IsLoading = true;
    let data = {
      trek_id: this.$route.query.id,
    };
    trekService
      .allImageList(data)
      .then((res: any) => {
        this.ImageList = res.data.data;
        this.ui.IsLoading = false;
      })
      .catch((error: any) => {
        common.sdCatchErr(error, this.errors)
        .then((res) => {
          this.errors = res;
        });
      })
      .finally(() => {
        this.ui.IsLoading = false;
      });
  }

  // set Banner image
  public setBannerImage(index: any, image: any) {
    // console.log("index", index);
    // console.log("image", image.id);
    this.errors = {};
    this.isError = false;

    // if (!this.IsValidationTrue()) return;
    let data = {
      trek_id: this.$route.query.id,
      id: image.id,
    };
    this.ui.PostLoading = true;
    trekService
    .makeBannerImage(data)
    .then((res: any) => {
      // this.Message = res.data.message;
      this.getAllImageList();
      flashService.Success("Banner Image Created", res.data.message);
    })
    .catch((error: any) => {
      // console.log("ERROR", error);
      common.sdCatchErr(error, this.errors),
      this.isError = true;
      common.sdCatchErr(error, this.errors).then(res => {
        this.errors = res;
        });
        // console.log(error);
      // flashService.Error("Error", "Error while deleting Gallery Image.");
    })
    .finally(() => {
      this.ui.PostLoading = false;
    });
  }


  public hidedeleteModal() {
    $("#deleteTrekImage").modal("hide");
    $(".modal-backdrop").remove();
    this.errors = {};
    this.isError = false;
  }
  // Delete Image
  protected deleteModal(index: any, Image: any) {
    $("#deleteTrekImage").modal("show");
    this.SelectedImage = Image;
    this.SelectedIndex = index;
  }

  protected deleteImage() {
    this.errors = {};
    this.isError = false;
    // if (!this.IsValidationTrue()) return;
    let data = {
      trek_id: this.$route.query.id,
      id: this.SelectedImage.id,
    };
    this.ui.PostLoading = true;
    trekService
    .deleteImage(data)
    .then((res: any) => {
      this.$delete(this.ImageList, this.SelectedIndex);
      flashService.Success("Image Deleted", res.data.message);
      this.hidedeleteModal();
      // this.Message = res.data.message;
    })
    .catch((error: any) => {
      this.isError = true;
      common.sdCatchErr(error, this.errors).then(res => {
        this.errors = res;
        });
        // console.log(error);
      // flashService.Error("Error", "Error while deleting Gallery Image.");
    })
    .finally(() => {
      this.ui.PostLoading = false;
    });
  }

  // Image upload Section
  protected documentUploaded(data: any) {
    console.log(data);
    if (data.file_type === "image/png" || "image/jpeg" || "image/jpg"){
      this.ImageList.unshift(data);
    } else {
      // alert();
    }
  }
  protected onUploadFile(uploadType: string) {
    // console.log(SelectedSegment);
    this.postdata.post_url = trekapi.AddGalleryImage();
    this.postdata.uploadType = uploadType;
    // if (uploadType === "video") {
    //   this.titles.btn_title = "Upload Video";
    //   this.titles.browse_title = "Browse Video";
    //   this.titles.modal_title = "Upload Video";
    // }
    if (uploadType === "image") {
      this.titles.btn_title = "Upload Image";
      this.titles.browse_title = "Browse Image";
      this.titles.modal_title = "Upload Image";
    }
    this.shouldfileupload = true;
    this.postdata.trek_id = this.$route.query.id.toString();
  }
  protected async closeUploadModal() {
    this.shouldfileupload = false;
  }

}
