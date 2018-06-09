import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import { createForm } from 'rc-form';
import { NoticeBar,Toast, ListView,Picker,List,Radio,InputItem,Button} from 'antd-mobile';
import Header from '../../components/header'
import ReactDOM from 'react-dom'
import {hashHistory} from 'react-router'
import {login,gradeTeacher} from '../../actions/user'
import {bindActionCreators} from 'redux'
import {Modal} from "antd-mobile/lib/index";
import axios from "../../common/axiosConf";

const RadioItem = Radio.RadioItem;
const Item = List.Item;
const prompt = Modal.prompt;

let arr=[[],[]]

class History extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
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
        axios.get(`http://118.24.128.250:8080/web-api/api/scoreInfo`,)
            .then(function (response) {
                console.log(response);
                console.log(response.data.result);
                that.setState({
                    data1:response.data.result,
                },()=>{
                    let obj={}
                    let obj1={}
                    that.state.data1.map(function (v) {
                        console.log(11);
                        console.log(v);
                        obj.value=v.userId;
                        obj.label=v.userId;
                        obj1.label=v.courseName;
                        obj1.value=v.courseId;
                        arr[0].push(obj)
                        arr[1].push(obj1)
                    })
                })

            })
            .catch(function (error) {
                console.log(error);
                // alert(error);
            });
    }

    submitFn() {
        if(!this.props.user.token){
            Toast.offline('请完成登录后进行操作', 3);
            return false
        }
        if (!this.state.student||!this.state.pacGrade||!this.state.endGrade) {
            Toast.fail('请输入推送的消息', 3, null, false)
            return false
        }
        this.props.gradeTeacher({
            student: this.state.student[0],
            pacGrade: this.state.pacGrade,
            endGrade: this.state.endGrade,
            grade:0.3*this.state.pacGrade+0.7*this.state.endGrade,
            subject:this.state.subject
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
        console.log('222');
        console.log(arr);
        const seasons = [
            [
                {
                    label: '贾谊',
                    value: '001',
                },
                {
                    label: '伊尔',
                    value: '002',
                },
                {
                    label: '冰三',
                    value: '003',
                },
                {
                    label: '丁司',
                    value: '004',
                },
            ],
            [
                {
                    label: '课程1',
                    value: '101',
                },
                {
                    label: '课程2',
                    value: '202',
                },
                {
                    label: '课程3',
                    value: '303',
                },
            ],

        ];
        return (
            <div className={style.wrap}>
                <Header/>
                <div hidden={this.state.messageShow}>
                    <NoticeBar mode="closable" icon={null}>{this.state.message}</NoticeBar>
                </div>
                <List renderHeader={() => '老师打分'}>
                    <div className={style.item} >
                        <div className={style.icontent}>
                            <Picker
                                data={arr}
                                title="选择学生"
                                cascade={false}
                                extra="请选择" value={this.state.student}
                                onChange={v => this.setState({ student: v })}
                                {/*发送接口参数处理*/}
                                onOk={v => this.setState({ student: v })}
                            >
                                <List.Item arrow="horizontal">学生</List.Item>
                            </Picker>

                        </div>
                        <InputItem
                            onChange={(value) => {this.setState({pacGrade: value})}}
                            type={'number'}
                            placeholder="请输入平时成绩"
                        >

                        </InputItem>
                        <InputItem
                            onChange={(value) => {this.setState({endGrade: value})}}
                            type={'number'}
                            placeholder="请输入期末成绩"
                        >

                        </InputItem>
                    </div>

                </List>
                <div className={style.button}>
                    <Button onClick={this.submitFn.bind(this)} type="primary">
                        确认
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
            </div>

        );
    }
}

function mapStateToProps(state, props) {
    return {
        user:state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login:bindActionCreators(login, dispatch),
        gradeTeacher:bindActionCreators(gradeTeacher, dispatch),
    }
}

History = connect(mapStateToProps, mapDispatchToProps)(History)

export default History;