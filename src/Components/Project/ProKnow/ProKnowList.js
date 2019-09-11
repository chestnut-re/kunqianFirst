import React,{ Component } from "react";
import ProjectService from "../../../Service/ProjectService";
import {Button, Form, message, PageHeader, Pagination, Select, Table} from "antd";
import Utils from "../../../Utils/Class/Utils"
import "../../../Assets/Styles/common.less";
const { Option } = Select;

class ProKnowList extends Component {
    constructor(props) {
        super(props);
        this.ProjectService = new ProjectService();
        this.state = {
            //table分页
            dataSource:[],
            pageSize: 10,
            pageNum: 1,
            total:1,
            loading:true,
            selectedRowKeys: [],
        }
    }
    componentDidMount() {
        this.pageOnChange(this.state.pageNum);
    }
    check = () => {
        this.props.form.validateFields(err => {
            if (!err) {
                console.info('success');
            }
        });
        this.props.history.push('/project/knowledge')
    };
    // 分页
    pageOnChange(pageNum) {
        this.ProjectService.modelAll({pageNum:this.state.pageNum, pageSize:this.state.pageSize}).then((res)=> {
            let result = res.data.data;
            if (res.data.code > 0) {
                console.log(result)
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
        this.ProjectService.modelAll({pageNum:this.state.pageNum, pageSize:pageSize}).then((res)=> {
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
    // 批量操作
    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };
    render(){
        const columns = [
            {
                title:"名称",
                dataIndex:"name"
            },{
                title:"类型",
                dataIndex:"appId",
                render:(record)=>{
                    switch(parseInt(record)){
                        case 0:
                            return "文本分类";
                        case 1:
                            return "实体识别";
                        case 2:
                            return "分词";
                        default:
                            return "无类型";
                    }
                }
            },{
                title:"应用场景",
                dataIndex:"appId",
                render:(record)=>{
                    switch(parseInt(record)){
                        case 0:
                            return "给文本划分类别";
                        case 1:
                            return "识别命名实体";
                        case 2:
                            return "词语切分";
                        default:
                            return "无应用场景";
                    }
                }
            },{
                title:"模型描述",
                dataIndex:"description",
            },{
                title:"创建者",
                dataIndex:"creator",
            },{
                title:"创建时间",
                dataIndex:"createTime"
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
        const { getFieldDecorator } = this.props.form;
        const hasSelected = this.state.selectedRowKeys.length > 0;
        return(
            <div style={{padding:'10px'}}>
                <PageHeader title="分类列表"/>
                <div className="table-operations">
                    <Button style={{position: 'absolute',right: '0px'}} onClick={this.check} type={"primary"}>创建智能分类</Button>
                </div>
                <Table style={{marginTop:'50px'}}
                       size={"small"}
                       rowSelection={rowSelection}
                       rowKey={record => record.itemId}
                       loading={this.state.loading}
                       columns={columns}
                       dataSource={this.state.dataSource}
                       pagination={ false }/>
                <div>
                    <Pagination style={{marginTop:10}}
                                showTotal={this.showTotal.bind(this)}
                                defaultCurrent={this.state.pageSize}
                                total={this.state.total}
                                showSizeChanger
                                onChange={this.pageOnChange.bind(this)}
                                onShowSizeChange={this.onShowSizeChange.bind(this)}/>
                </div>
        </div>
        )
    }
}
export default Form.create("ProjectData")(ProKnowList);