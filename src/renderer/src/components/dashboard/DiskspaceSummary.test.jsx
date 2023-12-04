import React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test } from '@jest/globals'
import DiskSpaceSummary from './DiskSpaceSummary'
import { Provider } from 'react-redux'
import { store } from '../../app/store'

test('should render div tag', async () => {
  render(
    <Provider store={store}>
      <DiskSpaceSummary />
    </Provider>
  )

  const divRender = await screen.getByTestId('graph')
  expect(divRender).toBeInTheDocument()
})
