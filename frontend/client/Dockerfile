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
RUN pnpm install --frozen-lockfile

# 复制源代码
COPY . .
RUN  pnpm run build

# 使用镜像中的node用户(而不是 root 用户)


###################
# PRODUCTION
###################

FROM bitnami/nginx:latest As production

# 从 build 镜像中复制构建好的代码到最终的镜像中
COPY --from=build /usr/app/dist/ /usr/share/nginx/html/
COPY --from=build /usr/app/nginx/default.conf /opt/bitnami/nginx/conf/server_blocks/default.conf

EXPOSE 80
# 使用镜像中的node用户(而不是 root 用户)


###################
# PRODUCTION
###################

# docker build -t vuenginxcontainer .
# docker run -p 3000:80 -d --name vueApp vuenginxcontainer
# docker rm -f vueApp
# docker rmi -f vuenginxcontainer