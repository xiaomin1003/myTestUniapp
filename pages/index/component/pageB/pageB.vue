<template>
	<view class="page">
		<view>
			<uni-icons custom-prefix="iconfont" type="icon-chuhangdingwei" size="30"></uni-icons>
			<uni-icons custom-prefix="iconfont" type="icon-faxian" size="30"></uni-icons>
			<uni-icons custom-prefix="iconfont" type="icon-gouwu" size="30"></uni-icons>
			<uni-icons custom-prefix="iconfont" type="icon-gengduo" size="30"></uni-icons>
			<uni-icons custom-prefix="iconfont" type="icon-jiudian" size="30"></uni-icons>
			<uni-icons custom-prefix="iconfont" type="icon-gongjiaoche" size="30"></uni-icons>
		</view>
		<view class="scroll-item">
			<button type="default" size="mini" @click="scrollToBottom()">到底</button>
			<button type="default" size="mini" @click="scrollToTop()">到顶</button>
		</view>
		<view class="" >
			<scroll-view
			style="height: 18vh;"
			  class="chat-messages"
			  scroll-y
			  id="chatMessages"
			  enable-flex
			  @scrolltolower="scrollToBottom"
			  :scroll-top="scrollTop"
			  scroll-with-animation="true"
			>
			<view class="all" v-for="(item,index) in allList" :key="index">
			{{item}}-{{inputValue}}
			</view>
			</scroll-view>
			<button type="default" size="default" @click="onBigNumber()">bigNumberJs(节流)</button>
			<input class="uni-input" placeholder="请输入文本(防抖)" v-model="inputValue" @input="handleInput" />
			<button type="default" size="default" @click="openUrl()">调用外部浏览器打开</button>
			<button type="default" size="default" @click="luanchApp()">调用第三方程序</button>
		</view>
	</view>
</template>

<script>
	import permision from "@/js_sdk/wa-permission/permission.js"
	import BigNumber from 'bignumber.js'
	export default {
		data() {
			return {
				scrollTop: 0,
				number1: 0.1,
				number2: 0.2,
				bigNumber1: new BigNumber('0.1'),
				bigNumber2: new BigNumber('0.2'),
				allList: [
					'00000000000',
					'11111111111',
					'22222222222',
					'33333333333',
					'44444444444',
					'55555555555',
					'66666666666',
					'77777777777',
					'88888888888',
					'99999999999',
				],
				inputValue: ''
			}
		},
		methods: {
			openUrl() {
				// #ifdef APP-PLUS
				plus.runtime.openURL('https://uniapp.dcloud.io/', function(res) {
				    if (res.code === 0) {
				        console.log('App打开成功');
				    } else {
				        console.log('App打开失败: ' + res.message);
				        // 可在这里添加错误处理逻辑，如提示用户应用未安装
				    }
				});
				// #endif
			},
			luanchApp() {
				let list = [  
					// 只在 ios 中生效  
					{  
						name: 'App Store',  
						scheme: 'itms-apps://'  
					},  
					{  
						name: '支付宝',  
						pname: 'com.eg.android.AlipayGphone',  
						scheme: 'alipay://'  
					},  
					{  
						name: '淘宝',  
						pname: 'com.taobao.taobao',  
						scheme: 'taobao://'  
					},  
					{  
						name: 'QQ',  
						pname: 'com.tencent.mobileqq',  
						scheme: 'mqq://'  
					},  
					{  
						name: '微信',  
						pname: 'com.tencent.mm',  
						scheme: 'weixin://'  
					},  
					{  
						name: '京东',  
						pname: 'com.jingdong.app.mall',  
						scheme: 'openApp.jdMobile://'  
					},  
					{  
						name: '新浪微博',  
						pname: 'com.sina.weibo',  
						scheme: 'sinaweibo://'  
					},  
					{  
						name: '优酷',  
						pname: 'com.youku.phone',  
						scheme: 'youku://'  
					}  
				]
				// #ifdef APP-PLUS
				if (plus.os.name === 'Android') {
				    plus.runtime.launchApplication({
				        pname: 'com.eg.android.AlipayGphone'
				    }, function(e) {
				        if (e.code === 0) {
				            console.log('App打开成功');
				        } else {
				            console.log('App打开失败: ' + e.message);
				            // 可在这里添加错误处理逻辑
				        }
				    });
				} else if (plus.os.name === 'iOS') {
				    // iOS平台需要通过URL Scheme打开
				    plus.runtime.openURL('alipay://', function(res) {
				        if (res.code === 0) {
				            console.log('App打开成功');
				        } else {
				            console.log('App打开失败: ' + res.message);
				            // 可在这里添加错误处理逻辑
				        }
				    });
				}
				// #endif
			},
			handleInput(event) {
				// console.log(event,'event');
				this.debounce(() => {
					console.log('Input value:', event.detail.value);
					// 这里可以执行你的搜索或任何其他操作
				}, 3000)
			},
			// handleInput: debounce((event) => {
			// 	console.log('Input value:', event.detail.value);
			// 	// 这里可以执行你的搜索或任何其他操作
			// }, 500), // 500毫秒后执行
			onBigNumber() {
				this.throttle(() => {
					const sum1 = this.number1 + this.number2
					const sum2 = this.bigNumber1.plus(this.bigNumber2);
					console.log('sum1:',sum1);
					console.log('sum2:', sum2.toString());
				},3000)
			},
			scrollToTop() {
				this.$nextTick(() => {
					this.scrollTop = 0
				})
			},
			scrollToBottom() {
				this.$nextTick(() => {
				const query = uni.createSelectorQuery().in(this)
				query.select('#chatMessages').fields({
				  id: true,
				  dataset: true,
				  rect: true, // 获取布局信息
				  size: true, // 获取宽高
				  scrollOffset: true, // 获取滚动信息
				  scrollHeight: true,
				},  (res) => {
					console.log('完整节点信息:', res)
					if (res && res.scrollHeight) {
					  this.scrollTop = res.scrollHeight
					  console.log('设置成功 scrollTop:', this.scrollTop)
					} else {
					  console.warn('未获取到有效滚动信息', res)
					}
				}).exec()
			  })
			},
			// vue的method里编写如下代码
			async requestAndroidPermission(permisionID) {
			    var result = await permision.requestAndroidPermission(permisionID)
			    var strStatus
			    if (result == 1) {
			        strStatus = "已获得授权"
			    } else if (result == 0) {
			        strStatus = "未获得授权"
			    } else {
			        strStatus = "被永久拒绝权限"
			    }
			    uni.showModal({
			        content: permisionID + strStatus,
			        showCancel: false
			    });
			},
		}
	}
</script>

<style lang="scss">
	.page {
		.scroll-item {
			display: flex;
			flex-direction: row;
			justify-content: space-around;
		}
	}
</style>
