import React,{ Component } from "react"
import ResourcesService from "../../../../Service/ResourcesService";
import {Form, Row, Col, Input, Button, Table, PageHeader, Modal, Icon, Select, message, Switch} from 'antd';
import PageComponent from '../../../../Utils/Component/PageComponent/PageComponent'
import "../../../../Assets/Styles/common.less";
const { Option } = Select;

class DictionaryList extends Component{
    constructor(props) {
        super(props);
        this.ResourcesService = new ResourcesService();
        this.state = {
            // 审核弹出框
            visible: false,
            // //table分页
            dataSource:[],
            loading:true,
            selectedRowKeys: [],
            type: null
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

    // 根据type查看详情
    toDetail (record) {
        console.log(record)
        this.props.history.push("/resources/dictionary/detail?id="+record.id);
    }

    // // 根据type查看详情
     download (record) {
        console.log(record,'123456789')
        window.location.href= this.ResourcesService.download+"?id="+record.id;

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
                title:"序号",
                dataIndex:"id",
            },{
                title:"词典类别",
                dataIndex:"dictName"
            },{
                title:"创建者",
                dataIndex:"creator"
            },{
                title:"创建时间",
                dataIndex:"creatTime"
            },{
                title:"操作",
                render: (text, record) => (
                    <Button.Group>
                        <Button type="primary" size='small' onClick={this.toDetail.bind(this,record)} ><Icon type="eye" /></Button>
                        <Button type={"primary"}  size='small' onClick={this.download.bind(this,record)} ><Icon type="download" /></Button>
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
                <PageHeader title="词典管理"/>
                <Form style={{marginBottom:20}}>
                    <Row span={24} gutter={40}>
                        <Col span={8}>
                            <Form.Item label={"词语"}>
                                {getFieldDecorator('word', {})(<Input placeholder={"请输入"}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label={"行业"}>
                                {getFieldDecorator('industry', {})(<Input placeholder={"请输入"}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label={"状态"}>
                                {getFieldDecorator('creator', {})(<Select placeholder={"激活"}>
                                    <Option value="1">激活</Option>
                                    <Option value="2">停用</Option>
                                </Select>)}
                            </Form.Item>
                        </Col>
                        <Col span={24} style={{ textAlign: 'center' }}>
                            <Button type={"primary"} onClick={this.selectAction.bind(this)}>查询</Button>
                            <Button style={{ marginLeft: 30 }} onClick={()=>{this.props.form.resetFields()}}  type={"primary"}>重置</Button>
                        </Col>
                    </Row>
                </Form>
                <PageHeader title="词典列表"/>
                <Table size={"small"} rowSelection={rowSelection} rowKey={record => record.id} loading={this.state.loading} columns={columns} dataSource={this.state.dataSource} pagination={ false }/>
                <PageComponent
                url={this.ResourcesService.AllDictionaryList}
                ref={"PageComponent"}
                dataSource={this.getDataSource.bind(this)}/>
            </div>
        )
    }0.
}
export default Form.create("Corpus")(DictionaryList);