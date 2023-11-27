###################
# base
###################
FROM node:18-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable


###################
# build
###################
FROM base As build

# 创建应用目录
WORKDIR /usr/app

# 安装pnpm
RUN pnpm config set registry https://registry.npm.taobao.org

# Docker部署monorepo, 借助了pnpm fetch和pnpm install --offline这两个特点
COPY ./pnpm-lock.yaml ./
RUN pnpm fetch

# 将整个项目复制下来
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install -r --offline

# 设置 NODE_ENV 环境变量
ENV NODE_ENV production
RUN pnpm run -r build
RUN pnpm deploy --filter=user-server --prod /prod/user-server

###################
# PRODUCTION
###################
FROM base As production

# 创建应用目录
WORKDIR /usr/app

# 从 build 镜像中复制构建好的代码到最终的镜像中
COPY --from=build /prod/user-server ./

EXPOSE 9003

# 启动服务
CMD [ "node", "dist/main.js" ]

# docker build -t user-server .
# docker run -p 9003:9003 -d --name userServerApp user-server
# docker rm -f userServerApp
# docker rmi -f user-server
