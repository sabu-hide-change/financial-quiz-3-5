Gemini said
// npm install lucide-react recharts

import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Check, X, Home, ChevronRight, RotateCcw, BookOpen, List, Save, Trophy, Activity, ArrowDown } from 'lucide-react';

// --- データ定義 ---

const QUESTIONS = [
{
id: 1,
title: "IEの全体像",
category: "IE（Industrial Engineering）",
text: "IE（Industrial Engineering）に関する記述として、最も不適切なものはどれか。",
options: [
"IEは、生産性を高めるための工学的な手法の体系である。",
"IEは、製品だけでなく、システム全体を最適に設計・改善・運用する手法である。",
"IEを大きく分けると、「方法研究」と「時間研究」から構成される。",
"IEの「方法研究」は、さらに「工程分析」と「動作研究」に分けられる。"
],
answer: 2, // ウ (0-indexed)
explanation: "IEを大きく分けると、「作業測定」と「方法研究」から構成されます。「時間研究」は「作業測定」の構成要素となります。",
diagramType: "ie_tree"
},
{
id: 2,
title: "工程分析1",
category: "工程分析",
text: "次に示す作業者の動きを、作業者工程分析により、分析記号「○」、「◇」、「Ｄ」、「⇒」を用いて分析した。「○」記号の数として、最も適切なものはどれか。\n\n①部品倉庫に生産に必要な部品を取りに行く。\n②部品棚に保管してある部品梱包箱から、使用する部品を取り出す。\n③部品を持って現場に戻る。\n④部品Aと部品Bを接着材で固定する。\n⑤接着が乾くまで待つ。\n⑥部品Cの数か所にドリルで穴を開ける。\n⑦部品Aを部品Cにネジで固定する。\n⑧トルク試験機でネジの締付けトルクを確認する。\n⑨出荷が出来るように製品梱包箱に入れる。\n⑩発送場まで梱包箱を移動する。",
options: ["6個", "5個", "4個", "2個"],
answer: 1, // イ
explanation: "②と⑨が「加工(○)」に含まれるかがポイントです。②は部品取り出し（作業）、⑨は梱包（作業）として加工に分類されます。\n\n内訳:\n①運搬(⇒) ②加工(○) ③運搬(⇒) ④加工(○) ⑤滞留(D) ⑥加工(○) ⑦加工(○) ⑧検査(◇) ⑨加工(○) ⑩運搬(⇒)\n合計5個。",
diagramType: "process_symbols_table"
},
{
id: 3,
title: "工程分析2",
category: "工程分析",
text: "工程分析に関する記述として、最も適切なものはどれか。",
options: [
"製品工程分析では、工場などのレイアウト図の上に、工程図記号を記入することで、工程の流れを表す。",
"流れ線図は、製品が加工される流れを、運搬、検査、停滞を含めて表し、問題点を明らかにする。",
"フロムツーチャートは、工程間の物の流れを分析する手法で、各工程間でどれぐらいの物が滞留しているかを分析する。",
"作業者工程分析は、作業者の作業を中心に分析するもので、作業手順や作業の無駄を改善する際に利用される。"
],
answer: 3, // エ
explanation: "ア: 流れ線図の説明です。\nイ: 製品工程分析の説明です。\nウ: フロムツーチャートは「物量」の流れを分析します（滞留量ではない）。\nエ: 正しい記述です。",
diagramType: "process_analysis_tree"
},
{
id: 4,
title: "工程分析3",
category: "工程分析",
text: "ある食品加工の工場において、生産管理の分析手法を用いて問題点を解決する場合の取組みとして、最も不適切なものはどれか。",
options: [
"現在の状況を大まかに把握するため、まず単純工程分析を行った。",
"滞留時間が長い、工程Aと工程Bの間の作業のラインバランスを見直した。",
"レイアウトの見直しを行うため、作業者工程分析を行った。",
"製品工程分析で明らかになった問題を改善するため、ECRSを活用した。"
],
answer: 2, // ウ
explanation: "レイアウトの見直しには、通常「流れ線図」や「フロムツーチャート」を用います。作業者工程分析は作業手順の改善に用います。",
diagramType: "ecrs_table"
},
{
id: 5,
title: "工程分析4",
category: "工程分析",
text: "下図（解説参照）は、ある製品の製品工程分析の結果である。この図から読み取ることができる記述として、最も適切なものはどれか。",
options: [
"加工を行う工程が4ヶ所ある。",
"品質検査を行う工程が1ヶ所ある。",
"ベルトコンベアーを活用して運搬している。",
"物が滞留している箇所はない。"
],
answer: 1, // イ
explanation: "図の構成：\n▽(貯蔵) → ○(運搬) → D(滞留) → ○(運搬) → ○(加工) → ○(運搬) → ◇(品質検査) → ○(運搬) → ▽(貯蔵)\n\nア: 加工(○の大)は1箇所です。\nイ: 正解。◇は品質検査です。\nウ: 記号からは運搬手段（コンベア等）は読み取れません。\nエ: D(滞留)があります。",
diagramType: "vertical_flow_chart"
},
{
id: 6,
title: "フロムツーチャート",
category: "フロムツーチャート",
text: "下図（解説参照）はAからEまで5つの工程におけるフロムツーチャートを表している。このフロムツーチャートから読み取れる記述として、最も適切なものはどれか。",
options: [
"A→B→C→D→Eの順番に物が流れている。",
"Bの工程では仕掛品が滞留している。",
"Cの工程は検査工程であることがわかる。",
"逆流している工程がある。"
],
answer: 3, // エ
explanation: "表を見ると、C行B列に「1」の記載があります。これはFrom C To Bへの流れ、つまり逆流を示しています。\nア: C→Dの流れが空白なので連続していません。\nイ: 滞留はこの図からは読み取れません。\nウ: 工程の種類はこの図からは読み取れません。",
diagramType: "from_to_chart"
},
{
id: 7,
title: "運搬分析",
category: "運搬分析",
text: "運搬分析に関する記述として、最も不適切なものはどれか。",
options: [
"マテリアルハンドリングとは、原材料、仕掛品、完成品などの、運搬や取扱いに関することである。",
"台記号における平（ひら）は、物が床や台の上にひら置きされている状態で、活性示数は1である。",
"加工する材料を資材倉庫に取りに行く作業は、空運搬に該当する。",
"配置式運搬工程分析は、レイアウト図の上に運搬工程記号を記入して、運搬の流れを分析する手法である。"
],
answer: 1, // イ
explanation: "「平（ひら）」置きの状態は、運搬活性示数が「0」です（最も低い状態）。活性示数は0〜4で表されます。",
diagramType: "activation_index_table"
},
{
id: 8,
title: "運搬活性分析",
category: "運搬分析",
text: "次に示す工程の平均活性示数の値として、最も適切なものはどれか。\n\n①鉄の棒材が床に平置き。\n②搬送用の箱に鉄の棒材を入れる。\n③パレットに搬送用の箱を乗せる。\n④フォークリフトでパレットを運ぶ。\n⑤トラックにパレットを積み、加工工場に運ぶ。\n⑥フォークリフトでパレットを降ろす。\n⑦パレットを所定場所に置く。",
options: ["2.4", "3.5", "4.4", "5.5"],
answer: 0, // ア
explanation: "各工程の活性示数：\n①平置き: 0\n②箱に入れる: 1\n③パレットに乗せる: 2\n④運ぶ（移動中）: 4\n⑤運ぶ（移動中）: 4\n⑥降ろす（移動機器上）: 4 (※文脈的にフォーク上またはトラックから降ろす動作含む移動直後は高活性)\n⑦パレット置き: 2\n\n合計17 ÷ 7工程 ≒ 2.4",
diagramType: "activation_chart"
},
{
id: 9,
title: "マテリアルハンドリング",
category: "運搬分析",
text: "マテリアルハンドリングに関する記述として、最も不適切なものはどれか。",
options: [
"平均活性示数は、停滞工程の活性示数の合計を停滞工程数で除した値として求められる。",
"マテリアルハンドリングによって、運搬の自動化や効率化が図れるようになる。",
"運搬管理の改善には、レイアウトの改善、運搬方法の改善、運搬制度の改善がある。",
"運搬活性示数は、置かれている物品を運び出すために必要となる取り扱いの手間の数を示している。"
],
answer: 3, // エ
explanation: "運搬活性示数は、「すでに省かれている手間の数」を表します。「必要な手間の数」ではありません。示数が高いほど、必要な手間は少なくなります。",
diagramType: "none"
},
{
id: 10,
title: "動作研究",
category: "動作研究",
text: "動作研究に関する記述として、最も適切なものはどれか。",
options: [
"マイクロモーション分析により、通常より遅いスピードで撮影すると気がつかない無駄な動きを発見できる。",
"連合作業分析により、作業者の多工程持ちや、適正な配置人員を検討できる。",
"メモモーション分析は、通常よりも早いスピードで撮影することで、細かい動作が分析できる。",
"サーブリッグ分析の第1類に分類される作業は、必要のない動作である。"
],
answer: 1, // イ
explanation: "ア: マイクロは「高速撮影・スロー再生」で微細動作分析。\nイ: 正解。\nウ: メモは「低速撮影・高速再生」で長時間観測。\nエ: 第1類は「作業の基本となる動作（必要）」です。",
diagramType: "motion_study_table"
},
{
id: 11,
title: "動作経済の原則",
category: "動作研究",
text: "次の作業改善を、動作経済の原則に照らした場合、最も不適切なものはどれか。",
options: [
"作業台の上に置いて使用していた電動ドライバを、伸縮ロープに付けて天井から吊るすようにした。",
"手が疲れないよう、両手を同時に使う作業を極力減らすように組み立て手順を検討した。",
"使用する工具の形状にくり抜いたマットを用意して、マット上に使う工具を順番に並べた。",
"横にいる次工程の作業者に加工品を手渡す際に、真横ではなく、少し前に置くように作業指導した。"
],
answer: 1, // イ
explanation: "動作経済の原則では「両手を同時かつ左右対称的に動かすこと」が推奨されます。片手待機は無駄とみなされます。",
diagramType: "motion_economy_table"
},
{
id: 12,
title: "稼働分析",
category: "稼働分析",
text: "稼働分析の手法に関する記述として、最も不適切なものはどれか。",
options: [
"連続観測法は、ワークサンプリングと比較して測定に手間がかかる。",
"稼働率は、「実際の稼働時間」を、「実際の稼働時間と非稼働時間の合計」で除して求めることができる。",
"ワークサンプリングは、隠れて観測することで、作業者は観測されることを意識せず、偏りのないデータが取れる。",
"連続観測法は、非繰返しの作業の観測に適している。"
],
answer: 2, // ウ
explanation: "ワークサンプリングは「隠れて」行うものではなく、瞬間的に観測する統計的手法です。観測者がずっと張り付かないため意識されにくいというメリットはありますが、隠し撮りではありません。",
diagramType: "work_sampling_vs_continuous"
},
{
id: 13,
title: "ワークサンプリング",
category: "稼働分析",
text: "ワークサンプリングに関する記述として、最も不適切なものはどれか。",
options: [
"ワークサンプリングは、瞬間的な観測のため深い分析に不向きである。",
"ワークサンプリングのメリットには、少ない労力で観測できる点が挙げられる。",
"ワークサンプリングでは、1人の観測者が多くの観測対象を観測することが難しい。",
"ワークサンプリングは、連続観測法のように、観測対象に付きっきりになる必要がない。"
],
answer: 2, // ウ
explanation: "ワークサンプリングのメリットは、1人の観測者で多くの対象を巡回観測できる点です。",
diagramType: "none"
},
{
id: 14,
title: "時間研究",
category: "時間研究",
text: "標準時間に関する記述として、最も適切なものはどれか。",
options: [
"余裕時間のうち、機械を調整し、打合せをするなどの余裕は、人的余裕に含まれる。",
"標準時間は、正味時間と余裕時間の和で求められ、外掛け法で算出された余裕率を使う場合は、「標準時間 ＝ 正味時間 × （1＋余裕率）」によって計算される。",
"標準時間は、「その仕事に習熟した作業者が」、「適切な所定の作業条件のもとで」、「必要な余裕を持ち」、作業するのに必要となる時間である。",
"作業時間を観測した作業者のペースが、基準より速い場合は、レイティング係数の値は100%よりも小さくなる。"
],
answer: 1, // イ
explanation: "ア: それは管理余裕です。\nイ: 正解。外掛け法は正味時間ベースの比率なので、(1+率)を掛けます。\nウ: 「正常な無理のない作業ペースで」という条件が抜けています。\nエ: 基準より速い場合、レイティング係数は100%より大きくなります（例: 1.2倍の速さ）。",
diagramType: "standard_time_structure"
},
{
id: 15,
title: "標準時間の設定法",
category: "時間研究",
text: "標準時間を設定する手法に関する記述として、最も不適切なものはどれか。",
options: [
"ストップウォッチ法を用いて標準時間を設定する際は、レイティング操作を行う必要がある。",
"標準時間資料法は、作業時間のデータを分類・整理した図表などを用いて標準時間を設定する方法である。",
"実績資料法では、過去のデータを基礎として標準時間を設定する方法で、個別生産でよく利用される。",
"PTS法は、繰返しの少ない作業の標準時間の設定に適しており、標準時間の設定も容易にできる。"
],
answer: 3, // エ
explanation: "PTS法は微動作レベルまで分解するため、手間がかかります。また、繰り返し作業の分析に適しています。",
diagramType: "time_study_methods"
},
{
id: 16,
title: "余裕率",
category: "時間研究",
text: "ある製造工程における作業時間のデータが以下の通り与えられている。この作業に対する余裕率の値として、最も適切なものはどれか。\n\n正味時間：16分\n余裕時間：4分\n標準時間：20分",
options: [
"内掛け法の余裕率：25％",
"内掛け法の余裕率：80％",
"外掛け法の余裕率：20％",
"外掛け法の余裕率：25％"
],
answer: 3, // エ
explanation: "内掛け法 = 余裕 / 標準 = 4 / 20 = 20%\n外掛け法 = 余裕 / 正味 = 4 / 16 = 25%\n\n選択肢の中で正しい組み合わせは「外掛け法：25%」のみです。",
diagramType: "allowance_formula"
}
];

