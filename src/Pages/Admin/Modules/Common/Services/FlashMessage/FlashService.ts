import Vue from 'vue';
class FlashService extends Vue {
    public Success(this: any, title: string, message: string)
    {
        this.flashMessage.success({
            title: title,
            message: message,
            icon : 'https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/check-circle-green-512.png',
            position : "left bottom",
          });
    }
    public Error(this: any, title: string, message: string)
    {
        this.flashMessage.error({
            title: title,
            message: message,
          });
    }
    public Alert(this: any, title: string, message: string)
    {
        this.flashMessage.alert({
            title: title,
            message: message,
          });
    }
}
export  const flashService = new FlashService();