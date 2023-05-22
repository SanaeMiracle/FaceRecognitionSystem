/**
 * 获取是否授权了定位权限
 * @param { Boolean } launchAuth: 是否发起授权请求, 初次有效
 * @return { Boolean }
 */
export function getLocationAuth(launchAuth) {
	return new Promise(resolve => {
		uni.getSetting({
			success: res => {
				if (launchAuth && res.authSetting['scope.userLocation'] === undefined) {
					return uni.authorize({
						scope: 'scope.userLocation',
						success: () => {
							resolve(true);
						},
						fail: () => {
							resolve(false);
						}
					})
				}
				resolve(res.authSetting['scope.userLocation']);
			},
			fail: err => {
				console.err(err);
			}
		})
	})
}
