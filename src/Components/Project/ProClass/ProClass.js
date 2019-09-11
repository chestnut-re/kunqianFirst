import React,{ Component } from "react"
import AddForm from "./AddForm"
import UpdateForm from "./UpdateForm"
import ProjectService from "../../../Service/ProjectService";
import Utils from "../../../Utils/Class/Utils"
import { Form, Row, Col, Input, Button ,Table, PageHeader, Modal,Pagination, Select, message} from 'antd';
import "../../../Assets/Styles/common.less";
const { Option } = Select;

class ProClass extends Component{
    constructor(props) {
        super(props);
        this.ProjectService = new ProjectService();
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
        let id = Utils.getQueryParam(this.props.location,"id");
        this.pageOnChange(id);
    }
    // 分页
    pageOnChange(id) {
        this.ProjectService.getList(id).then((res)=> {
            let result = res.data;
            console.log(result)
            if (result.code > 0) {
                let treeData = Utils.tableTreeIteration(result.data, {parentName: "parentId", parentId: 0, idName: "speciesId"});
                let classData = Utils.navTreeIteration(result.data, 0,"speciesId","parentId","name");
                this.setState({
                    loading:false,
                    dataSource:treeData,
                    classData: classData,
                })
                console.log(treeData)
                console.log(classData)
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
    // 查询
    selectAction() {
        this.props.form.validateFields((err, values)=>{
            if(!err) {
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
        let corpusCateId = Utils.getQueryParam(this.props.location,"id");
        if (flag === "ADD"){
            let data = this.AddForm.getFormContent();
            if(!data.speciesId){
                data.speciesId = 0
            }
            data.corpusCateId = corpusCateId;
            console.log(data)
            //data.name = this.state.classData[speciesId].value
            this.ProjectService.classInstall(data).then(res=> {
                if (res.data.code > 0) {
                    message.success("增加成功!");
                    this.AddForm.restForm();
                    this.setState({
                        addItemFlag: false
                    })
                    this.pageOnChange(Utils.getQueryParam(this.props.location,"id"));
                } else {
                    message.error("增加失败");
                }
            })
        } else if(flag === "UPDATE"){
            let data = this.UpdateForm.getFormContent();
            data.corpusCateId = corpusCateId;
            console.log(data)
            this.ProjectService.proClassUpdate(data).then(res=> {
                if (res.data.code > 0) {
                    message.success("修改成功!");
                    this.setState({
                        updateItemFlag: false
                    })
                    this.pageOnChange(Utils.getQueryParam(this.props.location,"id"));
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
        let corpusCateId = Number(Utils.getQueryParam(this.props.location,"id"));
        let speciesId = Number(this.state.selectedRowKeys.join())
        console.log(this.state.selectedRowKeys)
        this.ProjectService.listDelete({corpusCateId,speciesId}).then(res=>{
            if (res.data.code>0) {
                message.success("删除成功！");
                this.pageOnChange(Utils.getQueryParam(this.props.location,"id"));
            } else {
                message.error("删除失败");
            }
        })
    }
    render() {
        const columns = [
            {
                title:"分类名称",
                dataIndex:"name"
            },{
                title:"操作",
                render: (text, record) => (
                    <Button.Group>
                        {/*<Button type={"primary"} size={"small"} onClick={this.updateAction.bind(this, record)}>修改</Button>*/}
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
                <PageHeader title="类目列表"/>
                <div className="table-operations">
                    <Button onClick={this.deleteItem.bind(this)} type={"primary"} disabled={!hasSelected}>删除</Button>
                    <Button onClick={()=> {this.setState({ addItemFlag: true})}} type={"primary"}>新增</Button>
                </div>
                <Table size={"small"}
                       rowSelection={rowSelection}
                       rowKey={record => record.speciesId}
                       loading={this.state.loading}
                       columns={columns}
                       dataSource={this.state.dataSource}
                       pagination={ false }/>
                <Modal
                    title="增加类目"
                    visible={this.state.addItemFlag}
                    onOk={this.handleOk.bind(this, "ADD")}
                    onCancel={()=>{this.setState({ addItemFlag: false});}}
                    okText="保存"
                    cancelText="取消"
                >
                    <AddForm dataClass={this.state.classData} onRef={this.onRef.bind(this)}/>
                </Modal>
                <Modal
                    title="修改类目"
                    visible={this.state.updateItemFlag}
                    onOk={this.handleOk.bind(this, "UPDATE")}
                    onCancel={()=>{this.setState({ updateItemFlag: false});}}
                    okText="保存"
                    cancelText="取消">
                    <UpdateForm dataUpdate={this.state.updateData} onRef={this.onRef.bind(this)}/>
                </Modal>
            </div>
        )
    }
}
export default Form.create("ProClass")(ProClass);