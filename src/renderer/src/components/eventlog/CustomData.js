/* eslint-disable prettier/prettier */
export const customEventSortFilter = (Items) => {
  let sortedItems = Items.sort(function (a, b) {
    return new Date(b.createAt) - new Date(a.createAt)
  })
  return sortedItems
}
export const filterByDate = (Items) => {
  let today = new Date()
  let dd = today.getDate()
  let mm = today.getMonth() + 1
  let yyyy = today.getFullYear()
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  today = `${yyyy}-${mm}-${dd}`
  return Items.filter(function (item) {
    return new Date(item.createAt).getTime() >= new Date(today).getTime()
  })
}
