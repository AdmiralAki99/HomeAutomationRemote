import React from 'react';

interface NetworkCardStateProps{
    deviceName: string;
    ipAddress: string;
    macAddress: string;
    wakeStatus: boolean;
}


class NetworkCard extends React.Component{
    constructor(props:any){
        super(props)
    }

    componentDidMount(): void {
        
    }

    componentWillUnmount(): void {
        
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
        
    }

    render(){
        return(
            <div>
                <a className='block max-w-lg w-80 h-40 p-6 bg-black border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-70'>
                    <div className='grid grid-rows-3 grid-cols-2 gap-4'>
                        <div className='row row-start-1 row-end-3 text-white justify-center'>
                            Network Card
                        </div>
                    </div>
                </a>
            </div>
        )
    }
}

export default NetworkCard;