import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import { RefreshControl, ListView,List,NoticeBar } from 'antd-mobile';
import Header from '../../components/header'
import ReactDOM from 'react-dom'
import {hashHistory} from 'react-router'
import {setAuthFrom} from '../../actions/authFrom'
import {bindActionCreators} from 'redux'
import {Modal, Toast} from "antd-mobile/lib/index";
import {login,pushSelect} from "../../actions/user";
import axios from "../../common/axiosConf";

const prompt = Modal.prompt;

const data = [
    {
        title: '计算机303',//学科
        time: '周一',//周几
        number: '10：00',//几点
        way:'A楼320'//哪个教室
    },
    {
        title: '土木206',
        time: '周一',
        number: '14：00',
        way:'B楼150'
    },
    {
        title: '机械302',
        time: '周一',
        number: '16：00',
        way:'C楼190'
    },
    {
        title: '土木206',
        time: '周二',
        number: '14：00',
        way:'A楼320'
    }


];






class History extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messageShow:true,
            data:[]
        };

    }



    time(i){
        console.log(new Date(i).getDay());
        return '周'+new Date(i).getDay()+' '+new Date(i).getHours() + ':'+new Date(i).getMinutes()
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
                // alert(error);
                console.log(error);
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
                            <div style={{padding:'0 16px',marginBottom:10,paddingBottom:10}} key={i.value} >

                                <div className={style.icontent}>
                                    <div className={style.time}>
                                        <span>{i.classNumber}</span>
                                    </div>
                                    <div className={style.timeR}>
                                        时间
                                        <span> {
                                            this.time(i.courseTime)
                                        }</span>
                                    </div>
                                    <div className={style.number}>
                                        教师&nbsp;
                                        <span> {i.teacher}</span>
                                    </div>
                                    <div className={style.way}>
                                        教室&nbsp;
                                        <span> {i.address}</span>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </List>
                    {/*<ListView*/}
                        {/*ref={el => this.lv = el}*/}
                        {/*dataSource={this.state.dataSource}*/}
                        {/*renderFooter={() => (<div style={{ padding: '0.3rem', textAlign: 'center' }}>*/}
                            {/*{this.state.isLoading ? 'Loading...' : 'Loaded'}*/}
                        {/*</div>)}*/}
                        {/*renderRow={row}*/}
                        {/*renderSeparator={separator}*/}
                        {/*initialListSize={5}*/}
                        {/*pageSize={5}*/}
                        {/*style={{*/}
                            {/*height: this.state.height,*/}
                            {/*border: '1px solid #ddd',*/}
                            {/*margin: '0.05rem 0',*/}
                        {/*}}*/}
                        {/*scrollerOptions={{ scrollbars: true, scrollingComplete: this.scrollingComplete }}*/}
                        {/*refreshControl={<RefreshControl*/}
                            {/*refreshing={this.state.refreshing}*/}
                            {/*onRefresh={this.onRefresh}*/}
                            {/*icon={this.renderCustomIcon()}*/}
                        {/*/>}*/}
                        {/*onScroll={this.onScroll}*/}
                        {/*scrollRenderAheadDistance={200}*/}
                        {/*scrollEventThrottle={20}*/}
                        {/*onEndReached={this.onEndReached}*/}
                        {/*onEndReachedThreshold={10}*/}
                    {/*/>*/}
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