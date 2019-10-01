import { Vue, Component, Watch, Prop , Emit} from 'vue-property-decorator';
import WithRender from '@/Pages/Admin/Modules/Common/Views/pager.html';

@WithRender
@Component({})
export default class Pager extends Vue {
  @Prop(Object)
  pager!: any;

  public goPage(page: number) {
    console.log(this.currentPage);
    var p = page;
    if (p > 0) {
      //   this.$emit("onPaging", p);
      this.goPages(p);
    }
  }
  @Emit('onPaging')
  public goPages(page: number) {
    return page;
  }
  public goPreviousPage() {
    if (this.currentPage > 1) {
      this.goPreviousPages(this.currentPage - 1);
    }
  }
  @Emit('onPaging')
  public goPreviousPages(currentpage: number) {
    return currentpage;
  }
  public goNextPage() {
    if (this.currentPage < this.lastPage) {
      // alert();
      this.goPreviousPages(this.currentPage + 1);
    }
  }
  public getNextPageClass() {
    let currentpage = Number(this.currentPage);
    console.log(this.currentPage);
    console.log(currentpage);
    if (currentpage == this.lastPage) {
      alert("inside");
      return this.lastPage == this.currentPage ? 'page-item' : 'page-item disabled';
    }
  }
  public getPreviousPageClass() {
    return this.currentPage > 1 ? 'page-item' : 'page-item disabled';
  }
  public getPageClass(pagenumber: number) {
    if (this.currentPage == pagenumber) {
      return 'page-item active';
    }
    return 'page-item';
  }

  public get currentPage() {
    return this.pager.current_page;
  }
  public get lastPage() {
    return this.pager.last_page;
  }
  public get pages() {
    return this.Paginate(this.pager.current_page, this.pager.last_page);
  }

  public Paginate(c: number, m: number) {
    var current = c,
    last = m,
    delta = 2,
    left = current - delta,
    right = current + delta + 1,
    range: number[] = [],
    rangeWithDots: string[] = [],
    l: number = 0,
    temp: number = 0

    for (let i: number = 1; i <= last; i++) {
      if (i == 1 || i == last || (i >= left && i < right)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          temp = l + i;
          rangeWithDots.push(temp.toString());
        } else if (i - l !== 1) {
          var tempStr: string = '...';
          rangeWithDots.push(tempStr);
        }
      }
      rangeWithDots.push(i.toString());
      l = i;
    }
    return rangeWithDots;
  }
}
