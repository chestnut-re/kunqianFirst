import React, {Component} from 'react';
import { Form, Input, Cascader, Select, } from 'antd';
const { Option } = Select;


class UpdateForm extends Component{
    constructor (props) {
        super(props)
        this.state = {
            checkNick: false
        }
    }
    getFormContent() {
        let result;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                result = values;
            }
        })
        result.id = this.props.dataUpdate.id;
        return result;
    }
    restForm() {
        this.props.form.resetFields();
    }
    componentDidMount() {
        this.props.onRef("UpdateForm", this);
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return(
            <Form>
                <Form.Item label={"分类对应的分类体系编号"}>
                    {getFieldDecorator("ruleCateId", {
                        initialValue:this.props.dataUpdate.ruleCateId,
                        rules: [
                            { required: true, message: '编号不能为空' },
                        ]
                    })(<Input placeholder={"请输入分类对应的分类体系编号"}/>)}
                </Form.Item>
                <Form.Item label={"规则内容"}>
                    {getFieldDecorator("ruleContent", {
                        initialValue:this.props.dataUpdate.ruleContent,
                        rules: [
                            { required: true, message: '内容不能为空' },
                        ]
                    })(<Input placeholder={"请输入规则内容"}/>)}
                </Form.Item>
                <Form.Item label={"分规则集合编号"}>
                    {getFieldDecorator("ruleId", {
                        initialValue:this.props.dataUpdate.ruleId,
                        rules: [
                            { required: true, message: '规则集合编号不能为空' },
                        ]
                    })(<Input placeholder={"请输入规则集合编号"}/>)}
                </Form.Item>
                <Form.Item label={"规则对应分类名称"}>
                    {getFieldDecorator("ruleSpecies", {
                        initialValue:this.props.dataUpdate.ruleSpecies,
                        rules: [
                            { required: true, message: '则对应分类名称不能为空' },
                        ]
                    })(<Input placeholder={"请输入分则对应分类名称"}/>)}
                </Form.Item>
                <Form.Item label={"分规则对应分类编号"}>
                    {getFieldDecorator("ruleSpeciesId", {
                        initialValue:this.props.dataUpdate.ruleSpeciesId,
                        rules: [
                            { required: true, message: '规则对应分类编号不能为空' },
                        ]
                    })(<Input placeholder={"请输入分规则对应分类编号"}/>)}
                </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(UpdateForm);