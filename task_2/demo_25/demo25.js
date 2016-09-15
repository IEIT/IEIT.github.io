var data = {
  '办公类': {
    'Windows应用': {},
    'Office快速入门': {}
  },
  '编程类': {
    'C语言程序设计': {},
    'Java从入门到精通': {},
    'Asp.Net入门经典': {}
  },
  '网络类': {
    '网络协议基础': {},
    'TCP/IP协议': {
      'TCP/IP协议族': {}
    }
  },
  '动画类': {
    'PhotoShop创意': {}
  }
}

function Tree() {
  this._data = arguments[0] || {}
  this._temp = `<div class="my-tab"><span><i class="${1}"></i>${2}</span>${3}</div>`
  this.init = function() {
    let data = arguments[0] || this._data,
        res = ''

    for (item in data) {
      let content = this._temp.replace(/\d/g, function() {

        switch (parseInt(arguments[0])) {
          case 1:
            let tabClass = (Object.keys(data[item]).length ? 'down' : 'no')
            return tabClass
          case 2:
            return item
          case 3:
            if (Object.keys(data[item]).length) {
              let child = new Tree(data[item])

              return child.init()
            } else {
              return ''
            }
          default:
            throw new Error('Tree _temp error')
            break
        }
      })

      res += content
    }

    return res
  }
}



function createTree(id, data) {
  let node = document.getElementById(id),
      myTree = new Tree(data)

  node.innerHTML = myTree.init(data)
}


// 所有 span 绑定事件
function bindClick() {
  let iNodes = document.querySelectorAll('i')

  for (let i = 0; i < iNodes.length; i++) {
    iNodes[i].parentNode.onclick = function(event) {
      // event.preventDefault()
      let next = this.nextElementSibling

      // 切换选项前箭头
      if (iNodes[i].className === 'down') {
        iNodes[i].className = 'right'
      } else if (iNodes[i].className === 'right') {
        iNodes[i].className = 'down'
      }

      // 关闭打开 tab
      while (next) {
        next.style.display === 'none' ? next.style.display = 'block' : next.style.display = 'none'
        next = next.nextElementSibling
      }

      // 改变选中值
      if (current) current.style.color = 'black'
      current = this
      current.style.color = 'red'
    }
  }
}

// 添加子节点
function addNode(btnID, inputID) {
  let btn = document.getElementById(btnID)

  btn.addEventListener('click', function() {
    let myNode = document.createElement('div'),
        text = document.getElementById(inputID).value

    if (!current) {
      alert('请先选择节点')
      return false
    }

    if (text.replace(/\s+/g, '') === '') {
      alert('请输入节点名称')
      return false
    }

    myNode.className = 'my-tab'
    myNode.innerHTML = `<span><i class="no"></i>${text}</span>`

    current.parentNode.appendChild(myNode)
    current.firstElementChild.className = 'down'

    let next = current.nextElementSibling

    while (next) {
      next.style.display = 'block'
      next = next.nextElementSibling
    }

    bindClick.call(window, null)
  })
}

// 删除子节点
function delNode(btnID) {
  let btn =  document.getElementById(btnID)

  btn.addEventListener('click', function() {
    if (!current) {
      alert('请先选择节点')
      return false
    }

    if (current.parentNode.parentNode.childElementCount == 2) {
      current.parentNode.parentNode.firstElementChild.firstElementChild.className = 'no'
    }

    current.parentNode.remove()
  })
}

// 搜索节点
function searchNode(btnID, inputID) {
  let btn = document.getElementById(btnID),
      root = document.getElementById('main'),
      filter = function(node) {
        return node.tagName.toLowerCase() == 'span' ?
          NodeFilter.FILTER_ACCEPT :
          NodeFilter.FILTER_SKIP
        // return NodeFilter.FILTER_ACCEPT
      },
      walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, filter, false)


  btn.addEventListener('click', function() {
    let node = walker.nextNode(),
        val = document.getElementById(inputID).value,
        pattern = new RegExp(val, 'i')

    walker.currentNode = root

    while (node !== null) {
      if (pattern.test(node.innerText)) {
        if (current) current.style.color = 'black'
        current = node
        current.style.color = 'red'
        break
      }

      node = walker.nextNode()
    }


  })
}


var current

createTree('main', data)
bindClick()
addNode('add', 'val')
delNode('del')
searchNode('search', 'val')
