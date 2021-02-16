import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';

const ErrPage = React.memo(() => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="页面走丢了"
      extra={
        <Button
          type="primary"
          style={{ borderRadius: '5px' }}
          onClick={() => {
            history.push('/home');
          }}
        >
          返回首页
        </Button>
      }
    />
  );
});

export default ErrPage;
