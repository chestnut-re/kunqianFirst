import React, {Component} from 'react';
import ProjectService from "../../../Service/ProjectService";
import {Form, Input, Table,PageHeader, Radio, Button, Modal, Select, message} from 'antd'
import "../../../Assets/Styles/common.less";
import Utils from "../../../Utils/Class/Utils";
const { Option } = Select;
class ProTrainTest extends Component{
    constructor (props) {
        super(props);
        this.ProjectService = new ProjectService();
        this.state = {
            //弹出框
            addItemFlag : false,
            ModalText: '正在运行，模型运行中请您稍后',
            confirmLoading: false,
            itemName:'',
            typeName:'',
            itemDescription:'',
            name:'',
            appName:'',
            algorithmName:'',
            path:'',
            savePath:'',
            type:'classify'
        }
    }

    componentDidMount() {
        this.getOperationData();
        //this.getClassifyS()
    }

    render() {
        const  {  itemName,typeName, itemDescription, name, appName, algorithmName, confirmLoading, ModalText} = this.state;
        return(
            <Form style={{padding: '10px'}}>
                <PageHeader title="模型测试"/>
                <Form.Item label={"模型选择"}>
                    {getFieldDecorator("itemTypeId", {
                        rules: [
                            { required: true, message: '模型类别不能为空' },
                        ]
                    })(<Select placeholder={"请选择模型类别"}>
                        {this.props.algrithmClass.map(item => {
                            return <Select.Option value={item.typeId} key={item.typeId}>{item.algrithm}</Select.Option>;
                        })}
                    </Select>)}
                </Form.Item>
                <Form.Item label={"语料选择"}>
                    {getFieldDecorator("itemTypeId", {
                        rules: [
                            { required: true, message: '训练语料不能为空' },
                        ]
                    })(<Select placeholder={"请选择训练语料"}>
                        {this.props.algrithmClass.map(item => {
                            return <Select.Option value={item.typeId} key={item.typeId}>{item.algrithm}</Select.Option>;
                        })}
                    </Select>)}
                </Form.Item>
                <Form.Item>
                    <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
                </Form.Item>
                <Form.Item style={{margin:20,textAlign:'center'}}>
                    <Button type="primary" onClick={this.showModal} style={{margin:50}}>
                        确认
                    </Button>
                    <Button type="primary" onClick={this.check}>
                        取消
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(ProTrainTest);