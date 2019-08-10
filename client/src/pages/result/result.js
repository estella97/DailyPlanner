import React from "react";
import 'antd/dist/antd.css';
import "./result.css";
import { Card, Icon, Avatar, Row, Col, Rate, Tooltip } from 'antd';

const GoogleKey = "AIzaSyBou9WAraqZGu5xbYGcp1H01owc9QxhSqw"

class Result extends React.Component {
    renderCommute = (commute, i) => {
        let commuteType = commute.commuteType
        return (
            <div key={i} align="middle">
                <Icon type="line" rotate="90" style={{ fontSize: '36px', color: '#08c' }}></Icon>
                <Card size="small" style={{ width: 250 }}>
                    <Row type="flex" align="middle">
                        <Col span={6}>
                            <Avatar src={"/image/" + commuteType + ".png"} size="large" alt={commuteType}
                                style={{ marginRight: '7%', marginLeft: '7%', cursor: 'pointer' }} shape="square">
                            </Avatar>
                        </Col>
                        <Col span={18}>
                            <h5>~ {commute.commuteTime} minutes</h5>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }

    renderLocation = (place, i) => {
        return (
            <div key={i}>
                <Icon type="arrow-down" style={{ fontSize: '36px', color: '#08c' }} theme="outlined"></Icon>
                <Card size="default" hoverable="true"
                    cover={<img alt="example" src={place.photos === undefined || place.photos === null || place.photos.length === 0 ?
                        "/image/no-image-available.jpg" :
                        "https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference=" + place.photos[0].photo_reference + "&key=" + GoogleKey
                    } />}>
                    <a href={"https://www.google.com/maps/search/" + place.vicinity.replace(" ", "+")}>
                        <h5>{place.name}</h5>
                    </a>
                    <Rate
                        disabled
                        value={place.rating}
                    />
                </Card>
            </div>
        )
    }

    render() {
        let fetchedResults = JSON.parse(localStorage.getItem("results"));
        console.log(fetchedResults);
        let results = fetchedResults.map((result, index) => {
            if (index % 2 === 0) {
                return this.renderCommute(result, index);
            } else {
                return this.renderLocation(result, index);
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