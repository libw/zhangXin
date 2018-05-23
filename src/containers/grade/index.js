import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import { createForm } from 'rc-form';
import { Toast, ListView,Picker,List,Radio,InputItem,Button} from 'antd-mobile';
import Header from '../../components/header'
import ReactDOM from 'react-dom'
import {hashHistory} from 'react-router'
import {gradeTeacher} from '../../actions/user'
import {bindActionCreators} from 'redux'

const RadioItem = Radio.RadioItem;
const Item = List.Item;

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
        if (!this.state.student||!this.state.pacGrade||!this.state.endGrade) {
            Toast.fail('请输入推送的消息', 3, null, false)
            return false
        }
        this.props.gradeTeacher({
            student: this.state.student[0],
            pacGrade: this.state.pacGrade,
            endGrade: this.state.endGrade,
            grade:0.3*this.state.pacGrade+0.7*this.state.endGrade,
            subject:this.state.subject
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
                                extra="请选择" value={this.state.student}
                                onChange={v => this.setState({ student: v })}
                                onOk={v => this.setState({ student: v })}
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
        gradeTeacher:bindActionCreators(gradeTeacher, dispatch)
    }
}

History = connect(mapStateToProps, mapDispatchToProps)(History)

export default History;