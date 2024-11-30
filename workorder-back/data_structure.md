# 数据结构定义文档

## 1. 工单数据结构
```typescript
// 工单基础信息
interface WorkOrder {
  id: number;
  orderNo: string;           // 工单号
  customerName: string;      // 客户名称
  deviceType: string;        // 设备类型
  faultDesc: string;        // 故障描述
  location: string;         // 地点
  images: string[];         // 图片地址数组
  status: OrderStatus;      // 工单状态
  engineerId: number;       // 工程师ID
  engineerName: string;     // 工程师姓名
  appointmentTime: string;  // 预约时间
  createTime: string;       // 创建时间
  updateTime: string;       // 更新时间
}

// 工单状态枚举
enum OrderStatus {
  PENDING_ASSIGN = 1,      // 待分配
  PENDING_HANDLE = 2,      // 待处理
  PROCESSING = 3,          // 处理中
  COMPLETED = 4           // 已完成
}

// 工单列表项
interface WorkOrderItem {
  id: number;
  orderNo: string;
  customerName: string;
  deviceType: string;
  status: OrderStatus;
  appointmentTime: string;
}

// 工单处理记录
interface WorkOrderRecord {
  id: number;
  orderId: number;
  operatorId: number;
  operatorName: string;
  operationType: OperationType;
  content: string;
  images: string[];
  createTime: string;
}

// 操作类型枚举
enum OperationType {
  ASSIGN = 1,              // 分配
  START = 2,               // 开始处理
  FINISH = 3,              // 完成处理
  REASSIGN = 4            // 改派
}