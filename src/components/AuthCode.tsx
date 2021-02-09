import { ToolApiData, TOOL_API } from '@/api/query';
import { useQuery } from '@apollo/client';
import { Spin } from 'antd';
import { LoadingOutlined, CloseOutlined } from '@ant-design/icons';
import { useCallback, useEffect } from 'react';

const AuthCode: React.FC<AuthCodeProps> = ({
  setCaptcha,
  style,
  needRefresh = false,
}) => {
  const { loading, data, error, refetch } = useQuery<ToolApiData['verifyCode']>(
    TOOL_API.VERIFY_CODE,
  );
  const updateData = useCallback(refreshAndUpdateData, [refetch, setCaptcha]);
  useEffect(() => {
    if (data) {
      setCaptcha(data?.captcha.text || '');
    }
    if (needRefresh) {
      updateData();
    }
  }, [data, needRefresh, setCaptcha, updateData]);
  useEffect(() => {
    const inter = setInterval(() => updateData(), 30000);
    return clearInterval(inter);
  }, [updateData, refetch, setCaptcha]);
  async function refreshAndUpdateData() {
    const res = await refetch();
    setCaptcha(res?.data?.captcha.text);
  }
  if (loading) {
    return (
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
    );
  }
  if (error) {
    <div onClick={() => updateData()} style={style}>
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
  needRefresh?: boolean;
}
