import React,{ Component } from "react"
import AddForm from "./AddForm"
import ResourcesService from '../../../../Service/ResourcesService';
import {Form, Row, Col, Input, Button, Table, PageHeader, Modal, Icon, Select, message,} from 'antd';
import "../../../../Assets/Styles/common.less";
import PageComponent from "../../../../Utils/Component/PageComponent/PageComponent";
const { Option } = Select;

class CorpusList extends Component{
    constructor(props) {
        super(props);
        this.ResourcesService = new ResourcesService();
        this.state = {
            // 审核弹出框
            visible: false,
            // // 弹出框
             addItemFlag: false,
            // //table分页
             dataSource:[],
             loading:true,
             selectedRowKeys: [],
             itemId:null

        }
    }

    //审核弹框
    showModal =(record) => {
        this.setState({
            itemId: record.id,
            visible: true,
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    handleOk = e => {
        this.ResourcesService.corpusCheckUrl({id:this.state.itemId,itemStateId: 1}).then(res=>{
            if (res.data.code>0) {
                message.success("审核成功！");
                this.setState({
                    visible: false,
                });
                this.selectAction()
            } else {
                message.error("审核失败");
            }
        })
    };
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
            case "AddCorpus":
                this.AddCorpus = ref;
                break;
            default:
                break;
        }

    }
    addHandle() {
        let data = this.AddForm.getFormContent();
        this.ResourcesService.corpusInsert(data).then(res=> {
            console.log(data)
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

    // 根据id查看详情
    toDetail (record) {
        console.log(record)
        this.props.history.push("/resources/corpus/checkCorpus/list?id="+record.id);
    }
    //删除
    deleteItem() {
        this.ResourcesService.corpusDelete(this.state.selectedRowKeys).then(res=>{
            if (res.data.code>0) {
                message.success("删除成功！");
                this.selectAction()
            } else {
                message.error("删除失败");
            }
        })
    }
    getDataSource(dataSource){
        console.log(dataSource,'123')
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
                title:"语料名称",
                dataIndex:"name",
            },{
                title:"语料类别",
                dataIndex:"useCase"
            },{
                title:"项目Id",
                dataIndex:"tId",
            },{
                title:"描述",
                dataIndex:"description",
            },{
                title:"创建者",
                dataIndex:"creator"
            },{
                title:"创建时间",
                dataIndex:"createDate"
            },{
                title:"操作",
                render: (text, record) => (
                    <Button.Group>
                        <Button type="primary" size='small' onClick={this.toDetail.bind(this,record)}><Icon type="eye" /></Button>
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
                <PageHeader title="语料管理"/>
                <Form style={{marginBottom:20}}>
                    <Row span={24} gutter={40}>
                        <Col span={8}>
                            <Form.Item label={"语料名称"}>
                                {getFieldDecorator('itemName', {})(<Input placeholder={"请输入"}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label={"语料类别"}>
                                {getFieldDecorator('itemType', {})(<Select placeholder={"分类训练语料"}>
                                    <Option value="1">分类训练语料</Option>
                                    <Option value="2">实体训练语料</Option>
                                    <Option value="3">属性识别语料</Option>
                                    <Option value="4">分词语料</Option>
                                </Select>)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label={"状态"}>
                                {getFieldDecorator('status', {})(<Select placeholder={"发布"}>
                                    <Option value="1">未审核</Option>
                                    <Option value="2">发布</Option>
                                    <Option value="3">失效</Option>
                                </Select>)}
                            </Form.Item>
                        </Col>
                        <Col span={24} style={{ textAlign: 'center' }}>
                            <Button type={"primary"} onClick={this.selectAction.bind(this)}>查询</Button>
                            <Button style={{ marginLeft: 30 }} onClick={()=>{this.props.form.resetFields()}}  type={"primary"}>重置</Button>
                        </Col>
                    </Row>
                </Form>
                <PageHeader title="语料列表"/>
                <div className="table-operations">
                    <Button onClick={this.deleteItem.bind(this)} type={"primary"} disabled={!hasSelected}>删除</Button>
                    <Button onClick={()=> {this.setState({ addItemFlag: true})}} type={"primary"}>新增</Button>
                </div>
                <Table size={"small"} rowSelection={rowSelection} rowKey={record => record.id} loading={this.state.loading} columns={columns} dataSource={this.state.dataSource} pagination={ false }/>
                <PageComponent
                    url={this.ResourcesService.corpusSelectAllList}
                    ref={"PageComponent"}
                    dataSource={this.getDataSource.bind(this)}/>
                <Modal
                    title="增加语料"
                    visible={this.state.addItemFlag}
                    onOk={this.addHandle.bind(this)}
                    onCancel={()=>{this.setState({ addItemFlag: false});}}
                    okText="保存"
                    cancelText="取消"
                >
                    <AddForm dataClass={this.state.projectClass} onRef={this.onRef.bind(this)}/>
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
                    <p>请确认是否通过规则的的审核</p>
                </Modal>
            </div>
        )
    }
}
export default Form.create("Corpus")(CorpusList);