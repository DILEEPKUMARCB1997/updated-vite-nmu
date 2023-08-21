/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { theme } from 'antd'
import './ConfigComarission.css'

import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer'
import { Row, Col, Card, Typography } from 'antd'

function ConfigComparission() {
  const { useToken } = theme
  const { token } = useToken()
  const [asdf, setasdf] = useState('')
  const [asdf1, setasdf1] = useState('')
  const showFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => {
      const text = e.target.result
      setasdf(text)
      console.log(text)
      //alert(text);
    }
    reader.readAsText(e.target.files[0])
  }
  const showFile1 = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => {
      const text1 = e.target.result
      setasdf1(text1)
      console.log(text1)
      //alert(text1);
    }
    reader.readAsText(e.target.files[0])
  }
  return (
    <div className="container">
      <Row justify="space-around" gutter={[24]} align="middle">
        <Col span={24}>
          <Card bordered={false} className="elevation">
            <div
              className="card_Header_left"
              style={{ background: token.colorPrimary, marginBottom: '0px' }}
            >
              <h3 className="heading">Device Config Comparison</h3>
            </div>
            <Row justify="space-around" gutter={[24]} align="middle" style={{ marginTop: '20px' }}>
              <Col span={12}>
                <input
                  type="file"
                  // style={{
                  //   color: 'white',
                  //   display: 'inline-block',
                  //   color: token.colorPrimary,
                  //   border: 'none',
                  //   padding: '7px 15px',
                  //   fontWeight: '700',
                  //   borderRadius: '3px',
                  //   whiteSpace: 'nowrap',
                  //   cursor: 'pointer',
                  //   fontSize: '10pt'
                  // }}
                  onChange={(e) => showFile(e)}
                />
              </Col>
              <Col span={12}>
                <input
                  type="file"
                  onChange={(e) => showFile1(e)}
                  // style={{
                  //   // color: 'white',
                  //   // display: '-ms-flexbox',
                  //   // color: token.colorPrimary,
                  //   // border: 'none',
                  //   // padding: '7px 15px',
                  //   // fontWeight: '700',
                  //   // borderRadius: '3px',
                  //   // whiteSpace: 'nowrap',
                  //   // cursor: 'pointer',
                  //   // fontSize: '10pt'
                  //   border: '2px solid #6c5ce7',
                  //   padding: '0.2em 0.4em',
                  //   borderRadius: '0.2em',
                  //   backgroundColor: token.colorPrimary,
                  //   transition: '1s'
                  // }}
                />
              </Col>
              <Row
                justify="space-around"
                gutter={[24]}
                align="middle"
                style={{
                  marginTop: '20px',
                  overflowY: 'scroll',
                  maxHeight: '410px'
                }}
              >
                <Col span={24}>
                  <ReactDiffViewer
                    oldValue={asdf}
                    newValue={asdf1}
                    compareMethod={DiffMethod.WORDS}
                    splitView={true}
                  />
                </Col>
              </Row>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ConfigComparission
