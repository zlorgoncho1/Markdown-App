import { marked } from 'marked/src/marked';
import { Component } from 'react';
import './App.css';
import { sampleText } from './sampleText';



class App extends Component {
  state = {
    text: sampleText
  }

  componentDidMount() {
    const text = localStorage.getItem('text')
    if(text){
      this.setState({text})
    }
    else{
      this.setState({sampleText})
    }
    
  }
  componentDidUpdate(){
    const { text } = this.state
    localStorage.setItem('text', text)
  }

  handleChange  = event => {
    const text = event.target.value;
    return (this.setState({text}))
  }
  renderText = text => {
    const __html = marked(text, { sanitize: true })
    return { __html }
  }

  render(){
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 col-md-6'>
            <textarea onChange={this.handleChange} value={ this.state.text } className='form-control' rows='18'></textarea>
          </div>
          <div className='col-md-6 col-md-6'>
            <div dangerouslySetInnerHTML={ this.renderText(this.state.text) }>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
