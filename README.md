## File upload demo
一个简单的文件上传demo，主要内容如下：

* 前端如何使用原生XMLHttpRequest进行异步文件上传
* NodeJS express服务端如何处理文件上传

项目启动
```bash
npm install
npm start
```

## 另外两个示例

* 前端如何使用ajax进行异步文件上传(ajax_static\ajax_index.html)
* 拖拽文件上传(drap_file\dragInfo.html)

## 知识点

### type=text input 获取file的三种方式：
```
//dom元素直接获取
 document.getElementById("chooseFile").files[0];
```
```
//change事件
  var file = document.querySelector('#file');
  file.addEventListener('change', previewImage, false);
  function previewImage(event) {
      event.target.files[0]
    }
```
```
//formData 方式
<form enctype="multipart/form-data" method="post" name="fileinfo">
  <input type="file" name="fileName" required />
</form>
var form = document.forms.namedItem("fileinfo");
var oData = new FormData(form);
var file = oData.get('fileName')
```

### drag 获取file方式：
参考：drap_file\dragInfo.html
```
evt.dataTransfer.files
```

### 上传过程：
选择文件、预览、上传到服务器、服务器上传进度、服务器上传成功

### FormData与文件上传
文件上传必须要使用FormData对文件流进行表单序列化，这样才可以被服务器端解析。
下面是三种服务器端上传图片的示例，每种示例都使用了formData进行文件流表格序列化：
```
 var formData = new FormData();
 formData.append('test-upload', file.files[0]);
 xhr.upload.onprogress = setProgress;
```
```
let file = document.getElementById("chooseFile").files[0];
let formData = new FormData();
formData.append("avatar", file);
$.ajax({
    type: 'POST',
    url: '/profile',
    data: formData,
    async: false,
    cache: false,
    contentType: false,
    processData: false,
    success: function (data) {
        $(".newImg").attr("src", data.filePath);
    },
    error: function (err) {
        console.log(err.message);
    }
})
```
```
 <form method='post' action='/profile' enctype='multipart/form-data'>
    选择图片：<input name="avatar" id='upfile' type='file'/>
    <input type='submit' value='提交'/>
 </form>
```
### 上传技术说明
FileReader 实现图片预览
通过FormData将file表格序列化，这样才能被post框架接收为参数，传给后台，并被后台识别；
上传的进度条和成功处理通过post框架的相关事件做：
以原生为例：
```
xhr.onload = uploadSuccess; //成功处理
xhr.upload.onprogress = setProgress;  //进度处理
```

### 其他技术点
```
dragenter
dragover
dragleave
drop
```
