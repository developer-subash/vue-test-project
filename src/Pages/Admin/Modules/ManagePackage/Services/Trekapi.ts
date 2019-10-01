import { config } from '@/Config';

class Trekapi {
  public AddTrek() {
    return `${config.apiBaseUrl}business/trek/add`;
  }

  // package list API here
  public PackageList() {
    return `${config.apiBaseUrl}business/trek/list`;
  }
  public TourTypeList() {
    return `${config.apiBaseUrl}business/trek/tour-type/list`;
  }
  public DifficultyLevelList() {
    return `${config.apiBaseUrl}business/trek/difficulty-level/list`;
  }
  public GetAttractionType() {
    return `${config.apiBaseUrl}business/trek/attraction-type/list`;
  }
  public GetTrek() {
    return `${config.apiBaseUrl}business/trek/list`;
  }
  // General Tab Initial Data
  public GetGeneral() {
    return `${config.apiBaseUrl}business/trek/general-tab/retrieve`;
  }
  // Itinerary Tab Initial Data
  public GetItinerary() {
    return `${config.apiBaseUrl}business/trek/itinerary/retrieve`;
  }
  // General Tab Post
  public PutGeneral(trekId: number) {
    return `${config.apiBaseUrl}business/trek/edit-general-tab`;
  }
  // Price and Duration Pricing Rule
  public GetPricingBasis() {
    return `${config.apiBaseUrl}business/trek/pricing-basis/list`;
  }
  public GetPriceDuration() {
    return `${config.apiBaseUrl}business/trek/price-tab/retrieve`;
  }
  // Price and Duration Seasons
  public GetSeasons() {
    return `${config.apiBaseUrl}business/trek/seasons/list`;
  }
  // Price Tab Post
  public EditNotesGeneral(trekId: number) {
    return `${config.apiBaseUrl}business/trek/edit-notes-tab`;
  }
  
  // Notes Tab Post
  public EditPrice(trekId: number) {
    return `${config.apiBaseUrl}business/trek/edit-price-tab`;
  }
  // Notes Tab Post
  public AddHighlight(trekId: number) {
    return `${config.apiBaseUrl}business/trek/highlight/add`;
  }
  // Icons for General/Highlight Tab
  public GetIcons() {
    return `${config.apiBaseUrl}business/trek/icons/list`;
  }
  // Notes Tab
  public GetNotes() {
    return `${config.apiBaseUrl}business/trek/note-tab/retrieve`;
  }
  // /Highlight Tab
  public GetHighlight() {
    return `${config.apiBaseUrl}business/trek/highlight-tab/retrieve`;
  }
  // /Highlight Tab
  public EditHighlight() {
    return `${config.apiBaseUrl}business/trek/highlight/edit`;
  }
  // /Highlight Tab
  public DeleteHighlight(trekId: number) {
    return `${config.apiBaseUrl}business/trek/highlight/delete`;
  }
  // Destination List Tab
  public MasterDestinationList() {
    return `${config.apiBaseUrl}business/trek/destinations/list`;
  }
  // Price Rule Tab List
  public PricingList() {
    return `${config.apiBaseUrl}business/trek/pricing-rule-tab/retrieve`;
  }
  // Price Rule Tab Add
  public AddPricing() {
    return `${config.apiBaseUrl}business/trek/pricing/add`;
  }
  // Price Rule Tab Edit
  public EditPricing() {
    return `${config.apiBaseUrl}business/trek/pricing/edit`;
  }
  // Price Rule Tab Delete
  public DeletePrice() {
    return `${config.apiBaseUrl}business/trek/pricing/delete`;
  }
  public DestinationsList() {
    return `${config.apiBaseUrl}business/trek/destination-tab/retrieve`;
  }
   // Add Destination
   public AddDestination(trekId: number) {
    return `${config.apiBaseUrl}business/trek/destination/add`;
  }

   public EditDestination(trekId: number) {
    return `${config.apiBaseUrl}business/trek/destination/edit`;
  }
   public DeleteDestination() {
    return `${config.apiBaseUrl}business/trek/destination/delete`;
  }

