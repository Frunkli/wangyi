/*recommand*/
// 获取操作对象
var recommAnd = document.querySelector('.Recommand');
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
        <a href="./shopDetail?id=${i+1}" class="shop_img"><img src="${dt[i].imgUrl}" alt=""></a>
        <p class="p1"><span>${dt[i].zhekou}</span>
            <a href="./shopDetail?id=${i+1}">${dt[i].title}</a></p>
        <p class="p2">￥<em>${dt[i].price}</em></p>
    </div>`
    }
    recommAnd.innerHTML += str;
})()

/*数字专辑*/

document.querySelector('.cnt').onclick = () => {
    self.location = 'https://music.163.com/v/w/album/rank';
}

/*hotShops热门商品*/
// 获取操作对象
var hotShop = document.querySelector('.hotShops');
// 使用自执行函数获取数据库中的数据
(async function () {
    var p2 = await promiseAjax({
        url: '../php/recommand.php'
    })
    // 转换数据类型
    // console.log(p1);
    var dt1 = eval('(' + p2 + ')')
    var dt1 = dt1.splice(8, dt1.length);
    // console.log(dt1);
    // 渲染到页面

    var str1 = '';
    for (var attr in dt1) {
        // console.log(parseInt(attr));
        if ((parseInt(attr) + 1) % 4 == 0) {
            str1 += `<div class="tag mr-none">
                <a href="./shopDetail?id=${dt1[attr].id}" class="shop_img"><img src="${dt1[attr].imgUrl}" alt=""></a>
                <p class="p1"><span class="zk">${dt1[attr].zhekou}</span>
                    <a href="./shopDetail?id=${dt1[attr].id}">${dt1[attr].title}</a></p>
                <p class="p2">￥<em>${dt1[attr].price}</em></p>
            </div>`
        } else {
            str1 += `<div class="tag">
                <a href="./shopDetail?id=${dt1[attr].id}" class="shop_img"><img src="${dt1[attr].imgUrl}" alt=""></a>
                <p class="p1"><span class="zk">${dt1[attr].zhekou}</span>
                    <a href="./shopDetail?id=${dt1[attr].id}">${dt1[attr].title}</a></p>
                <p class="p2">￥<em>${dt1[attr].price}</em></p>
            </div>`
        }
    }
    hotShop.innerHTML += str1;
    /* var a01 = hotShop.querySelectorAll('.tag');
    console.log(a01[1]);
    var zk = a01[1].children[1].children[0].innerHTML
    console.log(zk); */
    var spans = document.querySelectorAll('.zk');
    for (var i = 0; i < spans.length; i++) {
        if (spans[i].innerHTML == '') {
            spans[i].setAttribute('class', 'span_none')
        }
    }
})()


