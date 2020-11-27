$(function () {
    //1.定义表单验证
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '请输入1 ~ 6位'
            }
        }
    })

    //2.用户渲染
    initUserInfo()
    var layer = layui.layer
    var form = layui.form

    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败!')
                }
                // 给表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }

    //3.表单重置
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })
    //4.更新用户的基本信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败!')
                }
                layer.msg('修改用户信息成功!')
                // 调用父元素的更新用户函数和头像的方法
                window.parent.getUserInfo()
            }
        })
    })

})