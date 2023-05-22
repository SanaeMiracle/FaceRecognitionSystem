<template>
	<view>
		<camera v-if="showCamera">
			<view class="CameraOptions">
				<view class="takePicBtn">
					<!-- 摄像头的返回按钮 -->
					<cover-image class="confirm" src="" bindtap="goBack"></cover-image>
					<!-- 照相的按钮 -->
					<cover-view bindtap="getPhoto"></cover-view>
					<!-- 摄像头的前后转换按钮 -->
					<!-- <cover-image class="switch" src="" bindtap='changePos'></cover-image> -->
				</view>
			</view>
		</camera>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				setData: {

				},
				showCamera: true,
				cameraPos: ''
			};
		},
		onLoad() {

		},
		methods: {
			// 照相
			getPhoto() {
				// c创建相机上下文对象,获取唯一的相机对象
				var context = uni.createCameraContext()
				// 照相功能
				context.takePhoto({
					quality: "high",
					success: res => {
						// 照相成功的回调
						console.log(res); // 图片的信息
						this.setData({
							// 隐藏相机
							//  showCamera:false,
							imageUrl: res.tempImagePath,
							imgwidth: res.width,
							imgheight: res.height
						})
						console.log(this.data.imageUrl)
					},
					fail: () => {
						uni.showToast({
							title: '出现错误',
						})
					}
				})
			},

			// 相机前后镜头转换
			// changePos() {
			//   this.setData({
			//     cameraPos: this.data.cameraPos == "back" ? "front" : "back"
			//   })
			// },

			// 关闭相机
			goBack() {
				this.setData({
					showCamera: false,
				})
			},
		}
	}
</script>

<style lang="scss">

</style>