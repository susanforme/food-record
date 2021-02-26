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
  console.log(data);

  return (
    <div>
      <List
        dataSource={data?.messageList}
        renderItem={(item: MessageItemProps) => {
          return (
            <Item>
              <div>
                <div className="left">
                  <img src={item?.user.headImg} alt="" />
                </div>
                <span>{item?.user.username}</span>
                <span>{item.record.img ? '图片' : item.record.message}</span>
                <div className="right">{item.record.createTime}</div>
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

interface MessageItemProps {
  record: {
    createTime: number;
    id: string;
    img?: string;
    message?: string;
  };
  user: {
    username: string;
    id: string;
    headImg: string;
  };
}
