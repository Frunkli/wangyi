// 地址栏信息
var search = location.search;
// console.log(search);  // ?id=1
// dt：当前页面数据
var dt;

if (search) {
    // 当前地址存在
    var id1 = search.split('?')[1].split('=')[1];
    // console.log(id1);
    // 使用异步函数发送请求,并获取响应结果
    (async function () {
        var p1 = await promiseAjax({
            url: '../php/shopDetail.php',
            data: 'id=' + id1
        })
        // 转换格式
        dt = eval('(' + p1 + ')')
        console.log(dt);
        // 渲染到页面
        var str = '';
        str += `       
            <div class="block-title">
                <span>首页</span>
                <span class="grap"> > </span>
                <span class="grap">${dt.title}</span>
                <span class="flright"><a href="#">分享</a></span>
            </div>
            <!-- 放大镜 -->
            <div class="img-box" style="float: left;">
                <div class="imgBox1">
                    <img src="${dt.xq01}}"
                        alt="">
                    <div class="mark"></div>
                </div>
                <div class="rightBox">
                    <img src="${dt.imgUrl}"
                        alt="">
                </div>
                <div class="imgs">
                    <img src="${dt.xq01}" alt="" class="border1">
                    <img src="${dt.xq02}" alt="">
                    <img src="${dt.xq03}" alt="">
                    <img src="${dt.xq04}" alt="">
                    <img src="${dt.xq05}" alt="">
                </div>
            </div>
            <div class="shop-info">
                <h2 class="shop-info-title" style="width:614px ">${dt.title}</h2>
                <h1 class="shop-info-price">￥<span>${dt.price}</span></h1>
                <p class="promotion">促销： <span>100元 &nbsp;海绵耳机100元券, 无门槛<a href="#">领券</a></span></p>
                <p class="shop-info-color">颜色： <i><span>白色</span> <span>黑色</span> <span>红色</span> <span>黄色</span></i></p>
                <div class="shop-info-num">
                    <span>数量:</span>
                    <div>
                        <a class="a_01"><i>-</i></a>
                        <input type="text" value="1" class="a_03">
                        <a class="a_02"><i>+</i></a>
                    </div>
                </div>
                <div class="shop-info-service">
                    <span>服务:</span>
                    <b>
                        <a href="#">7天无理由退货</a>
                        <a href="#">15天无忧换货</a>
                        <a href="#">满119包邮</a>
                        <a href="#">商家发货</a>
                        <a href="#">网易自营</a>
                        <a href="#">部分地区无法配送</a>
                    </b>
                </div>
                <div class="shopBug">
                    <a href="#">立即购买</a>
                    <a href="#"><i class="iconfont icon-gouwuche"></i>加入购物车</a>
                </div>
            </div>
        </div>
    <div class="container">
        <!-- 商品详情 -->
        <div class="details">
            <h3>商品详情</h3>
            <img src="${dt.xqB01}"
                alt="">
            <img src="${dt.xqB02}"
                alt="">
            <img src="${dt.xqB03}"
                alt="">
        </div>
        <!-- 热门商品 -->
        <div class="shop_hot">
            <h3>热门商品</h3>
            <div class="media">
                <div class="media-left">
                    <a href="#">
                        <img class="media-object" src="../images/detail1.jpg" style="background-color: #F9F9F9;">
                    </a>
                </div>
                <div class="media-body">
                    <h4 class="media-heading"><span>用券减190</span> &nbsp;<a href="#">i19蓝牙5.0真无线耳机 光感入耳 记忆配对 无线充电
                            苹果安卓通用</a></h4>
                    <h5 class="media-price">￥<span>299</span></h5>
                </div>
            </div>
            <div class="media">
                <div class="media-left">
                    <a href="#">
                        <img class="media-object" src="../images/detail1.jpg" style="background-color: #F9F9F9;">
                    </a>
                </div>
                <div class="media-body">
                    <h4 class="media-heading"><span>用券减190</span> &nbsp;<a href="#">i19蓝牙5.0真无线耳机 光感入耳 记忆配对 无线充电
                            苹果安卓通用</a></h4>
                    <h5 class="media-price">￥<span>299</span></h5>
                </div>
            </div>
            <div class="media">
                <div class="media-left">
                    <a href="#">
                        <img class="media-object" src="../images/detail1.jpg" style="background-color: #F9F9F9;">
                    </a>
                </div>
                <div class="media-body">
                    <h4 class="media-heading"><span>用券减190</span> &nbsp;<a href="#">i19蓝牙5.0真无线耳机 光感入耳 记忆配对 无线充电
                            苹果安卓通用</a></h4>
                    <h5 class="media-price">￥<span>299</span></h5>
                </div>
            </div>
        </div>
        `
        document.querySelector('.container1').innerHTML = str;
        // 放大镜
        var box = document.querySelector(".imgBox1");
        // console.log(box);
        var boxImg = box.querySelector("img");

        var mark = document.querySelector('.mark');
        var rightBox = document.querySelector('.rightBox');
        var rightImg = rightBox.querySelector('img');

        var footDiv = document.querySelector('.imgs');
        var imgs = footDiv.querySelectorAll('img');

        // 设置移动函数

        function move(e) {
            var x1 = e.pageX - box.offsetLeft - parseInt(mark.offsetWidth / 2);
            var y1 = e.pageY - box.offsetTop - parseInt(mark.offsetHeight / 2);
            // console.log(x1,y1);
            // 设置边界条件
            var maxX = box.offsetWidth - mark.offsetWidth;
            var maxY = box.offsetHeight - mark.offsetHeight;
            var minX = minY = 0;
            // 设置右边图片移动距离
            var moveX, moveY;
            // 判断水平边界
            if (x1 < minX) {
                mark.style.left = minX + 'px';
                moveX = 0;
            } else if (x1 > maxX) {
                mark.style.left = maxX + 'px';
                moveX = maxX;
            } else {
                mark.style.left = x1 + "px";
                moveX = x1;
            }
            // 垂直方向
            if (y1 < minY) {
                mark.style.top = minY + "px";
                moveY = 0;
            } else if (y1 > maxY) {
                mark.style.top = maxY + "px";
                moveY = maxY;
            } else {
                mark.style.top = y1 + "px";
                moveY = y1;
            }

            // 设置右边图片移动
            rightImg.style.left = -2 * moveX + "px";
            rightImg.style.top = -2 * moveY + "px";
        }
        box.onmouseover = function (e) {
            var e = e || window.event;
            mark.style.display = "block";
            rightBox.style.display = "block";
        }

        box.onmouseout = function () {
            mark.style.display = "none";
            rightBox.style.display = "none";
        }

        box.onmousemove = function (e) {
            var e = e || window.event;
            move(e);
        }

        // 遍历所有小图片中的图像
        for (var i = 0; i < imgs.length; i++) {
            // 给每个小图片绑定点击事件
            imgs[i].onclick = function () {
                // 清空小图片的所有class属性
                for (var a = 0; a < imgs.length; a++) {
                    imgs[a].className = "";
                }
                // 在给当选中的图片加class属性
                this.className = "border1";
                // 获取当前图片对象src属性
                var src1 = this.getAttribute("src");
                // 给上面左右盒子中的图片设置src属性值
                boxImg.setAttribute("src", src1);
                rightImg.setAttribute("src", src1);
            }
        }
        // 颜色选择
        var shopInfo = document.querySelector('.shop-info-color');
        var shopI = shopInfo.querySelector('i');
        var spans = shopI.querySelectorAll('span');
        // console.log(spans);
        for (let i = 0; i < spans.length; i++) {
            spans[i].onclick = function () {
                for (let j = 0; j < spans.length; j++) {
                    spans[j].className = ""
                }
                // console.log(this);
                // this.className = 'd33a31'
                this.classList.add('d33a31')
            }
        }
        // 数量
        var subNum = document.querySelector('.a_01');
        var addNum = document.querySelector('.a_02');
        var inpNum = document.querySelector('.a_03');
        if (inpNum.value == 1) {
            subNum.style.color = '#e5e5e5'
        }
        subNum.onclick = function () {
            if (inpNum.value != 1) {
                inpNum.value--;
                if (inpNum.value == 1) {
                    subNum.style.color = '#e5e5e5'
                }
            }
        }
        addNum.onclick = function () {
            inpNum.value++
            subNum.style.color = '#000'
        }

        var shopInfo1 = document.querySelector('.shop-info');
        shopInfo1.onclick = function (e) {
            var e = e || window.event;
            var target = e.target || e.srcElement;
            // 判断点击的是否为购物车
            if (target.innerText == '加入购物车') {
                // 点击之后将商品放入localStorage里面
                var cartList = localStorage.getItem("cartList");
                console.log(cartList);
                if (cartList) {
                    var a = 0 //判断要添加的数据是否存在
                    //把字符串转为数组对象
                    cartList = JSON.parse(cartList)
                    //遍历cartlist数组中所有数据
                    cartList.forEach((item) => {
                        //当前满足条件时，代表当前添加的数据在localStorage中存在
                        if (item.id == dt.id) {
                            item.cart_number = ++item.cart_number
                            a++
                            localStorage.setItem('cartList', JSON.stringify(cartList))
                        }
                    })
                    //判断当前添加的商品是否存在
                    if (a == 0) {
                        //修改添加的商品数量
                        dt.cart_number = 1
                        //把当前商品追加到cartList数组中
                        cartList.push(dt)
                        //更新localStorage中的数据
                        localStorage.setItem('cartList', JSON.stringify(cartList))
                    }
                } else {
                    //修改添加的商品数量
                    dt.cart_number = 1
                    //在localStrong设置一个cartList属性
                    localStorage.setItem('cartList', JSON.stringify([dt]))
                }
            }
        }

    })()
} else {
    alert('非法进入');
    location.href = './index.html';

}
