<template>
	<view class="right-window">
		<view class="content">{{content}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '123456789'
			};
		}
	}
</script>

<style lang="scss">
	.right-window {
		width: 100%;
		height: 60vh;
		background: linear-gradient(0deg, #66ccff, #6bff7c);
		
		.content {
			color: #ff0000;
		}
	}
</style>
