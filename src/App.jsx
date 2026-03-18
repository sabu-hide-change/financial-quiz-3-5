// npm install lucide-react

import { useState, useEffect } from 'react';
import { Home, ChevronRight, Check, X } from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    year: '資材・在庫管理',
    title: '問題 1 資材の標準化',
    question: '資材の標準化に関する記述として、最も適切なものはどれか。',
    choices: [
      { label: 'ア', text: '資材標準化とは、扱う資材と購入先を制限し、資材の種類を削減することである。' },
      { label: 'イ', text: '標準資材の設定は、主に品質面と価格面の2つに配慮すればよい。' },
      { label: 'ウ', text: '資材標準化は、多様なニーズに迅速に対応するためにも進めた方がよい。' },
      { label: 'エ', text: '資材標準化を進めることで、品質の向上も期待できる。' },
    ],
    answer: 'エ',
    explanation: `【ここが重要】
本問では資材を標準化する意義や内容を問われています。

生産には、さまざまな資材が必要です。しかし資材の種類が増えると、資材を手配し管理するための手間が増えて、コストが増加していきます。そのため、取り扱い資材を制限し、資材の種類を削減することが重要です。このような取組みを、資材標準化と呼びます。

●資材標準化の流れ
①現状資材の使用状況調査：品目別に過去の使用実績を調査
②標準資材の検討：使用実績を基に品目をグループ化し、共通化できるものを検討する。更に、品質や価格、調達の容易性などを検討した上で、標準資材を確定
③資材規格の決定：資材の品質などの基準を規格化
④管理・運用方法を決定：標準化した資材の管理・運用方法を決定

●資材標準化のメリット
・まとめ購入が出来るので、コストを削減できる。
・資材を共通化できるので、在庫削減ができる。
・標準資材を常備品として在庫しておけるので、納期を短縮できる。
・管理する資材を減らすことで、品質を向上できる。
・管理する資材を減らすことで、手配や運搬、保管などの管理負荷を削減できる。

●資材標準化のデメリット
・使う資材の制約により、市場の変化や技術革新といった環境変化に対応しにくい。
・使う資材の制約により、設計の制約が増え、設計工数が増える。
・使う資材の制約により、設計時の自由で革新的な発想が阻害される可能性がある。`,
    answerDetails: [
      { label: 'ア', correct: false, detail: '資材標準化は、使用する資材の制限と種類の削減です。購入先の制限までは含みません。標準として設定した資材について、QCDの観点から最も適切な購入先を探索し、選定します。よって記述は不適切です。' },
      { label: 'イ', correct: false, detail: '標準資材の設定にあたっては、品質や価格に加え、調達の容易性を検討する必要があります。発注してから調達までに長期間かかり、独占販売で融通が利かない資材では、あとあと問題が生じる可能性が高くなります。よって記述は不適切です。' },
      { label: 'ウ', correct: false, detail: '資材標準化により、使う資材を制約した場合、市場の変化や技術革新といった環境変化に対応し難くなるデメリットがあります。よって記述は不適切です。' },
      { label: 'エ', correct: true, detail: '例えば、資材標準化を進めて、使用する資材を10部品から5部品に削減した場合を考えます。部品を削減した分、資材の受入検査ではこれまでより品質を重点的に確認することができます。よって記述は適切です。' },
    ],
  },
  {
    id: 2,
    year: '資材・在庫管理',
    title: '問題 2 MRP',
    question: 'MRPに関する記述として、最も不適切なものはどれか。',
    underline: true,
    choices: [
      { label: 'ア', text: 'MRPは基準生産計画から、資材の所要量を計画するシステムである。' },
      { label: 'イ', text: '従属需要品目の所要量は、独立需要品目の受注や需要予測に基づいて計算される。' },
      { label: 'ウ', text: '部品の正味所要量は、手持ちの在庫量と発注残を加味して計算される。' },
      { label: 'エ', text: '部品構成表には、ストラクチャ型と、ブリーフ型の2つの種類がある。' },
    ],
    answer: 'エ',
    explanation: `【ここが重要】
本問ではMRPで資材の計画オーダーを作成するのに必要な内容が問われています。

MRPは、製品の基準生産計画、部品表、在庫・発注残情報などをもとに、資材の所要量と時期を計画するための仕組みです。この中で特に重要となるのは、基準生産計画と、部品表で、具体的な内容は次の通りです。

●基準生産計画（MPS）
製品の生産計画のことで、基準生産計画はMPS（Master Production Schedule）と呼ばれます。MRPは、独立需要品目の生産計画を基準生産計画として与え、従属需要品目の所要量と時期を計算するための仕組みです。

①独立需要品目
・概要：最終製品や個別に提供されるサービスパーツなどのこと。（例：自転車本体）
・所要量情報：受注または需要予測に基づいて時期や量が決定される。

②従属需要品目
・概要：製品を構成する部品のこと。（例：自転車のタイヤ、チェーンなど）
・所要量情報：独立需要品目や上位の品目の需要から、時期や量が決定される。

●部品表（BOM）
製品を構成する部品の種類と数量をまとめたもので、部品構成表や、BOM（Bill Of Materials）と呼ばれることもあります。部品表には、ストラクチャ型部品表と、サマリー型部品表の2種類があります。

①ストラクチャ型部品表：製品を構成する全ての部品を階層型に表現したもの。
②サマリー型部品表：製品を構成する全ての部品をリストで表現したもの。

●MRPの手順
①総所要量計算：基準生産計画と部品表を基に所要量を計算する。
②正味所要量計算：総所要量から手持ちの在庫と発注残を引いて、足りない分の所要量を計算する。
③ロットまとめ：発注コストを抑えるため、一定の規模の所要量をロットとしてまとめる。
④先行計算：部品のリードタイム情報を基に、購買と生産の計画オーダーを作成する。`,
    answerDetails: [
      { label: 'ア', correct: true, detail: '基準生産計画とは製品の生産計画のことで、MPS（Master Production Schedule）と呼ばれます。MRPは、製品の生産計画を基に、資材の所要量と時期を計画するための仕組みです。よって記述は適切です。' },
      { label: 'イ', correct: true, detail: '従属需要品目とは、製品を構成する部品のことです。これらの所要量は、独立需要品目（すなわち最終製品や個別に提供されるサービスパーツ）の受注量や、需要予測に基づき計算されます。よって記述は適切です。' },
      { label: 'ウ', correct: true, detail: '正味所要量計算では、総所要量から手持ちの在庫と発注残を引いて、足りない分を所要量として計算します。よって記述は適切です。' },
      { label: 'エ', correct: false, detail: '部品表の種類は、ストラクチャ型部品表と、サマリー型部品表の2種類です。ストラクチャ型部品表は、製品を構成する全ての部品を階層型に表現したものです。サマリー型部品表は、製品を構成する全ての部品をリストで表したものです。よって記述は不適切です。' },
    ],
  },
  {
    id: 3,
    year: '資材・在庫管理',
    title: '問題 3 部品の所要量（ストラクチャ型）',
    question: `最終製品Xの部品構成表は下図のようになっている。図中のA,B,C,D,E,F,Gの右にある( )内の数字は、親に対して必要な部品数を示している。製品Xを10台生産するのに、必要な部品Fの所用量として、最も適切なものどれか。

【部品構成表（ストラクチャ型）のイメージ】
製品X
├─ A(1)
│   └─ C(2)
│       ├─ F(2)
│       └─ G(1)
├─ B(2)
│   ├─ F(1)
│   └─ H(1)
│       └─ F(3)
└─ D(1)

※部品Fの経路：
  経路①：X→A(1)→C(2)→F(2)　= 1×2×2 = 4個/製品X
  経路②：X→B(2)→F(1)　= 2×1 = 2個/製品X
  経路③：X→B(2)→H(1)→F(3)　= 2×1×3 = 6個/製品X
  合計：4+2+6 = 12個/製品X → 10台で120個`,
    choices: [
      { label: 'ア', text: '60' },
      { label: 'イ', text: '100' },
      { label: 'ウ', text: '120' },
      { label: 'エ', text: '140' },
    ],
    answer: 'ウ',
    explanation: `【ここが重要】
本問では部品の構成表から、特定部品の所要量を計算することが求められています。

部品表は、製品を構成する部品の種類と数量をまとめたもので、部品構成表や、BOM（Bill Of Materials）と呼ばれることもあります。部品表には、ストラクチャ型部品表と、サマリー型部品表の2種類があり、次のような内容となっています。

①ストラクチャ型部品表
・概要：製品を構成する全ての部品を階層型に表現したもの。
・適用：比較的複雑な構成の製品によく使用する。
・メリット：部品間の親子関係が明確で、中間部品や共通部品が分かりやすい。
・デメリット：作成に手間がかかる。

②サマリー型部品表
・概要：製品を構成する全ての部品をリストで表現したもの。（部品を階層で表現せずに、横に一列に並べる形を取る）
・適用：比較的単純な構成の製品によく使用する。
・メリット：作成の手間があまりかからない。
・デメリット：中間部品の構成がわからない。

部品の所要量の計算は過去に何度か出題されています。特に、ストラクチャ型の部品表から、特定部品の所要量を計算する方法は、確実にマスターしましょう。`,
    answerDetails: [
      { label: 'ア', correct: false, detail: '60は不正解です。' },
      { label: 'イ', correct: false, detail: '100は不正解です。' },
      { label: 'ウ', correct: true, detail: '部品Fが使われている箇所を確認すると、経路①：A→C→F = 1×2×2 = 4個、経路②：B→F = 2×1 = 2個、経路③：B→H→F = 2×1×3 = 6個。合計12個/製品X。製品Xを10台作るためには120個の部品Fが必要となります。よって正解はウです。' },
      { label: 'エ', correct: false, detail: '140は不正解です。' },
    ],
  },
  {
    id: 4,
    year: '資材・在庫管理',
    title: '問題 4 部品の所要量（サマリー型）',
    question: `下表は製品Xを1個生産するときに必要な部品とその数量を示している。これらの部品構成をサマリー型部品表で示した図として、最も適切なものはどれか。

【表1：製品Xへの直接組み込み部品】
┌────────┬────────┐
│ 部品   │ 数量   │
├────────┼────────┤
│ A      │ 1個    │
│ B      │ 2個    │
│ C      │ 3個    │
└────────┴────────┘

【表2：中間部品の構成】
┌────────┬────────┬────────┐
│ 部品   │ 使用部品│ 数量   │
├────────┼────────┼────────┤
│ A      │ C      │ 2個    │
│ A      │ D      │ 2個    │
│ B      │ E      │ 2個    │
└────────┴────────┴────────┘

【各部品の合計所要量（製品X 1個あたり）】
部品A：1個、部品B：2個、部品C：5個（製品Xに3個＋部品Aに2個）、部品D：2個（部品Aに2個）、部品E：4個（部品Bに2個×2個）

【解答群（サマリー型部品表の正解）】
X─A(1)─B(2)─C(5)─D(2)─E(4)  ← エが正解`,
    choices: [
      { label: 'ア', text: 'X─A(1)─B(2)─C(3)─D(2)─E(2)' },
      { label: 'イ', text: 'X─A(1)─B(2)─C(3)─D(2)─E(4)' },
      { label: 'ウ', text: 'X─A(1)─B(2)─C(5)─D(2)─E(2)' },
      { label: 'エ', text: 'X─A(1)─B(2)─C(5)─D(2)─E(4)' },
    ],
    answer: 'エ',
    explanation: `【ここが重要】
本問では表で与えられた部品構成をサマリー型部品表に展開する知識が求められています。

サマリー型部品表は、製品を構成する全ての部品をリストで表したものです。部品を階層で表現せずに、横に一列に並べる形を取ります。ストラクチャ型部品表に比べて、階層が無いため単純な表現で示すことができます。`,
    answerDetails: [
      { label: 'ア', correct: false, detail: '部品Cは、製品Xに使う3個＋部品Aに使う2個＝5個となります。また部品Eは、部品Bに使う2個×製品Xに必要な部品Bの2個＝4個となります。よって不正解です。' },
      { label: 'イ', correct: false, detail: '部品Cは5個が正しいです。よって不正解です。' },
      { label: 'ウ', correct: false, detail: '部品Eは4個が正しいです。よって不正解です。' },
      { label: 'エ', correct: true, detail: '部品A：1個、部品B：2個、部品C：5個（製品Xに3個＋部品Aに2個）、部品D：2個（部品Aに2個）、部品E：4個（部品Bに2個×製品Xに必要な部品Bの2個）。よって選択肢エが正解です。' },
    ],
  },
  {
    id: 5,
    year: '資材・在庫管理',
    title: '問題 5 在庫1',
    question: '資材の在庫に関する記述として、最も不適切なものはどれか。',
    underline: true,
    choices: [
      { label: 'ア', text: '豊富な在庫は、調達時間を省くことができるため、いつでも市場のニーズに素早く対応できる。' },
      { label: 'イ', text: '在庫の不足は、納期の遅延を招きやすく、機会損失が増加するリスクがある。' },
      { label: 'ウ', text: '過剰な在庫は、運転資金の悪化に加え、在庫維持費用の増加にもつながる。' },
      { label: 'エ', text: '在庫の不足による資材の調達では、違う購入ルートから高いコストで仕入れることがある。' },
    ],
    answer: 'ア',
    explanation: `【ここが重要】
本問では資材の在庫の過不足により発生する問題について、問われています。

在庫は、多すぎても少なすぎても問題が起こります。このため在庫管理活動によって、各種の資材や製品などの在庫を適切な水準に維持します。

在庫の過不足により発生する主な問題：

【在庫過多の問題】
・運転資金の増加（資金繰りの悪化）
・在庫維持費用（保管料・倉庫費・人件費）の増加
・製品のライフサイクル短縮により、死蔵在庫化するリスク
・市場ニーズに対応した新製品への切換えタイミングが遅れる

【在庫不足の問題】
・資材の調達時間が余分にかかり、製品の生産が遅れる
・納期の遅延を招きやすく、機会損失が増大するリスク
・緊急調達により通常より高いコストで仕入れることがある

在庫の過不足により発生する問題については、なぜそうなるか、理由についても合わせて理解しましょう。`,
    answerDetails: [
      { label: 'ア', correct: false, detail: '適正な在庫は調達時間を省ける分、市場のニーズに短納期で応えやすくなります。しかし、近年では、製品のライフサイクルが短縮しており、豊富な在庫は、市場ニーズに対応した新製品への切換えタイミングを遅くしたり、資材が死蔵在庫化するリスクを伴います。このため、いつでも市場のニーズに素早く対応出来るとは言えません。よって記述は不適切です。' },
      { label: 'イ', correct: true, detail: '在庫の不足は、資材の調達時間が余分にかかるため、その分製品の生産が遅れます。この結果、納期の遅延を招きやすく、機会損失が増大するリスクがあります。よって記述は適切です。' },
      { label: 'ウ', correct: true, detail: '過剰在庫の問題は、運転資金が多くなり資金繰りが悪化することや、在庫維持のための保管料や倉庫費、人件費等の費用が増加することです。よって記述は適切です。' },
      { label: 'エ', correct: true, detail: '在庫の不足により資材を緊急調達する際は、市場在庫をストックすることで短納期納入を専門にしている業者から、通常より高いコストで資材を仕入れることがあります。また、通常とは違う運送手段（船便→航空便）を用いることで、資材の調達時間を短縮することがあります。よって記述は適切です。' },
    ],
  },
  {
    id: 6,
    year: '資材・在庫管理',
    title: '問題 6 在庫2',
    question: '生産・販売活動における在庫に関する記述として、最も不適切なものはどれか。',
    underline: true,
    choices: [
      { label: 'ア', text: '安全在庫とは、需要変動又は補充期間の不確実性を吸収するために必要とされる在庫である。' },
      { label: 'イ', text: '見越在庫とは、あらかじめ予測できる変動への備えとしての在庫である。' },
      { label: 'ウ', text: '有効在庫とは、手持ち在庫から引き当て済みの在庫量を減じた在庫量であり、発注残は考慮されない。' },
      { label: 'エ', text: '在庫引当とは、注文または出荷要求に対して在庫台帳の在庫残高からその量を割り当て引き落とす行為である。' },
    ],
    answer: 'ウ',
    explanation: `【ここが重要】
本問では、生産・販売活動における在庫に関する用語について問われています。

在庫に関する用語：

●安全在庫
需要変動又は補充期間の不確実性を吸収するために必要とされる在庫。

●見越在庫
あらかじめ予測できる変動への備えとしての在庫。

●ロットサイズ在庫（サイクル在庫）
1回の補充で経済的理由から量をまとめることによって発生する在庫。

●手持在庫（実在庫、現品在庫）
現物が手元にある在庫。

●有効在庫
手持在庫に加えて発注残及び引当済みの量（引当量）を考慮した、実質的に利用可能な在庫。

　有効在庫 ＝ 手持在庫 － 引当量 ＋ 発注残

●発注残
発注済みであるがまだ手元にない在庫量。

●在庫引当
注文または出庫要求に対して、在庫台帳の在庫残高からその量を割り当て引き落とす行為。`,
    answerDetails: [
      { label: 'ア', correct: true, detail: '安全在庫とは、需要変動または補充期間の不確実性を吸収するために必要とされる在庫のことをいいます。よって記述は適切です。' },
      { label: 'イ', correct: true, detail: '見越在庫とは、あらかじめ予測できる変動への備えとしての在庫のことをいいます。よって記述は適切です。' },
      { label: 'ウ', correct: false, detail: '有効在庫は、実質的に利用可能な在庫量のことをいいます。手持ち在庫から引当済みの量（引当量）を減じ、将来的に在庫になる発注残（発注済みであるがまだ手元にない在庫量）を加えることで求められます。有効在庫 ＝ 手持在庫 － 引当量 ＋ 発注残。よって、記述は不適切です。' },
      { label: 'エ', correct: true, detail: '在庫引当とは、注文又は出荷要求に対して在庫台帳の在庫残高からその量を割り当て引き落とす行為のことをいいます。よって記述は適切です。' },
    ],
  },
  {
    id: 7,
    year: '資材・在庫管理',
    title: '問題 7 定量発注方式1',
    question: '定量発注方式に関する記述として、最も適切なものはどれか。',
    choices: [
      { label: 'ア', text: '常に一定の安全在庫を確保しているため、需要の変動にも対応しやすい。' },
      { label: 'イ', text: '発注量を適切にコントロールできるので、単価の高い品目に向いている。' },
      { label: 'ウ', text: '安全在庫は、「安全在庫係数」、「需要量のバラツキ」、「調達リードタイムの平方根」の積で表される。' },
      { label: 'エ', text: '発注点を低くすることで、品切れの頻度も低くなる傾向にある。' },
    ],
    answer: 'ウ',
    explanation: `【ここが重要】
本問では定量発注方式の内容について問われています。

定量発注方式では、在庫量が一定の水準になったときに、一定量を発注します。毎回発注する量のことを、経済的発注量と呼び、発注を行う在庫水準（タイミング）を発注点と呼びます。

●発注点
発注してから、実際に資材が入荷するまでには調達リードタイムがかかります。そのため、発注点を決める際は、調達リードタイムの間の需要量を考慮する必要があります。また、需要にはバラツキがありますので、在庫切れを防ぐために安全在庫を残しておく必要があります。

　発注点 ＝ 調達リードタイム × 1日平均需要量 ＋ 安全在庫

●安全在庫
　安全在庫 ＝ 安全在庫係数 × 需要量の標準偏差 × √調達リードタイム

ここで、安全在庫係数は、どれぐらい品切れを防ぐかを決める係数です。安全在庫係数が大きいほど品切れのリスクは減りますが、在庫量は多くなります。

需要量の標準偏差は、需要のバラツキを表します。バラツキが大きいほど、安全在庫も大きくする必要があります。また、調達リードタイムが長いほど、品切れのリスクが高くなるため、安全在庫を大きくする必要があります。

●経済的発注量
経済的発注量は、発注処理にかかる費用と、在庫の保管費用を合計した総費用が最も少なくなる発注量のことです。英語ではEOQ（Economic Order Quantity）と呼ばれます。

●定量発注方式のメリットとデメリット
・メリット：初めに経済的発注量と発注点を決めておけば、あとは在庫量だけを見ていれば良いため、管理が自動化しやすく簡単。
・デメリット：需要の変動に対応し難い。常に同じ量しか発注しないため、需要が急に増加した場合には在庫切れするリスクがある。

これらの事を考慮すると、定量発注方式は、需要が安定しており、単価が低い品目に向いています。`,
    answerDetails: [
      { label: 'ア', correct: false, detail: '定量発注方式では、常に同じ量しか発注しません。このため、需要が急に増加した場合は、一定数の安全在庫だけではカバーしきれずに、在庫切れになりやすいデメリットがあります。よって記述は不適切です。' },
      { label: 'イ', correct: false, detail: '定量発注方式では、発注量は毎回同じです。この方式は、在庫切れのリスクに備え、安全在庫数を増やしたり、発注量を多めにしてもあまり負担が大きくならない、単価の低い品目に向いています。よって記述は不適切です。' },
      { label: 'ウ', correct: true, detail: '安全在庫は次の式で求められます。「安全在庫 ＝ 安全在庫係数 × 需要量の標準偏差 × √調達リードタイム」。ここで、需要量の標準偏差とは需要のバラツキのことです。よって記述は適切です。' },
      { label: 'エ', correct: false, detail: '発注点を低くするということは、発注時点で残っている在庫数が少ないことを意味します。次に資材が入荷するまでの需要変動に対する余裕や、何らかの事情で調達リードタイムが長引いた場合の余裕が少なくなるため、品切れになる頻度（確率）は高くなります。よって記述は不適切です。' },
    ],
  },
  {
    id: 8,
    year: '資材・在庫管理',
    title: '問題 8 定量発注方式2',
    question: '1回あたりの発注費用が5,000円、年間需要数が100,000個、在庫単価が2,500円、在庫保管費用率が10%の資材の発注に、定量発注方式を用いる場合の記述として、最も適切なものはどれか。',
    choices: [
      { label: 'ア', text: '1回の発注量を5,000個にした場合の、年間の発注費用は250,000円である。' },
      { label: 'イ', text: '1回の発注量を10,000個にした場合の、年間の在庫費用は500,000円である。' },
      { label: 'ウ', text: '在庫保管費用が半分になれば、経済的発注量は2倍となる。' },
      { label: 'エ', text: '発注費用と在庫維持費用を合計した総費用が最も少なくなるのは、1回の発注量が2,000個のときである。' },
    ],
    answer: 'エ',
    explanation: `【ここが重要】
本問では定量発注方式における経済的発注量について問われています。

経済的発注量は、発注処理にかかる費用と、在庫の保管費用を合計した総費用が最も少なくなる発注量のことで、次の式で求められます。

【経済的発注量の式】
EOQ ＝ √（2 × 年間需要量 × 1回あたりの発注費用 ÷ 1個あたりの年間在庫維持費用）

【年間の発注費用の計算】
年間発注費用 ＝ （年間需要量 ÷ 1回の発注量） × 1回あたりの発注費用

【年間の在庫維持費用の計算】
年間在庫維持費用 ＝ （1回の発注量 ÷ 2） × 1個あたりの年間在庫維持費用
※平均在庫量とするため、1回の発注量を半分にしています。

【1個あたりの年間在庫維持費用】
= 在庫の単価 × 在庫の保管費用率 ＝ 2,500円 × 10% ＝ 250円

発注費用と在庫維持費用が等しいことが、経済的発注量の条件となります。

【本問の経済的発注量の計算】
EOQ ＝ √（2 × 100,000 × 5,000 ÷ 250）＝ √4,000,000 ＝ 2,000個`,
    answerDetails: [
      { label: 'ア', correct: false, detail: '発注量を5,000個にした場合は、1年に20回（100,000÷5,000）発注します。1回あたりの発注費用が5,000円ですから、年間の発注費用は100,000円となります。250,000円ではありません。よって記述は不適切です。' },
      { label: 'イ', correct: false, detail: '在庫の維持費用は、1個あたりの年間在庫維持費用（250円）×平均在庫量（10,000÷2=5,000個）= 1,250,000円となります。500,000円ではありません。よって記述は不適切です。' },
      { label: 'ウ', correct: false, detail: '経済的発注量は平方根の式となっているので、仮に在庫保管費用が半分になっても、経済的発注量は√2倍（約1.41倍）であり、2倍にはなりません。よって記述は不適切です。' },
      { label: 'エ', correct: true, detail: 'EOQ ＝ √（2 × 100,000 × 5,000 ÷ 250）＝ √4,000,000 ＝ 2,000個。与えられた条件を入れて計算すると、経済的発注量は2,000個となります。よって記述は適切です。' },
    ],
  },
  {
    id: 9,
    year: '資材・在庫管理',
    title: '問題 9 定期発注方式',
    question: '定期発注方式に関する記述として、最も不適切なものはどれか。',
    underline: true,
    choices: [
      { label: 'ア', text: '定期発注方式は、発注量をきめ細かく調整できるので、需要の変動に対応しやすい。' },
      { label: 'イ', text: '定期発注方式は、発注量を毎回計算する必要があるため、管理が複雑になりやすい。' },
      { label: 'ウ', text: '定期発注方式では、調達リードタイム中の需要予測から、現在の在庫量を引いて、発注量を求める。' },
      { label: 'エ', text: '定期発注方式は、単価が高く、在庫調整の必要性が高い品目の発注管理に適している。' },
    ],
    answer: 'ウ',
    explanation: `【ここが重要】
本問では定期発注方式の内容が問われています。

●定期発注方式
一定期間ごとに、需要の予測や在庫量を考慮して発注量を決定する方式です。

●定期発注方式の発注量
次の式で発注量を求めます。

発注量 ＝ 在庫調整期間の需要予測量 － 現在の在庫量 － 発注残 ＋ 安全在庫

ここで、在庫調整期間は、発注サイクルと、調達リードタイムをあわせた期間を表します。例えば、発注サイクルが30日間、調達リードタイムが10日の場合は、在庫調整期間は40日となります。また、現在の在庫量と発注残を引いているのは、既に在庫や発注残が沢山ある場合は、発注量を少なくするからです。また、安全在庫を足すことで、最低限、安全在庫の分は在庫が残るようにしています。

●定期発注方式のメリットとデメリット
・メリット：需要変動に対応しやすい。発注サイクルごとに発注量を変化させることで、きめ細かい在庫管理が可能で、在庫量を減少できる。
・デメリット：発注のたびに発注量を計算する必要があるため、管理が複雑で手間がかかる。

これらの事を考慮すると、定期発注方式は、単価が高く、在庫調整の必要が高い品目に向いています。`,
    answerDetails: [
      { label: 'ア', correct: true, detail: '定期発注方式では、発注ごとに直近の需要量や、季節による需要変動量などを考慮して発注量を決めます。このため、定量発注方式に比べ、需要の変動に対応しやすいと言えます。よって記述は適切です。' },
      { label: 'イ', correct: true, detail: '定期発注方式は、発注のたびに需要量を予測し、発注量を毎回計算する必要があります。そのため、発注・在庫管理が複雑で手間がかかるといったデメリットがあります。よって記述は適切です。' },
      { label: 'ウ', correct: false, detail: '定期発注方式における発注量は、在庫調整期間中の需要予測量から現在の在庫量と発注残を引き、安全在庫を足して求めます。「調達リードタイム中の需要予測」ではなく「在庫調整期間（発注サイクル＋調達リードタイム）の需要予測」が正しく、また発注残と安全在庫の考慮が欠けています。よって記述は不適切です。' },
      { label: 'エ', correct: true, detail: '定期発注方式は、発注サイクルごとに発注量を変化させることで、きめ細かい在庫管理をしていきます。したがって、単価が高く、在庫調整の必要性が高い品目の発注管理に適しています。よって記述は適切です。' },
    ],
  },
  {
    id: 10,
    year: '資材・在庫管理',
    title: '問題 10 ダブルビン方式と補充点方式',
    question: 'ダブルビン方式、及び補充点方式に関する記述として、最も不適切なものはどれか。',
    underline: true,
    choices: [
      { label: 'ア', text: 'ダブルビン方式は、欠品を防ぐために同じ容量の在庫を2つ分用意しておき、1つ分を使い切ったら、毎回2つ分の容量分を発注する方式である。' },
      { label: 'イ', text: 'ダブルビン方式は、在庫量を細かく調査する必要がないため、管理が簡単というメリットがある一方で、運用がルーズになりやすいといったデメリットがある。' },
      { label: 'ウ', text: '補充点方式は、在庫量が減少したときに、減少した分だけ補充する方式である。' },
      { label: 'エ', text: '発注点・補充点方式は、あらかじめ定めた水準まで在庫が減少したときに、補充点まで在庫を引き上げるように、現在の有効在庫との差を発注する方式である。' },
    ],
    answer: 'ア',
    explanation: `【ここが重要】
本問ではダブルビン方式と補充点方式の内容が問われています。

●ダブルビン方式
2つの入れ物を用意し、一方が空になったら発注するという、簡易的な発注方式です。単価が安い小物などの管理に向いており、管理が簡単というメリットがあります。しかし一方で、運用がルーズになりやすいデメリットがあります。

●補充点方式
在庫量が減少したときに、減少した分だけ補充して、一定の在庫量を保とうとする在庫管理方式です。補充点とは、最大の在庫量を意味します。

●発注点・補充点方式
在庫量があらかじめ定められた水準に減少したときに、補充点と現在の有効在庫との差を発注する方式です。あらかじめ定められた水準が発注点です。`,
    answerDetails: [
      { label: 'ア', correct: false, detail: 'ダブルビン方式では、同じ容量の在庫が入った2つのビン（箱、容器）を用意しておき、一方のビンが空になり、他方の在庫を使い始めた時点で、１つのビンの容量を発注する方式です。毎回2つ分の容量を発注するわけではありません。よって記述は不適切です。' },
      { label: 'イ', correct: true, detail: 'ダブルビン方式は、１つの容器が空になった時点で、その１つ分を発注すればよいため、管理が簡単といったメリットがあります。発注の精度や在庫の複雑な管理を必要としないため、運用がルーズになりやすいといったデメリットもあります。よって記述は適切です。' },
      { label: 'ウ', correct: true, detail: '補充点方式とは、在庫量が減少したときに、減少した分だけ補充して、一定の在庫量を保とうとする在庫管理方式です。よって記述は適切です。' },
      { label: 'エ', correct: true, detail: '発注点・補充点方式とは、在庫量があらかじめ定められた水準（発注点）に減少したときに、補充点と現在の有効在庫との差を発注する方式です。よって記述は適切です。' },
    ],
  },
  {
    id: 11,
    year: '資材・在庫管理',
    title: '問題 11 ABC分析',
    question: '在庫のABC管理に関する記述として、最も適切なものはどれか。',
    choices: [
      { label: 'ア', text: 'C品目では、需要予測を定期的に行い、余分な発注を出来るだけ避けることに重点が置かれる。' },
      { label: 'イ', text: 'B品目は、品目内を在庫金額に応じて更に幾つかのグループに分けて、管理レベルや発注方式を変えた方がよい。' },
      { label: 'ウ', text: 'A品目では、効率優先の管理を目指し、発注方式はダブルビン方式が採用されることが多い。' },
      { label: 'エ', text: 'パレート図を用いたABC分析では、右側に最も在庫金額の高い品目がくる。' },
    ],
    answer: 'イ',
    explanation: `【ここが重要】
本問ではABC分析の内容や品目ごとの管理方法が問われています。

在庫を効率的に管理するために、重点的に管理するものと、手間を省くものに分けて管理します。ABC分析では、在庫の品目を、在庫金額などの基準によって、A、B、Cの3つに分類、分類に応じた適切な管理方法を選択する方法です。

●パレート図
ABC分析では、パレート図と呼ばれるグラフを作成します。パレート図では、横軸に品目を取り、在庫金額が大きい順に左から並べます。縦軸には、累計在庫金額を取ります。一般的にパレート図を作成すると、左側にある少ない品目で、大きい累計在庫金額を占めていることが多くなります。これは、よくパレートの法則や、80対20の法則と呼ばれている経験則です。

●在庫管理方法

┌──────┬──────────────────────────┬──────────────────────┐
│ 区分 │ 管理方法                           │ 発注方式             │
├──────┼──────────────────────────┼──────────────────────┤
│ A品目│ 在庫水準を抑えるよう、きめ細かく管理 │ 定期発注方式         │
├──────┼──────────────────────────┼──────────────────────┤
│ B品目│ 在庫金額に応じてグループ分けし、       │ 品目によって使い分け │
│      │ 管理レベルや発注方式を適切に選択       │                      │
├──────┼──────────────────────────┼──────────────────────┤
│ C品目│ 管理の手間を極力省く                   │ ダブルビン方式等     │
└──────┴──────────────────────────┴──────────────────────┘`,
    answerDetails: [
      { label: 'ア', correct: false, detail: '選択肢の記述はA品目に関する説明です。C品目は金額が小さいため、管理の手間を極力省くことに重点が置かれます。このため、手間のかかる需要予測に基づく発注は行わず、ダブルビン方式の発注が多く採用されます。よって記述は不適切です。' },
      { label: 'イ', correct: true, detail: 'B品目は、A品目とC品目の間に位置し、どちらの品目に近いかによって金額も大きく異なります。このため、金額に応じて品目内を幾つかのグループに分け、各グループの管理レベルや発注方式を適切に選択することが望まれます。よって記述は適切です。' },
      { label: 'ウ', correct: false, detail: '選択肢の記述はC品目に関する説明です。A品目は金額が大きいため、在庫水準を抑えるように、きめ細かく管理を行います。このため、発注方式は、定期発注方式が多く採用されます。よって記述は不適切です。' },
      { label: 'エ', correct: false, detail: 'パレート図では、横軸に品目を取り、在庫金額が大きい順に左から並べます。この時、最も左側に位置する在庫金額が高い品目がA品目で、中央がB品目、最も右側がC品目となります。よって記述は不適切です。' },
    ],
  },
  {
    id: 12,
    year: '資材・在庫管理',
    title: '問題 12 購買管理',
    question: '購買管理に関する記述として、最も不適切なものはどれか。',
    underline: true,
    choices: [
      { label: 'ア', text: '購買管理の5原則とは、最も適正な「品質」のものを、適正な「時期」に、適正な「数量」だけ、適正な「価格」で、適正な「購入先」から購入することである。' },
      { label: 'イ', text: '競争入札による価格契約は、優位な価格での取引に加え、納期面でも最適な取引先を選定できるメリットがある。' },
      { label: 'ウ', text: '当用買方式は、必要な物を必要なタイミングで都度購買する方式であり、在庫の削減はできるメリットがある。' },
      { label: 'エ', text: '見積合わせ方式による価格契約は、競争原理による低価格での購入と、適切な企業を選定できるメリットがある。' },
    ],
    answer: 'イ',
    explanation: `【ここが重要】
本問では購買管理の内容について問われています。

購買管理は、外部から資材を調達するための管理活動で、ポイントとしては次のような内容があります。

●購買管理の5原則
適正な「品質」のものを、適正な「時期」に、適正な「数量」だけ、適正な「価格」で、適正な「購入先」から購入することです。
ちなみに、品質がQ、価格がC、数量と納期がDですので、この5つの原則は、QCD＋取引先と覚えておくと良いでしょう。

●購買方式（購買の時期や量による分類）

┌──────────────┬──────────────────────────────┬─────────────────────┬──────────────────────┐
│ 発注方式     │ 内容                             │ メリット             │ デメリット           │
├──────────────┼──────────────────────────────┼─────────────────────┼──────────────────────┤
│ 定期購買方式 │ 定期的に必要量を購入する方式     │ 需要変動に対応しやすい│ 管理が複雑で手間がかかる│
│              │                                  │ 在庫量を削減しやすい  │                      │
├──────────────┼──────────────────────────────┼─────────────────────┼──────────────────────┤
│ 定量購買方式 │ 発注点に達した場合に一定量を     │ 管理が簡単で自動化   │ 需要の変動に対応しにくい│
│              │ 購入する方式                     │ しやすい             │ 在庫量が増加しやすい  │
├──────────────┼──────────────────────────────┼─────────────────────┼──────────────────────┤
│ 当用買方式   │ 必要な物を必要なタイミングで     │ 在庫の削減が可能     │ 購買単価が高くなる   │
│（都度購入方式）│ 都度購買する方式               │                      │ 入手が不安定になるリスク│
├──────────────┼──────────────────────────────┼─────────────────────┼──────────────────────┤
│ 長期契約方式 │ 長期間の購入をまとめて契約し、   │ 安価な購入が可能     │ 不要になった場合、   │
│              │ 必要なタイミングで分納してもらう │ 納期も安定           │ 買取り責任が発生する  │
└──────────────┴──────────────────────────────┴─────────────────────┴──────────────────────┘

●購買方式（価格の契約による分類）

┌──────────────┬──────────────────────────────┬─────────────────────┬──────────────────────┐
│ 価格契約     │ 内容                             │ メリット             │ デメリット           │
├──────────────┼──────────────────────────────┼─────────────────────┼──────────────────────┤
│ 競争入札方式 │ 入札によって価格が最も低い業者と │ 低価格での購入が可能 │ 品質や納期などで不適切│
│              │ 契約する方式                     │                      │ な業者を選択するリスク│
├──────────────┼──────────────────────────────┼─────────────────────┼──────────────────────┤
│ 見積合わせ方式│ 複数の企業から価格の見積を取り、│ 競争原理による低価格 │ 見積もりの依頼や、   │
│              │ 比較して最適な企業を選択する方式 │ 適切な企業の選定が可能│ 最終選定に手間がかかる│
├──────────────┼──────────────────────────────┼─────────────────────┼──────────────────────┤
│ 随意契約方式 │ 購入の都度、購入先を決める方式   │ 柔軟な購買が可能     │ 競争原理が働かないため│
│              │                                  │                      │ 単価が高くなる可能性  │
└──────────────┴──────────────────────────────┴─────────────────────┴──────────────────────┘`,
    answerDetails: [
      { label: 'ア', correct: true, detail: '購買管理の5原則とは、①最も適した品質のものを、②適正な数量だけ、③適正な時期に、④適正な価格で、⑤適正な購入先から購入する、といった原則です。よって記述は適切です。' },
      { label: 'イ', correct: false, detail: '競争入札による価格契約は、優位な価格で購入できるメリットがあります。しかし価格を重視するあまり、品質や納期などで不適切な業者が選択されるリスクがあります。よって記述は不適切です。' },
      { label: 'ウ', correct: true, detail: '当用買方式は、必要な物を必要なタイミングで都度購買するため、在庫の削減が可能です。よって記述は適切です。' },
      { label: 'エ', correct: true, detail: '見積合わせ方式は、複数の企業から価格の見積を取り、比較した上で最適な企業を選択する方式です。選択時には、価格面の優位性に加え、取引実績なども加味して総合的に評価するため、適切な企業を選定できるメリットがあります。よって記述は適切です。' },
    ],
  },
  {
    id: 13,
    year: '資材・在庫管理',
    title: '問題 13 外注管理',
    question: '外注管理に関する記述として、最も適切なものはどれか。',
    choices: [
      { label: 'ア', text: '外注を利用する目的として、自社の固定費を削減して変動費化することがある。' },
      { label: 'イ', text: '外注することにより、品質、コスト、納期を容易に管理できる。' },
      { label: 'ウ', text: '外注で製作した方がコスト低減になる場合は、必ず外注を利用する。' },
      { label: 'エ', text: '高度な品質が要求されない場合は、積極的に外注を利用した方がよい。' },
    ],
    answer: 'ア',
    explanation: `【ここが重要】
本問では外注管理の目的や内容について問われています。

外注管理は、外注することで外部の企業を効果的に活用するための管理活動で、次のような内容があります。

●外注を利用する目的
・コストの削減（自社よりも安いコストで生産できる外注先の利用）
・外部の生産能力の活用（需要変動に伴う生産量の変動の吸収や固定費の変動費化）
・外部の専門技術の活用（自社で保有していない特殊技術などの利用）

●内外製区分の決定
自社で生産することを内作、外注することを外作と呼びます。何を内作して、何を外注するか決めることを、内外製区分と呼びます。この区分は、QCDや稼働率、生産設備、専門技術などを基準に決定します。

┌────────────────────────┬────────────────────────────────────┐
│ 内作に適しているもの   │ 外作に適しているもの               │
├────────────────────────┼────────────────────────────────────┤
│ 高度な品質が要求されるもの│ 高品質が要求されないもの           │
│                        │ （但し、自社の固有技術が流出しない場合）│
├────────────────────────┼────────────────────────────────────┤
│ 自社の固有技術の流出が  │ 自社にない生産設備、               │
│ 懸念されるもの         │ 専門技術が必要なもの               │
├────────────────────────┼────────────────────────────────────┤
│ コスト面で内作した方が  │ コスト面で外注した方が安いもの     │
│ 安いもの               │                                    │
├────────────────────────┼────────────────────────────────────┤
│ 内作の方が、納期が早く  │ 外作の方が、納期が早く             │
│ 短納期が必要な場合      │ 短納期が必要な場合                 │
└────────────────────────┴────────────────────────────────────┘

●外注先の管理
外注管理では、外注先企業の選定と指導が重要となります。

・外注先の選定：技術レベル、企業の経営面や信用面、負荷状況、生産管理の管理レベル、製品のQCDなどを評価して選定します。
・外注指導：外注先に望むQCDを達成してもらうために、各種の指導や育成を実施。指導形態には、集合教育、定期的訪問による巡回指導、外注先への指導員出向などがあります。`,
    answerDetails: [
      { label: 'ア', correct: true, detail: '外注を利用する目的の1つに、固定費の変動費化があります。例えば、高額な設備を自社で購入した場合、その設備の償却費は固定費となります。しかし、外注すれば、購入量に応じた外注費用の支払いだけになります。すなわち変動費化が可能となります。よって記述は適切です。' },
      { label: 'イ', correct: false, detail: '外注を利用する場合は、自社が望むQCDを外注先に達成してもらうために、一般には各種の指導や育成を実施します。このため、内作するよりも外注した方が、品質、コスト、納期を管理する労力がかかります。よって記述は不適切です。' },
      { label: 'ウ', correct: false, detail: '内外製区分を決定する際は、コストだけでなく、品質や納期、自社の設備の稼働率、生産設備、専門技術、外注先の経営状態や、負荷状況など、多くの観点で外注を利用するかどうか決めます。よって記述は不適切です。' },
      { label: 'エ', correct: false, detail: '内外製区分の決定には多面的な評価が必要です。また、仮に高品質が要求されなくても、自社の固有技術の流出が懸念される場合は、外注しないのが一般的です。よって記述は不適切です。' },
    ],
  },
];

