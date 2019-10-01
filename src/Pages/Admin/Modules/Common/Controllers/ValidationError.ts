import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import WithRender from '@/Pages/Admin/Modules/Common/Views/validation-error.html';
import { common } from '../../Common/Services/Common';
@WithRender
@Component
export default class ValidationError extends Vue {
    public index: number = 0;
    @Prop(Object)
    errors!: {};
    @Prop(String)
    field!: any;
    @Prop({ default: false })
    hasMessageTitle!: boolean;
    @Prop({ default: true })
    isError!: boolean;
}
