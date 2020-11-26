$(function () {
    //获取用户信息
    getUserInfo()
    //2.给退出绑定点击事件
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('是否退出？', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //清空本地
            localStorage.removeItem('token')
            //跳转页面
            location.href = '/login.html'
            // 关闭弹出框
            layer.close(index);
        });
    })
})
//后面其他页面还得用，所以封装一个全局获取信息的函数
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message, {
                    icon: 5
                });
            }
            //请求成功，渲染用户头像
            renderAvatar(res.data)
        }
    })
}
//封装一个渲染头像的函数
function renderAvatar(user) {
    //1.用户名，优先用昵称,没有的再用用户名
    var name = user.nickname || user.username
    $('#welcome').html(`欢迎&nbsp;&nbsp;${name}`)
    //2.判断用户有没有上传头像
    if (user.user_pic !== null) {
        //有头像
        $('.layui-nav-img').show().attr('src', user.user_pic)
        $('.text-avatar').hide()
    } else {
        //没有头像
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase()
        $('.text-avatar').show().html(text)
    }
}