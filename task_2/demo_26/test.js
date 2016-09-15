function SpaceShip() {
  this.id = Date.now()
  this.status = 'stop' // stop | run
  this.energy = 100
}

SpaceShip.prototype = {
  constructor: SpaceShip,
  destroy: function() {
    console.log(this.id) // 原型能否取得实例 this
  },
}

var my_ship = new SpaceShip()

// console.log(my_ship.id)
my_ship.destroy()

console.log()
