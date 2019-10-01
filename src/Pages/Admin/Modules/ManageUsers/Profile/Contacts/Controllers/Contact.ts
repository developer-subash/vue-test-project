import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import WithRender from "@/Pages/Admin/Modules/ManageUsers/Profile/Contacts/Views/contact-profile.html";
import { common } from "@/Pages/Admin/Modules/Common/Services/Common";
import ValidationError from "@/Pages/Admin/Modules/Common/Controllers/ValidationError";


import { trekService } from '@/Pages/Admin/Modules/ManagePackage/Services/Trekservice';
import { flashService } from '@/Pages/Admin/Modules/Common/Services/FlashMessage/FlashService';

@WithRender
@Component({
  components: {
    "validation-error": ValidationError
  }
})
export default class ContactProfile extends Vue {
  private activeUser: any = {};
  private ui: any = {};
  private errors: any = {};
  private TempCompanyData: any = {};
  private errorsMessage: any = {};
  private isError: boolean = false;
  private statusLogo: boolean = false;
  private statusBanner: boolean = false;
  private DataFetched: boolean = false;
  private statusDisable: any = {};

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
    this.Edit.FirstName = "";
    this.Edit.LastName = "";
    this.Edit.CompanyName = "";
    this.Edit.CompanyAddressLine1 = "";
    this.Edit.CompanyAddressLine2 = "";
    this.Edit.CompanyCity = "";
    this.Edit.CompanyCountry = "";
    this.Edit.CompanyZip = "";
    this.Edit.CompanyContact1 = "";
    this.Edit.CompanyContact2 = "";
    this.Edit.CompanyContactPerson = "";
    this.Edit.CompanyPerson1 = "";
    this.Edit.CompanyPerson2 = "";
    this.Edit.CompanyPersonEmail = "";

    this.statusDisable.Edit = false;
    this.statusDisable.Save = false;
  }
  public created() {
    this.getUserInfo();
    // this.showEditData();
}
public getUserInfo() {
  if (this.DataFetched === false) {
        // this.activeUser = localStorage.getItem('current_business_user') ? common.CurrentLoggedBusinessUser() : '';
    trekService
    .userDataRetrieve()
    .then((res: any) => {
      console.log(res.data.data);
      this.activeUser = res.data.data;
      this.Edit.FirstName = res.data.data.firstname ? res.data.data.firstname : '';
      this.Edit.LastName = res.data.data.lastname ? res.data.data.lastname : '';
      this.Edit.CompanyName = res.data.data.company_name ? res.data.data.company_name : '';
      if (this.activeUser.accounts) {
        // console.log(this.activeUser.accounts);
        let array: Array<any> = [];
        this.activeUser.accounts.forEach((item: any) => {
            array.push(item);
            // console.log(item);
        });
        this.TempCompanyData = array[0];
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
  protected preventNonNumericalInput(event: any) {
    common.preventNonNumericalInput(event);
  }
  protected cancelEdit() {
    let companyInfo = this.TempCompanyData;
    let personalInfo = this.activeUser;

    this.Edit.FirstName = personalInfo.firstname;
    this.Edit.LastName = personalInfo.lastname;
    this.Edit.CompanyName = personalInfo.company_name;

    this.Edit.CompanyAddressLine1 = companyInfo.company_address_line1;
    this.Edit.CompanyAddressLine2 = companyInfo.company_address_line2;
    this.Edit.CompanyCity = companyInfo.company_city;
    this.Edit.CompanyCountry = companyInfo.company_country;
    this.Edit.CompanyZip = companyInfo.company_zip;
    this.Edit.CompanyContact1 = companyInfo.company_contact1;
    this.Edit.CompanyContact2 = companyInfo.company_contact2;
    this.Edit.CompanyContactPerson = companyInfo.company_contact_person;
    this.Edit.CompanyPerson1 = companyInfo.person_phone1;
    this.Edit.CompanyPerson2 = companyInfo.person_phone2;
    this.Edit.CompanyPersonEmail = companyInfo.person_email;

    // console.log("Data", companyInfo);
    this.errors = {};
    this.errorsMessage = {};
    this.isError = false;
    this.showEditField = false;
    this.statusDisable.Edit = false;
}
protected updateProfile() {
    this.errors = {};
    this.isError = false;
    this.ui.PostLoading = false;
    this.statusDisable.Save = true;
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
        // console.log(res.data.data);
        flashService.Success("Profile Updated", res.data.message);
        this.ui.PostLoading = false;
        // this.cancelEdit();
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
        this.statusDisable.Save = false;
        this.statusDisable.Edit = false;
        this.ui.PostLoading = false;
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
    // if (this.Edit.CompanyZip) {
    //   // alert("Entered ZIP");
    //   // console.log(this.Edit.CompanyZip);
    //   let url = this.Edit.CompanyZip;
    //   alert(url);
    //   if (url) {
    //     if (this.Edit.CompanyZip.test((/^[0-9]{3,6}$/)) != null) {
    //       // alert("OK");
    //       Object.assign(this.errors, { country_zip: ["Please enter valid zip code."] });
    //     // return true;
    //     }
    //   } else {
    //     Object.assign(this.errors, { country_zip: ["Please enter zip code."] });
    //   }
    // }
    if (common.notEmpty(this.errors)) {
      this.isError = true;
      return false;
    } else {
      return true;
    }
  }
  protected editContactProfile() {
    this.statusDisable.Edit = true;
  }
}
