import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import WithRender from '@/Pages/Admin/Modules/Admin/Views/dashboard.html';
import { common } from '../../Common/Services/Common';
@WithRender
@Component
export default class Dashboard extends Vue {
    user: object = {};
    constructor() {
        super();
        // console.log(common.CurrentLoggedBusinessUser());

    }
}
