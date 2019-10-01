import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from '@/Pages/Admin/Modules/ManagePackage/tab/PreBooking/pre-booking.html';

@WithRender
@Component
export default class PreBooking extends Vue {
    protected IsLoading: boolean = false;
    protected PostLoading: boolean = false;
  
    protected Errors: any = {};
    protected IsError: boolean = false;
}
