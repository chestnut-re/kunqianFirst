import React,{ Component } from 'react';
import { Form, Input, Select, Checkbox, Card, Icon,Button, Popover} from 'antd';
import Styles from "../styles/form.module.less"
const { Option } = Select;
class InputController extends Component{
    getFormContent() {
        this.props.form.validateFields((err,values) => {
            if (!err) {
                console.log(values);
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form>
                    <Card title={"单行文本"} size={"small"}>
                        <dl>
                            <dt>标题<Popover content={"如果选择默认宽度占用整行,新增的字段则会按照这个设置该字段宽度占用整行。"} title="关于字段标题">
                                <Icon type="question-circle" />
                            </Popover></dt>
                            <dd>{getFieldDecorator("title",{})(<Input size={"small"}/>)}</dd>
                        </dl>
                        <dl>
                            <dt>对象名称<Popover content={"此属性用于绑定业务对象属性,用于提交数据绑定对象名称。"} title="关于对象名称">
                                <Icon type="question-circle" />
                            </Popover></dt>
                            <dd>{getFieldDecorator("objName",{})(<Input size={"small"}/>)}</dd>
                        </dl>
                        <dl>
                            <dt>默认值</dt>
                            <dd>{getFieldDecorator("nullstr",{})(<Input size={"small"}/>)}</dd>
                        </dl>
                        <dl>
                            <dt>提示文字</dt>
                            <dd>{getFieldDecorator("tag",{})(<Input.TextArea size={"small"}/>)}</dd>
                        </dl>
                        <dl>
                            <dt>描述信息</dt>
                            <dd>{getFieldDecorator("desc",{})(<Input.TextArea size={"small"}/>)}</dd>
                        </dl>
                    </Card>
                    <Card title={"校验"} size={"small"}>
                        <ul className={Styles.fromr_right_ul}>
                            <li>{getFieldDecorator("isReq", {})(<Checkbox>必须填</Checkbox>)}</li>
                            <li>{getFieldDecorator("isMinLen", {})(<Checkbox>最少填</Checkbox>)}{getFieldDecorator("minLen")(<Input size={"small"} style={{width:'30%'}}/>)}个字符</li>
                            <li>{getFieldDecorator("isMaxLen", {})(<Checkbox>最多填</Checkbox>)}{getFieldDecorator("minLen")(<Input size={"small"} style={{width:'30%'}}/>)}个字符</li>
                            <li>格式：{getFieldDecorator("format",{})(<Select size={"small"} style={{width:'100px'}}>
                                <Option value={"手机号"}>手机号</Option>
                                <Option value={"电话号"}>电话号</Option>
                                <Option value={"邮政编码"}>邮政编码</Option>
                                <Option value={"身份证"}>身份证</Option>
                                <Option value={"邮箱"}>文本样式</Option>
                                <Option value={"自定义"}>自定义</Option>
                            </Select>)}</li>
                        </ul>
                    </Card>
                    <Card title={"字段权限"} size={"small"}>
                        <ul className={Styles.fromr_right_ul}>
                            <li>{getFieldDecorator("isHide", {})(<Checkbox>隐藏</Checkbox>)}</li>
                            <li>{getFieldDecorator("isRead", {})(<Checkbox>只读</Checkbox>)}</li>
                        </ul>
                    </Card>
                    <Card title={"布局设置"} size={"small"}>
                        <ul className={Styles.fromr_right_ul}>
                            <li>默认宽度占用整行的:<Popover content={"如果选择默认宽度占用整行,新增的字段则会按照这个设置该字段宽度占用整行。"} title="关于默认宽度占用整行">
                                <Icon type="question-circle" />
                            </Popover>
                                {getFieldDecorator("layout", {})(
                                    <Select size={"small"} style={{width:'100px'}}>
                                        <Option value={"1/4"}>1/4</Option>
                                        <Option value={"2/4"}>2/4</Option>
                                        <Option value={"3/4"}>3/4</Option>
                                    </Select>)}
                            </li>
                            <li>{getFieldDecorator("isMobel", {})(<Checkbox>移动端显示</Checkbox>)}</li>
                        </ul>
                    </Card>
                </Form>
            </div>
        )
    }
}
export default Form.create()(InputController);