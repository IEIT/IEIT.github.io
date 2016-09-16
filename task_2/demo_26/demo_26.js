var allShip = {},
    radius = [130, 170, 210, 250]

/********************** 飞船系统 **********************/
function SpaceShip() {
  this.id = arguments[0]
  this.status = 'stop' // stop | run
  this.energy = 100
  this.radius = radius.shift() // 预订轨道高度
  this.radius_now = 100 // 当前轨道高度
  this.interval = undefined
  this.angle = 0

  shipInit(this) // 初始化飞船
}

SpaceShip.prototype = {
  constructor: SpaceShip,
  receiver: function(commond) {
    let ship_dom = this,
        run = this.run,
        land = this.land

    switch (commond) {
      case 'destroy':
        this.destroy()
        break;
      case 'begin':
        if (ship_dom.interval) clearInterval(ship_dom.interval)

        this.interval = setInterval(function() {
          run(ship_dom)
        }, 50)
        break;
      case 'stop':
        this.stop()
        break;
      case 'charge':
        if (ship_dom.interval) clearInterval(ship_dom.interval)

        this.interval = setInterval(function() {
          land(ship_dom)
        }, 50)
        break
      default:
        console.log('命令错误：' + commond)
    }
  },
  destroy: function() {
      let id = this.id,
          controller = document.getElementById('c' + id),
          ship = document.getElementById(id)

      controller.onclick = null // 注销绑定事件
      controller.remove()
      ship.remove()
      radius.push(allShip[id].radius) // 还回轨道
      clearInterval(allShip[id].interval) // 取消定时器
      delete allShip[id] // 取消注册
    },
  run: function() {
      let that = arguments[0],
          speed = arguments[1] || 0.5,
          ff = 180,
          id = that.id,
          earth = document.querySelector('.earth'),
          ship = document.getElementById(id),
          radius = that.radius,
          angle,
          energy

      if (that.energy > 0) {
        that.energy -= 0.1
        ship.innerText = Math.floor(that.energy)

        if (that.radius_now < that.radius) {
          that.angle += Math.PI / ff
          that.radius_now += speed
          angle = that.angle
          radius = that.radius_now

          ship.style.left = earth.offsetLeft + 100 + (Math.cos(angle)*radius) - 15 + 'px'
          ship.style.top = earth.offsetTop + 100 - (Math.sin(angle)*radius) - 15 + 'px'
        } else {
          that.angle += Math.PI / ff
          angle = that.angle

          ship.style.backgroundColor = 'green'
          ship.style.left = earth.offsetLeft + 100 + (Math.cos(angle)*radius) - 15 + 'px'
          ship.style.top = earth.offsetTop + 100 - (Math.sin(angle)*radius) - 15 + 'px'
        }

      } else {
        clearInterval(that.interval)
      }

    },
  stop: function() {
    clearInterval(this.interval)
  },
  land: function() {
    let that = arguments[0],
        speed = arguments[1] || 0.5, // 直线移动速度
        ff = 180, // 转动速度
        id = that.id,
        earth = document.querySelector('.earth'),
        ship = document.getElementById(id),
        radius,
        angle,
        energy,
        charge = that.charge

    that.angle += Math.PI / ff
    that.radius_now -= speed
    angle = that.angle
    radius = that.radius_now

    if (that.radius_now > 100) {
      ship.style.left = earth.offsetLeft + 100 + (Math.cos(angle)*radius) - 15 + 'px'
      ship.style.top = earth.offsetTop + 100 - (Math.sin(angle)*radius) - 15 + 'px'
    } else {
      clearInterval(that.interval)
      that.interval = setInterval(function() {
        charge(that)
      }, 500)
    }
  },
  charge: function() {
    let that = arguments[0],
        speed = 5,
        id = that.id,
        ship = document.getElementById(id)

    if (that.energy < 100) {
      that.energy += speed
      if (that.energy > 100) that.energy = 100

      ship.style.backgroundColor == 'red' ?
      ship.style.backgroundColor = 'gray' :
      ship.style.backgroundColor = 'red'

      ship.innerText = Math.floor(that.energy)
    } else {
      ship.style.backgroundColor = 'red'
      clearInterval(that.interval)
    }
  }
}

function shipInit(ship_obj) {
  // 创建 ship_dom
  let ship = document.createElement('div'),
      earth = document.querySelector('.earth'),
      space = document.querySelector('.space'),
      radius = ship_obj.radius_now,
      angle = ship_obj.angle

  ship.className = 'spaceship'
  ship.id = ship_obj.id
  ship.innerText = ship_obj.energy
  ship.style.left = earth.offsetLeft + 100 + (Math.cos(angle)*radius) - 15 + 'px'
  ship.style.top = earth.offsetTop + 100 + (Math.sin(angle)*radius) - 15 + 'px'

  space.appendChild(ship)
}


/********************** 指挥系统 **********************/
function Commond(ship_id) {
  let controller = document.createElement('p'),
      span = document.createElement('span'),
      btn_begin = document.createElement('button'),
      btn_stop = document.createElement('button'),
      btn_destroy = document.createElement('button'),
      btn_charge = document.createElement('button'),
      control_box = document.querySelector('.control-box')

  controller.id = 'c' + ship_id
  controller['data-ship_id'] = ship_id

  span.innerText = `对飞船${ship_id}号下达命令：`
  btn_begin.className = 'begin'
  btn_begin.innerText = '开始飞行'
  btn_stop.className = 'stop'
  btn_stop.innerText = '停止飞行'
  btn_destroy.className = 'destroy'
  btn_destroy.innerText = '销毁'
  btn_charge.className = 'charge'
  btn_charge.innerText = '充能'


  controller.appendChild(span)
  controller.appendChild(btn_begin)
  controller.appendChild(btn_stop)
  controller.appendChild(btn_charge)
  controller.appendChild(btn_destroy)

  controller.addEventListener('click', function(event) {
    let id = event.target.parentNode['data-ship_id']

    Mediator({id: id, commond: event.target.className})
  })

  control_box.appendChild(controller)
}

/********************** 介质 **********************/
//  参数 {id:1, commond: 'stop'}
function Mediator() {
  let message = arguments[0],
      spaceship = allShip[message.id],
      res = Math.random() < 0.3 ? false : true

  console.log(message)
  if (res) {
    setTimeout(function() {
      spaceship.receiver(message.commond)
    }, 1000)
    console.log('发送成功！')
  } else {
    console.log('send failed!')
  }
}

/********************** 新建飞船 **********************/
document.addEventListener('DOMContentLoaded', function() {
  let create_ship =  document.getElementById('create_ship')

  create_ship.onclick = function() {
    if (Object.keys(allShip).length > 3) {
      alert('四个轨道已满。')
      return false
    }

    let id = Date.now()
        ship = new SpaceShip(id)

    allShip[id] = ship // 注册飞船 名称与对象
    Commond(id) // 生成控制台
    console.log(ship)
  }
}, false)
