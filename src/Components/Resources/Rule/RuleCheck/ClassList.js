import React,{ Component } from "react"
import ResourcesService from '../../../../Service/ResourcesService';
import { Form, Row, Col, Input, Button ,Table, PageHeader, Modal, Icon, Select, message} from 'antd';
import PageComponent from '../../../../Utils/Component/PageComponent/PageComponent';
import "../../../../Assets/Styles/common.less";
import Utils from '../../../../Utils/Class/Utils';
import AddForm from "./AddForm"
import UpdateForm from "./UpdateForm"
const { Option } = Select;


class ClassList extends Component{
    constructor(props) {
        super(props);
        this.ResourcesService = new ResourcesService();
        this.state = {
            // 审核弹出框
            visible: false,
            // // 弹出框
            addItemFlag: false,
            updateItemFlag: false,
            configureRoleFlag: false,
            // //table分页
            dataSource:[],
            loading:true,
            selectedRowKeys: [],
            // // 分类
            // projectClass: [],
            // // 修改回显
             updateData:null,
             itemId:null,
        }
    }
    componentDidMount() {
        this.refs.PageComponent.selectAll({id:Utils.getQueryParam(this.props.location,'id')})
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
    handleModalOk(flag) {
        if (flag === "ADD"){
            let data = this.AddForm.getFormContent();
            let dataId = Utils.getQueryParam(this.props.location,'id')
            this.ResourcesService.ClassRuleListUrl({...data,ruleId:dataId}).then(res=> {
                if (res.data.code > 0) {
                    message.success("增加成功!");
                    this.AddForm.restForm();
                    this.setState({
                        addItemFlag: false
                    })
                } else {
                    message.error("增加失败");
                }
            })
        } else if(flag === "UPDATE"){
            let data = this.UpdateForm.getFormContent();
            this.ResourcesService.UpdateClassRuleUrl(data).then(res=> {
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

    //审核弹框
    showModal = (record) => {
        this.setState({
            visible: true,
            itemId: record.id,
        });
    };
    handleOk = e => {
        this.ResourcesService.ruleChecklistUrl([this.state.itemId.toString()]).then(res=>{
            if (res.data.code>0) {
                message.success("审核成功！");
                this.setState({
                    visible: false,
                });
            } else {
                message.error("审核失败");
            }
        })
    };
    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
    // 批量操作
    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };
    //删除
    deleteItem() {
        this.ResourcesService.ruleDeleteCheckUrl(this.state.selectedRowKeys).then(res=>{
            if (res.data.code>0) {
                message.success("删除成功！");
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
        }
    }
    render() {
        const columns = [
           {
                title:"规则内容",
                dataIndex:"ruleContent"
            }, {
                title:"规则对应分类名称",
                dataIndex:"ruleSpecies",
            },{
                title:"规则对应分类编号",
                dataIndex:"ruleSpeciesId"
            },{
                title:"状态",
                dataIndex:"itemStateId"
            },{
                title:"分类对应的分类体系编号",
                dataIndex:"ruleCateId"
            },{
                title:"规则创建者",
                dataIndex:"creator"
            },{
                title:"规则创建时间",
                dataIndex:"createTime"
            },{
                title:"规则创建者编号",
                dataIndex:"creatorId"
            },{
                title:"操作",
                render: (text, record) => (
                    <Button.Group>
                        <Button type="primary" size='small' onClick={this.updateAction.bind(this, record)}><Icon type="edit" /></Button>
                        <Button type="primary" size='small' onClick={this.showModal.bind(this,record)} ><Icon type="user" /></Button>
                        <Button type={"primary"}  size='small'><Icon type="download" /></Button>
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
                <PageHeader title="规则列表"/>
                <div className="table-operations">
                    <Button onClick={this.deleteItem.bind(this)} type={"primary"} disabled={!hasSelected}>删除</Button>
                    <Button onClick={()=> {this.setState({ addItemFlag: true})}} type={"primary"}>新增</Button>
                </div>
                <Table size={"small"} rowSelection={rowSelection} rowKey={record => record.id} loading={this.state.loading} columns={columns} dataSource={this.state.dataSource} pagination={ false }/>
                <PageComponent
                    url={this.ResourcesService.RuleConsultId}
                    ref={"PageComponent"}
                    dataSource={this.getDataSource.bind(this)}/>
                {/*<Modal*/}
                {/*    title="增加分类规则"*/}
                {/*    visible={this.state.addItemFlag}*/}
                {/*    onOk={this.handleModalOk.bind(this, "ADD")}*/}
                {/*    onCancel={()=>{this.setState({ addItemFlag: false});}}*/}
                {/*    okText="保存"*/}
                {/*    cancelText="取消"*/}
                {/*>*/}
                {/*    <AddForm dataClass={this.state.projectClass} onRef={this.onRef.bind(this)}/>*/}
                {/*</Modal>*/}
                {/*<Modal*/}
                {/*    title="修改分类规则"*/}
                {/*    visible={this.state.updateItemFlag}*/}
                {/*    onOk={this.handleModalOk.bind(this, "UPDATE")}*/}
                {/*    onCancel={()=>{this.setState({ updateItemFlag: false});}}*/}
                {/*    okText="保存"*/}
                {/*    cancelText="取消"*/}
                {/*>*/}
                {/*    <UpdateForm dataClass={this.state.projectClass} dataUpdate={this.state.updateData} onRef={this.onRef.bind(this)}/>*/}
                {/*</Modal>*/}
            </div>
        )
    }0.
}
export default Form.create("rule")(ClassList);
