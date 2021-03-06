import React, { Component } from 'react';
import Identicon from 'react-identicons';
import { TwitterPicker } from 'react-color';
class App extends Component {
  state = {padding: 1, size: 200, fg: null, string: ""}
  inputChanged(evt){
    this.setState({string: evt.target.value})
  }
  paddingChanged(evt){
    let padding = parseInt(evt.target.value)
    this.setState({padding})
  }
  sizeChanged(evt){
    let size = parseInt(evt.target.value)
    this.setState({size})
  }
  bgChanged(color){
    let bg = color.hex
    this.setState({bg})
  }
  fgChanged(color){
    let fg = color.hex
    this.setState({fg, palettechoice: 0, palette: palettes[0]})
  }
  paletteChanged (evt){
    this.setState({palettechoice: evt.target.value}, ()=>{
      this.setState({palette: palettes[this.state.palettechoice], fg: ""})
    });
  }
  reset(){
    this.setState({string: "", padding: 1, size: 200, fg: null, bg: "#FFFFFF", palette: [], palettechoice: 0})
  }
  getColor(color){
    if(this.state.hashcolor !== color) {
      this.setState({hashcolor: color})
    }
  }
  render() {
    return (
    <div className="wrapper">
        <div className="header">
        <h2>react-identicons</h2>
        React component for generating identicons
        <div className="version"> <a href = "https://www.npmjs.com/package/react-identicons"><img alt="get it from NPM"        src="https://img.shields.io/npm/v/react-identicons.svg"></img></a> </div>
        </div>
        <div className="controls">
            <span>Text</span>
            <input className = "input" type="text" value ={this.state.string} onChange={(evt)=>this.inputChanged(evt)}></input>
            <span>Padding: {this.state.padding}px</span>
            <input type="range" min="0" max="10" value={this.state.padding} onChange={(evt)=>this.paddingChanged(evt)}/>
            <span>Size: {this.state.size}px</span>
            <input type="range" min="100" max="300" value={this.state.size} onChange={(evt)=>this.sizeChanged(evt)}/>
            <span>Background blocks</span>
            <TwitterPicker colors = {colors}  color= {this.state.bg || "#FFFFFF" } onChange={ this.bgChanged.bind(this) }/>
            <span>Foreground blocks</span>
            <TwitterPicker colors = {colors} color= {this.state.fg || this.state.hashcolor} onChange={ this.fgChanged.bind(this) }/>
            <span>Foreground palette</span>
            <select onChange={(evt)=>this.paletteChanged(evt)} value={this.state.palettechoice}>
              <option value={0}>No palette</option>
              <option value={1}>Pink</option>
              <option value={2}>Lime</option>
              <option value={3}>Blue</option>
              <option value={4}>Grayscale</option>
          </select>
          <span>Reset to defaults</span>
          <button type="button" onClick={this.reset.bind(this)}>Reset</button>
        </div>
        <div className="main">
          <Identicon getColor={this.getColor.bind(this)} palette = {this.state.palette} fg = {this.state.fg} bg = {this.state.bg} padding={this.state.padding} size={this.state.size} string={this.state.string} className="id"/>
        </div>
    </div>
    );
  }
}
export default App;
let colors = ['#FFFFFF','#000000','#FF6900', '#FCB900', '#00D084', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']
let palettes = [
  [],
  ["#fce4ec", "#f8bbd0", "#f48fb1", "#f06292", "#ec407a", "#e91e63", "#d81b60", "#c2185b", "#ad1457", "#880e4f", "#ff80ab", "#ff4081", "#f50057", "#c51162"],
  ["#f9fbe7", "#f0f4c3", "#e6ee9c", "#dce775", "#d4e157", "#cddc39", "#c0ca33", "#afb42b", "#9e9d24", "#827717", "#f4ff81", "#eeff41", "#c6ff00", "#aeea00"],
  ["#e3f2fd", "#bbdefb", "#90caf9", "#64b5f6", "#42a5f5", "#2196f3", "#1e88e5", "#1976d2", "#1565c0", "#0d47a1", "#82b1ff", "#448aff", "#2979ff", "#2962ff"],
  ["#fafafa", "#f5f5f5", "#eeeeee", "#e0e0e0", "#bdbdbd", "#9e9e9e", "#757575", "#616161", "#424242", "#212121"]
]