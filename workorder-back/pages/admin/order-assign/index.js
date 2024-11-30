import { getEngineersBySkill } from '../../../data/engineers';

Page({
  data: {
    order: null,
    availableEngineers: []
  },

  onLoad(options) {
    const { deviceType, faultType } = options;
    
    // 根据故障类型筛选合适的工程师
    let engineers = [];
    if (faultType === '空调故障') {
      engineers = getEngineersBySkill('空调系统');
    } else if (faultType === '液压故障') {
      engineers = getEngineersBySkill('液压系统');
    }

    this.setData({
      availableEngineers: engineers
    });
  }
}); 