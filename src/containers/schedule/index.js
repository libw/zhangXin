import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import { RefreshControl, ListView } from 'antd-mobile';
import Header from '../../components/header'
import ReactDOM from 'react-dom'
import {hashHistory} from 'react-router'
import {setAuthFrom} from '../../actions/authFrom'
import {bindActionCreators} from 'redux'
import {Modal, Toast} from "antd-mobile/lib/index";
import {login} from "../../actions/user";
import axios from '../../common/axiosConf'

const prompt = Modal.prompt;
const data = [
    {
        title: '高等数学',//学科
        time: '周一 10：00',//周几
        number: '张三金',//几点
        way:'A楼320'//哪个教室
    },
    {
        title: '邓小平理论',
        time: '周一 14：00',
        number: '钱家瑞',
        way:'B楼150'
    },
    {
        title: '大学物理',
        time: '周一 16：00',
        number: '罗乙妍',
        way:'C楼190'
    },
    {
        title: '高等数学',
        time: '周二 14：00',
        number: '张鑫',
        way:'A楼320'
    }
];




class History extends React.Component {

    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource,
            refreshing: true,
            height: document.documentElement.clientHeight,
        };
        let index = data.length - 1;


        let pageIndex = 0;
    }

    genData(pIndex = 0) {
        const NUM_ROWS = this.state.data.length;
        const dataArr = [];
        for (let i = 0; i < NUM_ROWS; i++) {
            dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
        }
        // console.log(dataArr);
        return dataArr;
    }
    componentWillMount(){
        let that=this
        if(!this.props.user.token){
            prompt(
                '西安建筑科技大学教务处',
                <span className={style.tip1}>没有账号？去 <span onClick={()=>hashHistory.push('/auth')}>注册</span></span>,
                (login, password) => this.props.login({
                    userId: login,
                    pwd: password,
                }, (errorText) => {
                    Toast.hide()

                }),
                'login-password',
                null,
                ['请输入学号', '请输入密码'],
            )
        }
        axios.get(`http://118.24.128.250:8080/web-api/api/courseInfo?userId=${13043075}`,) .then(function (response) {
            console.log(response);
            console.log(response.data.result);
            console.log(data);
            that.setState({
                data:response.data.result
            },()=>{
                console.log(that.state.data);
            })

        })
            .catch(function (error) {
                alert(error);
            });
    }
    componentDidMount() {

        // Set the appropriate height
        setTimeout(() => this.setState({
            height: this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop,
        }), 0);

        // handle https://github.com/ant-design/ant-design-mobile/issues/1588
        this.lv.getInnerViewNode().addEventListener('touchstart', this.ts = (e) => {
            this.tsPageY = e.touches[0].pageY;
        });
        // In chrome61 `document.body.scrollTop` is invalid
        const scrollNode = document.scrollingElement ? document.scrollingElement : document.body;
        this.lv.getInnerViewNode().addEventListener('touchmove', this.tm = (e) => {
            this.tmPageY = e.touches[0].pageY;
            if (this.tmPageY > this.tsPageY && this.scrollerTop <= 0 && scrollNode.scrollTop > 0) {
                // console.log('start pull to refresh');
                this.domScroller.options.preventDefaultOnTouchMove = false;
            } else {
                this.domScroller.options.preventDefaultOnTouchMove = undefined;
            }
        });
    }

    componentWillUnmount() {
        this.lv.getInnerViewNode().removeEventListener('touchstart', this.ts);
        this.lv.getInnerViewNode().removeEventListener('touchmove', this.tm);
    }

    onScroll = (e) => {
        this.scrollerTop = e.scroller.getValues().top;
        this.domScroller = e;
    };

    onRefresh = () => {
        // console.log('onRefresh');
        if (!this.manuallyRefresh) {
            this.setState({ refreshing: true });
        } else {
            this.manuallyRefresh = false;
        }

        // simulate initial Ajax
        setTimeout(() => {
            this.rData = this.genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                refreshing: false,
                showFinishTxt: true,
            });
            if (this.domScroller) {
                this.domScroller.scroller.options.animationDuration = 500;
            }
        }, 600);
    };

    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        // console.log('reach end', event);
        this.setState({ isLoading: true });
        setTimeout(() => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            });
        }, 1000);
    };

    scrollingComplete = () => {
        // In general, this.scrollerTop should be 0 at the end, but it may be -0.000051 in chrome61.
        if (this.scrollerTop >= -1) {
            this.setState({ showFinishTxt: false });
        }
    }

    renderCustomIcon() {
        return [
            <div key="0" className="am-refresh-control-pull">
                <span>{this.state.showFinishTxt ? '刷新完毕' : '下拉可以刷新'}</span>
            </div>,
            <div key="1" className="am-refresh-control-release">
                <span>松开立即刷新</span>
            </div>,
        ];
    }
    timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let W='周'+data.getDay()
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        return W+D+h+m;
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
        const row = (rowData, sectionID, rowID) => {
            let index = this.state.data.length - 1;
            if (index < 0) {
                index = this.state.data.length - 1;
            }
            const obj = this.state.data[index--];
            return (
                <div className={style.item} key={rowID}>
                    <span className={style.time} >
                        <span>{obj.courseName}</span>
                    </span>
                    <span className={style.timeR} >
                        {

                                '周'+new Date().getDay(obj.courseTime)+' '+new Date().getHours(obj.courseTime) + ':'+new Date().getMinutes(obj.courseTime)


                        }
                    </span>
                    <div className={style.icontent}>
                        <div className={style.number}>
                            教师&nbsp;&nbsp;
                            <span>{obj.teacher}</span>
                        </div>
                        <div className={style.way}>
                            教室&nbsp;&nbsp;
                            <span>{obj.address}</span>
                        </div>
                    </div>
                </div>
            );
        };
        return (
            <div className={style.wrap}>
                <Header/>
                <span className={style.tip} hidden={this.props.user.token}>
                    请<a onClick={() => prompt(
                    '西安建筑科技大学教务处',
                    <span className={style.tip1}>没有账号？去 <span onClick={()=>hashHistory.push('/auth')}>注册</span></span>,
                    (login, password) => this.props.login({
                        userId: login,
                        pwd: password,
                    }, (errorText) => {
                        Toast.hide()

                    }),
                    'login-password',
                    null,
                    ['请输入学号', '请输入密码'],
                )} > 登录 </a>后查看
                </span>
                <div hidden={!this.props.user.token}>
                    <ListView
                        ref={el => this.lv = el}
                        dataSource={this.state.dataSource}
                        renderFooter={() => (<div style={{ padding: '0.3rem', textAlign: 'center' }}>
                            {this.state.isLoading ? 'Loading...' : 'Loaded'}
                        </div>)}
                        renderRow={row}
                        renderSeparator={separator}
                        initialListSize={5}
                        pageSize={5}
                        style={{
                            height: this.state.height,
                            border: '1px solid #ddd',
                            margin: '0.05rem 0',
                        }}
                        scrollerOptions={{ scrollbars: true, scrollingComplete: this.scrollingComplete }}
                        refreshControl={<RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                            icon={this.renderCustomIcon()}
                        />}
                        onScroll={this.onScroll}
                        scrollRenderAheadDistance={200}
                        scrollEventThrottle={20}
                        onEndReached={this.onEndReached}
                        onEndReachedThreshold={10}
                    />
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
        setAuthFrom:bindActionCreators(setAuthFrom, dispatch),
        login:bindActionCreators(login, dispatch),
    }
}

History = connect(mapStateToProps, mapDispatchToProps)(History)


export default History;