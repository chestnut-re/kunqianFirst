import React, { Component } from 'react'
import { Pagination, message } from 'antd'
import { service } from "../../Class/Service"
import Utils from "../../Class/Utils"
class PageComponent extends Component{
    constructor() {
        super()
        this.state = {
            pageData:{
                pageSize:10,
                pageNum:1,
            },
            pageValues: {},
            dataSource: [],
            total:0,
        }
    }
    componentDidMount() {
        this.pageOnChange(1,10);
    }
    resetData() {
        this.pageOnChange(this.state.pageData.pageNum,this.state.pageData.pageSize);
    }
    selectAll(values) {
        this.setState({
            pageValues:{...this.state.pageValues,...values}
        },() =>{
            this.pageOnChange(1,this.state.pageData.pageSize);
        })
    }
    showTotal(total) {
        return `总共${total}条`;
    }
    pageOnChange(pageNum, pageSize) {
        this.setState({
            pageData: {
                pageNum: pageNum,
                pageSize: pageSize,
            }
        },()=>{
            let result = {
                ...this.state.pageData,
                ...this.state.pageValues
            }
            service.post(this.props.url, Utils.deleteEmptyProperty(result)).then(res=>{
                let result = res.data;
                if (result.code> 0) {
                    this.props.dataSource(result.data.list);
                    this.setState({
                        total:result.data.total,
                    })
                } else {
                    message.error(result.msg);
                }
            });
        })
    }
    render() {
        return(<div>{this.state.total > 0 ?
                <Pagination style={{marginTop:10}} showTotal={this.showTotal.bind(this)}  defaultCurrent={this.state.pageData.pageNum} total={this.state.total} showSizeChanger onChange={this.pageOnChange.bind(this)} onShowSizeChange={this.pageOnChange.bind(this)}/>: ""}
              </div>
        )
    }
}
export default PageComponent;