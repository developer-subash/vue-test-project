import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import WithRender from "@/Pages/Admin/Modules/ManageUsers/Profile/OfficeDays/Views/office-days-profile.html";
import { common } from "@/Pages/Admin/Modules/Common/Services/Common";

import { trekService } from "@/Pages/Admin/Modules/ManagePackage/Services/Trekservice";

@WithRender
@Component({})
export default class OfficeDaysProfile extends Vue {
  private ui: any = {};
  private errors: any = {};
  private errorsMessage: any = {};
  private OfficeDays: any = {};
  private OfficeDayandHour: any = [];
  private OfficeDaywithHour: any = [];
  private isError: boolean = false;
  private statusLogo: boolean = false;
  private statusBanner: boolean = false;
  private DataFetched: boolean = false;
  private order = [ 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday' ];

  private Edit: any = {};
  private showEditField: boolean = false;

  private Time: any = {};
  constructor() {
    super();
    this.ui.IsLoading = false;
    this.ui.PostLoading = false;

    this.Time.Opening = "";
    this.Time.closing = "";

    this.OfficeDays.Sunday = false;
    this.OfficeDays.Monday = false;
    this.OfficeDays.Tuesday = false;
    this.OfficeDays.Wednesday = false;
    this.OfficeDays.Thursday = false;
    this.OfficeDays.Friday = false;
    this.OfficeDays.Saturday = false;
  }
  public created() {
    this.GetOfficeDaysandHour();
  }
  public checkday(day: any) {
    switch (day) {
      case "sunday": {
        if (this.OfficeDays.Sunday) {
          // console.log("VALUE", this.OfficeDays.Sunday);
          this.OfficeDaywithHour.push({
            day: "sunday",
            opening_time: "",
            closing_time: ""
          });
        } else {
          this.OfficeDaywithHour.filter((item: any, index: any) => {
            if (item.day === "sunday") {
              this.$delete(this.OfficeDaywithHour, index);
            }
          });
        }
        break;
      }
      case "monday": {
        if (this.OfficeDays.Monday) {
          // console.log("VALUE", this.OfficeDays.Monday);
          this.OfficeDaywithHour.push({
            day: "monday",
            opening_time: "",
            closing_time: ""
          });
        } else {
          this.OfficeDaywithHour.filter((item: any, index: any) => {
            if (item.day === "monday") {
              this.$delete(this.OfficeDaywithHour, index);
            }
          });
        }
        break;
      }
      case "tuesday": {
        if (this.OfficeDays.Tuesday) {
          // console.log("VALUE", this.OfficeDays.Tuesday);
          this.OfficeDaywithHour.push({
            day: "tuesday",
            opening_time: "",
            closing_time: ""
          });
        } else {
          this.OfficeDaywithHour.filter((item: any, index: any) => {
            if (item.day === "tuesday") {
              this.$delete(this.OfficeDaywithHour, index);
            }
          });
        }
        break;
      }
      case "wednesday": {
        if (this.OfficeDays.Wednesday) {
          // console.log("VALUE", this.OfficeDays.Wednesday);
          this.OfficeDaywithHour.push({
            day: "wednesday",
            opening_time: "",
            closing_time: ""
          });
        } else {
          this.OfficeDaywithHour.filter((item: any, index: any) => {
            if (item.day === "wednesday") {
              this.$delete(this.OfficeDaywithHour, index);
            }
          });
        }
        break;
      }
      case "thursday": {
        if (this.OfficeDays.Thursday) {
          // console.log("VALUE", this.OfficeDays.Thursday);
          this.OfficeDaywithHour.push({
            day: "thursday",
            opening_time: "",
            closing_time: ""
          });
        } else {
          this.OfficeDaywithHour.filter((item: any, index: any) => {
            if (item.day === "thursday") {
              this.$delete(this.OfficeDaywithHour, index);
            }
          });
        }
        break;
      }
      case "friday": {
        if (this.OfficeDays.Friday) {
          // console.log("VALUE", this.OfficeDays.Friday);
          this.OfficeDaywithHour.push({
            day: "friday",
            opening_time: "",
            closing_time: ""
          });
        } else {
          this.OfficeDaywithHour.filter((item: any, index: any) => {
            if (item.day === "friday") {
              this.$delete(this.OfficeDaywithHour, index);
            }
          });
        }
        break;
      }
      case "saturday": {
        if (this.OfficeDays.Friday) {
          // console.log("VALUE", this.OfficeDays.Saturday);
          this.OfficeDaywithHour.push({
            day: "saturday",
            opening_time: "",
            closing_time: ""
          });
        } else {
          this.OfficeDaywithHour.filter((item: any, index: any) => {
            if (item.day === "saturday") {
              this.$delete(this.OfficeDaywithHour, index);
            }
          });
        }
        break;
      }
      default: {
        console.log("Please select the day");
        break;
      }
    }
    this.mapOrder(this.OfficeDaywithHour, this.order, 'day');
    // console.log("Sorted Day", data);
  }
  // protected order = { sunday: 1, monday: 2, tuesday: 3, wednesday: 4, thursday: 5, friday: 6, saturday: 7 };
  // public sortDays() {

  // }
  public mapOrder(array: any, order: any, key: any) {
    array.sort((a: any, b: any) => {
      var A = a[key], B = b[key];
      if (order.indexOf(A) > order.indexOf(B)) {
        return 1;
      } else {
        return -1;
      }
    });
    return array;
  }

  public GetOfficeDaysandHour() {
    this.ui.IsLoading = true;
    trekService
      .getOfficeDays()
      .then((res: any) => {
        console.log("DATA", res.data.data);
        console.log("hello",res.data.data.office_days);

        this.OfficeDayandHour = res.data.data.office_days;
        if (res.data.data.days.sunday === 0) {
          this.OfficeDays.Sunday = false;
        } else {
          this.OfficeDays.Sunday = true;
        }
        if (res.data.data.days.monday === 0) {
          this.OfficeDays.Monday = false;
        } else {
          this.OfficeDays.Monday = true;
        }
        if (res.data.data.days.tuesday === 0) {
          this.OfficeDays.Tuesday = false;
        } else {
          this.OfficeDays.Tuesday = true;
        }
        if (res.data.data.days.wednesday === 0) {
          this.OfficeDays.Wednesday = false;
        } else {
          this.OfficeDays.Wednesday = true;
        }
        if (res.data.data.days.thursday === 0) {
          this.OfficeDays.Thursday = false;
        } else {
          this.OfficeDays.Thursday = true;
        }
        if (res.data.data.days.friday === 0) {
          this.OfficeDays.Friday = false;
        } else {
          this.OfficeDays.Friday = true;
        }
        if (res.data.data.days.saturday === 0) {
          this.OfficeDays.Saturday = false;
        } else {
          this.OfficeDays.Saturday = true;
        }
      })
      .catch((error: any) => {
        // console.log('ERROR', error);
        common.sdCatchErr(error, this.errors).then((res: any) => {
          this.isError = true;
          this.errors = res;
        });
      })
      .finally(() => {
        this.ui.IsLoading = false;
      });
  }
  protected async saveOfficeDaywithHour() {
    // this.ui.IsLoading = true;
    this.OfficeDaywithHour.forEach((item: any, index: any) => {
      // console.log("Office Hour Item", item);
      // console.log("Office Hour Item", item.opening_time);
      let openingTime = new Date(item.opening_time);
      let closingTime = new Date(item.closing_time);
      item.opening_time = '';
      item.closing_time = '';
      item.opening_time =  openingTime.toISOString().slice(11, 16);
      item.closing_time =  closingTime.toISOString().slice(11, 16);

    });
    let data = {
      office_days: this.OfficeDaywithHour,
    };
    trekService
      .saveOfficeDayandHour(data)
      .then((res: any) => {
        // console.log(this.PricingList);
      })
      .catch((error: any) => {
        // console.log('ERROR', error);
        common.sdCatchErr(error, this.errors).then((res: any) => {
          this.isError = true;
          this.errors = res;
        });
      })
      .finally(() => {
        this.ui.IsLoading = false;
      });
  }
}
