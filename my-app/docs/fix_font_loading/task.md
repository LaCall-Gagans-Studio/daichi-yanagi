# タスク: フォントクラスの適応不具合の修正

## 概要

`src/app/(frontend)/styles.css` で定義された `font-dela` クラスが `src/app/(frontend)/layout.tsx` で正しく適応されていない問題を解決します。

## 現状の問題点

- `styles.css` 内で `@import` を使用して Google Fonts を読み込んでいるが、Next.js (App Router) 環境ではこの方法が正常に機能しない場合がある。
- Tailwind CSS v4 の設定において、フォント定義が正しく認識されていない可能性がある。

## 解決策

1. **`next/font/google` の導入**: Next.js 推奨のフォント読み込み方法に変更し、パフォーマンスと信頼性を向上させる。
2. **CSS変数の連携**: `next/font` から提供される CSS 変数を Tailwind CSS v4 の設定 (`styles.css` 内の `@theme`) に適用する。
3. **`layout.tsx` の修正**: 読み込んだフォント変数を `<html>` タグまたは `<body>` タグに適用し、グローバルに利用可能にする。

## 変更対象ファイル

- `src/app/(frontend)/layout.tsx`
- `src/app/(frontend)/styles.css`
