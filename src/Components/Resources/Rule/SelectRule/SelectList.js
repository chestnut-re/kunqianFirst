import React,{ Component } from "react"
import ResourcesService from '../../../../Service/ResourcesService';
import {Form, Button, Table, PageHeader, Modal, Icon, Select, message, Row, Col, Input} from 'antd';
import PageComponent from '../../../../Utils/Component/PageComponent/PageComponent';
import "../../../../Assets/Styles/common.less";
import Utils from '../../../../Utils/Class/Utils';
import AddForm from "./AddForm"
import UpdateForm from "./UpdateForm"
const { Option } = Select;


class SelectList extends Component{
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


    onRef = (name, ref) => {
        switch (name) {
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
    //更新
    updateAction(record) {
        this.setState({
            updateItemFlag: true,
            updateData:record
        })
    }
    // 新增
    handleAddModalOk() {
            let data = this.AddForm.getFormContent();
            let dataId = Utils.getQueryParam(this.props.location, 'id')
            this.ResourcesService.AddSelectListUrl({...data, ruleId: dataId}).then(res => {
                console.log(res, '222')
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
        }
           //修改
     handleUpdateOk () {
         let data = this.UpdateForm.getFormContent();
         this.ResourcesService.UpdateSelectRuleUrl(data).then(res=> {
             if (res.data.code > 0) {
                 message.success("修改成功!");
                 this.setState({
                     updateItemFlag: false
                 })
                 this.selectAction()
             } else {
                 message.error("修改失败");
             }
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
        this.ResourcesService.ruleCheckSelectUrl([this.state.itemId.toString()]).then(res=>{
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
    //删除
    deleteItem() {
        this.ResourcesService.ruleDeleteSelectUrl(this.state.selectedRowKeys).then(res=>{
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
        }
    }
    render() {
        const columns = [
            {
                title:"属性名称",
                dataIndex:"propName",
            },{
                title:"父级属性名称",
                dataIndex:"propFather",
            },{
                title:"开始段落/句子",
                dataIndex:"beginLine"
            }, {
                title:"结束段落/句子",
                dataIndex:"endLine",
            },{
                title:"开始类名称",
                dataIndex:"beginCate"
            },{
                title:"开始类分类方法",
                dataIndex:"beginMethod"
            },{
                title:"开始类分类模型名称",
                dataIndex:"beginModel"
            },{
                title:"结束类名称",
                dataIndex:"endCate"
            },{
                title:"结束类分类方法",
                dataIndex:"endMethod"
            },{
                title:"结束类分类模型名称",
                dataIndex:"endModel"
            },{
                title:"句子切分方法",
                dataIndex:"splitMethod"
            },{
                title:"匹配特征",
                dataIndex:"matcher"
            },{
                title:"取值范围",
                dataIndex:"valScope"
            },{
                title:"属性体系",
                dataIndex:"propertySystem"
            },{
                title:"属性体系编号",
                dataIndex:"propsId",
            },{
                title:"是否分词",
                dataIndex:"isSeg",
            },{
                title:"词语词性",
                dataIndex:"wordPos",
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
        const { getFieldDecorator } = this.props.form;
        const hasSelected = this.state.selectedRowKeys.length > 0;
        return(
            <div style={{padding:'10px'}}>
                <PageHeader title="规则查询"/>
                <Form style={{marginBottom:20}}>
                    <Row span={24} gutter={40}>
                        <Col span={8}>
                            <Form.Item label={"属性名称"}>
                                {getFieldDecorator('propName', {})(<Input placeholder={"请输入"}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label={"属性体系"}>
                                {getFieldDecorator('propertySystem', {})(<Input placeholder={"请输入"}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={24} style={{ textAlign: 'center' }}>
                            <Button type={"primary"} onClick={this.selectAction.bind(this)}>查询</Button>
                            <Button style={{ marginLeft: 30 }} onClick={()=>{this.props.form.resetFields()}}  type={"primary"}>重置</Button>
                        </Col>
                    </Row>
                </Form>
                <PageHeader title="规则列表"/>
                <div className="table-operations">
                    <Button onClick={this.deleteItem.bind(this)} type={"primary"} disabled={!hasSelected}>删除</Button>
                    <Button onClick={()=> {this.setState({ addItemFlag: true})}} type={"primary"}>新增</Button>
                </div>
                <Table size={"small"} rowSelection={rowSelection} rowKey={record => record.id} loading={this.state.loading} columns={columns} dataSource={this.state.dataSource} pagination={ false }/>
                <PageComponent
                    url={this.ResourcesService.RuleSelectId}
                    ref={"PageComponent"}
                    dataSource={this.getDataSource.bind(this)}/>
                <Modal
                    title="增加抽取规则"
                    visible={this.state.addItemFlag}
                    onOk={this.handleAddModalOk.bind(this)}
                    onCancel={()=>{this.setState({ addItemFlag: false});}}
                    okText="保存"
                    cancelText="取消"
                >
                    <AddForm dataClass={this.state.projectClass} onRef={this.onRef.bind(this)}/>
                </Modal>
                <Modal
                    title="修改分类规则"
                    visible={this.state.updateItemFlag}
                    onOk={this.handleUpdateOk.bind(this)}
                    onCancel={()=>{this.setState({ updateItemFlag: false});}}
                    okText="保存"
                    cancelText="取消"
                >
                    <UpdateForm dataClass={this.state.projectClass} dataUpdate={this.state.updateData} onRef={this.onRef.bind(this)}/>
                </Modal>
                <Modal
                    title="审核"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            不通过
                        </Button>,
                        <Button key="submit" type="primary" onClick={this.handleOk}>
                            通过
                        </Button>,
                    ]}
                >
                    <p>请确认是否通过资源的的审核</p>
                </Modal>
            </div>
        )
    }
}
export default Form.create("rule")(SelectList);