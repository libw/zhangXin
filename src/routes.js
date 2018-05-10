import React from 'react'
import {Route, Router, IndexRoute, hashHistory} from 'react-router'
import Home from './containers/home/'


import ModifyPwd from './containers/modifyPwd/'
import ResultsPage from './containers/resultsPage/'
import SelectClass from './containers/selectClass/'

import SpeedAccount from './containers/speedAccount/'
import CheckGrade from './containers/checkGrade/'
import Schedule from './containers/schedule/'
import GateCard from './containers/schedule/'
import Appraise from './containers/appraise/'
import ForgetPwd from './containers/forgetPwd/'
import RegisterBox from './containers/registerBox/'
import LoginBox from './containers/loginBox/'
import Auth from './containers/auth/'

import BaseUserMsg from './containers/baseUserMsg/'

export default () => {
    return (
        <Router history={hashHistory}>
            {/*<Route path="/" component={Home}/>*/}
            <Route path="/" component={LoginBox}/>
            <Route path="/modifyPwd" component={ModifyPwd}/>
            <Route path="/resultsPage" component={ResultsPage}/>

            <Route path="/speedAccount" component={SpeedAccount}/>

            <Route path="/checkGrade" component={CheckGrade}/>
            <Route path="/schedule" component={Schedule}/>
            <Route path="/gateCard" component={GateCard}/>
            <Route path="/appraise" component={Appraise}/>
            <Route path="/selectClass" component={SelectClass}/>
            <Route path="/forgetPwd" component={ForgetPwd}/>

            <Route path="/registerBox" component={RegisterBox}/>

            <Route path="/auth" component={Auth}/>
            <Route path="/baseUserMsg" component={BaseUserMsg}/>
        </Router>
    )
}