<template>
	<view class="container">

		<uni-section title="打卡" type="line">
			<view class="example">
				<!-- 基础用法，不包含校验规则 -->
				<uni-forms ref="baseForm" :modelValue="studentData">
					<uni-forms-item label-width="100" label="姓名" required>
						<uni-easyinput v-model="studentData.name" placeholder="请输入姓名" />
					</uni-forms-item>
					<uni-forms-item label-width="100" label="学号" required>
						<uni-easyinput v-model="studentData.username" placeholder="请输入学号" />
					</uni-forms-item>

					<uni-forms-item label-width="100" label="班级" required>
						<uni-data-picker placeholder="请选择班级" popup-title="请选择所在班级" :localdata="dataTree"
							v-model="studentData.classes" @change="onchange">
						</uni-data-picker>
					</uni-forms-item>

					<!-- 		<view class="form-item">
						<uni-forms-item label-width="100" label="是否在校" required>
							<uni-data-checkbox v-model="studentData.inSchool" :localdata="schoolList" />

						</uni-forms-item>
						
					</view> -->

					<uni-forms-item label-width="100" label="进出学校" required>
						<uni-data-checkbox v-model="studentData.outSchool" :localdata="schoolList" />
					</uni-forms-item>

					<uni-forms-item label-width="100" label="进出时间" v-if="studentData.outSchool ? 1 : 0">
						<uni-datetime-picker v-model="studentData.datetimerange" type="datetimerange"
							rangeSeparator="至" />
					</uni-forms-item>

				</uni-forms>

				<button class="button" type="primary" @click="submit">进行定位</button>
				<!-- <button class="btn" type="primary" @click="submit">提交</button> -->
			</view>
		</uni-section>


	</view>
</template>


<script>
	import getDateTime from '@/utils/getdateTime.js'
	import {
		checkIn,
		getRecord
	} from '@/api/index.js'
	export default {
		data() {
			return {
				// checkDate: '',
				studentData: {
					name: '',
					username: '',
					classes: '1',
					speciality: '', // 专业
					inSchool: 0, // 0 不在 1 在
					outSchool: 0, // 0 不出 1 出
					checkDate: '',
					checkTime: '',
					datetimerange: []
				},
				schoolList: [{
					text: '是',
					value: 1
				}, {
					text: '否',
					value: 0
				}],

				dataTree: [{
						text: "信息安全",
						value: "信息安全",
						children: [{
								text: "191班",
								value: "191"
							},
							{
								text: "192班",
								value: "192"
							},
							{
								text: "193班",
								value: "193"
							},
							{
								text: "194班",
								value: "194"
							}
						]
					},
					{
						text: "网络工程",
						value: "网络工程",
						children: [{
								text: "191班",
								value: "191"
							},
							{
								text: "192班",
								value: "192"
							},
							{
								text: "193班",
								value: "193"
							},
							{
								text: "194班",
								value: "194"
							}
						]
					},
					{
						text: "物联网工程",
						value: "物联网工程",
						children: [{
								text: "191班",
								value: "191"
							},
							{
								text: "192班",
								value: "192"
							}
						]
					}
				]

			}
		},
		computed: {
			// 处理表单排列切换

		},
		onLoad() {
			this.studentData.username = uni.getStorageSync("username")
			this.studentData.name = uni.getStorageSync("name")
			// this.getRecord()
		},
		onReady() {

		},
		methods: {
			submit() {
				console.log(this.studentData);
				this.studentData.checkDate = getDateTime.dateTimeStr('y-m-d')
				this.studentData.checkTime = getDateTime.dateTimeStr('h:i:s')
				console.log(this.studentData.checkDate);
				// this.checkIn()
				const data = {
					name: this.studentData.name,
					username: this.studentData.username,
					speciality: this.studentData.speciality,
					classes: this.studentData.classes,
					// inSchool: this.studentData.inSchool, // 0 不在 1 在
					outSchool: this.studentData.outSchool, // 0 不出 1 出
					checkDate: this.studentData.checkDate,
					checkTime: this.studentData.checkTime
				}
				console.log('data', data);
				// uni.request({
				// 	url: "http://localhost:3000/api/checkIn",
				// 	method: 'POST',
				// 	data: data,
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

				uni.setStorageSync("isCheckIn", true)

				uni.navigateTo({
					url: `/pages/position/position?name=${this.studentData.name}&username=${this.studentData.username}&speciality=${this.studentData.speciality}&classes=${this.studentData.classes}&outSchool=${this.studentData.outSchool}`
				})
				// uni.navigateTo({
				// 	url: `/pages/index/index?checkDate=${this.studentData.checkDate}`
				// })
			},
			toPosition() {
				uni.navigateTo({
					url: `/pages/position/position?studentData=${this.studentData}`
				})
			},

			onchange(e) {
				console.log('onchange:', e);
				this.studentData.speciality = e.detail.value[0].value
			},
			checkIn() {
				checkIn({

					name: this.studentData.name,
					username: this.studentData.username,
					speciality: this.studentData.speciality,
					classes: this.studentData.classes,
					inSchool: this.studentData.inSchool, // 0 不在 1 在
					outSchool: this.studentData.outSchool, // 0 不出 1 出
					checkDate: this.studentData.checkDate,


				}).then(res => {
					console.log('2222asd', res);
				})
			}


		}
	}
</script>

<style lang="scss">
	.example {
		padding: 15px;
		background-color: #fff;
	}

	.segmented-control {
		margin-bottom: 15px;
	}

	.button-group {
		margin-top: 15px;
		display: flex;
		justify-content: space-around;
	}

	.form-item {
		display: flex;
		align-items: center;
		justify-content: left;

		/deep/.uni-forms-item {
			margin: 0 40rpx 0 0;
		}

		.button {
			// width: 100rpx;
			width: 400rpx;
			margin: 50rpx auto;
		}
	}


	.btn {
		width: 650rpx;
		margin: 80rpx auto;
	}
</style>