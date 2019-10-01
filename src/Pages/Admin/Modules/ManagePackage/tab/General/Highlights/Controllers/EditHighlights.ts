import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from '@/Pages/Admin/Modules/ManagePackage/tab/General/Highlights/Views/edit-highlights.html';
import {trekService} from '@/Pages/Admin/Modules/ManagePackage/Services/Trekservice';
import GeneralModule from '@/Pages/Admin/Modules/ManagePackage/Store/General';
import { common } from '@/Pages/Admin/Modules/Common/Services/Common';
import ValidationError from '@/Pages/Admin/Modules/Common/Controllers/ValidationError';

@WithRender
@Component({
  components: {
      'validation-error': ValidationError,
  },
})
export default class Highlights extends Vue {
  protected ui: any = {};
  protected errors: any = {};
  protected isError: boolean = false;
  protected HighlightsData: any = {};

  @Prop(Boolean)
  shouldEditHighlight!: boolean;

  @Prop(Array)
  activeHighlight!:  {};

  constructor() {
    super();
    this.HighlightsData.IconId = '';
    this.HighlightsData.Description = '';

  }

  // @Emit("closeDeleteModal")
  // public hideModal() {
  //   this.isError = false;
  //   this.HighlightsData.IconId = '';
  //   this.HighlightsData.Description = '';
  //   $("#editHighlights").modal("hide");
  // }
}
