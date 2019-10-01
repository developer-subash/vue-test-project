import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from '@/Pages/Admin/Modules/ManagePackage/tab/General/Notes/Views/notes.html';
import { common } from '@/Pages/Admin/Modules/Common/Services/Common';
import ValidationError from '@/Pages/Admin/Modules/Common/Controllers/ValidationError';
import {trekService} from '@/Pages/Admin/Modules/ManagePackage/Services/Trekservice';
import GeneralStore from '@/Pages/Admin/Modules/ManagePackage/Store/General';

import { flashService } from '@/Pages/Admin/Modules/Common/Services/FlashMessage/FlashService';



@WithRender
@Component({
  components: {
      'validation-error': ValidationError,
  },
})
export default class Notes extends Vue {
  protected ui: any = {};
  protected errors: any = {};
  protected isError: boolean = false;

  protected ButtonStatus: boolean = false;

  protected NotesData: any = {};
  protected NotesList: any = {};


  constructor() {
    super();
    this.ui.IsLoading = false;
    this.ui.PostLoading = false;

    this.NotesData.CancellationInfo = '';
    this.NotesData.ExtraInfo = '';
  }
  // get getAllGeneralList(): any {
  //   return GeneralStore.GeneralTabBasic;
  // }
  public mounted() {
    this.GetNotesList();
    // this.NotesData.CancellationInfo = this.NotesList.cancellation_info;
    // this.NotesData.ExtraInfo = this.NotesList.extra_info;
  }
  public GetNotesList() {
    this.ui.IsLoading = true;
    let data = {
      trek_id: this.$route.query.id,
    };
    trekService.getNotes(data)
    .then((res: any) => {
      // console.log("GetAllGeneralTabData", res.data.data);
      this.NotesList = res.data.data;
      this.NotesData.CancellationInfo = this.NotesList.cancellation_info;
      this.NotesData.ExtraInfo = this.NotesList.extra_info;
      // this.MapData = res.data.data;
    })
    .catch((error: any) => {
        this.errors = error;
    })
    .finally(() => {
        this.ui.IsLoading = false;
    });
  }
  protected createNotes() {
    this.errors = {};
    this.isError = false;

    // if (!this.IsValidationTrue()) return;
    let data = {
      trek_id: this.$route.query.id,
      cancellation_info: this.NotesData.CancellationInfo,
      extra_info: this.NotesData.ExtraInfo,
    };
    this.ui.PostLoading = true;
    trekService
    .editNotesGeneral(data)
    .then((res: any) => {
      // console.log("response", res);
      flashService.Success('Notes Added', res.data.message);
      this.ButtonStatus = false;
    })
    .catch((error: any) => {
      common.sdCatchErr(error, this.errors)
        .then((res) => {
          this.errors = res;
        });
      flashService.Error('Error', 'Error while adding Pricing Rule');
    })
    .finally(() => {
      this.ui.PostLoading = false;
    });
  }
  public get buttonName() {
    if (this.ui.PostLoading) {
      return 'Processing...';
    }
    return 'Save';
  }
  // public IsValidationTrue() {
  //   if (!this.NotesData.CancellationInfo) {
  //       Object.assign(this.errors, { CancellationInfo: ['The Cancellation field is required.'] });
  //   }
  //   if (!this.NotesData.ExtraInfo) {
  //       Object.assign(this.errors, { ExtraInfo: ['The Extra info field is required.'] });
  //   }
  //   if (common.notEmpty(this.errors)) {
  //       this.isError = true;
  //       return false;
  //   } else
  //     return true;
  // }

  protected editPricingRule() {
    // alert();
    this.ButtonStatus = true;
  }
  protected cancelPricingRule() {
    this.ButtonStatus = false;
    // this.hideModal();
    this.errors = {};
    this.isError = false;
    this.GetNotesList();
  }

}
