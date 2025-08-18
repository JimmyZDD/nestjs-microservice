/*
 * @Author: zdd dongdong@grizzlychina.com
 * @Date: 2025-08-11 14:46:46
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2025-08-18 10:17:44
 * @FilePath: /nestjs-microservice/severs/gin-server/service/system/enter.go
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
package system

type ServiceGroup struct {
	JwtService
	ApiService
	MenuService
	UserService
	CasbinService
	InitDBService
	BaseMenuService
	AuthorityService
	DictionaryService
	SystemConfigService
	OperationRecordService
	DictionaryDetailService
	AuthorityBtnService
	SysExportTemplateService
	SysParamsService
	SysVersionService
	AutoCodeService
	AutoCodePlugin   autoCodePlugin
	AutoCodePackage  autoCodePackage
	AutoCodeHistory  autoCodeHistory
	AutoCodeTemplate autoCodeTemplate
}
