import React from 'react'
import style from './index.css'
import {Button} from 'antd';
import Header from '../../components/header'
import Footer from '../../components/footer'
import SideBar from '../../components/header/components/sideBar'
import ToolBar from '../../components/toolBar'
import {hashHistory} from 'react-router'
import PageTable from './components/pageTable'
import Qcode from '../../components/Qcode'

class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            showQcode: false,
            QcodePath: ''
        }
    }

    speedAccound() {
        hashHistory.push('/auth')
    }

    render() {
        return (
            <div className={style.wrap}>
                <Header/>
                <div className={style.toolbar}>
                    <ToolBar/>
                </div>
                <div className={style.header}>
                    <div className={style.button}>
                        <Button type="primary" style={{
                            width: '200',
                            height: '60',
                            fontSize: '24px'
                        }}>极速开户</Button>
                    </div>
                    <div style={{width: 420, top: 67, position: 'absolute', right: 0}}><PageTable/></div>
                </div>
                <div className="section">
                    <div className={style.superiority}>

                        <div className={style.supcontent}>
                            <div className={style.superiority}>

                                <div className={style.supcontent}>
                                    <a href="javascript:void (0);" className={style.superiorityport}>
                                        <div className={style.suppicon}>
                                            <img src={require('./images/zizhi@3x.png')} alt=""/>
                                        </div>
                                        <div className={style.suppfont}>
                                            <div className={style.suppftitle}>
                                                资质合规
                                            </div>
                                            <div className={style.suppfcontent}>
                                                <span>香港上市公司<br/>受新西兰金融市场监管</span>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="javascript:void (0);" className={style.superiorityport}>
                                        <div className={style.suppicon}>
                                            <img src={require('./images/shili@3x.png')} alt=""/>
                                        </div>
                                        <div className={style.suppfont}>
                                            <div className={style.suppftitle}>
                                                实力雄厚
                                            </div>
                                            <div className={style.suppfcontent}>
                                                <span>新西兰FSP监管<br/>顶级金融机构从业30年的管理团队</span>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="javascript:void (0);" className={style.superiorityport}>
                                        <div className={style.suppicon}>
                                            <img src={require('./images/yongjin@3x.png')} alt=""/>
                                        </div>
                                        <div className={style.suppfont}>
                                            <div className={style.suppftitle}>
                                                佣金实惠
                                            </div>
                                            <div className={style.suppfcontent}>
                                                <span>24小时双向交易<br/>超实惠的点差与保证金</span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.mt4}>
                        <div className={style.mt4title}>
                            MT4交易终端下载
                        </div>
                        <div className={style.mt4download}>
                            <a href="javascript:void (0);" className={style.mt4bg}>
                            </a>
                            <div className={style.downloadlist}>
                                <Button ghost icon="windows"
                                        style={{width: '220', height: '60', fontSize: '20', marginBottom: '30'}}
                                        onClick={() => {
                                            window.location.href = 'http://ucml.oss-cn-shanghai.aliyuncs.com/downloads/market4setup.exe'
                                        }}
                                >
                                    &nbsp;
                                    windows下载
                                </Button>
                                <Button
                                    ghost
                                    icon="apple"
                                    style={{
                                        width: '220',
                                        height: '60',
                                        fontSize: '20',
                                        marginBottom: '30'
                                    }}
                                    onClick={() => {
                                        this.setState({showQcode: true})
                                        this.setState({QcodePath: 'ios'})
                                    }}
                                >
                                    &nbsp;&nbsp;&nbsp;&nbsp;iOS下载&nbsp;&nbsp;&nbsp;&nbsp;
                                </Button>
                                <Button
                                    ghost
                                    icon="android"
                                    style={{width: '220', height: '60', fontSize: '20'}}
                                    onClick={() => {
                                        this.setState({showQcode: true})
                                        this.setState({QcodePath: 'android'})
                                    }}
                                >
                                    &nbsp;
                                    Android下载
                                </Button>

                            </div>
                        </div>
                    </div>
                    <div className={style.partner}>
                        <div className={style.partnercon}>
                            <div className={style.pctitle}>
                                合作伙伴 /
                            </div>
                            <div className={style.pccontent}>
                                <div className={style.buddy}>
                                    <img src={require('./images/WEB-02.png')} alt=""/>

                                </div>
                                <div className={style.buddy}>
                                    <img src={require('./images/WEB-03.png')} alt=""/>

                                </div>
                                <div className={style.buddy}>
                                    <img src={require('./images/WEB-04.png')} alt=""/>

                                </div>
                                <div className={style.buddy}>
                                    <img src={require('./images/WEB-05.png')} alt=""/>

                                </div>
                                <div className={style.buddy}>
                                    <img src={require('./images/WEB-06.png')} alt=""/>

                                </div>
                                <div className={style.buddy}>
                                    <img src={require('./images/WEB-07.png')} alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.showQcode ? <Qcode path={this.state.QcodePath} onClose={()=>{this.setState({showQcode:false})}} /> : ''}
                </div>
                <Footer/>
            </div>
        )
    }
}


export default Home