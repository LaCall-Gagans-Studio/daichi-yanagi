'use client'

import * as React from 'react'

const AVATAR_MAX = 12

interface CommentFormProps {
  onSubmitted?: () => void // ✅ 追加（親から送信完了後コールバックを受け取る）
}

export function CommentForm({ onSubmitted }: CommentFormProps) {
  const [form, setForm] = React.useState({
    accountId: '',
    comment: '',
    profileNumber: 1,
    age: '',
    gender: 'unspecified',
    occupation: '',
    district: '',
  })

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: name === 'profileNumber' ? Number(value) : value }))
  }

  const submit = async () => {
    if (!form.accountId.trim() || !form.comment.trim()) {
      alert('ニックネームとコメントを入力してください。')
      return
    }

    await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // 任意フィールドは空でもそのまま送信OK（サーバー側でundefined除去可）
      body: JSON.stringify({
        accountId: form.accountId,
        comment: form.comment,
        profileNumber: form.profileNumber,
        age: form.age ? Number(form.age) : undefined,
        gender: form.gender,
        occupation: form.occupation || undefined,
        district: form.district || undefined,
        status: 'draft', // CMS側で承認→公開
      }),
    })

    alert('送信しました。公開まで少しお待ちください。')

    // ✅ フォームリセット
    setForm({
      accountId: '',
      comment: '',
      profileNumber: 1,
      age: '',
      gender: 'unspecified',
      occupation: '',
      district: '',
    })

    // ✅ 親に通知（モーダルを閉じたり再フェッチしたりするため）
    onSubmitted?.()
  }

  return (
    <div className="space-y-3 ">
      {/* プロフィール番号選択 & プレビュー */}
      <div className="flex items-center gap-3">
        <img
          src={`/avatars/${form.profileNumber}.png`}
          alt="avatar preview"
          className="w-12 h-12 rounded-full border"
        />
        <select
          name="profileNumber"
          value={form.profileNumber}
          onChange={onChange}
          className="border rounded px-2 py-1"
        >
          {Array.from({ length: AVATAR_MAX }).map((_, i) => (
            <option key={i + 1} value={i + 1}>
              プロフィール {i + 1}
            </option>
          ))}
        </select>
      </div>

      {/* 基本フィールド */}
      <input
        name="accountId"
        placeholder="ニックネーム（必須）"
        value={form.accountId}
        onChange={onChange}
        className="w-full border rounded px-2 py-1"
      />

      <textarea
        name="comment"
        placeholder="コメント（必須）"
        value={form.comment}
        onChange={onChange}
        className="w-full border rounded px-2 py-2"
        rows={4}
      />

      {/* 任意プロフィール */}
      <div className="grid grid-cols-2 gap-2">
        <input
          name="age"
          type="number"
          min={0}
          max={120}
          placeholder="年齢（任意）"
          value={form.age}
          onChange={onChange}
          className="border rounded px-2 py-1"
        />
        <select
          name="gender"
          value={form.gender}
          onChange={onChange}
          className="border rounded px-2 py-1"
        >
          <option value="unspecified">未回答</option>
          <option value="male">男性</option>
          <option value="female">女性</option>
          <option value="nonbinary">ノンバイナリ</option>
          <option value="other">その他</option>
        </select>
        <input
          name="occupation"
          placeholder="職業（任意）"
          value={form.occupation}
          onChange={onChange}
          className="border rounded px-2 py-1"
        />
        <input
          name="district"
          placeholder="居住地区（任意）"
          value={form.district}
          onChange={onChange}
          className="border rounded px-2 py-1"
        />
      </div>

      <button
        onClick={submit}
        className="bg-ws-primary text-white rounded px-4 py-2 hover:opacity-90"
      >
        送信
      </button>
    </div>
  )
}
