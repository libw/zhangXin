import React from 'react'
import style from "./index.css"
import { createForm } from 'rc-form';
import {connect} from 'react-redux'
import { List,InputItem,Button,WingBlank,Picker,RadioGroup,DatePicker} from 'antd-mobile';
import Header from '../../components/header'
import {Modal, Toast} from "antd-mobile/lib/index";
import {bindActionCreators} from "redux";
import {leave,login} from "../../actions/user";
import {hashHistory, Link} from 'react-router';
import axios from "../../common/axiosConf";

const prompt = Modal.prompt;
const arr=[[]]

class ForgetPwd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillMount(){
        let that=this
        if(!this.props.user.token){
            prompt(
                '西安建筑科技大学教务处',
                <span className={style.tip1}>没有账号？去 <span onClick={()=>hashHistory.push('/auth')}>注册</span></span>,
                (login, password) => this.props.login({
                    userId: login,
                    pwd: password,
                }, (errorText) => {
                    Toast.hide()

                }),
                'login-password',
                null,
                ['请输入学号', '请输入密码'],
            )
        }
        axios.get(`http://118.24.128.250:8080/web-api/api/courseInfo?userId=${localStorage.getItem('userID')}`,) .then(function (response) {
            console.log(response);
            console.log(response.data.result);
            that.setState({
                data:response.data.result
            },()=>{
                console.log(that.state.data);
                that.state.data.map(function (v,i) {
                    let obj={}
                    obj.label=v.courseName;
                    obj.value=v.courseId;
                    arr[0].push(obj)


                })
            })

        })
            .catch(function (error) {
                // alert(error);
                console.log(error);
            });

        
    }

    submitFn() {
        if(!this.props.user.token){
            Toast.offline('请完成登录后进行操作', 3);
            return false
        }
        if (!this.state.class||!this.state.leave) {
            Toast.fail('请完成信息', 3, null, false)
            return false
        }
        this.props.leave({
            class: this.state.class[0],
            // leave: this.state.leave,
            // studentId: this.state.studentId
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
        console.log(arr);
        const seasons = [
            [
                {
                    label: '高等数学',
                    value: '101',
                },
                {
                    label: '大学物理',
                    value: '202',
                },
                {
                    label: '线性代数',
                    value: '303',
                },
                {
                    label: '体育',
                    value: '404',
                },
            ]

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
                                        data={arr}
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
                        <span className={style.tip}>
                            *操作前请完成
                            <a onClick={() => prompt(
                                '西安建筑科技大学教务处',
                                <span className={style.tip1}>没有账号？去 <span onClick={()=>hashHistory.push('/auth')}>注册</span></span>,
                                (login, password) => this.props.login({
                                    userId: login,
                                    pwd: password,
                                }, (errorText) => {
                                    Toast.hide()

                                }),
                                'login-password',
                                null,
                                ['请输入学号', '请输入密码'],
                            )} > 登录
                            </a>
                        </span>
                    </section>
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
        leave: bindActionCreators(leave, dispatch),
        login: bindActionCreators(login, dispatch),
    }
}

ForgetPwd = connect(mapStateToProps, mapDispatchToProps)(ForgetPwd)

export default ForgetPwd;