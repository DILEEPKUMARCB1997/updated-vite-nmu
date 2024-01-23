import { store } from '../app/store'

describe('dashboard redux state tests', () => {
  const state = store.getState().dashboard
  test('Should initially set diskUses to an empty object', () => {
    expect(state.diskUses).toEqual({})
  })

  test('Should initially set trapGraphData to an object of empty arrays of data', () => {
    expect(state.trapGraphData).toEqual({ label: [], data: [], tableData: [], lastUpdated: '' })
  })

  test('Should initially set syslogGraphData to an object of empty arrays of data', () => {
    expect(state.syslogGraphData).toEqual({ label: [], data: [], tableData: [], lastUpdated: '' })
  })

  test('Should initially set customGraphData to an object of empty arrays of data', () => {
    expect(state.customGraphData).toEqual({
      label: [],
      InformationData: [],
      CriticalData: [],
      WarningData: [],
      tableData: [],
      lastUpdated: ''
    })
  })

  test('Should initially set syslogTableData to an empty array', () => {
    expect(state.syslogTableData).toEqual([])
  })

  test('Should initially set trapTableData to an empty array', () => {
    expect(state.trapTableData).toEqual([])
  })

  test('Should initially set customTableData to an empty array', () => {
    expect(state.customTableData).toEqual([])
  })
})
