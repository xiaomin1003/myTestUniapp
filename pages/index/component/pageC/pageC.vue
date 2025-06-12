<template>  
    <view>
        <!-- <page-head title="通过scheme打开三方app示例"></page-head> -->
        <button class="button" @click="openBrowser('https://uniapp.dcloud.io/h5')">使用浏览器打开指定URL</button>  
        <button class="button" @click="openMarket()">使用应用商店打开指定App</button>  
        <button class="button" @click="openMarket('com.tencent.android.qqdownloader')">强制使用应用宝打开指定App</button>  
        <button class="button" @click="openTaobao('taobao://s.taobao.com/search?q=uni-app')">打开淘宝搜索页面</button>  
        <button class="button" @click="openMap()">打开地图并指定地点</button>  
        <view class="uni-divider">  
            <view class="uni-divider__content">打开QQ(qq号和群号二选一)</view>  
            <view class="uni-divider__line"></view>  
        </view>  
        <view class="uni-padding-wrap">  
            <form @submit="openQQ">
				<radio-group @change="radioChange">
					<view class="uni-list">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
							<view style="flex: 1;">
								<radio :value="item.value" :checked="item.value === qqform.type" />
							</view>
							<view style="flex: 1;">{{item.name}}</view>
						</label>
					</view>
				</radio-group>
                <view v-if="qqform.type === '0'">  
                    <view class="uni-title">请输入聊天对象QQ号：</view>  
                    <view class="uni-input-item">
                         <input class="uni-input" name="qqNum" type="number" @input="qqNumInput"/>
                    </view>  
                </view>
                <view v-if="qqform.type === '0'">  
                    <view class="uni-title">请选择QQ号类型：</view>  
                    <radio-group class="uni-flex" name="qqNumType">  
                        <label>  
                            <radio value="wpa" checked=""/>普通QQ号</label>  
                        <label>  
                            <radio value="crm" />营销QQ号(无需加好友直接聊天)</label>  
                    </radio-group>  
                </view>
				<view v-if="qqform.type === '1'">
				    <view class="uni-title">请输入聊天QQ群号：</view>  
				    <view class="uni-input-item">
				         <input class="uni-input" name="qqQunNum" type="number" @input="qqQunNumInput"/>
				    </view>  
				</view>
                <view class="uni-btn-v uni-common-mt">  
                    <button class="button" formType="submit">打开qq并到指定聊天界面</button>
                </view>  
            </form>  
        </view>  
    </view>  
</template>  

