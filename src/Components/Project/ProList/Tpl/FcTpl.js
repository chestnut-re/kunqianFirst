import React, {Component} from 'react';
import {Card, Form, Row, Col, Checkbox, Select, message} from 'antd';
import ResourcesService from '../../../../Service/ResourcesService';
class FcTpl extends Component {
    constructor() {
        super()
        this.ResourcesService = new ResourcesService();
        this.state = {
            checkBoxList: [],
            optionList:[],
        }
    }
    componentDidMount() {
        this.getDataList();
    }
    getDataList() {
        this.ResourcesService.AllDictionaryListUrl({pageNum:1,pageSize:10}).then(res=>{
            let result = res.data;
            if (result.code > 0) {
                this.setState({
                    checkBoxList:result.data.list,
                },()=>{
                    this.state.checkBoxList.map (item=>{

                    })
                })
            } else {
                message.error(result.msg)
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Card style={{marginTop:'10px',background:'#f8f8f8'}} size={"small"} title={this.props.title}>
                <Form>
                    <Row span={24} style={{lineHeight:'30px',paddingBottom:'10px'}}>词典选择:</Row>
                    {this.state.checkBoxList.map(item=>{
                        return <Row span={24} style={{lineHeight:'30px',paddingBottom:'10px'}}>
                                    <Col span={12}>{getFieldDecorator("aa", {})(<Checkbox key={item.id} value={item.id}>{item.dictName}</Checkbox>)}</Col>
                                    {this.state.optionList.length > 0 ? <Col span={12}>{getFieldDecorator("bb", {})(<Select>
                                        {this.state.optionList.map(res=>{
                                            return <Select.Option></Select.Option>
                                        })}
                                    </Select>)}</Col> : null}
                                </Row>
                    })}
                </Form>
            </Card>
        );
    }
}

export default Form.create()(FcTpl);