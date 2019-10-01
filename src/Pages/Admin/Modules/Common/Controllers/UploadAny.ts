import { Vue, Component, Watch, Prop, Emit } from 'vue-property-decorator';
import WithRender from '@/Pages/Admin/Modules/Common/Views/upload-any.html';
import { trekService } from '@/Pages/Admin/Modules/ManagePackage/Services/Trekservice';
import { common } from '@/Pages/Admin/Modules/Common/Services/Common';
import Error from '@/Pages/Admin/Modules/Common/Controllers/ErrorMsg';
import ValidationError from '@/Pages/Admin/Modules/Common/Controllers/ValidationError';



@Component({
  components: {
    Error,
    'validation-error': ValidationError,
  },
})
@WithRender
export default class UploadAny extends Vue {
  @Prop(Object)
  postdata!: any;
  @Prop(Object)
  titles!: any;
  @Prop(Object)
  limitdata!: any;
  @Prop(Boolean)
  shouldfileupload!: boolean;
  @Prop(Boolean)
  checkTitle!: boolean;
  protected data: any = {};
  protected document: any = {};
  protected is_uploading: boolean = false;
  protected checkedvideourl: boolean = false;
  protected checkedimageurl: boolean = false;
  protected checkedtitle: boolean = false;
  protected videourl: string = "";
  protected ImageTitle: string = "";
  protected description: string = "";
  protected iserror: boolean = false;
  protected ImgData: string = '';
  protected validationerrors: any[] = [];
  protected errors: any = {};

  constructor() {
    super();
    this.document.extension = "";
    this.document.maxSizeInMB = 0;
    this.document.file_type = "";
    this.document.invalidSizeMsg = "";
    this.document.invalidFileTypeMsg = "";
    this.document.FileName = "";
    this.document.size = "";
    this.document.type = "";
    this.document.title = "";
    this.document.Base64Content = "";
    this.document.ContentType = "";
    this.document.isLoaded = "";
    this.document.postData = {};
  }
  mounted() {
    if (this.limitdata) {
      this.document.extension = this.limitdata.extensions;
      this.document.maxSizeInMB = this.limitdata.maxSizeInMB;
      this.document.file_type = this.limitdata.file_type;
      this.document.invalidSizeMsg = this.limitdata.invalidSizeMsg;
      this.document.invalidFileTypeMsg = this.limitdata.invalidFileTypeMsg;
      // console.log(this.document.postData);
    }
    if (this.shouldfileupload) $("#uploadDocumentModel").modal("show");
    else $("#uploadDocumentModel").modal("hide");
    if (this.checkTitle) {
      this.checkedtitle = this.checkTitle;
    }
  }
  async OnDocumentChange(event: any) {
    common.onFileUpload(event, this.document);
    $(".custom-file-label")
    .addClass("selected")
    .html(this.document.postData.name);
       var input = event.target;
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = (e: any) => {
                    this.ImgData = e.target.result;
                }
                reader.readAsDataURL(input.files[0]);
            }
  }
  async uploadFile(this: any) {
    this.errors = {};
    this.iserror = false;
    this.is_uploading = true;
    if(this.isInvalid()) return;
    this.document.hasTitle = false;
    if (this.document.FileName) {
      this.document.postdata.FileName = this.document.FileName;
    }
    if (this.postdata.uploadType == 'image' && this.checkedimageurl) {
      this.document.postData.post_url = this.postdata.post_url;
    }
    if (this.description) {
      this.document.postData.description = this.description;
    }
    if (this.postdata.ID) {
      this.document.postData.ID = this.postdata.ID;
    }
    if (this.postdata.trek_id) {
      this.document.postData.trek_id = this.postdata.trek_id;
    }
    if (this.postdata.ID) {
      this.document.postData.ID = this.postdata.ID;
    }
    if (this.postdata.segment_id) {
      this.document.postData.segment_id = this.postdata.segment_id;
    }
    if (this.postdata.attraction_id) {
      this.document.postData.attraction_id = this.postdata.attraction_id;
    }
    if (this.checkTitle) {
      this.document.postData.title = this.ImageTitle;
    }
    // console.log();
    // alert(this.document.postData.title);

    trekService
      .addGalleryImage(this.postdata.post_url, this.document.postData)
      .then((res: any) => {
        // alert();
        // res.data.result.size = this.document.postData.size;
        // res.data.result.ContentType = this.document.postData.ContentType;
        // console.log("UploadAny component", res.data.data);
        // const data = res.data.data;
        this.uploadedConfirm(res.data.data);
        // this.uploadedConfirm(data);
        // this.closeModal();
      })
      .catch((error: any) => {
        this.iserror = true;
        common.sdCatchErr(error, this.validationerrors).then(res => {
        this.validationerrors = res;
        });
        // // alert();
        // this.iserror = true;
        // common.sdCatchErr(error, this.validationerrors);
        // this.flashService.Error({
        //   message: 'File Upload Failed'
        // });
      })
      .finally(() => {
        this.is_uploading = false;
      });
  }
  @Emit('documentUploaded')
  public uploadedConfirm(data: any) {
    $('#uploadDocumentModel').modal('hide');
    this.closeModal();
    return data;
  }

  public isInvalid() {
    this.errors = {};
    this.iserror = false;
    if (!common.validateFileType(this.document)) {
      // this.errors.push(this.document.invalidFileTypeMsg);
      Object.assign(this.errors, {image_validate: [this.document.invalidFileTypeMsg]});
      // alert('validation from upload any');

    }
    if (!common.validateFileSize(this.document)) {
      Object.assign(this.errors, {image_validate: [this.document.invalidSizeMsg]});
      // alert('validation from upload any');
    }

    if (common.notEmpty(this.errors)) {
      this.iserror = true;
      this.is_uploading = false;
      return true;
    } else {
      return false;
    }
  }

  public removeUploadedFile(){
      $(".custom-file-label")
      .removeClass("selected")
      .text(this.titles.browse_title);
      this.ImgData = '';
      this.document.FileName = '';
      this.document.Base64Content = '';
      this.document.extensions = '';
      this.document.postData.name = '';
      this.errors = {};
      this.iserror = false;
  }

  @Emit('closeUploadModal')
  closeModal() {
    this.iserror = false;
    this.validationerrors = [];
    this.document.postData.post_url = '';
    this.description = '';
    $("#uploadDocumentModel").modal("hide");
    $(".custom-file-label")
      .removeClass("selected")
      .text(this.titles.browse_title);
  }
  public imgLoad(){
    // this.$refs.clipper.setTL$.next({left: 0, top: 0});
    // this.$refs.clipper.setTL$.next({right: 0, bottom: 0});
    // this.$refs.clipper.setWH$.next({width: 100, height: 0});
    // this.$refs.clipper.setTL$.next({ left: 50, top: 50 }) ; // percentage 0%
    // this.$refs.clipper.setWH$.next(0.6) ; // transform scale(0.6)

    // this.$refs.cliiper.onChange$.subscribe(() => {
    //   // This happens whenever zooming, moving and rotating occur.
    // });
  }
}
