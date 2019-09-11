import React,{ Component } from "react"
import AddForm from "./AddForm"
import UpdateForm from "./UpdateForm"
import FlowClassService from "../../../../Service/FlowClassService";
import Utils from "../../../../Utils/Class/Utils"
import { Form, Row, Col, Input, Button ,Table, PageHeader, Modal,Pagination, Select, message} from 'antd';
import "../../../../Assets/Styles/common.less";
const { Option } = Select;

class ObjClass extends Component{
    constructor(props) {
        super(props);
        this.FlowClassService = new FlowClassService();
        this.state = {
            // 弹出框
            addItemFlag: false,
            updateItemFlag: false,
            //table分页
            dataSource:[],
            loading:true,
            selectedRowKeys: [],
            // 修改回显
            updateData:null,
            // 分类
            classData:[],
        }
    }
    componentDidMount() {
        this.pageOnChange();
    }
    // 分页
    pageOnChange() {
        this.FlowClassService.selectObjClass().then((res)=> {
            let result = res.data;
            if (result.code > 0) {
                let treeData = Utils.tableStrTreeIteration(result.data, {parentName: "parentId", parentId: "0", idName: "categoryId"});
                let classData = Utils.navTreeStrIteration(result.data, "0","categoryId","parentId","categoryName");
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
    showTotal(total) {
        return `总共${total}条`
    }
    // 批量操作
    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };
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
            this.FlowClassService.installObjClass(data).then(res=> {
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
            this.FlowClassService.updateObjClass({categoryName:data.categoryName,categoryId:data.categoryId}).then(res=> {
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
    deleteItem(query) {
        this.ProjectService.delete(this.state.selectedRowKeys).then(res=>{
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
                title:"分类名称",
                dataIndex:"categoryName"
            },{
                title:"操作",
                render: (text, record) => (
                    <Button.Group>
                        <Button type={"primary"} size={"small"} onClick={this.updateAction.bind(this, record)}>修改</Button>
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
                <PageHeader title="业务对象分类"/>
                <div className="table-operations">
                    <Button onClick={this.deleteItem.bind(this)} type={"primary"} disabled={!hasSelected}>删除</Button>
                    <Button onClick={()=> {this.setState({ addItemFlag: true})}} type={"primary"}>新增</Button>
                </div>
                <Table size={"small"} rowSelection={rowSelection} rowKey={record => record.categoryId} loading={this.state.loading} columns={columns} dataSource={this.state.dataSource} pagination={ false }/>
                <Modal
                    title="增加项目"
                    visible={this.state.addItemFlag}
                    onOk={this.handleOk.bind(this, "ADD")}
                    onCancel={()=>{this.setState({ addItemFlag: false});}}
                    okText="保存"
                    cancelText="取消"
                >
                    <AddForm dataClass={this.state.classData} onRef={this.onRef.bind(this)}/>
                </Modal>
                <Modal
                    title="修改项目"
                    visible={this.state.updateItemFlag}
                    onOk={this.handleOk.bind(this, "UPDATE")}
                    onCancel={()=>{this.setState({ updateItemFlag: false});}}
                    okText="保存"
                    cancelText="取消"
                >
                    <UpdateForm dataUpdate={this.state.updateData} onRef={this.onRef.bind(this)}/>
                </Modal>
            </div>
        )
    }
}
export default Form.create("ObjClass")(ObjClass);