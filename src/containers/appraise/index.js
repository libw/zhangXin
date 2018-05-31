import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import { createForm } from 'rc-form';
import { Toast, ListView,Picker,List,Radio,Button,Modal,NoticeBar} from 'antd-mobile';
import Header from '../../components/header'
import ReactDOM from 'react-dom'
import {hashHistory,Link} from 'react-router'
import {appraise,login} from '../../actions/user'
import {bindActionCreators} from 'redux'
import axios from "../../common/axiosConf";

const prompt = Modal.prompt;
const RadioItem = Radio.RadioItem;

const data = [
    {
        title: '高等数学',

        teacher: '张鑫',
    },
    // {
    //     title: '邓小平理论',
    //
    //     teacher: '钱家瑞',
    //
    // },
    // {
    //     title: '大学物理',
    //
    //     teacher: '罗乙妍',
    //
    // },
    // {
    //     title: '高等数学',
    //
    //     teacher: '张三金',
    //
    // }
];


class History extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messageShow:true
        };
    }
    componentWillMount(){
        let that=this
        if(!this.props.user.token){
            prompt(
                '西安建筑科技大学教务处',
                <span className={style.tip}>没有账号？去 <span onClick={()=>hashHistory.push('/auth')}>注册</span></span>,
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
    }



    submitFn() {
        if(!this.props.user.token){
            Toast.offline('请完成登录后进行操作', 3);
            return false
        }
        if (!this.state.teacher||!this.state.appraise) {
            Toast.fail('请完善信息', 3, null, false)
            return false
        }
        this.props.appraise({
            teacher: this.state.teacher[0],
            appraise: this.state.appraise[0],
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

        const teacher =
            [
                [
                    {
                        label: '张鑫',
                        value: '001',
                    },
                    {
                        label: '钱家瑞',
                        value: '002',
                    },
                    {
                        label: '罗乙妍',
                        value: '003',
                    },
                    {
                        label: '张三金',
                        value: '004',
                    },
                ],

            ];
        const appraise = [
            [
                {
                    label: '优秀',
                    value: 'good',
                },
                {
                    label: '良好',
                    value: 'well',
                },
                {
                    label: '合格',
                    value: 'qualified',
                },
                {
                    label: '差',
                    value: 'bad',
                },
            ],

        ];
        return (
            <div className={style.wrap}>
                <Header/>
                <div hidden={this.state.messageShow}>
                    <NoticeBar mode="closable" icon={null}>{this.state.message}</NoticeBar>
                </div>
                <List renderHeader={() => '评教'}>
                    <div className={style.item} >
                        <div className={style.icontent}>
                            <div className={style.number}>
                                <Picker
                                    data={teacher}
                                    title="选择教师"
                                    cascade={false}
                                    extra="请选择" value={this.state.teacher}
                                    onChange={v => this.setState({ teacher: v })}
                                    onOk={v => this.setState({ teacher: v })}
                                >
                                    <List.Item arrow="horizontal">教师</List.Item>
                                </Picker>
                            </div>
                            <div className={style.number}>
                                <Picker
                                    data={appraise}
                                    title="选择评价"
                                    cascade={false}
                                    extra="请选择" value={this.state.appraise}
                                    onChange={v => this.setState({ appraise: v })}
                                    onOk={v => this.setState({ appraise: v })}
                                >
                                    <List.Item arrow="horizontal">评价</List.Item>
                                </Picker>
                            </div>
                        </div>

                    </div>

                </List>
                <div className={style.button}>
                    <Button onClick={this.submitFn.bind(this)} type="primary">
                        提交
                    </Button>
                </div>
                <span className={style.tip}>
                    *操作前请完成
                    <a onClick={() => prompt(
                        '西安建筑科技大学教务处',
                        <span className={style.tip}>没有账号？去 <span onClick={()=>hashHistory.push('/auth')}>注册</span></span>,
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
        appraise:bindActionCreators(appraise, dispatch),
        login:bindActionCreators(login, dispatch)
    }
}

History = connect(mapStateToProps, mapDispatchToProps)(History)

export default History;