import React, {Component} from 'react';
import {Steps, Button, message} from 'antd';
import { ClassTpl,GzjlTpl,YbgjTpl, MxysTpl, ShxzTpl } from './config'
import { PROJECT } from '../../../../Utils/Component/Bpmn/Custom/Config'
import ProjectService from "../../../../Service/ProjectService"
const { Step } = Steps;
class FlowCommon extends Component {
    constructor(props) {
        super(props);
        this.ProjectService = new ProjectService();
        this.classRef = React.createRef();
        this.gzjlRef = React.createRef();
        this.ybgjRef = React.createRef();
        this.mxysRef = React.createRef();
        this.shxzRef = React.createRef();
        this.state = {
            current: 0,
            stepData: [],
            steps:[
                {
                    value:PROJECT.LBTX_NAME,
                    title: PROJECT.LBTX_EN_NAME,
                    content: <ClassTpl wrappedComponentRef={(form)=>this.classRef=form}/>,
                },{
                    value:PROJECT.GZJL_NAME,
                    title: PROJECT.GZJL_EN_MAME,
                    content: <GzjlTpl wrappedComponentRef={(form)=>this.gzjlRef=form}/>,
                },{
                    value:PROJECT.YBGJ_NAME,
                    title: PROJECT.YBGJ_EN_NAME,
                    content: <YbgjTpl wrappedComponentRef={(form)=>this.ybgjRef=form}/>,
                },{
                    value:PROJECT.YYYS_NAME,
                    title: PROJECT.YYYS_EN_NAME,
                    content: <MxysTpl wrappedComponentRef={(form)=>this.mxysRef=form}/>,
                },{
                    value:PROJECT.SH_NAME,
                    title: PROJECT.SH_EN_NAME,
                    content: <ShxzTpl wrappedComponentRef={(form)=>this.shxzRef=form}/>,
                },
            ],
        };
    }

    updateStepData() {
        console.log(this.props.flowData['tasks'])
        let arr = [];
        if (this.props.flowData['tasks']) {
            this.props.flowData['tasks'].map(item=>{
                this.state.steps.map(val=>{
                    if(item.formId === val.value) {
                       arr.push(val);
                    }
                })
            })
        }
        this.setState({
            stepData:arr,
        })
    }
    next(value,flag=true) {
        if (value === PROJECT.GZJL_NAME) {
            let data = this.gzjlRef.getContent();
            this.saveFlash(data,value, flag);
        } else if(value === PROJECT.YBGJ_NAME){
            let data = this.ybgjRef.getContent();
            this.saveFlash(data,value, flag);
        } else if(value === PROJECT.YYYS_NAME){
            let data = this.mxysRef.getContent();
            this.saveFlash(data,value,flag);
        } else if(value === PROJECT.SH_NAME){
            let data = this.shxzRef.getContent();
            this.saveFlash(data,value, flag);
        }
    }
    saveFlash(data,value, flag) {
        if (data) {
            let pointData = this.selectPointData(value);
            this.saveAction({...data,...pointData}, ()=>{
                if (flag) {
                    const current = this.state.current + 1;
                    this.setState({ current });
                } else {
                    this.props.closeAction();
                }
            })
        }
    }
    saveAction(query,callback) {
        this.ProjectService.saveFlowPoint(query).then((res=>{
            if (res.data.code > 0) {
                message.success(res.data.msg);
                callback();
            } else {
                message.error(res.data.msg);
            }
        }))
    }
    selectPointData(value) {
        let result = this.props.flowData['tasks'].filter((item)=>{
            return item.formId === value;
        })
        return {
            taskId:result[0].taskId,
            taskName:result[0].taskName,
            formId:result[0].formId,
            nodeType:result[0].nodeType,
            nodeOrder:result[0].nodeOrder,
            gatawayType:result[0].gatawayType,
            itemId:this.props.flowData.itemId,
            isLast:result[0].isLast,
            taskGroup:result[0].taskGroup,
            taskType:result[0].taskType,
            classPath:result[0].classPath,
        };
    }
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    render() {
        return (
            <div style={{padding:'20px'}}>
                <Steps current={this.state.current}>
                    {this.state.stepData.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                {this.state.stepData.length>0?<div className="steps-content" style={{paddingTop:'20px',width:"50%",margin:'0 auto'}}>{this.state.stepData[this.state.current].content}</div>:null}
                <div className="steps-action" style={{textAlign:'center'}}>
                    {this.state.current < this.state.stepData.length - 1 && (
                        <Button type="primary" onClick={this.next.bind(this,this.state.stepData[this.state.current].value)}>
                            下一步
                        </Button>
                    )}
                    {this.state.current === this.state.stepData.length - 1 && (
                        <Button type="primary" onClick={this.next.bind(this,this.state.stepData[this.state.current].value, false)}>
                            提交
                        </Button>
                    )}
                    {this.state.current > 0 && (
                        <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                            上一步
                        </Button>
                    )}
                </div>
            </div>
        );
    }
}

export default FlowCommon;