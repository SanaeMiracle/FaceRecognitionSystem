<template>
	<view>

		<camera class="camera" device-position="front" flash="off" v-if="authCamera"></camera>
		<button type="warn" @tap="takePhotoByHead" class="btn">人脸注册</button>
		<!-- <button type="primary" @tap="reverseCamera">摄像头切换</button> -->
		<view class="error-handler" v-if="!authCamera">
			<button class="nobtn" openType="openSetting">打开相机授权</button>
		</view>
	</view>
</template>

<script>
	import {
		getToken,
		faceRegister,
		faceRecognition
	} from "@/utils/recognition.js"
	export default {
		data() {
			return {
				authCamera: true,
				showHeader: true,
				ctxHeader: {},
				url: '',
			}
		},
		onShow: function() {
			//获取相机权限
			uni.getSetting({
				success: res => {
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
							const group_id = 'students'
							faceRecognition(access_token, b64, group_id)
								.then(res => {
									console.log('23123', res);
									if (res.data.error_msg === "SUCCESS") {
										// 在人脸库中对比结果 score > 80 则比对成功
										const score = res.data.result.user_list[0]
											.score
										if (score > 80) {
											uni.showToast({
												title: "该人脸已注册",
												icon: 'none'
											})
										} else {
											const user_id = uni.getStorageSync(
												"registerId")
											faceRegister(access_token, b64, group_id, user_id)
												.then(res => {
													console.log('222222', res);
													if (res.data.error_msg === "SUCCESS") {
														uni.showToast({
															title: "注册成功",
															icon: 'none'
														})
														setTimeout((res => {
															uni.navigateTo({
																url: '/pages/login/login'
															})
														}), 1500)
													} else {
														uni.showToast({
															title: "请正确拍摄人脸",
															icon: 'none'
														})
													}
												})
										}
									} else {
										uni.showToast({
											title: "请正确拍摄人脸",
											icon: 'none'
										})
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