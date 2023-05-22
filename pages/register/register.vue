<template>
	<view>
		<view class="container">
			<view class="title">
				<text>基于人脸识别与定位的高校人员信息管理系统</text>
			</view>

			<view class="desc ">
				<view>学生注册后可上报每日状况</view>
			</view>

			<view class="login-form margin-top">
				<input type="text" value="name" placeholder="请输入姓名" v-model="name" />
				<input type="text" value="speciality" placeholder="请输入专业" v-model="speciality" />
				<input type="text" value="classes" placeholder="请输入班级		" v-model="classes" />

				<input type="text" value="registerId" placeholder="请输入学号" v-model="registerId" />
				<input type="text" value="password" placeholder="请输入密码" password="true" v-model="password" />
				<input type="text" value="repeatPassword" placeholder="请再次确认密码" password="true"
					v-model="repeatPassword" />

				<button class="btn" type="primary" @click="signUp">注册</button>

				<navigator url="/pages/login/login" class="linkBtn">
					<text>已有账号？点击登录 </text>
				</navigator>

			</view>
		</view>
	</view>
</template>
<script>
	// import WucTab from '@/components/wuc-tab/wuc-tab.vue';
	// import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import {
		userVerify
	} from "@/utils/userVerify.js"
	import {
		register
	} from "@/api/index.js"
	export default {
		data() {
			return {
				registerId: '',
				password: '',
				repeatPassword: '',
				userType: 0,
				school: '',
				name: '',
				speciality: '',
				classes: ''
			};
		},

		onLoad() {
			console.log(register);
		},
		methods: {

			signUp() {
				if (!userVerify(this.registerId, this.password)) return
				console.log(11);
				if (this.password != this.repeatPassword) {
					uni.showToast({
						title: "两次密码输入不一致",
						icon: "none"
					})
					return
				}

				// this.register()



				uni.request({
					url: "http://localhost:3000/api/register",
					method: "POST",
					data: {
						username: this.registerId,
						password: this.password,
						name: this.name,
						classes: this.classes,
						speciality: this.speciality
					},
					success: (res) => {
						console.log("res", res);
						if (res.errMsg == "request:ok") {
							if (res.data.message == "success") {
								// uni.showToast({
								// 	title: "注册成功",
								// 	icon: "none"
								// })
								// setTimeout(() => {
								uni.navigateTo({
									url: '/pages/faceRegister/faceRegister'
								})
								// }, 1500)
							}
						}
					}
				})


				uni.setStorageSync('registerId', this.registerId);

				// uni.navigateTo({
				// 	url: '/pages/faceRegister/faceRegister'
				// })
			},
			register() {
				register({
					username: this.registerId,
					password: this.password
				}).then(res => {
					console.log('热身赛所所', res);
					if (res.errMsg == "request:ok") {
						if (res.data.length > 0) {
							uni.showToast({
								title: "注册成功",
								icon: "none"
							})
							setTimeout(() => {
								uni.navigateTo({
									url: '/pages/faceRegister/faceRegister'
								})
							}, 1500)

						}
					}
				})
			}

		},
		onReady() {}
	};
</script>

<style lang="scss">
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
		text-align: right;
		font-size: 22upx;
	}

	.swiper {
		height: 100upx;
	}

	.buttonGroup {
		display: flex;
	}

	.swiper-title {
		font-size: 30upx;
	}

	.buttonGroup button:nth-child(1) {
		margin-right: 20upx;
	}

	.container {
		padding: 30px;
	}

	.title {
		text-align: center;
		font-size: 20px;
		font-weight: bold;
		padding: 20px 0px;
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

	.title {
		text-align: center;
		font-size: 20px;
		font-weight: bold;
		padding: 20px 0px;
		margin: 0 auto;
		width: 510rpx;
	}
</style>