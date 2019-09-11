import React, {Component} from 'react';
import {Button, Form, Input, message, Modal, TreeSelect} from 'antd'
import SelectBusinessEntity from "./SelectBusinessEntity";

class AddForm extends Component{
    constructor (props) {
        super(props)
        this.state = {
            selectAddFlag: false,
            entityList:[],
        }
    }
    getFormContent() {
        let result;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                result = values;
            }
            result.entityList = this.state.entityList;
        })
        return result;
    }
    restForm() {
        this.props.form.resetFields();
    }
    componentDidMount() {
        this.props.onRef("AddForm", this);
    }
    onRef = (name, ref) => {
        switch(name) {
            case "SelectBusinessEntity":
                this.SelectBusinessEntity = ref;
                break;
            default:
                break;
        }
    }
    handleOk(flag) {
        if(flag === "SelectBusinessEntity"){
            let SelectBusinessEntity = this.SelectBusinessEntity.getContentData();
            if (SelectBusinessEntity) {
                this.setState({
                    entityList:SelectBusinessEntity,
                    selectAddFlag: false,
                })
            }
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <div>
            <Form>
                <Form.Item label={"表单分类"}>
                    {getFieldDecorator("categoryId", {
                        rules: [
                            { required: true, message: '表单分类不能为空' },
                        ]
                    })(<TreeSelect placeholder={"请选择表单分类"} treeData={this.props.dataClass} treeDefaultExpandAll/>)}
                </Form.Item>
                <Form.Item label={"表单名称"}>
                    {getFieldDecorator("name", {
                        rules: [
                            { required: true, message: '表单名称不能为空' },
                        ]
                    })(<Input placeholder={"请输入表单名称"}/>)}
                </Form.Item>
                <Form.Item label={"别名"}>
                    {getFieldDecorator("key", {
                        rules: [
                            { required: true, message: '表单Key不能为空' },
                        ]
                    })(<Input placeholder={"请输入别名"}/>)}
                </Form.Item>
                <Form.Item label={"说明"}>
                    {getFieldDecorator("depict", {
                    })(<Input.TextArea placeholder={"请输入表单说明"}/>)}
                </Form.Item>
                <Form.Item label={"业务对象"}>
                    {this.state.entityList.map(item=>{
                        return <Button key={item.id}>{item.alias}</Button>
                    })}
                    <Button type={"primary"} onClick={()=>{this.setState({selectAddFlag:true})}}>选择</Button>
                </Form.Item>
            </Form>
                <Modal
                    title="选择实体"
                    visible={this.state.selectAddFlag}
                    onOk={this.handleOk.bind(this, "SelectBusinessEntity")}
                    onCancel={()=>{this.setState({ selectAddFlag: false});}}
                    okText="保存"
                    cancelText="取消"
                    zIndex={99}
                >
                    <SelectBusinessEntity onRef={this.onRef.bind(this)}/>
                </Modal>
            </div>
        )
    }
}
export default Form.create()(AddForm);