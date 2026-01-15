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

## コンポーネント作成ルール

### フォルダ構造

各コンポーネントは個別のフォルダに配置する。

```
src/components/
├── Button/
│   ├── Button.tsx          # コンポーネント本体
│   ├── Button.stories.tsx  # Storybookストーリー
│   └── index.tsx           # エクスポート用
├── LoginForm/
│   ├── LoginForm.tsx
│   ├── LoginForm.stories.tsx
│   └── index.tsx
└── ...
```

### ファイル構成

#### 1. コンポーネント本体（例: `Button.tsx`）

```tsx
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export function Button({ variant = 'primary', size = 'md', children }: ButtonProps) {
  return <button className={`button button--${variant} button--${size}`}>{children}</button>
}
```

**ポイント:**
- Propsの型を`export`する
- 関数コンポーネントは`function`宣言を使用
- デフォルト値は引数のデストラクチャリングで設定

#### 2. index.tsx（エクスポート用）

```tsx
export { Button } from './Button'
export type { ButtonProps } from './Button'
```

**ポイント:**
- コンポーネントと型の両方をエクスポート
- これにより `import { Button } from '@/components/Button'` のようにインポート可能

### コンポーネント設計原則

#### コンテナ/プレゼンテーション分離パターン

コンポーネントは以下の2つに分離する：

**1. プレゼンテーションコンポーネント（componentsフォルダ）**
- UIの見た目のみを担当
- ビジネスロジックを持たない
- propsで全ての値とハンドラーを受け取る
- 再利用可能

```tsx
// components/LoginForm/LoginForm.tsx
export interface LoginFormProps {
  username: string
  password: string
  error?: string
  onUsernameChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
}

export function LoginForm({ username, password, error, onUsernameChange, onPasswordChange, onSubmit }: LoginFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <input value={username} onChange={(e) => onUsernameChange(e.target.value)} />
      <input value={password} onChange={(e) => onPasswordChange(e.target.value)} type="password" />
      {error && <div>{error}</div>}
      <button type="submit">ログイン</button>
    </form>
  )
}
```

**2. コンテナコンポーネント（pagesフォルダ）**
- ビジネスロジックを担当
- 状態管理（useState, useReducerなど）
- API呼び出し
- プレゼンテーションコンポーネントを使用

```tsx
// pages/Login.tsx
export function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // ビジネスロジック
  }

  return (
    <LoginForm
      username={username}
      password={password}
      error={error}
      onUsernameChange={setUsername}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
    />
  )
}
```

**メリット:**
- テスト容易性の向上
- 再利用性の向上
- Storybookで様々な状態を簡単にテスト可能
- 責任の明確化

## Storybook

### Storybookの使い方

コンポーネントを作成したら、必ずStorybookストーリーを追加する。

#### ストーリーファイルの作成

ファイル名: `{コンポーネント名}.stories.tsx`

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta = {
  title: 'Components/Button',  // Storybookでの表示パス
  component: Button,
  parameters: {
    layout: 'centered',  // コンポーネントを中央配置
  },
  tags: ['autodocs'],  // 自動ドキュメント生成
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
      description: 'ボタンの種類',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// 各ストーリーを定義
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'ボタン',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'ボタン',
  },
}
```

### イベントハンドラーのモック

フォームやボタンなど、イベントハンドラーを持つコンポーネントの場合：

```tsx
import { fn } from '@storybook/test'

const meta = {
  title: 'Components/LoginForm',
  component: LoginForm,
  args: {
    onUsernameChange: fn(),  // モック関数
    onPasswordChange: fn(),
    onSubmit: fn(),
  },
} satisfies Meta<typeof LoginForm>

export const Default: Story = {
  args: {
    username: '',
    password: '',
  },
}

export const WithError: Story = {
  args: {
    username: 'admin',
    password: 'wrong',
    error: 'ログインに失敗しました',
  },
}
```

### Storybookコマンド

```bash
# Storybook起動
npm run storybook

# Storybookビルド
npm run build-storybook
```

### Storybookでテストすべき状態

コンポーネントごとに以下の状態をストーリーで作成する：

1. **Default**: 初期状態
2. **WithValues**: 値が入力された状態
3. **WithError**: エラー表示状態
4. **Loading**: ローディング状態（該当する場合）
5. **Disabled**: 無効化状態（該当する場合）

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
