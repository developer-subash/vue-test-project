import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/Pages/Admin/Store/index';
import { trekService } from '@/Pages/Admin/Modules/ManagePackage/Services/Trekservice';


@Module({ name: 'General', namespaced: true, dynamic: true, store })
class General extends VuexModule {
  public GeneralTabBasic: any = [];
  public TourTypeList: any = [];
  public DifficultyLevelList: any = [];
  public PricingBasis: any = [];
  public Seasons: any = [];
  public Icons: any = [];
  public HighlightList: any = [];
  public UserInfromationList: any = [];
  public UserDetail: any = [];
  // public DestinationList: any = [];


  @Mutation
  public GET_GENERAL_TAB_BASIC_DATA(data: any) {
    // console.log("Data from Mutation", data.data.data);
    this.GeneralTabBasic = data.data.data;
  }

  @Action
  public async GetPackageTitle(payLoad: object): Promise<any> {
    return await new Promise((resolve, reject) => {
      trekService
        .getGeneralTabData(payLoad)
        .then((res: any) => {
          this.context.commit('GET_GENERAL_TAB_BASIC_DATA', res);
          // console.log("from store action" ,res.data.data);
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  @Mutation
  public POST_GENERAL_TAB_BASIC_DATA(data: any) {
    // console.log("Data from Mutation", data.data.data);
    this.GeneralTabBasic = data;
  }

  @Action
  public async UpdatePackageTitle(payLoad: object): Promise<any> {
    return await new Promise((resolve, reject) => {
          this.context.commit('POST_GENERAL_TAB_BASIC_DATA', payLoad);
          // console.log("from store action" ,res.data.data);
    });
  }
  @Mutation
  public GET_TOUR_TYPE_LIST(data: any) {
    // console.log("Data from Mutation", data.data.data);
    this.TourTypeList = data.data.data;
  }

  @Action
  public async GetTourTypeList(): Promise<any> {
    return await new Promise((resolve, reject) => {
      trekService
        .getTourTypeList()
        .then((res: any) => {
          this.context.commit('GET_TOUR_TYPE_LIST', res);
          // console.log("from store action" ,res.data.data);
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  @Mutation
  public GET_DIFFICULTY_LEVEL_LIST(data: any) {
    // console.log("Data from Mutation", data.data.data);
    this.DifficultyLevelList = data.data.data;
  }

  @Action
  public async GetDifficultyLevelList(): Promise<any> {
    return await new Promise((resolve, reject) => {
      trekService
        .getDifficultyLevelList()
        .then((res: any) => {
          this.context.commit('GET_DIFFICULTY_LEVEL_LIST', res);
          // console.log("from store action" ,res.data.data);
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  @Mutation
  public GET_PRICING_BASIS(data: any) {
    // console.log("Data from Mutation", data.data.data);
    this.PricingBasis = data.data.data;
  }

  @Action
  public async GetPricingBasis(): Promise<any> {
    return await new Promise((resolve, reject) => {
      trekService
        .getPricingBasis()
        .then((res: any) => {
          this.context.commit('GET_PRICING_BASIS', res);
          // console.log("from store action" ,res.data.data);
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  @Mutation
  public GET_ALL_SEASONS(data: any) {
    // console.log("Data from Mutation", data.data.data);
    this.Seasons = data.data.data;
  }

  @Action
  public async GetSeasons(): Promise<any> {
    return await new Promise((resolve, reject) => {
      trekService
        .getSeasons()
        .then((res: any) => {
          this.context.commit('GET_ALL_SEASONS', res);
          // console.log("from store action" ,res.data.data);
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  @Mutation
  public GET_ALL_ICONS(data: any) {
    // console.log("Data from Mutation", data.data.data);
    this.Icons = data.data.data;
  }

  @Action
  public async GetIconsList(): Promise<any> {
    return await new Promise((resolve, reject) => {
      trekService
        .getIconsList()
        .then((res: any) => {
          this.context.commit('GET_ALL_ICONS', res);
          // console.log("from store action" ,res.data.data);
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  @Mutation
  public GET_ALL_HIGHLIGHT_LIST(data: any) {
    // console.log("Data from Mutation", data.data.data);
    this.HighlightList = data.data.data;
  }

  @Action
  public async GetHighlightList(payLoad: any): Promise<any> {
    return await new Promise((resolve, reject) => {
      trekService
        .getHighlightList(payLoad)
        .then((res: any) => {
          this.context.commit('GET_ALL_HIGHLIGHT_LIST', res);
          // console.log("from store action" ,res.data.data);
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  // User
  @Mutation
  public USER_INFORMATION(data: any) {
    // console.log("Data from Mutation", data.data.data);
    this.UserInfromationList = data;
  }

  @Action
  public async UserInformation(payLoad: object): Promise<any> {
    return await new Promise((resolve, reject) => {
          this.context.commit('USER_INFORMATION', payLoad);
          // console.log("from store action" ,res.data.data);
    });
  }

  //User Detils
  @Mutation
  public GET_USER_DETAIL(data: any) {
    // console.log("Data from Mutation", data.data.data);
    this.UserDetail = data;
  }

  @Action
  public async UserDetailList(payLoad: object): Promise<any> {
    return await new Promise((resolve, reject) => {
          this.context.commit('GET_USER_DETAIL', payLoad);
          // console.log("from store action" ,res.data.data);
    });
  }
  // @Mutation
  // public GET_ALL_DESTINATION_LIST(data: any) {
  //   // console.log("Data from Mutation", data.data.data);
  //   this.DestinationList = data.data.data;
  // }

  // @Action
  // public async GetDestinationList(): Promise<any> {
  //   return await new Promise((resolve, reject) => {
  //     trekService
  //       .getDestinationList()
  //       .then((res: any) => {
  //         this.context.commit('GET_ALL_DESTINATION_LIST', res);
  //         // console.log("from store action" ,res.data.data);
  //         resolve(res);
  //       })
  //       .catch((error: any) => {
  //         reject(error);
  //       });
  //   });
  // }

  // @Mutation
  // public PUT_GENERAL(data: any) {
  //   // console.log("Data from Mutation", data.data.data);
  //   this.PutGeneralStatus =  true;
  // }

  // @Action
  // public async PutGeneral(payLoad: object): Promise<any> {
  //   return await new Promise((resolve, reject) => {
  //     trekService
  //       .PutGeneral(payLoad)
  //       .then((res: any) => {
  //         this.context.commit('PUT_GENERAL', res);
  //         // console.log("from store action" ,res.data.data);
  //         resolve(res);
  //       })
  //       .catch((error: any) => {
  //         reject(error);
  //       });
  //   });
  // }

}

export default getModule(General);
