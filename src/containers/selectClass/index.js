import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import { Button,RefreshControl, ListView,Accordion, List,Checkbox,NoticeBar } from 'antd-mobile';
import Header from '../../components/header'
import ReactDOM from 'react-dom'
import {hashHistory} from 'react-router'
import {setAuthFrom} from '../../actions/authFrom'
import {bindActionCreators} from 'redux'

const CheckboxItem = Checkbox.CheckboxItem;

const data = [
    {
        subject: '高等数学',
        teacher: '张鑫',
        time: '周三 17：00',
        credit:'1',
        quality:'选修'
    },{
        subject: '大学物理',
        teacher: '钱家瑞',
        time: '周二 10：00',
        credit:'2',
        quality:'必修'
    },{
        subject: '体育',
        teacher: '罗乙妍',
        time: '周三 14：00',
        credit:'1',
        quality:'必修'
    },{
        subject: '大学物理',
        teacher: '钱家瑞',
        time: '周二 10：00',
        credit:'2',
        quality:'必修'
    },



];


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

    }

    componentWillUnmount() {

    }

    onChange = (val) => {
        console.log(val);
    }

    onChange1 = (key) => {
        console.log(key);
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
                <NoticeBar mode="closable" icon={null}>学校倒闭了，大家散了吧</NoticeBar>
                <List renderHeader={() => '选修课程列表'}>
                    {data.map(i => (
                        <CheckboxItem key={i.value} onChange={() => this.onChange(i.value)}>
                            <span className={style.title} >
                                学科：<b>{i.subject}</b>
                            </span>
                            <div className={style.icontent}>
                                <div className={style.time}>
                                    老师
                                    <span>{i.teacher}</span>
                                </div>
                                <div className={style.state}>
                                    时间
                                    <span>{i.time}</span>
                                </div>
                                <div className={style.number}>
                                    学分
                                    <span>{i.credit}</span>
                                </div>
                                <div className={style.way}>
                                    课程性质
                                    <span>{i.quality}</span>
                                </div>
                            </div>
                        </CheckboxItem>
                    ))}

                </List>
                <div className={style.but}>
                    <Button type="primary">提交</Button>
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
        setAuthFrom:bindActionCreators(setAuthFrom, dispatch)
    }
}

History = connect(mapStateToProps, mapDispatchToProps)(History)


export default History;