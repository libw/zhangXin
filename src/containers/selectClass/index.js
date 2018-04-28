import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import { RefreshControl, ListView,Accordion, List,Checkbox } from 'antd-mobile';
import Header from '../../components/header'
import ReactDOM from 'react-dom'
import {hashHistory} from 'react-router'
import {setAuthFrom} from '../../actions/authFrom'
import {bindActionCreators} from 'redux'

const CheckboxItem = Checkbox.CheckboxItem;

const data = [
    {
        title: '高等数学',
        time: '98',
        number: '100',
        state:'入金失败',
        way:'30'
    },
    {
        title: '大学物理',
        time: '80',
        number: '86',
        state:'出金失败',
        way:'25'
    },
    {
        title: '马克思思想',
        time: '90',
        number: '87',
        state:'正在进行',
        way:'30'
    },
    {
        title: '邓小平理论',
        time: '84',
        number: '80',
        state:'正在进行',
        way:'30'
    }


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
                <List renderHeader={() => 'CheckboxItem demo'}>
                    {data.map(i => (
                        <CheckboxItem key={i.value} onChange={() => this.onChange(i.value)}>
                            <Accordion accordion openAnimation={{}} className="my-accordion" onChange={this.onChange1}>
                                <Accordion.Panel header="高等数学">
                                    <div className={style.item} >
                            <span className={style.title} >
                                学科：<b>高等数学</b>
                            </span>
                                        <div className={style.icontent}>
                                            <div className={style.time}>
                                                老师
                                                <span>张鑫</span>
                                            </div>
                                            <div className={style.state}>
                                                时间
                                                <span>周三 17:00</span>
                                            </div>
                                            <div className={style.number}>
                                                学分
                                                <span>4</span>
                                            </div>
                                            <div className={style.way}>
                                                课程性质
                                                <span>选修</span>
                                            </div>

                                        </div>
                                    </div>
                                </Accordion.Panel>

                            </Accordion>
                        </CheckboxItem>
                    ))}

                </List>
                <Accordion accordion openAnimation={{}} className="my-accordion" onChange={this.onChange}>
                    <Accordion.Panel header="高等数学">
                        <div className={style.item} >
                            <span className={style.title} >
                                学科：<b>高等数学</b>
                            </span>
                            <div className={style.icontent}>
                                <div className={style.time}>
                                    老师
                                    <span>张鑫</span>
                                </div>
                                <div className={style.state}>
                                    时间
                                    <span>周三 17:00</span>
                                </div>
                                <div className={style.number}>
                                    学分
                                    <span>4</span>
                                </div>
                                <div className={style.way}>
                                    课程性质
                                    <span>选修</span>
                                </div>

                            </div>
                        </div>
                    </Accordion.Panel>

                </Accordion>
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