// --- コンポーネント定義 ---

const DiagramRenderer = ({ type }) => {
switch (type) {
case "ie_tree":
return (
<div className="border p-4 bg-gray-50 rounded text-sm">
<div className="font-bold mb-2 text-center bg-orange-200 p-1 rounded">IE</div>
<div className="flex gap-4">
<div className="flex-1 border-r border-gray-400 pr-2">
<div className="font-bold bg-yellow-100 p-1 mb-2">方法研究</div>
<ul className="list-disc pl-5 space-y-1">
<li><span className="font-bold">工程分析</span>: 生産・運搬工程の分析</li>
<li><span className="font-bold">動作研究</span>: 作業者の動作分析</li>
</ul>
</div>
<div className="flex-1 pl-2">
<div className="font-bold bg-blue-100 p-1 mb-2">作業測定</div>
<ul className="list-disc pl-5 space-y-1">
<li><span className="font-bold">稼働分析</span>: 稼働状況の分析</li>
<li><span className="font-bold">時間研究</span>: 標準時間の設定</li>
</ul>
</div>
</div>
</div>
);
case "process_symbols_table":
return (
<div className="overflow-x-auto">
<table className="w-full border-collapse border border-gray-300 text-sm">
<thead className="bg-orange-100">
<tr><th className="border p-2">工程</th><th className="border p-2">記号</th><th className="border p-2">内容</th></tr>
</thead>
<tbody>
<tr><td className="border p-2">加工</td><td className="border p-2 text-center text-xl">○</td><td className="border p-2">変質・変形・組立</td></tr>
<tr><td className="border p-2">運搬</td><td className="border p-2 text-center text-xl">⇒ (or ○に矢印)</td><td className="border p-2">位置の変化</td></tr>
<tr><td className="border p-2">停滞(貯蔵)</td><td className="border p-2 text-center text-xl">▽</td><td className="border p-2">計画的保管</td></tr>
<tr><td className="border p-2">停滞(滞留)</td><td className="border p-2 text-center text-xl">D</td><td className="border p-2">手待ち</td></tr>
<tr><td className="border p-2">数量検査</td><td className="border p-2 text-center text-xl">□</td><td className="border p-2">数・量を測る</td></tr>
<tr><td className="border p-2">品質検査</td><td className="border p-2 text-center text-xl">◇</td><td className="border p-2">良不良を判定</td></tr>
</tbody>
</table>
</div>
);
case "vertical_flow_chart":
return (
<div className="flex justify-center py-4 bg-gray-50">
<div className="flex flex-col items-center gap-2">
<div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[26px] border-t-black"></div>
<div className="h-4 w-0.5 bg-black"></div>
<div className="w-8 h-8 rounded-full border-2 border-black bg-white"></div>
<div className="h-4 w-0.5 bg-black"></div>
<div className="w-8 h-8 rounded-r-full border-2 border-black bg-white flex items-center justify-center font-bold">D</div>
<div className="h-4 w-0.5 bg-black"></div>
<div className="w-8 h-8 rounded-full border-2 border-black bg-white"></div>
<div className="h-4 w-0.5 bg-black"></div>
<div className="w-12 h-12 rounded-full border-2 border-black bg-white flex items-center justify-center text-xs text-center">加工</div>
<div className="h-4 w-0.5 bg-black"></div>
<div className="w-6 h-6 rounded-full border-2 border-black bg-white"></div>
<div className="h-4 w-0.5 bg-black"></div>
<div className="w-8 h-8 rotate-45 border-2 border-black bg-white mb-2"></div>
<div className="h-4 w-0.5 bg-black"></div>
<div className="w-6 h-6 rounded-full border-2 border-black bg-white"></div>
<div className="h-4 w-0.5 bg-black"></div>
<div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[26px] border-t-black"></div>
</div>
</div>
);
case "from_to_chart":
return (
<div className="overflow-x-auto">
<table className="w-full border-collapse border border-gray-400 text-sm text-center">
<thead>
<tr>
<th className="border border-gray-400 bg-gray-100 p-1">From \ To</th>
<th className="border border-gray-400 p-1">A</th>
<th className="border border-gray-400 p-1">B</th>
<th className="border border-gray-400 p-1">C</th>
<th className="border border-gray-400 p-1">D</th>
<th className="border border-gray-400 p-1">E</th>
</tr>
</thead>
<tbody>
<tr><td className="border border-gray-400 font-bold">A</td><td className="border border-gray-400 bg-gray-200"></td><td className="border border-gray-400">1</td><td className="border border-gray-400">2</td><td className="border border-gray-400">3</td><td className="border border-gray-400">4</td></tr>
<tr><td className="border border-gray-400 font-bold">B</td><td className="border border-gray-400"></td><td className="border border-gray-400 bg-gray-200"></td><td className="border border-gray-400">2</td><td className="border border-gray-400">3</td><td className="border border-gray-400"></td></tr>
<tr><td className="border border-gray-400 font-bold">C</td><td className="border border-gray-400"></td><td className="border border-gray-400 bg-red-100 font-bold text-red-600">1</td><td className="border border-gray-400 bg-gray-200"></td><td className="border border-gray-400"></td><td className="border border-gray-400">1</td></tr>
<tr><td className="border border-gray-400 font-bold">D</td><td className="border border-gray-400"></td><td className="border border-gray-400"></td><td className="border border-gray-400"></td><td className="border border-gray-400 bg-gray-200"></td><td className="border border-gray-400">4</td></tr>
<tr><td className="border border-gray-400 font-bold">E</td><td className="border border-gray-400"></td><td className="border border-gray-400"></td><td className="border border-gray-400"></td><td className="border border-gray-400"></td><td className="border border-gray-400 bg-gray-200"></td></tr>
</tbody>
</table>
<p className="text-xs text-red-600 mt-1">※赤背景：逆流（C→B）</p>
</div>
);
case "activation_index_table":
return (
<table className="w-full border-collapse border border-gray-300 text-sm mt-2">
<thead className="bg-orange-100">
<tr><th className="border p-2">状態</th><th className="border p-2">指数</th><th className="border p-2">手間</th></tr>
</thead>
<tbody>
<tr><td className="border p-2">平置き (バラ)</td><td className="border p-2 text-center">0</td><td className="border p-2">まとめる・起こす・上げる・運ぶ</td></tr>
<tr><td className="border p-2">箱入り</td><td className="border p-2 text-center">1</td><td className="border p-2">起こす・上げる・運ぶ</td></tr>
<tr><td className="border p-2">枕 (パレット)</td><td className="border p-2 text-center">2</td><td className="border p-2">上げる・運ぶ</td></tr>
<tr><td className="border p-2">台車</td><td className="border p-2 text-center">3</td><td className="border p-2">運ぶ (起動)</td></tr>
<tr><td className="border p-2">移動中 (コンベア)</td><td className="border p-2 text-center">4</td><td className="border p-2">なし (そのまま運ぶ)</td></tr>
</tbody>
</table>
);
case "activation_chart":
const data = [
{ name: '①平', index: 0 },
{ name: '②箱', index: 1 },
{ name: '③パレ', index: 2 },
{ name: '④運ぶ', index: 4 },
{ name: '⑤運ぶ', index: 4 },
{ name: '⑥降', index: 4 },
{ name: '⑦置', index: 2 },
];
return (
<div className="h-64 w-full bg-white p-2 border rounded">
<ResponsiveContainer width="100%" height="100%">
<LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
<CartesianGrid strokeDasharray="3 3" />
<XAxis dataKey="name" fontSize={12} />
<YAxis domain={[0, 4]} ticks={[0, 1, 2, 3, 4]} />
<Tooltip />
<Line type="stepAfter" dataKey="index" stroke="#e11d48" strokeWidth={3} dot={{ r: 4 }} />
</LineChart>
</ResponsiveContainer>
</div>
);
case "allowance_formula":
return (
<div className="bg-gray-100 p-3 rounded text-sm space-y-2">
<div className="border-b pb-2">
<p className="font-bold text-blue-700">内掛け法</p>
<p>標準時間に対する割合</p>
<p className="font-mono bg-white p-1 mt-1">余裕率 = 余裕時間 ÷ 標準時間</p>
</div>
<div>
<p className="font-bold text-green-700">外掛け法</p>
<p>正味時間に対する割合</p>
<p className="font-mono bg-white p-1 mt-1">余裕率 = 余裕時間 ÷ 正味時間</p>
</div>
</div>
);
default:
return null;
}
};