const STORAGE_KEY = 'quiz_3_4_state';

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    console.log('[loadState] error:', e);
    return {};
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    console.log('[saveState] saved:', state);
  } catch (e) {
    console.log('[saveState] error:', e);
  }
}

export default function App() {
  const [screen, setScreen] = useState('start'); // start | quiz | result | history
  const [mode, setMode] = useState('all'); // all | wrong | review
  const [questionList, setQuestionList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [quizState, setQuizState] = useState(loadState);
  const [sessionResults, setSessionResults] = useState([]);

  useEffect(() => {
    saveState(quizState);
  }, [quizState]);

  function startQuiz(selectedMode) {
    console.log('[startQuiz] mode:', selectedMode);
    let list = [...QUESTIONS];
    if (selectedMode === 'wrong') {
      list = list.filter(q => quizState[q.id]?.lastCorrect === false);
    } else if (selectedMode === 'review') {
      list = list.filter(q => quizState[q.id]?.review === true);
    }
    if (list.length === 0) {
      alert('該当する問題がありません。');
      return;
    }
    setMode(selectedMode);
    setQuestionList(list);
    setCurrentIndex(0);
    setSelected(null);
    setSessionResults([]);
    setScreen('quiz');
  }

  function handleSelect(label) {
    if (selected !== null) return;
    const q = questionList[currentIndex];
    const isCorrect = label === q.answer;
    console.log('[handleSelect] q:', q.id, 'selected:', label, 'correct:', isCorrect);
    setSelected(label);
    setSessionResults(prev => [...prev, { id: q.id, correct: isCorrect }]);
    setQuizState(prev => ({
      ...prev,
      [q.id]: {
        ...prev[q.id],
        lastCorrect: isCorrect,
        history: [...(prev[q.id]?.history || []), { correct: isCorrect, date: new Date().toLocaleDateString('ja-JP') }],
        review: prev[q.id]?.review || false,
      }
    }));
  }

  function toggleReview(id) {
    setQuizState(prev => {
      const updated = {
        ...prev,
        [id]: {
          ...prev[id],
          review: !(prev[id]?.review || false),
        }
      };
      console.log('[toggleReview] id:', id, 'review:', updated[id].review);
      return updated;
    });
  }

  function nextQuestion() {
    if (currentIndex + 1 < questionList.length) {
      setCurrentIndex(currentIndex + 1);
      setSelected(null);
    } else {
      setScreen('result');
    }
  }

  function goHome() {
    setScreen('start');
    setSelected(null);
    console.log('[goHome]');
  }

  const q = questionList[currentIndex];

  if (screen === 'start') {
    const wrongCount = QUESTIONS.filter(q => quizState[q.id]?.lastCorrect === false).length;
    const reviewCount = QUESTIONS.filter(q => quizState[q.id]?.review === true).length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-indigo-700 text-center mb-2">スマート問題集</h1>
          <p className="text-center text-gray-500 text-sm mb-6">3-4 資材・在庫管理（全{QUESTIONS.length}問）</p>
          <div className="space-y-3">
            <button
              onClick={() => startQuiz('all')}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold flex items-center justify-between px-5 hover:bg-indigo-700 transition"
            >
              <span>すべての問題</span>
              <span className="text-indigo-200 text-sm">{QUESTIONS.length}問</span>
            </button>
            <button
              onClick={() => startQuiz('wrong')}
              className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold flex items-center justify-between px-5 hover:bg-red-600 transition"
            >
              <span>前回不正解の問題のみ</span>
              <span className="text-red-200 text-sm">{wrongCount}問</span>
            </button>
            <button
              onClick={() => startQuiz('review')}
              className="w-full bg-yellow-500 text-white py-3 rounded-xl font-semibold flex items-center justify-between px-5 hover:bg-yellow-600 transition"
            >
              <span>要復習の問題のみ</span>
              <span className="text-yellow-200 text-sm">{reviewCount}問</span>
            </button>
            <button
              onClick={() => setScreen('history')}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold flex items-center justify-between px-5 hover:bg-gray-200 transition"
            >
              <span>履歴・要復習フラグ一覧</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'history') {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <button onClick={goHome} className="text-indigo-600 hover:text-indigo-800">
              <Home className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-gray-800">履歴・要復習フラグ一覧</h2>
          </div>
          <div className="space-y-2">
            {QUESTIONS.map(q => {
              const st = quizState[q.id] || {};
              const lastCorrect = st.lastCorrect;
              const review = st.review || false;
              const historyArr = st.history || [];
              return (
                <div key={q.id} className="bg-white rounded-xl shadow-sm p-4 flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-gray-800 text-sm">{q.title}</span>
                      {lastCorrect === true && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">前回○</span>}
                      {lastCorrect === false && <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">前回×</span>}
                      {lastCorrect === undefined && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">未回答</span>}
                      {review && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">要復習</span>}
                    </div>
                    {historyArr.length > 0 && (
                      <p className="text-xs text-gray-400 mt-1">
                        回答履歴({historyArr.length}回)：{historyArr.slice(-5).map((h, i) => (
                          <span key={i} className={h.correct ? 'text-green-500' : 'text-red-500'}>
                            {h.correct ? '○' : '×'}
                          </span>
                        ))}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => toggleReview(q.id)}
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 transition ${review ? 'bg-yellow-400 border-yellow-400 text-white' : 'bg-white border-gray-300 text-gray-300'}`}
                  >
                    ★
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'result') {
    const correct = sessionResults.filter(r => r.correct).length;
    const total = sessionResults.length;
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-indigo-700 mb-2">結果</h2>
          <p className="text-5xl font-bold text-indigo-600 my-6">{correct} <span className="text-2xl text-gray-400">/ {total}</span></p>
          <p className="text-gray-500 mb-6">正解率：{Math.round(correct / total * 100)}%</p>
          <button
            onClick={goHome}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 transition"
          >
            <Home className="w-4 h-4" />
            スタート画面へ
          </button>
        </div>
      </div>
    );
  }

  if (!q) return null;

  const qState = quizState[q.id] || {};
  const isAnswered = selected !== null;

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <button onClick={goHome} className="text-indigo-500 hover:text-indigo-700">
            <Home className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-400">{currentIndex + 1} / {questionList.length}</span>
          <div className="flex-1 bg-gray-200 rounded-full h-2 ml-2">
            <div
              className="bg-indigo-500 h-2 rounded-full transition-all"
              style={{ width: `${((currentIndex + 1) / questionList.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full font-medium">{q.year}</span>
            {qState.review && <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded-full">要復習</span>}
          </div>
          <h2 className="text-base font-bold text-gray-800 mb-3">{q.title}</h2>
          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{q.question}</p>
        </div>

        {/* Choices */}
        <div className="space-y-2 mb-4">
          {q.choices?.map(choice => {
            const isSelected = selected === choice.label;
            const isCorrect = choice.label === q.answer;
            let cls = 'w-full text-left p-4 rounded-xl border-2 transition font-medium text-sm ';
            if (!isAnswered) {
              cls += 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50 text-gray-700';
            } else if (isCorrect) {
              cls += 'border-green-400 bg-green-50 text-green-800';
            } else if (isSelected && !isCorrect) {
              cls += 'border-red-400 bg-red-50 text-red-800';
            } else {
              cls += 'border-gray-200 bg-white text-gray-500 opacity-60';
            }
            return (
              <button key={choice.label} onClick={() => handleSelect(choice.label)} className={cls}>
                <span className="flex items-start gap-3">
                  <span className="font-bold text-base w-5 flex-shrink-0">{choice.label}</span>
                  <span className="flex-1">{choice.text}</span>
                  {isAnswered && isCorrect && <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />}
                  {isAnswered && isSelected && !isCorrect && <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />}
                </span>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {isAnswered && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
            {/* Correct/Incorrect banner */}
            <div className={`flex items-center gap-2 mb-4 p-3 rounded-xl ${selected === q.answer ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {selected === q.answer
                ? <><Check className="w-5 h-5" /><span className="font-bold">正解！</span></>
                : <><X className="w-5 h-5" /><span className="font-bold">不正解　正解：{q.answer}</span></>
              }
            </div>

            {/* Review toggle */}
            <label className="flex items-center gap-2 mb-4 cursor-pointer">
              <input
                type="checkbox"
                checked={qState.review || false}
                onChange={() => toggleReview(q.id)}
                className="w-4 h-4 accent-yellow-500"
              />
              <span className="text-sm text-gray-600 font-medium">要復習としてマーク</span>
            </label>

            {/* Answer details per choice */}
            <div className="space-y-3 mb-4">
              {q.answerDetails?.map(d => (
                <div key={d.label} className={`p-3 rounded-lg text-sm ${d.correct ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
                  <span className={`font-bold mr-2 ${d.correct ? 'text-green-700' : 'text-gray-600'}`}>
                    {d.label}　{d.correct ? '○' : '×'}：
                  </span>
                  <span className="text-gray-700">{d.detail}</span>
                </div>
              ))}
            </div>

            {/* Main explanation */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-xs font-bold text-blue-700 mb-2">解説</p>
              <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{q.explanation}</p>
            </div>

            {/* Next button */}
            <button
              onClick={nextQuestion}
              className="mt-5 w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 transition"
            >
              {currentIndex + 1 < questionList.length ? (
                <><ChevronRight className="w-4 h-4" />次の問題へ</>
              ) : (
                <>結果を見る</>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
