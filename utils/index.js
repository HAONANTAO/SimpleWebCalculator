const isEmpty = (value) => value === ''
const isFalsy = (value) => value === '0' ? false : !value

export { isEmpty, isFalsy }