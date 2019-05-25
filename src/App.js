import React from 'react';
import './App.css';
import Settings from './components/dialogs'
import GSBG from './components/gsbg'
import Download from './components/download'
import Preview from './components/preview'
import { ConfigContext, config } from './context'
import { Button } from '@material-ui/core';


class App extends React.Component {
  handleThemeChange = (e) => {
    console.log(e.target)
    this.setState(state => ({
      theme: state.theme === 'dark' ? 'light' : 'dark'
    }))
  }

  handleChange = name => e => {
    const value = parseFloat(e.target.value)
    this.setState(state => ({
      size: {
        width: name === 'width' ? value : state.size.width,
        height: name === 'height' ? value : state.size.height
      },
      content: {
        rect: name === 'rect' ? value : state.content.rect,
        triangle: name === 'triangle' ? value : state.content.triangle,
      },
      column: name === 'column' ? value : state.column,
    }))
  }
  updateCanvas = () => {
    this.setState(state => ({
      count: state.count + 1
    }))
  }
  constructor(props) {
    super(props);
    this.state = {
      ...config,
      handleThemeChange: this.handleThemeChange,
      handleChange: this.handleChange,
      updateCanvas: this.updateCanvas
    }
  }

  componentDidMount() {
    let sw = window.screen.width * window.devicePixelRatio
    let sh = window.screen.height * window.devicePixelRatio
    this.setState({
      size: {
        width: sw,
        height: sh
      },
    })
  }
  render() {
    return (
      <ConfigContext.Provider value={this.state}>
        <div style={{ margin: '0 auto' }}>
          <div style={{ display: 'flex', margin: '0 auto', maxWidth: 800 }}>
            <Settings /><Button onClick={this.updateCanvas}>更新画布</Button><Preview /><Download />
          </div>
          <div style={{ maxWidth: 800, maxHeight: 600, overflow: 'auto', margin: '0 auto' }}>
            <GSBG />
          </div>
        </div>
        <div role="bottom" style={{ maxWidth: 800, margin: '0 auto' }}>
          <div>
            Tips:
          </div>

          1. 如果您使用 AdBlock 插件，可能无法在新窗口中正常预览。

        </div>
      </ConfigContext.Provider>
    )
  }
}

export default App
