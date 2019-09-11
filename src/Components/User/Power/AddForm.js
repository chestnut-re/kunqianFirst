import React, {Component} from 'react';
import { Form, Input, TreeSelect, Select, } from 'antd';
const { Option } = Select;

class AddForm extends Component{
    constructor (props) {
        super(props)
        this.state = {
            value: undefined
        }
    }
    // onChange = value => {
    //     console.log(value);
    //     this.setState({ value });
    // };
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
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <Form>
                <Form.Item label="功能名称" >
                    {getFieldDecorator('name', {
                        rules: [
                            { required: true, message: '请输入功能名称' }
                        ],
                    })(<Input placeholder="请输入功能名称"/>)}
                </Form.Item>

                <Form.Item label="访问路径" >
                    {getFieldDecorator('url', {
                        rules: [
                            { required: false, message: '路径不能为空!'}
                        ]
                    })(<Input placeholder="请输入路径" />)}
                </Form.Item>
                <Form.Item label="按钮图标" >
                    {getFieldDecorator('icon', {
                        rules: [
                            { required: false, message: '请输入icon'}
                        ],
                    })(<Input placeholder="请输入icon"/>)}
                </Form.Item>
                <Form.Item label="上级id">
                    {getFieldDecorator('parentId', {
                    })(<TreeSelect placeholder={"请选择分类父级，不选为顶级分类！"} treeData={this.props.dataClass} treeDefaultExpandAll />)}
                </Form.Item>
                <Form.Item label="状态">
                    {getFieldDecorator('status', {
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
export default Form.create()(AddForm);