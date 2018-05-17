import React from 'react';
import style from "./index.css"
import {Drawer} from 'antd-mobile';
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'

class Header extends React.Component {
    constructor(props) {
        console.log(hashHistory)
        super(props);
        this.state = {
            open: false,
            position: 'relative',
            otherStyle: true

        }
        this.choceType = this.choceType.bind(this)


    }


    componentWillMount() {
        this.choceType()
    }

    componentWillReceiveProps() {
        // if (window.location.hash.substr(1).indexOf('/') !== -1) {
        //     this.setState({position: 'relative'})
        //     this.setState({otherStyle: true})
        //     window.onscroll = null
        //     return true
        // } else {
        //     if (!window.onscroll) {
        //         this.choceType()
        //         return true
        //     }
        // }
        // return true
    }

    choceType() {
        if (window.location.hash.substr(1).indexOf('/?') !== -1) {
            this.setState({position: 'absolute'})
            this.setState({otherStyle: false})
            let dance = document.body.clientWidth * 0.46
            let danceCopy = dance
            window.onscroll = null
            window.onscroll = (e) => {
                //console.log(document.body.scrollTop)
                var oTop = document.body.scrollTop == 0 ? document.documentElement.scrollTop : document.body.scrollTop;

                if (oTop < danceCopy) {
                    this.setState({position: 'absolute'})
                    this.setState({otherStyle: false})
                    return false
                }

                if (oTop - dance < 0) {
                    this.setState({position: 'fixed'})
                    this.setState({otherStyle: true})
                } else {
                    this.setState({position: 'absolute'})
                    this.setState({otherStyle: false})
                }
                dance = oTop
            }
        }
    }

    componentWillUnmount() {

    }

    onOpenChange = (...args) => {
        console.log(args);
        this.setState({open: !this.state.open});
    }

    render() {
        const Array = [{
            label: this.props.user.userName ? this.props.user.userName : '登录与注册',
            link:  this.props.user.userName ? '/baseUserMsg' : '/auth'
        },{label: '查看成绩', link: '/checkGrade'}, {label: '查看课表', link: '/schedule'},  {label: '选课', link: '/selectClass'}, {label: '评教', link: '/appraise'}, {label: '签到', link: '/history'}]


        const Array1 = [{
            label: this.props.user.userName ? this.props.user.userName : '登录与注册',
            link:  this.props.user.userName ? '/baseUserMsg' : '/auth'
        },{label: '打分', link: '/history'},{label: '学生出勤', link: '/gateCard'},{label: '课表', link: '/teacherSchedule'},{label: '生成二维码', link: '/qcode'},]

        const Array2 = [{
            label: this.props.user.userName ? this.props.user.userName : '登录与注册',
            link:  this.props.user.userName ? '/baseUserMsg' : '/auth'
        },{label: '推送消息', link: '/history'},{label: '生成课表', link: '/history'},{label: '生成选课信息', link: '/history'},{label: '录入成绩', link: '/history'}]


        const sidebar = (<ul style={{paddingTop: 20}}>
            {Array.map((i, index) => {
                return (<li className={style.navlist} key={index}>
                    <Link to={i.link}>
                        {i.label}
                    </Link>
                </li>);
            })}
        </ul>);
        const sidebar1 = (<ul style={{paddingTop: 20}}>
            {Array1.map((i, index) => {
                return (<li className={style.navlist} key={index}>
                    <Link to={i.link}>
                        {i.label}
                    </Link>
                </li>);
            })}
        </ul>);
        const sidebar2 = (<ul style={{paddingTop: 20}}>
            {Array2.map((i, index) => {
                return (<li className={style.navlist} key={index}>
                    <Link to={i.link}>
                        {i.label}
                    </Link>
                </li>);
            })}
        </ul>);


        return (
            <div className={style.wlop}>
                <div
                    className={ style.wrap + ' ' + style[this.state.position] + ' ' + style.otherStyle}>
                    <div className={style.logo}>
                        {
                            <Link to="/"><img src={require("./logoO.png")}/></Link>
                        }
                    </div>
                    <div onClick={this.onOpenChange} className={style.sider}>
                    </div>
                </div>
                <Drawer
                    className="my-drawer"
                    style={{
                        minHeight: document.documentElement.clientHeight - 200,
                        transition: 'z-index 0.3s',
                        position: 'fixed',
                        zIndex: this.state.open ? 100 : -1
                    }}
                    sidebar={sidebar1}
                    open={this.state.open}
                    position="right"
                    // contentStyle={{zIndex:this.state.open?98:-1}}
                    // overlayStyle={{zIndex:this.state.open?99:-1}}
                    onOpenChange={this.onOpenChange}
                    sidebarStyle={{background: '#656b6f'}}
                >
                </Drawer>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

Header = connect(mapStateToProps, mapDispatchToProps)(Header)
export default Header;