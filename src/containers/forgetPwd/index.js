import React from 'react'
import style from "./index.css"
import { createForm } from 'rc-form';
import {connect} from 'react-redux'
import { List,InputItem,Button,WingBlank,Picker,RadioGroup} from 'antd-mobile';
import Header from '../../components/header'
import {Toast} from "antd-mobile/lib/index";

class ForgetPwd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    submitFn() {

        if (!/^[a-zA-Z]$/.test(this.state.name)) {
            Toast.fail('请输入正确的用户名', 3, null, false)
            return false
        }
        if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/.test(this.state.pwd)) {
            Toast.fail('密码格式错误', 3, null, false)
            return false
        }
        if (!this.state.pickerValue) {
            Toast.fail('请选择身份', 3, null, false)
            return false
        }
        Toast.loading('修改成功', 3, null, false)
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

    }

    render() {
        const { getFieldProps } = this.props.form;

        const district=[
            {
                value:"student",
                label:"学生"
            },{
                value:"teacher",
                label:"老师"
            },{
                value:"admin",
                label:"管理员"
            },

        ]

        return (
            <div className={style.wrap}>

                <Header/>
                    <section className={style.content}>
                        <span className={style.title}>
                        忘记密码
                        </span>
                        <div className={style.selphone}>
                            <div className={style.phone}>
                                <List>
                                    <InputItem onChange={(value) => {this.setState({name: value})}} placeholder="用户名" type="text"></InputItem>
                                </List>
                            </div>
                        </div>
                        <div className={style.selphone}>
                            <div className={style.tu}>
                                <List>
                                    <InputItem type="password" placeholder='请输入密码' onChange={(value) => {
                                        this.setState({pwd: value})
                                    }}></InputItem>
                                </List>

                            </div>
                        </div>
                        <div className={style.selphone}>
                            <Picker data={district} cols={1} {...getFieldProps('district3')} className="forss" onChange={v => this.setState({ pickerValue: v })} onOk={v => this.setState({ pickerValue: v })} value={this.state.pickerValue}>
                                <List.Item arrow="horizontal">身份选择</List.Item>
                            </Picker>
                        </div>
                        <div className={style.button}>
                            <Button onClick={this.submitFn.bind(this)} type="primary">
                                确定
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
    return {}
}

ForgetPwd = connect(mapStateToProps, mapDispatchToProps)(ForgetPwd)
const ForgetPwdWrapper = createForm()(ForgetPwd);
export default ForgetPwdWrapper;