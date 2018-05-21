import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import { createForm } from 'rc-form';
import { RefreshControl, ListView,Picker,List,Radio,InputItem} from 'antd-mobile';
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

    render() {
        const { getFieldProps } = this.props.form;
        return (
            <div className={style.wrap}>
                <Header/>
                <List renderHeader={() => '老师打分'}>
                    <div className={style.item} >
                        <div className={style.icontent}>
                            <div className={style.number}>
                                学生 &nbsp;<span>贾谊</span>
                            </div>
                            <div className={style.way}>
                                期末成绩 <span style={{color:'#989898'}}>70</span>
                            </div>
                        </div>
                        <InputItem
                            {...getFieldProps('autofocus')}
                            clear
                            type={'number'}
                            placeholder="请输入平时成绩"
                            ref={el => this.autoFocusInst = el}
                        ></InputItem>
                    </div>
                </List>
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