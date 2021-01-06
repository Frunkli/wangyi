// 获取地址栏中的参数信息
var seach1 = location.search;
// 获取操作对象
var btn = document.querySelector('.dl');
//给提交按钮绑定点击事件
btn.onclick=function(){  
    //获取输入框中的value值
    var user=document.getElementById('inputEmail3').value;
    var pass=document.getElementById('inputEmail34').value;
    //使用ajax发送登录请求
    (async function(){
        var p1=await promiseAjax({
            url:'../php/login.php',
            data:`username=${user}&password=${pass}`
        })
       
        //判断返回的结果是否为1
        if(p1==1){
           //判断地址栏中是否有参数
           if(seach1){
               //获取传入的参数
               var newUrl=seach1.split('=')[1]
               //设置cookie
               setCookie('name',user);
               location.href=newUrl
           }else{
               //设置cookie
               setCookie('name',user);
               location.href='./main.html'
           }
        }else{
            alert('账号或密码有误')
        }
    })()
    //阻止表单的默认提交行为
    return false;
}