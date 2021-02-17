import { Button, Rate } from 'antd';
import styles from './index.less';
import { LeftOutlined } from '@ant-design/icons';
import { history } from 'umi';
import ImgPicker from '@/components/ImgPicker';

const Publish: React.FC = () => {
  return (
    <div className={styles.publish}>
      <header>
        <LeftOutlined onClick={() => history.goBack()} />
        <div className={styles.right}>
          <span>保存</span>
          <Button className={styles['right-button']}>发布文章</Button>
        </div>
      </header>
      <main>
        <ImgPicker></ImgPicker>
        {/* 限制为6个字 */}
        <input placeholder="填写一个好的标题能有更多人看到哦~" />
        <textarea placeholder="看到了美食,我要感觉记录下来"></textarea>
        {/* 这里进行label添加,至少两个,最多4个,在上面有一条单横线 */}
        <div className="label">+标签</div>
      </main>
      <div>
        对菜品进行评分
        <Rate></Rate>
      </div>
      <div>
        关联美食地点
        {/* 市级单位,在这里填写城市,然后请求接口 */}
        <span>去选择</span>
      </div>
    </div>
  );
};

export default Publish;
