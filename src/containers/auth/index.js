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
        if (this.state.login) {
            if (!/^[a-zA-Z]+$/.test(this.state.name)) {
                Toast.fail('请输入正确的用户名', 3, null, false)
                return false
            }
            if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/.test(this.state.pwd)) {
                Toast.fail('密码格式错误', 3, null, false)
                return false
            }
            console.log(this.state.pickerValue);
            if (!this.state.pickerValue) {
                Toast.fail('请选择身份', 3, null, false)
                return false
            }
            Toast.loading('登录中', 3, null, false)
            // this.props.login({
            //     name: this.state.phone,
            //     pwd: this.state.pwd,
            //     pickerValue: this.state.pickerValue
            // }, (errorText) => {
            //     Toast.hide()
            //     if (errorText) {
            //         Toast.fail(errorText, 3, null, false)
            //     } else {
            //         if (this.props.authFrom.path) {
            //             hashHistory.push(this.props.authFrom.path)
            //         } else {
            //             hashHistory.push('/')
            //         }
            //     }
            // })
        } else {
            if (!/^[a-zA-Z]+$/.test(this.state.name)) {
                Toast.fail('请输入正确的用户名', 3, null, false)
                return false
            }
            if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/.test(this.state.pwd)) {
                Toast.fail('密码格式错误', 3, null, false)
                return false
            }
            Toast.loading('注册中', 3, null, false)
            // this.props.register({
            //     name: this.state.name,
            //     pwd: this.state.pwd,
            //     pickerValue: this.state.pickerValue
            // }, (errorText) => {
            //
            //     Toast.hide()
            //     if (errorText) {
            //         Toast.fail(errorText, 3, null, false)
            //     } else {
            //         if (this.props.authFrom.path&&this.props.authFrom.path === '/speedAccount') {
            //                 hashHistory.push(this.props.authFrom.path)
            //         } else {
            //             this.props.setResultsPage({
            //                 title:'注册成功',
            //                 path:'/',
            //                 status:1
            //             },()=>{
            //                 hashHistory.push('/resultsPage')
            //             })
            //         }
            //     }
            // })
        }
    }

    render() {
        const { getFieldProps } = this.props.form;
        let show = {
            display: this.state.login ? 'none' : 'block'
        }
        const district=[
            {
                value:'student',
                label:"学生"
            },{
                value:'teacher',
                label:"老师"
            },{
                value:'admin',
                label:"管理员"
            },

        ]

        return (
            <div className={style.wrap}>
                <Header/>
                <div className={style.logo}></div>
                <nav className={style.nav}>
                    <div>
                        <span id={this.state.login ? style.active : ""} onClick={this.toreg.bind(this)}>登录</span>
                    </div>
                    <div>
                        <span id={this.state.login ? "" : style.active} onClick={this.tolog.bind(this)}>注册</span>
                    </div>
                </nav>
                <section className={style.content}>
                    <div className={style.selphone}>
                        <div className={style.phone}>
                            <List>
                                <InputItem onChange={(value) => {
                                    this.setState({name: value})
                                }} placeholder="请输入用户名" type="text"></InputItem>
                            </List>
                        </div>
                    </div>
                    <div className={style.selphone}>
                        <div className={style.tu}>
                            <List>
                                <InputItem type="password" onChange={(value) => {this.setState({pwd: value})}} placeholder={this.state.login ? '请输入密码' : '请设置6-20位密码'}></InputItem>
                            </List>
                        </div>
                    </div>
                    <div className={style.selphone}>
                        <Picker data={district} cols={1} {...getFieldProps('district3')} className="forss" onChange={v => this.setState({ pickerValue: v })}>
                            <List.Item arrow="horizontal">身份选择</List.Item>
                        </Picker>
                    </div>
                    <div className={style.button}>
                        <Button onClick={this.submitFn.bind(this)} type="primary">
                            {
                                this.state.login ? '立即登录' : '立即注册'
                            }
                        </Button>
                    </div>
                    <div className={style.fp} hidden={this.state.login?false:true}>
                        <Link to='/forgetPwd'>
                            忘记密码?
                        </Link>
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