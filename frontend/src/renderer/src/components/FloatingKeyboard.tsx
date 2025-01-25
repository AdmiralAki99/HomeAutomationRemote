import React, { Component, createRef } from 'react'
import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'

interface State {
  x: number
  y: number
  offsetX: number
  offsetY: number
  layoutName: string
}

type KeyboardProps = {
    query: string
    onSubmit: () => void
    onKeyPress: (button: string) => void
}

let layout = {
  default: [
    'q w e r t y u i o p',
    'a s d f g h j k l',
    '{shift} z x c v b n m {backspace}',
    '{numbers} {space} {ent} {hide}'
  ],
  shift: [
    'Q W E R T Y U I O P',
    'A S D F G H J K L',
    '{shift} Z X C V B N M {backspace}',
    '{numbers} {space} {ent} {hide}'
  ],
  numbers: ['1 2 3', '4 5 6', '7 8 9', '{abc} 0 {backspace}']
}

let display = {
  '{numbers}': '123',
  '{space}': ' ',
  '{ent}': 'return',
  '{escape}': 'esc ⎋',
  '{tab}': 'tab ⇥',
  '{backspace}': '⌫',
  '{capslock}': 'caps lock ⇪',
  '{shift}': '⇧',
  '{controlleft}': 'ctrl ⌃',
  '{controlright}': 'ctrl ⌃',
  '{altleft}': 'alt ⌥',
  '{altright}': 'alt ⌥',
  '{metaleft}': 'cmd ⌘',
  '{metaright}': 'cmd ⌘',
  '{abc}': 'ABC',
  '{hide}': '\u{2304}'
}

class FloatingKeyboard extends Component<KeyboardProps, State> {
  keyboardRef: React.RefObject<HTMLDivElement>

  constructor(props: KeyboardProps) {
    super(props)
    this.state = {
      x: 0,
      y: 0,
      offsetX: 0,
      offsetY: 0,
      layoutName: 'default'
    }
    this.keyboardRef = createRef()
  }

  handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    this.handleStart(e.clientX, e.clientY)
  }

  handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0]
    this.handleStart(touch.clientX, touch.clientY)
  }

  handleStart = (startX: number, startY: number) => {
    const { x, y } = this.state
    this.setState({
      offsetX: startX - x,
      offsetY: startY - y
    })

    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleEnd)
    document.addEventListener('touchmove', this.handleTouchMove)
    document.addEventListener('touchend', this.handleEnd)
  }

  handleMove = (moveX: number, moveY: number) => {
    const { offsetX, offsetY } = this.state
    this.setState({
      x: moveX - offsetX,
      y: moveY - offsetY
    })
  }

  handleMouseMove = (e: MouseEvent) => {
    this.handleMove(e.clientX, e.clientY)
  }

  handleTouchMove = (e: TouchEvent) => {
    const touch = e.touches[0]
    this.handleMove(touch.clientX, touch.clientY)
  }

  handleEnd = () => {
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleEnd)
    document.removeEventListener('touchmove', this.handleTouchMove)
    document.removeEventListener('touchend', this.handleEnd)
  }

  handleLayoutChange = (layoutName: string) => {
    this.setState({ layoutName })
  }

  onKeyPress = (button: string) => {
    // This is a special key press that needs to be handled
    if (button === '{shift}' || button === '{lock}') this.handleLayoutChange('shift')
    if (button === '{numbers}') this.handleLayoutChange('numbers')
    if (button === '{hide}') this.handleHide()
    if (button === '{ent}') this.props.onSubmit()
  }

  handleHide() {

  }

  handleEnter() {}

  render() {
    const { x, y } = this.state
    return (
      <div
        ref={this.keyboardRef}
        className="fixed z-50 cursor-move"
        style={{ transform: `translate(${x}px, ${y}px)` }}
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleTouchStart}
      >
        <Keyboard
          layoutName={this.state.layoutName}
          layout={layout}
          display={display}
          onKeyPress={
            (button: string)=>{
                if (button === '{shift}' || button === '{lock}' || button === '{numbers}' || button === '{hide}' || button === '{ent}') {
                    this.onKeyPress(button)
                }else{
                    this.props.onKeyPress(button)
                }
            }
          }
        />
      </div>
    )
  }
}

export default FloatingKeyboard
