import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/Pages/Admin/Store/index';
import { trekService } from '@/Pages/Admin/Modules/ManagePackage/Services/Trekservice';
import { Package } from '@/Pages/Admin/Modules/ManagePackage/model/packageList';

@Module({ name: 'Trek', namespaced: true, dynamic: true, store })
class Trek extends VuexModule {
    // States Defined Here
  protected AddTrekStatus: boolean = false;
  protected TrekListStatus: boolean = false;
  TreckList: object = [];

  protected Id: number = 0;
  protected AccountId: number = 0;

  protected LastPage: number = 0;

  // getters
  get TrekId() {
    return this.Id;
  }
  get TrekAccountId() {
    return this.AccountId;
  }

  // Post Add Trek
  @Mutation
  public CREATE_TREK(data: any) {
    this.AccountId = data.data.data.account_id;
    this.Id = data.data.data.id;
    this.AddTrekStatus = true;
  }

  @Action
  public async AddTrek(payLoad: object): Promise<any> {
    return await new Promise((resolve, reject) => {
      trekService
        .AddTrek(payLoad)
        .then((res: any) => {
          this.context.commit('CREATE_TREK', res);
          //  console.log("from Store",res);
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  // Package List
  @Mutation
  public TREK_LIST(data: any) {
    // console.log("Data from Mutation", data.data.data);
    this.TrekListStatus =  true;
    this.LastPage = data.data.data.last_page;
    this.TreckList = data.data.data.data;
  }

  @Action
  public async GetTrekList(payLoad: object): Promise<any> {
    return await new Promise((resolve, reject) => {
      trekService
        .PackageList(payLoad)
        .then((res: any) => {
          this.context.commit("TREK_LIST", res);
          // console.log("from store action" ,res.data.data);
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

}

export default getModule(Trek);
