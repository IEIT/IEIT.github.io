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

    if (num.match(/^0$|^[1-9]\d*$/)) {
        return num;
    } else {
        alert('请输入非零开头的数字~');
        return false;
    }
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

// 为四个按钮绑定事件，并操作数据
function initbtn() {
    $('left_in').onclick = function() {
        if (Input()) {
            queue.enTop(Input());
            render();
        }
    }

    $('left_out').onclick = function() {
        queue.outTop();
        render();
    }

    $('right_in').onclick = function() {
        if (Input()) {
            queue.enEnd(Input());
            render();
        }
    }

    $('right_out').onclick = function() {
        queue.outEnd();
        render();
    }
}

initbtn();
