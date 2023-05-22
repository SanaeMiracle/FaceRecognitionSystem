<template>
	<view>

		<camera class="camera" device-position="front" flash="off" v-if="authCamera"></camera>
		<button type="warn" @tap="takePhotoByHead" class="btn">人脸识别</button>
		<!-- <button type="primary" @tap="reverseCamera">摄像头切换</button> -->
		<view class="error-handler" v-if="!authCamera">
			<button class="nobtn" openType="openSetting">打开相机授权</button>
		</view>

	</view>
</template>

<script>
	import {
		getToken,
		faceRecognition
	} from "@/utils/recognition.js"
	export default {
		data() {
			return {
				studentData: {},
				authCamera: false,
				showHeader: true,
				ctxHeader: {},
				url: '',
			}
		},
		onLoad(option) {
			console.log('option', option);
			this.studentData = option
		},
		onShow() {
			//获取相机权限
			uni.getSetting({
				success: res => {
					console.log(res);
					if (res.authSetting["scope.camera"]) {
						this.authCamera = true
					} else {
						uni.authorize({
							scope: 'scope.camera',
							success: (res) => {
								this.authCamera = true
							},
							fail: res => {
								this.authCamera = false
							}
						})
					}
				}
			})
		},
		methods: {
			//拍摄头像
			takePhotoByHead() {
				this.showHeader = true //开启拍照
				let _thats = this;
				this.ctxHeader = uni.createCameraContext();
				this.ctxHeader.takePhoto({
					quality: 'high',
					success: (res) => {
						const b64 = uni.getFileSystemManager().readFileSync(res.tempImagePath, 'base64')
						getToken().then(res => {
							const access_token = res.data['access_token']
							faceRecognition(access_token, b64, 'students')
								.then(res => {
									console.log('resqqq', res);
									//人脸识别请求成功
									if (res.data.error_msg === "SUCCESS") {
										// 在人脸库中对比结果 score > 80 则比对成功
										const {
											score,
											user_id
										} = res.data.result.user_list[0]
										console.log(user_id, uni.getStorageSync(
											"username"));
										if (score > 80 && user_id == uni.getStorageSync(
												"username")) {
											this.checkIn()
										} else {
											uni.showToast({
												title: "打卡失败，请重新打卡",
												icon: 'none'
											})
											setTimeout(() => {
												uni.navigateTo({
													url: `/pages/index/index`
												})
											}, 1500)
										}
									}
								})
						})
					}
				});
			},

			handleCameraError() {
				uni.showToast({
					title: '用户拒绝使用摄像头',
					icon: 'none'
				})
			},

			checkIn() {
				uni.request({
					url: "http://localhost:3000/api/checkIn",
					method: 'POST',
					data: this.studentData,
					success: (res) => {
						uni.showToast({
							title: "打卡成功",
							icon: 'none'
						})
						setTimeout(() => {
							uni.navigateTo({
								url: `/pages/index/index?checkTime=${this.studentData.checkTime}`
							})
						}, 1500)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.camera {
		width: 650rpx;
		height: 850rpx;
		margin: 20rpx auto;
	}

	.btn {
		width: 650rpx;
		margin: 80rpx auto;
	}
</style>