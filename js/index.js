//页面初次加载
window.onload = function () {
    PicwaterFull();
    window.onscroll = function () {
        if (onloadImg()) {
            const container = document.getElementById('container');

            const items = document.createElement('div');
            items.className = "item";
            const item = document.createElement('div');
            item.className = 'item-img';
            const itemImg = document.createElement('img');
            itemImg.src = `../images/${Math.floor(Math.random() * (4 - 1)) + 1}.png`

            container.appendChild(items);
            items.appendChild(item);
            item.appendChild(itemImg);

            PicwaterFull();
        }
    }
}

/**
 * 判断条件加载图片
 */
function onloadImg() {
    const items = document.getElementsByClassName('item');
    //最后一个
    const lastItem = items[items.length - 1];

    //获取可视区高度
    const clientHeight = document.documentElement.clientHeight;
    //获取滚动距离
    const scrollTop = document.documentElement.scrollTop;
    if (lastItem.offsetTop < clientHeight + scrollTop) {
        return true
    } else {
        return false
    }
}

/**
 * 图片摆放
 */
function PicwaterFull() {
    //获取页面的宽度
    const container = document.getElementById('container');
    //可视区宽度
    const clientWidth = document.documentElement.clientWidth;
    //获取所有的item元素
    const items = document.getElementsByClassName('item');
    //获取单个的宽度
    const itemWidth = items[0].offsetWidth;
    // console.log(itemWidth);
    //计算出一行的个数
    const number = Math.floor(clientWidth / itemWidth);
    console.log(number);

    //设置container宽度
    container.style.width = number * itemWidth + 'px';

    //收集一排的高度值
    const heightArr = [];
    //图片排序
    for (let i = 0; i < items.length; i++) {
        if (i < number) {
            //第一行
            heightArr.push(items[i].offsetHeight)
        } else {
            //获取最小高度
            const minHeight = Math.min(...heightArr);
            // console.log(minHeight);
            //获取最小值的索引
            const index = getMinIndex(heightArr, minHeight)
            console.log(index);
            //之后的设置定位
            items[i].style.position = "absolute";
            items[i].style.left = index * itemWidth + 'px';
            items[i].style.top = minHeight + 'px'

            //改变最小高度数组
            heightArr[index] += items[i].offsetHeight;
        }
    }
    // console.log(heightArr);
}

//获取最小值索引
function getMinIndex(arr, min) {
    for (let index = 0; index < arr.length; index++) {
        if (arr[index] == min) {
            return index
        }
    }
}
