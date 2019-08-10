import React from "react";
import 'antd/dist/antd.css';
import "./result.css";
import { Card, Icon } from 'antd';

class Result extends React.Component {
    renderCommute = commute => {
        return (
            <div>
                <Icon type="line" rotate="90" style={{ fontSize: '46px', color: '#08c' }}></Icon>
                <br></br>
                <br></br>
                <Card size="small">
                    <p><h4>Commute Time: {commute.commuteTime}</h4></p>
                    <p><h4>Commute Type: {commute.commuteType}</h4></p>
                </Card>
                <br></br>
            </div>
        )
    }

    renderLocation = place => {
        return (
            <div>
                <Icon type="arrow-down" style={{ fontSize: '46px', color: '#08c' }} theme="outlined"></Icon>
                <Card size="default" hoverable="true">
                    <p><h4>Name: {place.name}</h4></p>
                    <p><h4>Rating: {place.rating}</h4></p>
                </Card>
                <br></br>
            </div>
        )
    }

    render() {
        let fetchedResults = JSON.parse(localStorage.getItem("results"));
        console.log(fetchedResults);
        let results = fetchedResults.map((result, index) => {
            if (index % 2 === 0) {
                return this.renderCommute(result);
            } else {
                return this.renderLocation(result);
            }

        })
        return (
            <div className="center">
                {results}
            </div>
        )
    }
}

export default Result;