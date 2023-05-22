export function userVerify(id, password) {
	if (!id) {
		uni.showToast({
			title: "学号不能为空",
			icon: 'none'
		})
		return false
	} else {
		var objExp = new RegExp(/^(0|[1-9][0-9]*)$/);
		if (objExp.test(id) == false) {
			console.log('id', id);
			console.log('id', '学号不能包含非数字');
			uni.showToast({
				title: "学号不能包含非数字",
				icon: 'none'
			})
			return false
		}
	}

	if (!password) {
		console.log('pass', password);
		uni.showToast({
			title: "密码不能为空",
			icon: 'none'
		})
		return false
	}

	return true
}
