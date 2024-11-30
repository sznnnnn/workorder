interface Vehicle {
    id: string;           // 车牌号作为唯一标识
    type: VehicleType;    // 车辆类型
    description: string;  // 车辆描述
    status?: number;      // 车辆状态：0-空闲，1-使用中，2-维修中
  }
  
  enum VehicleType {
    INSPECTION = 'inspection',   // 检修车
    PICKUP = 'pickup',          // 皮卡
    TRUCK = 'truck',           // 货车
    OTHER = 'other'            // 其他
  }
  
  export const vehicles: Vehicle[] = [
    {
      id: '粤DYP068',
      type: VehicleType.INSPECTION,
      description: '检修车'
    },
    {
      id: '粤D1865Q',
      type: VehicleType.PICKUP,
      description: '皮卡'
    },
    {
      id: '粤DAW339',
      type: VehicleType.OTHER,
      description: ''
    },
    {
      id: '粤DB529D',
      type: VehicleType.OTHER,
      description: ''
    },
    {
      id: '粤DA533H',
      type: VehicleType.OTHER,
      description: ''
    },
    {
      id: '粤D9856C',
      type: VehicleType.OTHER,
      description: ''
    },
    {
      id: '粤DXA399',
      type: VehicleType.OTHER,
      description: ''
    },
    {
      id: '粤D1892H',
      type: VehicleType.OTHER,
      description: ''
    },
    {
      id: '粤D3859A',
      type: VehicleType.TRUCK,
      description: '货车'
    }
  ];