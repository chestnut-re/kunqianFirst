import React,{ Component } from "react"
import ResourcesService from "../../../../Service/ResourcesService";
import {Form, Row, Col, Input, Button, Table, PageHeader, Modal, Select, Icon,message} from 'antd';
import PageComponent from '../../../../Utils/Component/PageComponent/PageComponent'
import "../../../../Assets/Styles/common.less";
const { Option } = Select;

class RuleList extends Component{
    constructor(props) {
        super(props);
        this.ResourcesService = new ResourcesService();
        this.state = {
            // // 弹出框
            visible:false,
            // //table分页
            dataSource:[],
            loading:true,
            selectedRowKeys: [],
            itemId:null,
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
        this.ResourcesService.ruleCheckUrl([this.state.itemId.toString()]).then(res=>{
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

    // 根据id查看详情
    toDetail (record) {
        // console.log(record,'qqqqq')
        switch (record.ruleTypeId) {
            case '分类':
                this.props.history.push("/resources/rule/checkRule/list?id="+record.id);
                break;
            case '属性抽取':
                this.props.history.push("/resources/rule/selectRule/list?id="+record.id);
                break;
        }
    }
    //删除
    deleteItem() {
        this.ResourcesService.ruleDeleteUrl(this.state.selectedRowKeys).then(res=>{
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
                title:"规则集合名称",
                dataIndex:"name",
            },{
                title:"规则类型",
                dataIndex:"ruleTypeId",
            },{
                title:"规则状态",
                dataIndex:"itemStateId"
            },{
                title:"规则存储类型",
                dataIndex:"asveType"
            },{
                title:"所属项目编号",
                dataIndex:"itemId"
            },{
                title:"规则应用场景",
                dataIndex:"useCase",
            },{
                title:"规则创建者",
                dataIndex:"creator"
            },{
                title:"规则创建时间",
                dataIndex:"createTime"
            },{
                title:"规则描述",
                dataIndex:"description",
            },{
                title:"操作",
                render: (text, record) => (
                    <Button.Group>
                        <Button type="primary" size='small' onClick={this.toDetail.bind(this,record)}><Icon type="eye" /></Button>
                        <Button type="primary" size='small' onClick={this.showModal.bind(this,record)} ><Icon type="user" /></Button>
                        <Button type="primary" size='small' ><Icon type="arrow-down" /></Button>
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
                <PageHeader title="规则管理"/>
                <Form style={{marginBottom:20}}>
                    <Row span={24} gutter={40}>
                        <Col span={8}>
                            <Form.Item label={"内容"}>
                                {getFieldDecorator('content', {})(<Input placeholder={"请输入"}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label={"规则"}>
                                {getFieldDecorator('rule', {})(<Select placeholder={"分类规则"}>
                                    <Option value="1">分类规则</Option>
                                    <Option value="2">标注规则</Option>
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
                <PageHeader title="规则列表"/>
                <div className="table-operations">
                    <Button onClick={this.deleteItem.bind(this)} type={"primary"} disabled={!hasSelected}>删除</Button>
                </div>
                <Table size={"small"} rowSelection={rowSelection} rowKey={record => record.id} loading={this.state.loading} columns={columns} dataSource={this.state.dataSource} pagination={ false }/>
                <PageComponent
                    url={this.ResourcesService.getRuleList}
                    ref={"PageComponent"}
                    dataSource={this.getDataSource.bind(this)}/>
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
    }0.
}
export default Form.create("rule")(RuleList);