import React from 'react'
import style from "./index.css"
import { List,InputItem,Button,WingBlank,Picker,RadioGroup} from 'antd-mobile';
import { createForm } from 'rc-form';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {hashHistory, Link} from 'react-router';
import {pushMessage} from '../../actions/user'
import {Toast} from "antd-mobile/lib/index";
import Header from '../../components/header'

class ForgetPwd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    submitFn() {
        if (!this.state.message) {
            Toast.fail('请输入推送的消息', 3, null, false)
            return false
        }
            this.props.pushMessage({
                message: this.state.message,
            }, (errorText) => {
                Toast.hide()
                if (errorText) {
                    Toast.fail(errorText, 3, null, false)
                } else {
                    if (this.props.authFrom.path) {
                        hashHistory.push(this.props.authFrom.path)
                    } else {
                        hashHistory.push('/')
                    }
                }
            })

    }

    render() {


        return (
            <div className={style.wrap}>

                <Header/>
                    <section className={style.content}>
                        <span className={style.title}>
                        推送消息
                        </span>
                        <div className={style.selphone}>
                            <div className={style.phone}>
                                <List>
                                    <InputItem onChange={(value) => {this.setState({message: value})}} placeholder='消息内容' type="text"></InputItem>
                                </List>
                            </div>
                        </div>
                        <div className={style.button}>
                            <Button onClick={this.submitFn.bind(this)} type="primary">
                                推送
                            </Button>
                        </div>
                    </section>
            </div>
        )

    }


}

function mapStateToProps(state, props) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        pushMessage: bindActionCreators(pushMessage, dispatch),
    }
}

ForgetPwd = connect(mapStateToProps, mapDispatchToProps)(ForgetPwd)
const ForgetPwdWrapper = createForm()(ForgetPwd);
export default ForgetPwdWrapper;