<script>  
export default {  
    data() {  
        return {  
			qqform: {
				qqNum: '',
				qqQunNum: '',
				type: '0'
			},
			items: [
				{
					value: '0',
					name: '个人',
					checked: 'true'
				},
				{
					value: '1',
					name: '群聊'
				},
			],
        };  
    },  
    methods: {  
        openBrowser(url){  
            plus.runtime.openURL(url)  
        },
		qqNumInput(e) {
			this.$set(this.qqform,'qqNum',e.target.value)
		},
		qqQunNumInput(e) {
			this.$set(this.qqform,'qqQunNum',e.target.value)
		},
		radioChange: function(evt) {
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].value === evt.detail.value) {
					this.qqform.type = evt.detail.value;
					break;
				}
			}
		},
        openMarket(marketPackageName) {  
            var appurl;  
            if (plus.os.name=="Android") {  
                appurl = "market://details?id=io.dcloud.HelloH5"; //由于hello uni-app没有上Android应用商店，所以此处打开了另一个示例应用  
            }  
            else{  
                appurl = "itms-apps://itunes.apple.com/cn/app/hello-uni-app/id1417078253?mt=8";  
            }  
            if (typeof(marketPackageName)=="undefined") {  
                plus.runtime.openURL(appurl, function(res) {  
                    console.log(res);  
                });  
            } else{//强制指定某个Android应用市场的包名，通过这个包名启动指定app  
                if (plus.os.name=="Android") {  
                    plus.runtime.openURL(appurl, function(res) {  
                        plus.nativeUI.alert("本机没有安装应用宝");  
                    },marketPackageName);  
                } else{  
                    plus.nativeUI.alert("仅Android手机才支持应用宝");  
                }  
            }  
        },  
        openTaobao(url){  
            plus.runtime.openURL(url, function(res) {  
                uni.showModal({  
                    content:"本机未检测到淘宝客户端，是否打开浏览器访问淘宝？",  
                    success:function(res){  
                        if (res.confirm) {  
                            plus.runtime.openURL("https://s.taobao.com/search?q=uni-app")  
                        }  
                    }  
                })  
            });  
        },  
        openMap(){  
            var url = "";  
            if (plus.os.name=="Android") {  
                var hasBaiduMap = plus.runtime.isApplicationExist({pname:'com.baidu.BaiduMap',action:'baidumap://'});  
                var hasAmap = plus.runtime.isApplicationExist({pname:'com.autonavi.minimap',action:'androidamap://'});  
                var urlBaiduMap = "baidumap://map/marker?location=39.968789,116.347247&title=DCloud&src=Hello%20uni-app";  
                var urlAmap = "androidamap://viewMap?sourceApplication=Hello%20uni-app&poiname=DCloud&lat=39.9631018208&lon=116.3406135236&dev=0"  
                if (hasAmap && hasBaiduMap) {  
                    plus.nativeUI.actionSheet({title:"选择地图应用",cancel:"取消",buttons:[{title:"百度地图"},{title:"高德地图"}]}, function(e){  
                        switch (e.index){  
                            case 1:  
                                plus.runtime.openURL(urlBaiduMap);  
                                break;  
                            case 2:  
                                plus.runtime.openURL(urlAmap);  
                                break;  
                        }  
                    })  
                }  
                else if (hasAmap) {  
                    plus.runtime.openURL(urlAmap);  
                }  
                else if (hasBaiduMap) {  
                    plus.runtime.openURL(urlBaiduMap);  
                }  
                else{  
                    url = "geo:39.96310,116.340698?q=%e6%95%b0%e5%ad%97%e5%a4%a9%e5%a0%82";  
                    plus.runtime.openURL(url); //如果是国外应用，应该优先使用这个，会启动google地图。这个接口不能统一坐标系，进入百度地图时会有偏差  
                }  
            } else{  
                // iOS上获取本机是否安装了百度高德地图，需要在manifest里配置，在manifest.json文件app-plus->distribute->apple->urlschemewhitelist节点下添加（如urlschemewhitelist:["iosamap","baidumap"]）  
                plus.nativeUI.actionSheet({title:"选择地图应用",cancel:"取消",buttons:[{title:"Apple地图"},{title:"百度地图"},{title:"高德地图"}]}, function(e){  
                    console.log("e.index: " + e.index);  
                    switch (e.index){  
                        case 1:  
                            url = "http://maps.apple.com/?q=%e6%95%b0%e5%ad%97%e5%a4%a9%e5%a0%82&ll=39.96310,116.340698&spn=0.008766,0.019441";  
                            break;  
                        case 2:  
                            url = "baidumap://map/marker?location=39.968789,116.347247&title=DCloud&src=Hello%20uni-app";  
                            break;  
                        case 3:  
                            url = "iosamap://viewMap?sourceApplication=Hello%20uni-app&poiname=DCloud&lat=39.9631018208&lon=116.3406135236&dev=0";  
                            break;  
                        default:  
                            break;  
                    }  
                    if (url!="") {  
                        plus.runtime.openURL( url, function( e ) {  
                            plus.nativeUI.alert("本机未安装指定的地图应用");  
                        });  
                    }  
                })  
            }  
        },  
        openQQ: function (e) {
            console.log("e.detail.value: " + JSON.stringify(e.detail.value));  
            // 没有校验qq号是否为空或合法数字，如果不是可用的qq号，启动qq后会停留在qq主界面
			if (e.detail.value.qqNum) {
				plus.runtime.openURL('mqqwpa://im/chat?chat_type=' + e.detail.value.qqNumType + '&uin=' + e.detail.value.qqNum,function (res) {
				    plus.nativeUI.alert("本机没有安装QQ，无法启动");  
				});
			} else if (e.detail.value.qqQunNum) { //827143905
				//let key = 'MH9WPBzP4_sZP5YGVf_UuyKRcpyMQk-I';
				//let mrl = `mqqopensdkapi://bizAgent/qm/qr?url=http%3A%2F%2Fqm.qq.com%2Fcgi-bin%2Fqm%2Fqr%3Ffrom%3Dapp%26p%3Dandroid%26k%3D` + key
				//plus.runtime.openURL(mrl);
				
				let url = `mqqapi://card/show_pslcard?src_type=internal&version=1&uin=${e.detail.value.qqQunNum}&card_type=group&source=qrcode`
				plus.runtime.openURL(url, function(e) {
				    console.log("Open URL success");
				}, function(e) {
				    console.log("Open URL fail: " + e.message);
				});
			}
        }
    }  
};  
</script>  
<style>  
.button {  
    margin: 30upx;  
    color: #007AFF;  
}
</style>