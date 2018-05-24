import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import { Button,RefreshControl, ListView,Accordion, List,Checkbox,NoticeBar } from 'antd-mobile';
import Header from '../../components/header'
import ReactDOM from 'react-dom'
import {hashHistory} from 'react-router'
import {checkLeave, login} from '../../actions/user'
import {bindActionCreators} from 'redux'
import {Modal, Toast} from "antd-mobile/lib/index";

const CheckboxItem = Checkbox.CheckboxItem;
const prompt = Modal.prompt;

const data = [
    {
        id:1,
        subject: '土木206',//学科
        teacher: '贾谊',//老师名
        time: '周三 17：00',//时间
        credit:'心情不太好，就是不想去',//所占学分
    },{
        id:2,
        subject: '机械308',
        teacher: '伊尔',
        time: '周二 10：00',
        credit:'去和小马谈合并腾讯的事情',
    },
];

let arr=[]

class History extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentWillMount(){
        if(!this.props.user.token){
            // this.props.setAuthFrom('/history',()=>{
            //     hashHistory.push('/auth')
            // })
        }
    }
    componentDidMount() {
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
    }


    onChange = (val) => {
        console.log(val);
        arr.push(val)
    }
    dedupe(array){
        return Array.from(new Set(array));
    }
    refuseFn() {
        if(!this.props.user.token){
            Toast.offline('请完成登录后进行操作', 3);
            return false
        }
        if (this.dedupe(arr).length==0) {
            Toast.fail('请选择', 3, null, false)
            return false
        }
        this.props.checkLeave({
            select: this.dedupe(arr),
            pass:false
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
    submitFn() {
        if(!this.props.user.token){
            Toast.offline('请完成登录后进行操作', 3);
            return false
        }
        console.log(this.dedupe(arr));
        if (this.dedupe(arr).length==0) {
            Toast.fail('请选择', 3, null, false)
            return false
        }
        this.props.checkLeave({
            select: this.dedupe(arr),
            pass:true
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
                <List renderHeader={() => '请假列表'}>
                    {data.map(i => (
                        <CheckboxItem key={i.id} onChange={() => this.onChange(i.id)}>
                            <span className={style.title} >
                                班级：<b>{i.subject}</b>
                            </span>
                            <div className={style.icontent}>
                                <div className={style.time}>
                                    学生
                                    <span>{i.teacher}</span>
                                </div>
                                <div className={style.state}>
                                    时间
                                    <span>{i.time}</span>
                                </div>
                                <div className={style.number}>
                                    理由
                                    <span>{i.credit}</span>
                                </div>
                            </div>
                        </CheckboxItem>
                    ))}

                </List>
                <div className={style.but}>
                    <Button onClick={this.submitFn.bind(this)} type="primary">批准</Button>
                </div>
                <div className={style.but}>
                    <Button onClick={this.refuseFn.bind(this)} type="warning">不批准</Button>
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
        checkLeave:bindActionCreators(checkLeave, dispatch),
        login: bindActionCreators(login, dispatch),
    }
}

History = connect(mapStateToProps, mapDispatchToProps)(History)


export default History;