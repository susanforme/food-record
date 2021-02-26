import React from 'react';
import { List, Empty } from 'antd';
import { connect, State } from 'umi';
import { useQuery } from '@apollo/client';
import { CHAT_API } from '@/api/query';

const { Item } = List;
const Message: React.FC<MessageProps> = ({ user }) => {
  const { data } = useQuery(CHAT_API.MESSAGE_LIST, {
    variables: {
      id: user.id,
    },
  });
  if (!user.id) {
    return <Empty description="没有登录哦"></Empty>;
  }
  return (
    <div>
      <List
        dataSource={data?.messageList}
        renderItem={(item: any) => {
          return (
            <Item>
              <div>
                <img src={item?.headImg} alt="" />
                <span>{item?.username}</span>
              </div>
            </Item>
          );
        }}
      ></List>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  user: state.index.user,
});

export default connect(mapStateToProps)(Message);

interface MessageProps {
  user: State['index']['user'];
}
