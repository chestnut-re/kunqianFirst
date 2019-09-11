import React, {Component} from 'react';
import {Form, Input, Modal, Select, message} from 'antd';
import ProjectService from "../../../Service/ProjectService";
import FlowItem from './FlowAtlas';
const { Option } = Select;
class AddAtlas extends Component{
    constructor (props) {
        super(props)
        this.ProjectService = new ProjectService();
        this.state = {
            flowItemFlag:false,
            flowTasks:[]
        }
    }
    getFormContent() {
        let result;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                result = values;
            }
        })
        return result;
    }
    restForm() {
        this.props.form.resetFields();
    }
    componentDidMount() {
        this.props.onRef("AddForm", this);
    }
    openFlowItem(values) {
        this.ProjectService.selectFlowItem({processDefineId:values}).then(res=>{
            let result = res.data;
            if (result.code > 0) {
                this.setState({
                    flowItemFlag:true,
                    flowTasks:result.data,
                })
            } else {
                message.error(result.msg);
            }
        })
    }
    handleOk() {
        //this.props.history.push("/resources/put_atlas")
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <div>
                <Form>
                    <Form.Item label={"图谱名称"}>
                        {getFieldDecorator("name", {
                            rules: [
                                { required: true, message: '图谱名称不能为空' },
                             ]
                        })(<Input placeholder={"请输入图谱名称"}/>)}
                    </Form.Item>
                    <Form.Item label={"图谱类型"}>
                        {getFieldDecorator("type", {
                            rules: [
                                { required: true, message: '图谱类型不能为空' },
                            ]
                        })(<Input placeholder={"请输入图谱类型"}/>)}
                    </Form.Item>
                    <Form.Item label={"数据来源"}>
                        {getFieldDecorator('source', {
                            rules: [
                                { required: true, message: '图谱类型不能为空' },
                            ]
                        })(<Select placeholder={"请选择数据来源"}>
                            <Option value="外部导入">外部导入</Option>
                            <Option value="人工输入">人工输入</Option>
                        </Select>)}
                    </Form.Item>
                    {/*<Form.Item label={"选择流程"}>*/}
                        {/*{getFieldDecorator("bpmnProcessDefineId", {*/}
                                {/*// rules: [*/}
                                {/*//     { required: true, message: '流程不能为空' },*/}
                                {/*// ]*/}
                            {/*})(<Select placeholder={"请选择流程"} onChange={this.openFlowItem.bind(this)}>*/}
                                {/*{this.props.flowClass.map(item => {*/}
                                    {/*return <Select.Option value={item.defineId} key={item.defineId}>{item.name}</Select.Option>;*/}
                                {/*})}*/}
                    {/*</Select>)}*/}
                    {/*</Form.Item>*/}
                    <Form.Item label={"描述"} style={{marginLeft:'40px'}}>
                        {getFieldDecorator("description", {

                        })(<Input.TextArea placeholder={"请输入图谱描述"}/>)}
                    </Form.Item>
                </Form>
                <Modal
                    visible={this.state.flowItemFlag}
                    onOk={this.handleOk.bind(this, "FlowItem")}
                    onCancel={()=>{this.setState({ flowItemFlag: false});}}
                    okText="保存"
                    cancelText="取消">
                    <FlowItem flowTasks={this.state.flowTasks} />
                </Modal>
            </div>
        )
    }
}
export default Form.create()(AddAtlas);