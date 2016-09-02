// HTML 编译器构造函数
function HtmlPro() {
  let str = arguments[0]

  this.func = function() {
    let argus = arguments

    return (str.replace(/\d/g,function(){
      return argus[arguments[0]]
    }))
  }

  return this.func
}

// 笔记对象
var notes = {
  1: [
    {'0': 'Note 0-0：台电脑绑定两个github帐号'},
    {'3': 'Note 1-3：图片阻止选中及CSS绘制三角形'},
    {'7': 'Note 1-7：margin 叠加，盒子等分'}
  ],
  2: [
    {'13-15': 'Note13-15：排序、数组遍历'},
    {'16': 'Note16：代码简化、JSON、正则表达'},
    {'17': 'Note17：select、radio监听，JSON转Array'}
  ],
  _trans: (function() {
    let template = `<p><a href="./task_${0}/note/book/Note${1}.html">${2}</a></p>`

    return new HtmlPro(template)
  })(),
  show: function() {
    let task_id = arguments[0]
        task_notes = notes[task_id],
        res = ''

    task_notes.map(note => {
      for (let prop in note) {
          res += this._trans(arguments[0], prop, note[prop])
      }
    })

    document.write(res)
  },
}

// demo 对象
var demos = {
  1: [
    {3: 'Task 1-3：三栏式布局'},
    {4: 'Task 1-4：定位和居中问题'},
    {6: 'Task 1-6：通过HTML及CSS模拟报纸排版'},
    {7: 'Task 1-7：实现常见的技术产品官网的页面架构及样式布局'},
    {8: 'Task 1-8：响应式网格（栅格化）布局'},
    {9: 'Task 1-9：使用HTML/CSS实现一个复杂页面'}
  ],
  2: [
    {13: 'Task 2-13：零基础JavaScript编码（一）'},
    {14: 'Task 2-14：零基础JavaScript编码（二）'},
    {15: 'Task 2-15：零基础JavaScript编码（三）'},
    {16: 'Task 2-16：零基础JavaScript编码（四）'},
    {17: 'Task 2-17：零基础JavaScript编码（五）'},
    {18: 'Task 2-18：基础JavaScript练习（一）'},
    {19: 'Task 2-19：基础JavaScript练习（二）'},
    {20: 'Task 2-20：基础JavaScript练习（三）'},
    {21: 'Task 2-21：基础JavaScript练习（四）'},
    {22: 'Task 2-22：JavaScript和树（一）'},
    {23: 'Task 2-23：JavaScript和树（二）'},
    {24: 'Task 2-24：JavaScript和树（三）'},
  ],
  _trans: (function() {
    let template = `<p>
      <a href="./task_${0}/demo_${1}/">${2}</a>
      <a href="https://github.com/IEIT/IEIT.github.io/tree/master/task_${0}/demo_${1}" class="code">Code</a>
    </p>`

    return new HtmlPro(template)
  })(),
  show: function() {
    let task_id = arguments[0] || 1,
        task_demos = this[task_id],
        res = ''

    task_demos.map(demo => {
      for (let index in demo) {
        res += this._trans(task_id, index, demo[index])
      }
    })

    document.write(res)
  }
}
