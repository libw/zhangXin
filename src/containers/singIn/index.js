import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import { createForm } from 'rc-form';
import {List, InputItem, Button, Picker, Toast} from 'antd-mobile';
import {login, register} from '../../actions/user'
import {setResultsPage} from '../../actions/resultsPage'
import {bindActionCreators} from 'redux'
import {hashHistory, Link} from 'react-router';
import Header from '../../components/header'

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: true,
            name: '',
            pwd: '',
            code: ''
        }
    }


    submitFn() {
            // if (!/^[a-zA-Z]+$/.test(this.state.name)) {
            //     Toast.fail('请输入正确的用户名', 3, null, false)
            //     return false
            // }
            if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/.test(this.state.pwd)) {
                Toast.fail('密码格式错误', 3, null, false)
                return false
            }
            console.log(this.state.pickerValue);

            Toast.loading('登录中', 3, null, false)
            this.props.login({
                name: this.state.name,
                pwd: this.state.pwd,
                pickerValue: this.state.pickerValue
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
        const { getFieldProps } = this.props.form;



        return (
            <div className={style.wrap}>
                <Header/>
                <span className={style.header}>学生签到页</span>
                <section className={style.content}>
                    <div className={style.selphone}>
                        <div className={style.phone}>
                            <List>
                                <InputItem onChange={(value) => {
                                    this.setState({name: value})
                                }} placeholder="请输入学号" type="text"></InputItem>
                            </List>
                        </div>
                    </div>
                    <div className={style.selphone}>
                        <div className={style.tu}>
                            <List>
                                <InputItem type="password" onChange={(value) => {this.setState({pwd: value})}} placeholder={'请输入密码'}></InputItem>
                            </List>
                        </div>
                    </div>
                    <p className={style.tip}>
                        *禁止为他人签到，一经发现，签到双方将处以开除学籍处分
                    </p>
                    <div className={style.button}>
                        <Button onClick={this.submitFn.bind(this)} type="primary">
                            {
                              '签到'
                            }
                        </Button>
                    </div>

                </section>
            </div>
        )
    }

    toreg() {
        this.setState({
            login: true
        })
    }

    tolog() {
        this.setState({
            login: false
        })
    }


}

function mapStateToProps(state, props) {
    return {
        authFrom: state.authFrom
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: bindActionCreators(login, dispatch),
        register: bindActionCreators(register, dispatch),
        setResultsPage:bindActionCreators(setResultsPage, dispatch)
    }
}

Auth = connect(mapStateToProps, mapDispatchToProps)(Auth)

const AuthWrapper = createForm()(Auth);
export default AuthWrapper;