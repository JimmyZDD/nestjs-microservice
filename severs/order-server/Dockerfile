###################
# BUILD FOR LOCAL DEVELOPMENT
###################
FROM golang:alpine As build

WORKDIR /usr/app

COPY ./severs/order-server .

# 设置proxy环境变量，国内用户必选
ENV GOPROXY https://goproxy.cn,direct
# 安装UPX压缩壳
RUN echo "https://mirrors.aliyun.com/alpine/v3.8/main/" > /etc/apk/repositories \
  && echo "https://mirrors.aliyun.com/alpine/v3.8/community/" >> /etc/apk/repositories \
  && apk add --no-cache upx

# 编译
RUN GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -ldflags="-w -s" -o dist/app

#对main二进制文件进行upx压缩后，卸载upx压缩壳程序
RUN upx -9 /usr/app/dist/app && apk del upx

###################
# PRODUCTION
###################
FROM alpine As production

WORKDIR /usr/app

# 复制编译阶段编译出来的运行文件到目标目录
COPY --from=build /usr/app/dist/app ./app

# 将时区设置为东八区
RUN echo "https://mirrors.aliyun.com/alpine/v3.8/main/" > /etc/apk/repositories \
  && echo "https://mirrors.aliyun.com/alpine/v3.8/community/" >> /etc/apk/repositories \
  && apk add --no-cache tzdata \
  && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
  && echo Asia/Shanghai > /etc/timezone \
  && apk del tzdata

EXPOSE 9002

# docker run命令触发的真实命令(相当于直接运行编译后的可运行文件)
ENTRYPOINT ["./app"]

# docker build -t order-server .
# docker run -p 9020:9002 -d --name orderServerApp order-server
# docker rm -f orderServerApp
# docker rmi -f order-server
