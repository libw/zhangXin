import React from 'react'
import QRCode from 'qrcode.react';
import style from "./index.css"
import {connect} from 'react-redux'
import { Button } from 'antd-mobile';
import { Link} from 'react-router';
import Header from '../../components/header'



class ResultsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            string:0
        }
    }

    cli(){
        this.setState({
            string:this.state.string+1
        },()=>{
            // console.log(111,this.state.string);
            if(this.state.string>4){
                this.setState({
                    string:0
                })
            }
        })
    }

    render() {

        return (
            <div className={style.wrap}>
                <Header/>
                <div className={style.qcode}>
                    <QRCode size={200} value={'http://192.168.1.104:3000/#/singin'+this.state.string} />
                </div>
                <span className={style.rtitle}>
                    学生扫描签到
                </span>
                <div className={style.but}>
                    <div onClick={this.cli.bind(this)}>刷新</div>
                </div>
            </div>
        )

    }
}

function mapStateToProps(state, props) {
    return {
        params:state.resultsPage
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

ResultsPage = connect(mapStateToProps, mapDispatchToProps)(ResultsPage)


export default ResultsPage;