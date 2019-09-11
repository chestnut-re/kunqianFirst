import React,{ Component } from "react"
import {Button, message, Pagination, Table, Tag, Form} from "antd";
import FlowPathEntityService from "../../../../Service/FlowPathEntityService";
import PageComponent from "../../../../Utils/Component/PageComponent/PageComponent"
class SelectBusinessEntity extends Component{
    constructor(props) {
        super(props);
        this.FlowPathEntityService = new FlowPathEntityService();
        this.state = {
            // 弹出框
            addItemFlag: true,
            updateItemFlag: false,
            //table分页
            dataSource:[],
            pageSize: 10,
            pageNum: 1,
            total:1,
            loading:true,
            selectedRowKeys: [],
            // 树结构
            treeData: [],
        }
    }
    componentDidMount() {
        this.props.onRef("SelectBusinessEntity", this);
    }

    dataSource(dataSource){
        this.setState({
            dataSource:dataSource,
            loading:false
        })
    }
    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    }
    getContentData() {
        let Arr = [];
        let dataSource = this.state.dataSource;
        for (let i = 0; i < dataSource.length; i++) {
            let data = this.state.selectedRowKeys;
            for (let j = 0; j < data.length; j++){
                if (dataSource[i].id === data[j]) {
                    Arr.push(dataSource[i]);
                }
            }
        }
        return Arr;
    }
    render() {
        const columns = [
            {
                title:"名称",
                dataIndex:"alias"
            },{
                title:"对象描述",
                dataIndex:"depict"
            }
        ]
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div>
                <Table size={"small"} rowSelection={rowSelection} rowKey={record => record.id} loading={this.state.loading} columns={columns} dataSource={this.state.dataSource} pagination={ false }/>
                <PageComponent
                    ref={"PageComponent"}
                    dataSource={this.dataSource.bind(this)}
                    url={"/bpm/businessObjectDefine/getPage"}/>
            </div>
        )
    }
}
export default SelectBusinessEntity;