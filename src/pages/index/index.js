import './index.styl'
import ChangeScroll from '@lib/changeScroll'
import { submitContactInfo } from '@api'
document.querySelectorAll('img').forEach(ele => {
  ele.ondragstart = () => false
})
$(function () {
  // 滚动操作
  new ChangeScroll({
    clickClsEle: '.index-anchor-point-click',
    controlClsEle: '.index-menu-block',
    scrollTop: 71,
    controlDone (obj) {
    },
    lazyEle: '.index-lazy-img',
    lazyType: 'data-src',
    lazyOffset: 400
  })
  // 轮播操作
  new Swiper('.swiper-container', {
    // direction: 'vertical', // 垂直切换选项
    pagination: {
      el: '.swiper-pagination'
    },
    // autoplay: {
    //   delay: 3000 // 3秒切换一次
    // },
    loop: true, // 循环模式选项
    disableOnInteraction: false
    // 如果需要分页器
    // pagination: {
    //   el: '.swiper-pagination'
    // }
  })
  // 显示二维码
  $('.show-code-hover').hover(function () {
    let jqDomArr = $(this).find('.index-icon-container')
    jqDomArr.eq(0).hide()
    jqDomArr.eq(1).stop().css('opacity', 1).fadeIn()
  }, function () {
    let jqDomArr = $(this).find('.index-icon-container')
    jqDomArr.eq(0).stop().css('opacity', 1).fadeIn()
    jqDomArr.eq(1).hide()
  })
  // 如果需要前进后退按钮
  // navigation: {
  //   nextEl: '.swiper-button-next',
  //   prevEl: '.swiper-button-prev',
  // },

  // // 如果需要滚动条
  // scrollbar: {
  //   el: '.swiper-scrollbar'
  // }
  $('.input-button').click(function () {
    if (this.id === 'contact-us-btn' && $('#contact-us-form').is(':hidden')) {
      $('#contact-us-form').fadeIn()
      return
    }
    let form = $(this).attr('data-form')
    let name = $(`.form-input[data-type="name"][data-form="${form}"]`)
    let phone = $(`.form-input[data-type="mobile_phone"][data-form="${form}"]`)
    if (name.val() === '') {
      layer.alert(`${name.attr('data-name')}不能为空`, { icon: 7, closeBtn: false })
      return
    }
    if (!(/^1[3|4|5|7|8]\d{9}$/.test(phone.val()))) {
      layer.alert(`${phone.attr('data-name')}格式错误`, { icon: 7, closeBtn: false })
      return
    }
    submitContactInfo({
      name: name.val(),
      mobile_phone: phone.val(),
      from: '1'
    }).then(res => {
      if (res.ret === 1) {
        layer.alert('提交成功', { icon: 6, closeBtn: false })
      } else if (res.msg) {
        layer.alert(res.msg, { icon: 7, closeBtn: false })
      }
    })
  })
})
