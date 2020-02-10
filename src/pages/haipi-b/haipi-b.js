import './haipi-b.styl'
import { getWebType } from '@lib/tools'
import { screenSize } from '@lib/screenSize'
screenSize()
function haipiPhoneDown () {
  let webType = getWebType()
  let haipishangjiaAndroidDown = 'http://download-hahaipi.oss-cn-hangzhou.aliyuncs.com/mct/1x/haipishangjia_1_6_9_0.apk'
  let haipishangjiaIOSDown = 'https://itunes.apple.com/cn/app/hai-pi-shang-jia/id1377936046?mt=8'
  $('.haipi-phone-down-mask').click(() => {
    $('.haipi-phone-down-mask').hide()
  })
  if (webType.isIOS) {
    $('.haipi-phone-down-button-ios').show()
    window.location.href = haipishangjiaIOSDown
  } else if (webType.isAndroid) {
    $('.haipi-phone-down-button-android').show()
  } else if (webType.isWin || webType.isMac) {
    $('.haipi-phone-down-button-ios').show()
    $('.haipi-phone-down-button-android').show()
  }
  if (webType.isWx) {
    $('.haipi-phone-down-mask').show()
    $('.haipi-phone-down-button-ios').click(() => {
      $('.haipi-phone-down-mask').show()
    })
    $('.haipi-phone-down-button-android').click(() => {
      $('.haipi-phone-down-mask').show()
    })
    return
  }
  if (webType.isAndroid) {
    window.location.href = haipishangjiaAndroidDown
  }
  $('.haipi-phone-down-button-ios').click(() => {
    window.location.href = haipishangjiaIOSDown
  })
  $('.haipi-phone-down-button-android').click(() => {
    window.location.href = haipishangjiaAndroidDown
  })
}
haipiPhoneDown()
