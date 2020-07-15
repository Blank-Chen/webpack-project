import React from 'react';
import { Card, Button } from 'antd';

const NotFound = props => (<div
    style={{
        height: '100%',
        backgroundColor: '#f0f4f7',
        paddingTop: '5%',
    }}
>
    <Card
        title={(<span>404 Not Found</span>)}
        style={{ width: '50%', margin: '0 auto' }}
    >
        Sorry, 页面没找到！
    <p>
            <Button
                type="primary"
                style={{ marginTop: 10 }}
                size="small"
                onClick={() => props.history.goBack()}
            >返回</Button>
        </p>
    </Card>
</div>);

export default NotFound;