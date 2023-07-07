/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './ConfigComarission.css'

import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer'
import { Row, Col, Card } from 'antd'

function ConfigComparission() {
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
            <div className="card_Header_left">
              <h3 className="heading">Device Config Comparison</h3>
            </div>
            <Row justify="space-around" gutter={[24]} align="middle" style={{ marginTop: '20px' }}>
              <Col span={12}>
                <input type="file" onChange={(e) => showFile(e)} className="choose" />
              </Col>
              <Col span={12}>
                <input type="file" onChange={(e) => showFile1(e)} className="choose" />
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
