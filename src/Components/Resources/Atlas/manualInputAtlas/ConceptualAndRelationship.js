import React, {Component} from 'react';
import ResourcesAtlasService from "../../../../Service/ResourcesAtlasService";
import "../../../../Assets/Styles/common.less";
import Utils from "../../../../Utils/Class/Utils";
import {Button, Form, Input, message, Select} from "antd";
const { Option } = Select;

class ConceptualAndRelationship extends Component{
    constructor(props) {
        super(props)
        this.ResourcesAtlasService = new ResourcesAtlasService()
        this.state = {
           conceptClass:[],
           RelationshipClass:[],
        }
    }
    componentDidMount() {
        this.getEntityClass()
        this.getRelationshipClass()
    }
    getFormContent() {
        let result = {};
        this.props.form.validateFields((err, values) => {
            if (!err) {
                result.type = "add";
                result.entity = [
                    {
                        label: "GraphConcept",
                        name: values.conceptOne
                    }, {
                        label: "GrapnConcept",
                        name: values.conceptTwo
                    }];
                result.relation = {
                    name: [values.itemRelationship],
                    props:{

                    }

                }
                // result.conceptNode = values.conceptNode;
                // result.props = values.props.toString()
                //result = values
            }
        })
        return result;
    }
    restForm() {
        this.props.form.resetFields();
    }
    check(){
        let data = this.getFormContent();
        console.log(data)
        this.ResourcesAtlasService.graphQuery(data).then((res) => {
            let result = res.data;
            console.log(result);
            if(res.data.code > 0) {

            }else{
                message.error(result.msg)
            }
        })
        //this.props.history.push('/resources/atlas')
    }
    //实体
    getRelationshipClass(){
        this.ResourcesAtlasService.entityClass(0).then((res) => {
            let result = res.data;
            console.log(result);
            if (res.data.code > 0) {
                this.setState({
                    conceptClass: result.data
                })
            }else{
                message.error(result.msg);
            }
        })
    }
    //关系
    getEntityClass(){
        this.ResourcesAtlasService.entityClass(1).then((res) => {
            let result = res.data
            console.log(result)
            if (res.data.code > 0) {
                this.setState({
                    RelationshipClass: result.data
                })
            }else{
                message.error(result.msg);
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <div style={{padding:'10px'}}>
                <Form>
                    <Form.Item label={"选择概念1"}>
                        {getFieldDecorator('conceptOne', {})(<Select placeholder={"请选择概念类型"} style={{width:'200px'}}>
                            {this.state.conceptClass ?this.state.conceptClass.map((item,index)=>{
                                return <Select.Option value={item} key={index}>{item}</Select.Option>
                            }):null}
                        </Select>)}
                    </Form.Item>
                    <Form.Item label={"选择概念2"}>
                        {getFieldDecorator('conceptTwo', {})(<Select placeholder={"请选择概念类型"} style={{width:'200px'}}>
                            {this.state.conceptClass ?this.state.conceptClass.map((item,index)=>{
                                return <Select.Option value={item} key={index}>{item}</Select.Option>
                            }):null}
                        </Select>)}
                    </Form.Item>
                    <Form.Item label={"选择关系类别"}>
                        {getFieldDecorator('itemRelationship', {})(<Select placeholder={"请选择关系类型"} style={{width:'200px'}}>
                            {this.state.RelationshipClass ?this.state.RelationshipClass.map((item,index)=>{
                                return <Select.Option value={item} key={index}>{item}</Select.Option>
                            }):null}
                        </Select>)}
                    </Form.Item>
                    <Form.Item style={{margin:20,textAlign:'center'}}>
                        <Button type="primary" style={{margin:50}}
                                onClick={this.check.bind(this)}
                        >
                            确认
                        </Button>
                        <Button type="primary">
                            取消
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
export default Form.create()(ConceptualAndRelationship);