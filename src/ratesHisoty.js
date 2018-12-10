import React from 'react';
import {Card} from 'antd';

export default class extends React.PureComponent {
    render() {
        const {} = this.props;
        return (
            <Card
                title="Card title"
                extra={<a href="#">More</a>}
                style={{ 
                    width: 300,
                }}
            >
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
        )
    }
}