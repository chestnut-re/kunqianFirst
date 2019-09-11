import React, {Component} from 'react';
import {Form, Input, Select, TreeSelect} from 'antd';
const { Option } = Select;


class UpdateForm extends Component{
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
        result.permissionId = this.props.dataUpdate.permissionId;
        return result;
    }
    componentDidMount() {
        this.props.onRef("UpdateForm", this);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <Form>
                <Form.Item label="功能名称" >
                    {getFieldDecorator('name', {
                        initialValue: this.props.dataUpdate.name,
                        rules: [
                            { required: true, message: '请输入功能名称' }
                        ],
                    })(<Input placeholder="请输入功能名称"/>)}
                </Form.Item>

                <Form.Item label="访问路径" >
                                {getFieldDecorator('url', {
                                    initialValue: this.props.dataUpdate.url,
                                    rules: [
                                        { required: false, message: '路径不能为空!'}
                                    ]
                                })(<Input placeholder="请输入路径" />)}
                            </Form.Item>
                            <Form.Item label="按钮图标" >
                                {getFieldDecorator('icon', {
                                initialValue: this.props.dataUpdate.icon,
                                rules: [
                                    { required: false, message: '请输入icon'}
                        ],
                    })(<Input placeholder="请输入icon"/>)}
                </Form.Item>
                <Form.Item label="上级id">
                    {getFieldDecorator('parentId', {
                        initialValue: this.props.dataUpdate.parentId,
                        rules: [
                            { required: false, message: '请选择!' }
                        ],
                    })(<TreeSelect placeholder={"请选择分类父级，不选为顶级分类！"} treeData={this.props.dataClass} treeDefaultExpandAll></TreeSelect>)}
                </Form.Item>
                <Form.Item label="状态">
                    {getFieldDecorator('status', {
                        initialValue: this.props.dataUpdate.state,
                        rules: [
                            { required: false, message: '请选择!' }
                        ],
                    })(
                        <Select placeholder={"正常"}>
                            <Option value="0">正常</Option>
                            <Option value="1">禁用</Option>
                        </Select>,
                    )}
                </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(UpdateForm);