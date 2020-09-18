// 请求头
var header = 'application/x-www-form-urlencoded'
var headerPost = 'application/json'
// 对外接口
export function request({
	method,
	url,
	params,
	loading
}) {
	// #ifndef H5
	        var url1 = 'http://hnhlyt.ticp.net' + url
	       //var url1 = 'http://hnhlyt.ticp.net/prod-api' + url
	console.log('url1',url1);
	// #endif
	// #ifdef H5
	var url1 = url
	var url1 = '/prod-api'+url
	// #endif
	if (!loading) {
		uni.showLoading({
			title: '加载中...',
			icon: 'loading',
			mask: true
		});
	}
	console.log('sssssssssssss',method);
	if (method == 'Get') {
		return get(url1, params)
	} else if (method == 'Post') {
		return post(url1, params)
	} else if (method == 'Postquery') {
		return postquery(url1, params)
	}
}

// 封装get方法
function get(url, params) {
	var Authorization = uni.getStorageSync('Authorization');
	return new Promise((resolve, reject) => {
		uni.request({
			url: url, //仅为示例，并非真实接口地址。
			method: "GET",
			data: params,
			dataType: 'json',
			header: {
				'content-type': header,
				'Authorization': Authorization
			},
			success: (res) => {
				uni.hideLoading();
				if(res.data.code==200){
					resolve(res.data);
				}else{
					erry(res)
					reject(res.data)
				}
				
			},
			fail: (err) => {
				uni.hideLoading();
				if (err) {
					uni.showToast({
						title: err.data,
						icon: "none",
						duration: 2000
					});
					reject(err.data)
				} else {
					uni.showToast({
						title: '请检查网络后重试',
						duration: 2000,
						icon: 'none',
					});
					reject(new Error('请检查网络后重试'))
				}
			}
		});
	})
}

// 封装post方法
function post(url, params) {
	var Authorization = uni.getStorageSync('Authorization');
	var utoken = ''
	if(params&&params.utoken){
		utoken=params.utoken
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: url, //仅为示例，并非真实接口地址。
			method: "POST",
			data: params,
			header: {
				'utoken': utoken,				
				'content-type': headerPost,
				'Authorization': Authorization
			},
			success: (res) => {
				uni.hideLoading();
				console.log(res.data.code)
				if(res.data.code==200){
					resolve(res.data);
				}else{
					erry(res)
					reject(res.data)
				}
			},
			fail: (err) => {
				uni.hideLoading();
				if (err) {
					uni.showToast({
						title: err.data,
						icon: "none",
						duration: 2000
					});
					reject(err.data)
				} else {
					uni.showToast({
						title: '请检查网络后重试',
						duration: 2000,
						icon: "loading",
					});
					reject(new Error('请检查网络后重试'))
				}
			}
		});
	})
}

function postquery(url, params) {
	var Authorization = uni.getStorageSync('Authorization');
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,//仅为示例，并非真实接口地址。
			method: "POST",
			data: params,
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				'Authorization': Authorization
			},
			success: (res) => {
				uni.hideLoading();
				if(res.data.code==200){
					resolve(res.data);
				}else{
					erry(res)
					reject(res.data)
				}
			},
			fail: (err) => {
				uni.hideLoading();
				if (err) {
					uni.showToast({
						title: err.data,
						icon: "none",
						duration: 2000
					});
					reject(err.data)
				} else {
					uni.showToast({
						title: '请检查网络后重试',
						icon: "none",
					});
					reject(new Error('请检查网络后重试'))
				}
			}
		});
	})
}
function erry(e){
	uni.showToast({
		title: e.data.msg,
		icon: "none",
	});
	console.log(e.data.msg)
	
	if(e.data.msg.indexOf('登录')!=-1){
		uni.removeStorageSync('Authorization');
		uni.navigateTo({
		    url: '/pages/index/login'
		});
	} 
}
// 请求拦截(请求发出前处理请求)
// axios.interceptors.request.use(
//   confirm => {
//     // 将token放入header，这里用Vuex把token放在store中，取出
//     // const token = _this.store.state.token
//     const config = axios.defaults
//     // token && (config.headers.Authorization = token)
//     console.log(12344, config)
//     return config
//   },
//   error => {
//     console.log(12344, error)
//     return Promise.error(error)
//   }

// )

// 响应拦截器（处理响应数据）
// axios.interceptors.response.use(
  // response => {
    // if (response.status === 200) {
      // return Promise.resolve(response)
    // } else {
      // 这个地方可以由后台编辑状态码区分不同情况，做不同的逻辑处理
      // return Promise.reject(response)
    // }
  // },
  // error => {
    // //请求失败，这个地方可以根据error.response.status统一处理一些界面逻辑，比如status为401未登录,可以进行重定向
    // router.replace({
    //     path: '/login',
    //     query: { redirect: router.currentRoute.fullPath }
    //    });
    // return Promise.reject(error.response)
  // }
// )
