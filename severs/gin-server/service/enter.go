/*
 * @Author: zdd dongdong@grizzlychina.com
 * @Date: 2025-08-11 14:46:46
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2025-08-18 14:19:28
 * @FilePath: /nestjs-microservice/severs/gin-server/service/enter.go
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
package service

import (
	"gin-server/service/example"
	"gin-server/service/system"
)

var ServiceGroupApp = new(ServiceGroup)

type ServiceGroup struct {
	SystemServiceGroup  system.ServiceGroup
	ExampleServiceGroup example.ServiceGroup
}
