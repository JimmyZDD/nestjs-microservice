package request

import (
	"gin-server/model/common/request"
	"gin-server/model/system"
)

type SysOperationRecordSearch struct {
	system.SysOperationRecord
	request.PageInfo
}
