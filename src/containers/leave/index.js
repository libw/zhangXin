import React from 'react'
import style from "./index.css"
import { createForm } from 'rc-form';
import {connect} from 'react-redux'
import { List,InputItem,Button,WingBlank,Picker,RadioGroup,DatePicker} from 'antd-mobile';
import Header from '../../components/header'
import {Toast} from "antd-mobile/lib/index";

class ForgetPwd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    submitFn() {
        console.log(this.state.class);
        console.log(this.state.leave);
        // if (!this.state.message) {
        //     Toast.fail('请输入推送的消息', 3, null, false)
        //     return false
        // }
            // this.props.login({
            //     class: this.state.class,
            //     name: this.state.leave,
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
                    label: '周二17：00 高等数学',
                    value: '001',
                },
                {
                    label: '周一10：00 体育',
                    value: '002',
                },
                {
                    label: '周一8：00 大学物理',
                    value: '003',
                },
                {
                    label: '周二14：00 线性代数',
                    value: '004',
                },
            ],
        ];

        return (
            <div className={style.wrap}>

                <Header/>
                    <section className={style.content}>
                        <span className={style.title}>
                            请假申请
                        </span>
                        <div className={style.selphone}>
                            <div className={style.phone}>
                                <List>
                                    <Picker
                                        data={seasons}
                                        title="选择课程"
                                        cascade={false}
                                        extra="请选择"
                                        value={this.state.class}
                                        onChange={v => this.setState({ class: v })}
                                        onOk={v => this.setState({ class: v })}
                                    >
                                        <List.Item arrow="horizontal">请假课程</List.Item>
                                    </Picker>
                                </List>
                            </div>
                        </div>
                        <div className={style.selphone}>
                            <div className={style.phone}>
                                <List>
                                    <InputItem onChange={(value) => {this.setState({leave: value})}} placeholder='请输入' type="text">请假理由</InputItem>
                                </List>
                            </div>
                        </div>
                        <div className={style.button}>
                            <Button onClick={this.submitFn.bind(this)} type="primary">
                                申请
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