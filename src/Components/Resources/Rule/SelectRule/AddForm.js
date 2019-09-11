import React, {Component} from 'react';
import { Form, Input, Cascader, Select, } from 'antd';
import Utils from "../../../../Utils/Class/Utils";
const { Option } = Select;
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

    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <Form>
                <Form.Item label={"属性名称"}>
                    {getFieldDecorator("propName", {
                        rules: [
                            { required: true, message: '属性名称不能为空' },
                        ]
                    })(<Input placeholder={"请输入属性名称"}/>)}
                </Form.Item>
                <Form.Item label={"父级属性名称"}>
                    {getFieldDecorator("propFather", {
                        rules: [
                            { required: true, message: '父级属性名称不能为空' },
                        ]
                    })(<Input placeholder={"请输入父级属性名称"}/>)}
                </Form.Item>
                <Form.Item label={"开始段落/句子"}>
                    {getFieldDecorator("beginLine", {
                        rules: [
                            {
                                required: true,
                                type: 'number',
                                transform(value) {
                                    if (value) {
                                        return Number(value);
                                    }
                                },
                                message: '开始段落/句子不能为空'
                            }
                        ]
                    })(<Input placeholder={"请输入开始段落/句子"}/>)}
                </Form.Item>
                <Form.Item label={"结束段落/句子"}>
                    {getFieldDecorator("endLine", {
                        rules: [
                            {
                                required: true,
                                type: 'number',
                                transform(value) {
                                    if (value) {
                                        return Number(value);
                                    }
                                },
                                message: '结束段落/句子不能为空'
                            }
                        ]
                    })(<Input placeholder={"请输入结束段落/句子"}/>)}
                </Form.Item>
                <Form.Item label={"开始类名称"}>
                    {getFieldDecorator("beginCate", {
                        rules: [
                            { required: true, message: '开始类名称不能为空' },
                        ]
                    })(<Input placeholder={"请输入开始类名称"}/>)}
                </Form.Item>
                <Form.Item label={"开始类分类方法"}>
                    {getFieldDecorator("beginMethod", {
                        rules: [
                            { required: true, message: '开始类分类方法不能为空' },
                        ]
                    })(<Input placeholder={"请输入开始类分类方法"}/>)}
                </Form.Item>
                <Form.Item label={"开始类分类模型名称"}>
                    {getFieldDecorator("beginModel", {
                        rules: [
                            { required: true, message: '开始类分类模型名称不能为空' },
                        ]
                    })(<Input placeholder={"请输入开始类分类模型名称"}/>)}
                </Form.Item>
                <Form.Item label={"结束类名称"}>
                    {getFieldDecorator("endCcate", {
                        rules: [
                            { required: true, message: '结束类名称不能为空' },
                        ]
                    })(<Input placeholder={"请输入结束类名称"}/>)}
                </Form.Item>
                <Form.Item label={"结束类分类方法"}>
                    {getFieldDecorator("endMethod", {
                        rules: [
                            { required: true, message: '结束类分类方法不能为空' },
                        ]
                    })(<Input placeholder={"请输入结束类分类方法"}/>)}
                </Form.Item>
                <Form.Item label={"结束类分类模型名称"}>
                    {getFieldDecorator("endModel", {
                        rules: [
                            { required: true, message: '结束类分类模型名称不能为空' },
                        ]
                    })(<Input placeholder={"请输入结束类分类模型名称"}/>)}
                </Form.Item>
                <Form.Item label={"句子切分方法"}>
                    {getFieldDecorator("splitMethod", {
                        rules: [
                            {   required: true,
                                type: 'number',
                                transform(value) {
                                    if (value) {
                                        return Number(value);
                                    }
                                },
                                message: '句子切分方法不能为空' },
                        ]
                    })(<Input placeholder={"请输入句子切分方法"}/>)}
                </Form.Item>
                <Form.Item label={"匹配特征"}>
                    {getFieldDecorator("matcher", {
                        rules: [
                            { required: true, message: '匹配特征不能为空' },
                        ]
                    })(<Input placeholder={"请输入分匹配特征"}/>)}
                </Form.Item>
                <Form.Item label={"取值范围"}>
                    {getFieldDecorator("valScope", {
                        rules: [
                            { required: true, message: '取值范围不能为空' },
                        ]
                    })(<Input placeholder={"请输入取值范围"}/>)}
                </Form.Item>
                <Form.Item label={"属性体系编号"}>
                    {getFieldDecorator("propsId", {
                        rules: [
                            {
                                required: true,
                                type: 'number',
                                transform(value) {
                                    if (value) {
                                        return Number(value);
                                    }
                                },
                                message: '属性体系编号不能为空'
                            }
                        ]
                    })(<Input placeholder={"请输入取值范围"}/>)}
                </Form.Item>
                <Form.Item label={"词语词性"}>
                     {getFieldDecorator("wordPos", {
                          rules: [
                               { required: true, message: '词语词性不能为空' },
                           ]
                      })(<Input placeholder={"请输入词语词性"}/>)}
                </Form.Item>
                <Form.Item label="是否分词">
                     {getFieldDecorator('isSeg', {
                          rules: [
                              { required: false, message: '请选择!' }
                          ],
                     })(
                          <Select placeholder={"分词"}>
                               <Option value="0">分词</Option>
                               <Option value="1">不分词</Option>
                          </Select>,
                     )}
                </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(AddForm);