# Rakuen Admin

インフルエンサー管理Webアプリ「ラクエン」の管理画面

## 技術スタック

- React 18
- TypeScript 5.6
- Vite 5
- Docker
- nginx (本番環境)

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
├── Dockerfile           # 本番用Dockerイメージ定義
├── docker-compose.yml   # ローカル開発用Docker Compose設定
├── nginx.conf           # nginx設定（ベーシック認証含む）
├── entrypoint.sh        # コンテナ起動スクリプト
└── railway.toml         # Railway設定
```

## ローカル開発

### 前提条件

rakuen-api が起動していること

### 起動方法

```bash
npm install
npm run dev
```

http://localhost:5173 で起動します。

### 環境変数の設定

`.env.development` ファイルを作成してください：

```bash
VITE_API_URL=http://localhost:8080
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

# Storybook起動
npm run storybook

# Storybookビルド
npm run build-storybook
```

## Storybook

コンポーネントのカタログ・ドキュメントとして Storybook を導入しています。

### 起動方法

```bash
npm run storybook
```

http://localhost:6006 でStorybookが起動します。

### Storyファイルの作成

コンポーネントと同じディレクトリに `*.stories.tsx` ファイルを作成してください。

```
src/components/
├── Button.tsx
└── Button.stories.tsx
```

## デプロイ (Railway)

GitHub + Railway のCI/CDパイプラインでデプロイされます。

### アーキテクチャ

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  rakuen-admin   │────▶│   rakuen-api    │────▶│   PostgreSQL    │
│   (React/nginx) │     │   (Go/Gin)      │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### 本番URL

| サービス | URL |
|---------|-----|
| Admin | https://rakuen-admin-production.up.railway.app |
| API | https://rakuen-api-production.up.railway.app |

### Railway環境変数

| 変数名 | 説明 | 例 |
|--------|------|-----|
| VITE_API_URL | APIのベースURL | https://rakuen-api-production.up.railway.app |
| BASIC_AUTH_USER | ベーシック認証ユーザー名 | admin |
| BASIC_AUTH_PASS | ベーシック認証パスワード | (任意のパスワード) |

### デプロイの流れ

1. `main` ブランチにプッシュ
2. Railwayが自動でビルド・デプロイ
3. ヘルスチェック（`/health`）が通れば公開

### ベーシック認証

本番環境ではnginxによるベーシック認証が有効です。

- `/health` エンドポイントのみ認証なしでアクセス可能（ヘルスチェック用）
- その他のすべてのパスは認証が必要

### トラブルシューティング

#### ビルドが失敗する

- `package-lock.json` がコミットされているか確認
- Railway の「Deployments」タブでログを確認

#### API接続エラー（Failed to fetch）

- `VITE_API_URL` がRailwayに設定されているか確認
- 設定後、再デプロイが必要（Vite環境変数はビルド時に埋め込まれる）

#### ヘルスチェックが失敗する

- `PORT` 環境変数がnginxで正しく使われているか確認
- ベーシック認証が `/health` で無効になっているか確認

## 環境変数

| 変数名 | 説明 | デフォルト値 |
|--------|------|-------------|
| VITE_API_URL | APIのベースURL | http://localhost:8080 |

## ポート

| 環境 | ポート |
|------|--------|
| ローカル開発 | 5173 |
| 本番 (Railway) | 動的（PORT環境変数） |

## Git運用

詳細は [CLAUDE.md](../.claude/CLAUDE.md) を参照。

| ブランチ | 用途 |
|---------|------|
| main | 本番デプロイ用（直接コミット禁止） |
| develop | 開発用ブランチ |

開発時は `develop` から `feature/xxx` ブランチを作成し、PRを送る。
