import React, {Component} from 'react';
import Styles from './from.module.less';
import {Tree, Row, Col, Tabs, Card, Button, Icon, Popover, Form, Input, Select, Checkbox} from 'antd';
import {
    InputController, InputModel,
    TextareaController, TextareaModel,
} from "./config";
const { TreeNode } = Tree;

const {TabPane} = Tabs;
const {Option} = Select;

class FromComponect extends Component {
    constructor(props){
        super(props);
        this.state = {
            tabFlag: "2",
            // 中间控件列表
            formObjList: [],
            // 右侧联动
            formObjMapItem: null,
            // 表单详情
        }
    }

    //生成表单
    buttonDragStart(input, event) {
        event.dataTransfer.setData("fromClass", input);
    }

    onDragOverEnd(event) {
        event.preventDefault();
    }

    onDropEnd(event) {
        let fromClass = event.dataTransfer.getData("fromClass");
        this.setFromObj(fromClass);
    }

    setFromObj(fromClass) {
        switch (fromClass) {
            case "input":
                this.setState({formObjList: [<InputModel/>, ...this.state.formObjList] });
                break;
            case "textarea":
                this.setState({formObjList: [<TextareaModel/>,...this.state.formObjList] });
                break;
            case "number":
                break;
            case "checkbox":
                break;
            case "radio":
                break;
            case "date":
                break;
            case "hidden":
                break;
            default:
                console.log("没有查询到组件");
        }
    }

