import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast} from 'antd-mobile';
import Header from '../../components/header'
import {bindActionCreators} from 'redux'
import {hashHistory} from 'react-router'
import {logout,getBaseUserMsg} from '../../actions/user'

class BaseUserMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    logout() {
        Toast.loading('正在退出', 0)
        this.props.logout({

        }, (errorText) => {
            Toast.hide()
            if (errorText) {
                Toast.fail(errorText, 3, null, false)
            } else {
                hashHistory.push('/')
            }
        })
    }

    componentDidMount(){
        this.props.getBaseUserMsg({

        }, (errorText) => {
            Toast.hide()
            if (errorText) {
                Toast.fail(errorText, 3, null, false)
            } else {
                //hashHistory.push('/')
            }
        })
    }

    render() {
        console.log("ggg",this.props.user)
        return (
            <div className={style.wrap}>
                <Header/>
                <div className={style.part}>
                    <List>
                        <InputItem
                            placeholder="大大飞机"

                            style={{textAlign: 'right'}}
                        >设置昵称</InputItem>
                    </List>
                </div>
                <div className={style.part}>
                    <List>
                        <InputItem
                            value="6217**********800"
                            editable={false}
                            style={{textAlign: 'right'}}
                        >出金账户</InputItem>
                        <InputItem
                            value={this.props.user.userName}
                            editable={false}
                            style={{textAlign: 'right'}}
                        >绑定手机号</InputItem>
                        <InputItem
                            value={this.props.user.MT4}
                            editable={false}
                            style={{textAlign: 'right'}}
                        >MT4账号</InputItem>
                    </List>
                </div>

                <div className={style.part}>
                    <List>
                        <InputItem
                            value={this.props.user.floating}
                            editable={false}
                            style={{textAlign: 'right'}}
                        >浮动盈亏</InputItem>
                        <InputItem
                            value={this.props.user.netWorth}
                            editable={false}
                            style={{textAlign: 'right'}}
                        >净值</InputItem>
                        <InputItem
                            value={this.props.user.balance}
                            editable={false}
                            style={{textAlign: 'right'}}
                        >余额</InputItem>
                    </List>
                </div>
                <div>
                    <a onTouchEnd={this.logout.bind(this)} className={style.ensure} href="javascript:void(0)">
                        退出登录
                    </a>
                </div>

            </div>
        )

    }


}

function mapStateToProps(state, props) {
    return {
        user:state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: bindActionCreators(logout, dispatch),
        getBaseUserMsg: bindActionCreators(getBaseUserMsg, dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;