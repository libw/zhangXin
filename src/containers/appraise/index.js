import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import { createForm } from 'rc-form';
import { RefreshControl, ListView,Picker,List,Radio,Button} from 'antd-mobile';
import Header from '../../components/header'
import ReactDOM from 'react-dom'
import {hashHistory} from 'react-router'
import {setAuthFrom} from '../../actions/authFrom'
import {bindActionCreators} from 'redux'

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

        };
    }
    componentWillMount(){
        // if(!this.props.user.token){
            // this.props.setAuthFrom('/history',()=>{
            //     hashHistory.push('/auth')
            // })
        // }
    }

    submitFn() {
        console.log(this.state.sValue);
        console.log(this.state.date);
        // if (!this.state.message) {
        //     Toast.fail('请输入推送的消息', 3, null, false)
        //     return false
        // }
        // this.props.login({
        //     class: this.state.class,
        //     name: this.state.name,
        //     sValue: this.state.sValue,
        //     date: this.state.date,
        // }, (errorText) => {
        //     Toast.hide()
        //     if (errorText) {
        //         Toast.fail(errorText, 3, null, false)
        //     } else {
        //         if (this.props.authFrom.path) {
        //             hashHistory.push(this.props.authFrom.path)
        //         } else {
        //             hashHistory.push('/')
        //         }
        //     }
        // })

    }

    render() {
        const { getFieldProps } = this.props.form;

        const teacher = [
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
                <List renderHeader={() => '评教'}>
                    <div className={style.item} >
                        <div className={style.icontent}>
                            <div className={style.number}>
                                <Picker
                                    data={teacher}
                                    title="选择教师"
                                    cascade={false}
                                    extra="请选择" value={this.state.sValue}
                                    onChange={v => this.setState({ sValue: v })}
                                    onOk={v => this.setState({ sValue: v })}
                                >
                                    <List.Item arrow="horizontal">教师</List.Item>
                                </Picker>
                            </div>
                            <div className={style.number}>
                                <Picker
                                    data={appraise}
                                    title="选择评价"
                                    cascade={false}
                                    extra="请选择" value={this.state.sValue}
                                    onChange={v => this.setState({ sValue: v })}
                                    onOk={v => this.setState({ sValue: v })}
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

const HistoryWrapper = createForm()(History);

export default HistoryWrapper;