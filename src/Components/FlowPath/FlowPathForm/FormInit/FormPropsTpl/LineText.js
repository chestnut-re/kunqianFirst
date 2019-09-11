import React, {Component} from 'react';
import {Card, Form, Select, Icon, Button, List} from 'antd'
const { Option } = Select;
class LineText extends Component {
    constructor(){
        super()
        this.state = {

        }
    }
    render() {
        return (
            <Form>
                <Card size={"small"} title={"基础属性"}>
                </Card>
                <Card size={"small"} title={"字段验证"}>
                    <Select>
                        <Option key={"常用验证"}>常用验证</Option>
                        <Option key={"数字"}>数字</Option>
                        <Option key={"字母或下划线"}>字母或下划线</Option>
                        <Option key={"email"}>email</Option>
                        <Option key={"url"}>url</Option>
                        <Option key={"日期"}>日期</Option>
                        <Option key={"时间"}>时间</Option>
                        <Option key={"整数"}>整数</Option>
                        <Option key={"不以数字开头"}>不以数字开头</Option>
                        <Option key={"以字母开头"}>以字母开头</Option>
                        <Option key={"汉字"}>汉字</Option>
                        <Option key={"QQ号"}>QQ号</Option>
                        <Option key={"手机号码"}>手机号码</Option>
                    </Select>
                    <List>

                    </List>
                </Card>
                <Card size={"small"} extra={<Icon type="select" />} title={"统计函数"}>
                    <List></List>
                </Card>
                <Card size={"small"} extra={<Button type={"primary"}>日期计算</Button>}>
                    <div></div>
                </Card>
            </Form>
        );
    }
}

export default LineText;