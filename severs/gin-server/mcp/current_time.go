package mcpTool

import (
	"context"
	"github.com/mark3labs/mcp-go/mcp"
)

func init() {
	RegisterTool(&CurrentTime{})
}

type CurrentTime struct {
}

// 2222
func (t *CurrentTime) Handle(ctx context.Context, request mcp.CallToolRequest) (*mcp.CallToolResult, error) {
	// TODO: 实现工具逻辑
	// 参数示例:
	//
	return &mcp.CallToolResult{
		Content: []mcp.Content{
		},
	}, nil
}

func (t *CurrentTime) New() mcp.Tool {
	return mcp.NewTool("CurrentTime",
		mcp.WithDescription("2222"),
	)
}
