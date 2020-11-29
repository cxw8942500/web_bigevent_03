$(function () {
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    var layer = layui.layer
    var form = layui.form
    //1.调用初始化文章列表的函数
    initLists()

    function initLists() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)


                //分页函数
                renderPage(res.total)
            }
        })
    }

    //2.获取文章所有分类
    initClass()

    function initClass() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res, message)
                }
                var htmlStr = template('tpl-class', res)
                $('[name=cate_id]').html(htmlStr)
                //2.1重新渲染layui
                form.render()
            }
        })
    }

    //3.筛选
    $('#screen').on('submit', function (e) {
        e.preventDefault()
        //获取值
        // console.log($('[name=cate_id]').val());
        // console.log($('[name=state]').val());
        q.cate_id = $('[name=cate_id]').val()
        q.state = $('[name=state]').val()
        //初始化文章列表
        initLists()

    })


    //4.分页
    var laypage = layui.laypage

    function renderPage(total) {
        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            limit: q.pagesize,
            curr: q.pagenum,
            count: total, //数据总数，从服务端得到
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
                q.pagenum = obj.curr

                //首次不执行
                if (!first) {
                    //do something
                    initLists()
                }
            }
        });
    }

    //5.删除
    $('tbody').on('click', '.btn-del', function () {
        var id = $(this).attr('data-in')
        // console.log(id);
        layer.confirm('是否删除?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //发送ajax
            $.ajax({
                method: 'get',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    // console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)

                    if ($('.btn-del').length === 1 && q.pagenum > 1) {
                        q.pagenum--
                    }
                    initLists()
                }
            })

            layer.close(index);
        });
    })
})