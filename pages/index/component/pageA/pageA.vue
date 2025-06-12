<template>
	<view>
		<web-view src="https://www.baidu.com"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onReady() {
			// #ifdef APP-PLUS
			var currentWebview = this.$scope.$getAppWebview() //此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效
			setTimeout(function() {
				let wv = currentWebview.children()[0]
				wv.setStyle({top:80})
			}, 1000); //如果是页面初始化调用时，需要延时一下
			// #endif
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
