import React, { Component } from "react"
import { Tree } from 'antd'
const { TreeNode } = Tree;
class TreeNav extends Component{
    treeElement(data) {
        let element = [];
        for(let i = 0; i < data.length; i++) {
            if (data[i].children) {
                element.push((<TreeNode title={data[i].label} key={data[i].value}>
                    {this.treeElement(data[i].children)}
                </TreeNode>))
            } else {
                element.push(<TreeNode title={data[i].label} key={data[i].value}></TreeNode>);
            }
        }
        return element;
    }
    render() {
        return(
            <div>
                {this.props.dataTree.length > 0?
                <Tree>
                    {this.treeElement(this.props.dataTree)}
                </Tree>:null}
            </div>
        )
    }
}
export default TreeNav;