var $ = function(id) {
    return document.getElementById(id);
}

// 构建一个链表对象，包括头尾添加，头尾删除，中间删除
function Queue() {
    this.dataStore = [];
    this.enTop = enTop;
    this.enEnd = enEnd;
    this.remove = remove;
    this.outTop = outTop;
    this.outEnd = outEnd;
    this.toString = toString;
}

function enTop(element) {
    this.dataStore.unshift(element);
}

function enEnd(element) {
    this.dataStore.push(element);
}

function outTop() {
    return this.dataStore.shift();
}

function outEnd() {
    return this.dataStore.pop();
}

function remove(index) {
    return this.dataStore.splice(index, 1);
}

function toString() {
    var str = '';

    this.dataStore.forEach(function(value, index, array) {
        str += value + ', ';
    });
}

// 获取input数据并验证合法性
var Input = function() {
    var num = $('num').value;

    if (num.match(/^[\u4e00-\u9fa5a-zA-Z0-9\s,，、]+$/)) {
        return num;
    } else {
        alert('数字，中文，英文，可用空格、换行符、逗号、顿号等分隔');
        return false;
    }
}

// 对数据进行处理
function dealData(direction) {
	var res = Input().trim().split(/[\s,，、]+/);

	res.filter(function(value) {
		if (value.match(/^[\s,，、]+$/)) {
			return false
		}
	})

	if (direction = 'left') {
		queue.dataStore = queue.dataStore.concat(res);
	} else if (direction = 'right') {
		queue.dataStore = res.concat(queue.dataStore);
	} else {
		throw 'dealData() parameter error';
	}

	console.log(queue.dataStore);
	
}



// 新建一个队列对象，用来存储数据
var queue = new Queue();

// 渲染图像 
function render() {
    var queue_wrap = document.getElementsByClassName('queue-wrap')[0];

    // 清理子节点
    if (queue_wrap.hasChildNodes()) {
        var queue_child = queue_wrap.childNodes;

        for (var i = queue_child.length - 1; i > -1; --i) {
            queue_wrap.removeChild(queue_child[i]);
        }
    }

    // 添加节点到 queque-wrap
    queue.dataStore.forEach(function(value, index, array) {
        var addNode = document.createElement('span');
        addNode.innerHTML = value;
        addNode.id = index;
        addNode.onclick = function() {
        	del(this);
        };

        queue_wrap.appendChild(addNode);
    });

}

// 单击删除功能
function del(obj) {
	obj.style.display = 'none';
	queue.remove(obj.id);
}

// 模糊搜索功能
function Search() {
	var item = $('search').value.trim(),
		pattern = new RegExp(item);

	render();

	queue.dataStore.forEach(function(value, index, array) {
		if (value.search(pattern) > -1) {
			document.getElementsByClassName('queue-wrap')[0].childNodes[index].style.background = 'orange';
		}
	});
}

// 为四个按钮绑定事件，并操作数据
function initbtn() {
    $('left_in').onclick = function() {
        if (Input()) {
            dealData('left');
            render();
        }
    }

    $('left_out').onclick = function() {
        queue.outTop();
        render();
    }

    $('right_in').onclick = function() {
        if (Input()) {
            dealData('right');
            render();
        }
    }

    $('right_out').onclick = function() {
        queue.outEnd();
        render();
    }

    $('search_btn').onclick = function() {
    	Search();
    }
}

initbtn();
