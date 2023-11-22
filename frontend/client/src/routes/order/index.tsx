/*
 * @Author: zdd
 * @Date: 2023-11-21 22:50:43
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2023-11-22 08:33:55
 * @FilePath: index.tsx
 */
import { Button, Image, List } from 'antd-mobile';
import { gql, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

interface Item {
  id: number;
  name: string;
  url: string;
}

interface Order {
  id: number;
  price: number;
  createTime: number;
  items: Item[];
}

function Home() {
  const navigate = useNavigate();

  const { loading, error, data } = useQuery<{ order: Order }>(
    gql`
      {
        order(id: 1) {
          id
          price
          createTime
          items {
            id
            name
            url
          }
        }
      }
    `
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <List header="订单详情">
      <div>订单价格：{data?.order.price}</div>
      <div>订单：{new Date(data?.order.createTime!).toUTCString()}</div>
      <div>订单项</div>
      {data?.order.items.map((item) => (
        <List.Item
          key={item.name}
          prefix={
            <Image
              src={item.url}
              style={{ borderRadius: 20 }}
              fit="cover"
              width={40}
              height={40}
            />
          }
          description={item.name}
        >
          {item.name}
        </List.Item>
      ))}
      <Button
        block
        onClick={() => {
          localStorage.clear();
          navigate('/login', { replace: true });
        }}
        color="primary"
        size="small"
      >
        退出登录
      </Button>
    </List>
  );
}

export default Home;
