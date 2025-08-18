/*
 * @Author: zdd dongdong@grizzlychina.com
 * @Date: 2025-08-11 14:46:46
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2025-08-18 11:00:39
 * @FilePath: /nestjs-microservice/severs/gin-server/source/system/api_ignore.go
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
package system

import (
	"context"

	sysModel "gin-server/model/system"
	"gin-server/service/system"

	"github.com/pkg/errors"
	"gorm.io/gorm"
)

type initApiIgnore struct{}

const initOrderApiIgnore = initOrderApi + 1

// auto run
func init() {
	system.RegisterInit(initOrderApiIgnore, &initApiIgnore{})
}

func (i *initApiIgnore) InitializerName() string {
	return sysModel.SysIgnoreApi{}.TableName()
}

func (i *initApiIgnore) MigrateTable(ctx context.Context) (context.Context, error) {
	db, ok := ctx.Value("db").(*gorm.DB)
	if !ok {
		return ctx, system.ErrMissingDBContext
	}
	return ctx, db.AutoMigrate(&sysModel.SysIgnoreApi{})
}

func (i *initApiIgnore) TableCreated(ctx context.Context) bool {
	db, ok := ctx.Value("db").(*gorm.DB)
	if !ok {
		return false
	}
	return db.Migrator().HasTable(&sysModel.SysIgnoreApi{})
}

func (i *initApiIgnore) InitializeData(ctx context.Context) (context.Context, error) {
	db, ok := ctx.Value("db").(*gorm.DB)
	if !ok {
		return ctx, system.ErrMissingDBContext
	}
	entities := []sysModel.SysIgnoreApi{
		{Method: "GET", Path: "/swagger/*any"},
		{Method: "GET", Path: "/api/freshCasbin"},
		{Method: "GET", Path: "/uploads/file/*filepath"},
		{Method: "GET", Path: "/health"},
		{Method: "HEAD", Path: "/uploads/file/*filepath"},
		{Method: "POST", Path: "/system/reloadSystem"},
		{Method: "POST", Path: "/base/login"},
		{Method: "POST", Path: "/base/captcha"},
		{Method: "POST", Path: "/init/initdb"},
		{Method: "POST", Path: "/init/checkdb"},
		{Method: "GET", Path: "/info/getInfoDataSource"},
		{Method: "GET", Path: "/info/getInfoPublic"},
		{Method: "POST", Path: "/autoCode/llmAuto"},
	}
	if err := db.Create(&entities).Error; err != nil {
		return ctx, errors.Wrap(err, sysModel.SysIgnoreApi{}.TableName()+"表数据初始化失败!")
	}
	next := context.WithValue(ctx, i.InitializerName(), entities)
	return next, nil
}

func (i *initApiIgnore) DataInserted(ctx context.Context) bool {
	db, ok := ctx.Value("db").(*gorm.DB)
	if !ok {
		return false
	}
	if errors.Is(db.Where("path = ? AND method = ?", "/swagger/*any", "GET").
		First(&sysModel.SysIgnoreApi{}).Error, gorm.ErrRecordNotFound) {
		return false
	}
	return true
}
