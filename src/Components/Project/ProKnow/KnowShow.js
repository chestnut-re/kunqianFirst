import React,{ Component } from "react"
import ProjectService from "../../../Service/ProjectService";
import {Redirect} from "react-router-dom"
import PageComponent from '../../../Utils/Component/PageComponent/PageComponent'
import { Form, Row, Col, Input, Typography, Button ,Table, PageHeader, Modal,Pagination, Tag, Select, message} from 'antd';
import "../../../Assets/Styles/common.less";
const { Option } = Select;
const { Paragraph } = Typography;

class ProList extends Component{
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
            // 分类
            projectClass: [],
            // 修改回显
            updateData:null,
        }
    }
    componentDidMount() {
       this.refs.PageComponent.selectAll()
       //  this.ProjectService.showClassifyFromMongo({pageSize:1,pageNum:5}).then((res) =>{
       //      let result = res.data;
       //      if (result.code > 0){
       //          this.setState({
       //              dataSource:result.data,
       //              loading:false
       //          })
       //      } else {
       //          message.error(result.msg);
       //      }
       //
       //  })
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
    // 查询分类
    // selectClass() {
    //     this.ProjectService.selectClass().then((res) => {
    //         let result = res.data;
    //         if (result.code > 0) {
    //             this.setState({
    //                 projectClass: result.data
    //             })
    //         } else {
    //             message.error("项目分类查询失败！")
    //         }
    //     })
    // }
    //更新
    // updateAction(record) {
    //     this.setState({
    //         updateItemFlag: true,
    //         updateData:record
    //     })
    // }

    getDataSource(dataSource) {
        if (dataSource) {
            this.setState({
                dataSource: dataSource,
                loading:false
            })
        }
    }
    render() {
        const columns = [
            {
                title:"编号",
                dataIndex:"file_id"
            },{
                title:"标题",
                dataIndex:"typeName"
            },{
                title:"正文",
                dataIndex:"content",
            },{
                title:"体系",
                dataIndex:"sys_id",
            },{
                title:"类别",
                dataIndex:"cate_id",
            }
            // ,{
            //     title:"操作",
            //     render: (text, record) => (
            //         <Button.Group>
            //             <Button type={"primary"} size={"small"} onClick={this.openObject.bind(this, record)}>进入项目</Button>
            //             <Button type={"primary"} size={"small"} onClick={this.updateAction.bind(this, record)}>修改</Button>
            //         </Button.Group>
            //     )
            // }
        ]
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const { getFieldDecorator } = this.props.form;
        const hasSelected = this.state.selectedRowKeys.length > 0;
        return(
            <div style={{padding:'10px'}}>
                <PageHeader title="智能分类-分类结果展示"/>
                <Form style={{marginBottom:20}}>
                    <Row span={24} gutter={40}>
                        {/*<Col span={8}>*/}
                            {/*<Form.Item label={"项目名称"}>*/}
                                {/*{getFieldDecorator('itemName', {})(<Input placeholder={"请输入"}/>)}*/}
                            {/*</Form.Item>*/}
                        {/*</Col>*/}
                        {/*<Col span={8}>*/}
                            {/*<Form.Item label={"项目类别"}>*/}
                                {/*{getFieldDecorator('typeName', {})(<Select placeholder={"全部"}>*/}
                                    {/*{this.state.projectClass ?this.state.projectClass.map(item=>{*/}
                                        {/*return <Select.Option value={item.itemTypeId} key={item.itemTypeId}>{item.typeName}</Select.Option>*/}
                                    {/*}):null}*/}
                                {/*</Select>)}*/}
                            {/*</Form.Item>*/}
                        {/*</Col>*/}
                        {/*<Col span={8}>*/}
                            {/*<Form.Item label={"项目状态"}>*/}
                                {/*{getFieldDecorator('stateName', {})(<Select placeholder={"全部"}>*/}
                                    {/*<Option value="0">建设中</Option>*/}
                                    {/*<Option value="1">未审核</Option>*/}
                                    {/*<Option value="2">发布</Option>*/}
                                    {/*<Option value="3">失效</Option>*/}
                                {/*</Select>)}*/}
                            {/*</Form.Item>*/}
                        {/*</Col>*/}
                        <Col span={24} style={{ textAlign: 'center' }}>
                            <Button type={"primary"} onClick={this.selectAction.bind(this)}>查询</Button>
                            <Button style={{ marginLeft: 30 }} onClick={()=>{this.props.form.resetFields()}}  type={"primary"}>重置</Button>
                        </Col>
                    </Row>
                </Form>
                <PageHeader title="项目列表"/>
                <div className="table-operations">
                    {/*<Button onClick={this.deleteItem.bind(this)} type={"primary"} disabled={!hasSelected}>删除</Button>*/}
                    {/*<Button onClick={()=> {this.setState({ addItemFlag: true})}} type={"primary"}>新增</Button>*/}
                </div>
                <Table size={"small"} rowSelection={rowSelection} rowKey={record => record.itemId} loading={this.state.loading} columns={columns} dataSource={this.state.dataSource} pagination={ false }/>
                <PageComponent
                    url={this.ProjectService.showClassifyFromMongoUrl}
                    ref={"PageComponent"}
                    dataSource={this.getDataSource.bind(this)}/>

            </div>
        )
    }
}
export default Form.create("ProjectData")(ProList);