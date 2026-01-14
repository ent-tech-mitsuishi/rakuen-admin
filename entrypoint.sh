#!/bin/sh
set -e

# 環境変数からhtpasswdファイルを生成
if [ -n "$BASIC_AUTH_USER" ] && [ -n "$BASIC_AUTH_PASS" ]; then
    htpasswd -cb /etc/nginx/.htpasswd "$BASIC_AUTH_USER" "$BASIC_AUTH_PASS"
else
    echo "Warning: BASIC_AUTH_USER or BASIC_AUTH_PASS not set"
    # 認証なしで起動するためにauth_basicを無効化
    sed -i 's/auth_basic/#auth_basic/g' /etc/nginx/conf.d/default.conf
fi

# nginx.confの$PORTを実際のポートに置換
sed -i "s/\$PORT/${PORT:-3000}/g" /etc/nginx/conf.d/default.conf

# nginxを起動
exec nginx -g "daemon off;"
