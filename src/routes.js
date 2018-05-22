import React from 'react'
import {Route, Router, IndexRoute, hashHistory} from 'react-router'
import Home from './containers/home/'


import ModifyPwd from './containers/modifyPwd/'
import ResultsPage from './containers/resultsPage/'
import Qcode from './containers/qcode/'
import SelectClass from './containers/selectClass/'
import GateCard from './containers/gateCard/'
import Grade from './containers/grade/'
import PushMessage from './containers/pushMessage/'
import CreateSchedule from './containers/createSchedule/'
import CreateSelect from './containers/createSelection/'
import Leave from './containers/leave/'
import LeaveList from './containers/leaveList/'

import SpeedAccount from './containers/speedAccount/'
import CheckGrade from './containers/checkGrade/'
import Schedule from './containers/schedule/'
import TeacherSchedule from './containers/teacherSchedule/'
import Appraise from './containers/appraise/'
import ForgetPwd from './containers/forgetPwd/'
import RegisterBox from './containers/registerBox/'
import LoginBox from './containers/loginBox/'
import Auth from './containers/auth/'
import SingIn from './containers/singIn/'

import BaseUserMsg from './containers/baseUserMsg/'

export default () => {
    return (
        <Router history={hashHistory}>
            {/*<Route path="/" component={Home}/>*/}
            <Route path="/" component={LoginBox}/>
            <Route path="/modifyPwd" component={ModifyPwd}/>
            <Route path="/resultsPage" component={ResultsPage}/>
            <Route path="/qcode" component={Qcode}/>

            <Route path="/speedAccount" component={SpeedAccount}/>

            <Route path="/checkGrade" component={CheckGrade}/>
            <Route path="/schedule" component={Schedule}/>
            <Route path="/teacherSchedule" component={TeacherSchedule}/>
            <Route path="/gateCard" component={GateCard}/>
            <Route path="/appraise" component={Appraise}/>
            <Route path="/selectClass" component={SelectClass}/>
            <Route path="/forgetPwd" component={ForgetPwd}/>

            <Route path="/registerBox" component={RegisterBox}/>

            <Route path="/auth" component={Auth}/>
            <Route path="/singin0" component={SingIn}/>
            <Route path="/singin1" component={SingIn}/>
            <Route path="/singin2" component={SingIn}/>
            <Route path="/singin3" component={SingIn}/>
            <Route path="/singin4" component={SingIn}/>
            <Route path="/baseUserMsg" component={BaseUserMsg}/>
            <Route path="/gateCard" component={GateCard}/>
            <Route path="/grade" component={Grade}/>
            <Route path="/pushMessage" component={PushMessage}/>
            <Route path="/createSchedule" component={CreateSchedule}/>
            <Route path="/createSelect" component={CreateSelect}/>
            <Route path="/leave" component={Leave}/>
            <Route path="/leaveList" component={LeaveList}/>
        </Router>
    )
}