import { Vue } from 'vue-property-decorator';
import { config } from '@/Config';

class CookieService extends Vue {
    constructor() {
        super()
    }
    public set(this: any, key: string, token: string): void {
        this.$cookies.set(key, token, config.cookiesExpiryDate);
    }
    public get(this: any, key: string) {
        if (this.$cookies.isKey(key)) {
            return this.$cookies.get(key);
        }
        return false;
    }
    public check(this: any, key: string) {
        if (this.$cookies.isKey(key)) {
            return true;
        }
        return false;
    }
    public delete(this: any, key: string) {
        if (this.$cookies.isKey(key)) {
            return this.$cookies.remove(key);
        }
    }
}
export const Cookie = new CookieService();