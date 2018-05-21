import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import { createForm } from 'rc-form';
import { RefreshControl, ListView,Picker,List,Radio,InputItem,Button} from 'antd-mobile';
import Header from '../../components/header'
import ReactDOM from 'react-dom'
import {hashHistory} from 'react-router'
import {setAuthFrom} from '../../actions/authFrom'
import {bindActionCreators} from 'redux'

const RadioItem = Radio.RadioItem;
const Item = List.Item;

const data = [
    {
        title: '64',

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

    handleClick = () => {
        this.customFocusInst.focus();
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
        const seasons = [
            [
                {
                    label: '贾谊',
                    value: '001',
                },
                {
                    label: '伊尔',
                    value: '002',
                },
                {
                    label: '冰三',
                    value: '003',
                },
                {
                    label: '丁司',
                    value: '004',
                },
            ],

        ];
        return (
            <div className={style.wrap}>
                <Header/>
                <List renderHeader={() => '老师打分'}>
                    <div className={style.item} >
                        <div className={style.icontent}>
                            <Picker
                                data={seasons}
                                title="选择学生"
                                cascade={false}
                                extra="请选择" value={this.state.sValue}
                                onChange={v => this.setState({ sValue: v })}
                                onOk={v => this.setState({ sValue: v })}
                            >
                                <List.Item arrow="horizontal">学生</List.Item>
                            </Picker>

                        </div>
                        <InputItem
                            onChange={(value) => {this.setState({pacGrade: value})}}
                            type={'number'}
                            placeholder="请输入平时成绩"
                        >

                        </InputItem>
                        <InputItem
                            onChange={(value) => {this.setState({endGrade: value})}}
                            type={'number'}
                            placeholder="请输入期末成绩"
                        >

                        </InputItem>
                    </div>

                </List>
                <div className={style.button}>
                    <Button onClick={this.submitFn.bind(this)} type="primary">
                        确认
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