import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from '@/Pages/Admin/Modules/ManagePackage/tab/OfferServices/Views/offerServices.html';

@WithRender
@Component({})

export default class Services extends Vue {
    protected ui: any = {};
    protected errors: any = {};
    protected errorsMessage: any = {};
    protected errorsModal: any = {};
    protected isError: boolean = false;
}
