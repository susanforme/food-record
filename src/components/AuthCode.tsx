import { ToolApiData, TOOL_API } from '@/api/query';
import { useQuery } from '@apollo/client';
import { Spin } from 'antd';
import { LoadingOutlined, CloseOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

const AuthCode: React.FC<AuthCodeProps> = ({ setCaptcha, style }) => {
  const { loading, data, error, refetch } = useQuery<ToolApiData['verifyCode']>(
    TOOL_API.VERIFY_CODE,
  );
  useEffect(() => {
    if (data) {
      setCaptcha(data?.captcha.text || '');
    }
  });

  if (loading) {
    return (
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
    );
  }
  if (error) {
    <div onClick={() => refetch()} style={style}>
      <CloseOutlined style={{ color: 'red' }} />
      <span>点击重新加载</span>
    </div>;
  }
  return (
    <img
      style={style}
      src={data?.captcha.img}
      onClick={() => refetch()}
      alt="验证码"
    />
  );
};

export default AuthCode;

interface AuthCodeProps {
  setCaptcha: React.Dispatch<React.SetStateAction<string>>;
  style?: React.CSSProperties;
}
