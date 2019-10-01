import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from '@/Pages/Admin/Modules/ManageUsers/Profile/About/Views/about-profile.html';
import { common } from '@/Pages/Admin/Modules/Common/Services/Common';

import { trekService } from '@/Pages/Admin/Modules/ManagePackage/Services/Trekservice';

@WithRender
@Component({})
export default class AboutProfile extends Vue {
  private ui: any = {};
  private errors: any = {};
  private statusDisable: any = {};
  private TabContent: any = [];
  private SelectedTab: any = {};
  private SelectedIndex: any = {};
  private Description: any = '';
  private DataFetched: boolean = false;
  private StatusDisable: boolean = false;
  constructor() {
    super();
    this.ui.IsLoading = false;
    this.ui.PostLoading = false;

    this.SelectedTab = 0;
    this.SelectedIndex = 0;
  }
  public created() {
    this.getContent();
  }
public getContent() {
  if (this.DataFetched === false) {
    trekService
    .getAccountContent()
    .then((res: any) => {
      console.log(res.data.data);
      this.TabContent = res.data.data;
      this.SelectedTab = this.TabContent[0].id;
      this.getAboutContent();
      // this.SelectedTab = this.TabContent[0];
    //   res.data.data.forEach((item: any) => {
    //     console.log("Tab Content", item);
    // });
      this.DataFetched = true;

    })
    .catch((error: any) => {
      this.errors = error;
    })
    .finally(() => {
      this.ui.IsLoading = false;
    });
    // this.tempData();
  }
}
public getAboutContent() {
  // if (this.DataFetched === false) {
    let data = {
      id : this.SelectedTab,
      // description : this.Description,
    };
    trekService
    .addAccountContentRetrieve(data)
    .then((res: any) => {
      console.log("Content here", res.data.data);
      this.Description = res.data.data.description;
    //   this.TabContent = res.data.data;
    //   this.SelectedTab = this.TabContent[0].id;
    //   // this.SelectedTab = this.TabContent[0];
    // //   res.data.data.forEach((item: any) => {
    // //     console.log("Tab Content", item);
    // // });
      this.DataFetched = true;

    })
    .catch((error: any) => {
      this.errors = error;
    })
    .finally(() => {
      this.ui.IsLoading = false;
    });
    // this.tempData();
  // }
}
protected selectedContent(content: any, index: any) {
  this.SelectedIndex = index;
  this.SelectedTab = content.id;
  this.getAboutContent();



  // trekService
  // .getAccountContent()
  // .then((res: any) => {
  //   console.log(res.data.data);
  //   this.TabContent = res.data.data;
  //   // this.SelectedTab = this.TabContent[0].id;
  //   res.data.data.forEach((item: any) => {
  //     console.log("Tab Content", item);
  // });
  //   this.DataFetched = true;

  // })
  // .catch((error: any) => {
  //   this.errors = error;
  // })
  // .finally(() => {
  //   this.ui.IsLoading = false;
  // });
  // // this.tempData();
}
protected saveSelectedContent() {
  let data = {
    content_id : this.SelectedTab,
    description : this.Description,
  };
  trekService
  .addAccountContent(data)
  .then((res: any) => {
    console.log(res);
    this.DataFetched = true;

  })
  .catch((error: any) => {
    this.errors = error;
  })
  .finally(() => {
    this.ui.IsLoading = false;
  });
  // this.tempData();
}
protected editSelectedContent() {
  this.StatusDisable = true;
}
}
