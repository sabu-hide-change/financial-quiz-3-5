// npm install lucide-react

import { useState, useEffect } from 'react';
import { Check, X, Home, ChevronRight, RotateCcw, BookOpen, List, Star } from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    year: '基礎',
    title: 'IEの全体像',
    question: 'IE（Industrial Engineering）に関する記述として、最も不適切なものはどれか。',
    choices: [
      'IEは、生産性を高めるための工学的な手法の体系である。',
      'IEは、製品だけでなく、システム全体を最適に設計・改善・運用する手法である。',
      'IEを大きく分けると、「方法研究」と「時間研究」から構成される。',
      'IEの「方法研究」は、さらに「工程分析」と「動作研究」に分けられる。',
    ],
    correctIndex: 2,
    explanation: {
      summary: 'IEの体系について問われています。IEは「作業測定」と「方法研究」から構成されます。「時間研究」は「作業測定」の構成要素です。',
      details: [
        { label: 'ア', correct: true, text: 'IEは、生産性を高めるための工学的な手法の体系で、日本語では経営工学や生産工学、管理工学などと呼ばれています。よって記述は適切です。' },
        { label: 'イ', correct: true, text: 'IEが対象にするのは、製品だけでなく、人や物、設備、情報などを含めたシステム全体です。よって記述は適切です。' },
        { label: 'ウ', correct: false, text: 'IEを大きく分けると、「作業測定」と「方法研究」から構成されます。（時間研究ではありません）「時間研究」は「作業測定」の構成要素となります。よって記述は不適切です。' },
        { label: 'エ', correct: true, text: '「方法研究」は、さらに「工程分析」と「動作研究」に分けられます。「工程分析」は、生産工程や運搬工程を分析する手法です。「動作研究」は、作業者の動作を細かく分析し、最適な作業方法を求めるための手法です。よって記述は適切です。' },
      ],
      keyPoint: 'IEの体系は混乱し易いので、しっかりと覚えましょう。IEは大きく「方法研究」と「作業測定」から構成され、「時間研究」は「作業測定」の一部です。',
    },
  },
  {
    id: 2,
    year: '基礎',
    title: '工程分析1',
    question: '次に示す作業者の動きを、作業者工程分析により、分析記号「○」、「◇」、「Ｄ」、「⇒」を用いて分析した。「○」記号の数として、最も適切なものはどれか。\n\n①部品倉庫に生産に必要な部品を取りに行く。\n②部品棚に保管してある部品梱包箱から、使用する部品を取り出す。\n③部品を持って現場に戻る。\n④部品Aと部品Bを接着材で固定する。\n⑤接着が乾くまで待つ。\n⑥部品Cの数か所にドリルで穴を開ける。\n⑦部品Aを部品Cにネジで固定する。\n⑧トルク試験機でネジの締付けトルクを確認する。\n⑨出荷が出来るように製品梱包箱に入れる。\n⑩発送場まで梱包箱を移動する。',
    choices: ['6個', '5個', '4個', '2個'],
    correctIndex: 1,
    explanation: {
      summary: '工程図記号を用いて各工程を分析します。○（加工）、◇（検査）、D（滞留）、⇒（運搬）に分類します。',
      table: {
        headers: ['工程', '内容', '記号', '種別'],
        rows: [
          ['①', '部品倉庫に部品を取りに行く', '⇒', '運搬'],
          ['②', '部品梱包箱から部品を取り出す', '○', '加工'],
          ['③', '部品を持って現場に戻る', '⇒', '運搬'],
          ['④', '部品Aと部品Bを接着材で固定する', '○', '加工'],
          ['⑤', '接着が乾くまで待つ', 'D', '滞留'],
          ['⑥', '部品Cの数か所にドリルで穴を開ける', '○', '加工'],
          ['⑦', '部品Aを部品Cにネジで固定する', '○', '加工'],
          ['⑧', 'トルク試験機でネジの締付けトルクを確認する', '◇', '品質検査'],
          ['⑨', '出荷できるように製品梱包箱に入れる', '○', '加工'],
          ['⑩', '発送場まで梱包箱を移動する', '⇒', '運搬'],
        ],
      },
      details: [
        { label: '正解', correct: true, text: '②と⑨が少し判断に迷う場合があります。②は実際の製品を組み立てるための部品ピックアップで付加価値を生む作業（加工）になります。⑨は製品梱包箱も製品の一部であり、複数の部品を組立てる作業（加工）と同一視できます。よって「○」記号は5個となります。' },
      ],
      keyPoint: '工程図記号：○（加工）、◇（検査）、D（滞留・停滞）、⇒（運搬）。付加価値を生む作業が「加工（○）」です。',
    },
  },
  {
    id: 3,
    year: '基礎',
    title: '工程分析2',
    question: '工程分析に関する記述として、最も適切なものはどれか。',
    choices: [
      '製品工程分析では、工場などのレイアウト図の上に、工程図記号を記入することで、工程の流れを表す。',
      '流れ線図は、製品が加工される流れを、運搬、検査、停滞を含めて表し、問題点を明らかにする。',
      'フロムツーチャートは、工程間の物の流れを分析する手法で、各工程間でどれぐらいの物が滞留しているかを分析する。',
      '作業者工程分析は、作業者の作業を中心に分析するもので、作業手順や作業の無駄を改善する際に利用される。',
    ],
    correctIndex: 3,
    explanation: {
      summary: '工程分析の各手法の内容が問われています。',
      table: {
        headers: ['手法', '概要', '適用場面'],
        rows: [
          ['単純工程分析', '加工と検査のみを表す（運搬・貯蔵・滞留は記入しない）', '工場レイアウト設計や詳細分析前の基礎資料'],
          ['製品工程分析', '製品が加工される流れを運搬・検査・停滞を含めて表す', '製品の工程改善・滞留工程の削減'],
          ['流れ線図', '工場のレイアウト図の上に工程図記号を記入', 'レイアウト設計・工程の流れの改善'],
          ['作業者工程分析', '作業者の作業を中心に分析', '作業手順や作業の無駄の改善'],
          ['フロムツーチャート', '各工程間でどれぐらいの物量が流れているかを分析', '多種少量生産の工程分析・工場レイアウト設計'],
        ],
      },
      details: [
        { label: 'ア', correct: false, text: '選択肢の記述は、流れ線図に関するものです。製品工程分析とは、製品が加工される流れを、運搬、検査、停滞を含めて表し、問題点を明らかにする分析手法です。よって記述は不適切です。' },
        { label: 'イ', correct: false, text: '選択肢の記述は、製品工程分析に関するものです。流れ線図は、工場などのレイアウト図の上に、工程図記号を記入したものです。よって記述は不適切です。' },
        { label: 'ウ', correct: false, text: 'フロムツーチャートでは、各工程間でどれぐらいの物量が流れているかを分析します。滞留の分析ではありません。よって記述は不適切です。' },
        { label: 'エ', correct: true, text: '作業者工程分析とは、選択肢の記述の通りです。作業者の作業を中心とした工程を全てリストアップし、それぞれの作業を「加工」「移動」「手待ち」「検査」に分類して分析することで、作業手順や作業の無駄の改善を行います。よって記述は適切です。' },
      ],
      keyPoint: '各手法の特徴を正確に覚えましょう。特に製品工程分析と流れ線図の違い（流れ線図はレイアウト図上に記入）を混同しないこと。',
    },
  },
  {
    id: 4,
    year: '基礎',
    title: '工程分析3',
    question: 'ある食品加工の工場において、生産管理の分析手法を用いて問題点を解決する場合の取組みとして、最も不適切なものはどれか。',
    choices: [
      '現在の状況を大まかに把握するため、まず単純工程分析を行った。',
      '滞留時間が長い、工程Aと工程Bの間の作業のラインバランスを見直した。',
      'レイアウトの見直しを行うため、作業者工程分析を行った。',
      '製品工程分析で明らかになった問題を改善するため、ECRSを活用した。',
    ],
    correctIndex: 2,
    explanation: {
      summary: '工程分析の各手法の適用場面と、明らかになった問題点を解決するための方法が問われています。',
      details: [
        { label: 'ア', correct: true, text: '単純工程分析では、運搬や貯蔵、滞留は記入せず、加工と検査のみを表します。このため、原材料からの加工プロセスの全体の流れをつかみやすく、工場レイアウト設計や、詳細な工程分析を行う前の基礎資料として利用されます。よって記述は適切です。' },
        { label: 'イ', correct: true, text: '工程分析により、滞留時間が長い工程が明らかになった場合は、ラインバランスを見直し、段取り替えの改善をすることで、滞留時間を減らす取組みをします。よって記述は適切です。' },
        { label: 'ウ', correct: false, text: '作業者工程分析は、作業者の作業を中心に分析するものです。レイアウトの見直しを行う場合は、流れ線図を用いた流れ分析や、フロムツーチャートを用いた分析を行うのが一般的です。よって記述は不適切です。' },
        { label: 'エ', correct: true, text: '製品工程分析で明らかになった問題を改善するためは、ECRSの原則（E：やめる、捨てる / C：一緒にする / R：置き換える、順番を変える / S：単純化する）を用いて改善方法を考えることで、多くのヒントが得られます。よって記述は適切です。' },
      ],
      keyPoint: 'レイアウトの見直しには「流れ線図」や「フロムツーチャート」を使用します。「作業者工程分析」は作業手順や作業の無駄の改善に使用します。',
    },
  },
  {
    id: 5,
    year: '基礎',
    title: '工程分析4',
    question: '下図は、ある製品の製品工程分析の結果である。この図から読み取ることができる記述として、最も適切なものはどれか。\n\n【工程図の内容】\n運搬（⇒）→ 運搬（⇒）→ 加工（○）→ 運搬（⇒）→ 品質検査（◇）→ 運搬（⇒）→ 滞留（D）',
    choices: [
      '加工を行う工程が4ヶ所ある。',
      '品質検査を行う工程が１ヶ所ある。',
      'ベルトコンベアーを活用して運搬している。',
      '物が滞留している箇所はない。',
    ],
    correctIndex: 1,
    explanation: {
      summary: '工程図記号についての知識が問われています。',
      table: {
        headers: ['工程図記号', '名称', '説明'],
        rows: [
          ['○', '加工', '原材料や部品に対して変化を加える工程'],
          ['◇', '検査（品質検査）', '品質を確認する工程'],
          ['□', '数量検査', '数量を確認する工程'],
          ['⇒', '運搬', '物を移動させる工程'],
          ['D', '滞留', '計画外で物が停まっている状態'],
          ['▽', '貯蔵', '計画的に物を保管している状態'],
        ],
      },
      details: [
        { label: 'ア', correct: false, text: '加工工程は１ヶ所です。４ヶ所あるのは運搬工程です。' },
        { label: 'イ', correct: true, text: '品質検査を行う工程は１ヶ所です。' },
        { label: 'ウ', correct: false, text: '工程図記号は工程を示しており、どのような運搬方法であるかを読み取ることはできません。' },
        { label: 'エ', correct: false, text: '滞留している工程は１ヶ所あります。' },
      ],
      keyPoint: '工程図記号から読み取れることと読み取れないことを区別しましょう。運搬方法（ベルトコンベアーかどうか等）は工程図記号からは読み取れません。',
    },
  },
  {
    id: 6,
    year: '基礎',
    title: 'フロムツーチャート',
    question: '下図はAからEまで5つの工程におけるフロムツーチャートを表している。このフロムツーチャートから読み取れる記述として、最も適切なものはどれか。\n\n【フロムツーチャート】\n（Fromは前工程、Toは後工程を示す）\n\n縦(From)→横(To)：A,B,C,D,E\nA行：-,10,5,3,2\nB行：-,-,8,-,4\nC行：-,6,-,-,7\nD行：-,-,-,-,9\nE行：-,-,-,-,-\n\n※C→Bに6の物量が流れている（逆流）',
    choices: [
      'A→B→C→D→Eの順番に物が流れている。',
      'Bの工程では仕掛品が滞留している。',
      'Cの工程は検査工程であることがわかる。',
      '逆流している工程がある。',
    ],
    correctIndex: 3,
    explanation: {
      summary: 'フロムツーチャートは、工程間の物の流れを分析する手法で、各工程間でどれぐらいの物量が流れているかを分析します。',
      table: {
        headers: ['From＼To', 'A', 'B', 'C', 'D', 'E'],
        rows: [
          ['A', '-', '10', '5', '3', '2'],
          ['B', '-', '-', '8', '-', '4'],
          ['C', '-', '6', '-', '-', '7'],
          ['D', '-', '-', '-', '-', '9'],
          ['E', '-', '-', '-', '-', '-'],
        ],
      },
      details: [
        { label: 'ア', correct: false, text: 'Aから全ての工程に物が流れていますが、A→B→C→D→Eの順番には流れていません（工程Cから工程Dへ物の流れがありません）。よって不適切な記述です。' },
        { label: 'イ', correct: false, text: 'フロムツーチャートでは、仕掛品の滞留は読み取れません。よって不適切な記述です。' },
        { label: 'ウ', correct: false, text: 'フロムツーチャートでは、工程の種類は読み取れません。よって不適切な記述です。' },
        { label: 'エ', correct: true, text: '逆流とは、後工程から前工程の物の流れを指します。フロムツーチャートを確認すると、工程Cから工程Bへ逆流が発生しています（C行のB列に「6」がある）。よって適切な記述です。' },
      ],
      keyPoint: 'フロムツーチャートでは「逆流」の有無を確認できます。対角線より下側（後工程から前工程への流れ）が逆流です。仕掛品の滞留や工程の種類は読み取れません。',
    },
  },
  {
    id: 7,
    year: '基礎',
    title: '運搬分析',
    question: '運搬分析に関する記述として、最も不適切なものはどれか。',
    choices: [
      'マテリアルハンドリングとは、原材料、仕掛品、完成品などの、運搬や取扱いに関することである。',
      '台記号における平（ひら）は、物が床や台の上にひら置きされている状態で、活性示数は1である。',
      '加工する材料を資材倉庫に取りに行く作業は、空運搬に該当する。',
      '配置式運搬工程分析は、レイアウト図の上に運搬工程記号を記入して、運搬の流れを分析する手法である。',
    ],
    correctIndex: 1,
    explanation: {
      summary: '運搬分析の内容が問われています。活性示数の「平（ひら）」は0（ゼロ）です。',
      table: {
        headers: ['状態', '説明', '活性示数'],
        rows: [
          ['平（ひら）', '床や地面にバラ置き、平置きされている状態', '0'],
          ['箱', '箱や容器などに入れられている状態', '1'],
          ['台', 'パレットや台車に載っている状態', '2'],
          ['車', '運搬機器（フォークリフト等）で運ばれている状態', '3'],
          ['動', 'コンベアなどで移動中の状態', '4'],
        ],
      },
      details: [
        { label: 'ア', correct: true, text: '生産拠点内や物流拠点内における、物の運搬や取り扱いのことを、マテリアルハンドリング（略してマテハン）と呼びます。よって記述は適切です。' },
        { label: 'イ', correct: false, text: '平の状態における記述は正しいです。しかし、活性示数は最も低い0になります。運搬活性分析では、運搬のしやすさを表す数値として0～4の活性示数を使用します。よって記述は不適切です。' },
        { label: 'ウ', correct: true, text: '空運搬とは、物の移動を伴わずに、人や運搬機器のみが移動することです。選択肢の記述にあるような、何も付加価値を生まない人の移動は空運搬に該当します。よって記述は適切です。' },
        { label: 'エ', correct: true, text: '配置式運搬工程分析では、流れ線図のように、レイアウト図の上に運搬工程記号を記入することで、レイアウトや運搬距離などの問題点を視覚的にわかりやすくします。よって記述は適切です。' },
      ],
      keyPoint: '活性示数は「平（ひら）」が最も低く0です。「箱→1、台→2、車→3、動→4」と覚えましょう。活性示数が高いほど運搬しやすい状態です。',
    },
  },
  {
    id: 8,
    year: '基礎',
    title: '運搬活性分析',
    question: '次に示す工程の平均活性示数の値として、最も適切なものはどれか。\n\n①鉄の棒材が床に平置き。\n②搬送用の箱に鉄の棒材を入れる。\n③パレットに搬送用の箱を乗せる。\n④フォークリフトでパレットを運ぶ。\n⑤トラックにパレットを積み、加工工場に運ぶ。\n⑥フォークリフトでパレットを降ろす。\n⑦パレットを所定場所に置く。',
    choices: ['2.4', '3.5', '4.4', '5.5'],
    correctIndex: 0,
    explanation: {
      summary: '平均活性示数 ＝ 活性示数の合計 ÷ 工程数で求めます。',
      table: {
        headers: ['工程', '内容', '活性示数', '理由'],
        rows: [
          ['①', '床に平置き', '0', '平（ひら）の状態'],
          ['②', '箱に入れる', '1', '箱の状態'],
          ['③', 'パレットに乗せる', '2', '台（パレット）の状態'],
          ['④', 'フォークリフトで運ぶ', '4', '既に動いている状態（最高値）'],
          ['⑤', 'トラックで運ぶ', '4', '既に動いている状態（最高値）'],
          ['⑥', 'フォークリフトで降ろす', '4', '既に動いている状態（最高値）'],
          ['⑦', 'パレットを所定場所に置く', '2', '台（パレット）の状態'],
        ],
      },
      details: [
        { label: '計算', correct: true, text: '活性示数の合計：0+1+2+4+4+4+2=17、工程数：7、平均活性示数：17÷7≒2.4。④～⑥は既に動いている状態（フォークリフト・トラックで移動中）なので最も活性度が高い4となります。よって正解はアとなります。' },
      ],
      keyPoint: '「既に動いている状態」は活性示数4です。フォークリフト・トラックなどで移動中は最高値の4になります。平均活性示数＝合計÷工程数で計算します。',
    },
  },
  {
    id: 9,
    year: '基礎',
    title: 'マテリアルハンドリング',
    question: 'マテリアルハンドリングに関する記述として、最も不適切なものはどれか。',
    choices: [
      '平均活性示数は、停滞工程の活性示数の合計を停滞工程数で除した値として求められる。',
      'マテリアルハンドリングによって、運搬の自動化や効率化が図れるようになる。',
      '運搬管理の改善には、レイアウトの改善、運搬方法の改善、運搬制度の改善がある。',
      '運搬活性示数は、置かれている物品を運び出すために必要となる取り扱いの手間の数を示している。',
    ],
    correctIndex: 3,
    explanation: {
      summary: 'マテリアルハンドリングについて問われています。運搬活性示数は「既に省かれている手間の数」を表します。',
      details: [
        { label: 'ア', correct: true, text: '平均活性示数は、停滞工程の活性示数の合計を停滞工程数で割った値として求めることができます。値が小さいほど物の置き方が非効率であり、移動のために多くの手間を要することになります。よって記述は適切です。' },
        { label: 'イ', correct: true, text: 'マテリアルハンドリングによって、運搬の自動化や効率化が図れるようになります。よって記述は適切です。' },
        { label: 'ウ', correct: true, text: '運搬管理を改善するには、非効率な部分をなくすことが必要になります。具体的には、レイアウトの変更、運搬方法の改善、運搬制度の改善があります。よって記述は適切です。' },
        { label: 'エ', correct: false, text: '運搬活性示数は、物を移動するときに「すでに省かれている手間の数」を表し、０から４の間の数値を取ります。「必要となる取り扱いの手間の数」ではなく「既に省かれている手間の数」です。活性示数が大きいほど効率的に運搬している状態となります。よって記述は不適切です。' },
      ],
      keyPoint: '運搬活性示数は「すでに省かれている手間の数」を表します。値が大きいほど効率的（運搬しやすい）状態です。「必要な手間の数」と混同しないこと。',
    },
  },
  {
    id: 10,
    year: '基礎',
    title: '動作研究',
    question: '動作研究に関する記述として、最も適切なものはどれか。',
    choices: [
      'マイクロモーション分析により、通常より遅いスピードで撮影すると気がつかない無駄な動きを発見できる。',
      '連合作業分析により、作業者の多工程持ちや、適正な配置人員を検討できる。',
      'メモモーション分析は、通常よりも早いスピードで撮影することで、細かい動作が分析できる。',
      'サーブリッグ分析の第1類に分類される作業は、必要のない動作である。',
    ],
    correctIndex: 1,
    explanation: {
      summary: '動作研究のいくつかの分析手法の内容が問われています。',
      table: {
        headers: ['手法', '撮影速度', '再生速度', '目的'],
        rows: [
          ['メモモーション分析', '遅い（低速）', '高速再生', '無駄な動きを発見'],
          ['マイクロモーション分析', '速い（高速）', 'スロー再生', '細かい動作を分析'],
          ['VTR分析', '通常', 'スロー/コマ送り', '動作を詳細分析'],
        ],
      },
      details: [
        { label: 'ア', correct: false, text: '選択肢の記述は、メモモーション分析に関する内容です。マイクロモーション分析では、通常よりも早いスピードで撮影し、ゆっくり再生します。よって記述は不適切です。' },
        { label: 'イ', correct: true, text: '連合作業分析により、作業者の手待ちや、機械の稼働状況などを把握することで、作業者の多工程持ちや、配置人員の削減を検討することができます。よって記述は適切です。' },
        { label: 'ウ', correct: false, text: '選択肢の記述は、マイクロモーション分析に関する内容です。メモモーション分析では、通常よりも遅いスピードで撮影し、高速に再生します。よって記述は不適切です。' },
        { label: 'エ', correct: false, text: 'サーブリッグ分析で、「必要のない動作」に分類されるのは、第3類です。第1類は、「作業の基本となる動作」です。よって記述は不適切です。' },
      ],
      keyPoint: 'メモモーション（遅く撮影→高速再生→無駄発見）とマイクロモーション（速く撮影→スロー再生→細かい動作分析）を混同しないこと。',
    },
  },
  {
    id: 11,
    year: '基礎',
    title: '動作経済の原則',
    question: '次の作業改善を、動作経済の原則に照らした場合、最も不適切なものはどれか。',
    choices: [
      '作業台の上に置いて使用していた電動ドライバを、伸縮ロープに付けて天井から吊るすようにした。',
      '手が疲れないよう、両手を同時に使う作業を極力減らすように組み立て手順を検討した。',
      '使用する工具の形状にくり抜いたマットを用意して、マット上に使う工具を順番に並べた。',
      '横にいる次工程の作業者に加工品を手渡す際に、真横ではなく、少し前に置くように作業指導した。',
    ],
    correctIndex: 1,
    explanation: {
      summary: '動作経済の原則は、疲労を少なくして、できるだけ少ないエネルギーで楽に作業をするための原則です。',
      table: {
        headers: ['原則の分類', '内容'],
        rows: [
          ['身体の動作に関する原則', '両手を同時かつ左右対称的に動かすこと'],
          ['身体の動作に関する原則', '動作の数を減らし、動作距離を短くすること'],
          ['作業場の配置に関する原則', '材料や工具は作業順序に合わせて置くこと'],
          ['作業場の配置に関する原則', '物は手の届く範囲で体の前方に配置すること'],
          ['工具・設備に関する原則', '手で保持する代わりに工具などで保持すること'],
        ],
      },
      details: [
        { label: 'ア', correct: true, text: '工具や設備に関する原則に「手で保持する代わりに工具などで保持すること」があります。天井からドライバを吊るすことで、持ち上げ動作を排除できます。よって記述は適切です。' },
        { label: 'イ', correct: false, text: '身体の動作に関する原則に、「両手を同時かつ左右対称的に動かすこと」があります。両手を同時に動かすことで生産性を高める狙いがあります。「両手を同時に使う作業を極力減らす」は原則に反します。よって記述は不適切です。' },
        { label: 'ウ', correct: true, text: '作業場の配置に関する原則に「材料や工具は作業順序に合わせて置くこと」があります。工具を順番に並べることで、探す手間を省くことができます。よって記述は適切です。' },
        { label: 'エ', correct: true, text: '作業場の配置の原則に、「物は手の届く範囲で体の前方に配置すること」があります。前方に置くことで動作が自然になります。よって記述は適切です。' },
      ],
      keyPoint: '動作経済の原則では「両手を同時かつ左右対称的に動かすこと」が推奨されます。両手を同時に使う作業を減らすのは原則に反します。',
    },
  },
  {
    id: 12,
    year: '基礎',
    title: '稼働分析',
    question: '稼働分析の手法に関する記述として、最も不適切なものはどれか。',
    choices: [
      '連続観測法は、ワークサンプリングと比較して測定に手間がかかる。',
      '稼働率は、「実際の稼働時間」を、「実際の稼働時間と非稼働時間の合計」で除して求めることができる。',
      'ワークサンプリングは、隠れて観測することで、作業者は観測されることを意識せず、偏りのないデータが取れる。',
      '連続観測法は、非繰返しの作業の観測に適している。',
    ],
    correctIndex: 2,
    explanation: {
      summary: '稼働分析の内容が問われています。ワークサンプリングは「隠れて観測する」わけではありません。',
      table: {
        headers: ['手法', '観測方法', 'メリット', 'デメリット'],
        rows: [
          ['ワークサンプリング', '瞬間的に時々観測', '少ない労力・1人で多くの対象を観測可能', '深い分析には不向き'],
          ['連続観測法', '観測対象に付きっ切り', '非繰返し作業の観測に適している', '測定に手間がかかる'],
        ],
      },
      details: [
        { label: 'ア', correct: true, text: 'ワークサンプリングが作業を瞬間的に観測するのに対して、連続観測法は観測対象に付きっ切りで観測するため、測定に手間がかかります。よって記述は適切です。' },
        { label: 'イ', correct: true, text: '稼働率は、「稼働率 ＝ 実際稼働時間 ÷ 総時間」で求めることができます。ここで総時間は、「実際の稼働時間＋非稼働時間」となります。よって記述は適切です。' },
        { label: 'ウ', correct: false, text: 'ワークサンプリングは隠れて観測するわけではありません。作業を瞬間的に時々観測して、稼働状況を統計的に求めます。瞬間的な観測であるため、作業者が観測されることを意識しにくいというメリットがあります。よって記述は不適切です。' },
        { label: 'エ', correct: true, text: '連続観測法は観測対象に付きっ切りで観測するため、非繰返しの作業がある場合の観測に適しています。よって記述は適切です。' },
      ],
      keyPoint: 'ワークサンプリングは「隠れて」観測するのではなく、「瞬間的」に観測するため、作業者が意識しにくいというメリットがあります。',
    },
  },
  {
    id: 13,
    year: '基礎',
    title: 'ワークサンプリング',
    question: 'ワークサンプリングに関する記述として、最も不適切なものはどれか。',
    choices: [
      'ワークサンプリングは、瞬間的な観測のため深い分析に不向きである。',
      'ワークサンプリングのメリットには、少ない労力で観測できる点が挙げられる。',
      'ワークサンプリングでは、1人の観測者が多くの観測対象を観測することが難しい。',
      'ワークサンプリングは、連続観測法のように、観測対象に付きっきりになる必要がない。',
    ],
    correctIndex: 2,
    explanation: {
      summary: 'ワークサンプリングのメリット・デメリット、連続観測法と比較した時の特徴が問われています。',
      table: {
        headers: ['項目', '内容'],
        rows: [
          ['メリット①', '少ない労力で観測できる'],
          ['メリット②', '1人の観測者で多くの観測対象の観測ができる'],
          ['メリット③', '作業者が観測されることを意識しないため、偏りが少ないデータが取れる'],
          ['デメリット①', '瞬間的な観測のため深い分析には不向きである'],
          ['デメリット②', 'サンプル数が少ない場合に誤差が大きくなる'],
        ],
      },
      details: [
        { label: 'ア', correct: true, text: 'ワークサンプリングは、瞬間的な観測のため深い分析には向いていません。よって記述は適切です。' },
        { label: 'イ', correct: true, text: 'ワークサンプリングは、時々観測を行うため、少ない労力で観測することができます。よって記述は適切です。' },
        { label: 'ウ', correct: false, text: 'ワークサンプリングでは、1人の観測者で多くの観測対象を観測することができます。よって記述は不適切です。' },
        { label: 'エ', correct: true, text: 'ワークサンプリングは、連続観測法のように、観測対象に付きっきりになる必要がありません。よって記述は適切です。' },
      ],
      keyPoint: 'ワークサンプリングのメリットは「少ない労力」「1人で多くの対象を観測可能」「偏りの少ないデータ」です。「1人では多くの対象を観測できない」は誤りです。',
    },
  },
  {
    id: 14,
    year: '基礎',
    title: '時間研究',
    question: '標準時間に関する記述として、最も適切なものはどれか。',
    choices: [
      '余裕時間のうち、機械を調整し、打合せをするなどの余裕は、人的余裕に含まれる。',
      '標準時間は、正味時間と余裕時間の和で求められ、外掛け法で算出された余裕率を使う場合は、「標準時間 ＝ 正味時間 × （1＋余裕率）」によって計算される。',
      '標準時間は、「その仕事に習熟した作業者が」、「適切な所定の作業条件のもとで」、「必要な余裕を持ち」、作業するのに必要となる時間である。',
      '作業時間を観測した作業者のペースが、基準より速い場合は、レイティング係数の値は100%よりも小さくなる。',
    ],
    correctIndex: 1,
    explanation: {
      summary: '時間研究の内容が問われています。標準時間の定義と計算方法を正確に理解しましょう。',
      table: {
        headers: ['計算方法', '公式', '余裕率の意味'],
        rows: [
          ['外掛け法', '標準時間 ＝ 正味時間 × （1＋余裕率）', '正味時間に対する余裕時間の割合'],
          ['内掛け法', '標準時間 ＝ 正味時間 ÷ （1－余裕率）', '標準時間に対する余裕時間の割合'],
        ],
      },
      details: [
        { label: 'ア', correct: false, text: '人的余裕に含まれるのは、休憩やトイレに行くなど人間的な要素で必要な余裕です。選択肢の記述にあるような、作業の管理に必要な余裕は、管理余裕になります。よって記述は不適切です。' },
        { label: 'イ', correct: true, text: '外掛け法による余裕率は、正味時間に対する余裕時間の割合です。「余裕時間 ＝ 正味時間 × 余裕率」となり、「標準時間 ＝ 正味時間 ＋余裕時間」に代入すると、「標準時間 ＝ 正味時間 ×（1＋余裕率）」となります。よって記述は適切です。' },
        { label: 'ウ', correct: false, text: '標準時間を設定する際は、選択肢の記述に対して「正常な無理のない作業ペースで作業する」を加えた、4つの条件が必要になります。よって記述は不適切です。' },
        { label: 'エ', correct: false, text: 'レイティング係数は、基準とする作業ペースを100%とした場合の、作業者の作業ペースです。基準値より作業者のペースが速い場合は、レイティングは100%より大きくなります。よって記述は不適切です。' },
      ],
      keyPoint: '標準時間の4条件：①習熟した作業者、②適切な所定の作業条件、③必要な余裕を持つ、④正常な無理のない作業ペース。外掛け法：標準時間＝正味時間×（1＋余裕率）。',
    },
  },
  {
    id: 15,
    year: '基礎',
    title: '標準時間の設定法',
    question: '標準時間を設定する手法に関する記述として、最も不適切なものはどれか。',
    choices: [
      'ストップウォッチ法を用いて標準時間を設定する際は、レイティング操作を行う必要がある。',
      '標準時間資料法は、作業時間のデータを分類・整理した図表などを用いて標準時間を設定する方法である。',
      '実績資料法では、過去のデータを基礎として標準時間を設定する方法で、個別生産でよく利用される。',
      'PTS法は、繰返しの少ない作業の標準時間の設定に適しており、標準時間の設定も容易にできる。',
    ],
    correctIndex: 3,
    explanation: {
      summary: '標準時間の設定法について問われています。PTS法は繰り返しの多い作業に適しており、設定は手間がかかります。',
      table: {
        headers: ['設定法', '概要', 'レイティング', '特徴'],
        rows: [
          ['ストップウォッチ法', '作業要素ごとにストップウォッチで計測', '必要', '唯一の直接計測法'],
          ['実績資料法', '過去の実績から標準時間を見積る', '不要', '精度低、個別生産に多用'],
          ['標準時間資料法', 'あらかじめ用意した作業要素別の標準時間を合計', '不要', '毎回観測不要、事前準備が必要'],
          ['PTS法', '動作を微動作に分解し、微動作ごとの標準時間を合計', '不要', '繰返し多い作業に適する、手間がかかる'],
        ],
      },
      details: [
        { label: 'ア', correct: true, text: 'ストップウォッチ法では、作業の要素ごとにストップウォッチで計測した値にレイティングして正味時間を求め、余裕時間を付加して標準時間を設定します。よって記述は適切です。' },
        { label: 'イ', correct: true, text: '標準時間資料法は、直接時間を観測せずに、あらかじめ用意しておいたデータや作業要素別の標準時間を用いて、標準時間を合成する方法です。よって記述は適切です。' },
        { label: 'ウ', correct: true, text: '実績資料法は、過去の実績から標準時間を見積もる方法で、個別生産でよく利用されます。よって記述は適切です。' },
        { label: 'エ', correct: false, text: 'PTS法は、動作を微動作（サーブリッグ）のレベルに分解し、あらかじめ定められた微動作ごとの標準時間を合計する方法です。繰返しの多い作業の標準時間の設定に適しており、作業を微動作レベルまで分析する必要があるため、手間がかかります。よって記述は不適切です。' },
      ],
      keyPoint: 'レイティングが必要なのは「ストップウォッチ法」のみです（直接時間を計測するため）。PTS法は「繰返しの多い作業」に適しており、設定に「手間がかかる」のが特徴です。',
    },
  },
  {
    id: 16,
    year: '計算',
    title: '余裕率',
    question: 'ある製造工程における作業時間のデータが以下の通り与えられている。この作業に対する余裕率の値として、最も適切なものはどれか。\n\n正味時間：16分\n余裕時間：4分\n標準時間：20分',
    choices: [
      '内掛け法の余裕率：25％',
      '内掛け法の余裕率：80％',
      '外掛け法の余裕率：20％',
      '外掛け法の余裕率：25％',
      '外掛け法の余裕率：80％',
    ],
    correctIndex: 3,
    explanation: {
      summary: '余裕率を求める計算問題です。内掛け法と外掛け法を正確に区別して計算します。',
      table: {
        headers: ['計算方法', '公式', '計算', '結果'],
        rows: [
          ['内掛け法', '余裕時間 ÷ 標準時間', '4分 ÷ 20分', '20％'],
          ['外掛け法', '余裕時間 ÷ 正味時間', '4分 ÷ 16分', '25％'],
        ],
      },
      details: [
        { label: '計算', correct: true, text: '内掛け法の余裕率：余裕時間÷標準時間＝4分÷20分＝20％。外掛け法の余裕率：余裕時間÷正味時間＝4分÷16分＝25％。したがって、選択肢エ（外掛け法の余裕率：25％）が正解です。' },
      ],
      keyPoint: '内掛け法＝余裕時間÷標準時間（分母が大きい→値が小さい）。外掛け法＝余裕時間÷正味時間（分母が小さい→値が大きい）。同じデータで内掛け＜外掛けになります。',
    },
  },
];

