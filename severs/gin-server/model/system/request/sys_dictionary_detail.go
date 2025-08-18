package request

import (
	"gin-server/model/common/request"
	"gin-server/model/system"
)

type SysDictionaryDetailSearch struct {
	system.SysDictionaryDetail
	request.PageInfo
}
