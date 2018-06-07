import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import { Button,RefreshControl, ListView,Accordion, List,Checkbox,NoticeBar } from 'antd-mobile';
import Header from '../../components/header'
import ReactDOM from 'react-dom'
import {hashHistory} from 'react-router'
import {selectClass,login} from '../../actions/user'
import {bindActionCreators} from 'redux'
import {Modal, Toast} from "antd-mobile/lib/index";
import axios from '../../common/axiosConf'

const CheckboxItem = Checkbox.CheckboxItem;
const prompt = Modal.prompt;

const data = [
    {
        subject: '高等数学',//学科
        teacher: '张鑫',//老师名
        time: '周三 17：00',//时间
        credit:'1',//所占学分
        classroom:'教学A栋101'//课程类型
    },{
        subject: '大学物理',
        teacher: '钱家瑞',
        time: '周二 10：00',
        credit:'2',
        classroom:'教学C栋202'
    },{
        courseId
            :
            "101",
        subject: '体育',
        teacher: '罗乙妍',
        time: '周三 14：00',
        credit:'1',
        classroom:'教学A栋101'
    },{
        courseId
            :
            "101",

        subject: '大学物理',
        teacher: '钱家瑞',
        time: '周二 10：00',
        credit:'2',
        classroom:'教学B栋303'
    },

];

let arr=[]
let arr1=[]

class History extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data:[],
            message:'',
            messageShow:true
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
        axios.get(`http://118.24.128.250:8080/web-api/api/courseInfo?userId=${localStorage.getItem('userID')}`,)
            .then(function (response) {
                console.log(response);
                that.setState({
                    data:response.data.result
                },()=>{
                    console.log(this.state.data);
                })

         })
            .catch(function (error) {
                console.log(error);
                // alert(error);
            });
        axios.get(`http://118.24.128.250:8080/web-api/api/getMessage`,)
            .then(function (response) {
                console.log(response);
                console.log(response.data.result);
                that.setState({
                    message:response.data.result,
                    messageShow:false
                },()=>{
                    console.log(this.state.message);
                })

         })
            .catch(function (error) {
                console.log(error);
                // alert(error);
            });
    }

    dedupe(array){
        return Array.from(new Set(array)).join(',');
    }
    dedupe1(array){
        return Array.from(new Set(array)).join(',');
    }

    submitFn() {
        console.log(this.dedupe(arr));
        if (this.dedupe(arr).length==0) {
            Toast.fail('请选择', 3, null, false)
            return false
        }
        if (this.dedupe1(arr1).length==0) {
            Toast.fail('请选择', 3, null, false)
            return false
        }
        this.props.selectClass({
            select: this.dedupe(arr),
            courseName:this.dedupe1(arr1),
            studentId: this.state.studentId
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

    time(i){
        console.log(new Date().getDay(i));
        return '周'+new Date().getDay(i)+' '+new Date().getHours(i) + ':'+new Date().getMinutes(i)
    }

    onChange (i,v) {
        console.log(i);
        arr.push(i);
        arr1.push(v);
    }


    render() {

        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );

        return (
            <div className={style.wrap}>
                <Header/>
                <div hidden={this.state.messageShow}>
                    <NoticeBar mode="closable" icon={null}>{this.state.message}</NoticeBar>
                </div>
                <span className={style.tip} hidden={this.props.user.token}>
                    请<a onClick={() => prompt(
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
                )} > 登录 </a>后查看
                </span>
                <div hidden={!this.props.user.token}>
                    <List renderHeader={() => '选修课程列表'}>
                        {this.state.data.map(i => (
                            <CheckboxItem key={i.value} onChange={() => this.onChange(i.courseId,i.courseName)}>
                                <span className={style.title} >
                                    <b>{i.courseName}</b>
                                </span>
                                <div className={style.icontent}>
                                    <div className={style.time}>
                                        教师
                                        <span>{i.teacher}</span>
                                    </div>
                                    <div className={style.state}>
                                        时间
                                        <span> {
this.time(i.courseTime)
                                        }</span>
                                    </div>
                                    <div className={style.number}>
                                        课程ID
                                        <span>{i.courseId}</span>
                                    </div>
                                    <div className={style.way}>
                                        教室
                                        <span>{i.address}</span>
                                    </div>
                                </div>
                            </CheckboxItem>
                        ))}

                    </List>
                    <div className={style.but}>
                        <Button onClick={this.submitFn.bind(this)}  type="primary">提交</Button>
                    </div>
                </div>


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
        selectClass:bindActionCreators(selectClass, dispatch),
        login:bindActionCreators(login, dispatch),
    }
}

History = connect(mapStateToProps, mapDispatchToProps)(History)


export default History;