import {Form, Input, Select} from 'antd';
import React, {Component} from "react";
const { Option } = Select
class UpdateModel extends Component{
    constructor (props) {
        super(props)
        this.state = {
            checkNick: false
        }
    }
    getFormContent() {
        let result = [];
        this.props.form.validateFields((err, values) => {
            if (!err) {
                result = values;
            }
        })
        result.id = this.props.dataUpdate.id;
        return result;
    }
    componentDidMount() {
        this.props.onRef("UpdateModel", this);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <Form>
                <Form.Item label={"模型名称"}>
                    {getFieldDecorator("modelName", {
                        rules: [
                            { required: true, message: '模型名称不能为空' },
                        ]
                    })(<Input placeholder={"请输入模型名称"}/>)}
                </Form.Item>
                <Form.Item label={"创建者"}>
                    {getFieldDecorator("creator", {
                        rules: [
                            { required: true, message: '创建者不能为空' },
                        ]
                    })(<Input placeholder={"请输入创建者"}/>)}
                </Form.Item>
                <Form.Item label="模型类别">
                    {getFieldDecorator('modelType', {
                        rules: [
                            { required: true, message: '模型类别不能为空' },
                        ]
                    })(<Select placeholder={"分类模型"}>
                        <Option value="1">分类模型</Option>
                        <Option value="2">实体识别模型</Option>
                        <Option value="1">属性识别模型</Option>
                        <Option value="1">预训练模型</Option>
                    </Select>)}
                </Form.Item>
                <Form.Item label="状态">
                    {getFieldDecorator('status', {
                        rules: [
                            { required: true, message: '状态不能为空' },
                        ]
                    })(<Select placeholder={"发布"}>
                        <Option value="1">未审核</Option>
                        <Option value="2">发布</Option>
                        <Option value="3">失效</Option>
                    </Select>)}
                </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(UpdateModel);