import React from 'react'
import style from "./index.css"
import { createForm } from 'rc-form';
import {connect} from 'react-redux'
import { List,InputItem,Button,WingBlank,Picker,Stepper,RadioGroup,DatePicker} from 'antd-mobile';
import Header from '../../components/header'
import {Toast} from "antd-mobile/lib/index";

class ForgetPwd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            val: 2,
        }
    }

    onChange = (val) => {
        // console.log(val);
        this.setState({ val });
    }

    submitFn() {
        console.log(this.state.sValue);
        console.log(this.state.date);
        // if (!this.state.message) {
        //     Toast.fail('请输入推送的消息', 3, null, false)
        //     return false
        // }
            // this.props.login({
            //     class: this.state.class,
            //     name: this.state.name,
            //     sValue: this.state.sValue,
            //     date: this.state.date,
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
        const seasons = [
            [
                {
                    label: '教学A栋',
                    value: '教学A栋',
                },
                {
                    label: '教学B栋',
                    value: '教学B栋',
                },
                {
                    label: '教学C栋',
                    value: '教学C栋',
                },
                {
                    label: '教学D栋',
                    value: '教学D栋',
                },
            ],
            [
                {
                    label: '101',
                    value: '101',
                },
                {
                    label: '202',
                    value: '202',
                },
                {
                    label: '303',
                    value: '303',
                },
                {
                    label: '404',
                    value: '404',
                },
            ],
        ];

        return (
            <div className={style.wrap}>

                <Header/>
                    <section className={style.content}>
                        <span className={style.title}>
                        添加课程
                        </span>
                        <div className={style.selphone}>
                            <div className={style.phone}>
                                <List>
                                    <InputItem onChange={(value) => {this.setState({class: value})}} placeholder='请输入' type="text">课程名称</InputItem>
                                </List>
                            </div>
                        </div>
                        <div className={style.selphone}>
                            <div className={style.phone}>
                                <List>
                                    <InputItem onChange={(value) => {this.setState({name: value})}} placeholder='请输入' type="text">老师名</InputItem>
                                </List>
                            </div>
                        </div>
                        <div className={style.selphone}>
                            <div className={style.phone}>
                                <List>
                                    <InputItem onChange={(value) => {this.setState({credit: value})}} placeholder='请输入' type="text">学分</InputItem>
                                </List>
                            </div>
                        </div>
                        <div className={style.selphone}>
                            <div className={style.phone}>
                                <List>
                                    <DatePicker
                                        value={this.state.date}
                                        onChange={date => this.setState({ date })}
                                    >
                                        <List.Item arrow="horizontal">课程时间</List.Item>
                                    </DatePicker>
                                </List>
                            </div>
                        </div>
                        <div className={style.selphone}>
                            <div className={style.phone}>
                                <List>
                                    <Picker
                                        data={seasons}
                                        title="选择教室"
                                        cascade={false}
                                        extra="请选择"
                                        value={this.state.sValue}
                                        onChange={v => this.setState({ sValue: v })}
                                        onOk={v => this.setState({ sValue: v })}
                                    >
                                        <List.Item arrow="horizontal">教室</List.Item>
                                    </Picker>
                                </List>
                            </div>
                        </div>

                        <div className={style.button}>
                            <Button onClick={this.submitFn.bind(this)} type="primary">
                                添加
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