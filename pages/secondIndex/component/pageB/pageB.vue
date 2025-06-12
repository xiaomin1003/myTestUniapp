<template>
	<view>
		<view class="uni-common-mt">
			<view>
				<!-- <map :latitude="latitude" :longitude="longitude" :markers="covers">
				</map> -->
				<unicloud-map
					ref="map"
					:where="where"
					:width="700"
					:height="900"
					:latitude="latitude"
					:longitude="longitude"
					:default-icon="defaultIcon"
					:custom-icons="customIcons"
				></unicloud-map>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				// title: 'map',
				// latitude: 39.909,
				// longitude: 116.39742,
				// covers: [{
				// 	id: 1,
				// 	latitude: 39.9085,
				// 	longitude: 116.39747,
				// 	// #ifdef APP-PLUS
				// 	iconPath: '../../../../static/app-plus/location@3x.png',
				// 	// #endif
				// 	// #ifndef APP-PLUS
				// 	iconPath: '../../../../static/location.png',
				// 	// #endif
				// }, {
				// 	id: 2,
				// 	latitude: 39.90,
				// 	longitude: 116.39,
				// 	// #ifdef APP-PLUS
				// 	iconPath: '../../../../static/app-plus/location@3x.png',
				// 	// #endif
				// 	// #ifndef APP-PLUS
				// 	iconPath: '../../../../static/location.png',
				// 	// #endif
				// }],
				
				// 查询条件
				where:{
	
				},
				// 你的经纬度，可通过uni.getLocation获取，注意type需传gcj02，同时在电脑端运行时获取到的经纬度是不准的
				latitude: 39.908823,
				longitude: 116.39747,
				defaultIcon: "/static/logo.png", // 默认POI图标
				// 自定义POI图标
				customIcons: [
					{ type: "门店", icon: "/static/logo.png" },
					{ type: "总部", icon: "/static/logo.png" }
				]
			}
		},
		methods: {

		}
	}
</script>
<style lang="scss">
	map {
		width: 750rpx;
		height: 600rpx;
	}
</style>
