/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux'
import { PageContainer, ProLayout } from '@ant-design/pro-components'
import { useEffect, useState } from 'react'
import { useTheme } from 'antd-style'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { App, Dropdown, Spin } from 'antd'
import { LogoutOutlined, WindowsFilled, SettingOutlined } from '@ant-design/icons'
import ThemeController from '../utils/themes/ThemeController'
import { useThemeStore } from '../utils/themes/useStore'
import _DefaultProps from './_DefaultProps'
import atopLogo from '../assets/images/atop-logo.svg'
import { clearUsersData } from '../features/userManagementSlice'
import { nextInitRenderStep, requestAppInitialData } from '../features/UIControllSlice'
import RenameGroupDialog from '../components/dialogs/renameGroupDialog/RenameGroupDialog'
import Dialogs from '../components/dialogs/Dialogs'
import { openDialog } from '../features/dialogSlice.js'
import { SEND_RP_OPEN_NATIVE_MENU } from '../../../main/utils/IPCEvents'

const MainLayout = () => {
  const dispatch = useDispatch()
  const { mode } = useThemeStore()
  const navigate = useNavigate()
  const location = useLocation()
  const token = useTheme()
  const [pathname, setPathname] = useState(location.pathname)

  useEffect(() => {
    setPathname(location.pathname || '/')
    window.electron.ipcRenderer.on(SEND_RP_OPEN_NATIVE_MENU, nativeMenuListener)
    dispatch(requestAppInitialData())
    setTimeout(() => {
      nextInitRenderStep()
    }, 800)
    setTimeout(() => {
      nextInitRenderStep()
    }, 1600)
    setTimeout(() => {
      nextInitRenderStep()
    }, 2200)
    window.electron.ipcRenderer.removeListener(SEND_RP_OPEN_NATIVE_MENU, nativeMenuListener)
  }, [location])

  // useEffect(() => {})

  const nativeMenuListener = (event, arg) => {
    console.log(arg)
    if (arg.action === 'preference') {
      // if (!this.props.isAppPreferencesDialogOpen) {
      //   this.props.requestGetNICData()
      dispatch(openDialog('perferences'))
    } else if (arg.action === 'about') {
      dispatch(openDialog('aboutDialog'))
    }
  }

  const handleMenuClick = (e) => {
    if (e.key === 'logout') {
      dispatch(clearUsersData())
      localStorage.removeItem('username')
      navigate('/login')
    }
  }

  const loggedinUser = localStorage.getItem('username') ? localStorage.getItem('username') : 'admin'

  return (
    <ProLayout
      {..._DefaultProps}
      siderWidth={220}
      layout="mix"
      fixSiderbar
      fixedHeader
      hasSiderMenu={true}
      siderMenuType="sub"
      menu={{
        collapsedShowGroupTitle: false
      }}
      location={{
        pathname
      }}
      logo={<img src={atopLogo} alt="Atop Technologies" />}
      title="Atop Technologies"
      avatarProps={{
        src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
        size: 'default',
        title: loggedinUser,
        render: (props, dom) => {
          return (
            <Dropdown
              trigger={['click']}
              placement="bottom"
              arrow
              menu={{
                items: [
                  {
                    key: 'logout',
                    icon: <LogoutOutlined />,
                    label: 'Logout'
                  }
                ],
                onClick: handleMenuClick
              }}
            >
              {dom}
            </Dropdown>
          )
        }
      }}
      actionsRender={(props) => [<ThemeController />]}
      menuItemRender={(item, dom) => <Link to={item.path || '/'}>{dom}</Link>}
      token={{
        sider: {
          colorMenuBackground: token.colorBgContainer,
          colorBgMenuItemSelected: mode === 'dark' ? token.colorPrimary : token.colorPrimaryBg,
          colorTextMenuSelected: mode === 'dark' ? token.colorText : token.colorPrimary
        },
        pageContainer: {
          paddingBlockPageContainerContent: 16,
          paddingInlinePageContainerContent: 16
        }
      }}
    >
      <PageContainer
        header={{
          title: ''
        }}
      >
        <Outlet />
      </PageContainer>
      <Dialogs />
    </ProLayout>
  )
}

export default MainLayout