const ModeCard = ({ title, icon: Icon, onClick, description, count, colorClass }) => (
<button
onClick={onClick}
className={w-full p-4 rounded-lg shadow-md border flex items-center justify-between transition-transform transform hover:scale-102 hover:bg-gray-50 mb-4 ${colorClass}}

<div className="flex items-center gap-4">
  <div className={`p-3 rounded-full bg-white bg-opacity-50`}>
    <Icon className="w-6 h-6" />
  </div>
  <div className="text-left">
    <h3 className="font-bold text-lg">{title}</h3>
    <p className="text-sm opacity-80">{description}</p>
  </div>
</div>
<div className="text-2xl font-bold">{count}</div>
</button>
);

// --- メインアプリ ---

export default function App() {
const [currentMode, setCurrentMode] = useState('start'); // start, quiz, result, history
const [activeQuestions, setActiveQuestions] = useState([]);
const [currentIndex, setCurrentIndex] = useState(0);
const [selectedOption, setSelectedOption] = useState(null);
const [showExplanation, setShowExplanation] = useState(false);

// Persistence States
const [history, setHistory] = useState([]);
const [reviewList, setReviewList] = useState([]);
const [lastWrongList, setLastWrongList] = useState([]);

// 初期ロード
useEffect(() => {
try {
console.log("Loading data from localStorage...");
const savedHistory = JSON.parse(localStorage.getItem('ie_quiz_history') || '[]');
const savedReview = JSON.parse(localStorage.getItem('ie_quiz_review') || '[]');
const savedWrong = JSON.parse(localStorage.getItem('ie_quiz_wrong') || '[]');

  setHistory(savedHistory);
  setReviewList(savedReview);
  setLastWrongList(savedWrong);
} catch (e) {
  console.error("Failed to load persistence data", e);
  setHistory([]);
  setReviewList([]);
  setLastWrongList([]);
}
}, []);

// 履歴保存
const saveHistoryData = (newHistory, newReview, newWrong) => {
try {
if (newHistory) {
localStorage.setItem('ie_quiz_history', JSON.stringify(newHistory));
setHistory(newHistory);
}
if (newReview) {
localStorage.setItem('ie_quiz_review', JSON.stringify(newReview));
setReviewList(newReview);
}
if (newWrong) {
localStorage.setItem('ie_quiz_wrong', JSON.stringify(newWrong));
setLastWrongList(newWrong);
}
console.log("Data saved.");
} catch (e) {
console.error("Save failed", e);
}
};

const startQuiz = (mode) => {
let qList = [];
if (mode === 'all') {
qList = [...QUESTIONS];
} else if (mode === 'review') {
qList = QUESTIONS.filter(q => reviewList.includes(q.id));
} else if (mode === 'wrong') {
qList = QUESTIONS.filter(q => lastWrongList.includes(q.id));
}

if (qList.length === 0) {
  alert("該当する問題がありません。");
  return;
}

// Shuffle questions
qList.sort(() => Math.random() - 0.5);

setActiveQuestions(qList);
setCurrentIndex(0);
setSelectedOption(null);
setShowExplanation(false);
setCurrentMode('quiz');
};

const handleOptionClick = (index) => {
if (showExplanation) return;
setSelectedOption(index);
setShowExplanation(true);

const isCorrect = index === activeQuestions[currentIndex].answer;
const currentQId = activeQuestions[currentIndex].id;

// Update History
const newRecord = {
  date: new Date().toISOString(),
  questionId: currentQId,
  correct: isCorrect
};
const newHistory = [newRecord, ...history].slice(0, 100); // Keep last 100

// Update Wrong List
let newWrong = [...lastWrongList];
if (!isCorrect) {
  if (!newWrong.includes(currentQId)) newWrong.push(currentQId);
} else {
  newWrong = newWrong.filter(id => id !== currentQId);
}

saveHistoryData(newHistory, null, newWrong);
};

const toggleReview = () => {
const currentQId = activeQuestions[currentIndex].id;
let newReview = [...reviewList];
if (newReview.includes(currentQId)) {
newReview = newReview.filter(id => id !== currentQId);
} else {
newReview.push(currentQId);
}
saveHistoryData(null, newReview, null);
};

const nextQuestion = () => {
if (currentIndex < activeQuestions.length - 1) {
setCurrentIndex(prev => prev + 1);
setSelectedOption(null);
setShowExplanation(false);
} else {
setCurrentMode('result');
}
};

// Screens
if (currentMode === 'start') {
return (
<div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 max-w-md mx-auto">
<h1 className="text-3xl font-bold text-gray-800 my-8 flex items-center gap-2">
<BookOpen className="w-8 h-8 text-blue-600" />
IE スマート問題集
</h1>

    <div className="w-full space-y-4">
      <ModeCard 
        title="すべての問題" 
        description="全16問からランダムに出題"
        count={QUESTIONS.length}
        icon={List}
        onClick={() => startQuiz('all')}
        colorClass="bg-white text-gray-800 border-gray-200"
      />
      <ModeCard 
        title="要復習の問題" 
        description="チェックした問題のみ"
        count={reviewList.length}
        icon={Save}
        onClick={() => startQuiz('review')}
        colorClass="bg-yellow-50 text-yellow-800 border-yellow-200"
      />
      <ModeCard 
        title="前回間違えた問題" 
        description="直近で不正解だった問題"
        count={lastWrongList.length}
        icon={RotateCcw}
        onClick={() => startQuiz('wrong')}
        colorClass="bg-red-50 text-red-800 border-red-200"
      />
      
      <button 
        onClick={() => setCurrentMode('history')}
        className="w-full mt-8 p-3 text-gray-600 flex justify-center items-center gap-2 hover:text-gray-900"
      >
        <Activity className="w-5 h-5" /> 学習履歴を見る
      </button>
    </div>
  </div>
);
}

if (currentMode === 'history') {
const totalAnswered = history.length;
const correctCount = history.filter(h => h.correct).length;
const rate = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

return (
  <div className="min-h-screen bg-gray-100 p-4 max-w-md mx-auto">
    <button onClick={() => setCurrentMode('start')} className="mb-4 flex items-center text-gray-600">
      <Home className="w-4 h-4 mr-1" /> ホームに戻る
    </button>
    <h2 className="text-2xl font-bold mb-4">学習履歴</h2>
    
    <div className="bg-white p-6 rounded-lg shadow mb-6 text-center">
      <p className="text-gray-500">通算正答率</p>
      <div className="text-4xl font-bold text-blue-600 my-2">{rate}%</div>
      <p className="text-sm text-gray-400">{correctCount} / {totalAnswered} 問</p>
    </div>

    <h3 className="font-bold mb-2">直近の履歴</h3>
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {history.length === 0 ? (
        <div className="p-4 text-gray-500 text-center">履歴がありません</div>
      ) : (
        history.slice(0, 20).map((h, i) => {
          const q = QUESTIONS.find(q => q.id === h.questionId);
          return (
            <div key={i} className="border-b p-3 flex items-center justify-between">
              <div className="flex items-center gap-3 overflow-hidden">
                {h.correct ? <Check className="text-green-500 w-5 h-5 flex-shrink-0" /> : <X className="text-red-500 w-5 h-5 flex-shrink-0" />}
                <div className="truncate text-sm">
                  <span className="text-xs text-gray-400 block">{new Date(h.date).toLocaleDateString()}</span>
                  {q ? q.title : `問${h.questionId}`}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  </div>
);
}

if (currentMode === 'result') {
// 簡易リザルト（今回解いた問題の正答率などを計算しても良いが、シンプルにホームへ）
return (
<div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 max-w-md mx-auto text-center">
<Trophy className="w-16 h-16 text-yellow-500 mb-4" />
<h2 className="text-2xl font-bold mb-2">セッション終了！</h2>
<p className="text-gray-600 mb-8">お疲れ様でした。学習記録が保存されました。</p>
<button
onClick={() => setCurrentMode('start')}
className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-blue-700 transition"
>
ホームに戻る
</button>
</div>
);
}

// Quiz Screen
const question = activeQuestions[currentIndex];
const isReviewing = reviewList.includes(question.id);

return (
<div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto shadow-xl">
{/* Header */}
<div className="bg-white p-4 shadow-sm flex justify-between items-center z-10 sticky top-0">
<div className="flex items-center gap-2">
<span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">
{question.category}
</span>
<span className="text-gray-500 text-sm">
{currentIndex + 1} / {activeQuestions.length}
</span>
</div>
<button
onClick={() => setCurrentMode('start')}
className="text-gray-400 hover:text-gray-600"
>
<X className="w-6 h-6" />
</button>
</div>

  <div className="flex-1 overflow-y-auto p-4 pb-24">
    {/* Question */}
    <h2 className="text-lg font-bold text-gray-800 mb-2">{question.title}</h2>
    <div className="text-gray-700 mb-6 whitespace-pre-wrap leading-relaxed border-b pb-4">
      {question.text}
    </div>

    {/* Options */}
    <div className="space-y-3 mb-6">
      {question.options.map((option, idx) => {
        let btnClass = "w-full p-4 text-left rounded-lg border transition-all relative ";
        
        if (showExplanation) {
          if (idx === question.answer) {
            btnClass += "bg-green-100 border-green-500 text-green-900 font-bold";
          } else if (idx === selectedOption) {
            btnClass += "bg-red-100 border-red-500 text-red-900";
          } else {
            btnClass += "bg-gray-100 text-gray-400 border-gray-200";
          }
        } else {
          btnClass += "bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-300 shadow-sm";
        }

        return (
          <button
            key={idx}
            disabled={showExplanation}
            onClick={() => handleOptionClick(idx)}
            className={btnClass}
          >
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full border border-current flex items-center justify-center text-sm">
                {['ア', 'イ', 'ウ', 'エ'][idx]}
              </div>
              <span>{option}</span>
            </div>
            {showExplanation && idx === question.answer && (
               <Check className="absolute right-4 top-4 text-green-600" />
            )}
          </button>
        );
      })}
    </div>

    {/* Explanation Area */}
    {showExplanation && (
      <div className="bg-blue-50 p-5 rounded-lg border border-blue-100 animate-fade-in">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-blue-800 flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> 解説
          </h3>
          <button 
            onClick={toggleReview}
            className={`flex items-center gap-1 text-xs px-2 py-1 rounded border ${isReviewing ? 'bg-yellow-100 text-yellow-700 border-yellow-300' : 'bg-white text-gray-500 border-gray-300'}`}
          >
            <Save className="w-3 h-3" /> {isReviewing ? '要復習リスト済' : '後で復習する'}
          </button>
        </div>
        
        <div className="text-sm text-gray-700 leading-relaxed mb-4 whitespace-pre-wrap">
          {question.explanation}
        </div>

        {/* Diagram/Table Rendering */}
        {question.diagramType && (
          <div className="mt-4 bg-white p-2 rounded border border-gray-200">
            <DiagramRenderer type={question.diagramType} />
          </div>
        )}
        
        <div className="mt-4 pt-4 border-t border-blue-200 text-right">
          <span className="text-xs text-gray-500">正解: {['ア', 'イ', 'ウ', 'エ'][question.answer]}</span>
        </div>
      </div>
    )}
  </div>

  {/* Footer Navigation */}
  {showExplanation && (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t shadow-lg max-w-md mx-auto">
      <button
        onClick={nextQuestion}
        className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-blue-700 flex items-center justify-center gap-2"
      >
        {currentIndex < activeQuestions.length - 1 ? '次の問題へ' : '結果を見る'}
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )}
</div>
);
}