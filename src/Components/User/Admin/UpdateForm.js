import React, {Component} from 'react';
import {Cascader, Form, Input, Select} from 'antd';
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
        result.id = this.props.dataUpdate.id;
        return result;
    }
    componentDidMount() {
        this.props.onRef("UpdateForm", this);
    }
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
                        initialValue:this.props.dataUpdate.username,
                        rules: [
                            { required: true, message: '用户名不能为空' },
                        ]
                    })(<Input placeholder={"请输入用户名"}/>)}
                </Form.Item>
                <Form.Item label={"账号"}>
                    {getFieldDecorator("account", {
                        rules: [
                            { required: this.state.checkNick, message: '账号不能为空' },
                            { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/, message:'密码必须是字母和数字组成，长度8-16'},
                        ]
                    })(<Input placeholder={"请输入账号"}/>)}
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
export default Form.create()(UpdateForm);