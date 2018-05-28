import axios from '../common/axiosConf'
import {Toast} from "antd-mobile/lib/index";

const api='http://118.24.128.250:8080'

export function login(data, callback) {
    console.log(data);
    if(!data.userId||!data.pwd){
        Toast.fail('登录信息不得为空', 1.5, null, false)
        // return false
    }
    return dispatch => {
        axios.get(`http://118.24.128.250:8080/web-api/api/login?userId=${data.userId}&userPassword=${data.pwd}` )
            .then(function (response) {

                console.log('登陆1',response.data.resultCode);
                console.log('登陆2',response);
                if(response.data.resultCode==1){
                    alert('登陆成功')
                    dispatch({type: 'LOGIN'})
                }
                callback(response)
            })
            .catch(function (error) {
                alert(error);
            });
    }
}

export function register(data, callback) {
    return dispatch => {
        axios.post(`http://118.24.128.250:8080/web-api/api/register?userId=${data.userId}&classNumber=${data.classNumber}&userName=${data.userName}&userPassword=${data.pwd}&userRole=${data.pickerValue}`)
            .then(function (response) {
                alert('注册成功')
                console.log(response.data.resultCode)
                console.log('注册'+response.resultCode)
                console.log('注册1'+response)
                if (response.data.resultCode==1) {
                    alert('注册成功！')
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
        axios.post(`${data.api}/web-api/api/register`, {
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

//guo
export function pushSchedule(data, callback) {
    return dispatch => {
        axios.post(`http://118.24.128.250:8080/web-api/api/editCourse?courseId=${data.courseId}&courseName=${data.courseName}&teacher=${data.teacher}&address=${data.address}&classNumber=${data.classNumber}&courseTime=${data.courseTime}`,
        )
            .then(function (response) {
                alert('添加课程成功')
                console.log(response);
                callback(response)

            })
            .catch(function (error) {
                alert(error);
            });
    }
}

export function pushSelect(data, callback) {
    return dispatch => {
        axios.post(`${data.api}/user/customer/bank-card`, {
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
        axios.post(`${data.api}/user/customer/bank-card`, {
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
        axios.post(`${data.api}/user/customer/bank-card`, {
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
    console.log(data);
    return dispatch => {
        axios.post(`http://118.24.128.250:8080/web-api/api/sign?userId=13043075&userPassword=w123456&courseId=${data.class}&signStatus=2`, )
            .then(function (response) {
                alert('请等待审核')
                console.log('请假1'+response.resultCode)
                console.log('请假2'+response)
            })
            .catch(function (error) {
                alert(error);
            });
    }
}

export function selectClass(data, callback) {
    return dispatch => {
        axios.post(`http://118.24.128.250:8080/web-api/api/chooseCourse?userId=${13043075}&courseIdStr=${data.select}`, )
            .then(function (response) {
                alert('选课成功')
            })
            .catch(function (error) {
                alert(error);
            });
    }
}

export function appraise(data, callback) {
    return dispatch => {
        axios.post(`${data.api}/user/customer/bank-card`, {
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


//guo
export function singin(data, callback) {
    console.log(data);
    return dispatch => {
        axios.post(`http://118.24.128.250:8080/web-api/api/sign?userId=${data.studentId}&userPassword=${data.pwd}&courseId=${data.courseId}&signStatus=1`)
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
        axios.post(`${data.api}/user/customer/bank-card`, {
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
