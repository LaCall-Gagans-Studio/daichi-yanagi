// lib/policy.ts

export interface PolicyItem {
  title: string
  description: string
}

export interface PolicyGroup {
  title: string
  items: PolicyItem[]
}

export interface PolicyTheme {
  id: 'education' | 'governance' | 'growth'
  title: string
  description: string
  groups: PolicyGroup[]
}

export const POLICY_THEMES: PolicyTheme[] = [
  {
    id: 'education',
    title: '教育とこども',
    description:
      '20年後に活躍する子どもたちを見据え、TeachingからLearningへ。学び方・学び場・学校のあり方を再設計し、現場と家庭を支える。',
    groups: [
      {
        title: '学校と学びの再設計',
        items: [
          {
            title: '個別最適学習・探究・STEAMの推進',
            description: '一斉授業から個別最適へ。正解より最適解を探る創造の学びへ転換。',
          },
          {
            title: '教室から地域へ',
            description: '地域・企業・大学と協働し、子どものアイデアを社会実装。',
          },
          {
            title: '徹底した働き方改革',
            description: '授業準備・生徒対話の時間を確保し、学びの質を上げる。',
          },
        ],
      },
      {
        title: '学習環境の標準整備',
        items: [
          { title: '体育館空調・トイレ洋式化', description: '基盤環境を早期に改善。' },
          { title: '市費教員の独自採用', description: '現場ニーズに即した人材配置。' },
          { title: 'ジェンダーレス制服', description: '即時導入で多様性に対応。' },
          {
            title: 'ALT常駐（全中学校）',
            description: '英語コミュニケーションの実践機会を増やす。',
          },
          { title: '英検補助の導入', description: '受験費用を支援し挑戦を後押し。' },
          { title: '海外派遣人数の倍増', description: '越境学習で視野を拡大。' },
          { title: '生徒会予算の拡充', description: '主体的な学校運営を後押し。' },
        ],
      },
      {
        title: '現場と家庭のサポート',
        items: [
          { title: 'ママ・パパ孤独対策', description: '産後ケアの拡充と子育て施設運営支援。' },
          { title: '屋内あそび場・プレイパーク', description: '天候に左右されない居場所づくり。' },
          { title: '育休代替員採用支援（企業側）', description: '家庭と職場双方を支える仕組み。' },
          { title: 'ベビー用品ギフト', description: '子育て初期の経済的負担を軽減。' },
          { title: '育児手続きの簡略化', description: '申請負担をDXで削減。' },
          { title: '保育施設のおむつサブスク', description: '持ち物負担を減らし通園を楽に。' },
          { title: '託児付きテレワーク施設', description: '働く・育てるの両立を支援。' },
          { title: '共同養育の普及', description: '子にとって最善の関わり方を広げる。' },
        ],
      },
      {
        title: 'ユースの挑戦支援',
        items: [
          { title: 'チャレンジ型奨学金', description: '挑戦する若者に投資。' },
          { title: 'ユースセンター創出', description: '学び・活動の拠点整備。' },
          { title: '地域クラブ／サークル創出', description: '多様な関心が育つ土壌をつくる。' },
          { title: '自習環境の整備', description: '公共施設の積極活用で学びを支える。' },
          {
            title: '多様な学び場・校内フリースクール',
            description: '不登校を含む多様な学びの選択肢を恒常化。',
          },
        ],
      },
    ],
  },
  {
    id: 'governance',
    title: '市政と組織運営',
    description:
      '脱・節約中心財政。市民と行政が一緒に稼ぎ、県市連動でムダを減らし、民間投資を呼び込む。開かれた対話で135日かけて重点課題を共創。',
    groups: [
      {
        title: '稼ぐ行政と将来財政の安心',
        items: [
          {
            title: 'ふるさと納税を4年で倍増',
            description: '設計・PR・データ分析を強化し歳入を拡大。',
          },
          {
            title: '県市連動の公共施設「縮充」',
            description: '二重行政を解消し更新期の山を越える。',
          },
          {
            title: '民間投資の誘発',
            description: '魅力の上昇スパイラルを作り民間資金を呼び込む。',
          },
          { title: 'トップセールス', description: '老舗からスタートアップまで横断支援。' },
        ],
      },
      {
        title: '開かれた対話と共創プロセス',
        items: [
          {
            title: 'SHABERIBA（しゃべり場）',
            description: '毎週各地でのタウンミーティング。徹底して声を聴く。',
          },
          { title: 'MANAVIVA（まなび場）', description: '隔週で柳と一緒に学ぶテーマセッション。' },
          {
            title: 'NANIMONO（なにもの）',
            description: '隔週で市内の面白い人に話を聞き、出会いをつなぐ。',
          },
          {
            title: '135日で重点課題を策定',
            description: '素案を叩き、市民の声を集めて磨き上げる。',
          },
        ],
      },
      {
        title: '可視化と操作性の高い市役所',
        items: [
          {
            title: '見える化とオープンデータ',
            description: '予算・事業・効果をダッシュボードで公開。',
          },
          { title: '申請・相談のDX', description: '24時間のAI/チャット窓口で利便性を向上。' },
          {
            title: 'エリア連動の開発設計',
            description: '駅・文化施設・跡地を一体で設計し費用負担も最適化。',
          },
        ],
      },
    ],
  },
  {
    id: 'growth',
    title: '次世代成長戦略・まちづくり',
    description:
      '駅前・文化施設を核に民間投資を最大活用。経済・生活・医療・一次産業・防災・スポーツ・大学連携まで、暮らしと成長を同時に高める。',
    groups: [
      {
        title: '駅前×文化施設 連動開発',
        items: [
          {
            title: '民間資金の最大活用',
            description: 'スキーム設計で財政負担を抑えながら価値を創出。',
          },
          {
            title: 'エリア型の再開発',
            description: '駅単体でなくエリア全体を設計し、7–8年の期間も常時仕掛ける。',
          },
          { title: '県市共同開発', description: '費用分担と意思決定を一体で。' },
        ],
      },
      {
        title: '経済・観光・スタートアップ',
        items: [
          {
            title: 'ふるさと納税で地元店舗の売上増',
            description: '返礼・導線を再設計し商流をつくる。',
          },
          { title: '砂丘エリアの景観・駐車場整備', description: '来訪体験の質を上げ回遊を促進。' },
          {
            title: '創業・継承・再生の見える化',
            description: '官民データ連携とチャレンジショップで後押し。',
          },
          { title: '海外展開・FC支援', description: '販路を広げ地域の稼ぐ力を底上げ。' },
        ],
      },
      {
        title: '日常生活のアップデート',
        items: [
          { title: '「とりレジ」導入', description: 'ごみ出しに使えるレジ袋で家事負担を軽減。' },
          { title: '給水スポット整備', description: 'ペットボトル削減と酷暑対策。' },
          { title: 'バス利用促進day', description: '公共交通の利用を後押し。' },
          { title: '学校購入品の見直し', description: '負担を見直し家計を支える。' },
          { title: 'インクルーシブ遊具', description: '誰もが遊べる公園づくり。' },
          { title: 'ヤングケアラー支援', description: '実態に即した支援体制を拡充。' },
          { title: '外出困難者の理美容費助成', description: '生活の質を守る支援。' },
        ],
      },
      {
        title: '医療・保健',
        items: [
          {
            title: 'オンライン小児科（中山間部）',
            description: '地理的不利を解消し安心を届ける。',
          },
          { title: '不妊治療・小児心療科の拡充', description: '切れ目ない支援体制。' },
          { title: '卒煙／禁煙支援助成', description: '健康増進と医療費抑制の両立。' },
          { title: '24時間自死対策窓口', description: 'いつでも相談できる安全網。' },
          { title: '依存症対策・治療促進', description: '啓発と受療支援を強化。' },
          { title: '医療ケア児家族支援', description: '在宅生活を支える環境整備。' },
        ],
      },
      {
        title: '農林水産',
        items: [
          { title: '産物のブランド化', description: '付加価値を高め販路拡大。' },
          { title: '法人化支援・ユニバーサル農園', description: '経営力強化と包摂的な就労機会。' },
          { title: '鳥獣対策の強化', description: '生産の安定を確保。' },
          { title: '教育農業ファーム', description: '学びと産業をつなぎ人材を育成。' },
          { title: '市民農園の拡大', description: '都市住民の参画を促す。' },
          { title: '産業インフラ整備', description: '農水路・港など基盤投資。' },
          { title: '山林のコミュニティ活用', description: '地域の居場所と資源循環。' },
        ],
      },
      {
        title: '防災',
        items: [
          { title: '罹災証明の迅速化システム', description: '被災後の生活再建を加速。' },
          { title: '避難所の空調整備', description: '猛暑・寒波に備える。' },
          { title: '自治体連携の強化', description: '広域支援の即応性を高める。' },
          { title: '多様なニーズに配慮した備蓄', description: '誰一人取り残さない避難所運営。' },
          { title: '災害現場でのドローン活用訓練', description: '被害把握と救援を高度化。' },
          { title: 'SNSによる情報収集体制', description: '住民の声をリアルタイムに把握。' },
        ],
      },
      {
        title: 'スポーツとまちづくり',
        items: [
          { title: 'プロクラブの支援・創出', description: '熱狂が生まれる土壌を整備。' },
          { title: '地域スポーツクラブ育成', description: '生涯スポーツと交流を促進。' },
          {
            title: 'アーバン／ニュースポーツ空間',
            description: '公共空間の利活用で多様な運動を。',
          },
          { title: 'スポーツコミュニティの見える化', description: '参加のハードルを下げる。' },
        ],
      },
      {
        title: '大学連携・人材循環',
        items: [
          {
            title: '地域インターン拡充',
            description: '社会参加に交通費補助を組み合わせ定着を促す。',
          },
          { title: '小中と大学の連携強化', description: '授業・研究体験の機会を広げる。' },
          {
            title: 'アントレプレナー教育（小学生から）',
            description: '挑戦する文化を早期に育む。',
          },
          { title: '認定ベンチャーの広報支援', description: '市をあげてスタートアップを後押し。' },
        ],
      },
    ],
  },
]
