import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from '@/Pages/Admin/Modules/ManagePackage/tab/Reviews/reviews.html';
import { common } from '@/Pages/Admin/Modules/Common/Services/Common';
import {trekService} from '@/Pages/Admin/Modules/ManagePackage/Services/Trekservice';
import Pager from '@/Pages/Admin/Modules/Common/Controllers/Pager';


@WithRender
@Component({
    components: {
        Pager,
    },
})

export default class Reviews extends Vue {
    protected ui: any = {};
    protected errors: any = {};
    protected errorsMessage: any = {};
    protected errorsModal: any = {};
    protected isError: boolean = false;
    protected ReviewList: any = {};
    protected Review: any = {};
    protected SelectedReview: any = {};
    protected CurrentPage: any = 1;
    protected paging: any = {};
    constructor() {
        super();
        this.ui.IsLoading = false;
        this.ui.PostLoading = false;
        this.ui.fetchData = false;
        this.paging.current_page = 1;
        this.paging.last_page = 1;
        this.paging.per_page = 0;

        // this.Review.FullName = '';
        // this.Review.Email = '';
        // this.Review.Title = '';
        // this.Review.Review = '';
        // this.Review.Date = '';
        this.Review.Ratings = 1;
        // this.Review.Country = '';

        this.SelectedReview.FullName = '';
        this.SelectedReview.Email = '';
        this.SelectedReview.Title = '';
        this.SelectedReview.NameTitle = '';
        this.SelectedReview.Review = '';
        this.SelectedReview.Date = '';
        this.SelectedReview.Ratings = 1;
        this.SelectedReview.Country = '';
    }
    public created() {
        this.getAllReviewList();
    }
    public async getAllReviewList() {
        if (this.ui.fetchData === false) {
                this.ui.IsLoading = true;
                let data = {
                    trek_id: this.$route.query.id,
                    current_page: this.paging.current_page,
                };
                trekService
                .getReviewList(data)
                .then((res: any) => {
                    console.log(res.data.data.data);
                    res.data.data.data.filter((review: any, index: any) => {
                        let str = review.description;
                        let resultString = str.split(' ').slice(0, 5).join(" ") + "...";
                        review.short_review = resultString;
                        // console.log(this.Pricing.List);
                      });
                    this.ReviewList = res.data.data.data ? res.data.data.data : [];
                    // console.log(this.DestinationData);
                    this.ui.fetchData = true;
                    this.ui.IsLoading = false;
                })
                .catch((error: any) => {
                    common.sdCatchErr(error, this.errorsMessage).then(res => {
                        this.errorsMessage = res;
                    });
                })
                .finally(() => {
                    this.ui.IsLoading = false;
                });
        }
    }
    public reviewModal(review: any, index: any) {
        this.hideModalReview();
        // console.log(review);
        this.SelectedReview.FullName = review.customer.full_name;
        this.SelectedReview.NameTitle = review.customer.title;
        this.SelectedReview.Title = review.customer.title;
        this.SelectedReview.Email = review.customer.email;
        this.SelectedReview.Review = review.description;
        this.SelectedReview.Date = review.created_at;
        this.SelectedReview.Ratings = review.rating;
        this.SelectedReview.Country = review.customer.country;
    }
    // public showReviewModal() {
    //     $("#review-modal").modal("show");
    // }
    public hideModalReview() {
        $("#review-modal").modal("hide");
        $(".modal-backdrop").remove();
        this.SelectedReview.FullName = '';
        this.SelectedReview.NameTitle = '';
        this.SelectedReview.Title = '';
        this.SelectedReview.Email = '';
        this.SelectedReview.Review = '';
        this.SelectedReview.Date = '';
        this.SelectedReview.Ratings = 0;
        this.SelectedReview.Country = '';
    }
    public onPaging(CurrentPage: number) {
        // alert(CurrentPage);
        this.paging.current_page = CurrentPage;
        this.getAllReviewList();
    }
}
