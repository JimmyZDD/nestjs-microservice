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
RUN pnpm deploy --filter=item-server --prod /prod/item-server


###################
# PRODUCTION
###################
FROM base As production

# 创建应用目录
WORKDIR /usr/app

# 从 build 镜像中复制构建好的代码到最终的镜像中
COPY --from=build /prod/item-server ./
RUN pnpm add -D cross-env

EXPOSE 9001

# 启动服务
CMD [ "pnpm", "start:prod" ]

# docker build -t item-server .
# docker run -p 9001:9001 -d --name itemServerApp item-server
# docker rm -f itemServerApp
# docker rmi -f item-server
