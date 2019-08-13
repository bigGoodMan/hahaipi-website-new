import { eventThrottle, getParentsOffsetTop, getWebType } from './tools'
import Animate from './animate'
class ChangeScroll {
  /**
   * @param {*} idEle 滚动的dom
   * @param {*} clickClsEle 点击的dom
   * @param {*} controlClsEle 被控制的dom
   * @param {*} callback 回调
   */
  constructor ({ idEle, clickClsEle, controlClsEle, scrollTop = 0, scrollBottom = 0, callback = () => {} }) {
    this.w = idEle ? document.querySelector(idEle) : window
    this.idEle = idEle ? document.querySelector(idEle) : document.documentElement || document.body
    this.clickClsEle = clickClsEle
    this.scrollTop = scrollTop
    this.scrollBottom = scrollBottom
    this.controlClsEle = controlClsEle
    this.callback = callback
    this.clickClsEleArr = []
    this.scrollFunc = eventThrottle({ callback: this.scrollDeal.bind(this), time: 200 })
    this.w.addEventListener('scroll', this.scrollFunc)
    this.srollDomFunc()
  }
  // dom处理与记录
  srollDomFunc () {
    const {
      clickClsEle,
      controlClsEle,
      scrollTop,
      scrollBottom,
      idEle
    } = this
    let animate = new Animate()
    document.querySelectorAll(clickClsEle).forEach(ele => {
      let sign = ele.getAttribute('data-sign')
      let clickEle = ele
      let controlEle = document.querySelector(`${controlClsEle}[data-sign="${sign}"]`)
      ele.onclick = (e) => {
        let top = getParentsOffsetTop(controlEle, idEle) - scrollTop + scrollBottom
        top = top < 0 ? 0 : top
        // let height = controlEle.offsetHeight
        let clientHeight = idEle.clientHeight
        let scrollHeight = idEle.scrollHeight
        let bottomScrollTop = scrollHeight - clientHeight
        let originScroll = top > bottomScrollTop ? bottomScrollTop : top // 当offsetTop 超出到底部scrollTop的时候以实际只能滚动底部的scrollTop距离
        // if (typeof window.getComputedStyle(document.body).scrollBehavior === void 0) {
        //   // 传统的JS平滑滚动处理代码...
        // }
        originScroll = originScroll || 0
        animate.clear()
        animate.easeOut(idEle.scrollTop || document.body.scrollTop, originScroll, 10, function (val) {
          let webType = getWebType()
          if (idEle === document.documentElement && (webType.isIE || webType.isEdge)) {
            document.body.scrollTop = val
            return
          }
          idEle.scrollTop = val
        })
      }
      this.clickClsEleArr.push({
        clickEle,
        controlEle
      })
    })
  }
  scrollDeal (e) {
    const clientHeight = this.idEle.clientHeight
    const scrollHeight = this.idEle.scrollTop
    this.clickClsEleArr.some(v => {
      let top = getParentsOffsetTop(v.controlEle, this.idEle)
      let height = v.controlEle.offsetHeight
      // console.log(v.top >= scrollHeight, clientHeight + scrollHeight > v.top)
      if (top >= scrollHeight && (clientHeight + scrollHeight > top)) {
        this.callback({ ...v, top, height, clientHeight, scrollHeight })
        return true
      }
      return false
    })
  }
  clearScroll () {
    this.w.removeEventListener('scroll', this.scrollFunc)
  }
}
export default ChangeScroll
