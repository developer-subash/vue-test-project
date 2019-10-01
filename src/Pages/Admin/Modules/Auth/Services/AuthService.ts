import Axios from "axios";
import { authapi } from './AuthApi';
class AuthService {
    public async callApi1(method: String, url: any, data: any = []) {
        var testapi = Axios.create({
            baseURL: ""
        });
        let _configHeader = {
            headers: {
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
                "Access-Control-Allow-Origin": '*',
                "Access-Control-Allow-Methods": 'GET, PUT, POST, DELETE, HEAD, OPTIONS'
            }
        }
        switch (method) {
            case "get":
                return await new Promise((resolve, reject) => {
                    testapi
                        .get(url)
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
                        .put(url, data)
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
                        .post(url, data, _configHeader)
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

    public async BusinessRegister(data: object) {
        return await new Promise((resolve, reject) => {
            this.callApi1("post", authapi.businessRegister(), data)
                .then((res: any) => {
                    resolve(res);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }
    public async businessLogin(data: object) {
        return await new Promise((resolve, reject) => {
            this.callApi1("post", authapi.businessLogin(), data)
                .then((res: any) => {
                    resolve(res);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }
    public async businessForgetPassword(data: object) {
        return await new Promise((resolve, reject) => {
            this.callApi1("post", authapi.businessForgetPassword(), data)
                .then((res: any) => {
                    resolve(res);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }
    public async businessClientActivate(data: any) {
        return await new Promise((resolve, reject) => {
            this.callApi1("post", authapi.businessActivationToken(data.token), data)
                .then((res: any) => {
                    resolve(res);
                })
                .catch((error: any) => {
                    reject(error);
                })
        });
    }
}

export const authService = new AuthService();