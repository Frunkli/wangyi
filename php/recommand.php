<?php
header('content-type:text/html;charset:utf-8');
// 链接数据库
$link = mysqli_connect("localhost","root","","aaa");
// 设置编码
mysqli_set_charset($link,"utf8");
//sql语句
$sql = "select * from recommand";
// 执行sql语句，并返回结果集
$result = mysqli_query($link,$sql);
// 创建数组存储数据
$ar1 = [];
// 遍历结果集中数据添加到数组
while($row=mysqli_fetch_assoc($result)){
    array_push($ar1,$row);
}
echo json_encode($ar1);
?>