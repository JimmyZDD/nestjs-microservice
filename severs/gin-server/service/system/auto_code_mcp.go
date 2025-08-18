/*
 * @Author: zdd dongdong@grizzlychina.com
 * @Date: 2025-08-18 10:09:19
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2025-08-18 10:18:47
 * @FilePath: /nestjs-microservice/severs/gin-server/service/system/auto_code_mcp.go
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
package system

import (
	"context"
	"gin-server/global"
	"gin-server/model/system/request"
	"gin-server/utils"
	"gin-server/utils/autocode"
	"os"
	"path/filepath"
	"text/template"
)

func (s *autoCodeTemplate) CreateMcp(ctx context.Context, info request.AutoMcpTool) (toolFilePath string, err error) {
	mcpTemplatePath := filepath.Join(global.GVA_CONFIG.AutoCode.Root, global.GVA_CONFIG.AutoCode.Server, "resource", "mcp", "tools.tpl")
	mcpToolPath := filepath.Join(global.GVA_CONFIG.AutoCode.Root, global.GVA_CONFIG.AutoCode.Server, "mcp")

	var files *template.Template

	templateName := filepath.Base(mcpTemplatePath)

	files, err = template.New(templateName).Funcs(autocode.GetTemplateFuncMap()).ParseFiles(mcpTemplatePath)
	if err != nil {
		return
	}

	fileName := utils.HumpToUnderscore(info.Name)

	toolFilePath = filepath.Join(mcpToolPath, fileName+".go")

	f, err := os.Create(toolFilePath)
	if err != nil {
		return
	}
	defer f.Close()

	// 执行模板，将内容写入文件
	err = files.Execute(f, info)
	if err != nil {
		return
	}

	return

}
