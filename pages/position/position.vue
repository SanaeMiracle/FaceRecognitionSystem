<template>
	<view>

		<map id="mapSelected" style="width: 690rpx; height: 800rpx; margin:20rpx auto;" :latitude="schoolInfo.latitude"
			:longitude="schoolInfo.longitude" :circles="circles" :scale="15" :show-location="true">
		</map>

		<view class="text">
			当前定位{{inSchool ? "在" : "不在"}}学校范围内
		</view>

		<!-- <button class="btn" type="primary" @click="checkIn">点击签到</button> -->

		<view class="checkBox" @click="checkIn">
			<view class="checkTitle">
				打卡
			</view>
			<view class="checkTime">
				{{time}}
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getLocationAuth
	} from '@/utils/location';
	import getDateTime from '@/utils/getdateTime.js'
	export default {
		data() {
			return {
				time: '',
				schoolInfo: {
					latitude: 30.581554,
					longitude: 103.988574,

				},
				studentInfo: {
					latitude: 0,
					longitude: 0,
				},
				studentData: {},
				radius: 480,
				loading: false,
				isAuth: -1, // -1: 未授权  0: 拒绝授权  1:已授权
				inSchool: 0
				// circles: [{
				// 	radius: 460,
				// 	latitude: 30.581554,
				// 	longitude: 103.988174,
				// 	color: '#54C3FF',
				// 	// 填充颜色
				// 	fillColor: '#A3FF746A',
				// }]
			}
		},
		computed: {
			// markers() {
			// 	return [{
			// 		id: parseInt(uni.getStorageSync("username")),
			// 		latitude: this.studentInfo.latitude,
			// 		longitude: this.studentInfo.longitude,
			// 		iconPath: '../../static/image/position.png',
			// 		width: 20,
			// 		height: 20
			// 	}]
			// },
			circles() {
				return [{
					radius: this.radius,
					latitude: this.schoolInfo.latitude,
					longitude: this.schoolInfo.longitude,
					color: '#54C3FF',
					// 填充颜色
					fillColor: '#A3FF746A',
				}]
			}
		},
		onLoad(option) {
			setInterval(() => {
				this.time = getDateTime.dateTimeStr('h:i:s')
				// console.log(this.date)
			}, 1000)
			// if (!await getLocationAuth()) {
			// 	this.isAuth = 0;
			// }
			this.studentData.name = option.name
			this.studentData.username = option.username
			this.studentData.speciality = option.speciality
			this.studentData.classes = option.classes
			// inSchool: this.studentData.inSchool, // 0 不在 1 在
			this.studentData.outSchool = option.outSchool
			console.log('aaaa', option);
			uni.getLocation({
				type: 'gcj02', //返回可以用于uni.openLocation的经纬度
				success: (res) => {
					this.studentInfo.latitude = res.latitude;
					this.studentInfo.longitude = res.longitude;
					console.log(res, this.markers, "ssssss");
					const distance = this.getDistance(this.studentInfo.latitude,
						this.studentInfo.longitude,
						this.schoolInfo.latitude,
						this.schoolInfo.longitude)
					// const distance = this.getDistance(0,
					// 	0,
					// 	this.schoolInfo.latitude,
					// 	this.schoolInfo.longitude)

					this.inSchool = (distance <= this.radius / 1000) ? 1 : 0
					this.studentData.inSchool = this.inSchool
					console.log(this.inSchool, distance);
				},
				fail: (res) => {
					console.log('err', res);
				}
			});
		},
		methods: {
			checkIn() {
				// const distance = this.getDistance(this.studentInfo.latitude, this.studentInfo.longitude, this.schoolInfo
				// 	.latitude, this.schoolInfo
				// 	.longitude)
				// this.inSchool = distance <= this.radius ? true : false


				this.studentData.checkDate = getDateTime.dateTimeStr('y-m-d')
				this.studentData.checkTime = getDateTime.dateTimeStr('h:i:s')

				uni.navigateTo({
					url: `/pages/faceRecognition/faceRecognition?inSchool=${this.inSchool}&checkTime=${this.studentData.checkTime}&checkDate=${this.studentData.checkDate}&name=${this.studentData.name}&username=${this.studentData.username}&speciality=${this.studentData.speciality}&classes=${this.studentData.classes}&outSchool=${this.studentData.outSchool}`
				})

				// uni.navigateTo({
				// 	url: `/pages/faceRecognition/faceRecognition`
				// })


				// if (this.inSchool == 1) {
				// 	uni.showToast({
				// 		title: "当前定位在学校中",
				// 		icon: "none"
				// 	})

				// } else {
				// 	uni.showToast({
				// 		title: "当前定位不在学校中",
				// 		icon: 'none'
				// 	})

				// }

				// uni.request({
				// 	url: "http://localhost:3000/api/checkIn",
				// 	method: 'POST',
				// 	data: this.studentData,
				// 	success: (res) => {
				// 		console.log('res', res);
				// 		if (res.data.repeat) {
				// 			console.log(5555);
				// 			uni.showToast({
				// 				title: "本日已打卡，请勿重复打卡",
				// 				icon: 'none'
				// 			})
				// 		} else {
				// 			console.log(444);
				// 			uni.showToast({
				// 				title: "打卡成功",
				// 				icon: 'none'
				// 			})
				// 		}

				// 		setTimeout(() => {
				// 			uni.navigateTo({
				// 				url: `/pages/index/index?checkTime=${this.studentData.checkTime}`
				// 			})
				// 		}, 1500)
				// 	}
				// })


				// setTimeout(() => {
				// 	uni.navigateTo({
				// 		url: `/pages/index/index?inSchool=${this.inSchool}`
				// 	})
				// }, 1500)
			},
			// 计算两点距离
			getDistance(lat1, lng1, lat2, lng2) {
				console.log(lat1, lng1, lat2, lng2);
				var radLat1 = lat1 * Math.PI / 180.0;
				var radLat2 = lat2 * Math.PI / 180.0;
				var a = radLat1 - radLat2;
				var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
				var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
					Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
				s = s * 6378.137; // EARTH_RADIUS;
				s = Math.round(s * 10000) / 10000;
				return s;
			},

			// 获取当前位置信息
			getLocationInfo() {
				this.loading = true;
				uni.getLocation({
					type: 'gcj02',
					success: ({
						latitude,
						longitude
					}) => {
						this.studentInfo.latitude = latitude;
						this.studentInfo.longitude = longitude;
						// this.loading = false;
					}
				});
			},
			// 重新授权
			reGrantAuth() {}
		}
	}
</script>

<style>
	.checkBox {
		width: 180rpx;
		height: 100rpx;
		border-radius: 50%;
		padding: 120rpx 80rpx;

		background-color: #e91e63;
		margin: 30rpx auto;
		text-align: center;
	}

	.checkTitle {
		font-size: 36rpx;
		font-weight: 800;
		margin-bottom: 20rpx;

	}

	.info {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin-top: 20rpx;
	}

	.block {
		margin-bottom: 20rpx;
	}

	.title {
		color: #000;
		font-weight: bold;
	}

	.value {
		width: 100%;
		min-height: 40rpx;
	}

	.text {
		font-size: 36rpx;
		margin: 20rpx auto;
		width: 500rpx;
		line-height: 60rpx;
		height: 60rpx;
		text-align: center;
	}

	.loading {
		width: 40rpx;
		height: 40rpx;
		transform: rotate(360deg);
		animation: rotation 3s linear infinite;
	}

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	.btn {
		width: 650rpx;
		margin: 30rpx auto;
	}
</style>