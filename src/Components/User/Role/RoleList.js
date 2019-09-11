import React,{ Component } from "react"
import AddForm from "./AddForm"
import UpdateForm from "./UpdateForm"
import HomeService from "../../../Service/HomeService";
import {
    Form,
    Row,
    Col,
    Input,
    Button,
    Table,
    PageHeader,
    Modal,
    Pagination,
    Tag,
    Select,
    message,
    Checkbox
} from 'antd';
import "../../../Assets/Styles/common.less";
const { Option } = Select;

class RoleList extends Component{
    constructor(props) {
        super(props);
        this.HomeService = new HomeService();
        this.state = {
            // 弹出框
            addItemFlag: false,
            updateItemFlag: false,
            //table分页
            dataSource:[],
            pageSize: 10,
            pageNum: 1,
            total:1,
            loading:true,
            selectedRowKeys: [],
            // 分类
            projectClass: [],
            // 修改回显
            updateData:null,
            //配置权限
            configurePowerFlag: false,
            configPowers: [],
            itemConfigPower:[],
            checkedValues:[],
            configPowerId: ''
        }
    }
    componentDidMount() {
         this.pageOnChange();
        // this.selectClass();
    }
    // 分页
    pageOnChange() {
        this.HomeService.roleSelectAll().then((res)=> {
            let result = res.data.data;
            if (res.data.code > 0) {
                this.setState({
                    loading:false,
                    total:result.size,
                    dataSource:result,
                })
            } else {
                message.error("分页列表查询失败!")
            }
        })
    }
    onShowSizeChange(current, pageSize) {
        this.HomeService.roleSelectAll({pageNum:this.state.pageNum, pageSize:pageSize}).then((res)=> {
            let result = res.data.data;
            if (res.data.code> 0) {
                this.setState({
                    loading:false,
                    pageSize: pageSize,
                    total:result.size,
                    dataSource:result.list,
                })
            } else {
                message.error("列表查询失败!")
            }
        })
    }
    showTotal(total) {
        return `总共${total}条`
    }
    // 批量操作
    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };
    // 查询
    selectAction() {
        this.props.form.validateFields((err, values)=>{
            if(!err) {
                this.HomeService.roleSelectAll({businessObjectEntity:values}).then((res)=> {
                    let result = res.data;
                    if (result.code > 0) {
                        this.setState({
                            total:result.data.size,
                            dataSource:result.data.list,
                        })
                    } else {
                        message.error("查询失败");
                    }
                })
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
            this.HomeService.roleInstall(data).then(res=> {
                if (res.data.code > 0) {
                    message.success("增加成功!");
                    this.AddForm.restForm();
                    this.setState({
                        addItemFlag: false
                    })
                    this.pageOnChange(this.state.pageNum);
                } else {
                    message.error("增加失败");
                }
            })
        } else if(flag === "UPDATE"){
            let data = this.UpdateForm.getFormContent();
            this.HomeService.roleUpdate(data).then(res=> {
                if (res.data.code > 0) {
                    message.success("修改成功!");
                    this.pageOnChange(this.state.pageNum);
                    this.setState({
                        updateItemFlag: false
                    })
                    this.pageOnChange(this.state.pageNum);
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
    //权限弹框
    configurePower(record){
        console.log(record,'123')
        this.HomeService.powerSelectAll().then((res)=> {
            let result = res.data.data;
            console.log(result,'qqqqqqq')
            if (res.data.code > 0) {
                this.setState({
                    configurePowerFlag: true,
                    configPowers: result,
                    itemConfigPower:record.users,
                    configPowerId:record.roleId

                })

            } else {
                message.error("查询失败!")
            }
        })
    }
    // 权限配置
    roleUpdatePower(record){
        this.HomeService.roleUpdatePower({roleId:this.state.configPowerId,permissionIds:this.state.checkedValues}).then((res)=> {
            let result = res.config.data;
            console.log(result)
            if (res.data.code > 0) {
                message.error("权限分配成功!")
            } else {
                message.error("权限分配失败失败!")
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
        this.HomeService.roleDelete(this.state.selectedRowKeys).then(res=>{
            if (res.data.code>0) {
                message.success("删除成功！");
                this.pageOnChange(this.state.pageNum);
            } else {
                message.error("删除失败");
            }
        })
    }
    render() {
        const columns = [
            {
                title:"ID",
                dataIndex:"roleId"
            },{
                title:"角色名称",
                dataIndex:"roleName"
            },{
                title:"是否支持",
                dataIndex:"isSuper"
            },{
                title:"排列顺序",
                dataIndex:"priority"
            },{
                title:"角色描述",
                dataIndex:"depict"
            },{
                title:"操作",
                render: (text, record) => (
                    <Button.Group>
                        <Button type="primary" size='small' onClick={this.configurePower.bind(this, record)}>配置权限</Button>
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
                <PageHeader title="角色查询"/>
                <Form style={{marginBottom:20}}>
                    <Row span={24} gutter={40}>
                        <Col span={8}>
                            <Form.Item label={"角色名称"}>
                                {getFieldDecorator('itemName', {})(<Input placeholder={"请输入"}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={24} style={{ textAlign: 'center' }}>
                            <Button type={"primary"} onClick={this.selectAction.bind(this)}>查询</Button>
                            <Button style={{ marginLeft: 30 }} onClick={()=>{this.props.form.resetFields()}}  type={"primary"}>重置</Button>
                        </Col>
                    </Row>
                </Form>
                <PageHeader title="角色列表"/>
                <div className="table-operations">
                    <Button onClick={this.deleteItem.bind(this)} type={"primary"} disabled={!hasSelected}>删除</Button>
                    <Button onClick={()=> {this.setState({ addItemFlag: true})}} type={"primary"}>新增</Button>
                </div>
                <Table size={"small"} rowSelection={rowSelection} rowKey={record => record.roleId} loading={this.state.loading} columns={columns} dataSource={this.state.dataSource} pagination={ false }/>
                <Pagination style={{marginTop:10}} showTotal={this.showTotal.bind(this)}  defaultCurrent={this.state.pageSize} total={this.state.total} showSizeChanger onChange={this.pageOnChange.bind(this)} onShowSizeChange={this.onShowSizeChange.bind(this)}/>
                <Modal
                    title="增加角色"
                    visible={this.state.addItemFlag}
                    onOk={this.handleOk.bind(this, "ADD")}
                    onCancel={()=>{this.setState({ addItemFlag: false});}}
                    okText="保存"
                    cancelText="取消"
                >
                    <AddForm dataClass={this.state.projectClass} onRef={this.onRef.bind(this)}/>
                </Modal>
                <Modal
                    title="修改角色"
                    visible={this.state.updateItemFlag}
                    onOk={this.handleOk.bind(this, "UPDATE")}
                    onCancel={()=>{this.setState({ updateItemFlag: false});}}
                    okText="保存"
                    cancelText="取消"
                >
                    <UpdateForm dataClass={this.state.projectClass} dataUpdate={this.state.updateData} onRef={this.onRef.bind(this)}/>
                </Modal>
                <Modal
                    title="配置权限"
                    visible={this.state.configurePowerFlag}
                    onOk={this.roleUpdatePower.bind(this)}
                    onCancel={()=>{this.setState({ configurePowerFlag: false});}}
                    okText="保存"
                    cancelText="取消"
                >
                    <Checkbox.Group style={{ width: '100%' }} configroles={this.state.configPowers} onChange={this.onChange.bind(this)}>
                        { this.state.configPowers.map((item,index) =>{
                            console.log(item,'fdsa')
                            let flag = false;
                            if (this.state.itemConfigPower){
                                this.state.itemConfigPower.map(value =>{
                                    if (value === item.permissionId){
                                        flag = true;
                                    }
                                })
                            }
                            return (
                                <Checkbox key={item.permissionId} value={item.permissionId} checked={flag}> {item.name}</Checkbox>
                            )
                        })}
                    </Checkbox.Group>
                </Modal>
            </div>
        )
    }
}
export default Form.create("ProjectData")(RoleList);