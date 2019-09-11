import React,{ Component } from "react"
import ResourcesService from '../../../../Service/ResourcesService';
import {Form, Row, Col, Input, Button, Table, PageHeader, Modal, Icon, Select, message,} from 'antd';
import PageComponent from '../../../../Utils/Component/PageComponent/PageComponent';
import "../../../../Assets/Styles/common.less";
import Utils from '../../../../Utils/Class/Utils';
const { Option } = Select;

class CheckList extends Component{
    constructor(props) {
        super(props);
        this.ResourcesService = new ResourcesService();
        this.state = {
            // 审核弹出框
            visible: false,
            // // 弹出框
            addItemFlag: false,
           // updateItemFlag: false,
            configureRoleFlag: false,
            // //table分页
            dataSource:[],
            loading:true,
            selectedRowKeys: [],
            contentTxt:null,
            corpusId:null,
        }
    }

    componentDidMount() {
        this.refs.PageComponent.selectAll({id:Utils.getQueryParam(this.props.location,'id')})

    }
    showModal =(record) => {
        this.setState({
            contentTxt:record.content,
            visible: true,
        });
     }


    handleOk = e => {
        this.setState({
            visible: false,
        });
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
                dataIndex:"num",
            },{
                title:"内容",
                dataIndex:"content"
            },{
                title:"创建者",
                dataIndex:"creator"
            },{
                title:"操作",
                render: (text, record) => (
                    <Button.Group>
                        <Button type="primary" size='small'  onClick={this.showModal.bind(this,record)}><Icon type="eye" /></Button>
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
                <PageHeader title="语料列表"/>
                <Table size={"small"} rowSelection={rowSelection} rowKey={record => record.id} loading={this.state.loading} columns={columns} dataSource={this.state.dataSource} pagination={ false }/>
                <PageComponent
                    url={this.ResourcesService.corpusIdGet}
                    ref={"PageComponent"}
                    dataSource={this.getDataSource.bind(this)}/>
                <Modal
                    title="详细内容"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div className="contentTxt">{this.state.contentTxt}</div>
                </Modal>
            </div>
        )
    }
}
export default Form.create("Corpus")(CheckList);

