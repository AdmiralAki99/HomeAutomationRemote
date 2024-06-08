import React from 'react';

interface MultiSelectBarProps{
    elements: any[];
    onSelect: (element: any) => void;
}

class MultiSelectBar extends React.Component<MultiSelectBarProps>{
    state = {
        elements: {},
        selected: []
    }

    onSelect(index: number){
        this.setState({
            selected: [...this.state.selected, index]
        })

        console.log(this.state.selected)
    }

    constructor(props: MultiSelectBarProps){
        super(props);
        this.state = {
            elements: props.elements,
            selected: []
        }
    }
    render(){
        return(
            <div>
                <form className="flex flex-row">
                    {this.props.elements.map((element,index) => {
                        return (
                          <button className='inline-flex items-center p-2 rounded-full bg-bubblegum text-white' onClick={()=>{this.onSelect(index)}}>
                            <input type="checkbox" value={`${element}`} className='hidden' onChange={()=>{console.log("Checked")}} />
                            <div>{element}</div>
                          </button>
                        );
                    })}
                </form>
            </div>
        )
    }
}

export default MultiSelectBar;