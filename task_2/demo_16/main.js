var $ = function(id) {
    return document.getElementById(id);
}

var isEmptyObject = function(obj) {
    for (var name in obj) {
        return false;
    }
    return true;
}

/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {

};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var tmp = [],
        city = $('aqi-city-input').value,
        aqi = $('aqi-value-input').value;

    if (city.match(/^[A-Za-z]+$/) || city.match(/^[\u4e00-\u9fa5]+$/)) {

    } else {
        alert('城市名全为汉字或英文字字母');
        return;
    }

    if (aqi.match(/[1-9]\d*/) && 0 < aqi && aqi < 1001) {

    } else {
        alert('AQI值为 1 ~ 1000 之间的整数');
        return;
    }

    if (city in aqiData) {
    	if (aqiData[city] == aqi) {
    		alert('数据已存在，请核对后提交');
    	} else {
    		if(confirm('确定要修改' + city + '市的AQI？')){

    		} else {
    			return;
    		}
    	}
    }

    tmp.push(city);
    tmp.push(aqi);
    aqiData[tmp[0]] = tmp[1];
    $('aqi-city-input').value = $('aqi-value-input').value = null;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var aqi_table = $('aqi-table').innerHTML,
        tmp = '';

    for (var key in aqiData) {
        tmp += '<tr><td>' + key + '</td><td>' + aqiData[key] + '</td><td><button>删除</button></td></tr>';
    }

    if (isEmptyObject(aqiData)) {
    	$('aqi-table').innerHTML = null;
    } else {
        console.log(aqiData);
        $('aqi-table').innerHTML = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>' + tmp;
    }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
    init();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
    // do sth.
    console.log(city);
    delete aqiData[city];
    renderAqiList();
    init();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    $('add-btn').onclick = function() {
        addBtnHandle();
    }

    $('aqi-city-input').onkeyup = function(event) {
        if (event.keyCode === 13) {
            if ($('aqi-value-input').value == '') {
                $('aqi-value-input').focus();
            } else {
                addBtnHandle();
            }
        }
    }

    $('aqi-value-input').onkeyup = function(event) {
        if (event.keyCode === 13) {
            if ($('aqi-city-input').value == '') {
                $('aqi-city-input').focus();
            } else {
                addBtnHandle();
            }
        }
    }


    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    var btn = document.getElementsByTagName('button');

    for (var i = 0; i < btn.length; ++i) {
        if (btn[i].innerHTML == '删除') {
            btn[i].onclick = function() {
                delBtnHandle(this.parentNode.parentNode.firstChild.innerHTML);
            }
        }
    }


}

init();
