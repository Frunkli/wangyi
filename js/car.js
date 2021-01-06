/*recommand*/
// 获取操作对象
var recommAnd = document.querySelector('.Recommand');
var box = document.querySelector('.cars');
// 使用自执行函数获取数据库中的数据
(async function () {
    var p1 = await promiseAjax({
        url: '../php/recommand.php'
    })
    // 转换数据类型
    // console.log(p1);
    var dt = eval('(' + p1 + ')')
    // console.log(dt);
    // 渲染到页面
    var str = '';
    for (var i = 0; i < 8; i++) {
        str += `<div class="tag">
        <a href="./shopDetail?id=${i + 1}" class="shop_img"><img src="${dt[i].imgUrl}" alt=""></a>
        <p class="p1"><span>${dt[i].zhekou}</span>
            <a href="./shopDetail?id=${i + 1}">${dt[i].title}</a></p>
        <p class="p2">￥<em>${dt[i].price}</em></p>
    </div>`
    }
    recommAnd.innerHTML += str;
})()
var cartlist = localStorage.getItem('cartList') || "[]";
// 获取localStorage里的数据并转换为数组对象
cartlist = JSON.parse(cartlist)
console.log(cartlist);
show1();
function show1() {
    if(cartlist){
        var str = `
    <li class="car-first color_999">
        全部商品&nbsp;(&nbsp;<span>0</span>&nbsp;)
    </li>
    `
    // document.querySelector('ul').innerHTML = str;
    cartlist.forEach(item => {
        str+=`<li style="overflow: hidden;" class = 'shop'>
        <div class="f-fl">
            <input type="checkbox" class="input3" name="xuan">
        </div>
        <div class="f-fr">
            <img src="${item.xq01}" alt="">
        </div>
        <div class="msg">                       
            <p><a href="#">${item.title}</a></p>   
            <i>黄色</i>                    
        </div>
        <div class="price">￥<span>${item.price}</span></div>
        <div class="ctrl">
            <a class="a_01"><i>-</i></a>
            <input type="text" value="1" class="dis">
            <a class="a_02"><i>+</i></a>
        </div>
        <div class="total">￥<span>${item.price}</span></div>
        <div class="delete1">×</div>
    </li>`   
    })
    str+=`
    <li class="car-last">
    <div class="cksbox1"><input type="checkbox" class="input2" name = 'quan'></div>
    <span class="rl1">全选</span>
    <span class="color_999 rl2">已选择&nbsp;<b class="chosen">1</b>&nbsp;件商品</span>
    <span class="rl3"><em class="color_999">已享受运费险 &nbsp;| &nbsp;</em>合计 : <b>￥<i>0</i></b></span>
    <span class="rl4 rl4_1" style="cursor: pointer;">结算</span>
</li>
    `
    document.querySelector('ul').innerHTML = str
    } else {
        var str = `
        <div class="emptyCar">
        <span class="iconfont icon-gouwuche empty_car"></span>
        <h4>购物车还是空的, <a href="./main.html"> 去逛逛> </a></h4>
        </div> 
        `
        box.querySelector('ul').innerHTML = str
    }
    
}
// 全选
var carShop = document.querySelector('.cared');
var checkbox = document.getElementsByName('xuan');
var quan = document.getElementsByName('quan');

var disAble = document.querySelectorAll('.dis');
var shops = document.querySelectorAll('.shop');
var total = document.querySelectorAll('.total');
var price = document.querySelectorAll('.price');
// console.log(box);
// 进入页面的时候就全选
window.onload = () => {
    quan[0].checked = true;
    quan[1].checked = true;
    for (var i = 0; i < checkbox.length; i++) {
        checkbox[i].checked = true;
    }
    for (var i = 0; i < disAble.length; i++) {
        if (disAble[i].value == 1) {
            disAble[i].parentNode.firstElementChild.style.color = '#ccc'
        }
    }
    choses()
    shopTotal()
}
carShop.onclick = function (e) {
    var e = e || window.event
    var target = e.target || e.srcElement
    choses()
    // 全选
    if (target.name == 'quan') {
        for (var j = 0; j < quan.length; j++) {
            for (var i = 0; i < checkbox.length; i++) {
                checkbox[i].checked = target.checked
                quan[1].checked = target.checked
                quan[0].checked = target.checked
            }
        }
        choses()
        shopTotal()
    }
    if (target.name == 'xuan') {
        var num = 0
        for (var i = 0; i < checkbox.length; i++) {
            if (checkbox[i].checked) {
                num++
            }
        }
        // console.log(num);
        for (var i = 0; i < quan.length; i++) {
            if (num == checkbox.length) {
                quan[i].checked = true
            } else {
                quan[i].checked = false
            }
        }
        choses()
        shopTotal()
    }
    if (target.innerHTML == '×') {
        target.parentNode.remove();
        if (checkbox.length == 0) {
            var str1 = `<div class="emptyCar">
            <span class="iconfont icon-gouwuche empty_car"></span>
            <h4>购物车还是空的, <a href="./main.html"> 去逛逛> </a></h4>
            </div> `;
            box.innerHTML = str1;
        }
        choses()
        shopTotal()
    }
    if (target.innerHTML == '+') {
        target.parentNode.previousElementSibling.value++;
        for (var i = 0; i < disAble.length; i++) {
            if (disAble[i].value > 1) {
                disAble[i].parentNode.firstElementChild.style.color = '#000'
            }
        }
        totalPrice()
        shopTotal()
    }
    if (target.innerHTML == '-') {
        if (target.parentNode.nextElementSibling.value > 1) {
            target.parentNode.nextElementSibling.value--;
            for (var i = 0; i < disAble.length; i++) {
                if (disAble[i].value == 1) {
                    disAble[i].parentNode.firstElementChild.style.color = '#ccc'
                }
            }
        }
        totalPrice()
        shopTotal()
    }

}
// 小计
function totalPrice() {
    var tot = 0;
    for (var i = 0; i < shops.length; i++) {
        var money = shops[i].children[3].children[0].innerText;
        var nUm = shops[i].children[4].children[1].value;
        tot = parseInt(money) * parseInt(nUm);
        shops[i].children[5].children[0].innerText = tot
        // console.log(tot);
    }
    // 更改输入框
    for (var i = 0; i < shops.length; i++) {
        shops[i].children[4].children[1].onblur = function () {
            for (var i = 0; i < shops.length; i++) {
                var money = shops[i].children[3].children[0].innerText;
                var nUm = shops[i].children[4].children[1].value;
                tot = parseInt(money) * parseInt(nUm);
                shops[i].children[5].children[0].innerText = tot
            }
        }
    }
}
totalPrice()

// 选择几件商品
function choses() {
    var arr = [];
    for (var i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked) {
            //获取选中商品的数量值
            arr.push(i)
        }
    }
    // console.log(arr);
    //已选择商品总数量
    document.querySelector('.chosen').innerHTML = arr.length
}
// 合计
function shopTotal() {
    var sum = 0;
    for (var i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked) {
            // 获取商品的小计
            // console.log(checkbox[i].parentNode.parentNode.children[5].children[0].innerText);
            var shopNum1 = checkbox[i].parentNode.parentNode.children[5].children[0].innerText
            sum += parseInt(shopNum1);
        }
    }
    document.querySelector('.rl3').children[1].children[0].innerText = sum
}


