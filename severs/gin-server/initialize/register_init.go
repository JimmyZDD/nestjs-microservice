package initialize

import (
	_ "gin-server/source/example"
	_ "gin-server/source/system"
)

func init() {
	// do nothing,only import source package so that inits can be registered
}
