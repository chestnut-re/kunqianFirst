import React,{ Component } from 'react';
import {Icon, Input} from "antd";
class TextareaModel extends Component{
    render() {
        return(
            <p data-flag="textarea">
                <strong>单行文本</strong>
                <Input.TextArea placeholder={"请输入"} disabled={true}/>
                <span style={{display:'none'}}><Icon type="snippets"/></span>
                <span style={{display:'none'}}><Icon type="delete"/></span>
            </p>
        )
    }
}
export default TextareaModel;