$(function () {
    var layer = layui.layer
    var form = layui.form
    //1.获取分类列表数据
    initCate()

    function initCate() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function (res) {
                //   console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                //重新调用layui渲染
                form.render()
            }
        })
    }

    //2.// 初始化富文本编辑器
    initEditor()

    //3.   1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)


    //4.选择图片
    $('#btn-Select').on('click', function () {
        $('#uploading').click()
    })
    //5.监听选择文件
    $('#uploading').on('change', function (e) {
        var file = e.target.files[0]
        if (file === undefined) {
            return
        }
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    var state = null
    $('#btn-save1').on('click', function () {
        state = '已发布'
    })
    $('#btn-save2').on('click', function () {
        state = '草稿'
    })
    //6.给整个表单添加监听事件
    $('#form-pub').on('submit', function (e) {
        e.preventDefault()
        var fd = new FormData(this)
        fd.append('state', state)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                $.ajax({
                    method: "POST",
                    url: '/my/article/add',
                    data: fd,
                    contentType: false,
                    processData: false,
                    success: function (res) {
                        // console.log(res);
                        if (res.status !== 0) {
                            return layer.msg(res.message)
                        }
                        // location.href = '/article/art_list.html'
                        window.parent.document.querySelector('#btn-1list').click()
                    }
                })
            })
    })
})