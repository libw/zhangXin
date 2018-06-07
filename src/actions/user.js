import axios from '../common/axiosConf'
import {Toast} from "antd-mobile/lib/index";

const api='http://118.24.128.250:8080'

export function login(data, callback) {
    if(!data.userId||!data.pwd){
        Toast.fail('登录信息不得为空', 1.5, null, false)
        // return false
    }
    return dispatch => {
        axios.get(`http://118.24.128.250:8080/web-api/api/login?userId=${data.userId}&userPassword=${data.pwd}` )
            .then(function (response) {

                console.log('登陆1',response.data.resultCode);
                console.log('登陆2',response);
                localStorage.setItem('userID',response.data.result.userId)
                localStorage.setItem('userPassword',response.data.result.userPassword)
                localStorage.setItem('userRole',response.data.result.userRole)
                if(response.data.resultCode==1){
                    // Toast.success('登陆成功', 1);
                    alert('登陆成功!')
                    dispatch({type: 'LOGIN'})
                }else {
                    // Toast.fail('登陆失败!', 1);
                    alert('登陆失败!')
                }
                callback(response)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export function register(data, callback) {
    return dispatch => {
        axios.post(`http://118.24.128.250:8080/web-api/api/register?userId=${data.userId}&classNumber=${data.classNumber}&userName=${data.userName}&userPassword=${data.pwd}&userRole=${data.pickerValue}`)
            .then(function (response) {
                console.log(response.data.resultCode)
                console.log('注册'+response.resultCode)
                console.log('注册1'+response)
                if (response.data.resultCode==1) {
                    // Toast.success('注册成功!', 1);
                    alert('注册成功!')
                    dispatch({type: 'REGISTER'})
                    callback()
                    // localStorage.userName = response.data.data.phone
                    // localStorage.token = response.data.data.token
                    // localStorage.id = response.data.data.id
                } else {
                    alert('注册失败!')
                    // Toast.fail('注册失败!', 1);
                    callback(response)
                }
            })
            .catch(function (error) {
                // alert(error);
                console.log(error);
            });
    }
}

export function pushMessage(data, callback) {
    console.log(localStorage.getItem('userRole'));
    if(localStorage.getItem('userRole')!=='admin'){
        alert('仅管理员可操作!');
        return false
    }

    return dispatch => {
        axios.post(`http://118.24.128.250:8080/web-api/api/postMessage?userId=${localStorage.getItem('userID')}&message=${data.message}`, )
            .then(function (response) {
                if (response.data.resultCode==1) {
                    // alert('推送成功!')
                    Toast.success('推送成功!', 1);
                } else {
                    // alert('推送失败!')
                    Toast.fail('推送失败!', 1);
                    callback(response)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export function pushSchedule(data, callback) {
    console.log(localStorage.getItem('userRole'));
    if(localStorage.getItem('userRole')!=='admin'){
        alert('仅管理员可操作!');
        return false
    }
    return dispatch => {
        axios.post(`http://118.24.128.250:8080/web-api/api/editCourse?courseId=${data.courseId}&courseName=${data.courseName}&teacher=${data.teacher}&address=${data.address}&classNumber=${data.classNumber}&courseTime=${data.courseTime}`,
        )
            .then(function (response) {
                if (response.data.resultCode==1) {
                    // alert('添加课程成功!')
                    Toast.success('添加课程成功!', 1);
                }else {
                    // alert('添加课程失败!')
                    Toast.fail('添加课程失败!', 1);
                }
                console.log(response);
                callback(response)

            })
            .catch(function (error) {
                console.log(error);
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
                console.log(error);
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
                console.log(error);
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
                console.log(error);
            });
    }
}

export function leave(data, callback) {
    console.log(localStorage.getItem('userRole'));
    if(localStorage.getItem('userRole')!=='student'){
        alert('仅学生可操作!');
        return false
    }
    return dispatch => {
        axios.post(`http://118.24.128.250:8080/web-api/api/sign?userId=${localStorage.getItem('userID')}&userPassword=${localStorage.getItem('userPassword')}&courseId=${data.class}&signStatus=2`, )
            .then(function (response) {
                if (response.data.resultCode==1) {
                    // alert('请假成功!')
                    Toast.success('添加课程成功!', 1);
                }else {
                    // alert('请假失败!')
                    Toast.fail('添加课程失败!', 1);
                }
                alert('请假成功!')
                // Toast.success('请假成功!', 1);
                console.log('请假1'+response.resultCode)
                console.log('请假2'+response)
            })
            .catch(function (error) {
                // alert(error);
                console.log(error);
            });
    }
}

export function selectClass(data, callback) {
    console.log(localStorage.getItem('userRole'));
    if(localStorage.getItem('userRole')!=='student'){
        alert('仅学生可操作!');
        return false
    }
    return dispatch => {
        axios.post(`http://118.24.128.250:8080/web-api/api/chooseCourse?userId=${localStorage.getItem('userID')}&courseName=${data.courseName}&courseIdStr=${data.select}`, )
            .then(function (response) {
                // alert('选课成功!');
                Toast.success('选课成功!', 1);
            })
            .catch(function (error) {
                console.log(error);
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
                console.log(error);
            });
    }
}

export function singin(data, callback) {
    console.log(localStorage.getItem('userRole'));
    if(localStorage.getItem('userRole')!=='student'){
        alert('仅学生可操作!');
        return false
    }
    console.log(data);
    return dispatch => {
        axios.post(`http://118.24.128.250:8080/web-api/api/sign?userId=${localStorage.getItem('userID')}&userPassword=${localStorage.getItem('userPassword')}&courseId=${data.courseId}&signStatus=1`)
            .then(function (response) {
                if (response.data.resultCode==1) {
                    // alert('签到成功!')
                    Toast.success('签到成功!', 1);
                }else {
                    // alert('签到失败!')
                    Toast.fail('签到失败!', 1);
                }
            })
            .catch(function (error) {
                console.log(error);
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
                console.log(error);
            });
    }
}
