import '@/pages/haipi-b/haipi-b.styl'
import { screenSize } from '@lib/screenSize'
import { getWebType } from '@lib/tools'
screenSize()
function haipiPhoneDown () {
  let haipishiguangAndroidDown = 'http://download-hahaipi.oss-cn-hangzhou.aliyuncs.com/happy/3x/haipishiguang_3_3_5_2.apk'
  let haipishiguangIOSDown = 'https://itunes.apple.com/cn/app/hai-pi-shi-guang/id1149185654?mt=8'
  let webType = getWebType()
  $('.haipi-phone-down-mask').click(() => {
    $('.haipi-phone-down-mask').hide()
  })
  if (webType.isIOS) {
    $('.haipi-phone-down-button-ios').show()
    window.location.href = haipishiguangIOSDown
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
    window.location.href = haipishiguangAndroidDown
  }
  $('.haipi-phone-down-button-ios').click(() => {
    window.location.href = haipishiguangIOSDown
  })
  $('.haipi-phone-down-button-android').click(() => {
    window.location.href = haipishiguangAndroidDown
  })
}
haipiPhoneDown()
