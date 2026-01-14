# ビルドステージ
FROM node:20-alpine AS builder

WORKDIR /app

# ビルド時の引数を受け取る
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

# 本番ステージ
FROM nginx:alpine

# htpasswdコマンドのためにapache2-utilsをインストール
RUN apk add --no-cache apache2-utils

# ビルド成果物をコピー
COPY --from=builder /app/dist /usr/share/nginx/html

# nginx設定をコピー
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 起動スクリプトをコピー
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/entrypoint.sh"]
