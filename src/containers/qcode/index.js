import React from 'react'
import QRCode from 'qrcode.react';
import style from "./index.css"
import {connect} from 'react-redux'
import { Button,NoticeBar } from 'antd-mobile';
import {hashHistory, Link} from 'react-router';
import Header from '../../components/header'
import {Modal, Toast} from "antd-mobile/lib/index";
import {bindActionCreators} from "redux";
import {login} from "../../actions/user";
import axios from '../../common/axiosConf'

const prompt = Modal.prompt;

class Qcode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            string:0,
            num:20,
            messageShow:true
        }
    }



    componentDidMount(){
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
        axios.get('http://118.24.128.250:8080/web-api/api/signInfo?courseId=001',) .then(function (response) {
            console.log('添加课表'+response);
            that.setState({
                data:response.result
            })

        })
            .catch(function (error) {
                alert(error);
            });
        let that=this;
        setInterval(that.time.bind(this),1000)
    }
    time(){
        let that=this;
        that.setState({
            num:that.state.num-1
        },()=>{
            // console.log(111,this.state.string);
            if(that.state.num<0){
                that.setState({
                    num:20,
                    string:that.state.string+1,
                })
            }
            if(that.state.string>4){
                that.setState({
                    string:0
                })
            }
        })
    }



    render() {

        return (
            <div className={style.wrap}>
                <Header/>
                <div hidden={this.state.messageShow}>
                    <NoticeBar mode="closable" icon={null}>{this.state.message}</NoticeBar>
                </div>
                <div className={style.qcode} hidden={!this.props.user.token}>
                    <QRCode size={200} value={'http://118.24.128.250:8080/build/index.html#/singin'+this.state.string} />
                </div>
                <span className={style.rtitle} hidden={!this.props.user.token}>
                    学生扫描签到
                </span>
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

                <div className={style.but} hidden={!this.props.user.token}>
                    有效时长 <span>{this.state.num}</span> s
                </div>

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
        login: bindActionCreators(login, dispatch),
    }
}

Qcode = connect(mapStateToProps, mapDispatchToProps)(Qcode)


export default Qcode;