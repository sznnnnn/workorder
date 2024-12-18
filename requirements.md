工程设备报修小程序项目介绍
一、项目概述
本项目是一个工程设备报修小程序，旨在为用户提供便捷的设备报修服务，涵盖工单处理、管理以及一系列提升用户体验的功能。项目遵循 Apache - 2.0 许可证开源，使用 JavaScript 语言开发，截至 2024 - 11 - 27，当前版本为 v0.1.7。

pages：
login：登录界面
admin：管理员界面
enngineer：工程师界面

颜色系统：
- 主色：#1989fa（蓝色）
  - 今日工作安排边框
  - 进行中状态

- 警示色：#ff9800（橙色）
  - 待办工单边框
  - 待处理状态

- 中性色：
  - 背景：#f7f8fa
  - 文字：#333/#666/#999
  - 分割线：#eee

页面结构：
- 今日工作安排区域
  - 标题栏（图标 + 标题 + 工单数量）
  - 工单列表
    - 工单卡片
      - 工单头部（工单号 + 状态）
      - 预约时间
      - 工单信息（客户/设备/故障/地点）
      - 操作按钮（联系客户/开始处理）

- 待办工单区域
  - 标题栏（图标 + 标题 + 工单数量）
  - 工单列表
    - 工单卡片
      - 工单头部（工单号 + 状态）
      - 工单信息（客户/设备/故障/地点）
      - 操作按钮（联系客户/开始处理）

  视觉层级：
- 主要信息（高对比度）
  - 状态标签
  - 预约时间
  - 客户名称
  - 操作按钮

- 次要信息（中等对比度）
  - 设备型号
  - 故障描述
  - 地点信息

- 辅助信息（低对比度）
  - 工单号
  - 标签文字



管理员首页
pages/admin/index/index
功能概览，展示工单相关统计及快捷入口，提供主要菜单导航
显示工单统计数据、快捷入口；主要菜单包含工单管理、工程师管理等

工单列表页
pages/admin/orders/index
显示所有工单，并提供多种操作功能
可查看工单详情、分配工程师、进行工单状态筛选、搜索工单

工单详情页
pages/admin/order-detail/index
显示单个工单的详细信息
包含工单基本信息、处理进度、改派功能、处理记录等内容

工单分配页
pages/admin/order-assign/index
用于给工单分配工程师
显示工单基本信息、可选择的工程师列表以及确认分配按钮

工单改派页
pages/admin/order-reassign/index
用于更换处理工单的工程师
包含当前工程师信息、可供选择的新工程师、改派原因输入框以及确认改派按钮

