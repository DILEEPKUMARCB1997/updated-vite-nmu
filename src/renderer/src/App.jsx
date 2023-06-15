import enUS from 'antd/locale/en_US'
import { ThemeProvider } from 'antd-style'
import { App as AntdApp, ConfigProvider } from 'antd'
import { customDarkAlgorithm, customLightAlgorithm, useThemeStore } from './utils/themes/useStore'
import GlobalStyle from './utils/themes/GlobalStyle'
import AppRoutes from './utils/router/AppRoutes'
import BindAllGlobalEvent from './components/comman/BindAllGlobalEvent'

export default function App() {
  const { mode, colorPrimary } = useThemeStore()

  return (
    <ThemeProvider
      themeMode={mode}
      theme={{
        token: {
          colorPrimary,
          borderRadius: 4
        },
        algorithm: mode === 'dark' ? [customDarkAlgorithm] : [customLightAlgorithm],
        components: {
          Button: {
            fontSize: 14
          },
          Card: {
            boxShadow:
              'rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px'
          }
        }
      }}
    >
      <GlobalStyle />
      <ConfigProvider locale={enUS} theme={{ inherit: true }}>
        <AntdApp>
          <BindAllGlobalEvent />
          <AppRoutes />
        </AntdApp>
      </ConfigProvider>
    </ThemeProvider>
  )
}
