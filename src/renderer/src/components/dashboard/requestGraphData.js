export const requestGraphData = (Items) => {
  let label = []
  let data = []
  let tableResult = []
  for (let index = 7; index > 0; index--) {
    let le = ''
    let ge = ''
    let ledate = new Date()
    ledate.setDate(ledate.getDate() - (index - 1 - 1))
    let gedate = new Date()
    gedate.setDate(gedate.getDate() - (index - 1))
    le = `${ledate.getFullYear()}-${('00' + (ledate.getMonth() + 1)).slice(-2)}-${(
      '00' + ledate.getDate()
    ).slice(-2)}`
    ge = `${gedate.getFullYear()}-${('00' + (gedate.getMonth() + 1)).slice(-2)}-${(
      '00' + gedate.getDate()
    ).slice(-2)}`
    let result = Items.filter(function (item) {
      return (
        new Date(item.createAt).getTime() >= new Date(ge).getTime() &&
        new Date(item.createAt).getTime() < new Date(le).getTime()
      )
    })
    let gelabel = `${('00' + (gedate.getMonth() + 1)).slice(-2)}/${('00' + gedate.getDate()).slice(
      -2
    )}`
    label.push(gelabel)
    tableResult.push(result)
    data.push(result.length)
  }
  const date = new Date()
  const lastUpdated =
    'Last Updated ' +
    ('00' + date.getDate()).slice(-2) +
    '/' +
    ('00' + (date.getMonth() + 1)).slice(-2) +
    '/' +
    date.getFullYear() +
    ' ' +
    ('00' + date.getHours()).slice(-2) +
    ':' +
    ('00' + date.getMinutes()).slice(-2)
  return { label, data, lastUpdated, tableResult }
}
