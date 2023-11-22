```sh
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
```

```shell
protoc --go_out=./pb --go_opt=paths=source_relative --proto_path=../../proto \
  --go-grpc_out=./pb --go-grpc_opt=paths=source_relative \
  order.proto common.proto
```
