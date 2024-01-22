function* counterMaker(index = 0) {
  while (true)
    yield index++;
}
const counter = counterMaker(1)
export { counter, counterMaker }