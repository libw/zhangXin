import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import { List, ListView ,Modal,Toast,NoticeBar} from 'antd-mobile';
import Header from '../../components/header'
import ReactDOM from 'react-dom'
import {hashHistory} from 'react-router'
import {login} from '../../actions/user'
import {bindActionCreators} from 'redux'
import axios from "../../common/axiosConf";


const data = [
    {
        title: '高等数学',
        time: '98',//总分
        number: '100',//期末成绩
        way:'30'//平时分
    },
    {
        title: '大学物理',
        time: '80',
        number: '86',
        way:'25'
    },
    {
        title: '马克思思想',
        time: '90',
        number: '87',
        way:'30'
    },
    {
        title: '邓小平理论',
        time: '84',
        number: '80',
        way:'30'
    }
];
const prompt = Modal.prompt;

class History extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data:[]
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
        axios.get(`http://118.24.128.250:8080/web-api/api/scoreInfo?userId=${localStorage.getItem('userID')}`,)
            .then(function (response) {
                console.log(response);
                console.log(response.data.result);
                that.setState({
                    data:response.data.result,
                },()=>{
                    console.log(that);
                    console.log(that.state.data);
                })

            })
            .catch(function (error) {
                console.log(error);
                // alert(error);
            });
    }


    render() {

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
                            <div className={style.item} >
                                <span className={style.title} >
                                    {i.courseName}
                                </span>
                                <div className={style.icontent}>
                                    <div className={style.time}>
                                        总成绩
                                        <span>{i.score}</span>
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
        login:bindActionCreators(login, dispatch)
    }
}

History = connect(mapStateToProps, mapDispatchToProps)(History)


export default History;