import { 
  engineers, 
  EngineerLevel, 
  EngineerType,
  getEngineersBySkill,
  findEngineerByPhone 
} from '../../../data/engineers';

Page({
  data: {
    engineerList: [],  // 工程师列表
    selectedType: '',  // 选中的工程师类型
  },

  // 页面加载时
  onLoad() {
    // 获取所有工程师并设置到页面数据中
    this.setData({
      engineerList: engineers
    });
  },

  // 按技能筛选工程师
  filterBySkill(skill) {
    const filteredEngineers = getEngineersBySkill(skill);
    this.setData({
      engineerList: filteredEngineers
    });
  },

  // 搜索特定工程师
  searchEngineer(phone) {
    const engineer = findEngineerByPhone(phone);
    if (engineer) {
      this.setData({
        engineerList: [engineer]
      });
    } else {
      wx.showToast({
        title: '未找到工程师',
        icon: 'none'
      });
    }
  },

  // 按类型筛选工程师
  filterByType(type) {
    const filteredEngineers = getEngineersByType(type);
    this.setData({
      engineerList: filteredEngineers
    });
  },

  // 处理筛选按钮点击
  handleFilterClick(e) {
    const { type } = e.currentTarget.dataset;
    this.filterByType(type);
  },

  // 处理搜索输入
  handleSearch(e) {
    const phone = e.detail.value;
    this.searchEngineer(phone);
  }
}); 