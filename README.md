# 里山ドッグラン - フロントエンド・バックエンド分離版

里山ドッグランの管理システムをフロントエンド（Next.js）とバックエンド（FastAPI）に分離したバージョンです。

## 🏗️ プロジェクト構造

```
satoyamadogrun/
├── frontend/          # Next.js フロントエンド
│   ├── app/          # Next.js アプリケーション
│   ├── components/   # React コンポーネント
│   ├── lib/          # ユーティリティ・API クライアント
│   ├── hooks/        # カスタムフック
│   └── README.md     # フロントエンド詳細
├── backend/          # FastAPI バックエンド
│   ├── main.py       # FastAPI アプリケーション
│   ├── models.py     # データベースモデル
│   ├── auth.py       # 認証機能
│   ├── database.py   # データベース設定
│   ├── config.py     # 設定管理
│   ├── exceptions.py # カスタム例外
│   ├── utils.py      # ユーティリティ関数
│   └── README.md     # バックエンド詳細
└── README.md         # プロジェクト概要
```

## 🚀 クイックスタート

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd satoyamadogrun
```

### 2. バックエンド（FastAPI）のセットアップ

```bash
cd backend

# 仮想環境の作成
python -m venv venv
source venv/bin/activate  # macOS/Linux
# venv\Scripts\activate  # Windows

# 依存関係のインストール
pip install -r requirements.txt

# 環境変数の設定
cp env.example .env
# .envファイルを編集して適切な値を設定

# サーバーの起動
python main.py
```

バックエンドは `http://localhost:8000` で起動します。

### 3. フロントエンド（Next.js）のセットアップ

```bash
cd frontend

# 依存関係のインストール
npm install --legacy-peer-deps

# 環境変数の設定
cp env.local.example .env.local
# .env.localファイルを編集して適切な値を設定

# 開発サーバーの起動
npm run dev
```

フロントエンドは `http://localhost:3000` で起動します。

## 📋 主な機能

### 🏠 ホーム画面
- ユーザー登録・ログイン機能
- 利用規約の表示
- ワクチン証明書のアップロード

### 📅 イベント画面
- ドッグランとサロンのカレンダー表示
- 月別の予約状況確認

### 💬 投稿画面（ログイン後）
- コミュニティ投稿の作成・閲覧
- ハッシュタグ機能
- コメント機能

### 🎫 入場画面（ログイン後）
- QRコードスキャン機能
- 愛犬の選択
- 入場・退場管理

### 👤 マイページ（ログイン後）
- 愛犬の登録・編集
- プロフィール管理
- お知らせ確認

## 🔧 技術スタック

### フロントエンド
- **Framework**: Next.js 15.2.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **HTTP Client**: Axios
- **State Management**: React Hooks

### バックエンド
- **Framework**: FastAPI 0.104.1
- **Language**: Python 3.8+
- **Database**: SQLite (開発) / PostgreSQL (本番)
- **ORM**: SQLAlchemy
- **Authentication**: JWT
- **Password Hashing**: bcrypt

## 📚 API ドキュメント

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## 🔌 API エンドポイント

### 認証
- `POST /auth/register` - ユーザー登録
- `POST /auth/login` - ログイン
- `POST /auth/forgot-password` - パスワードリセット

### ユーザー管理
- `GET /users/me` - 現在のユーザー情報
- `PUT /users/profile` - プロフィール更新

### 犬の管理
- `GET /dogs` - ユーザーの犬一覧
- `POST /dogs` - 犬の登録
- `PUT /dogs/{dog_id}` - 犬の情報更新
- `DELETE /dogs/{dog_id}` - 犬の削除

### 投稿機能
- `GET /posts` - 投稿一覧
- `POST /posts` - 投稿作成
- `POST /posts/{post_id}/like` - いいね
- `POST /posts/{post_id}/comments` - コメント追加

### その他
- `GET /events` - イベント一覧
- `GET /notices` - お知らせ一覧
- `GET /tags` - タグ一覧
- `POST /entry/enter` - 入場
- `POST /entry/exit` - 退場

## 🛠️ 開発ガイドライン

### コードスタイル
- **TypeScript**: 厳密な型定義
- **PEP 8**: Python コーディング規約
- **ESLint**: JavaScript/TypeScript リンティング

### エラーハンドリング
- **フロントエンド**: カスタムエラークラスとトースト通知
- **バックエンド**: 統一された例外処理

### セキュリティ
- **JWT認証**: セキュアなトークン管理
- **パスワードハッシュ**: bcrypt による暗号化
- **入力検証**: 厳密なバリデーション

### パフォーマンス
- **React Hooks**: 効率的な状態管理
- **SQLAlchemy**: 最適化されたデータベースクエリ
- **Caching**: 適切なキャッシュ戦略

## 🧪 テスト

### フロントエンド
```bash
cd frontend
npm run lint
npm run build
```

### バックエンド
```bash
cd backend
python -m pytest tests/
```

## 🚀 デプロイ

### フロントエンド
```bash
cd frontend
npm run build
npm run start
```

### バックエンド
```bash
cd backend
pip install gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
```

## 📝 環境変数

### フロントエンド (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### バックエンド (.env)
```env
DATABASE_URL=sqlite:///./satoyama_dogrun.db
SECRET_KEY=your-secret-key-here-change-this-in-production
HOST=0.0.0.0
PORT=8000
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

## 🤝 コントリビューション

1. フォークを作成
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 📞 サポート

問題や質問がある場合は、GitHubのIssuesページでお知らせください。