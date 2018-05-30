import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import { RefreshControl, ListView } from 'antd-mobile';
import Header from '../../components/header'
import ReactDOM from 'react-dom'
import {hashHistory} from 'react-router'
import {login} from '../../actions/user'
import {bindActionCreators} from 'redux'
import echarts from 'echarts/lib/echarts';

import  'echarts/lib/chart/pie';

import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import {Modal, Toast} from "antd-mobile/lib/index";
import axios from '../../common/axiosConf'

const data = [
    {
        title: '计算机303',//学科
        time: '周一',//周几
        number: '贾谊',//几点
        way:'到勤'//哪个教室
    },
    {
        title: '土木206',
        time: '周一',
        number: '伊尔',
        way:'迟到'
    },
    {
        title: '机械302',
        time: '周一',
        number: '冰三',
        way:'请假'
    },
    {
        title: '土木206',
        time: '周二',
        number: '丁司',
        way:'到勤'
    }

];
let index = data.length - 1;
const prompt = Modal.prompt;
const NUM_ROWS = data.length;
let pageIndex = 0;

function genData(pIndex = 0) {
    const dataArr = [];
    for (let i = 0; i < NUM_ROWS; i++) {
        dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
    }
    // console.log(dataArr);
    return dataArr;
}

class History extends React.Component {

    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource,
            refreshing: true,
            height: document.documentElement.clientHeight,
            data1:1,
            data2:1,
            data3:3,

        };
    }

    componentDidMount() {
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
        axios.get(`http://118.24.128.250:8080/web-api/api/signInfo?courseId=${101}`,) .then(function (response) {
            console.log(response);
            that.setState({
                data1:response.data.result.leaveNum,
                data2:response.data.result.signNum,
                data3:response.data.result.totalNum,
                data4:response.data.result.leaveNum+response.data.result.signNum,
                data5:response.data.result.totalNum-response.data.result.leaveNum-response.data.result.signNum

                // 处理数据
            },()=>{
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('main'));
                // 绘制图表
                myChart.setOption({
                    title : {
                        text: '学生出勤' ,
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['正常出勤','请假','缺勤']
                    },
                    series : [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:[
                                {value:that.state.data2, name:'正常出勤'},
                                {value:that.state.data1, name:'请假'},
                                {value:that.state.data5, name:'缺勤'},
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            })

        })
            .catch(function (error) {
                alert(error);
            });

    }



    render() {

        console.log(this.state.data1,this.state.data2,this.state.data3,this.state.data4,this.state.data5);

        return (
            <div className={style.wrap}>
                <Header/>
                <div id="main" style={{ marginTop:50,width: 370, height: 400 }} hidden={!this.props.user.token}></div>
                <div>
                    <span className={style.tip}  hidden={this.props.user.token}>
                    请
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
                    )} > 登录 </a>
                    后查看
                    </span>
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