   // Image Gallery List
   public ImageList() {
    return `${config.apiBaseUrl}business/trek/image/list`;
  }

   public MakeBannerImage() {
    return `${config.apiBaseUrl}business/trek/image/make-banner`;
  }
   public AddGalleryImage() {
    return `${config.apiBaseUrl}business/trek/image/add`;
  }

   public DeleteImage() {
    return `${config.apiBaseUrl}business/trek/image/delete`;
  }

  // Itinerary Tab
   public RetrieveItinerary() {
    return `${config.apiBaseUrl}business/trek/itinerary-tab/retrieve`;
  }
   public AddAttraction() {
    return `${config.apiBaseUrl}business/trek/segment/attraction/add`;
  }
   public EditAttraction() {
    return `${config.apiBaseUrl}business/trek/segment/attraction/edit`;
  }
   public UnitList() {
    return `${config.apiBaseUrl}business/trek/units/list`;
  }


  // Add Segment in Itinerary Tab
  public AddSegment(trekId: number) {
    return `${config.apiBaseUrl}business/trek/segment/add`;
  }
  public DeletSegment(trekId: number) {
    return `${config.apiBaseUrl}business/trek/segment/delete`;
  }
  public AttractionList(trekId: number) {
    return `${config.apiBaseUrl}business/trek/segment/attraction/list`;
  }
  public AddAttractionImage() {
    return `${config.apiBaseUrl}business/trek/segment/attraction/image/add`;
  }
  public DeleteAttractionImage() {
    return `${config.apiBaseUrl}business/trek/segment/attraction/image/delete`;
  }
  public DeleteSegmentAttraction(trekId: number) {
    return `${config.apiBaseUrl}business/trek/segment/attraction/delete`;
  }
  
  // Includes Tab
  // List
  public IncludesList(trekId: number) {
    return `${config.apiBaseUrl}business/trek/includes/list`;
  }
  // add Includes
  public AddIncludes() {
    return `${config.apiBaseUrl}business/trek/includes/add`;
  }
  public EditIncludes() {
    return `${config.apiBaseUrl}business/trek/includes/edit`;
  }
  // delete Includes
  public DeleteSelectedIncludes() {
    return `${config.apiBaseUrl}business/trek/includes/delete`;
  }
  // Excludes Tab
  // List
  public ExcludesList(trekId: number) {
    return `${config.apiBaseUrl}business/trek/excludes/list`;
  }
  // add Includes
  public AddExcludes() {
    return `${config.apiBaseUrl}business/trek/excludes/add`;
  }
  public EditExcludes() {
    return `${config.apiBaseUrl}business/trek/excludes/edit`;
  }
  // delete Includes
  public DeleteSelectedExcludes() {
    return `${config.apiBaseUrl}business/trek/excludes/delete`;
  }

  // Itinerary Tab
  public AddSegmentImage() {
    return `${config.apiBaseUrl}business/trek/segment/image/add`;
  }
  public SegmentImageList(trekId: number) {
    return `${config.apiBaseUrl}business/trek/segment/image/list`;
  }
  public SegmentImageDelete(trekId: number) {
    return `${config.apiBaseUrl}business/trek/segment/image/delete`;
  }
  public SegmentMakeDefaultImage() {
    return `${config.apiBaseUrl}business/trek/segment/image/make-default`;
  }
  public EditSegment(trekId: number) {
    return `${config.apiBaseUrl}business/trek/segment/edit`;
  }

  // Departures Tab
  public AddDeparture() {
    return `${config.apiBaseUrl}business/trek/departure/add`;
  }
  public EditDeparture(trekId: number) {
    return `${config.apiBaseUrl}business/trek/departure/edit`;
  }

  public DeleteDeparture() {
    return `${config.apiBaseUrl}business/trek/departure/delete`;
  }

  // Package Filter
  public TrekFilter() {
    return `${config.apiBaseUrl}business/trek/filter`;
  }

  // Manage Departure Filters only here

