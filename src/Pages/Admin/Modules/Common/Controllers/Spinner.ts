import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from '@/Pages/Admin/Modules/Common/Views/spinner.html';
@WithRender
@Component
export default class Spinner extends Vue {
    @Prop(Boolean)
    loading!: boolean;
}