$(function () {
    //1.获取文章数据，渲染页面
    initTable()
    //封装一个获取带渲染的函数
    var layer = layui.layer
    var form = layui.form

    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    //2.添加文章
    var indexAdd = null
    $('#tbnAdd').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    })

    //2.1.监听添加表单
    $('body').on('submit', '#form_add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //重新渲染页面
                initTable()
                //关闭弹出框
                layer.close(indexAdd)
            }
        })
    })


    //3.编辑功能
    var indexEait = null
    $('tbody').on('click', '.btn-eait', function () {
        indexEait = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加文章分类',
            content: $('#dialog-Eait').html()
        });
        var id = $(this).attr('data-in')
        //3.1给表单赋值
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val('form_eait', res.data)
            }
        })
    })
    //3.2添加功能
    $('body').on('submit', '#form_eait', function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //重新渲染
                initTable()
                //关闭弹出框
                layer.close(indexEait)
            }
        })
    })

    //4.删除功能
    $('tbody').on('click', '.btn-dele', function () {
        var id = $(this).attr('data-in')
        layer.confirm('是否删除？', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //删除文章
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    // console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    initTable()
                }
            })
            layer.close(index);
        });
    })


})