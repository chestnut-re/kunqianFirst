import {service} from '../Utils/Class/Service';
import {ADMIN_WORK} from "./config";

class LoginService{
    constructor() {
        this.loginOutUrl = `${ADMIN_WORK}/userlogin/loginout`;
        this.loginUrl = `${ADMIN_WORK}/userlogin/login`;
        this.loginGetNavUrl = `${ADMIN_WORK}/organize/permisson/getPermissByUserId`;
    }
    loginAction(query) {
        return service.post(this.loginUrl, query);
    }
    loginOutAction (query) {
        return service.post(this.loginOutUrl, query)
    }
    loginGetNavAction (id) {
        return service.get(this.loginGetNavUrl, {params:{userId:id}});
    }
}
export default LoginService;