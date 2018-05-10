import React from 'react'
import style from "./index.css"
import { createForm } from 'rc-form';
import {connect} from 'react-redux'
import { List,InputItem,Button,WingBlank,Picker,RadioGroup} from 'antd-mobile';
import Header from '../../components/header'

class ForgetPwd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            areaCode: [86],
        }
    }



    render() {
        const { getFieldProps } = this.props.form;
        const quhao=[
            {
                value:86,
                label:"中国大陆  +86"
            },{
                value:87,
                label:"中国台湾  +87"
            },{
                value:88,
                label:"中国香港  +88"
            },

        ]
        const district=[
            {
                value:86,
                label:"学生"
            },{
                value:87,
                label:"老师"
            },{
                value:88,
                label:"管理员"
            },

        ]

        return (
            <div className={style.wrap}>

                <Header/>


            </div>
        )

    }


}

function mapStateToProps(state, props) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

ForgetPwd = connect(mapStateToProps, mapDispatchToProps)(ForgetPwd)
const ForgetPwdWrapper = createForm()(ForgetPwd);
export default ForgetPwdWrapper;