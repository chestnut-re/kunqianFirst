import React,{ Component } from 'react';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
  /*右边工具栏样式*/
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';
import './bpmn.css';
// 引入相关的依赖
import BpmnModeler from 'bpmn-js/lib/Modeler'
import propertiesPanelModule from 'bpmn-js-properties-panel'
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'
import customTranslate from './enlang/bpmnChineseTranslate/index.js'
import BpmnService from '../../../Service/BpmnService'
import FlowClassService from '../../../Service/FlowClassService'
import {Layout, Button, Icon, Row, Col, message, Card, Form, Input, Cascader, Select,} from 'antd';
import Utils from '../../../Utils/Class/Utils'
import CustomModule from './Custom/CustomModule';
import {
    ClassTpl,
    GzjlTpl,
    MxxlTpl,
    YlscTpl,
    FcTpl,
    MxysTpl,
    ShxzTpl,
    YbgjTpl
} from './Tpl/config';
import qaExtension from './Resources/qa';
import diagramXML from './Resources/diagram.bpmn';
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};
class Bpmn extends Component{
    constructor(props) {
        super(props);
        this.BpmnService = new BpmnService();
        this.FlowClassService = new FlowClassService();
        this.myInput = React.createRef();
            this.state = {
            bpmnModeler: null,
            xmlStr: null,
            bpmnTreeId: null,
            bpmnTreeName: null,
            options: [],
            //canvas: null,
            propElement:null,
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Layout>
                <Row style={{height:'100%'}}>
                    <Col span={24}>
                        <div style={{padding: '10px',background:'#f8f8f8'}} className="gutter-example">
                            <Button href={"/flowpath/list/new"} onClick={this.closeBpmn} size="small" style={{marginRight:'10px'}}><Icon type="close"/>关闭</Button>
                            <Button onClick={this.publishBpmn.bind(this)} type="primary" size="small" style={{marginRight:'10px'}}><Icon type="select"/>发布</Button>
                            <Button onClick={this.handleSubmitBpmn.bind(this)} type="primary" size="small" style={{marginRight:'10px'}}><Icon type="wallet"/>保存草稿</Button>
                            <Button onClick={this.uploadBpmn} type="primary" size="small" style={{marginRight:'10px'}}><Icon type="arrow-left" />导入</Button>
                            <a href={"/bpmn"} ref="downBPMN"><Button type="primary" size="small" style={{marginRight:'10px'}}><Icon type="arrow-right" />导出BPMN</Button></a>
                            <a href={"/bpmn"} ref="downSVG"><Button type="primary" size="small" style={{marginRight:'10px'}}><Icon type="logout" />导出SVG</Button></a>
                        </div>
                    </Col>
                    <Col span={20} style={{height:'100%'}}>
                        <div className="containers" ref="content" style={{marginTop:'-40px'}}>
                            <div className="canvas" ref="canvas"></div>
                        </div>
                    </Col>
                    <Col span={4}>
                        <Card title={"流程信息"} size={"small"} style={{background:'#f8f8f8'}}>
                            <Form {...formItemLayout}>
                                <Form.Item label={"分类"} style={{marginBottom:'5px'}}>
                                    {getFieldDecorator('bpmnClass',{
                                        rules:[{
                                            required: true,
                                            message: '请选择分类',
                                    }],
                                    })(<Select placeholder={"请选择分类"}>
                                        {this.state.options.map(item=>{
                                            return <Select.Option key={item.categoryId}>{item.categoryName}</Select.Option>
                                        })}
                                    </Select>)}
                                </Form.Item>
                                <Form.Item label={"名称"} style={{marginBottom:'5px'}}>
                                    {getFieldDecorator("bpmnname", {
                                        rules: [{
                                            required: true,
                                            message: '请输入名称',
                                        }]
                                    })(<Input placeholder={"请输入名称"}/>)}
                                </Form.Item>
                                <Form.Item label={"KEY"} style={{marginBottom:'5px'}}>
                                    {getFieldDecorator("bpmnkey", {
                                        rules: [{
                                            required: true,
                                            message: '请输入KEY'
                                        }]
                                    })(<Input placeholder={"请输入KEY"}/>)}
                                </Form.Item>
                                <Form.Item label={"描述"} style={{marginBottom:'5px'}}>
                                    {getFieldDecorator("bpmnMs",{
                                    })(<Input.TextArea placeholder={"请输入描述"}/>)}
                                </Form.Item>
                            </Form>
                        </Card>
                        {/*<div id="js-properties-panel" className="panel" style={{top:'300px',width:'100%',background:'#fff',border:'1px solid #e8e8e8'}}></div>*/}
                        {this.state.propElement}
                    </Col>
                </Row>
            </Layout>
        );
    }
    //提交流程信息
    handleSubmitBpmn() {
        this.props.form.validateFields((err,value) => {
            if (!err) {
                if (this.state.xmlStr) {
                    //let propsVal = this.myInput.selectContent();
                    let data = {
                        categoryId: value.bpmnClass,
                        name:value.bpmnname,
                        defineKey: value.bpmnkey,
                        depict: value.bpmnMs,
                    };
                    //propsVal.task[0].bpmFormTaskfields = propsVal.bpmFormTaskfields;
                    //data.task = propsVal.task;
                    //data.task.bpmFormTaskfields = propsVal.bpmFormTaskfields;
                    this.BpmnService.installBpmn({bpmDefineData:{bpmnXml:this.state.xmlStr},bpmDefineR:data}).then((res) => {
                        if (res.data.code > 0) {
                            message.success(res.data.msg);
                            this.props.history.push("/flowpath/list/new");
                        } else {
                            message.error(res.data.msg);
                        }
                    });
                } else {
                    message.warning("请画好流程图再进行保存！");
                }
            }
        });
    }
    // 查询分类信息
    selectAllbpmnClass() {
        this.FlowClassService.selectFlowClass().then((res) => {
            if (res.data.code) {
                this.setState({
                    options: res.data.data
                })
            } else {
                message.error(res.data.msg);
            }
        });
    }
    selectByIdBpmn(bpmnModeler) {
        this.BpmnService.selectByIdBpmn().then((res) =>{
            let xmlData = res.data.data.bpmDefineData.bpmnXml;
            this.setState({
                xmlStr: xmlData,
            })
            this.createNewDiagram(bpmnModeler, xmlData);
        })
    }
    //关闭
    closeBpmn() {

    }
    // 发布
    publishBpmn() {
        console.log(this.state.xmlStr);
    }
    // 保存
    savaBpmn () {

    }
    // 导入
    uploadBpmn () {

    }
    componentDidMount() {
        //const container = this.refs.content;
        const canvas = this.refs.canvas;
        const bpmnModeler = new BpmnModeler({
            container: canvas,
            propertiesPanel: {
                parent: '#js-properties-panel'
            },
            additionalModules: [
                // 左边工具栏以及节点
                //propertiesProviderModule,
                // 右边的工具栏
                //propertiesPanelModule,
                // 汉化包
                customTranslate,
                // 自定义控件
                CustomModule,
            ],
            moddleExtensions: {
                camunda: camundaModdleDescriptor,
                qa: qaExtension
            }
        })
        this.createNewDiagram(bpmnModeler);
        this.setState({
            bpmnModeler: bpmnModeler,
        })
        // download Bpmn
        let _this = this;
        let downSvg = this.refs.downSVG;
        let downBpmn = this.refs.downBPMN;
        bpmnModeler.on("commandStack.changed", (event) => {
            _this.saveSVG(function (err, svg) {
                _this.setEncoded(downSvg,'diagram.svg', err ? null: svg);
            }, bpmnModeler)
            _this.saveDiagram(function (err, svg) {
                _this.setEncoded(downBpmn, 'diagram.bpmn', err? null : svg);
            }, bpmnModeler)
        });
        bpmnModeler.on("element.changed'", (event) => {

        });
        try {
            let map = bpmnModeler.get('canvas');
            map.zoom('fit-viewport');
            let eventBus = bpmnModeler.get("eventBus");
            eventBus.on('element.click', function(event) {
                _this.setState({
                    bpmnTreeId:event.element.businessObject.id,
                    bpmnTreeName:event.element.businessObject.name
                })
                let dataFlag = event.element.data;
               /* console.log(dataFlag);
                if (dataFlag) {
                    let flag = dataFlag.split("_")[0];
                    switch (flag) {
                        case "FC":
                            _this.setState({
                                propElement:<FcTpl treeId={event.element.businessObject.id} title={"分词任务"} wrappedComponentRef={(inst) => _this.myInput = inst}/>,
                            })
                            break;
                        case "LBTX":
                            _this.setState({
                                propElement:<ClassTpl treeId={event.element.businessObject.id} title={"类别体系"} wrappedComponentRef={(inst) => _this.myInput = inst}/>,
                            })
                            break;
                        case "YLSC":
                            _this.setState({
                                propElement:<YlscTpl treeId={event.element.businessObject.id} title={"语料生成"} wrappedComponentRef={(inst) => _this.myInput = inst}/>,
                            })
                            break;
                        case "GZJL":
                            _this.setState({
                                propElement:<GzjlTpl treeId={event.element.businessObject.id} title={"规则建立"} wrappedComponentRef={(inst) => _this.myInput = inst}/>,
                            })
                            break;
                        case "MXXL":
                            _this.setState({
                                propElement:<MxxlTpl treeId={event.element.businessObject.id} title={"模型训练"} wrappedComponentRef={(inst) => _this.myInput = inst}/>,
                            })
                            break;
                        case "MXYS":
                            _this.setState({
                                propElement:<MxysTpl treeId={event.element.businessObject.id} title={"模型运算"} wrappedComponentRef={(inst) => _this.myInput = inst}/>,
                            })
                            break;
                        case "SHXZ":
                            _this.setState({
                                propElement:<ShxzTpl treeId={event.element.businessObject.id} title={"审核选择"} wrappedComponentRef={(inst) => _this.myInput = inst}/>,
                            })
                            break;
                        case "YBGJ":
                            _this.setState({
                                propElement:<YbgjTpl treeId={event.element.businessObject.id} title={"样本构建"} wrappedComponentRef={(inst) => _this.myInput = inst}/>,
                            })
                            break;
                        default:
                            _this.setState({
                                propElement:null,
                            })
                    }
                }*/
            });
        } catch (e) {
            console.log(e);
        }
        document.querySelector('.bjs-container').removeChild(document.querySelector(".bjs-powered-by"));

        this.selectAllbpmnClass();
    }
    createNewDiagram(bpmnModeler, xmlData) {
        const bpmnXmlStr = '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn">\n' +
        '  <bpmn2:process id="Process_1" isExecutable="true">\n' +
        '  </bpmn2:process>\n' +
        '  <bpmndi:BPMNDiagram id="BPMNDiagram_1">\n' +
        '    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">\n' +
        '    </bpmndi:BPMNPlane>\n' +
        '  </bpmndi:BPMNDiagram>\n' +
        '</bpmn2:definitions>'
      // 将字符串转换成图显示出来
      bpmnModeler.importXML(bpmnXmlStr, function (err) {
        if (err) {
          console.error(err)
        }
      })
    }
    // 下载为SVG格式,done是个函数，调用的时候传入的
    saveSVG (done, bpmnModeler) {
        bpmnModeler.saveSVG(done)
    }
    // 下载为SVG格式,done是个函数，调用的时候传入的
    saveDiagram (done, bpmnModeler) {
        bpmnModeler.saveXML({ format: true }, function (err, xml) {
            done(err, xml)
        })
    }
    // 当图发生改变的时候会调用这个函数，这个data就是图的xml
    setEncoded (link, name, data) {
        // 把xml转换为URI，下载要用到的
        const encodedData = encodeURIComponent(data)
        // 获取到图的xml，保存就是把这个xml提交给后台
        this.setState({
            xmlStr: data,
        })
        // 下载图的具体操作,改变a的属性，className令a标签可点击，href令能下载，download是下载的文件的名字
        if (data) {
          link.className = 'active'
          link.href = 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData
          link.download = name;
        }
    }  
}
export default Form.create({name: "validate_other"})(Bpmn);