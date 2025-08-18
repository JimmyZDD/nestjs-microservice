/*
 * @Author: zdd dongdong@grizzlychina.com
 * @Date: 2025-08-18 10:10:02
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2025-08-18 10:28:39
 * @FilePath: /nestjs-microservice/severs/gin-server/utils/ast/interfaces_base.go
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
package ast

import (
	"gin-server/global"
	"go/ast"
	"go/format"
	"go/parser"
	"go/token"
	"io"
	"os"
	"path"
	"path/filepath"
	"strings"

	"github.com/pkg/errors"
)

type Base struct{}

func (a *Base) Parse(filename string, writer io.Writer) (file *ast.File, err error) {
	fileSet := token.NewFileSet()
	if writer != nil {
		file, err = parser.ParseFile(fileSet, filename, nil, parser.ParseComments)
	} else {
		file, err = parser.ParseFile(fileSet, filename, writer, parser.ParseComments)
	}
	if err != nil {
		return nil, errors.Wrapf(err, "[filepath:%s]打开/解析文件失败!", filename)
	}
	return file, nil
}

func (a *Base) Rollback(file *ast.File) error {
	return nil
}

func (a *Base) Injection(file *ast.File) error {
	return nil
}

func (a *Base) Format(filename string, writer io.Writer, file *ast.File) error {
	fileSet := token.NewFileSet()
	if writer == nil {
		open, err := os.OpenFile(filename, os.O_WRONLY|os.O_TRUNC, 0666)
		defer open.Close()
		if err != nil {
			return errors.Wrapf(err, "[filepath:%s]打开文件失败!", filename)
		}
		writer = open
	}
	err := format.Node(writer, fileSet, file)
	if err != nil {
		return errors.Wrapf(err, "[filepath:%s]注入失败!", filename)
	}
	return nil
}

// RelativePath 绝对路径转相对路径
func (a *Base) RelativePath(filePath string) string {
	server := filepath.Join(global.GVA_CONFIG.AutoCode.Root, global.GVA_CONFIG.AutoCode.Server)
	hasServer := strings.Index(filePath, server)
	if hasServer != -1 {
		filePath = strings.TrimPrefix(filePath, server)
		keys := strings.Split(filePath, string(filepath.Separator))
		filePath = path.Join(keys...)
	}
	return filePath
}

// AbsolutePath 相对路径转绝对路径
func (a *Base) AbsolutePath(filePath string) string {
	server := filepath.Join(global.GVA_CONFIG.AutoCode.Root, global.GVA_CONFIG.AutoCode.Server)
	keys := strings.Split(filePath, "/")
	filePath = filepath.Join(keys...)
	filePath = filepath.Join(server, filePath)
	return filePath
}