  // Manage Departure Filter
  public DepartureFilter() {
    return `${config.apiBaseUrl}business/trek/departure/filter`;
  }
  public DepartureList() {
    return `${config.apiBaseUrl}business/trek/departure/list`;
  }
  public DeparturesList() {
    return `${config.apiBaseUrl}business/trek/departures/list`;
  }
  // Booking List
  public BookingList() {
    return `${config.apiBaseUrl}business/trek/bookings/list`;
  }
  // Booking Departure Filter
  public BookingFilter() {
    return `${config.apiBaseUrl}business/trek/bookings/filter`;
  }
  // Booking Details retrieve
  public BookingDetails() {
    return `${config.apiBaseUrl}business/trek/bookings/retrieve`;
  }
  // Profile Update
  public updateProfile() {
    return `${config.apiBaseUrl}business/user/profile/update`;
  }
  // change password
  public updatePassword() {
    return `${config.apiBaseUrl}business/user/password/update`;
  }
  // Update Banner Image
  public updateBannerImage() {
    return `${config.apiBaseUrl}business/user/banner/update`;
  }
  // Update Banner Image
  public updateLogoImage() {
    return `${config.apiBaseUrl}business/user/logo/update`;
  }
  // Update Banner Image
  public userRetrieve() {
    return `${config.apiBaseUrl}business/user/retrieve`;
  }
  // Update Banner Image
  public trekRetrieve() {
    return `${config.apiBaseUrl}business/trek/pricing-rule-tab/retrieve`;
  }
  // Retrieve Data/General Pricing Rule of Selected Departure
  public retrieveDeparture() {
    return `${config.apiBaseUrl}business/trek/departure/retrieve`;
  }
  // departure pricing Rule list retrieve
  public retrievePriceListDeparture() {
    return `${config.apiBaseUrl}business/trek/departure/pricing/list`;
  }
  // departure pricing Rule add
  public addPriceDeparture() {
    return `${config.apiBaseUrl}business/trek/departure/pricing/add`;
  }
  // departure pricing Rule edit
  public editPriceDeparture() {
    return `${config.apiBaseUrl}business/trek/departure/pricing/edit`;
  }
  // departure pricing Rule Delete
  public deletePriceDeparture() {
    return `${config.apiBaseUrl}business/trek/departure/pricing/delete`;
  }
  // review list
  public fetchReviewList() {
    return `${config.apiBaseUrl}business/trek/review/list`;
  }
  // download pdf
  public fetchPdf() {
    return `${config.apiBaseUrl}business/trek/pdf/download`;
  }
  

  // Profile Tab /
  public GetSocialMediaIcon() {
    return `${config.apiBaseUrl}business/social_media/get`;
  }
  // get social media list
  public fetchSocialMediaList() {
    return `${config.apiBaseUrl}business/user/social_media/list`;
  }
  // get social media list
  public addSocialMedia() {
    return `${config.apiBaseUrl}business/user/social_media/add`;
  }
  // delete social media list
  public deleteSocialMedia() {
    return `${config.apiBaseUrl}business/user/social_media/delete`;
  }
  // edit social media list
  public editSocialMedia() {
    return `${config.apiBaseUrl}business/user/social_media/edit`;
  }
  // get About Account Content in profile
  public fetchAccountContent() {
    return `${config.apiBaseUrl}business/content/get`;
  }
  // add About Account Content in profile
  public addAccountContent() {
    return `${config.apiBaseUrl}business/user/account_content/add`;
  }
  // retrieve About Account Content in profile
  public addAccountContentRetrieve() {
    return `${config.apiBaseUrl}business/user/account_content/retrieve`;
  }
  // retrieve About Account Content in profile
  public deleteAccountContentRetrieve() {
    return `${config.apiBaseUrl}business/user/account_content/delete`;
  }
  // retrieve About Account Content in profile
  public fetchOfficeDays() {
    return `${config.apiBaseUrl}business/user/office_days/list`;
  }
  // retrieve About Account Content in profile
  public addOfficeDayandHour() {
    return `${config.apiBaseUrl}business/user/office_days/add`;
  }
}
export const trekapi = new Trekapi();
