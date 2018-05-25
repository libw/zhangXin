import React from 'react'
import QRCode from 'qrcode.react';
import style from "./index.css"
import {connect} from 'react-redux'
import { Button } from 'antd-mobile';
import {hashHistory, Link} from 'react-router';
import Header from '../../components/header'
import {Modal, Toast} from "antd-mobile/lib/index";
import {bindActionCreators} from "redux";
import {login} from "../../actions/user";

const prompt = Modal.prompt;

class Qcode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            string:0,
            num:20
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
                <div className={style.qcode} hidden={!this.props.user.token}>
                    <QRCode size={200} value={'http://192.168.1.104:3000/#/singin'+this.state.string} />
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