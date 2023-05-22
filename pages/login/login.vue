<template>

	<view class="container">
		<view class="title">
			<text>基于人脸识别与定位的高校人员信息管理系统</text>
		</view>

		<view class="selectUser">
			<view class="userType" :class="isStuActive ? 'active' : ''" @click="studentClick">
				学生
			</view>
			<view class="userType" :class="isAdmActive ? 'active' : ''" @click="adminClick">
				管理员
			</view>
		</view>


		<view v-if="userType == 0" class="desc">
			<view>学生登录，自助上报每日状况</view>
		</view>

		<view v-else-if="userType == 1" class="desc">
			<view>管理员模式</view>
		</view>


		<view class="login-form">
			<input type="text" value="username" placeholder="请输入用户名" v-model="username" />
			<input type="text" value="password" placeholder="请输入密码" password="true" v-model="password" />
			<!-- <div class="buttonGroup"> -->
			<button class="btn" type="primary" @click="signIn">登录</button>
			<!-- </div> -->
			<view class="text-right">
				<navigator url="/pages/register/register" class="linkBtn" open-type="redirect">
					<text>没有账号？前往注册</text>
				</navigator>
			</view>
		</view>
	</view>


</template>

<script>
	import {
		userVerify
	} from "@/utils/userVerify.js"

	import {
		getAllStudents,
		login,
		getNameByUsername
	} from "@/api/index.js"

	export default {
		data() {
			return {
				username: '',
				password: '',
				userType: 0, // 0学生 1管理
				isStuActive: true,
				isAdmActive: false,
			};
		},
		onLoad() {
			uni.clearStorageSync()
			console.log("getAllStudents", getAllStudents);

		},
		methods: {
			getAllStudents() {
				getAllStudents({
					username: this.username,
					password: this.password,
					userType: this.userType
				}).then(res => {
					console.log('1111111', res);
				})
			},

			signIn() {
				console.log(1);

				// this.getAllStudents()
				// uni.request({
				// 	url: "http://localhost:3000/api/login",
				// 	data: {
				// 		username: this.username,
				// 		password: this.password,
				// 		userType: this.userType
				// 	},
				// 	success: (res) => {
				// 		console.log("res", res);
				// 		if (res.errMsg == "request:ok") {
				// 			if (res.data.length > 0) {
				// 				uni.showToast({
				// 					title: "登录成功",
				// 					icon: "none"
				// 				})
				// 				setTimeout(() => {
				// 					uni.navigateTo({
				// 						url: '/pages/index/index'
				// 					})
				// 				}, 1500)

				// 			} else {
				// 				uni.showToast({
				// 					title: "账号或密码不正确",
				// 					icon: "none"
				// 				})
				// 			}
				// 		}
				// 	}
				// })

				//--------------
				if (this.userType == 0) {
					if (!userVerify(this.username, this.password)) return
					uni.setStorageSync("username", this.username)
					getNameByUsername({
						username: this.username,
					}).then(res => {
						console.log(res.data[0].name, 'name');
						uni.setStorageSync("name", res.data[0].name)
					})
				}
				this.login()

				// uni.navigateTo({
				// 	url: '/pages/faceRecognition/faceRecognition'
				// })
				// uni.navigateTo({
				// 	url: '/pages/position/position'
				// })		
				// uni.navigateTo({
				// 	url: '/pages/abc/abc'
				// })
				// uni.navigateTo({
				// 	url: '/pages/index/index'
				// })


			},
			studentClick() {
				this.isAdmActive = false
				this.isStuActive = true
				this.userType = 0

			},
			adminClick() {
				this.isAdmActive = true
				this.isStuActive = false
				this.userType = 1
			},
			login() {
				login({
					username: this.username,
					password: this.password,
					userType: this.userType
				}).then(res => {
					if (res.errMsg == "request:ok") {
						if (res.data.length > 0) {
							uni.showToast({
								title: "登录成功",
								icon: "none"
							})



							if (this.userType == 0) {
								setTimeout(() => {
									// uni.navigateTo({
									// 	url: '/pages/index/index'
									// })
									uni.navigateTo({
										url: '/pages/index/index'
									})
									// uni.navigateTo({
									// 	url: '/pages/faceRecognition/faceRecognition'
									// })
								}, 1500)
							} else {
								setTimeout(() => {
									// uni.navigateTo({
									// 	url: '/pages/index/index'
									// })

									uni.navigateTo({
										url: '/pages/admin/admin'
									})
								}, 1500)
							}


						} else {
							uni.showToast({
								title: "账号或密码不正确",
								icon: "none"
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.selectUser {
		display: flex;
		justify-content: space-around;
		align-items: center;

		.userType {
			font-size: 36rpx;
			line-height: 80rpx;
			width: 250rpx;
			height: 80rpx;
			text-align: center;
			// background-color: #007AFF;
			border-bottom: #f5f5f5 2rpx solid;
		}
	}

	.active {
		border-bottom: #007AFF 2rpx solid !important;
	}

	.weixinBtn {
		color: #007AFF;
		text-align: center;
		font-size: 22upx;
		border-top: 1upx #333333 solid;
		margin-top: 50upx;
		padding-top: 50upx;
	}

	.weixinBtn div {
		color: #333333;
		margin-bottom: 20upx;
	}

	.linkBtn {
		color: #007AFF;
		font-size: 22upx;
	}



	.buttonGroup {
		display: flex;
	}

	.buttonGroup navigator {
		margin-right: 20upx;
		flex: 1;
	}

	.container {
		padding: 30px;
	}

	.title {
		text-align: center;
		font-size: 20px;
		font-weight: bold;
		padding: 20px 0px;
		margin: 0 auto;
		width: 510rpx;
	}

	.desc {
		padding: 10px 0px;
		font-size: 14px;
		line-height: 22px;
		color: #999999;
	}

	.login-form input {
		height: 40px;
		border: solid 1px #DDDDDD;
		text-indent: 10px;
		padding-left: 20rpx;
	}

	.login-form input {
		width: 100%;
		margin-bottom: 10px;
	}

	.btn {
		width: 652rpx;
		margin: 30rpx auto;
	}
</style>