import { config } from "@/Config";

class AuthApi {
    public businessRegister() {
        return `${config.apiBaseUrl}business/register`;
    }
    public businessLogin() {
        return `${config.apiBaseUrl}business/login`;
    }

    public businessActivationToken(token: any) {
        return `${config.apiBaseUrl}business/activation/${token}`;
    }
    public businessForgetPassword() {
        return `${config.apiBaseUrl}business/forgot-password`;
    }
    public businessResetPassword(token: any) {
        return `${config.apiBaseUrl}business/reset-password/${token}`;
    }
}
export const authapi = new AuthApi(); 