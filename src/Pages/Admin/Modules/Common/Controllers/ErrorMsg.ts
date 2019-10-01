
import { Vue, Component, Watch, Prop } from 'vue-property-decorator';
import WithRender from '@/Pages/Admin/Modules/Common/Views/error-msg.html';

@WithRender
@Component
export default class ErrorMsg extends Vue {
  @Prop(Array)
  validationerrors!: object[];
  @Prop(Boolean)
  iserror!: boolean;
}


