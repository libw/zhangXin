import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import { createForm } from 'rc-form';
import {List, InputItem, Button, Picker, Toast} from 'antd-mobile';
import {singin,login} from '../../actions/user'
import {bindActionCreators} from 'redux'
import {hashHistory, Link} from 'react-router';
import Header from '../../components/header'
import axios from "../../common/axiosConf";
import {Modal} from "antd-mobile/lib/index";

const prompt = Modal.prompt;
const arr=[[]]

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
        if (!this.state.class) {
            Toast.fail('请选择课程', 3, null, false)
            return false
        }
        this.props.singin({
            courseId: this.state.class[0],
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
                <span className={style.header}>学生签到页</span>
                <section className={style.content}>
                    <div className={style.selphone}>
                        <div className={style.phone1}>
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
                                    <List.Item arrow="horizontal">课程</List.Item>
                                </Picker>
                            </List>
                        </div>
                    </div>
                    <p className={style.tip2}>
                        *禁止为他人签到，一经发现，签到双方将处以开除学籍处分
                    </p>
                    <div className={style.button}>
                        <Button onClick={this.submitFn.bind(this)} type="primary">
                            {
                              '签到'
                            }
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
        singin: bindActionCreators(singin, dispatch),
        login: bindActionCreators(login, dispatch),
    }
}

Auth = connect(mapStateToProps, mapDispatchToProps)(Auth)

export default Auth;