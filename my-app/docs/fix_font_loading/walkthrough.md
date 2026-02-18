# 変更内容の確認 (Walkthrough)

## 変更ファイル

### `src/app/(frontend)/layout.tsx`

- `next/font/google` から `Kosugi`, `Zen_Kaku_Gothic_New`, `Dela_Gothic_One` をインポート。
- フォントローダーを設定し、CSS変数 (`--font-kosugi-source` 等) を生成。
- `<html>` タグに生成された変数クラスを追加。

### `src/app/(frontend)/styles.css`

- `@import` による Google Fonts 読み込みを削除。
- `@theme` 内のフォント定義を更新し、`var(--font-*-source)` を使用するように変更。

## 検証項目

- ビルドエラーがないこと。
- `layout.tsx` で `font-dela` クラスが使用されている箇所のスタイルが正しく適用されること（ブラウザ確認推奨）。
