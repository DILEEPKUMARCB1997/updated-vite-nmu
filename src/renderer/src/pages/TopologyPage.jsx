/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from 'react'
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import TopologyToolbar from '../components/Topology/TopologyToolbar/TopologyToolbar'
// import TopologyAddModal from '../components/topology/TopologyAddModal/TopologyAddModal'
import { Card, Col, Row, Typography } from 'antd'
import { datePad } from '../components/comman/tools'
import domtoimage from 'dom-to-image'
import TopologyGraph from '../components/Topology/TopologyGraph/TopologyGraph'
import { saveAs } from 'file-saver'
import {
  changeTopologyEvent,
  setImageExporting,
  setTopologyData,
  clearTopologyData,
  requestSwitchPolling,
  topologySelector
} from '../features/topologySlice'
import TopologyButtons from '../components/topology/TopologyButtons/TopologyButtons'
import { useDispatch, useSelector } from 'react-redux'
import { SEND_RP_TOPOLOGY_DATA } from '../../../main/utils/IPCEvents'
// import TopologyButtons from '../components/topology/TopologyButtons/TopologyButtons'

const TopologyPage = () => {
  const { event, nodesData, currentGroup } = useSelector(topologySelector)
  const dispatch = useDispatch()

  const [graph, setGraph] = useState(null)
  const [modal, setModal] = useState(null)

  useEffect(() => {
    window.electron.ipcRenderer.on(SEND_RP_TOPOLOGY_DATA, topologyDataListener)

    return () => {
      dispatch(clearTopologyData())
      dispatch(requestSwitchPolling(false))
      window.electron.ipcRenderer.removeListener(SEND_RP_TOPOLOGY_DATA, topologyDataListener)
    }
  }, [clearTopologyData, requestSwitchPolling])

  const topologyDataListener = (event, arg) => {
    setTopologyData(arg)
  }

  const handleFitViewPoint = () => {
    graph.networkFitViewPoint()
  }

  const handleAddNode = () => {
    dispatch(changeTopologyEvent('addNode'))
    event.networkAddNodeMode()
    // graph.networkAddNodeMode()
  }

  const getNodePosition = (position) => {
    modal.openModal(position)
  }

  const handleSearchNode = (node) => {
    graph.networkFocusNode(node)
  }

  const handleAddEdge = () => {
    dispatch(changeTopologyEvent('addEdge'))
    event.networkAddEdgeMode()
  }

  const getEdgeLinkNode = (nodes) => {
    modal.openModal(nodes)
  }

  const handleDisableEdit = () => {
    dispatch(changeTopologyEvent(''))
    event.networkDisableEditMode()
  }

  const handleSaveLayout = () => {
    graph.networkSaveLayout()
  }

  const topologyPanelSizeOnChange = () => {
    graph.updateDimensions()
  }

  const handleSelectNode = (node) => {
    graph.networkSelectNodes([node])
    graph.networkFocusNode(node)
  }

  const handleExportImage = () => {
    graph.networkExportImage()
  }
  // let graph = useRef()
  // let modal = useRef()
  // // let graphRef = useRef()
  // const [state, setState] = useState({
  //   open: true,
  //   addNodePosition: {},
  //   addEdgeNodes: { from: '', to: '' },
  //   addNodeMax: { from: 1, to: 1 }
  // })
  // console.log(state)
  // let fitViewPointOption = {
  //   nodes: [],
  //   animation: {
  //     duration: 1000,
  //     easingFunction: 'easeOutQuart'
  //   }
  // }

  // // var modal
  // // var graph

  // useEffect(() => {
  //   window.electron.ipcRenderer.on(SEND_RP_TOPOLOGY_DATA, topologyDataListener)
  //   dispatch(clearTopologyData())
  //   dispatch(requestSwitchPolling(false))
  //   window.electron.ipcRenderer.removeListener(SEND_RP_TOPOLOGY_DATA, topologyDataListener)
  // }, [])

  // const topologyDataListener = (event, arg) => {
  //   dispatch(setTopologyData(arg))
  // }
  // const openModal = (data) => {
  //   //console.log(props);
  //   if (event === 'addNode') {
  //     setState({
  //       open: true,
  //       addNodePosition: data
  //     })
  //   } else {
  //     setState({
  //       open: true,
  //       addEdgeNodes: data,
  //       addNodeMax: {
  //         from: data.from.startsWith('virtual') ? 1 : findPortMaxLength(data.from),
  //         to: data.to.startsWith('virtual') ? 1 : findPortMaxLength(data.to)
  //       }
  //     })
  //   }
  // }

  // const findPortMaxLength = (modeln) => {
  //   let Model = nodesData[modeln].model.toString('utf8')
  //   let MaxValue = 1
  //   if (Model.indexOf('-') > -1) {
  //     MaxValue = parseInt(Model.substring(Model.indexOf('-') - 2, Model.indexOf('-')))
  //   } else {
  //     MaxValue = parseInt(Model.substring(Model.length - 2, Model.length))
  //   }
  //   return MaxValue.toString() === 'NaN' ? 28 : MaxValue
  // }

  // const handleDisableEdit = () => {
  //   dispatch(changeTopologyEvent(''))
  //   // graphRef.current.networkDisableEditMode()
  //   graph.networkDisableEditMode()
  // }
  // const handleAddNode = () => {
  //   dispatch(changeTopologyEvent('addNode'))
  //   // graphRef.current.networkAddNodeMode()
  //   graph.networkAddNodeMode()
  // }

  // const handleAddEdge = () => {
  //   dispatch(changeTopologyEvent('addEdge'))
  //   // graphRef.current.networkAddEdgeMode()
  //   graph.networkAddEdgeMode()
  // }
  // const handleSaveLayout = () => {
  //   // graphRef.current.networkAddEdgeMode()
  //   graph.networkAddEdgeMode()
  // }
  // let networkCanvas
  // const networkExportImage = (props) => {
  //   dispatch(setImageExporting(true))
  //   const now = new Date()
  //   const nowYear = datePad(now.getFullYear().toString())
  //   const nowMonth = datePad(now.getMonth() + 1).toString()
  //   const nowDate = datePad(now.getDate().toString())
  //   const nowHours = datePad(now.getHours().toString())
  //   const nowMinutes = datePad(now.getMinutes().toString())
  //   const nowSeconds = datePad(now.getSeconds().toString())
  //   const fileName =
  //     currentGroup + nowYear + nowMonth + nowDate + nowHours + nowMinutes + nowSeconds
  //   function filter(node) {
  //     return node.tagName !== 'i'
  //   }
  //   domtoimage
  //     .toSvg(networkCanvas, { filter: filter })
  //     .then((dataUrl) => {
  //       saveAs(dataUrl, `${fileName}.svg`)
  //       return dispatch(setImageExporting(false))
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //       return dispatch(setImageExporting(false))
  //     })
  // }
  // //   domtoimage
  // //     .toBlob(networkCanvas)
  // //     .then((blob) => {
  // //       window.saveAs(blob, `${fileName}.png`)
  // //       return dispatch(setImageExporting(false))
  // //     })
  // //     .catch((error) => {
  // //       console.error(error)
  // //       return dispatch(setImageExporting(false))
  // //     })
  // // }
  // const handleExportImage = () => {
  //   // graphRef.current.networkExportImage()
  //   networkExportImage()
  // }
  // const handleFitViewPoin = () => {
  //   // graphRef.current.networkFitViewPoint()
  //   graph.networkFitViewPoint()
  // }
  // const getNodePosition = (position) => {
  //   // modal.openModal(position)
  //   openModal(position)
  // }
  // const getEdgeLinkNode = (nodes) => {
  //   console.log(nodes)
  //   // modal.openModal(nodes)
  //   openModal(nodes)
  // }

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <TopologyButtons />
        </Col>

        <Col span={24}>
          <Card
            bodyStyle={{
              boxSizing: 'border-box',
              width: '100%',
              padding: '15px',
              minWidth: '761px',
              minHeight: '520px'
            }}
            // style={{ height: 'calc(100vh - 105px)' }}

            bordered={false}
          >
            <Typography.Title level={4}>Device Topology</Typography.Title>
            <div
              style={{
                boxSizing: 'border-box',
                padding: '15px 10px 15px 15px',
                marginTop: '20px',
                minWidth: '761px'
                // height: 'calc(100vh - 105px)'
              }}
            >
              <TopologyToolbar
                handleExportImage={handleExportImage}
                handleFitViewPoint={handleFitViewPoint}
                handleAddNode={handleAddNode}
                handleAddEdge={handleAddEdge}
                // handleSearchNode={handleSearchNode}
                handleDisableEdit={handleDisableEdit}
                handleSaveLayout={handleSaveLayout}
                // handleChangeShowLabelItem={handleChangeShowLabelItem}
              />

              {/* <Card> */}
              <TopologyGraph
                onRef={(ref) => {
                  setGraph(ref)
                }}
                // onRef={(ref) => {
                //   graph = ref
                //   console.log(graph)
                // }}
                getNodePosition={getNodePosition}
                getEdgeLinkNode={getEdgeLinkNode}
              />
              {/* </Card> */}
              {/* <TopologyAddModal
                onRef={(ref) => {
                  setModal(ref)
                }}
                // onRef={(ref) => {
                //   modal = ref
                // }}
                handleDisableEdit={handleDisableEdit}
              /> */}
              {/* <TopologyAddModal
                onRef={(ref) => {
                  modalRef = ref
                }}
                handleDisableEdit={handleDisableEdit}
              /> */}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
export default TopologyPage

/*
import React, { useState, useEffect } from 'eact';
import PropTypes from 'prop-types';
import { ipcRenderer } from 'electron';
import SplitterLayout from 'eact-splitter-layout';
import { Paper } from '@material-ui/core';
import styles from './Topology.scss';
import TopologyAddModalContainer from './TopologyAddModal/TopologyAddModalContainer';
import TopologyGraphContainer from './TopologyGraph/TopologyGraphContainer';
import TopologyToolbarContainer from './TopologyToolbar/TopologyToolbarContainer';
import { SEND_RP_TOPOLOGY_DATA } from '../../../../utils/IPCEvents';
import TopologyNavContainer from './TopologyNav/TopologyNavContainer';

const Topology = ({
  requestSwitchPolling,
  setTopologyData,
  changeTopologyEvent,
  clearTopologyData,
}) => {
  const [graph, setGraph] = useState(null);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    ipcRenderer.on(SEND_RP_TOPOLOGY_DATA, topologyDataListener);

    return () => {
      clearTopologyData();
      requestSwitchPolling(false);
      ipcRenderer.removeListener(SEND_RP_TOPOLOGY_DATA, topologyDataListener);
    };
  }, [clearTopologyData, requestSwitchPolling]);

  const topologyDataListener = (event, arg) => {
    setTopologyData(arg);
  };

  const handleFitViewPoint = () => {
    graph.networkFitViewPoint();
  };

  const handleAddNode = () => {
    changeTopologyEvent('addNode');
    graph.networkAddNodeMode();
  };

  const getNodePosition = position => {
    modal.openModal(position);
  };

  const handleSearchNode = node => {
    graph.networkFocusNode(node);
  };

  const handleAddEdge = () => {
    changeTopologyEvent('addEdge');
    graph.networkAddEdgeMode();
  };

  const getEdgeLinkNode = nodes => {
    modal.openModal(nodes);
  };

  const handleDisableEdit = () => {
    changeTopologyEvent('');
    graph.networkDisableEditMode();
  };

  const handleSaveLayout = () => {
    graph.networkSaveLayout();
  };

  const topologyPanelSizeOnChange = () => {
    graph.updateDimensions();
  };

  const handleSelectNode = node => {
    graph.networkSelectNodes([node]);
    graph.networkFocusNode(node);
  };

  const handleExportImage = () => {
    graph.networkExportImage();
  };

  return (
    <div className={styles.container}>
      <Paper className={styles.content}>
        <div className={styles.graphContent}>
          <TopologyToolbarContainer
            handleExportImage={handleExportImage}
            handleFitViewPoin={handleFitViewPoint}
            handleAddNode={handleAddNode}
            handleSearchNode={handleSearchNode}
            handleAddEdge={handleAddEdge}
            handleDisableEdit={handleDisableEdit}
            handleSaveLayout={handleSaveLayout}
            handleChangeShowLabelItem={handleChangeShowLabelItem}
          />
          <TopologyGraphContainer
            onRef={ref => {
              setGraph(ref);
            }}
            getNodePosition={getNodePosition}
            getEdgeLinkNode={getEdgeLinkNode}
          />
          <TopologyAddModalContainer
            onRef={ref => {
              setModal(ref);
            }}
            handleDisableEdit={handleDisableEdit}
          />
        </div>
      </Paper>
    </div>
  );
};

Topology.propTypes = {
  requestSwitchPolling: PropTypes.func.isRequired,
  setTopologyData: PropTypes.func.isRequired,
  changeTopologyEvent: PropTypes.func.isRequired,
  clearTopologyData: PropTypes.func.isRequired,
};

export default Topology;




function MyComponent(props) {
  const [followPosition, setFollowPosition] = useState(false);

  useEffect(() => {
    if (props.nodesIds.length!== 0 && followPosition) {
      setFollowPosition(false);
    }
  }, [props.nodesIds, followPosition]);

  useEffect(() => {
    if (props.currentGroup!== prevProps.currentGroup) {
      setFollowPosition(true);
    }
  }, [props.currentGroup]);

  useEffect(() => {
    switch (props.event) {
      case 'addNode':
        network.addNodeMode();
        break;
      case 'addEdge':
        network.addEdgeMode();
        break;
      default:
        break;
    }
  }, [props.event]);

  useEffect(() => {
    if (props.newNodeTemp!== '') {
      props.clearNewNodeTemp();
    }
  }, [props.newNodeTemp]);

  return (
    // component rendering
  );
}
*/
