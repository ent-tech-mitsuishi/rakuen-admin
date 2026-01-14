# ラクエン Admin - プロジェクトルール

## useEffect の使用制限

useEffectは原則として使用禁止とする。

### 理由

- useEffectは副作用の管理が複雑になりやすい
- 依存配列の管理ミスによるバグが発生しやすい
- データフェッチにはより適切な手段がある

### 代替手段

| ユースケース | 推奨手段 |
|-------------|---------|
| データフェッチ | TanStack Query (React Query)、SWR、またはローダー関数 |
| イベントリスナー | イベントハンドラーで直接処理 |
| DOM操作 | ref と useRef を使用 |
| 外部ストアとの同期 | useSyncExternalStore |
| アニメーション | CSS、Framer Motion等のライブラリ |

### 許可される例外

以下の場合のみuseEffectの使用を許可する：

1. サードパーティライブラリとの統合で他に手段がない場合
2. レガシーコードの一時的な対応（要リファクタリングコメント）

例外的に使用する場合は、コメントで理由を明記すること：

```tsx
// useEffect使用理由: ○○ライブラリの初期化に必要
useEffect(() => {
  // ...
}, [])
```

## ディレクトリ構成

```
src/
├── components/   # 再利用可能なUIコンポーネント
├── layouts/      # ページレイアウト
├── pages/        # ページコンポーネント
└── router.tsx    # ルーティング設定
```

## コンポーネント命名規則

- コンポーネント: PascalCase (例: `Button.tsx`)
- Storyファイル: `*.stories.tsx`
- ページ: `pages/` 配下に配置

## デプロイ設定

### 本番環境

- ホスティング: Railway
- ビルド: Docker (マルチステージビルド)
- Webサーバー: nginx
- 認証: ベーシック認証

### 重要なファイル

| ファイル | 説明 |
|---------|------|
| `Dockerfile` | 本番用。ビルド時に`VITE_API_URL`を`ARG`で受け取る |
| `nginx.conf` | ベーシック認証設定。`/health`は認証なし |
| `entrypoint.sh` | 起動時に環境変数から`.htpasswd`を生成 |
| `railway.toml` | Railway設定。`buildArgs`で環境変数をビルドに渡す |

### Vite環境変数の注意点

- Viteの`VITE_*`環境変数は**ビルド時**に埋め込まれる
- Railwayで環境変数を変更したら**再デプロイが必要**
- `railway.toml`の`buildArgs`で環境変数をDockerビルドに渡す

### nginx設定のポイント

- `listen __PORT__` はプレースホルダー。`entrypoint.sh`で実際のポートに置換
- `$uri`などのnginx変数と混同しないよう`__PORT__`形式を使用

### Railway環境変数

| 変数名 | 用途 | ビルド時/実行時 |
|--------|------|----------------|
| VITE_API_URL | API接続先 | ビルド時 |
| BASIC_AUTH_USER | 認証ユーザー名 | 実行時 |
| BASIC_AUTH_PASS | 認証パスワード | 実行時 |
| PORT | リッスンポート | 実行時（Railway自動設定） |

### ローカル開発

- `npm run dev`を使用（Dockerは使わない）
- `.env.development`にローカル用の環境変数を設定
- `.env.development`は`.gitignore`に含まれている
