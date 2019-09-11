import React,{ Component } from "react"
import AddForm from "./AddForm"
import UpdateForm from "./UpdateForm"
import HomeService from "../../../Service/HomeService";
import {Form, Row, Col, Input, Button, Table, PageHeader, Modal, Checkbox, Select, message, Tag} from 'antd';
import PageComponent from '../../../Utils/Component/PageComponent/PageComponent'
import "../../../Assets/Styles/common.less";
const { Option } = Select;

class AdminList extends Component{
    constructor(props) {
        super(props);
        this.HomeService = new HomeService();
        this.state = {
            // 弹出框
            addItemFlag: false,
            updateItemFlag: false,
            configureRoleFlag: false,
            //table分页
            dataSource:[],
            loading:true,
            selectedRowKeys: [],
            // 分类
            projectClass: [],
            // 修改回显
            updateData:null,
            //配置角色
            configroles: [],
            itemConfigRoles:[],
            checkedValues:[],
            configRoleId: ''
        }
    }
    // 批量操作
    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };
    // 查询
    selectAction() {
        this.props.form.validateFields((err, values)=>{
            if(!err) {
                console.log(values)
                this.refs.PageComponent.selectAll(values);
            }
        })
    }

    // 新增
    onRef = (name, ref) => {
        switch(name) {
            case "AddForm":
                this.AddForm = ref;
                break;
            case "UpdateForm":
                this.UpdateForm = ref;
                break;
            default:
                break;
        }

    }
    handleOk(flag) {
        if (flag === "ADD"){
            let data = this.AddForm.getFormContent();
            this.HomeService.adminInstall(data).then(res=> {
                if (res.data.code > 0) {
                    message.success("增加成功!");
                    this.AddForm.restForm();
                    this.setState({
                        addItemFlag: false
                    })
                    this.selectAction()
                } else {
                    message.error("增加失败");
                }
            })
        } else if(flag === "UPDATE"){
            let data = this.UpdateForm.getFormContent();
            this.HomeService.adminUpdate(data).then(res=> {
                if (res.data.code > 0) {
                    message.success("修改成功!");
                    this.setState({
                        updateItemFlag: false
                    })
                } else {
                    message.error("修改失败");
                }
            })
        }
    }
    //更新
    updateAction(record) {
        this.setState({
            updateItemFlag: true,
            updateData:record
        })
    }
    //角色弹框
    configureRole(record){
        this.HomeService.roleSelectAll().then((res)=> {
            let result = res.data.data;
            if (res.data.code > 0) {
                this.setState({
                    configureRoleFlag: true,
                    configroles: result,
                    itemConfigRoles:record.users,
                    configRoleId:record.id
                })
            } else {
                message.error("分页列表查询失败!")
            }
        })
    }
    // 角色配置
    userUpdateRole(record){
        this.HomeService.userUpdateRole({id:this.state.configRoleId,roleStr:this.state.checkedValues}).then((res)=> {
            let result = res.config.data;
            console.log(result)
            if (res.data.code > 0) {
                message.error("角色分配成功!")
            } else {
                message.error("角色分配失败失败!")
            }
        })
    }
    onChange(checkedValues) {
        this.setState({
            checkedValues: checkedValues
        })
    }
    //删除
    deleteItem() {
        this.HomeService.adminDelete(this.state.selectedRowKeys).then(res=>{
            if (res.data.code>0) {
                message.success("删除成功！");
                this.selectAction()
            } else {
                message.error("删除失败");
            }
        })
    }
    getDataSource(dataSource){
        if (dataSource) {
            this.setState({
                dataSource:dataSource,
                loading:false,
            })
          //  console.log(dataSource.createTime.format())
        }
    }
    render() {
        const columns = [
          {
                title:"用户名",
                dataIndex:"username"
            },{
                title:"真实姓名",
                dataIndex:"itemDescription",
            },{
                title:"角色",
                dataIndex:"roles",
                render: (text) => (
                    <Button.Group>
                        {text.length>0?text.map( (item) => {
                            return (
                                <Tag>{item.roleName}</Tag>
                            )
                        }):""}
                    </Button.Group>
                )
            },{
                title:"帐号状态",
                dataIndex:"stateName",
            },{
                title:"创建时间",
                dataIndex:"createTime"
            },{
                title:"操作",
                render: (text, record) => (
                    <Button.Group>
                        <Button type="primary" size='small' onClick={this.configureRole.bind(this, record)} >配置角色</Button>
                        <Button type={"primary"} onClick={this.updateAction.bind(this, record)} size='small'>修改</Button>
                    </Button.Group>
                )
            }
        ]
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const { getFieldDecorator } = this.props.form;
        const hasSelected = this.state.selectedRowKeys.length > 0;
        return(
            <div style={{padding:'10px'}}>
                <PageHeader title="用户查询"/>
                <Form style={{marginBottom:20}}>
                    <Row span={24} gutter={40}>
                        <Col span={8}>
                            <Form.Item label={"用户名"}>
                                {getFieldDecorator('username', {})(<Input placeholder={"请输入"}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label={"角色"}>
                                {getFieldDecorator('stateName', {})(<Select placeholder={"管理员"}>
                                    <Option value="0">员工</Option>
                                    <Option value="1">知识审核</Option>
                                    <Option value="2">管理员</Option>
                                </Select>)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label={"用户状态"}>
                                {getFieldDecorator('status', {})(<Select placeholder={"禁用"}>
                                    <Option value="0">禁用</Option>
                                    <Option value="1">可用</Option>
                                </Select>)}
                            </Form.Item>
                        </Col>
                        <Col span={24} style={{ textAlign: 'center' }}>
                            <Button type={"primary"} onClick={this.selectAction.bind(this)}>查询</Button>
                            <Button style={{ marginLeft: 30 }} onClick={()=>{this.props.form.resetFields()}}  type={"primary"}>重置</Button>
                        </Col>
                    </Row>
                </Form>
                <PageHeader title="用户列表"/>
                <div className="table-operations">
                    <Button onClick={this.deleteItem.bind(this)} type={"primary"} disabled={!hasSelected}>删除</Button>
                    <Button onClick={()=> {this.setState({ addItemFlag: true})}} type={"primary"}>新增</Button>
                </div>
                <Table size={"small"} rowSelection={rowSelection} rowKey={record => record.id} loading={this.state.loading} columns={columns} dataSource={this.state.dataSource} pagination={ false }/>
                <PageComponent
                    url={this.HomeService.adminSelectAllUrl}
                    ref={"PageComponent"}
                    dataSource={this.getDataSource.bind(this)}/>
                <Modal
                    title="增加用户"
                    visible={this.state.addItemFlag}
                    onOk={this.handleOk.bind(this, "ADD")}
                    onCancel={()=>{this.setState({ addItemFlag: false});}}
                    okText="保存"
                    cancelText="取消"
                >
                    <AddForm dataClass={this.state.projectClass} onRef={this.onRef.bind(this)}/>
                </Modal>
                <Modal
                    title="修改用户"
                    visible={this.state.updateItemFlag}
                    onOk={this.handleOk.bind(this, "UPDATE")}
                    onCancel={()=>{this.setState({ updateItemFlag: false});}}
                    okText="保存"
                    cancelText="取消"
                >
                    <UpdateForm dataClass={this.state.projectClass} dataUpdate={this.state.updateData} onRef={this.onRef.bind(this)}/>
                </Modal>
                <Modal
                    title="配置角色"
                    visible={this.state.configureRoleFlag}
                    onOk={this.userUpdateRole.bind(this)}
                    onCancel={()=>{this.setState({ configureRoleFlag: false});}}
                    okText="保存"
                    cancelText="取消"
                >
                    <Checkbox.Group style={{ width: '100%' }} configroles={this.state.configroles} onChange={this.onChange.bind(this)}>
                        { this.state.configroles.map((item,index) =>{
                            console.log(item,'fdsa')
                            let flag = false;
                            if (this.state.itemConfigRoles){
                                this.state.itemConfigRoles.map(value =>{
                                    if (value === item.roleId){
                                        flag = true;
                                    }
                                })
                            }
                            return (
                                <Checkbox key={item.roleId} value={item.roleId} checked={flag}> {item.roleName}</Checkbox>
                            )
                        })}
                    </Checkbox.Group>
                </Modal>
            </div>
        )
    }
}
export default Form.create("ProjectData")(AdminList);