const STORAGE_KEY = 'ie_quiz_data';

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { history: {}, review: {} };
    return JSON.parse(raw);
  } catch (e) {
    console.log('[loadData] error:', e);
    return { history: {}, review: {} };
  }
}

function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    console.log('[saveData] saved:', data);
  } catch (e) {
    console.log('[saveData] error:', e);
  }
}

const LABEL_MAP = ['ア', 'イ', 'ウ', 'エ', 'オ'];

export default function App() {
  const [screen, setScreen] = useState('start');
  const [mode, setMode] = useState('all');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [data, setData] = useState(loadData);

  useEffect(() => {
    console.log('[App] screen:', screen, 'mode:', mode);
  }, [screen, mode]);

  function startQuiz(selectedMode) {
    console.log('[startQuiz] mode:', selectedMode);
    const currentData = loadData();
    let qs = [...QUESTIONS];
    if (selectedMode === 'wrong') {
      qs = QUESTIONS.filter(q => currentData.history?.[q.id] === false);
    } else if (selectedMode === 'review') {
      qs = QUESTIONS.filter(q => currentData.review?.[q.id] === true);
    }
    if (qs.length === 0) {
      alert(selectedMode === 'wrong' ? '前回不正解の問題はありません。' : '要復習の問題はありません。');
      return;
    }
    setMode(selectedMode);
    setQuestions(qs);
    setCurrentIndex(0);
    setSelected(null);
    setData(currentData);
    setScreen('quiz');
  }

  function handleSelect(idx) {
    if (selected !== null) return;
    setSelected(idx);
    const q = questions[currentIndex];
    const correct = idx === q.correctIndex;
    console.log('[handleSelect] q:', q.id, 'selected:', idx, 'correct:', correct);
    const newData = loadData();
    if (!newData.history) newData.history = {};
    if (!newData.review) newData.review = {};
    newData.history[q.id] = correct;
    saveData(newData);
    setData({ ...newData });
  }

  function toggleReview(qId) {
    const newData = loadData();
    if (!newData.review) newData.review = {};
    newData.review[qId] = !newData.review[qId];
    console.log('[toggleReview] qId:', qId, 'review:', newData.review[qId]);
    saveData(newData);
    setData({ ...newData });
  }

  function nextQuestion() {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(i => i + 1);
      setSelected(null);
    } else {
      setScreen('result');
    }
  }

  const q = questions[currentIndex];

  if (screen === 'start') {
    const d = loadData();
    const wrongCount = QUESTIONS.filter(q => d.history?.[q.id] === false).length;
    const reviewCount = QUESTIONS.filter(q => d.review?.[q.id] === true).length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <BookOpen className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">IE スマート問題集</h1>
            <p className="text-gray-500 text-sm mt-1">3-5 IE（Industrial Engineering）</p>
            <p className="text-indigo-600 font-semibold mt-2">全{QUESTIONS.length}問</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => startQuiz('all')}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-between"
            >
              <span>すべての問題</span>
              <div className="flex items-center gap-2">
                <span className="bg-indigo-500 text-xs px-2 py-1 rounded-full">{QUESTIONS.length}問</span>
                <ChevronRight className="w-5 h-5" />
              </div>
            </button>

            <button
              onClick={() => startQuiz('wrong')}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-between"
            >
              <span>前回不正解の問題のみ</span>
              <div className="flex items-center gap-2">
                <span className="bg-red-400 text-xs px-2 py-1 rounded-full">{wrongCount}問</span>
                <ChevronRight className="w-5 h-5" />
              </div>
            </button>

            <button
              onClick={() => startQuiz('review')}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-between"
            >
              <span>要復習の問題のみ</span>
              <div className="flex items-center gap-2">
                <span className="bg-yellow-400 text-xs px-2 py-1 rounded-full">{reviewCount}問</span>
                <ChevronRight className="w-5 h-5" />
              </div>
            </button>

            <button
              onClick={() => setScreen('history')}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-between"
            >
              <span>履歴・一覧</span>
              <div className="flex items-center gap-2">
                <List className="w-5 h-5 text-gray-500" />
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'history') {
    const d = loadData();
    const answered = QUESTIONS.filter(q => d.history?.[q.id] !== undefined).length;
    const correct = QUESTIONS.filter(q => d.history?.[q.id] === true).length;

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setScreen('start')} className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
              <Home className="w-5 h-5 text-gray-600" />
            </button>
            <h2 className="text-xl font-bold text-gray-800">履歴・一覧</h2>
          </div>

          {answered > 0 && (
            <div className="bg-white rounded-xl shadow p-4 mb-4 flex gap-4 text-center">
              <div className="flex-1">
                <p className="text-2xl font-bold text-indigo-600">{answered}</p>
                <p className="text-xs text-gray-500">回答済み</p>
              </div>
              <div className="flex-1">
                <p className="text-2xl font-bold text-green-600">{correct}</p>
                <p className="text-xs text-gray-500">正解</p>
              </div>
              <div className="flex-1">
                <p className="text-2xl font-bold text-red-500">{answered - correct}</p>
                <p className="text-xs text-gray-500">不正解</p>
              </div>
              <div className="flex-1">
                <p className="text-2xl font-bold text-yellow-500">{QUESTIONS.filter(q => d.review?.[q.id]).length}</p>
                <p className="text-xs text-gray-500">要復習</p>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {QUESTIONS.map(q => {
              const h = d.history?.[q.id];
              const rev = d.review?.[q.id];
              return (
                <div key={q.id} className="bg-white rounded-xl shadow p-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-sm flex-shrink-0">
                    {q.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{q.title}</p>
                    <p className="text-xs text-gray-400">{q.year}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {rev && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                    {h === undefined && <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">未回答</span>}
                    {h === true && (
                      <span className="flex items-center gap-1 text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                        <Check className="w-3 h-3" /> 正解
                      </span>
                    )}
                    {h === false && (
                      <span className="flex items-center gap-1 text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full">
                        <X className="w-3 h-3" /> 不正解
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => {
              if (window.confirm('全ての履歴をリセットしますか？')) {
                saveData({ history: {}, review: {} });
                setData({ history: {}, review: {} });
              }
            }}
            className="mt-6 w-full flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>履歴をリセット</span>
          </button>
        </div>
      </div>
    );
  }

  if (screen === 'result') {
    const d = loadData();
    const correct = questions.filter(q => d.history?.[q.id] === true).length;
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="text-6xl mb-4">{correct === questions.length ? '🎉' : correct >= questions.length / 2 ? '👍' : '💪'}</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">完了！</h2>
          <p className="text-gray-500 mb-6">
            {questions.length}問中 <span className="text-indigo-600 font-bold text-xl">{correct}</span> 問正解
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
            <div
              className="bg-indigo-500 h-3 rounded-full transition-all"
              style={{ width: `${(correct / questions.length) * 100}%` }}
            />
          </div>
          <div className="space-y-3">
            <button
              onClick={() => setScreen('start')}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              トップに戻る
            </button>
            <button
              onClick={() => setScreen('history')}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <List className="w-5 h-5" />
              履歴を確認する
            </button>
          </div>
        </div>
      </div>
    );
  }

  // quiz screen
  if (!q) return null;
  const isReview = data.review?.[q.id] === true;
  const answered = selected !== null;
  const isCorrect = selected === q.correctIndex;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => setScreen('start')} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Home className="w-5 h-5 text-gray-500" />
          </button>
          <div className="flex-1">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-500 h-2 rounded-full transition-all"
                style={{ width: `${((currentIndex + (answered ? 1 : 0)) / questions.length) * 100}%` }}
              />
            </div>
          </div>
          <span className="text-sm text-gray-500 font-medium whitespace-nowrap">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-4">
        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">問題{q.id}</span>
            <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">{q.year}</span>
            <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">{q.title}</span>
          </div>
          <p className="text-gray-800 leading-relaxed whitespace-pre-line">{q.question}</p>
        </div>

        {/* Choices */}
        <div className="space-y-3">
          {q.choices.map((choice, idx) => {
            let base = 'w-full text-left rounded-xl p-4 border-2 transition-all font-medium flex items-start gap-3';
            let style = 'bg-white border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer';
            if (answered) {
              if (idx === q.correctIndex) {
                style = 'bg-green-50 border-green-500 cursor-default';
              } else if (idx === selected && idx !== q.correctIndex) {
                style = 'bg-red-50 border-red-400 cursor-default';
              } else {
                style = 'bg-white border-gray-200 cursor-default opacity-60';
              }
            }
            return (
              <button key={idx} className={`${base} ${style}`} onClick={() => handleSelect(idx)} disabled={answered}>
                <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                  answered && idx === q.correctIndex ? 'bg-green-500 text-white' :
                  answered && idx === selected && idx !== q.correctIndex ? 'bg-red-400 text-white' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {LABEL_MAP[idx]}
                </span>
                <span className="flex-1 text-gray-800 text-sm">{choice}</span>
                {answered && idx === q.correctIndex && <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />}
                {answered && idx === selected && idx !== q.correctIndex && <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />}
              </button>
            );
          })}
        </div>

        {/* Result & Explanation */}
        {answered && (
          <div className="space-y-4">
            {/* Result Banner */}
            <div className={`rounded-2xl p-4 flex items-center gap-3 ${isCorrect ? 'bg-green-50 border-2 border-green-300' : 'bg-red-50 border-2 border-red-300'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isCorrect ? 'bg-green-500' : 'bg-red-400'}`}>
                {isCorrect ? <Check className="w-6 h-6 text-white" /> : <X className="w-6 h-6 text-white" />}
              </div>
              <div>
                <p className={`font-bold text-lg ${isCorrect ? 'text-green-700' : 'text-red-600'}`}>
                  {isCorrect ? '正解！' : '不正解'}
                </p>
                <p className="text-sm text-gray-600">正解：{LABEL_MAP[q.correctIndex]}</p>
              </div>
              {/* Review Checkbox */}
              <button
                onClick={() => toggleReview(q.id)}
                className={`ml-auto flex items-center gap-2 px-3 py-2 rounded-xl border-2 transition-colors ${isReview ? 'bg-yellow-100 border-yellow-400 text-yellow-700' : 'bg-white border-gray-300 text-gray-500 hover:border-yellow-400'}`}
              >
                <Star className={`w-4 h-4 ${isReview ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                <span className="text-xs font-semibold">要復習</span>
              </button>
            </div>

            {/* Explanation */}
            <div className="bg-white rounded-2xl shadow p-6 space-y-4">
              <h3 className="font-bold text-gray-800 text-lg border-b pb-2">解説</h3>

              {/* Key Point */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
                <p className="text-sm font-semibold text-blue-800 mb-1">ここが重要</p>
                <p className="text-sm text-blue-700 leading-relaxed">{q.explanation.summary}</p>
              </div>

              {/* Table */}
              {q.explanation.table && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-indigo-50">
                        {q.explanation.table.headers.map((h, i) => (
                          <th key={i} className="border border-indigo-200 px-3 py-2 text-left text-indigo-800 font-semibold whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {q.explanation.table.rows.map((row, ri) => (
                        <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          {row.map((cell, ci) => (
                            <td key={ci} className="border border-gray-200 px-3 py-2 text-gray-700 leading-relaxed">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Choice Details */}
              <div className="space-y-3">
                {q.explanation.details.map((d, i) => (
                  <div key={i} className={`rounded-xl p-4 ${d.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                    <div className="flex items-start gap-2">
                      <span className={`flex-shrink-0 font-bold text-sm px-2 py-0.5 rounded ${d.correct ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                        {d.label}{d.correct === true ? '　○' : d.correct === false ? '　×' : ''}
                      </span>
                      <p className="text-sm text-gray-700 leading-relaxed">{d.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Key Point Box */}
              {q.explanation.keyPoint && (
                <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4">
                  <p className="text-xs font-bold text-yellow-800 mb-1">📌 ポイント</p>
                  <p className="text-sm text-yellow-800 leading-relaxed">{q.explanation.keyPoint}</p>
                </div>
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={nextQuestion}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {currentIndex + 1 < questions.length ? (
                <>次の問題へ <ChevronRight className="w-5 h-5" /></>
              ) : (
                <>結果を見る <ChevronRight className="w-5 h-5" /></>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}