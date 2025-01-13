import { Component, Fragment } from "react";

import '../styles/Navbar.css'

type navbarProps = {
    leftItems: JSX.Element[],
    rightItems: JSX.Element[]
}

class Navbar extends Component<navbarProps>{
    
    constructor(props: navbarProps){
        super(props);
    }

    render(){
        return (
            <nav className="navbar inline-flex justify-between w-full">
                <div className="navbar-left">
                    {this.props.leftItems.map((item,index) => (
                       <Fragment key={index}>
                            {item}
                        </Fragment>
                    ))}
                </div>
                <div className="navbar-right">
                    {this.props.rightItems.map((item,index) => (
                        <Fragment key={index}>
                            {item}
                        </Fragment>
                    ))}
                </div>
            </nav>
        )
    }
}

export default Navbar;