###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As build

# 创建应用目录
WORKDIR /usr/app

# 安装pnpm
RUN npm install -g pnpm
RUN pnpm config set registry https://registry.npm.taobao.org

# 使用 npm ci 安装应用依赖
COPY pnpm-lock.yaml ./
COPY package*.json ./
RUN pnpm install


# 设置 NODE_ENV 环境变量
ENV NODE_ENV production

# 复制源代码
COPY . .
RUN pnpm build

# 运行 `npm ci` 命令移除存在的 node_modules 目录并传递 `--only=production`参数，以确保只安装生产依赖。
# 这样我们就可以保证 node_modules 目录尽可能得被优化。
RUN pnpm install --prod

###################
# PRODUCTION
###################

FROM node:18-alpine As production

# 创建应用目录
WORKDIR /usr/app

# 从 build 镜像中复制构建好的代码到最终的镜像中
COPY --from=build /usr/app/node_modules ./node_modules
COPY --from=build /usr/app/dist ./dist

EXPOSE 9001

# 启动服务
CMD [ "node", "./dist/main.js" ]

# docker build -t item-server .
# docker run -p 9001:9001 -d --name itemServerApp item-server
# docker rm -f itemServerApp
# docker rmi -f item-server
