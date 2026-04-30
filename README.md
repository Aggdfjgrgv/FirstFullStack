# FirstFullStack (React + FastAPI)

このプロジェクトは、フロントエンドをReact (Vite + TypeScript)、バックエンドをPython FastAPIで進める構成です。

## 1. ディレクトリ構成

- `src/`: Reactフロントエンド
- `backend/app/main.py`: FastAPIエントリポイント
- `backend/requirements.txt`: Python依存関係

## 2. 初回セットアップ

### フロントエンド (Node.js)

```bash
npm install
```

### バックエンド (Python)

任意の仮想環境を作成してから、以下を実行してください。

```bash
pip install -r backend/requirements.txt
```

## 3. 開発サーバー起動

### フロントのみ起動

```bash
npm run dev:frontend
```

### バックのみ起動

```bash
npm run dev:backend
```

### 両方まとめて起動

```bash
npm run dev:all
```

## 4. 接続確認

- フロント: `http://localhost:5173`
- API: `http://127.0.0.1:8000/api/health`

`Home`画面では、Reactから`/api/health`を叩いてレスポンスを表示します。
Viteのプロキシ設定により、フロント側は`/api/...`で呼び出せます。

## 5. 学習の進め方 (おすすめ)

1. FastAPIで`GET /api/health`のような読み取りAPIを増やす
2. Pydanticモデルを使って`POST`のバリデーションを学ぶ
3. React側で`axios` + `useState` + `useEffect`によるデータ取得を定着させる
4. 認証 (JWT) を導入する
5. DB (SQLite/PostgreSQL) とORM (SQLAlchemy) を接続する

次の段階として、必要であれば「ユーザー一覧API」をFastAPIで実装して、既存の`useAllUsers`フックにつなぐ流れで進められます。
