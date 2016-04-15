var $ = function(id) {
	return document.getElementById(id);
}
/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  "nowSelectCity": -1,
  "nowGraTime": "day"
}

/**
 * 渲染图表
 */
function renderChart() {
	// <div title="2016-01-01 aqi:500"></div>
	for (var dat in chartData) {
		var item = document.createElement('span');

		if (0 < chartData[dat] && chartData[dat] < 101) {
			item.style.backgroundColor = 'green';
		} else if (100 < chartData[dat] && chartData[dat] < 201) {
			item.style.backgroundColor = 'blue';
		} else if (200 < chartData[dat] && chartData[dat] < 301) {
			item.style.backgroundColor = 'red';
		} else if (300 < chartData[dat] && chartData[dat] < 401) {
			item.style.backgroundColor = 'purple';
		} else {
			item.style.backgroundColor = 'black';
		}

		if (pageState["nowGraTime"] == 'month') {
			item.style.width = '48px';
		} else if (pageState["nowGraTime"] == 'week') {
			item.style.width = '18px';
		} else if (pageState["nowGraTime"] == 'day') {
			item.style.width = '6px';
		} else {
			throw "pageState[nowGraTime] error";
		}

		item.style.height = chartData[dat] + 'px';
		item.style.display = 'inline-block';
		item.style.border = '1px solid #fff';
		item.title = '"' + dat + ' aqi' + chartData[dat] + '"';

		$('aqiChart').appendChild(item);
	}
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  var radio = document.getElementsByName('gra-time');
  for (var i = 0; i < radio.length; ++i) {
  	if (radio[i].checked) {
  		if (radio[i].value == pageState["nowGraTime"]){
  			return;
  		} else {
  			// 设置对应数据
  			pageState["nowGraTime"] = radio[i].value;
  			initAqiChartData();
  			// 调用图表渲染函数
  			if ($('aqiChart').hasChildNodes()) {
 			var aqiChild = $('aqiChart').childNodes;

 			for (var i = aqiChild.length - 1; i > -1; i-- ) {
 				$('aqiChart').removeChild(aqiChild[i]);
 			}
 		}
  			renderChart();
  		}
  	}
  }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
 	var city = $('city-select').options[$('city-select').selectedIndex].id;
 	// console.log(city);

 	if (city == pageState["nowSelectCity"]) {
 		return;
 	} else {
 		// 设置对应数据
 		pageState["nowSelectCity"] = city;
 		initAqiChartData();
 		// 调用图表渲染函数
 		if ($('aqiChart').hasChildNodes()) {
 			var aqiChild = $('aqiChart').childNodes;

 			for (var i = aqiChild.length - 1; i > -1; i-- ) {
 				$('aqiChart').removeChild(aqiChild[i]);
 			}
 		}
 		
 		renderChart();
 	}
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
	$('form-gra-time').onclick = function() {
		graTimeChange();
	}
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  for (var key in aqiSourceData) {
  	var opt = document.createElement('option');
  		opt.id = opt.innerHTML = key;

  	$('city-select').appendChild(opt);
  }

  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  $('city-select').onchange = function() {
  	citySelectChange();
  }
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  var city = pageState["nowSelectCity"],
  	  dayData = aqiSourceData[city],
  	  weekData = {},
  	  monthData = {},
  	  tmp = [],
  	  num = 0,
  	  num1 = 0;

  for (var dat in dayData) {
  	tmp.push(dayData[dat]);
  }

  // 周平均数据
  for (var i = 0; i < tmp.length; i += 7) {
  	var sum = 0;

  	num++;
  	for (var j = 0; j < 7; ++j) {
  		sum += tmp[i + j];
  	}

  	weekData["weeek" + num] = Math.floor(sum/7);
  }

  // 月平均数据
  for (var i = 0; i < tmp.length; i += 30) {
  	var sum = 0;

  	++num1;
  	for (var j = 0; j < 30; ++j) {
  		sum += tmp[i + j];
  	}

  	monthData['month' + num1] = Math.floor(sum/30);
  }

  // 处理好的数据存到 chartData 中
  if (pageState["nowGraTime"] == 'day') {
  	chartData = dayData;
  } else if (pageState["nowGraTime"] == 'week') {
  	chartData = weekData;
  } else if (pageState["nowGraTime"] == 'month') {
  	chartData = monthData;
  } else {
  	throw 'charData error';
  }
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
}

init();
