 import React,{ Component } from "react"
import  AddForm from "./AddForm"
import UpdateForm from "./UpdateForm"
import HomeService from "../../../Service/HomeService";
import Utils from "../../../Utils/Class/Utils"
import { Form, Button ,Table, PageHeader, Modal, Select, message} from 'antd';
 import PageComponent from '../../../Utils/Component/PageComponent/PageComponent'
import "../../../Assets/Styles/common.less";


class PowerList extends Component{
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
        }
    }
    componentDidMount() {
         this.pageOnChange();
    }
    // 分页
    pageOnChange() {
        this.HomeService.powerSelectAll().then((res)=> {
            let result = res.data;
            console.log(result)
            if (result.code > 0) {
                let treeData = Utils.tableStrTreeIteration(result.data, {parentName: "parentId", parentId: "0", idName: "permissionId"});
                let classData = Utils.navTreeStrIteration(result.data, "0","permissionId","parentId","name");
                // console.log(classData)
                this.setState({
                    loading:false,
                    dataSource:treeData,
                    classData: classData,
                })
            } else {
                message.error(result.msg)
            }
        })
    }
    onShowSizeChange(current, pageSize) {
        this.HomeService.powerSelectAll({pageNum:this.state.pageNum, pageSize:pageSize}).then((res)=> {
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
                this.HomeService.powerSelectAll({businessObjectEntity:values}).then((res)=> {
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
            if (!data.parentId) {
                data.parentId = 0;
            }
            this.HomeService.powerInstall(data).then(res=> {
                if (res.data.code > 0) {
                    message.success("增加成功!");
                    this.AddForm.restForm();
                    this.setState({
                        addItemFlag: false
                    })
                    this.pageOnChange();
                } else {
                    message.error("增加失败");
                }
            })
        } else if(flag === "UPDATE"){
            let data = this.UpdateForm.getFormContent();
            this.HomeService.powerUpdate(data).then(res=> {
                if (res.data.code > 0) {
                    message.success("修改成功!");
                    this.setState({
                        updateItemFlag: false
                    })
                    this.pageOnChange();
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
    //删除
    deleteItem() {
        this.HomeService.powerDelete(this.state.selectedRowKeys).then(res=>{
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
                title:"功能名称",
                dataIndex:"name"
            },{
                title:"关键字查询名称",
                dataIndex:"alias",
            },{
                title:"备注",
                dataIndex:"depict",
            },{
                title:"级别",
                dataIndex:"level",
            },{
                title:"访问路径",
                dataIndex:"url"
            },{
                title:"详情提示",
                dataIndex:"detail"
            },{
                title:"分组名称",
                dataIndex:"groupName"
            },{
                title:"icon图标",
                dataIndex:"icon"
            }, {
                title:"上级id",
                dataIndex:"parentId"
            },{
                title:"属性",
                dataIndex:"priority"
            },{
                title:"状态",
                dataIndex:"status"
            },{
                title:"操作",
                render: (text, record) => (
                    <Button.Group>
                        <Button type={"primary"} onClick={this.updateAction.bind(this, record)}>修改</Button>
                    </Button.Group>
                )
            }
        ]
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = this.state.selectedRowKeys.length > 0;
        return(
            <div style={{padding:'10px'}}>
                <PageHeader title="权限列表"/>
                <div className="table-operations">
                    <Button onClick={this.deleteItem.bind(this)} type={"primary"} disabled={!hasSelected}>删除</Button>
                    <Button onClick={()=> {this.setState({ addItemFlag: true})}} type={"primary"}>新增</Button>
                </div>
                <Table size={"small"} rowSelection={rowSelection} rowKey={record => record.permissionId} loading={this.state.loading} columns={columns} dataSource={this.state.dataSource} pagination={ false }/>
                <Modal
                    title="增加权限"
                    visible={this.state.addItemFlag}
                    onOk={this.handleOk.bind(this, "ADD")}
                    onCancel={()=>{this.setState({ addItemFlag: false});}}
                    okText="保存"
                    cancelText="取消"
                >
                    <AddForm dataClass={this.state.classData} onRef={this.onRef.bind(this)}/>
                </Modal>
                <Modal
                    title="修改权限"
                    visible={this.state.updateItemFlag}
                    onOk={this.handleOk.bind(this, "UPDATE")}
                    onCancel={()=>{this.setState({ updateItemFlag: false});}}
                    okText="保存"
                    cancelText="取消"
                >
                    <UpdateForm dataClass={this.state.projectClass} dataUpdate={this.state.updateData} onRef={this.onRef.bind(this)}/>
                </Modal>
            </div>
        )
    }
}
export default Form.create("ProjectData")(PowerList);