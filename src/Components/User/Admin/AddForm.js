import React, {Component} from 'react';
import { Form, Input, Cascader, Select, } from 'antd';
const { Option } = Select;
const residences = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];
class AddForm extends Component{
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
        return result;
    }
    restForm() {
        this.props.form.resetFields();
    }
    componentDidMount() {
        this.props.onRef("AddForm", this);
    }
    //  确认密码
    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    // //  密码验证
    // passwordValidator = (rule, value, callback) => {
    //     const { getFieldValue } = form;
    //     if (value && value !== getFieldValue('password')) {
    //         callback('两次输入不一致！')
    //     }
    //     // 必须总是返回一个 callback，否则 validateFields 无法响应
    //     callback();
    // }
    render() {
        const { getFieldDecorator } = this.props.form;
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>,
        );
        return(
            <Form>
                <Form.Item label={"用户名"}>
                    {getFieldDecorator("username", {
                        rules: [
                            { required: true, message: '用户名不能为空' },
                        ]
                    })(<Input placeholder={"请输入用户名"}/>)}
                </Form.Item>
                <Form.Item label="密码" >
                    {getFieldDecorator('password', {
                        rules: [
                            { required: true, message: '密码不能为空！!'},
                            { min: 6, message: '密码不能少于6个字符' },
                            { max: 10, message:'密码不能大于10个字符'}
                        ],
                    })(<Input.Password placeholder="请输入密码" />)}
                </Form.Item>
                <Form.Item label="确认密码" >
                    {getFieldDecorator('confirm', {
                        rules: [
                            { required: true, message: '请确认您的密码!'}
                        ],
                    })(<Input.Password placeholder="请输入密码" onBlur={this.handleConfirmBlur}  />)}
                </Form.Item>
                <Form.Item label="真实姓名" >
                    {getFieldDecorator('nickname', {
                        rules: [
                            { required: this.state.checkNick, message: '请输入您的真实姓名', whitespace: true }
                        ],
                    })(<Input placeholder="请输入您的姓名"/>)}
                </Form.Item>
                <Form.Item label="性别">
                    {getFieldDecorator('gender', {
                        rules: [
                            { required: this.state.checkNick, message: '请选择!' }
                        ],
                    })(
                        <Select placeholder={"男"}>
                            <Option value="0">男</Option>
                            <Option value="1">女</Option>
                        </Select>,
                    )}
                </Form.Item>
                <Form.Item label={"账号"}>
                    {getFieldDecorator("accountName", {
                        rules: [
                            { required: this.state.checkNick, message: '账号不能为空' },
                            { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/, message:'密码必须是字母和数字组成，长度8-16'},
                        ]
                    })(<Input placeholder={"请输入项目名称"}/>)}
                </Form.Item>
                <Form.Item label="地址">
                    {getFieldDecorator('addressName', {
                        initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                        rules: [
                            { type: 'array', required: this.state.checkNick, message: '请选择您的常驻地址' },
                        ],
                    })(<Cascader options={residences} />)}
                </Form.Item>
                <Form.Item label="手机号">
                    {getFieldDecorator('phone', {
                        rules: [
                            { required: this.state.checkNick, message: '请输入您的手机号 ' },
                            { pattern: /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/, message: '手机号输入不合法'}
                        ],
                    })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
                </Form.Item>
                <Form.Item label="E-mail">
                    {getFieldDecorator('email', {
                        rules: [
                            { type: 'email', message: '输入电入电子邮件无效'},
                            { required: this.state.checkNick, message: 'Please input your E-mail!'},
                        ],
                    })(<Input />)}
                </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(AddForm);