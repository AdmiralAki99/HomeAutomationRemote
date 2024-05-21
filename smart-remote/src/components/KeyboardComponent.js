import React from "react";
import Keyboard from 'react-simple-keyboard'
import "react-simple-keyboard/build/css/index.css";

class KeyboardComponent extends React.Component{
  state = {
    layoutName: "default",
    input: "",
    onChange:()=>{},
    onKeyPress:()=>{}
  };

  constructor(props){
    super(props);
    this.state = {
      layoutName: props.layoutName,
      input: props.input,
      onChange: props.onChange,
      onKeyPress: props.onKeyPress
    }
  }

  onKeyPress = button => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  handleShift = () => {
    const layoutName = this.state.layoutName;

    this.setState({
      layoutName: layoutName === "default" ? "shift" : "default"
    });
  };

  onChangeInput = event => {
    const input = event.target.value;
    this.setState({ input });
    this.keyboard.setInput(input);
  };

  render() {
    return (
      <div>
        <Keyboard
          keyboardRef={r => (this.keyboard = r)}
          layoutName={this.state.layoutName}
          onChange={this.state.onChange}
          onKeyPress={this.onKeyPress}
        />
      </div>
    );
  }
}

export  {KeyboardComponent};