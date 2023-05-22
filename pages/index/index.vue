<template>
	<view class="container">
		<view class="top">
			<view class="username">
				当前账号：{{username}}
			</view>

			<view class="check">
				<view class="" v-if="!isCheckIn">
					<view class="checkText">
						当前打卡情况:&nbsp;&nbsp;&nbsp;未打卡
					</view>

					<button class="btn" type="primary" @click="toCheckIn">前往打卡</button>
				</view>
				<view class="" v-else>
					<view class="checkText">
						今日打卡情况:&nbsp;&nbsp;&nbsp;已打卡
					</view>
					<view class="checkText">
						打卡时间：{{checkTime}}
					</view>
				</view>
			</view>

			<button class="exitBtn" type='warn' @click="exit">退出登录</button>
		</view>


		<view class="table">
			<view class="tableTitle">
				<view class="text">
					打卡日期
				</view>
				<view class="text ">
					当日在校
				</view>
				<view class="text">
					当日出校
				</view>


			</view>
			<view class="content" v-if="tableData.length > 0" v-for="(item,index) in tableData" :key="index">
				<view class="list">
					{{item.checkDate.slice(0,10)}}
				</view>
				<view class="list inSchoolList">
					{{item.inSchool == 1 ? "是" : "否"}}
				</view>
				<view class="list outSchoolList">
					{{item.outSchool == 1 ? "是" : "否"}}
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	import {
		getRecord
	} from "@/api/index.js"
	import getDateTime from '@/utils/getdateTime.js'
	export default {
		data() {
			return {
				isCheckIn: false,
				checkDate: "",
				checkTime: "",
				username: '',
				tableData: []
			}
		},
		onLoad(option) {
			console.log(option);
			this.username = uni.getStorageSync('username')
			this.isCheckIn = option.checkTime ? true : false
			this.checkTime = option.checkTime

			this.getRecord()
		},
		methods: {
			toCheckIn() {
				uni.navigateTo({
					url: '/pages/student/student'
				})
			},
			getRecord() {
				getRecord({
					username: this.username
				}).then(res => {

					if (res.errMsg == "request:ok") {
						this.tableData = res.data
						this.tableData.forEach(item => {
							if (item.checkDate == getDateTime.dateTimeStr('y-m-d')) {
								this.isCheckIn = true
								this.checkTime = item.checkTime
								console.log(item);
							}
						})
						console.log(this.tableData);
					}
				})
			},

			exit() {
				uni.clearStorageSync(); //清除缓存
				uni.showToast({
					title: '退出登录成功',
					icon: 'none',
					success: function() {
						setTimeout(function() {
							//跳转到登录页面，关闭其他所有页面，强制重启
							uni.reLaunch({
								url: '/pages/login/login',
							})
						}, 1000);
					}
				})
			}

		}
	}
</script>

<style lang="scss">
	// page {
	// 	background-color: #fff;
	// }

	.top {
		text-align: center;
		margin: 50rpx auto;
		font-size: 34rpx;

		// .username {
		// 	margin-bottom: 20rpx;
		// }
		.checkText {
			margin: 20rpx 0;
		}

		.btn {
			width: 500rpx;
			margin: 50rpx auto;
		}
	}

	.table {
		// width: 0%;
		height: 100%;
		background-color: #fff;
		margin-top: 50rpx;
		padding: 10rpx 0;

		.tableTitle {
			display: flex;
			font-size: 34rpx;
			justify-content: space-around;
			width: 660rpx;
			align-items: center;
			margin: 20rpx auto;
		}

		.content {
			margin: 20rpx auto;
			padding: 10rpx 0;
			font-size: 34rpx;
			display: flex;
			justify-content: left;
			width: 660rpx;
			border-bottom: #ddd 1rpx solid;

			.inSchoolList {
				margin-left: 110rpx;
			}

			.outSchoolList {
				margin-left: 210rpx;
			}
		}
	}

	.exitBtn {
		width: 500rpx;
		margin: 50rpx auto;
	}
</style>