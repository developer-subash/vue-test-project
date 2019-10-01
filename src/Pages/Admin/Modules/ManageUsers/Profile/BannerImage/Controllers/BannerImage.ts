
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from '@/Pages/Admin/Modules/ManageUsers/Profile/BannerImage/Views/banner-image-profile.html';
import { common } from '@/Pages/Admin/Modules/Common/Services/Common';

import { trekapi } from '@/Pages/Admin/Modules/ManagePackage/Services/Trekapi';
import { trekService } from '@/Pages/Admin/Modules/ManagePackage/Services/Trekservice';

import ValidationError from '@/Pages/Admin/Modules/Common/Controllers/ValidationError';
import UploadFile from '@/Pages/Admin/Modules/Common/Controllers/UploadAny';


import { flashService } from '@/Pages/Admin/Modules/Common/Services/FlashMessage/FlashService';


@WithRender
@Component({
  components: {
    UploadFile,
  "validation-error": ValidationError
}
  })
export default class BannerImageProfile extends Vue {
  private activeUser: any = {};
    private ui: any = {};
    private errors: any = {};
    private TempCompanyData: any = {};
    private errorsMessage: any = {};
    private isError: boolean = false;
    private statusLogo: boolean = false;
    private statusBanner: boolean = false;
    private DataFetched: boolean = false;

    private Edit: any = {};
    private showEditField: boolean = false;

    private titles: any = {};
    private limitdata: any = {};
    private postdata: any = {};
    private postdatabanner: any = {};
    private shouldfileupload: boolean = false;
    protected checkTitle: boolean = false;
    constructor() {
        super();
        this.activeUser = {};

        this.Edit.FirstName = '';
        this.Edit.LastName = '';
        this.Edit.CompanyName = '';
        this.Edit.CompanyAddressLine1 = '';
        this.Edit.CompanyAddressLine2 = '';
        this.Edit.CompanyCity = '';
        this.Edit.CompanyCountry = '';
        this.Edit.CompanyZip = '';
        this.Edit.CompanyContact1 = '';
        this.Edit.CompanyContact2 = '';
        this.Edit.CompanyContactPerson = '';
        this.Edit.CompanyPerson1 = '';
        this.Edit.CompanyPerson2 = '';
        this.Edit.CompanyPersonEmail = '';

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
        this.postdata.type = "";
        this.checkTitle = false;
      }
    public created() {
        this.getUserInfo();
    }
    public getUserInfo() {
      if (this.DataFetched === false) {
            // this.activeUser = localStorage.getItem('current_business_user') ? common.CurrentLoggedBusinessUser() : '';
        trekService
        .userDataRetrieve()
        .then((res: any) => {
          // console.log(res.data.data);
          this.activeUser = res.data.data;
          if (this.activeUser.accounts) {
            // console.log(this.activeUser.accounts);
            let array: Array<any> = [];
            this.activeUser.accounts.forEach((item: any) => {
                array.push(item);
                // console.log(item);
            });
            this.TempCompanyData = array[0];
            // console.log(this.TempCompanyData);
        }
          // console.log(this.activeUser);
        })
        .catch((error: any) => {
          this.errors = error;
        })
        .finally(() => {
          this.ui.IsLoading = false;
        });
        // this.tempData();
          this.DataFetched = true;
      }
    }
    // public tempData() {
    //   console.log(this.activeUser);
      
