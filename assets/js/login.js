$(function () {
    // 点击去注册用户，注册页面显示，登录页面隐藏
    $('#reg-link').on('click', function () {
        $('.reg-box').show()
        $('.login-box').hide()
    })
    //点击去登录，注册页面隐藏，登录页面显示
    $('#login-link').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })
    //校验表单
    var form = layui.form
    form.verify({
        // 密码框校验
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //确认密码校验
        repwd: function (value) {
            var text = $('.reg-box input[name=password]').val()
            if (text !== value) {
                return '两次密码输入不一致'
            }
        }
    })

    //监听注册表单
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form_reg input[name=username]').val(),
                password: $('#form_reg input[name=password]').val(),
            },
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message, {
                        icon: 5
                    });
                }
                //提交成功后处理代码
                layer.msg(res.message, {
                    icon: 6
                });
                //去往登录页面
                $('#login-link').click()
                //清空表单内容
                $('#form_reg')[0].reset()
            }
        })
    })



    //监听登录表单
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        //登录
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message, {
                        icon: 5
                    });
                }
                layer.msg(res.message, {
                    icon: 6
                });
                //把token存在本地，以后调用
                localStorage.setItem('token', res.token)
                //跳转页面
                location.href = '/index.html'
            }
        })

    })

})