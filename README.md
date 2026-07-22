# IKE Products — Portfolio Site

App Development・Consulting・Music Production を手がける個人事業「IKE Products」のポートフォリオサイトです。
HTML / CSS / JavaScript のみで構成された静的サイトで、GitHub Pages でそのまま公開できます。

## 構成

```
ike-products-portfolio/
├── index.html
├── README.md
└── assets/
    ├── css/
    │   └── style.css      # レイアウト・ライト/ダークテーマ・レスポンシブ
    ├── js/
    │   └── script.js      # スムーススクロール・テーマ切替・遅延ロード・スクロールスパイ
    ├── images/             # ロゴ・バナー・背景・ポートフォリオ画像
    └── fonts/              # Google Fonts (Poppins / Inter) はCDN経由で読み込み
```

## 機能

- レスポンシブデザイン（768px をブレークポイントにモバイル/デスクトップを切替）
- ダークテーマ / ライトテーマの切替（右上のボタン、選択は `localStorage` に保存）
- ナビゲーションのスムーススクロール、スクロール位置に応じたアクティブリンク表示
- 画像の遅延読み込み（`loading="lazy"`）
- スクロールに応じたフェードインアニメーション
- SEO 用 meta タグ / OGP / favicon 設定済み

## ローカルで確認する

静的ファイルのみのため、任意の簡易サーバーで確認できます。

```bash
# Python がある場合
python -m http.server 8000

# Node.js がある場合
npx serve .
```

ブラウザで `http://localhost:8000` を開いて確認してください。
（`index.html` を直接ダブルクリックして `file://` で開いても動作しますが、簡易サーバー経由を推奨します。）

## GitHub Pages へのデプロイ手順

1. GitHub に新しいリポジトリを作成する（例: `ike-products-portfolio`）。
2. このフォルダの中身をリポジトリのルートに配置し、コミット・プッシュする。

   ```bash
   cd ike-products-portfolio
   git init
   git add .
   git commit -m "Initial commit: IKE Products portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/ike-products-portfolio.git
   git push -u origin main
   ```

3. GitHub のリポジトリページで **Settings → Pages** を開く。
4. **Source** を `Deploy from a branch` に設定し、Branch を `main` / `/(root)` に指定して **Save** をクリックする。
5. 数分待つと、以下の URL でサイトが公開される。

   ```
   https://<your-username>.github.io/ike-products-portfolio/
   ```

### 独自ドメインを使う場合

`assets/images` と同じ階層（リポジトリルート）に `CNAME` というファイルを作成し、ドメイン名（例: `ike-products.jp`）を1行だけ記載してコミットしてください。DNS 側では GitHub Pages のドキュメントに従い CNAME / A レコードを設定します。

## 画像アセットについて

`assets/images/` 内の画像は IKE Products のブランドアセット一式（ロゴ・名刺・バナー・アプリアイコン等）から採用しています。ポートフォリオ欄の画像は実際の案件画像に差し替えて利用してください。

## カラーパレットについて

配布されたロゴアセットが実際に使用している配色（ダークマルーン + オレンジ〜テラコッタのグラデーション）をブランドカラーとして採用しています。当初案にあったネイビー系ではなく、ロゴ本体の配色に合わせています。変更したい場合は `assets/css/style.css` 冒頭の `:root` 内 CSS 変数（`--accent-orange` など）を編集してください。
