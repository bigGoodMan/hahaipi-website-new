import ajax from '@lib/http'
function submitContactInfo (data) {
  return ajax.post({
    url: 'web/Home/customer_contact',
    data
  })
}
export { submitContactInfo }
