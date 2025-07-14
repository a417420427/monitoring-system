import React, { useEffect, useState } from "react";
import { Button, Card, Typography, message } from "antd";
import PerformanceTable from "./tb";
import { getJsErrorList, type JsErrorRecord } from "@/service/api/jsError";
import img from './braden-jarvis-prSogOoFmkw-unsplash.jpg'
const { Title } = Typography;

const JSErrorLog: React.FC = () => {
  const [data, setData] = useState<JsErrorRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getJsErrorList();
      if (res.status === 200 && res.data.data) {
        setData(res.data.data || []);
      } else {
        message.error(res.data.message || "获取数据失败");
      }
    } catch (error) {
      console.log(error)
      message.error("请求失败");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card>
      <Title level={3}>前端性能日志 <Button type="primary" onClick={() => {
        throw new Error('测试错误')
      }}>刷新</Button></Title>
      <PerformanceTable data={data} loading={loading} />

      <img src={img} alt="" />
    </Card>
  );
};

export default JSErrorLog;
