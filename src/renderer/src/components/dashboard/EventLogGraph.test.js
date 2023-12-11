import { render, screen } from '@testing-library/react'
import { expect, test ,describe} from '@jest/globals'
import EventLogGraph from './EventLogGraph'
import { Provider } from 'react-redux'
import { IpcRenderer } from 'electron'
import { store } from '../../app/store'


describe('EventLogGraph', () => {

test('should render correct', async () => {
    const events = {};
    const onSpy = jest.spyOn(ipcRenderer, 'on').mockImplementation((event, handler) => {
      events[event] = handler;
    })
  test('should render div tag', () => {
    render(
      <Provider store={store}>
        <EventLogGraph />
      </Provider>
    )
    const element = screen.getByRole('custom-element')
    expect(element).toBeInTheDocument()
  })


})




/*
import React from 'react';
import { render, act } from '@testing-library/react';
import { ipcRenderer } from './electron';
import AccountCheckModule from './';

describe('AccountCheckModule', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should render correct', async () => {
    const events = {};
    const onSpy = jest.spyOn(ipcRenderer, 'on').mockImplementation((event, handler) => {
      events[event] = handler;
    });
    const sendSpy = jest.spyOn(ipcRenderer, 'send').mockImplementation((event, data) => {
      events[event](event, data);
    });
    const { getByText, container } = render(<AccountCheckModule></AccountCheckModule>);
    const mCount = 666;
    act(() => {
      ipcRenderer.send('count-listings', mCount);
    });
    const element = getByText(mCount.toString());
    expect(element).toBeDefined();
    expect(onSpy).toBeCalledWith('count-listings', expect.any(Function));
    expect(sendSpy).toBeCalledWith('count-listings', mCount);
    expect(container).toMatchSnapshot();
  });
});
*/
