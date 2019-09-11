import React,{ Component } from "react";
import ResourcesAtlasService from "../../../../Service/ResourcesAtlasService";
import "../../../../Assets/Styles/common.less";
import Utils from "../../../../Utils/Class/Utils";
import {Form, Input, PageHeader, Radio, Button, Modal, Select, message, Row, Card, Col,} from 'antd'
const { Option } = Select;

class EntityRelational extends Component{
    constructor(props){
        super(props);
        this.ResourcesAtlasService = new ResourcesAtlasService()
        this.state ={
            relationalAttributeClass:[],
            acd:{}
        }
    }
    componentDidMount() {
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
    getRelationalAttribute(value){
        let val = value.replace(/\`/g,``)
        console.log(val)
        this.ResourcesAtlasService.relationalAttribute(`?name=${val}`).then((res) => {
            let result = res.data
            console.log(result)
            if (res.data.code > 0) {
                this.setState({
                    relationalAttributeClass: result.data
                })
            }else{
                message.error(result.msg);
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{padding: '10px'}}>
                <Form.Item label={"输入关系数据"}>
                    {getFieldDecorator('name', {})(<Select placeholder={"请选择实体关系"} style={{width:'200px'}} onChange={this.getRelationalAttribute.bind(this)}>
                        {this.props.RelationshipClass ?this.props.RelationshipClass.map((item,index)=>{
                            return <Select.Option value={item} key={index}>{item}</Select.Option>
                        }):null}
                    </Select>)}
                </Form.Item>
                <Card title="关系" bordered={false}>
                    {this.state.relationalAttributeClass ?this.state.relationalAttributeClass.map((item,index)=>{
                            if(item.length > 0){
                                return <Form.Item label={item}>{getFieldDecorator(`${item}`, {
                                            rules: [
                                                { required: true, message: '不能为空' },
                                            ]
                                        })(<Input placeholder={"请输入"}/>)}
                                        </Form.Item>

                            }else{
                                message.error("没有数据");
                            }
                        }):null}
                </Card>
            </div>
        )
    }
}
export default Form.create()(EntityRelational);