import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import { Button,RefreshControl, ListView,Accordion, List,Checkbox,NoticeBar } from 'antd-mobile';
import Header from '../../components/header'
import ReactDOM from 'react-dom'
import {hashHistory} from 'react-router'
import {selectClass} from '../../actions/user'
import {bindActionCreators} from 'redux'
import {Toast} from "antd-mobile/lib/index";

const CheckboxItem = Checkbox.CheckboxItem;


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
        subject: '体育',
        teacher: '罗乙妍',
        time: '周三 14：00',
        credit:'1',
        classroom:'教学A栋101'
    },{
        subject: '大学物理',
        teacher: '钱家瑞',
        time: '周二 10：00',
        credit:'2',
        classroom:'教学B栋303'
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

    }

    componentWillUnmount() {

    }

    dedupe(array){
        return Array.from(new Set(array));
    }

    submitFn() {
        console.log(this.dedupe(arr));
        if (this.dedupe(arr).length==0) {
            Toast.fail('请选择', 3, null, false)
            return false
        }
        this.props.selectClass({
            select: this.dedupe(arr),
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

    onChange (i) {
        console.log(i);
        arr.push(i)
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
                        <CheckboxItem key={i.value} onChange={() => this.onChange(i.subject)}>
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
                                    教室
                                    <span>{i.classroom}</span>
                                </div>
                            </div>
                        </CheckboxItem>
                    ))}

                </List>
                <div className={style.but}>
                    <Button onClick={this.submitFn.bind(this)}  type="primary">提交</Button>
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
        selectClass:bindActionCreators(selectClass, dispatch)
    }
}

History = connect(mapStateToProps, mapDispatchToProps)(History)


export default History;