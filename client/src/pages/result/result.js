import React from "react";

class Result extends React.Component {
    render() {
        let fetchedResults = JSON.parse(localStorage.getItem("results"));
        console.log(fetchedResults);
        let results = fetchedResults.map(result => {
            return (
                <div>
                    <h4>{result.name}</h4>
                    <h4>{result.rating}</h4>
                </div>
            )
        })
        return (
            <div>
                {results}
            </div>
        )
    }
}

export default Result;