import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import WithRender from "@/Pages/Admin/Modules/ManageUsers/Profile/SocialAccounts/Views/social-accounts-profile.html";
import { common } from "@/Pages/Admin/Modules/Common/Services/Common";
import { trekService } from "@/Pages/Admin/Modules/ManagePackage/Services/Trekservice";

@WithRender
@Component({})
export default class SocialAccountsProfile extends Vue {
  private ui: any = {};
  private errors: any = {};
  private errorsMessage: any = {};
  private isError: boolean = false;
  private statusLogo: boolean = false;
  private DataFetched: boolean = false;

  private Edit: any = {};
  private showEditField: boolean = false;

  private ErrorsSocialAccount: any = [];

  private SocialMediaList: any = [];
  private SocialMediaIconLists: any = [];
  private SocialMedia: any = {};
  private limitdata: any = {};
  private postdata: any = {};
  private postdatabanner: any = {};
  private shouldfileupload: boolean = false;
  private SaveDisable: boolean = false;
  private StatusDisable: any = {};
  constructor() {
    super();
    this.SocialMedia.Icon = {};
    this.SocialMedia.Link = "";

    this.ui.IsLoading = false;
    this.ui.PostLoading = false;

    this.StatusDisable.delete = false;
    this.StatusDisable.EditSocialMedia = false;

    this.Edit.Social = {};
    this.Edit.Icon = {};
    this.Edit.Link = '';
  }
  public created() {
    this.getAllSocialMediaIconList();
    this.getAllListOfSocialMediaIcon();
  }
  public customLabel(name: any) {
    return name;
  }
  public async getAllSocialMediaIconList() {
    if (!this.DataFetched) {
      this.ui.IsLoading = true;
      trekService
        .getSocialMedia()
        .then((res: any) => {
          // console.log("Response", res.data.data);
          // res.data.data.filter((segment: any) => {
          //   segment.IsActive = false;
          // });
          this.SocialMediaList = res.data.data;
          this.DataFetched = true;
          // console.log(this.ItineraryList);
        })
        .catch((error: any) => {
          this.errors = error;
        })
        .finally(() => {
          this.ui.IsLoading = false;
        });
    }
  }
  public async getAllListOfSocialMediaIcon() {
    this.ui.IsLoading = true;
    let data = {};
    trekService
      .getSocialMediaList(data)
      .then((res: any) => {
        // console.log("Response", res.data.data);
        res.data.data.filter((icon: any) => {
          icon.IsActive = false;
        });
        this.SocialMediaIconLists = res.data.data;
        this.DataFetched = true;
        // console.log(this.ItineraryList);
      })
      .catch((error: any) => {
        this.errors = error;
      })
      .finally(() => {
        this.ui.IsLoading = false;
      });
  }
  // clear social account inputs
  public clearSocialAccount() {
    this.SocialMedia.Link = '';
    this.SocialMedia.Icon = {};
  }
  // save the social account
  public async saveSocialAccount() {
    // alert();
    this.SaveDisable = true;
    this.ui.PostLoading = true;
    let data = {
      social_media_id : this.SocialMedia.Icon.id,
      link : this.SocialMedia.Link,
    };
    trekService
      .postSocialMediaAccount(data)
      .then((res: any) => {
        console.log("Response", res.data.data);
        // res.data.data.filter((segment: any) => {
        //   segment.IsActive = false;
        // });
        this.SocialMediaIconLists.unshift(res.data.data);
        // this.SocialMediaIconLists = res.data.data;
        this.DataFetched = true;
        this.ui.PostLoading = false;
        this.clearSocialAccount();
        this.SaveDisable = false;
      })
      .catch((error: any) => {
        common.sdCatchErr(error, this.ErrorsSocialAccount).then(res => {
          this.ErrorsSocialAccount = res;
        });
        // flashService.Error("Error", "Error while adding Segment.");
      })
      .finally(() => {
        this.ui.PostLoading = false;
      });
  }
  // delete the social account
  public async deleteSocialAccount(social: any, index: any) {
    console.log("Delete", social.id);
    // alert();
    this.StatusDisable.delete = true;
    this.ui.PostLoading = true;
    let data = {
      // social_media_id : this.SocialMedia.Icon.id,
      id : social.id,
      // link : this.SocialMedia.Link,
    };
    trekService
      .deleteSocialMedia(data)
      .then((res: any) => {
        this.$delete(this.SocialMediaIconLists, index);
        this.ui.PostLoading = false;
        this.StatusDisable.delete = false;
      })
      .catch((error: any) => {
        common.sdCatchErr(error, this.ErrorsSocialAccount).then(res => {
          this.ErrorsSocialAccount = res;
        });
        // flashService.Error("Error", "Error while adding Segment.");
      })
      .finally(() => {
        this.ui.PostLoading = false;
      });
  }
  //  edit the social account
  public async editSocialAccount(social: any, index: any) {
    social.IsActive = true;
    this.StatusDisable.EditSocialMedia = true;
    console.log(social);
    // console.log(index);
    this.Edit.Social = social;
    this.Edit.Id = social.id;
    this.Edit.Index = index;
    this.Edit.Icon = social.social_media;
    this.Edit.Link = social.link;
  }
  public clearSocialAccountInputs() {
    this.Edit.Social = {};
    this.Edit.Id = '';
    this.Edit.Index = '';
    this.Edit.Icon = {};
    this.Edit.Link = '';
  }
  public async cancelEditedSocialAccount(social: any, index: any) {
    social.IsActive = false;
    this.StatusDisable.EditSocialMedia = false;
    this.$set(this.SocialMediaIconLists, index, this.Edit.Social);
  }
  public async saveEditedSocialAccount(social: any) {
    let data = {
      social_media_id : this.Edit.Icon.id,
      id : this.Edit.Id,
      link : this.Edit.Link,
    };
    trekService
      .editSocialMedia(data)
      .then((res: any) => {
        this.ui.PostLoading = false;
        this.$set(this.SocialMediaIconLists, this.Edit.Index, res.data.data);
        this.StatusDisable.EditSocialMedia = false;
        social.IsActive = false;
        this.clearSocialAccountInputs();
      })
      .catch((error: any) => {
        common.sdCatchErr(error, this.ErrorsSocialAccount).then(res => {
          this.ErrorsSocialAccount = res;
        });
        // flashService.Error("Error", "Error while adding Segment.");
      })
      .finally(() => {
        this.ui.PostLoading = false;
      });
  }
}
