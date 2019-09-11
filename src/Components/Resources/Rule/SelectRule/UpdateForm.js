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
                 <Form.Item label={"属性名称"}>
                      {getFieldDecorator("propName", {
                          initialValue:this.props.dataUpdate.propName,
                          rules: [
                              { required: true, message: '属性名称不能为空' },
                          ]
                      })(<Input placeholder={"请输入属性名称"}/>)}
                 </Form.Item>
                 <Form.Item label={"父级属性名称"}>
                      {getFieldDecorator("propFather", {
                           initialValue:this.props.dataUpdate.propFather,
                           rules: [
                               { required: true, message: '父级属性名称不能为空' },
                           ]
                      })(<Input placeholder={"请输入父级属性名称"}/>)}
                 </Form.Item>
                 <Form.Item label={"开始段落/句子"}>
                      {getFieldDecorator("beginLine", {
                          initialValue:this.props.dataUpdate.beginLine,
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
                           initialValue:this.props.dataUpdate.endLine,
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
                          initialValue:this.props.dataUpdate.beginCate,
                           rules: [
                               { required: true, message: '开始类名称不能为空' },
                           ]
                      })(<Input placeholder={"请输入开始类名称"}/>)}
                 </Form.Item>
                 <Form.Item label={"开始类分类方法"}>
                     {getFieldDecorator("beginMethod", {
                           initialValue:this.props.dataUpdate.beginMethod,
                           rules: [
                                { required: true, message: '开始类分类方法不能为空' },
                            ]
                     })(<Input placeholder={"请输入开始类分类方法"}/>)}
                 </Form.Item>
                 <Form.Item label={"开始类分类模型名称"}>
                     {getFieldDecorator("beginModel", {
                          initialValue:this.props.dataUpdate.beginModel,
                          rules: [
                              { required: true, message: '开始类分类模型名称不能为空' },
                          ]
                     })(<Input placeholder={"请输入开始类分类模型名称"}/>)}
                 </Form.Item>
                  <Form.Item label={"结束类名称"}>
                       {getFieldDecorator("endCcate", {
                            initialValue:this.props.dataUpdate.endCate,
                            rules: [
                                 { required: true, message: '结束类名称不能为空' },
                            ]
                       })(<Input placeholder={"请输入结束类名称"}/>)}
                  </Form.Item>
                  <Form.Item label={"结束类分类方法"}>
                      {getFieldDecorator("endMethod", {
                          initialValue:this.props.dataUpdate.endMethod,
                          rules: [
                               { required: true, message: '结束类分类方法不能为空' },
                          ]
                      })(<Input placeholder={"请输入结束类分类方法"}/>)}
                  </Form.Item>
                  <Form.Item label={"结束类分类模型名称"}>
                       {getFieldDecorator("endModel", {
                           initialValue:this.props.dataUpdate.endModel,
                            rules: [
                                 { required: true, message: '结束类分类模型名称不能为空' },
                            ]
                       })(<Input placeholder={"请输入结束类分类模型名称"}/>)}
                  </Form.Item>
                  <Form.Item label={"句子切分方法"}>
                       {getFieldDecorator("splitMethod", {
                            initialValue:this.props.dataUpdate.splitMethod,
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
                            initialValue:this.props.dataUpdate.matcher,
                            rules: [
                                { required: true, message: '匹配特征不能为空' },
                            ]
                       })(<Input placeholder={"请输入分匹配特征"}/>)}
                   </Form.Item>
                   <Form.Item label={"取值范围"}>
                        {getFieldDecorator("valScope", {
                             initialValue:this.props.dataUpdate.valScope,
                             rules: [
                                  { required: true, message: '取值范围不能为空' },
                             ]
                        })(<Input placeholder={"请输入取值范围"}/>)}
                  </Form.Item>
                  <Form.Item label={"属性体系编号"}>
                       {getFieldDecorator("propsId", {
                            initialValue:this.props.dataUpdate.propsId,
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
                       initialValue:this.props.dataUpdate.wordPos,
                            rules: [
                                { required: true, message: '词语词性不能为空' },
                            ]
                       })(<Input placeholder={"请输入词语词性"}/>)}
                  </Form.Item>
                  <Form.Item label="是否分词">
                       {getFieldDecorator('isSeg', {
                       initialValue:this.props.dataUpdate.isSeg,
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
export default Form.create()(UpdateForm);