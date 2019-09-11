import React,{ Component } from "react";
import PutAtlas from "./PutConcept";
import PutRelationship from "./PutRelationship"
import PutData from "../PutData/PutData";
import ConceptualAndRelationship from "./ConceptualAndRelationship"
import "./ManualInput.less";
import "../../../../Assets/Styles/common.less";
import ResourcesAtlasService from "../../../../Service/ResourcesAtlasService"
import {Steps, Button, message, Form, PageHeader} from 'antd';

const { Step } = Steps;

const steps = [
    {
        title: '输入概念',
        content:<PutAtlas/>,
    },
    {
        title: '输入关系',
        content: <PutRelationship/>,
    },{
        title: '创建概念关系',
        content: <ConceptualAndRelationship/>,
    },
    {
        title: '输入数据',
        content: <PutData/>,
    },
];


class ManualInput extends  Component{
    constructor(props) {
        super(props);
        this.ResourcesAtlasService = new ResourcesAtlasService()
        this.state = {
            current:0,
        }
    }
    componentDidMount(){

    }
    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    render() {
        const { current } = this.state;
        return(
            <div style={{padding:'10px'}}>
                <PageHeader title="创建图谱-输入图谱"/>
                <Steps current={current}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div className="steps-content">{steps[current].content}</div>
                <div className="steps-action">
                    {current > 0 && (
                        <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                            上一步
                        </Button>
                    )}
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => this.next()}>
                            下一步
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            完成
                        </Button>
                    )}

                </div>
            </div>
        )
    }
}
export default Form.create()(ManualInput);