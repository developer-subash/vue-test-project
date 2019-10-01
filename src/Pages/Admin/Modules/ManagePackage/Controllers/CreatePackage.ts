import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from '@/Pages/Admin/Modules/ManagePackage/Views/create-package.html';


@WithRender
@Component
export default class CreatePackage extends Vue {
    protected Data: string = 'Hello';
}
