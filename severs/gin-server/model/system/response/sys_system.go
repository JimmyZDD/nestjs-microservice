package response

import "gin-server/config"

type SysConfigResponse struct {
	Config config.Server `json:"config"`
}
