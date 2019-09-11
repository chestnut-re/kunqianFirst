import {service} from '../Utils/Class/Service';
import { ADMIN_WORK } from './config'
/**
  用户管理 service --梁艳
 * */
class HomeService {
    constructor() {
        // 角色列表
        this.roleSelectAllUrl = `${ADMIN_WORK}/organize/role/getAllList`; //获取角色列表
        this.roleInstallUrl = `${ADMIN_WORK}/organize/role/save`;  //新增角色
        this.roleUpdateUrl = `${ADMIN_WORK}/organize/role/update`; //更新角色
        this.roleDeleteUrl = `${ADMIN_WORK}/organize/role/delete/`; //删除角色
        this.roleUpdatePowerUrl = `${ADMIN_WORK}/organize/permisson/addperssionforrole`; //角色分配权限

        // 用户列表
        this.adminSelectAllUrl = `${ADMIN_WORK}/organize/user/getListPage`;//获取用户列表
        this.adminSelectAllPageUrl = `${ADMIN_WORK}/organize/user/getList`;//不带分页获取用户列表
        this.adminInstallUrl = `${ADMIN_WORK}/organize/user/save`;  //新增用户
        this.adminDeleteUrl = `${ADMIN_WORK}/organize/user/delete/`; //删除用户
        this.adminUpdateUrl = `${ADMIN_WORK}/organize/user/update`; //更新用户
        this.userUpdateRoleUrl = `${ADMIN_WORK}/organize/user/addroleforuser`; //用户分配角色
        this.adminSelectAllPageUrl = `${ADMIN_WORK}/organize/user/getList`; //不带分页查询用户列表
        // 权限列表
        this.powerSelectAllUrl = `${ADMIN_WORK}/organize/permisson/getAllList`; //获取权限列表
        this.powerInstallUrl = `${ADMIN_WORK}/organize/permisson/save`; //新增权限
        this.powerDeleteUrl = `${ADMIN_WORK}/organize/permisson/delete/`; //删除权限
        this.powerUpdateUrl = `${ADMIN_WORK}/organize/permisson/update`; //更新权限

    }
    // 用户增删改查
    adminSelectAll(query) {
        return service.post(this.adminSelectAllUrl,{params:query});
    }
    adminSelectAllPage() {
        return service.post(this.adminSelectAllPageUrl);
    }
    adminInstall(query) {
        return service.post(this.adminInstallUrl,query);
    }
    adminDelete(query) {
        return service.post(this.adminDeleteUrl, query);
    }
    adminUpdate(query) {
        return service.post(this.adminUpdateUrl, query);
    }
    userUpdateRole(query) {
        return service.post(this.userUpdateRoleUrl, query);
    }
    adminSelectAllPage() {
        return service.post(this.adminSelectAllPageUrl);
    }

    // 角色增删改查
    roleSelectAll() {
        return service.get(this.roleSelectAllUrl);
    }
    roleInstall(query) {
        return service.post(this.roleInstallUrl,query);
    }
    roleDelete(query) {
        return service.post(this.roleDeleteUrl, query);
    }
    roleUpdate(query) {
        return service.post(this.roleUpdateUrl, query);
    }
    roleUpdatePower(query) {
        return service.post(this.roleUpdatePowerUrl, query);
    }



    // 权限增删改查
    powerSelectAll() {
        return service.get(this.powerSelectAllUrl);
    }
    powerInstall(query) {
        return service.post(this.powerInstallUrl, query);
    }
    powerDelete(query) {
        return service.post(this.powerDeleteUrl,query);
    }
    powerUpdate(query) {
        return service.post(this.powerUpdateUrl, query);
    }

}
export default HomeService;


