import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import { createForm } from 'rc-form';
import {List, InputItem, Button, Picker, Toast} from 'antd-mobile';
import {singin} from '../../actions/user'
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
        if (!this.state.studentId||!this.state.pwd) {
            Toast.fail('请完善信息', 3, null, false)
            return false
        }
        this.props.singin({
            studentId: this.state.studentId,
            pwd: this.state.pwd,
            courseId: this.state.class[1],
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

        const teacher = [
            [
                {
                    label: '高等数学',
                    value: '高等数学',
                },
                {
                    label: '大学物理',
                    value: '大学物理',
                },
                {
                    label: '线性代数',
                    value: '线性代数',
                },
                {
                    label: '体育',
                    value: '体育',
                },
            ]
            ,
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
                <span className={style.header}>学生签到页</span>
                <section className={style.content}>
                    <div className={style.selphone}>
                        <div className={style.phone1}>
                            <List>
                                <Picker
                                    data={teacher}
                                    title="选择课程"
                                    cascade={false}
                                    extra="请选择"
                                    value={this.state.class}
                                    onChange={v => this.setState({ class: v })}
                                    onOk={v => this.setState({ class: v })}
                                >
                                    <List.Item arrow="horizontal">课程</List.Item>
                                </Picker>
                            </List>
                        </div>
                    </div>
                    <div className={style.selphone}>
                        <div className={style.phone}>
                            <List>
                                <InputItem onChange={(value) => {
                                    this.setState({studentId: value})
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
        singin: bindActionCreators(singin, dispatch),
    }
}

Auth = connect(mapStateToProps, mapDispatchToProps)(Auth)

const AuthWrapper = createForm()(Auth);
export default AuthWrapper;