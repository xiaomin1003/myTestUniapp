<template>
	<view class="page">
		<image class="logo" src="/static/logo.png" @click="onChangeRefreshStatus"></image>
		<view class="text-area">
			<view class="title">{{now}}</view>
			<view class="title">{{getNow()}}</view>
		</view>
		<view @tap="gotoPage('pageA')" class="uni-link uni-center uni-common-mt">
			testA
		</view>
		<view @tap="gotoPage('pageB')" class="uni-link uni-center uni-common-mt">
			testB
		</view>
		<view @tap="gotoPage('pageC')" class="uni-link uni-center uni-common-mt">
			testC
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				isSupport: true,
				showMask: false,
			}
		},
		computed: {
			now(){
				return Date.now()
			}
		},
		onLoad() {
			
		},
		onShow() {
			// uni.setTabBarBadge({
			//   index: 1,
			//   text: '10'
			// })
			// uni.removeTabBarBadge({
			// 	index: 0
			// })
		},
		onBackPress() {  
		   if(this.showMask) {  
		     this.showMask = false;  
		     return true;  
		   }else{  
		      uni.showModal({  
		        title: '提示',  
		        content: '是否退出uni-app？',  
		        success: function(res) {  
		            if (res.confirm) {  
		                // 退出当前应用，改方法只在App中生效  
		                plus.runtime.quit();  
		            } else if (res.cancel) {  
		                console.log('用户点击取消');  
		            }  
		        }  
		      });  
		      return true  
		   }  
		},
		onPullDownRefresh() {
			this.title = '正在下拉刷新中'
			setTimeout(() => {
				uni.stopPullDownRefresh()
				this.title = '已经完成下拉刷新'
			},2000)
		},
		onReachBottom() {
			console.log('reach page bottom');
			this.loadMoreData()
		},
		methods: {
			gotoPage(e) {
				const url = '/pages/index/component/' + e + '/' + e
				uni.navigateTo({
					url: url
				})
			},
			getNow() {
				return Date.now()
			},
			loadMoreData() {
				
			},
			onChangeRefreshStatus() {
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];  
				const currentWebview = page.$getAppWebview();
				currentWebview.setStyle({  
				  pullToRefresh: {  
				    support: !this.isSupport,  
				    style: plus.os.name === 'Android' ? 'circle' : 'default'  
				  }  
				});  
				this.isSupport = !this.isSupport;
				if (this.isSupport) {
					uni.showToast({
						icon:'none',
						title: '页面下拉刷新已开启'
					})
				} else {
					uni.showToast({
						icon:'none',
						title: '页面下拉刷新已关闭'
					})
				}
				// #endif
			}
		}
	}
</script>

<style lang="scss">
	@import '@/styles/myCommonVar.scss';
	
	.page {
		width: $mainContentWidth;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
		.logo {
			height: 10vw;
			width: 10vw;
			margin-top: 10vw;
			margin-left: auto;
			margin-right: auto;
			margin-bottom: 5vw;
		}
		
		.text-area {
			display: flex;
			justify-content: center;
			flex-direction: column;
			
			.title {
				font-size: 3vw;
				color: #8f8f94;
			}
		}
	}
</style>
