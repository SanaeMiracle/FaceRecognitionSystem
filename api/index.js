// 登录
export const login = (data) => {
	return uni.$get('/login', data)

}

// 学生注册
export const register = (data) => {
	return uni.$post('/register', data)
}

// 打卡
export const checkIn = (data) => {
	return uni.$post('/checkIn', data)
}


// 查询学生信息
export const getAllStudents = (data) => {
	return uni.$get('/getAllStudents', data)
}
export const getRecordNone = (data) => {
	return uni.$get('/getRecordNone', data)
}

// 学生自己的记录
export const getRecord = (data) => {
	return uni.$get('/getRecord', data)
}
export const getNameByUsername = (data) => {
	return uni.$get('/getNameByUsername', data)
}

// 管理员所有的记录
export const getAllRecord = (data) => {
	return uni.$get('/getAllRecord', data)
}