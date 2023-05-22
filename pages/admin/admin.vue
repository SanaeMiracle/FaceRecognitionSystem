<template>
	<view>

		<view class="timeBox">
			当前时间：{{date}}
		</view>

		<view class="btnBox">
			<button size="mini" @click="ckeck">查看今日已打卡学生</button>
			<button size="mini" @click="noCheck">查看今日未打卡学生</button>
			<button type="warn" size="mini" @click="exit">退出登录</button>
		</view>


		<view class="table" v-if="showTable == 1">
			<view class="">
				今日已打卡学生
			</view>
			<view class="tableTitle">
				<view class="text">
					学号
				</view>
				<view class="text ">
					姓名
				</view>
				<view class="text">
					班级
				</view>
			</view>
			<view @click="dialogToggle(item)" class="content" v-if="tableData.length > 0"
				v-for="(item,index) in tableData" :key="index">
				<view class="list">
					{{item.username}}
				</view>
				<view class="list inSchoolList">
					{{item.name}}
				</view>
				<view class="list outSchoolList">
					{{item.speciality}}{{item.classes}}
				</view>

				<!-- 			<uni-popup v-if="showPopup" ref="alertDialog" type="dialog">
					<uni-popup-dialog :type="msgType" cancelText="确定">
						{{item.name}}
					</uni-popup-dialog>
				</uni-popup> -->


			</view>
		</view>

		<view class="table" v-else-if="showTable == 0">
			<view class="">
				今日未打卡学生
			</view>
			<view class="tableTitle">
				<view class="text">
					学号
				</view>
				<view class="text ">
					姓名
				</view>
				<view class="text">
					班级
				</view>
			</view>
			<view class="content" v-if="tableDataNone.length > 0" v-for="(item,index) in tableDataNone" :key="index">
				<view class="list">
					{{item.username}}
				</view>
				<view class="list inSchoolList">
					{{item.name}}
				</view>
				<view class="list outSchoolList">
					{{item.speciality}}{{item.classes}}
				</view>

				<!-- 			<uni-popup v-if="showPopup" ref="alertDialog" type="dialog">
					<uni-popup-dialog :type="msgType" cancelText="确定">
						{{item.name}}
					</uni-popup-dialog>
				</uni-popup> -->


			</view>
		</view>


		<uni-popup ref="popup" background-color="#fff">
			<view class="popup-content" ref="content" style="width: 500rpx;padding: 0 50rpx;"><text
					class=" text">{{content}}</text>
			</view>
		</uni-popup>

		<!-- 		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog type="info" cancelText="关闭"></uni-popup-dialog>
		</uni-popup> -->
	</view>
</template>

<script>
	import getDateTime from '@/utils/getdateTime.js'
	import {
		getAllStudents,
		getAllRecord,
		getRecordNone
	} from "@/api/index.js"
	export default {
		data() {
			return {
				date: '',
				showTable: '1',
				tableData: [],
				tableDataNone: [],
				students: [],
				showPopup: false,
				content: ''
			};
		},
		onShow() {
			// this.getAllStudents()
			this.getAllRecord()
			setInterval(() => {
				this.date = getDateTime.dateTimeStr('y-m-d h:i:s')
				// console.log(this.date)
			}, 1000)
		},
		methods: {
			dialogToggle(item) {
				// this.$refs.alertDialog.open()
				console.log(item, '@@@');

				uni.request({
					url: 'http://localhost:3000/api/getRecordByClick',
					method: 'GET',
					data: {
						checkDate: getDateTime.dateTimeStr('y-m-d'),
						username: item.username
					},
					success: (res) => {
						console.log(res);
						if (res.errMsg == "request:ok")
							this.$refs.popup.open('center')
						this.content = `
						姓名： ${item.name}
						今日是否在校： ${res.data.data[0].inSchool ? '是' : '否'}
						今日是否出校： ${res.data.data[0].outschool ? '是' : '否'}
						今日打卡时间： ${res.data.data[0].checkTime}
						`
					}
				})


				console.log('this.$refs.text', this.$refs);

				// this.$refs.alertDialog.content = '11'
				// this.$refs.alertDialog.open()
				// this.showPopup = true
			},
			ckeck() {
				this.showTable = 1
				this.getAllRecord()
			},
			noCheck() {
				this.showTable = 0
				// console.log(684646);
				this.getRecordNone()
			},
			getRecordNone() {
				getRecordNone({
					checkDate: getDateTime.dateTimeStr('y-m-d')
				}).then(res => {
					console.log('getRecordNone', res);
					this.tableDataNone = res.data.data
				})
			},
			getAllStudents() {
				getAllStudents().then(res => {
					console.log('getAllStudents', res);
					this.students = res.data.data
				})
			},

			getAllRecord() {
				getAllRecord({
					checkDate: getDateTime.dateTimeStr('y-m-d')
				}).then(res => {
					console.log('getAllStudents', res);
					this.tableData = res.data.data
				})
			}
		}
	}
</script>

<style lang="scss">
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
			justify-content: space-between;
			width: 660rpx;
			border-bottom: #ddd 1rpx solid;

			.inSchoolList {
				// margin-left: 110rpx;
			}

			.outSchoolList {
				// margin-left: 10rpx;
			}
		}
	}

	.popup-content {
		width: 500rpx;
		height: 300rpx;
	}

	.timeBox {
		width: 600rpx;
		margin: 20rpx auto;
	}

	.btnBox {
		margin: 0 auto;
		width: 400rpx;

		button {
			width: 400rpx;
			margin-top: 30rpx;
		}
	}
</style>