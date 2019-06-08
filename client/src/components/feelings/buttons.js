import React from 'react';

class FeelingButtons extends React.Component {
    render() {
        const feelings = ['Happy', 'Sad', 'Hungry', 'Active', 'Lazy', 'Excited', 'Friendly', 'Quiet'];
        // might need to divide to separate components when we add onClick functionality
        const feelingButtons = feelings.map((feeling) =>
            <button id={feeling + 'Button'}>{feeling}</button>
        );
        return(
            <div id="buttons">
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
