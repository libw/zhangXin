import axios from '../common/axiosConf'
import {Toast} from "antd-mobile/lib/index";

export function login(data, callback) {
    console.log(data);
    if(!data.userId||!data.pwd){
        Toast.fail('登录信息不得为空', 1.5, null, false)
        // return false
    }
    return dispatch => {
        axios.get(`http://39.105.97.216:80/web-api/api/login?userId=${data.userId}&userPassword=${data.pwd}` )
            .then(function (response) {
                dispatch({type: 'LOGIN'})
                if (response.data.code === 0) {

                    callback()
                    // localStorage.userName = response.data.data.phone
                    // localStorage.token = response.data.data.token
                    // localStorage.id = response.data.data.id
                } else {
                    callback(response.data.msg)
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }
}

export function register(data, callback) {
    return dispatch => {
        axios.post(`http://39.105.97.216:80/web-api/api/register?userId=${data.userId}&classNumber=${data.classNumber}&userName=${data.userName}qianlll&userPassword=${data.pwd}&userRole=${data.pickerValue}`)
            .then(function (response) {
                console.log(response);
                if (response.resultCode == 1) {
                    alert(2)
                    dispatch({type: 'REGISTER'})
                    callback()
                    // localStorage.userName = response.data.data.phone
                    // localStorage.token = response.data.data.token
                    // localStorage.id = response.data.data.id
                } else {
                    callback(response)
                }
            })
            .catch(function (error) {
                // alert(error);
            });
    }
}

export function pushMessage(data, callback) {
    return dispatch => {
        axios.post('http://47.91.236.245:4030/user/customer/trade-info', {
            message: data.message,
        })
            .then(function (response) {
                if (response.data.code === 0) {


                    // localStorage.userName = response.data.data.phone
                    // localStorage.token = response.data.data.token
                    // localStorage.id = response.data.data.id
                } else {
                    callback(response.data.msg)
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }
}

export function pushSchedule(data, callback) {
    return dispatch => {
        axios.post('http://47.91.236.245:4030/user/customer/bank-card', {
            class: data.class,
            teacher: data.teacher,
            classroom: data.classroom,
            date: data.date,
        })
            .then(function (response) {
                if (response.data.code === 0) {

                } else {
                    callback(response.data.msg)
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }
}

export function pushSelect(data, callback) {
    return dispatch => {
        axios.post('http://47.91.236.245:4030/user/customer/bank-card', {
            message: data.message,
        })
            .then(function (response) {
                if (response.data.code === 0) {

                } else {
                    callback(response.data.msg)
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }
}

export function gradeTeacher(data, callback) {
    return dispatch => {
        axios.post('http://47.91.236.245:4030/user/customer/bank-card', {
            student: data.student,
            pacGrade: data.pacGrade,
            endGrade: data.endGrade,
            grade: data.grade,
            subject: data.subject,
        })
            .then(function (response) {
                if (response.data.code === 0) {

                } else {
                    callback(response.data.msg)
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }
}

export function getStudent(data, callback) {
    return dispatch => {
        axios.post('http://47.91.236.245:4030/user/customer/bank-card', {
            message: data.message,
        })
            .then(function (response) {
                if (response.data.code === 0) {

                } else {
                    callback(response.data.msg)
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }
}

export function leave(data, callback) {
    return dispatch => {
        axios.post('http://47.91.236.245:4030/user/customer/bank-card', {
            class: data.class,
            leave: data.leave,
            studentId: data.studentId,
        })
            .then(function (response) {
                if (response.data.code === 0) {

                } else {
                    callback(response.data.msg)
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }
}

export function selectClass(data, callback) {
    return dispatch => {
        axios.post('http://47.91.236.245:4030/user/customer/bank-card', {
            select: data.select,
            studentId: data.studentId,
        })
            .then(function (response) {
                if (response.data.code === 0) {

                } else {
                    callback(response.data.msg)
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }
}

export function appraise(data, callback) {
    return dispatch => {
        axios.post('http://47.91.236.245:4030/user/customer/bank-card', {
            teacher: data.teacher,
            appraise: data.appraise,
        })
            .then(function (response) {
                if (response.data.code === 0) {

                } else {
                    callback(response.data.msg)
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }
}

export function singin(data, callback) {
    return dispatch => {
        axios.post('http://47.91.236.245:4030/user/customer/bank-card', {
            teacher: data.teacher,
            appraise: data.appraise,
        })
            .then(function (response) {
                if (response.data.code === 0) {

                } else {
                    callback(response.data.msg)
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }
}

export function checkLeave(data, callback) {
    return dispatch => {
        axios.post('http://47.91.236.245:4030/user/customer/bank-card', {
            teacher: data.teacher,
            appraise: data.appraise,
        })
            .then(function (response) {
                if (response.data.code === 0) {

                } else {
                    callback(response.data.msg)
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }
}
