$(function () {
    //1.定义验证规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
        //密码规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //不一样的密码
        samePwd: function (value) {
            if (value === $('.layui-form input[name=oldPwd]').val()) {
                return '新密码和旧密码不能一样'
            }
        },
        //两次密码必须相同
        rePwd: function (value) {
            if (value !== $('.layui-form input[name=newPwd]').val()) {
                return '两次密码不一样'
            }
        }
    })

    //提交表单
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('修改密码失败')
                }
                $('.layui-form')[0].reset()
            }
        })
    })
})