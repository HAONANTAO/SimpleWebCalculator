import { Info } from '../data/db.json'
import { pipe } from "lodash/fp"
import { math } from "./math"

class Data {
  constructor(info) {
    this.info = info
    this.init()
  }

  init() {
    this._getOperator()
    this._getPureOperator()
    this._getInvisible()
    this._getNumber()
    this._getOrder()
  }

  _getOperator() {
    this.operator = this._getProperty('operator')
    this.operatorID = []
    this.operator.forEach(info => {
      info.tag ? this.operatorID.push(info.id) : null
    })
  }
  _getPureOperator() {
    this.pureOperator = this._getProperty('pureOperator')
    this.pureOperatorTag = []
    this.pureOperator.forEach(info => {
      info.tag ? this.pureOperatorTag.push(info.tag) : null
    })
    /* 生成拆分input dom value 的正则表达式 */
    this.pureOperatorReg = this._prepareRegular(this.pureOperatorTag)
  }
  _getInvisible() {
    this.invisible = this._getProperty('invisible')
  }
  _getNumber() {
    this.numberList = this._getProperty('number')
  }
  _getOrder() {
    this.orderList = this.info.filter(info => info.order).sort((a, b) => (a.order - b.order))
  }

  _getProperty(property) {
    return this.info.filter(info => info.property.includes(property))
  }
  /* ======= 获取单次输入数据类型 ======= */
  getInputStatus = (info) => {
    const isPureOperator = this.isThisType(info, "pureOperator")
    const isPoint = this.isThisType(info, "pointer")
    const isEqual = this.isThisType(info, "equal")
    const isNumber = this.isThisType(info, "number")
    const isAddValue = this.isThisType(info, "addValue")
    const isShowResult = this.isThisType(info, "showResult")
    const isClearAll = this.isThisType(info, 'clearAll')
    const isClearLast = this.isThisType(info, 'clearLast')
    return {
      isPureOperator, isPoint, isEqual, isNumber,
      isAddValue, isShowResult, isClearAll, isClearLast
    }
  }
  /* 获取是否事某种类型 */
  isThisType(info, type) {
    if (info && info.property && Array.isArray(info.property)) return !!info.property.filter(prop => prop === type).length
    return false
  }

  /* 将字符串按照运算符号进行拆分 */
  analysisString = (info, optimize = false) => {
    return pipe(
      this._split,
      this._optimize(optimize)
    )(info)
  }

  /* 通过正则表达式拆分 */
  _split = (info) => {
    /* 根据 pureOperatorReg 正则表达式进行拆分并消除空项 */
    return info.split(this.pureOperatorReg).filter(e => e !== '')
  }

  /* 准备好拆分使用的正则表达式 */
  _prepareRegular = (tagArray) => {
    /* 制作适应正则表达式条件的拆分数组 */
    const tag = tagArray.map(tag => {
      return tag === '-' ? '\\-' : tag
    })
    /* 生成正则条件 */
    const condition = `([${tag}])`
    /* 生成拆分用的正则表达式 */
    return new RegExp(condition)
  }

  /* 内部使用的优化函数需要考虑是否开启优化的条件 */
  _optimize = (optimize) => (info) => {
    /* 不需要优化则返回原内容 */
    if (!optimize) return info
    return info.map(element => {
      /* 将原内容中可以转化为数字的部分，进行数字转化 */
      const elementToNumber = Number(element)
      /* 判断内容存在或者内容为0时 */
      if (elementToNumber || elementToNumber === 0) {
        /** 通过math库将不规范数字转化为规范数字，并以字符串形式返回
         * eg：0.000000 => 0    000001 => 1    2. => 2
        */
        return math.calculate(String(elementToNumber)).toString()
      }
      /* 不是数字的部分则直接返回 */
      return element
    })
  }
  /* 对外版本 */
  optimize = (info) => {
    return this._optimize(true)(info)
  }
}

const data = new Data(Info)

export { data }