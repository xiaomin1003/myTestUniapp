<template>
	<view class="second-page">
		<!-- #ifdef APP-PLUS |\ H5 -->
		<!-- <view class="nav-view"></view> -->
		<!-- #endif -->
		<view class="title">
			<text>{{title}}</text>
		</view>
		<view @tap="gotoPage('pageA')" class="uni-link uni-center uni-common-mt">
			testA
		</view>
		<view @tap="gotoPage('pageB')" class="uni-link uni-center uni-common-mt">
			testB
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'second',
				firstEnter: true,
				active: false,
			};
		},
		onShow() {
			// uni.setTabBarBadge({
			//   index: 0,
			//   text: '10'
			// })
			// uni.removeTabBarBadge({
			// 	index: 1
			// })
			console.log('showwwwww')
			if (this.firstEnter) {
				this.firstEnter = false
			} else {
				this.active = true
			}
		},
		onHide() {
			console.log('hideeeeeee')
		},
		onLoad() {
			
		},
		onUnload() {
			console.log('pageunload')
			this.firstEnter = true
			this.active = false
		},
		onPullDownRefresh() {
			this.title = '正在下拉刷新中'
			setTimeout(() => {
				uni.stopPullDownRefresh()
				this.title = '已经完成下拉刷新'
			},2000)
		},
		onTabItemTap : function(e) {
			console.log(e);
			// e的返回格式为json对象： {"index":0,"text":"首页","pagePath":"pages/index/index"}
			const pages = getCurrentPages();
			const page = pages[pages.length - 1];
			console.log(page.route);
			if (this.active) {
				this.active = false
				return
			}
			this.title = '正在下拉刷新中'
			uni.startPullDownRefresh()
			setTimeout(() => {
				uni.stopPullDownRefresh()
				this.title = '已经完成下拉刷新'
			},2000)
		},
		methods: {
			gotoPage(e) {
				const url = '/pages/secondIndex/component/' + e + '/' + e
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '@/styles/myCommonVar.scss';
	
	.second-page {
		width: $mainContentWidth;
		.nav-view {
			/* #ifdef APP-PLUS */
			height: var(--status-bar-height);
			/* #endif */
			/* #ifdef H5 */
			height: var(--window-top);
			/* #endif */
			background-color: #66ccff;
		}
		.title {
			color: #66ccff;
			height: 20vw;
			font-size: 3vw;
			display: flex;
			justify-content: center;
			align-items: center;
			// background: url('/static/logo.png') 100% 100% no-repeat;
		}
		
	}
</style>