    // }
    public showEditData() {
        this.errors = {};
        this.errorsMessage = {};
        this.isError = false;
        this.showEditField = true;
        this.Edit.FirstName = this.activeUser.firstname ? this.activeUser.firstname : '';
        this.Edit.LastName = this.activeUser.lastname ? this.activeUser.lastname : '';
        this.Edit.CompanyName = this.TempCompanyData.company_name ? this.TempCompanyData.company_name : '';
        this.Edit.CompanyAddressLine1 = this.TempCompanyData.company_address_line1 ? this.TempCompanyData.company_address_line1 : '';
        this.Edit.CompanyAddressLine2 = this.TempCompanyData.company_address_line2 ? this.TempCompanyData.company_address_line2: '';
        this.Edit.CompanyCity = this.TempCompanyData.company_city ? this.TempCompanyData.company_city : '';
        this.Edit.CompanyCountry = this.TempCompanyData.company_country ? this.TempCompanyData.company_country : '';
        this.Edit.CompanyZip = this.TempCompanyData.company_zip ? this.TempCompanyData.company_zip : '';
        this.Edit.CompanyContact1 = this.TempCompanyData.company_contact1 ? this.TempCompanyData.company_contact1 : '';
        this.Edit.CompanyContact2 = this.TempCompanyData.company_contact2 ? this.TempCompanyData.company_contact2 : '';
        this.Edit.CompanyContactPerson = this.TempCompanyData.company_contact_person ? this.TempCompanyData.company_contact_person : '';
        this.Edit.CompanyPerson1 = this.TempCompanyData.person_phone1 ? this.TempCompanyData.person_phone1 : '';
        this.Edit.CompanyPerson2 = this.TempCompanyData.person_phone2 ? this.TempCompanyData.person_phone2 : '';
        this.Edit.CompanyPersonEmail = this.TempCompanyData.person_email ? this.TempCompanyData.person_email : '';
    }
    public cancelEdit() {
        this.errors = {};
        this.errorsMessage = {};
        this.isError = false;
        this.showEditField = false;
    }
    protected updateProfile() {
        this.errors = {};
        this.isError = false;
        this.ui.PostLoading = false;
        if (!this.IsValidationSegmentTrue()) {
          return;
        }
        let data = {
            firstname : this.Edit.FirstName,
            lastname : this.Edit.LastName,
            company_name : this.Edit.CompanyName,
            company_address_line1 : this.Edit.CompanyAddressLine1,
            company_address_line2 : this.Edit.CompanyAddressLine2,
            company_city : this.Edit.CompanyCity,
            company_country : this.Edit.CompanyCountry,
            company_zip : this.Edit.CompanyZip,
            company_contact1 : this.Edit.CompanyContact1,
            company_contact2 : this.Edit.CompanyContact2,
            company_contact_person : this.Edit.CompanyContactPerson,
            person_phone1 : this.Edit.CompanyPerson1,
            person_phone2 : this.Edit.CompanyPerson2,
            person_email : this.Edit.CompanyPersonEmail,
        };
        this.ui.PostLoading = true;
        trekService
          .updateProfileDetail(data)
          .then((res: any) => {
            console.log(res.data.data);
            flashService.Success("Profile Updated", res.data.message);
            this.ui.PostLoading = false;
            this.cancelEdit();
            this.activeUser = res.data.data;
            if (this.activeUser.accounts) {
                // console.log(this.activeUser.accounts);
                let array: Array<any> = [];
                this.activeUser.accounts.forEach((item: any) => {
                    array.push(item);
                    // console.log(item);
                });
                this.TempCompanyData = array[0];
                // console.log(this.TempCompanyData);
            }
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
      protected preventNonNumericalInput(event: any) {
        common.preventNonNumericalInput(event);
      }
      protected IsValidationSegmentTrue() {
        if (!this.Edit.FirstName) {
          Object.assign(this.errors, {
            first_name: ["The first name field is required."]
          });
        }
        if (this.Edit.FirstName) {
          // alert("Entered ZIP");
          let country = this.Edit.FirstName;
          if (country) {
            if (country.match(/^[a-z]+$/i) !== null) {
              // alert("OK");
            // return true;
            } else {
              // alert("WORNG FORMAT");
                Object.assign(this.errors, { first_name: ["Please enter valid first name."] });
              // return false;
            }
          }
       }
        if (!this.Edit.LastName) {
          Object.assign(this.errors, {
            last_name: ["The last name field is required."]
          });
        }
        if (this.Edit.LastName) {
          // alert("Entered ZIP");
          let country = this.Edit.LastName;
          if (country) {
            if (country.match(/^[a-z]+$/i) !== null) {
              // alert("OK");
            // return true;
            } else {
              // alert("WORNG FORMAT");
                Object.assign(this.errors, { last_name: ["Please enter valid last name."] });
              // return false;
            }
          }
       }
        if (!this.Edit.CompanyName) {
          Object.assign(this.errors, {
            company_name: ["The company name field is required."]
          });
        }
        if (this.Edit.CompanyCountry) {
           // alert("Entered ZIP");
           let country = this.Edit.CompanyCountry;
           if (country) {
             if (country.match(/^[a-z]+$/i) !== null) {
               // alert("OK");
             // return true;
             } else {
               // alert("WORNG FORMAT");
                 Object.assign(this.errors, { country_name: ["Please enter valid country name."] });
               // return false;
             }
           }
        }
        if (this.Edit.CompanyPersonEmail) {
          // alert("Entered ZIP");
          let country = this.Edit.CompanyPersonEmail;
          if (country) {
            if (country.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) !== null) {
              // alert("OK");
            // return true;
            } else {
              // alert("WORNG FORMAT");
                Object.assign(this.errors, { email: ["Please enter valid email address."] });
              // return false;
            }
          }
       }
        if (this.Edit.CompanyZip) {
          // alert("Entered ZIP");
          console.log(this.Edit.CompanyZip);
          let url = this.Edit.CompanyZip;
          alert(url);
          if (url) {
            if (url.match((/^[0-9]{3,6}$/)) !== null) {
              // alert("OK");
            // return true;
            } else {
              // alert("WORNG FORMAT");
                Object.assign(this.errors, { country_zip: ["Please enter valid zip code."] });
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

      protected documentUploaded(data: any) {
          if (this.statusLogo === true) {
            if (data.file_type === "image/png" || "image/jpeg" || "image/jpg"){
                // this.TempCompanyData.banner_path
                let array: Array<any> = [];
                data.accounts.forEach((item: any) => {
                        array.push(item);
                });
                // console.log("from inside array", array[0]);
                // console.log("from inside array", array[0].banner_path);
                // this.TempCompanyData.banner_path = array[0].banner_path;
                // this.TempCompanyData.banner_path = array[0].logo_path;
                this.$set(this.activeUser.accounts, '0', array[0]);
                // this.activeUser.accounts[0].logo_path = array[0].logo_path;
                // console.log(this.activeUser.accounts);
                this.statusLogo = false;
                // alert("Logo");
            }
          }
          if (this.statusBanner === true) {
            if (data.file_type === "image/png" || "image/jpeg" || "image/jpg"){
                // this.TempCompanyData.banner_path
                let array: Array<any> = [];
                data.accounts.forEach((item: any) => {
                        array.push(item);
                });
                // console.log("from inside array", array[0]);
                // console.log("from inside array", array[0].banner_path);
                this.$set(this.activeUser.accounts, '0', array[0]);
                let abc: Array<any> = [];
                this.activeUser.accounts.forEach((item: any) => {
                    abc.push(item);
                });
                // console.log(abc[0]);
                this.TempCompanyData = abc[0];
                // this.TempCompanyData.banner_path = array[0].banner_path;
                this.statusBanner = false;
                // alert("Banner");
                // this.TempCompanyData.banner_path = array[0].logo_path;
            }
        }
        // } else {
        //   alert('Not valid');
        // }
      }
      protected onUploadFileLogo(uploadType: string) {
        //   alert();
        console.log("Logo");
        this.statusLogo = true;
        this.postdata.post_url = trekapi.updateLogoImage();
        // this.postdata.type = 'company_banner';
        this.postdata.uploadType = uploadType;
        // if (uploadType === "video") {
        //   this.titles.btn_title = "Upload Video";
        //   this.titles.browse_title = "Browse Video";
        //   this.titles.modal_title = "Upload Video";
        // }
        if (uploadType === "image") {
          this.titles.btn_title = "Upload Image";
          this.titles.browse_title = "Browse Image";
          this.titles.modal_title = "Upload Company Logo";
        }
        this.shouldfileupload = true;
        // this.postdata.trek_id = Number(this.$route.query.id);
        // console.log(uploadType);
      }
      protected attractionUploaded(data: any) {
        //   console.log(data);
        // this.AttractionImageList.unshift(data);
      }
      protected onUploadFileBanner(uploadType: string) {
        // console.log("Banner Image");
        this.statusBanner = true;
        this.postdata.post_url = trekapi.updateBannerImage();
        this.postdatabanner.uploadType = uploadType;
        // this.postdata.type = 'company_logo';
        // if (uploadType === "video") {
        //   this.titles.btn_title = "Upload Video";
        //   this.titles.browse_title = "Browse Video";
        //   this.titles.modal_title = "Upload Video";
        // }
        if (uploadType === "image") {
          this.titles.btn_title = "Upload Image";
          this.titles.browse_title = "Browse Image";
          this.titles.modal_title = "Upload Company Banner Image";
        }
        this.shouldfileupload = true;
        // this.postdata.trek_id = Number(this.$route.query.id);
        // console.log(this.postdata.trek_id);
        // console.log(this.postdata.segment_id);
        // console.log(this.postdata.attraction_id);
      }
      protected test:any='';
      protected RequestBasePriceList: any = [ {id: '1-500', name: '$1 - $500'},
                                          {id: '500-1000', name: '$500 - $1000'},
                                          {id: '1000-1500', name: '$1000 - $1500'},
                                          {id: '1500-2000', name: '$1500 - $2000'}];
      public async closeUploadModal() {
        this.shouldfileupload = false;
      }
}
