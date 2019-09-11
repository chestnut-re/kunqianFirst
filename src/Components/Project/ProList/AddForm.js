import React, {Component} from 'react';
import {Form, Input, Modal, Select, message} from 'antd';
import ProjectService from "../../../Service/ProjectService";
import FlowItem from './FlowItem';
class AddForm extends Component{
    constructor (props) {
        super(props)
        this.ProjectService = new ProjectService();
        this.myFlowItem = React.createRef();
        this.state = {
            flowItemFlag:false,
            flowTasks:[],
            bpmnData: null,
        }
    }
    getFormContent() {
        let result = {};
        this.props.form.validateFields((err, values) => {
            if (!err) {
                result.itemName = values.itemName;
                result.itemTypeID = values.itemTypeID;
                result.itemDescription = values.itemDescription;
                result.bpmnProcessDefineId = values.bpmnProcessDefineId;
                //result.tasks = this.state.bpmnData;
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
                console.log(result.data);
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
        let value = this.myFlowItem.getTaskItemData();
        let taskFields = [];
        let Arr = this.state.flowTasks;
        for(let i = 0; i < Arr.length;i++) {
            let task = {
                taskId:Arr[i].taskId,
                taskName:Arr[i].taskName,
                fieldName:Arr[i].fieldName,
                formId: Arr[i].formId
            }
            let taskFilds = [];
            for (let j = 0; j < Arr[i].taksAllFields.length; j++) {
                taskFilds.push({
                    "fieldName": Arr[i].taksAllFields[j].name,
                    "fieldValue": Arr[i].taksAllFields[j].id === "10000010000102" ? value : Arr[i].taksAllFields[j].defaultValue,
                    "depict": Arr[i].taksAllFields[j].depict,
                })
            }
            task.taskFields = taskFilds;
            taskFields.push(task);
        }
        this.setState({
            flowItemFlag:false,
            bpmnData:taskFields,
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <div>
                <Form>
                    <Form.Item label={"项目名称"}>
                        {getFieldDecorator("itemName", {
                            rules: [
                                { required: true, message: '项目名称不能为空' },
                             ]
                        })(<Input placeholder={"请输入项目名称"}/>)}
                    </Form.Item>
                    <Form.Item label={"项目类别"}>
                        {getFieldDecorator("itemTypeID", {
                            rules: [
                                { required: true, message: '项目类别不能为空' },
                            ]
                        })(<Select placeholder={"请选择项目类别"}>
                            {this.props.dataClass.map(item => {
                                return <Select.Option value={item.itemTypeId} key={item.itemTypeId}>{item.typeName}</Select.Option>;
                            })}
                        </Select>)}
                    </Form.Item>
                    <Form.Item label={"选择流程"}>
                        {getFieldDecorator("bpmnProcessDefineId", {
                                rules: [
                                    { required: true, message: '流程不能为空' },
                                ]
                            })(<Select placeholder={"请选择流程"}>
                                {this.props.flowClass.map(item => {
                                    return <Select.Option value={item.defineId} key={item.defineId}>{item.name}</Select.Option>;
                                })}
                    </Select>)}
                    </Form.Item>
                    <Form.Item label={"项目描述"}>
                        {getFieldDecorator("itemDescription", {

                        })(<Input.TextArea placeholder={"请输入项目描述"}/>)}
                    </Form.Item>
                </Form>
                <Modal
                    visible={this.state.flowItemFlag}
                    onOk={this.handleOk.bind(this, "FlowItem")}
                    onCancel={()=>{this.setState({ flowItemFlag: false});}}
                    okText="保存"
                    cancelText="取消">
                    <FlowItem flowTasks={this.state.flowTasks} wrappedComponentRef={(inst) => this.myFlowItem = inst} />
                </Modal>
            </div>
        )
    }
}
export default Form.create()(AddForm);