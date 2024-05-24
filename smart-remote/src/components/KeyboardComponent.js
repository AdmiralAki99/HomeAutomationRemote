import React from "react";
import Keyboard from 'react-simple-keyboard'
import "react-simple-keyboard/build/css/index.css";

let layout = {
  default: [
    "q w e r t y u i o p",
    "a s d f g h j k l",
    "{shift} z x c v b n m {backspace}",
    "{numbers} {space} {ent} {hide}"
  ],
  shift: [
    "Q W E R T Y U I O P",
    "A S D F G H J K L",
    "{shift} Z X C V B N M {backspace}",
    "{numbers} {space} {ent} {hide}"
  ],
  numbers: ["1 2 3", "4 5 6", "7 8 9", "{abc} 0 {backspace}"]
}
let display = {
  "{numbers}": "123",
  "{space}": " ",
  "{ent}": "return",
  "{escape}": "esc ⎋",
  "{tab}": "tab ⇥",
  "{backspace}": "⌫",
  "{capslock}": "caps lock ⇪",
  "{shift}": "⇧",
  "{controlleft}": "ctrl ⌃",
  "{controlright}": "ctrl ⌃",
  "{altleft}": "alt ⌥",
  "{altright}": "alt ⌥",
  "{metaleft}": "cmd ⌘",
  "{metaright}": "cmd ⌘",
  "{abc}": "ABC",
  '{hide}': '\u{2304}'
}

class KeyboardComponent extends React.Component{
  state = {
    layoutName: "shift",
    input: "",
    isNumbers: false,
    onChange:()=>{},
    onKeyPress:()=>{}
  };

  constructor(props){
    super(props);
    this.state = {
      layoutName: props.layoutName,
      input: props.input,
      onChange: props.onChange,
      onKeyPress: props.onKeyPress,
    }
  }

  onKeyPress = button => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
    if (button === '{numbers}' || button === "{abc}") this.handleNumbers()
    if (button === "{hide}") this.props.onHide()
    if (button === "{ent}") this.props.onSubmit()
  };

  handleNumbers = () =>{
    if(this.state.layoutName !== "numbers"){
      this.setState({
        layoutName: "numbers"
      });
    }else{
      this.setState({
        layoutName: "default"
      });
    }
  }

  closeKeyboard = () => {
    this.setState({
      isToggled: false
    })
  }

  handleShift = () => {
    const layoutName = this.state.layoutName;

    this.setState({
      layoutName: layoutName === "default" ? "shift" : "default"
    });
  };

  onChangeInput = event => {
    console.log("Input changed", event);
    this.props.input = event;
    // this.setState({ input });
    // console.log("Input changed", input);
    // this.keyboard.setInput(input);
  };

  render() {
    return (
      <div className={`keyboardContainer ${(this.props.isToggled === false)? "hidden":""}`}>
        <Keyboard
          keyboardRef={r => (this.keyboard = r)}
          layoutName={this.state.layoutName}
          layout={layout}
          display={display}
          onChange={this.props.onChange}
          onKeyPress={this.onKeyPress}
        />
      </div>
    );
  }
}

export  {KeyboardComponent};