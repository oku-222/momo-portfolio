# LUMÉA CAFÉ（ルメア カフェ）Webサイト

※本サイトはポートフォリオ制作のための架空サイトです。掲載している店名・住所・電話番号・メニュー・スタッフ名等はすべて架空のものであり、実在する店舗・団体とは一切関係ありません。

## ファイル構成

```
cafe-site/
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
└── README.md
```

画像は `assets/images/` にダウンロードして差し替える想定ですが、現状は下記の理由により **Unsplash CDNの直リンクURL** をそのまま `index.html` 内に記述しています。

- 写真素材は今回提供がなかったため、Unsplash上の実在画像を仮素材として使用
- 将来的にオリジナル撮影素材へ差し替える前提のため、URLを直接埋め込み、差し替え箇所が分かりやすい状態にしています

## 使用画像一覧（すべてUnsplash / 無料ライセンス）

| 用途 | 撮影者 | 画像ページ |
|---|---|---|
| Hero（ファーストビュー）/ Space（ラウンジコーナー） | Alan Zhang | https://unsplash.com/photos/a-bright-cafe-interior-with-sunny-trees-outside-kJYd61ldOso |
| Concept / Space（テーブルエリア） | Nikita Pishchugin | https://unsplash.com/photos/cafe-interior-with-tables-and-chairs-near-window-B5giYHNQPvA |
| Menu / Coffee（カフェラテ） | Esra Afşar | https://unsplash.com/photos/hand-holding-a-latte-with-artistic-foam-art-k6IFDeBzt50 |
| Menu / Coffee（ハンドドリップ、LUMÉAブレンド） | Alef Morais | https://unsplash.com/photos/man-pouring-hot-water-into-a-coffee-dripper-qVN7jcgU68U |
| Menu / Sweets（ケーキ、タルト） | Louis Hansel | https://unsplash.com/photos/chocolate-cake-slice-CKVCQ6X8I18 |
| Seasonal（無花果とはちみつのラテ） | Nadia Valko | https://unsplash.com/photos/hand-holding-a-glass-of-latte-with-foam-art-jXtcXj1cyus |
| Space（窓際の席） | Bundo Kim | https://unsplash.com/photos/cozy-cafe-interior-with-a-window-view-l_IOE622LQ4 |
| About（オーナーバリスタ）/ Menu / Sweets（焼き菓子） | Jakub Kapusnak | https://unsplash.com/photos/stack-of-coffee-beans-on-persons-hand-1LaCrYx5J7I |

すべて [Unsplash License](https://unsplash.com/license) に基づき商用利用可能な画像です。実際の店舗写真に差し替える際は、代官山の店内で撮影したオリジナル写真をご用意いただくことを推奨します（現状は一部の写真を複数セクションで再利用しています）。

## 今後、画像を差し替える際の手順

1. `assets/images/` フォルダを作成し、撮影素材を保存
2. `index.html` 内の `<img src="https://images.unsplash.com/...">` を `assets/images/ファイル名.jpg` に置き換え
3. `alt` 属性の内容も、実際の写真内容に合わせて調整

## Google Map について

「Access」セクションの地図は、Google Maps の埋め込み用URL（`https://www.google.com/maps?q=...&output=embed`）を使用したダミー表示です。実店舗の住所が決まり次第、`q=` パラメータを正式な住所に差し替えてください。より高度な表示（ピン留め、経路案内等）が必要な場合は、Google Maps Embed APIキーの取得をおすすめします。

## セルフチェック実施項目

- [x] PC（1440px前後）表示
- [x] Tablet（768px前後）表示
- [x] Smartphone（375px前後）表示 ／ ハンバーガーメニュー動作
- [x] ナビゲーションのアンカーリンク
- [x] HTML構造（h1は1つ、見出し階層、セマンティックタグ）
- [x] JavaScriptの動作（ヘッダー変化・スムーススクロール・フェードイン・お問い合わせダミー送信・Escキーでメニューが閉じる）
- [x] 画像の alt 属性
- [x] キーボード操作時のフォーカス表示（:focus-visible）
- [x] title / meta description / OGP / lang="ja" / viewport

## 今後、Moさんが変更しやすい箇所

- `assets/css/style.css` の `:root` 内カラー・余白・フォント変数を変更するだけで、サイト全体のトーンを調整できます
- メニュー内容・価格は `index.html` の `.menu__list` 内、`<li class="menu-item">` を複製・編集するだけで追加できます
- 予約ボタン（`.btn-primary`）は現状ダミーリンクです。外部予約システム（TableCheck等）を導入する際は `href` を差し替えてください
- お問い合わせフォームはバックエンド未実装のため、送信するとダミーの完了メッセージのみ表示されます（`assets/js/main.js` 内 `contactForm` の処理）

## 今後改善できるポイント

- オリジナル撮影素材への差し替え（現状は一部画像を複数セクションで使い回しています）
- お問い合わせフォームのバックエンド実装（フォーム送信サービスやサーバーサイド処理の追加）
- 予約ボタンと外部予約システムの連携
- ロゴのタイポグラフィをさらに作り込みたい場合は、SVGでオリジナルの欧文ロゴを制作するのも一案です
