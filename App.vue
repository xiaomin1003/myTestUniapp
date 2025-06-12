<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			
			const launchOptions = uni.getLaunchOptionsSync();
			console.log('启动:', launchOptions);
			
			uni.getSystemInfo({
				success: function (res) {
					console.log(res,'systemInfo')
				}
			});
			
			// #ifdef APP-PLUS || MP-WEIXIN
			const appAuthorizeSetting = uni.getAppAuthorizeSetting()
			console.log('appAuthorizeSetting',appAuthorizeSetting);
			// #endif
			
			uni.onTabBarMidButtonTap(() => {
				console.log('中间按钮被点击');
				// 自定义行为，例如跳转到指定页面
				uni.switchTab({
					url: '/pages/index/index'
				});
			});
			
		},
		onShow: function() {
			console.log('App Show')
			let pages = getCurrentPages(); // 获取所有页面栈实例列表
			
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import '@/common/uni.css';
	@import "@/static/icons/iconfont.css";
	/*每个页面公共css */
	
	/* 隐藏所有页面的 navigationBar */
	.uni-app--showrightwindow uni-page-head {
		display: none;
	}
	
	.uni-app--showrightwindow page {
		width: 80vw;
	}
	
	/* 显示路径为 pages/secondIndex/secondIndex 页面的 navigationBar */
	.uni-app--showrightwindow [data-page="pages/secondIndex/secondIndex"] uni-page-head {
		display: block;
	}
</style>
