// 工程师等级枚举
export enum EngineerLevel {
  TRAINEE = 'trainee',       // 实习技师
  JUNIOR = 'junior',         // 初级技师
  INTERMEDIATE = 'intermediate'  // 中级技师
}

// 工程师专业类型枚举
export enum EngineerType {
  EXCAVATOR = 'excavator',    // 挖机技师
  LOADER = 'loader',          // 装载机技师
  ELECTRICAL = 'electrical',  // 电工技师
  COMPREHENSIVE = 'comprehensive'  // 综合技师
}

// 工程师接口定义
export interface Engineer {
  id: number;
  name: string;
  level: EngineerLevel;
  type: EngineerType;
  skills: string[];
  phone: string;
  specialization: string;
  isActive: boolean;
}

// 工程师数据
export const engineers: Engineer[] = [
  {
    id: 1,
    name: '张星',
    level: EngineerLevel.INTERMEDIATE,
    type: EngineerType.EXCAVATOR,
    skills: ['液压系统', '发动机板块'],
    specialization: '挖机中级技师',
    phone: '13929620127',
    isActive: true
  },
  {
    id: 2,
    name: '古松',
    level: EngineerLevel.INTERMEDIATE,
    type: EngineerType.LOADER,
    skills: ['装载机整车维修'],
    specialization: '装机中级技师',
    phone: '13535359565',
    isActive: true
  },
  {
    id: 3,
    name: '游咏锐',
    level: EngineerLevel.JUNIOR,
    type: EngineerType.ELECTRICAL,
    skills: ['装挖整车电路系统', '空调系统'],
    specialization: '电工初级技师',
    phone: '18350642423',
    isActive: true
  },
  {
    id: 4,
    name: '叶世湾',
    level: EngineerLevel.JUNIOR,
    type: EngineerType.ELECTRICAL,
    skills: ['装挖整车电路系统', '空调系统'],
    specialization: '电工初级技师',
    phone: '18350642423',
    isActive: true
  }
]