    // 点击切换
    onSelectAction(event) {
        this.onSelectFlash(event);
        let element = event.target.tagName;
        if (element === "H2") {
            this.setState({
                tabFlag : "2"
            })
        } else if(element === "P"){
            let flag = event.target.getAttribute("data-flag");
            switch(flag) {
                case "input":
                    this.setState({ formObjMapItem: <InputController/> })
                    break;
                case "textarea":
                    this.setState({ formObjMapItem: <TextareaController/> })
                    break;
                default:
                    this.setState({ formObjMapItem: null })
            }
            this.setState({
                tabFlag : "1"
            })
        }
    }
    // 点击动画
    onSelectFlash(event) {
        let element = event.target;
        let elementList = element.parentNode.childNodes;
        for (let i = 0; i < elementList.length; i++) {
            if (element.tagName === "P" || element.tagName === "H2"){
                elementList[i].style.border = "none";
            }
            if (elementList[i].tagName === 'P') {
                let oSpan = elementList[i].querySelectorAll("span");
                oSpan[0].style.display = "none";
                oSpan[1].style.display = "none";
            }
        }
        if (element.tagName === "P" || element.tagName === "H2"){
            element.style.cssText = "border:1px dashed #4DB8FF;border-left:5px solid #4DB8FF;";
        }
        if (element.tagName === "P") {
            let oSpan = element.querySelectorAll("span");
            oSpan[0].style.display = "block";
            oSpan[1].style.display = "block";
        }
    }
    render() {
        return (
            <div className={Styles.fromComponect}>
                <div className={Styles.fromLeft}>
                    <Tabs type="card" className={Styles.fromleft_content}>
                        <TabPane tab="表单字段" key="1">
                            <Card title="通用字段" size={"small"} extra={<Popover content={"基础字段提供最基本的表单功能"} title="关于通用字段">
                                <Icon type="question-circle" />
                            </Popover>}>
                                <Row>
                                    <Col span={12} style={{marginBottom: '10px'}}><Button draggable="true"
                                                                                          type={"primary"}
                                                                                          onDragStart={this.buttonDragStart.bind(this, "input")}><Icon
                                        type="pic-right"/>单行文本</Button></Col>
                                    <Col span={12} style={{marginBottom: '10px'}}><Button draggable="true"
                                                                                          type={"primary"}
                                                                                          onDragStart={this.buttonDragStart.bind(this, "textarea")}><Icon
                                        type="pic-right"/>多行文本</Button></Col>
                                    <Col span={12} style={{marginBottom: '10px'}}><Button draggable="true"
                                                                                          type={"primary"}
                                                                                          onDragStart={this.buttonDragStart.bind(this, "number")}><Icon
                                        type="pic-right"/>数字</Button></Col>
                                    <Col span={12} style={{marginBottom: '10px'}}><Button draggable="true"
                                                                                          type={"primary"}
                                                                                          onDragStart={this.buttonDragStart.bind(this, "checkbox")}><Icon
                                        type="pic-right"/>多选选择</Button></Col>
                                    <Col span={12} style={{marginBottom: '10px'}}><Button draggable="true"
                                                                                          type={"primary"}
                                                                                          onDragStart={this.buttonDragStart.bind(this, "radio")}><Icon
                                        type="pic-right"/>单选选择</Button></Col>
                                    <Col span={12} style={{marginBottom: '10px'}}><Button draggable="true"
                                                                                          type={"primary"}
                                                                                          onDragStart={this.buttonDragStart.bind(this, "select")}><Icon
                                        type="pic-right"/>下拉框</Button></Col>
                                    <Col span={12} style={{marginBottom: '10px'}}><Button draggable="true"
                                                                                          type={"primary"}
                                                                                          onDragStart={this.buttonDragStart.bind(this, "date")}><Icon
                                        type="pic-right"/>日期控件</Button></Col>
                                    <Col span={12} style={{marginBottom: '10px'}}><Button draggable="true"
                                                                                          type={"primary"}
                                                                                          onDragStart={this.buttonDragStart.bind(this, "hidden")}><Icon
                                        type="pic-right"/>隐藏域</Button></Col>
                                    <Col span={12} style={{marginBottom: '10px'}}><Button draggable="true"
                                                                                          type={"primary"}
                                                                                          onDragStart={this.buttonDragStart.bind(this, "input")}><Icon
                                        type="pic-right"/>子表单</Button></Col>
                                </Row>
                            </Card>
                            <Card title="增强字段" size={"small"} extra={<Popover content={"增强字段可以扩展增强表单字段。"} title="关于增强字段">
                                <Icon type="question-circle" />
                            </Popover>}>
                                <Row>
                                    <Col span={12} style={{marginBottom: '10px'}}><Button draggable="true"
                                                                                          type={"primary"}
                                                                                          onDragStart={this.buttonDragStart.bind(this, "input")}><Icon
                                        type="pic-right"/>富文本框</Button></Col>
                                    <Col span={12} style={{marginBottom: '10px'}}><Button draggable="true"
                                                                                          type={"primary"}
                                                                                          onDragStart={this.buttonDragStart.bind(this, "input")}><Icon
                                        type="pic-right"/>数据字典</Button></Col>
                                    <Col span={12} style={{marginBottom: '10px'}}><Button draggable="true"
                                                                                          type={"primary"}
                                                                                          onDragStart={this.buttonDragStart.bind(this, "input")}><Icon
                                        type="pic-right"/>自动编号</Button></Col>
                                    <Col span={12} style={{marginBottom: '10px'}}><Button draggable="true"
                                                                                          type={"primary"}
                                                                                          onDragStart={this.buttonDragStart.bind(this, "input")}><Icon
                                        type="pic-right"/>上传附件</Button></Col>
                                    <Col span={12} style={{marginBottom: '10px'}}><Button draggable="true"
                                                                                          type={"primary"}
                                                                                          onDragStart={this.buttonDragStart.bind(this, "input")}><Icon
                                        type="pic-right"/>选择器</Button></Col>
                                    <Col span={12} style={{marginBottom: '10px'}}><Button draggable="true"
                                                                                          type={"primary"}
                                                                                          onDragStart={this.buttonDragStart.bind(this, "input")}><Icon
                                        type="pic-right"/>自定义对话框</Button></Col>
                                    <Col span={12} style={{marginBottom: '10px'}}><Button draggable="true"
                                                                                          type={"primary"}
                                                                                          onDragStart={this.buttonDragStart.bind(this, "input")}><Icon
                                        type="pic-right"/>关联数据</Button></Col>
                                    <Col span={12} style={{marginBottom: '10px'}}><Button draggable="true"
                                                                                          type={"primary"}
                                                                                          onDragStart={this.buttonDragStart.bind(this, "input")}><Icon
                                        type="pic-right"/>地址</Button></Col>
                                    <Col span={12} style={{marginBottom: '10px'}}><Button draggable="true"
                                                                                          type={"primary"}
                                                                                          onDragStart={this.buttonDragStart.bind(this, "input")}><Icon
                                        type="pic-right"/>签名</Button></Col>
                                    <Col span={12} style={{marginBottom: '10px'}}><Button draggable="true"
                                                                                          type={"primary"}
                                                                                          onDragStart={this.buttonDragStart.bind(this, "input")}><Icon
                                        type="pic-right"/>office控件</Button></Col>
                                    <Col span={12} style={{marginBottom: '10px'}}><Button draggable="true"
                                                                                          type={"primary"}
                                                                                          onDragStart={this.buttonDragStart.bind(this, "input")}><Icon
                                        type="pic-right"/>图片控件</Button></Col>
                                </Row>
                            </Card>
                            <Card title="系统字段" size={"small"} extra={<Popover content={"系统字段可以默认设置系统的字段信息。"} title="关于系统字段">
                                <Icon type="question-circle" />
                            </Popover>}>
                                <Col span={12} style={{marginBottom: '10px'}}><Button draggable="true"
                                                                                      type={"primary"}
                                                                                      onDragStart={this.buttonDragStart.bind(this, "input")}><Icon
                                    type="pic-right"/>当前用户</Button></Col>
                                <Col span={12} style={{marginBottom: '10px'}}><Button draggable="true"
                                                                                      type={"primary"}
                                                                                      onDragStart={this.buttonDragStart.bind(this, "input")}><Icon
                                    type="pic-right"/>当前组织</Button></Col>
                                <Col span={12} style={{marginBottom: '10px'}}><Button draggable="true"
                                                                                      type={"primary"}
                                                                                      onDragStart={this.buttonDragStart.bind(this, "input")}><Icon
                                    type="pic-right"/>当前时间</Button></Col>
                                <Col span={12} style={{marginBottom: '10px'}}><Button draggable="true"
                                                                                      type={"primary"}
                                                                                      onDragStart={this.buttonDragStart.bind(this, "input")}><Icon
                                    type="pic-right"/>当前日期</Button></Col>
                            </Card>
                            <Card title="流程字段" size={"small"} extra={<Popover content={"流程字段可以让表单获取更多关于流程信息。"} title="关于流程字段">
                                <Icon type="question-circle" />
                            </Popover>}>
                                <Col span={12} style={{marginBottom: '10px'}}><Button draggable="true"
                                                                                      type={"primary"}
                                                                                      onDragStart={this.buttonDragStart.bind(this, "input")}><Icon
                                    type="pic-right"/>流程实例</Button></Col>
                                <Col span={12} style={{marginBottom: '10px'}}><Button draggable="true"
                                                                                      type={"primary"}
                                                                                      onDragStart={this.buttonDragStart.bind(this, "input")}><Icon
                                    type="pic-right"/>流程图</Button></Col>
                                <Col span={12} style={{marginBottom: '10px'}}><Button draggable="true"
                                                                                      type={"primary"}
                                                                                      onDragStart={this.buttonDragStart.bind(this, "input")}><Icon
                                    type="pic-right"/>审批历史</Button></Col>
                                <Col span={12} style={{marginBottom: '10px'}}><Button draggable="true"
                                                                                      type={"primary"}
                                                                                      onDragStart={this.buttonDragStart.bind(this, "input")}><Icon
                                    type="pic-right"/>审批意见</Button></Col>
                                <Col span={12} style={{marginBottom: '10px'}}><Button draggable="true"
                                                                                      type={"primary"}
                                                                                      onDragStart={this.buttonDragStart.bind(this, "input")}><Icon
                                    type="pic-right"/>流程关联</Button></Col>
                            </Card>
                            <Card title="其它字段" size={"small"} extra={<Popover content={"其它字段一般都是不可以输入的字段。"} title="关于基它字段">
                                <Icon type="question-circle" />
                            </Popover>}>
                                <Col span={12} style={{marginBottom: '10px'}}><Button draggable="true"
                                                                                      type={"primary"}
                                                                                      onDragStart={this.buttonDragStart.bind(this, "input")}><Icon
                                    type="pic-right"/>描述</Button></Col>
                                <Col span={12} style={{marginBottom: '10px'}}><Button draggable="true"
                                                                                      type={"primary"}
                                                                                      onDragStart={this.buttonDragStart.bind(this, "input")}><Icon
                                    type="pic-right"/>选项卡</Button></Col>
                                <Col span={12} style={{marginBottom: '10px'}}><Button draggable="true"
                                                                                      type={"primary"}
                                                                                      onDragStart={this.buttonDragStart.bind(this, "input")}><Icon
                                    type="pic-right"/>文本</Button></Col>
                                <Col span={12} style={{marginBottom: '10px'}}><Button draggable="true"
                                                                                      type={"primary"}
                                                                                      onDragStart={this.buttonDragStart.bind(this, "input")}><Icon
                                    type="pic-right"/>链接</Button></Col>
                                <Col span={12} style={{marginBottom: '10px'}}><Button draggable="true"
                                                                                      type={"primary"}
                                                                                      onDragStart={this.buttonDragStart.bind(this, "input")}><Icon
                                    type="pic-right"/>分布</Button></Col>
                                <Col span={12} style={{marginBottom: '10px'}}><Button draggable="true"
                                                                                      type={"primary"}
                                                                                      onDragStart={this.buttonDragStart.bind(this, "input")}><Icon
                                    type="pic-right"/>折叠卡</Button></Col>
                            </Card>
                        </TabPane>
                        <TabPane tab="业务对象" key="2">
                            <Tree>
                                <TreeNode title={"细类:V1"}>
                                    <TreeNode title={"主键"}/>
                                </TreeNode>
                            </Tree>
                        </TabPane>
                    </Tabs>
                </div>
                <div className={Styles.fromCenter}>
                    <div className={Styles.title}>
                        <p>表单布局</p>
                        <div className={Styles.right}>
                            <Button size={"small"}><Icon type="pic-right"/>保存表单</Button>
                            <Button size={"small"}><Icon type="pic-right"/>预览</Button>
                            <Button size={"small"}><Icon type="pic-right"/>再看次介绍</Button>
                            <Button size={"small"}><Icon type="pic-right"/>关闭</Button>
                        </div>
                    </div>
                    <div className={Styles.inputContent} onDrop={this.onDropEnd.bind(this)} onDragOver={this.onDragOverEnd.bind(this)} onClick={this.onSelectAction.bind(this)}>
                        <h2>表单一</h2>
                        {this.state.formObjList.map((item,values) => {
                            return item;
                        })}
                    </div>
                </div>
                <div className={Styles.fromRight}>
                    <Tabs type="card" activeKey={this.state.tabFlag} onChange={(key)=>{this.setState({ tabFlag: key });}} className={Styles.fromleft_content}>
                        <TabPane tab="编辑字段" key="1">
                            {this.state.formObjMapItem}
                        </TabPane>
                        <TabPane tab="表单属性" key="2">
                            <Card title={"表单属性"} size={"small"}>
                                <dl>
                                    <dt>表单标题</dt>
                                    <dd><Input size={"small"}/></dd>
                                </dl>
                                <dl>
                                    <dt>表单key</dt>
                                    <dd><Input size={"small"}/></dd>
                                </dl>
                                <dl>
                                    <dt>表单分类</dt>
                                    <dd><Input size={"small"}/></dd>
                                </dl>
                                <dl>
                                    <dt>表单描述</dt>
                                    <dd><Input.TextArea size={"small"}/></dd>
                                </dl>
                            </Card>
                            <Card title={"表单提交校验"} size={"small"} extra={<Popover content={"表单提交时候对一系列条件进行有效性校验。"} title="关于表单提交校验">
                                <Icon type="question-circle" />
                            </Popover>}>
                                <Button type={"primary"} block={true}>添加校验条件</Button>
                            </Card>
                            <Card title={"表单规则"} size={"small"} extra={<Popover content={"您可以为某个字段(文本框、单项选择、下拉框等)设定一些规则：在填写者填写或选择某选项后，触发显示（隐藏、必填、非必填、置空等）位于该字段之后的其他字段。"} title="关于表单规则">
                                <Icon type="question-circle" />
                            </Popover>}>
                                <Button type={"primary"} block={true}>设置表单规则</Button>
                            </Card>
                            <Card title={"表单脚本"} size={"small"}>
                                <Button type={"primary"} block={true} style={{marginBottom:'10px'}}>设置表单脚本</Button>
                                <Button type={"primary"} block={true}>设置移动端表单脚本</Button>
                            </Card>
                            <Card title={"提交设置"} size={"small"} extra={<Popover content={"提交设置是表单提交动作限制。" +
                            "开启后端验证：表单后端的验证就会进行验证，避免绕过前端验证，出现无效数据。\n" +
                            "开启提交冲突提示：开启冲突提示避免重复提交表单，后端采用乐观锁进行处理。"} title="关于提交设置">
                                <Icon type="question-circle" />
                            </Popover>}>
                                <dl>
                                    <dt>开启后端验证</dt>
                                    <dd>
                                        <Select style={{width:'100%'}} size={"small"}>
                                            <Option value={"开启"}>开启</Option>
                                            <Option value={"不开启"}>不开启</Option>
                                        </Select>
                                    </dd>
                                </dl>
                                <dl>
                                    <dt>开启提交冲突提示</dt>
                                    <dd><Select style={{width:'100%'}} size={"small"}>
                                        <Option value={"开启"}>开启</Option>
                                        <Option value={"不开启"}>不开启</Option>
                                    </Select></dd>
                                </dl>
                            </Card>
                            <Card title={"分页设置"} size={"small"} extra={<Popover content={"主要是对整体的分页设置进行控制。"} title="关于分页设置">
                                <Icon type="question-circle" />
                            </Popover>}>
                                <dl>
                                    <dt>分页样式设置</dt>
                                    <dd><Select style={{width:'100%'}} size={"small"}>
                                        <Option value={"无"}>无</Option>
                                        <Option value={"开启"}>链式数字效果</Option>
                                        <Option value={"不开启"}>标签页数字效果</Option>
                                    </Select></dd>
                                </dl>
                            </Card>
                            <Card title={"其他设置"} size={"small"}>
                                <ul className={Styles.fromr_right_ul}>
                                    <li><Checkbox>隐藏标题</Checkbox></li>
                                    <li><Checkbox>隐藏描述</Checkbox></li>
                                    <li><Checkbox>文本字段间有冒号</Checkbox></li>
                                    <li>文本只读显示样式<Select size={"small"} style={{width:'100px'}}>
                                        <Option value={"文本样式"}>文本样式</Option>
                                        <Option value={"原样展示"}>原样展示</Option>
                                    </Select></li>
                                </ul>
                            </Card>
                            <Card title={"默认设置【不影响表单展示】"} size={"small"}>
                                <ul className={Styles.fromr_right_ul}>
                                    <li><Checkbox>字段绑定不带出字段名<Popover content={"如果选择，绑定字段时候就不会联动修改表单字段的标题，否则不选择则会联动修改表单字段的标题。不影响表单展示。"} title="关于字段绑定不带出字段名">
                                        <Icon type="question-circle" />
                                    </Popover></Checkbox></li>
                                    <li>默认宽度占用整行的:<Popover content={"如果选择默认宽度占用整行,新增的字段则会按照这个设置该字段宽度占用整行。"} title="关于默认宽度占用整行">
                                        <Icon type="question-circle" />
                                    </Popover>
                                        <Select size={"small"} style={{width:'100px'}}>
                                            <Option value={"1/4"}>1/4</Option>
                                            <Option value={"2/4"}>2/4</Option>
                                            <Option value={"3/4"}>3/4</Option>
                                        </Select>
                                    </li>
                                </ul>
                            </Card>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default Form.create("dynamic_form_item")(FromComponect);