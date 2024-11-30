// 后端控制器
export class EngineerController {
  // 获取工程师列表
  async getEngineers(ctx) {
    const { type, skill } = ctx.query;
    const engineers = await EngineerService.find({ type, skill });
    ctx.body = engineers;
  }

  // 根据电话查找工程师
  async getEngineerByPhone(ctx) {
    const { phone } = ctx.params;
    const engineer = await EngineerService.findByPhone(phone);
    ctx.body = engineer;
  }
} 