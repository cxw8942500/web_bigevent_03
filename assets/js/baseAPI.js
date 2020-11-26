//1.开发环境服务器地址
var baseURL = 'http://ajax.frontend.itheima.net'
//2.测试环境服务器地址
// var baseURL = 'http://ajax.frontend.itheima.net'
//3.生产环境服务器地址
// var baseURL = 'http://ajax.frontend.itheima.net'



//拦截所有的ajax请求
$.ajaxPrefilter(function (params) {
    //拼接服务器地址
    params.url = baseURL + params.url

    //对需要权限的接口配置头信息
    //必须以my开头
    if (params.url.indexOf('/my/') !== -1) {
        params.header = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    //拦截所有的ajax，判别身份认证
    params.complete = function(res) {
        console.log(res.responseJSON);
        var obj = res.responseJSON
        if(obj.status == 1 && obj.message === "身份认证失败！") {
            //清空本地存储
            localStorage.removeItem('token')
            //强制跳转页面
            location.href = '/login.html'
        }

    }
})