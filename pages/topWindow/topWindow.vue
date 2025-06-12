<template>
	<view class="top-window">
		<text style="color: #000000;">{{content}}</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: 'this is my top window content'
			};
		}
	}
</script>

<style lang="scss">
	.top-window {
		width: 100%;
		height: 100%;
		background-color: #b6b6b6;
	}
</style>
