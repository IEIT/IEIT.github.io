/*
 *$('#id') id选择器
 *$('.className') class选择器
 *
 */

var $ = function(value) {
    switch (true) {
        case value.match(/^#.+/) != null:
             let id = value.substr(1);
             return document.getElementById(id);
        case value.match(/^\..+/) != null:
             let className = value.substr(1);
             return document.getElementsByClassName(className);
    }
    
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
function getData(id) {
    var num = $(id).value;

    if (num.match(/^[\u4e00-\u9fa5a-zA-Z0-9\s,，、]+$/)) {
        return num;
    } else {
        alert('数字，中文，英文，可用空格、换行符、逗号、顿号等分隔');
        return false;
    }
}

// 对数据进行处理
function dealData(data, queue, direction) {
	var res = data.trim().split(/[\s,，、]+/);

	res = res.filter(function(value) {
		if (value == '' || value.match(/[\s,，、]+/) != null) {
			return false;
		} else {
            return true;
        }
	});

      // console.log(res);
	if (direction == undefined || direction == 'left') {
        res.forEach(function(value, index) {
            if (queue.dataStore.indexOf(value) === -1) {
                queue.enEnd(value);
            } else {
                return;
            }
        });
	} else if (direction == 'right') {
		res.forEach(function(value, index) {
            if (queue.dataStore.indexOf(value) === -1) {
                queue.enTop(value);
            } else {
                return;
            }
        });
	} else {
		throw 'dealData() parameter error';
	}

    if (queue.dataStore.length > 10) {
        queue.dataStore = queue.dataStore.filter(function(value, index) {
            if (index < queue.dataStore.length - 10) {
                return false;
            } else {
                return true;
            }
        });
    }
}

// 渲染图像 
function render(className, queue) {
    var queue_wrap = $(className)[0];

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
        	del(this, queue);
        };

        queue_wrap.appendChild(addNode);
    });

}

// 单击删除功能
function del(obj, queue) {
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

// 新建一个队列对象，用来存储数据
var queueTags = new Queue(),
    queueHobby = new Queue();

// 按钮或操作绑定事件
function initbtn() {
    let symbol = [13, 32, 188];

    $('#tags').onkeyup = function(event) {
        if (symbol.indexOf(event.keyCode) > -1) {
            let data = getData('#tags');

            if (data != '') {
                dealData(data, queueTags);
                render('.show-tags', queueTags);
                $('#tags').value = null;
            }
        }
    }

    $('#hobby_btn').onclick = function() {
        let data = getData('#hobby');

        if (data != '') {
            dealData(data, queueHobby);
            render('.show-hobby', queueHobby);
         $('#hobby').value = null;
        }
    }
}

initbtn();
