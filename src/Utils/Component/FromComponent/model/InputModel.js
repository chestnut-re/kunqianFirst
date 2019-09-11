import React,{ Component } from 'react';
import {Icon, Input} from "antd";
class InputModel extends Component{
    render() {
        return(
            <p data-flag="input">
                <strong>单行文本</strong>
                <Input placeholder={"请输入"} disabled={true}/>
                <span style={{display:'none'}}><Icon type="snippets"/></span>
                <span style={{display:'none'}}><Icon type="delete"/></span>
            </p>
        )
    }
}
export default InputModel;