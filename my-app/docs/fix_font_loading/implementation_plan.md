# 実装計画: Google Fonts の読み込み修正

## 目的

`font-dela` 等のカスタムフォントが正しく適用されるようにし、Next.js のベストプラクティスに準拠したフォント読み込み構成に変更する。

## 手順

### 1. `src/app/(frontend)/layout.tsx` の修正

- `next/font/google` から以下のフォントをインポートする：
  - `Kosugi`
  - `Zen_Kaku_Gothic_New`
  - `Dela_Gothic_One`
- 各フォントの設定を行い、CSS変数を定義する (例: `variable: '--font-dela-source'`)。
  - `Zen Kaku Gothic New` はウェイト `400`, `500`, `700` を指定（汎用使用のため）。
  - 他は `400` のみ（Google Fonts の仕様に準拠）。
- 定義したフォント変数を `<html>` タグの `className` に追加する。

### 2. `src/app/(frontend)/styles.css` の修正

- ファイル冒頭の Google Fonts の `@import` 記述を削除する。
- `@theme` ブロック内のフォント定義を更新し、`next/font` で定義した CSS 変数を参照するように変更する。
  - `--font-kosugi`: `var(--font-kosugi-source), sans-serif;`
  - `--font-zen`: `var(--font-zen-source), sans-serif;`
  - `--font-dela`: `var(--font-dela-source), sans-serif;`

### 3. 検証

- ビルドが通り、エラーが発生しないことを確認する。
- (目視確認が必要だがここではコード上の整合性を確認)
