import axios from "axios";
import Vue from 'vue';
import { Cookie } from './CookieService';
class Common extends Vue {
    public async callApi1(method: String, url: any, data: any = []) {
        // let _configheader = {
        //     headers: {
        //         crossorigin: true,
        //         // "Access-Control-Allow-Origin": "*",
        //         "Content-Type": "application/json",
        //         // "Access-Control-Allow-Headers": "*",
        //         // "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS"
        //     }
        // };
        var _configheader = {
            headers: { 'Authorization': `Bearer ${Cookie.get('business_auth_token')}` }
        };
        var testapi = axios.create({
            baseURL: ""
        });
        switch (method) {
            case "get":
                return await new Promise((resolve, reject) => {
                    testapi
                        .get(url, _configheader)
                        .then((res: any) => {
                            resolve(res);
                        })
                        .catch(error => {
                            reject(error);
                        });
                });

            case "put":
                return await new Promise((resolve, reject) => {
                    testapi
                        .put(url, data, _configheader)
                        .then((res: any) => {
                            //   this.successresponse = this.sd_GetResponse(res);
                            resolve(res);
                        })
                        .catch((error: any) => {
                            reject(error);
                        });
                });

            case "post":
                return await new Promise((resolve, reject) => {
                    testapi
                        .post(url, data, _configheader)
                        .then(res => {
                            resolve(res);
                        })
                        .catch(error => {
                            reject(error);
                        });
                });
            case "delete":
                return await new Promise((resolve, reject) => {
                    testapi
                        .delete(url, {data :{ data, _configheader } })
                        .then(res => {
                            resolve(res);
                        })
                        .catch(error => {
                            reject(error);
                        });
                });

            default:
                return;
        }
    }
    public onFileUpload(event: any, doc: any) {
        var files = event.target.files || event.dataTransfer.files;
        if (!files.length) return false
        // console.log("doc", doc);
        // console.log("common", files);
        doc.postData.name = files[0].name;
        // console.log(files[0]);
        // doc.postData.file_type = files[0].name.substring(
        //     files[0].name.lastIndexOf(".") + 1
        // );
        // console.log(files[0]);
        doc.postData.size = files[0].size;
        doc.postData.file_type = files[0].type;
        // doc.postData.type = files[0].imagetype;
        // doc.postData.trek_id = files[0].type;
        // doc.postData.is_loaded = "empty";

        var vm = this;
        var reader = new FileReader();
        reader.onload = (e: any) => {
            doc.postData.content = e.target.result;
        };
        reader.readAsDataURL(files[0]);
        // doc.postData.is_loaded = "LOADING";
    }

    public validateFileType(doc: any) {
        // console.log(doc);
        var regex = new RegExp("(.*?).(" + doc.extension.toLowerCase() + ")$");
        // alert(regex);
        // console.log("reg data", regex);

        var ext = doc.postData.name.substr(doc.postData.name.lastIndexOf("."));
        // alert(regex.test(ext.toLowerCase()));

        if (!regex.test(ext.toLowerCase())) return false;
        else return true;
    }
    public validateFileSize(doc: any) {
        // console.log("Validate", doc);
        // console.log(doc.maxSizeInMB);
        let size = doc.maxSizeInMB * 1024 * 1024;
        // console.log(size);
        if (doc.postData.size < size) {
            // console.log("postdata size",doc.maxSizeInMB * 1024 * 1024);
            // alert(true);
            return true;
        } else {
            // alert(false);
            return false;
        }
    }

    public sdCatchErr(err: any, errorBag: any) {
        console.log("Error Check", err);
        console.log("Error Bag Check", errorBag);
        if (err && err.response && err.response.data && err.response.data.code) {
            if (err.response.data.code === 422) {
                errorBag = err.response.data.message;
                return Promise.resolve(errorBag);
            }
            else if (err.response.data.code === 401 ||
                err.response.data.code === 500 ||
                err.response.data.code === 406) {
                errorBag = err.response.data.message;
                return Promise.resolve(errorBag);
            }
            else if (err.response.data && err.response.data.message) {
                errorBag = err.response.data.message;
                return Promise.resolve(errorBag);
            }
            else {
                errorBag = err.response.data.message;
                return Promise.resolve(errorBag);
            }
        }
        else
            errorBag = ({ "error": ['Oops.. some error occurred. Please try again later.'] });
            // console.log(errorBag);
        return Promise.resolve(errorBag);

    }

    public isEmpty(obj: any) {
        if (obj == null || obj == undefined) return true;
        return Object.keys(obj).length === 0;
    }

    public notEmpty(obj: any) {
        return !this.isEmpty(obj);
    }
    //  For Notification Message
    public SuccessMsg(this: any, msg: string) {
        return this.$awn.success(msg);
    }
    public ErrorMsg(this: any, msg: string) {
        return this.$awn.alert(msg);
    }
    public WarningMsg(this: any, msg: any) {
        return this.$awn.warning(msg);
    }
    public CurrentLoggedBusinessUser() {
        if (localStorage.current_business_user)
            return JSON.parse(localStorage.current_business_user)
    }

    public ConvertToFeet(MeterData: any) {
        if (MeterData) {
           return (MeterData * 3.28084).toFixed(3);
        } else {
            return MeterData;
        }
      }
      public ConvertToMeter(FeetData: any) {
        if (FeetData) {
            return (FeetData / 3.28084).toFixed(3);
        } else {
            return FeetData;
        }
      }
    public preventNonNumericalInput(e: any) {
        e = e || window.event;
        const charCode = (typeof e.which === 'undefined') ? e.keyCode : e.which;
        const charStr = String.fromCharCode(charCode);
        if (!charStr.match(/^[0-9]+$/)) {
            e.preventDefault();
          }
    }


}


export const common = new Common();
