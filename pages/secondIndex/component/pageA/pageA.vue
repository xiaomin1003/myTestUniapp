<template>
	<view class="page">
		<match-media :min-width="375" :max-width="800" >
			<view>当页面最小宽度 375px， 页面宽度最大 800px 时显示</view>
		</match-media>
		<view class="uni-title uni-common-mt">
			示例
			<text>\nmovable-view 区域小于 movable-area</text>
			<view>{{`position:(${x},${y})`}}</view>
			<view>{{`position:(${old.x},${old.y})`}}</view>
		</view>
		<movable-area class="movable-area">
			<movable-view class="movable-view" out-of-bounds :x="x" :y="y" direction="all" @change="onChange">text</movable-view>
		</movable-area>
		<view @tap="tap" class="uni-link uni-center uni-common-mt">
			点击这里移动至 (30px, 30px)
		</view>
		<view @tap="retap" class="uni-link uni-center uni-common-mt">
			重置
		</view>
		<progress :percent="percent" show-info stroke-width="3" active="forwards" @activeend="completeProgress" />
		<view @tap="setProgress" class="uni-link uni-center uni-common-mt">
			开始
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<button type="default" open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber">获取手机号</button>
		<!-- #endif -->
		<audio style="text-align: left" :src="current.src" :poster="current.poster" :name="current.name" :author="current.author" :action="audioAction" controls></audio>
		
		<!-- #ifdef MP-WEIXIN -->
		<camera device-position="back" flash="off" @error="error" style="width: 100%; height: 300px;"></camera>
		<button type="primary" @click="takePhoto">拍照</button>
		<image mode="widthFix" :src="src"></image>
		<!-- #endif -->
		
		<view class="uni-padding-wrap uni-common-mt">
			<view>
				<video id="myVideo" src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4"
					@error="videoErrorCallback" :danmu-list="danmuList" enable-danmu danmu-btn controls></video>
			</view>
			<!-- #ifndef MP-ALIPAY -->
			<view class="uni-list uni-common-mt">
				<view class="uni-list-cell">
					<view>
						<view class="uni-label">弹幕内容</view>
					</view>
					<view class="uni-list-cell-db">
						<input v-model="danmuValue" class="uni-input" type="text" placeholder="在此处输入弹幕内容" />
					</view>
				</view>
			</view>
			<view class="uni-btn-v">
				<button @click="sendDanmu" class="page-body-button">发送弹幕</button>
			</view>
			<!-- #endif -->
			<view>
				<view v-for="(item,index) in refreshList" :key="'refresh'+index">{{item}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				x: 0,
				y: 0,
				old: {
					x: 0,
					y: 0
				},
				percent: 0,
				current: {
					poster: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/music-a.png',
					name: '致爱丽丝',
					author: '暂无',
					src: 'https://web-ext-storage.dcloud.net.cn/uni-app/ForElise.mp3',
				},
				audioAction: {
					method: 'pause'
				},
				videoContext: '',
				src: '',
				refreshList: [
					'滑到底部刷新文档1111',
					'滑到底部刷新文档22222',
					'滑到底部刷新文档1111',
					'滑到底部刷新文档22222'
				],
				danmuList: [{
						text: '第 1s 出现的弹幕',
						color: '#ff0000',
						time: 1
					},
					{
						text: '第 3s 出现的弹幕',
						color: '#ff00ff',
						time: 3
					}
				],
				danmuValue: ''
			}
		},
		onReady() {
			 // #ifndef MP-ALIPAY
			this.videoContext = uni.createVideoContext('myVideo')
			// #endif
		},
		onReachBottom() {
			console.log('reach page bottom');
			this.loadMoreData()
		},
		methods: {
			setProgress() {
				let timer = setInterval(() => {
					this.percent += 100
					if (this.percent >= 100) {
						clearInterval(timer)
					}
				},500)
			},
			loadMoreData() {
				let list = ['1111111111111111','222222222222222','33333333333333333333','4444444444444444444','555555555555555555']
				this.refreshList = [...this.refreshList, ...list, ...list]
			},
			completeProgress(e) {
				console.log(e);
			},
			tap: function(e) {
				this.x = this.old.x
				this.y = this.old.y
				this.$nextTick(function() {
					this.x = 30
					this.y = 30
				})
			},
			onChange: function(e) {
				this.old.x = e.detail.x
				this.old.y = e.detail.y
			},
			retap(e) {
				this.x = this.old.x
				this.y = this.old.y
				this.$nextTick(function() {
					this.x = 0
					this.y = 0
				})
			},
			decryptPhoneNumber(e) {
				console.log(e);
			},
			takePhoto() {
				const ctx = uni.createCameraContext();
				ctx.takePhoto({
					quality: 'high',
					success: (res) => {
						this.src = res.tempImagePath
					}
				});
			},
			error(e) {
				console.log(e.detail);
			},
			sendDanmu() {
				this.videoContext.sendDanmu({
					text: this.danmuValue,
					color: this.getRandomColor()
				});
				this.danmuValue = '';
			},
			videoErrorCallback(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
			getRandomColor() {
				const rgb = []
				for (let i = 0; i < 3; ++i) {
					let color = Math.floor(Math.random() * 256).toString(16)
					color = color.length == 1 ? '0' + color : color
					rgb.push(color)
				}
				return '#' + rgb.join('')
			},
		}
	}
</script>

<style lang="scss">
	@import '@/styles/myCommonVar.scss';
	
	.page {
		width: $mainContentWidth;
		.movable-area {
			height: 300rpx;
			width: 100%;
			background-color: #D8D8D8;
			overflow: hidden;
			
			.movable-view {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 150rpx;
				width: 150rpx;
				background-color: #007AFF;
				color: #fff;
			}
		}
	}
</style>
