export const BaiDuMap = function() {
	return new Promise(function(resolve, reject) {
		let ak = 'zrXGw33yo1Ab18vADy5sQGxSguGtFWnF';
		if (true) {
			// window.init = function() {
			// 	resolve(BaiDuMap);
			// }
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src =
				`https://api.map.baidu.com/api?v=1.0&type=webgl&ak=${ak}&mcode=35:81:1C:D3:2A:63:FB:6B:6E:1C:D4:F7:81:DF:A5:1B:89:57:83:91;uni.UNI342DC80&callback=init`;
			script.onerror = reject;
			document.head.appendChild(script);
		} else {
			resolve();
		}
	})
}

// 判断是否引入了这个百度地图的script标签
// function isIncludeBaiduSrc() {
// 	let srcName = 'https://api.map.baidu.com/api';
// 	let es = document.getElementsByTagName('script');
// 	let sign = false;
// 	for (let i = 0; i < es.length; i++) {
// 		if (es[i]['src'].indexOf(srcName) != -1) {
// 			sign = true;
// 			break;
// 		} else {
// 			sign = false;
// 		}
// 	}
// 	return sign;
// }
