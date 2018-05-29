import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import { RefreshControl, ListView,List } from 'antd-mobile';
import Header from '../../components/header'
import ReactDOM from 'react-dom'
import {hashHistory} from 'react-router'
import {setAuthFrom} from '../../actions/authFrom'
import {bindActionCreators} from 'redux'
import {Modal, Toast} from "antd-mobile/lib/index";
import {login} from "../../actions/user";
import axios from '../../common/axiosConf'

const prompt = Modal.prompt;
const data = [
    {
        title: '高等数学',//学科
        time: '周一 10：00',//周几
        number: '张三金',//几点
        way:'A楼320'//哪个教室
    },
    {
        title: '邓小平理论',
        time: '周一 14：00',
        number: '钱家瑞',
        way:'B楼150'
    },
    {
        title: '大学物理',
        time: '周一 16：00',
        number: '罗乙妍',
        way:'C楼190'
    },
    {
        title: '高等数学',
        time: '周二 14：00',
        number: '张鑫',
        way:'A楼320'
    }
];




class History extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data:[]
        };

    }

    time(i){
        console.log(new Date().getDay(i));
        return '周'+new Date().getDay(i)+' '+new Date().getHours(i) + ':'+new Date().getMinutes(i)
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
            console.log(data);
            that.setState({
                data:response.data.result
            },()=>{
                console.log(that.state.data);
            })

        })
            .catch(function (error) {
                alert(error);
            });
    }



    timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let W='周'+data.getDay()
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        return W+D+h+m;
    }

    render() {
        return (
            <div className={style.wrap}>
                <Header/>

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
                            <div style={{padding:'0 16px',marginBottom:10}} key={i.value} >

                                <div className={style.icontent}>
                                    <div className={style.time}>
                                        <span>{i.courseName}</span>
                                    </div>
                                    <div className={style.timeR}>
                                        时间
                                        <span> {
                                            this.time(i.courseTime)
                                        }</span>
                                    </div>
                                    <div className={style.number}>
                                        教师
                                        <span>{i.teacher}</span>
                                    </div>
                                    <div className={style.way}>
                                        教室
                                        <span>{i.address}</span>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </List>
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
        setAuthFrom:bindActionCreators(setAuthFrom, dispatch),
        login:bindActionCreators(login, dispatch),
    }
}

History = connect(mapStateToProps, mapDispatchToProps)(History)


export default History;