import React from 'react';
import './feelings.css';

class FeelingButtons extends React.Component {
    render() {
        const feelings = ['Happy', 'Sad', 'Hungry', 'Active', 'Lazy', 'Excited', 'Friendly', 'Quiet'];
        // might need to divide to separate components when we add onClick functionality
        const feelingButtons = feelings.map((feeling) =>
            <button className="button" key={feelings.indexOf(feeling)}>{feeling}</button>
        );
        return(
            <div>
                <div className="row">
                    {feelingButtons.slice(0, 4)}
                </div>
                <div className="row">
                    {feelingButtons.slice(4, 8)}
                </div>
            </div>
        )
    }
}

export default FeelingButtons
