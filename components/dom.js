import { data } from "./data"

class Dom {
  text = {
    show: null,
    input: null
  }
  toggle = {
    sun: null,
    moon: null
  }
  number = []
  order = []
  button = null

  constructor() {
    this._getTextAreaDom()
    this._getToggleDom()
    this._getNumberDom()
    this._getOrderDom()
    this._getCalculatorDom()
  }

  _getTextAreaDom() {
    this.text.show = this.getByID('show')
    this.text.input = this.getByID('input')
  }

  _getToggleDom() {
    this.toggle.sun = this.getByID('sun')
    this.toggle.moon = this.getByID('moon')
  }

  _getNumberDom() {
    const numberList = data.numberList.sort((a, b) => (a.number - b.number))
    numberList.forEach(num => {
      this.number.push(this.getByID(num.id))
    });
  }
  _getOrderDom() {
    const orderList = data.orderList.sort((a, b) => (a.order - b.order))
    orderList.forEach(order => {
      this.order.push(this.getByID(order.id))
    });
  }

  _getCalculatorDom() {
    this.button = this.getAll('.calculator span')
  }

  get(info) {
    return document.querySelector(info)
  }

  have(info) {
    return !!this.get(info)
  }

  getAll(info) {
    return document.querySelectorAll(info)
  }

  getByID(id) {
    return document.getElementById(id)
  }

  haveByID(id) {
    return !!this.getByID(id)
  }

  getInputDom = () => {
    return this.text.input
  }

  getShowDom = () => {
    return this.text.show
  }
}

const dom = new Dom()

export { dom }