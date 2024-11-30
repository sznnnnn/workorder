# 工程设备报修小程序后端开发需求文档

## 1. 系统架构
### 1.1 技术选型
- 开发语言：Node.js
- Web框架：Express/Koa
- 数据库：MySQL 5.7+
- 缓存：Redis (可选)
- 认证：微信登录
- API风格：RESTful

### 1.2 系统要求
- Node.js版本：v16+
- 服务器：轻量级云服务器即可
- 内存要求：最小1GB，建议2GB
- 磁盘空间：最小10GB

## 2. 数据库设计
### 2.1 核心表结构

```sql
-- 用户表 (对应微信用户)
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `openid` varchar(100) NOT NULL COMMENT '微信openid',
  `role` tinyint NOT NULL COMMENT '角色(1:管理员 2:工程师)',
  `nickname` varchar(50) COMMENT '昵称',
  `avatar` varchar(255) COMMENT '头像',
  `phone` varchar(20) COMMENT '手机号',
  `status` tinyint DEFAULT 1 COMMENT '状态(0:禁用 1:启用)',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_openid` (`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- 工单表
CREATE TABLE `work_order` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `order_no` varchar(32) NOT NULL COMMENT '工单号',
  `customer_name` varchar(50) NOT NULL COMMENT '客户名称',
  `device_type` varchar(50) NOT NULL COMMENT '设备类型',
  `fault_desc` text COMMENT '故障描述',
  `location` varchar(255) COMMENT '地点',
  `images` text COMMENT '图片地址，JSON数组',
  `status` tinyint NOT NULL COMMENT '状态(1:待分配 2:待处理 3:处理中 4:已完成)',
  `engineer_id` bigint COMMENT '工程师ID',
  `appointment_time` datetime COMMENT '预约时间',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_order_no` (`order_no`),
  KEY `idx_engineer_status` (`engineer_id`, `status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='工单表';

-- 工单处理记录表
CREATE TABLE `work_order_record` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `order_id` bigint NOT NULL COMMENT '工单ID',
  `operator_id` bigint NOT NULL COMMENT '操作人ID',
  `operation_type` tinyint NOT NULL COMMENT '操作类型(1:分配 2:开始处理 3:完成处理 4:改派)',
  `content` text COMMENT '处理内容',
  `images` text COMMENT '处理图片，JSON数组',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_order_id` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='工单处理记录表';
```

## 3. API接口设计
### 3.1 微信登录相关
```
POST /api/v1/auth/wx-login     # 微信登录
请求体：
{
    "code": "string"           # 微信登录code
}
响应体：
{
    "code": 200,
    "data": {
        "token": "string",     # 自定义登录态
        "userInfo": {
            "id": "number",
            "role": "number",
            "nickname": "string",
            "avatar": "string"
        }
    }
}
```

### 3.2 工单相关
```
GET /api/v1/orders            # 获取工单列表
请求参数：
- page: 页码
- size: 每页数量
- status: 状态
- engineerId: 工程师ID
响应体：
{
    "code": 200,
    "data": {
        "total": "number",
        "list": [{
            "id": "number",
            "orderNo": "string",
            "customerName": "string",
            "deviceType": "string",
            "status": "number",
            "appointmentTime": "datetime"
        }]
    }
}

GET /api/v1/orders/today     # 获取今日工作安排
响应体：
{
    "code": 200,
    "data": [{
        "id": "number",
        "orderNo": "string",
        "customerName": "string",
        "deviceType": "string",
        "status": "number",
        "appointmentTime": "datetime"
    }]
}

POST /api/v1/orders/{id}/assign  # 分配工单
请求体：
{
    "engineerId": "number"
}

POST /api/v1/orders/{id}/start   # 开始处理
请求体：
{
    "content": "string",
    "images": ["string"]         # 图片地址数组
}

POST /api/v1/orders/{id}/finish  # 完成处理
请求体：
{
    "content": "string",
    "images": ["string"]         # 图片地址数组
}
```

### 3.3 文件上传
```
POST /api/v1/upload/image    # 上传图片
请求体：
- FormData格式，字段名为file
响应体：
{
    "code": 200,
    "data": {
        "url": "string"      # 图片访问地址
    }
}
```

## 4. 技术实现要点
### 4.1 微信登录流程
- 获取微信登录凭证code
- 调用微信接口获取openid
- 生成自定义登录态
- 维护登录态有效期

### 4.2 图片处理
- 限制图片大小（建议不超过2MB）
- 限制图片格式（jpg/png/jpeg）
- 使用对象存储服务存储图片
- 图片压缩处理

### 4.3 数据处理
- 分页查询优化
- 关键信息校验
- 状态流转控制
- 并发处理控制

## 5. 安全要求
### 5.1 登录态安全
- 登录态定期刷新
- 防止登录态泄露
- 异常登录检测

### 5.2 数据安全
- 关键信息脱敏
- 操作日志记录
- 数据定期备份

### 5.3 接口安全
- 参数校验
- 频率限制
- 防重放攻击

## 6. 部署要求
### 6.1 环境配置
- 开发环境
- 测试环境
- 生产环境

### 6.2 域名及证书
- 配置HTTPS证书
- 域名备案
- 配置微信域名白名单

## 7. 开发规范
### 7.1 代码规范
- 统一的命名规范
- 统一的注释规范
- 统一的异常处理
- 统一的响应格式

### 7.2 Git规范
- 分支管理规范
- 提交信息规范
- 版本发布规范

## 8. 项目进度
### 8.1 第一阶段（1周）
- 基础框架搭建
- 数据库设计实现
- 微信登录实现
- 文件上传实现

### 8.2 第二阶段（1周）
- 工单核心功能实现
- 工程师功能实现
- 管理员功能实现

### 8.3 第三阶段（3天）
- 功能测试
- 性能优化
- 文档完善

## 9. 验收标准
- 微信登录正常
- 工单流转正常
- 图片上传正常
- 接口响应及时
- 数据显示正确 