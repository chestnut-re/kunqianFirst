import React,{ Component } from "react"
import {Button, message, Pagination, Table, Tag, Form} from "antd";
import FlowPathEntityService from "../../../../Service/FlowPathEntityService";
class SelectEntity extends Component{
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
        this.pageOnChange(this.state.pageNum);
        this.props.onRef("SelectEntity", this);
    }
    // 分页
    pageOnChange(pageNum) {
        this.FlowPathEntityService.selectAll({pageNum:pageNum, pageSize:this.state.pageSize}).then((res)=> {
            let result = res.data.data;
            if (res.data.code > 0) {
                this.setState({
                    loading:false,
                    pageNum: pageNum,
                    total:result.total,
                    dataSource:result.list,
                })
            } else {
                message.error(res.data.msg)
            }
        })
    }
    onShowSizeChange(current, pageSize) {
        this.FlowPathEntityService.selectAll({pageNum:this.state.pageNum, pageSize:pageSize}).then((res)=> {
            let result = res.data.data;
            if (res.data.code> 0) {
                this.setState({
                    loading:false,
                    pageSize: pageSize,
                    total:result.total,
                    dataSource:result.list,
                })
            } else {
                message.error(res.data.msg)
            }
        })
    }
    showTotal(total) {
        return `总共${total}条`
    }
    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    }
    getContentData() {
        let result = this.state.dataSource.filter(item=>{
            return item.id === this.state.selectedRowKeys[0];
        })
        return result;
    }
    render() {
        const columns = [
            {
                title:"名称",
                dataIndex:"name"
            },{
                title:"对象描述",
                dataIndex:"depict"
            }
        ]
        const rowSelection = {
            type:"radio",
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div>
                <Table size={"small"} rowSelection={rowSelection} rowKey={record => record.id} loading={this.state.loading} columns={columns} dataSource={this.state.dataSource} pagination={ false }/>
                <Pagination size={"small"} style={{marginTop:10}} showTotal={this.showTotal.bind(this)}  defaultCurrent={1} total={this.state.total} showSizeChanger onChange={this.pageOnChange.bind(this)} onShowSizeChange={this.onShowSizeChange.bind(this)}/>
            </div>
        )
    }
}
export default SelectEntity;