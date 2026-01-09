# Rakuen Admin

インフルエンサー管理Webアプリ「ラクエン」の管理画面

## 技術スタック

- React 18
- TypeScript 5.6
- Vite 5
- Docker

## ディレクトリ構成

```
rakuen-admin/
├── src/
│   ├── main.tsx         # エントリーポイント
│   ├── App.tsx          # ルートコンポーネント
│   ├── index.css        # グローバルスタイル
│   └── vite-env.d.ts    # Vite型定義
├── index.html           # HTMLテンプレート
├── package.json         # npm設定
├── tsconfig.json        # TypeScript設定
├── vite.config.ts       # Vite設定
├── eslint.config.js     # ESLint設定
├── .prettierrc          # Prettier設定
├── Dockerfile           # Dockerイメージ定義
└── docker-compose.yml   # Docker Compose設定
```

## 起動方法

### 前提条件

rakuen-api が起動していること（共有ネットワーク `rakuen-network` が必要）

### Docker（推奨）

```bash
docker compose up --build -d
```

### ローカル

```bash
npm install
npm run dev
```

## 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# Lint実行
npm run lint

# Lint自動修正
npm run lint:fix

# コード整形
npm run format

# コード整形チェック
npm run format:check

# プレビュー
npm run preview
```

## 環境変数

| 変数名 | 説明 | デフォルト値 |
|--------|------|-------------|
| VITE_API_URL | APIのベースURL | http://localhost:8080 |

## ポート

| サービス | ポート |
|---------|--------|
| Admin | 5173 |

## ネットワーク

このサービスは `rakuen-network` という外部ネットワークに接続します。
先に `rakuen-api` を起動してネットワークを作成してください。
