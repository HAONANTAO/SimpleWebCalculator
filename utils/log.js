class Log {
  static forceDisplayAll = false // 显示所有log
  static forceHideAllLog = true // 隐藏所有log

  constructor(display = true) {
    this.display = display
  }
  log = (info, type = 'log') => {
    (Log.forceDisplayAll || this.display)
      && !Log.forceHideAllLog && eval(`console.${type}`)(info)
  }
}

addListener(Log, 'forceDisplayAll')
addListener(Log, 'forceHideAllLog')

function addListener(object, property) {
  let value = object[property]
  Object.defineProperty(object, property, {
    get: function () {
      return value
    },
    set: function (newValue) {
      value = newValue
      // debugger
      // console.trace()
      console.log(`[LOG DISPLAY MODE] ${property}: ${value}`);
    },
    enumerable: true,
    configurable: false
  })
}

const logMaker = (display = true) => (new Log(display)).log
const log = logMaker()

export { Log, logMaker, log }