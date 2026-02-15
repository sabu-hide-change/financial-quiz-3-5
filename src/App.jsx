// npm install lucide-react recharts

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Check, 
  X, 
  Home, 
  RotateCcw, 
  BookOpen, 
  BarChart2, 
  ChevronRight, 
  AlertCircle,
  Play,
  Save,
  Triangle,
  Circle,
  Square,
  ArrowRight,
  ArrowDown
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

/**
 * データ定義
 * 添付ファイルの内容を元に構築
 */
const QUESTIONS = [
  {
    id: 1,
    category: "IEの全体像",
    year: "3-5",
    question: "IE（Industrial Engineering）に関する記述として、最も不適切なものはどれか。",
    options: [
      "IEは、生産性を高めるための工学的な手法の体系である。",
      "IEは、製品だけでなく、システム全体を最適に設計・改善・運用する手法である。",
      "IEを大きく分けると、「方法研究」と「時間研究」から構成される。",
      "IEの「方法研究」は、さらに「工程分析」と「動作研究」に分けられる。"
    ],
    answer: 2, // 0-indexed: ウ
    explanation: {
      text: "IEを大きく分けると、「方法研究」と「作業測定」から構成されます。「時間研究」は「作業測定」の構成要素となります。",
      important: [
        "IEは「方法研究」と「作業測定」に大別される。",
        "方法研究：工程分析、動作研究",
        "作業測定：稼働分析、時間研究"
      ],
      chartType: "tree_ie"
    }
  },
  {
    id: 2,
    category: "工程分析1",
    year: "3-5",
    question: "次に示す作業者の動きを、作業者工程分析により、分析記号「○」、「◇」、「Ｄ」、「⇒」を用いて分析した。「○」記号の数として、最も適切なものはどれか。\n\n①部品倉庫に生産に必要な部品を取りに行く。\n②部品棚に保管してある部品梱包箱から、使用する部品を取り出す。\n③部品を持って現場に戻る。\n④部品Aと部品Bを接着材で固定する。\n⑤接着が乾くまで待つ。\n⑥部品Cの数か所にドリルで穴を開ける。\n⑦部品Aを部品Cにネジで固定する。\n⑧トルク試験機でネジの締付けトルクを確認する。\n⑨出荷が出来るように製品梱包箱に入れる。\n⑩発送場まで梱包箱を移動する。",
    options: ["6個", "5個", "4個", "2個"],
    answer: 1, // イ: 5個
    explanation: {
      text: "「○（加工）」に該当するのは、②、④、⑥、⑦、⑨の5つです。特に②（部品取り出し）と⑨（梱包）も付加価値を生む作業として加工に分類されます。",
      details: [
        "① 運搬 (⇒)",
        "② 加工 (○)",
        "③ 運搬 (⇒)",
        "④ 加工 (○)",
        "⑤ 滞留 (D)",
        "⑥ 加工 (○)",
        "⑦ 加工 (○)",
        "⑧ 品質検査 (◇)",
        "⑨ 加工 (○)",
        "⑩ 運搬 (⇒)"
      ],
      chartType: "symbol_table"
    }
  },
  {
    id: 3,
    category: "工程分析2",
    year: "3-5",
    question: "工程分析に関する記述として、最も適切なものはどれか。",
    options: [
      "製品工程分析では、工場などのレイアウト図の上に、工程図記号を記入することで、工程の流れを表す。",
      "流れ線図は、製品が加工される流れを、運搬、検査、停滞を含めて表し、問題点を明らかにする。",
      "フロムツーチャートは、工程間の物の流れを分析する手法で、各工程間でどれぐらいの物が滞留しているかを分析する。",
      "作業者工程分析は、作業者の作業を中心に分析するもので、作業手順や作業の無駄を改善する際に利用される。"
    ],
    answer: 3, // エ
    explanation: {
      text: "アは「流れ線図」、イは「製品工程分析」、ウは「物量（滞留ではない）」に関する記述です。エの作業者工程分析の記述が適切です。",
      important: [
        "製品工程分析：加工の流れを運搬・検査・停滞含めて分析。",
        "流れ線図：レイアウト図上に記号を記入。",
        "フロムツーチャート：工程間の物量移動を分析。"
      ]
    }
  },
  {
    id: 4,
    category: "工程分析3",
    year: "3-5",
    question: "ある食品加工の工場において、生産管理の分析手法を用いて問題点を解決する場合の取組みとして、最も不適切なものはどれか。",
    options: [
      "現在の状況を大まかに把握するため、まず単純工程分析を行った。",
      "滞留時間が長い、工程Aと工程Bの間の作業のラインバランスを見直した。",
      "レイアウトの見直しを行うため、作業者工程分析を行った。",
      "製品工程分析で明らかになった問題を改善するため、ECRSを活用した。"
    ],
    answer: 2, // ウ
    explanation: {
      text: "レイアウトの見直しには、「流れ線図」や「フロムツーチャート」が適しています。作業者工程分析は作業手順の改善に利用されます。",
      important: [
        "単純工程分析：全体の流れを把握（加工と検査のみ）。",
        "ECRSの原則：排除(E)、結合(C)、交換(R)、簡素化(S)。"
      ]
    }
  },
  {
    id: 5,
    category: "工程分析4",
    year: "3-5",
    question: "下図（解説参照）は、ある製品の製品工程分析の結果である。この図から読み取ることができる記述として、最も適切なものはどれか。",
    options: [
      "加工を行う工程が4ヶ所ある。",
      "品質検査を行う工程が１ヶ所ある。",
      "ベルトコンベアーを活用して運搬している。",
      "物が滞留している箇所はない。"
    ],
    answer: 1, // イ
    explanation: {
      text: "図（▽→○→D→○→○→○(小)→◇→○(小)→▽）より、品質検査（◇）は1ヶ所です。",
      details: [
        "ア：加工(○)は3ヶ所（図中の大きな○）。小さい○は運搬。",
        "イ：品質検査(◇)は1ヶ所。正解。",
        "ウ：記号から運搬手段（コンベア等）は特定不可。",
        "エ：滞留(D)が1ヶ所ある。"
      ],
      chartType: "flow_process_visual"
    }
  },
  {
    id: 6,
    category: "フロムツーチャート",
    year: "3-5",
    question: "下図はAからEまで5つの工程におけるフロムツーチャートを表している。このフロムツーチャートから読み取れる記述として、最も適切なものはどれか。\n\n（表イメージ：対角線の下にも数値がある）",
    options: [
      "A→B→C→D→Eの順番に物が流れている。",
      "Bの工程では仕掛品が滞留している。",
      "Cの工程は検査工程であることがわかる。",
      "逆流している工程がある。"
    ],
    answer: 3, // エ
    explanation: {
      text: "対角線より左下のセル（例：C→Bの欄）に数値がある場合、後工程から前工程への「逆流」を示しています。",
      chartType: "from_to_table",
      important: [
        "フロムツーチャート（流入流出図表）：工程間の移動量。",
        "対角線より上：正流（From→To）",
        "対角線より下：逆流（To→From）"
      ]
    }
  },
  {
    id: 7,
    category: "運搬分析",
    year: "3-5",
    question: "運搬分析に関する記述として、最も不適切なものはどれか。",
    options: [
      "マテリアルハンドリングとは、原材料、仕掛品、完成品などの、運搬や取扱いに関することである。",
      "台記号における平（ひら）は、物が床や台の上にひら置きされている状態で、活性示数は1である。",
      "加工する材料を資材倉庫に取りに行く作業は、空運搬に該当する。",
      "配置式運搬工程分析は、レイアウト図の上に運搬工程記号を記入して、運搬の流れを分析する手法である。"
    ],
    answer: 1, // イ
    explanation: {
      text: "「平（ひら）」置きの状態は、運搬活性示数が最も低い「0」です。活性示数1は「箱」などのまとまった状態を指します。",
      chartType: "activity_index_table"
    }
  },
  {
    id: 8,
    category: "運搬活性分析",
    year: "3-5",
    question: "次に示す工程の平均活性示数の値として、最も適切なものはどれか。\n\n①鉄の棒材が床に平置き。\n②搬送用の箱に鉄の棒材を入れる。\n③パレットに搬送用の箱を乗せる。\n④フォークリフトでパレットを運ぶ。\n⑤トラックにパレットを積み、加工工場に運ぶ。\n⑥フォークリフトでパレットを降ろす。\n⑦パレットを所定場所に置く。",
    options: ["2.4", "3.5", "4.4", "5.5"],
    answer: 0, // ア: 2.4
    explanation: {
      text: "各工程の活性示数：①0, ②1, ③2, ④4, ⑤4, ⑥4, ⑦2。合計17 ÷ 工程数7 ≒ 2.4",
      chartType: "activity_chart_visual",
      details: [
        "移動中（コンベア・車など）は活性示数4。",
        "パレット置きは活性示数2。",
        "バラ置きは活性示数0。"
      ]
    }
  },
  {
    id: 9,
    category: "マテリアルハンドリング",
    year: "3-5",
    question: "マテリアルハンドリングに関する記述として、最も不適切なものはどれか。",
    options: [
      "平均活性示数は、停滞工程の活性示数の合計を停滞工程数で除した値として求められる。",
      "マテリアルハンドリングによって、運搬の自動化や効率化が図れるようになる。",
      "運搬管理の改善には、レイアウトの改善、運搬方法の改善、運搬制度の改善がある。",
      "運搬活性示数は、置かれている物品を運び出すために必要となる取り扱いの手間の数を示している。"
    ],
    answer: 3, // エ
    explanation: {
      text: "運搬活性示数は、「すでに省かれている手間の数」を表します（0〜4）。手間がかかるほど活性示数は低くなります。",
      important: ["活性示数が大きい＝運びやすい＝省かれている手間が多い。"]
    }
  },
  {
    id: 10,
    category: "動作研究",
    year: "3-5",
    question: "動作研究に関する記述として、最も適切なものはどれか。",
    options: [
      "マイクロモーション分析により、通常より遅いスピードで撮影すると気がつかない無駄な動きを発見できる。",
      "連合作業分析により、作業者の多工程持ちや、適正な配置人員を検討できる。",
      "メモモーション分析は、通常よりも早いスピードで撮影することで、細かい動作が分析できる。",
      "サーブリッグ分析の第1類に分類される作業は、必要のない動作である。"
    ],
    answer: 1, // イ
    explanation: {
      text: "ア：マイクロは「高速撮影・スロー再生」で微動作分析。ウ：メモモーションは「低速撮影・高速再生」で長時間分析。エ：第1類は「必要な動作」。",
      important: [
        "マイクロモーション：微動作（速い動き）を分析。",
        "メモモーション：長いサイクルの作業や集団作業を分析。",
        "連合作業分析：人vs人、人vs機械の連携を分析（マン・マシンチャートなど）。"
      ]
    }
  },
  {
    id: 11,
    category: "動作経済の原則",
    year: "3-5",
    question: "次の作業改善を、動作経済の原則に照らした場合、最も不適切なものはどれか。",
    options: [
      "作業台の上に置いて使用していた電動ドライバを、伸縮ロープに付けて天井から吊るすようにした。",
      "手が疲れないよう、両手を同時に使う作業を極力減らすように組み立て手順を検討した。",
      "使用する工具の形状にくり抜いたマットを用意して、マット上に使う工具を順番に並べた。",
      "横にいる次工程の作業者に加工品を手渡す際に、真横ではなく、少し前に置くように作業指導した。"
    ],
    answer: 1, // イ
    explanation: {
      text: "動作経済の原則では「両手を同時かつ左右対称的に動かすこと」が推奨されます。片手待機は無駄とみなされます。",
      important: [
        "身体の使用の原則：両手同時使用、慣性利用。",
        "作業場の配置の原則：定位置管理、手元配置。",
        "工具・設備の原則：保持の排除（治具利用）。"
      ]
    }
  },
  {
    id: 12,
    category: "稼働分析",
    year: "3-5",
    question: "稼働分析の手法に関する記述として、最も不適切なものはどれか。",
    options: [
      "連続観測法は、ワークサンプリングと比較して測定に手間がかかる。",
      "稼働率は、「実際の稼働時間」を、「実際の稼働時間と非稼働時間の合計」で除して求めることができる。",
      "ワークサンプリングは、隠れて観測することで、作業者は観測されることを意識せず、偏りのないデータが取れる。",
      "連続観測法は、非繰返しの作業の観測に適している。"
    ],
    answer: 2, // ウ
    explanation: {
      text: "ワークサンプリングは隠れて行うものではありません。瞬間的に観測するため意識されにくいメリットはありますが、隠し撮りではありません。",
      important: [
        "ワークサンプリング：瞬間観測。手間小、広範囲、精度はサンプル数依存。",
        "連続観測法：つきっきり。手間大、詳細分析、非繰り返し作業向き。"
      ]
    }
  },
  {
    id: 13,
    category: "ワークサンプリング",
    year: "3-5",
    question: "ワークサンプリングに関する記述として、最も不適切なものはどれか。",
    options: [
      "ワークサンプリングは、瞬間的な観測のため深い分析に不向きである。",
      "ワークサンプリングのメリットには、少ない労力で観測できる点が挙げられる。",
      "ワークサンプリングでは、1人の観測者が多くの観測対象を観測することが難しい。",
      "ワークサンプリングは、連続観測法のように、観測対象に付きっきりになる必要がない。"
    ],
    answer: 2, // ウ
    explanation: {
      text: "ワークサンプリングは瞬間観測で巡回できるため、1人の観測者で「多数」の対象を観測できるのがメリットです。",
    }
  },
  {
    id: 14,
    category: "時間研究",
    year: "3-5",
    question: "標準時間に関する記述として、最も適切なものはどれか。",
    options: [
      "余裕時間のうち、機械を調整し、打合せをするなどの余裕は、人的余裕に含まれる。",
      "標準時間は、正味時間と余裕時間の和で求められ、外掛け法で算出された余裕率を使う場合は、「標準時間 ＝ 正味時間 × （1＋余裕率）」によって計算される。",
      "標準時間は、「その仕事に習熟した作業者が」、「適切な所定の作業条件のもとで」、「必要な余裕を持ち」、作業するのに必要となる時間である。",
      "作業時間を観測した作業者のペースが、基準より速い場合は、レイティング係数の値は100%よりも小さくなる。"
    ],
    answer: 1, // イ
    explanation: {
      text: "ア：機械調整等は「管理余裕」。ウ：定義に「正常な無理のない作業ペース（正味時間）」の要素が抜けている。エ：速い場合はレイティング係数は100%より大きくなる。",
      chartType: "time_structure"
    }
  },
  {
    id: 15,
    category: "標準時間の設定法",
    year: "3-5",
    question: "標準時間を設定する手法に関する記述として、最も不適切なものはどれか。",
    options: [
      "ストップウォッチ法を用いて標準時間を設定する際は、レイティング操作を行う必要がある。",
      "標準時間資料法は、作業時間のデータを分類・整理した図表などを用いて標準時間を設定する方法である。",
      "実績資料法では、過去のデータを基礎として標準時間を設定する方法で、個別生産でよく利用される。",
      "PTS法は、繰返しの少ない作業の標準時間の設定に適しており、標準時間の設定も容易にできる。"
    ],
    answer: 3, // エ
    explanation: {
      text: "PTS法（既定時間法）は微動作レベルで分析するため、手間がかかります。また、繰り返しの「多い」作業に適しています。",
      important: [
        "ストップウォッチ法：直接観測。レイティング必須。",
        "PTS法：微動作に分解して合成。レイティング不要。詳細だが手間大。"
      ]
    }
  },
  {
    id: 16,
    category: "余裕率",
    year: "3-5",
    question: "ある製造工程における作業時間のデータが以下の通り与えられている。この作業に対する余裕率の値として、最も適切なものはどれか。\n\n正味時間：16分\n余裕時間：4分\n標準時間：20分",
    options: [
      "内掛け法の余裕率：25％",
      "内掛け法の余裕率：80％",
      "外掛け法の余裕率：20％",
      "外掛け法の余裕率：25％"
    ],
    answer: 3, // エ
    explanation: {
      text: "外掛け法 = 余裕時間 ÷ 正味時間 = 4 ÷ 16 = 0.25 (25%)。\n内掛け法 = 余裕時間 ÷ 標準時間 = 4 ÷ 20 = 0.20 (20%)。",
      important: [
        "外掛け：分母が正味時間。",
        "内掛け：分母が標準時間。"
      ]
    }
  }
];

const STORAGE_KEY = 'ie-smart-quiz-data';

export default function App() {
  const [currentView, setCurrentView] = useState('menu'); // menu, quiz, result, history
  const [quizMode, setQuizMode] = useState('all'); // all, retry, review
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userHistory, setUserHistory] = useState({
    attempts: [], // { date, score, total }
    wrongQuestions: [], // IDs
    reviewQuestions: [] // IDs
  });
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // 初期ロード
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setUserHistory(JSON.parse(saved));
        console.log("Loaded history:", JSON.parse(saved));
      }
    } catch (e) {
      console.error("Storage load error:", e);
      setUserHistory({ attempts: [], wrongQuestions: [], reviewQuestions: [] });
    }
  }, []);

  // データ保存
  const saveHistory = (newHistory) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      setUserHistory(newHistory);
      console.log("Saved history:", newHistory);
    } catch (e) {
      console.error("Storage save error:", e);
    }
  };

  const startQuiz = (mode) => {
    setQuizMode(mode);
    let filtered = [];
    if (mode === 'all') {
      filtered = [...QUESTIONS];
    } else if (mode === 'retry') {
      filtered = QUESTIONS.filter(q => userHistory.wrongQuestions.includes(q.id));
    } else if (mode === 'review') {
      filtered = QUESTIONS.filter(q => userHistory.reviewQuestions.includes(q.id));
    }

    if (filtered.length === 0) {
      alert("該当する問題がありません。");
      return;
    }

    // シャッフルしたい場合はここでshuffle
    setCurrentQuestions(filtered);
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setCurrentView('quiz');
  };

  const handleAnswer = (optionIndex) => {
    if (isAnswered) return;
    
    setSelectedOption(optionIndex);
    setIsAnswered(true);

    const currentQ = currentQuestions[currentIndex];
    const isCorrect = optionIndex === currentQ.answer;

    if (isCorrect) {
      setScore(s => s + 1);
      // 正解したら「間違えた問題リスト」から削除
      const newWrong = userHistory.wrongQuestions.filter(id => id !== currentQ.id);
      saveHistory({ ...userHistory, wrongQuestions: newWrong });
    } else {
      // 不正解なら追加
      if (!userHistory.wrongQuestions.includes(currentQ.id)) {
        saveHistory({ 
          ...userHistory, 
          wrongQuestions: [...userHistory.wrongQuestions, currentQ.id] 
        });
      }
    }
  };

  const nextQuestion = () => {
    if (currentIndex < currentQuestions.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const newAttempt = {
      date: new Date().toISOString(),
      score: score + (selectedOption === currentQuestions[currentIndex]?.answer ? 1 : 0), // 最後の問題の加算
      total: currentQuestions.length,
      mode: quizMode
    };
    saveHistory({
      ...userHistory,
      attempts: [newAttempt, ...userHistory.attempts].slice(0, 50) // 最新50件のみ
    });
    setCurrentView('result');
  };

  const toggleReview = (questionId) => {
    let newReviews;
    if (userHistory.reviewQuestions.includes(questionId)) {
      newReviews = userHistory.reviewQuestions.filter(id => id !== questionId);
    } else {
      newReviews = [...userHistory.reviewQuestions, questionId];
    }
    saveHistory({ ...userHistory, reviewQuestions: newReviews });
  };

  // --- Components ---

  const StartScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8 p-4">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-800">IE スマート問題集</h1>
        <p className="text-slate-500">産業工学 (Industrial Engineering) 3-5</p>
      </div>

      <div className="grid grid-cols-1 gap-4 w-full max-w-md">
        <button 
          onClick={() => startQuiz('all')}
          className="flex items-center p-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          <Play className="w-6 h-6 mr-3" />
          <div className="text-left">
            <div className="font-bold">すべての問題</div>
            <div className="text-sm opacity-80">全{QUESTIONS.length}問</div>
          </div>
        </button>

        <button 
          onClick={() => startQuiz('retry')}
          className={`flex items-center p-4 rounded-lg shadow transition ${
            userHistory.wrongQuestions.length > 0 
              ? 'bg-orange-500 text-white hover:bg-orange-600' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
          disabled={userHistory.wrongQuestions.length === 0}
        >
          <RotateCcw className="w-6 h-6 mr-3" />
          <div className="text-left">
            <div className="font-bold">前回不正解の問題</div>
            <div className="text-sm opacity-80">{userHistory.wrongQuestions.length}問</div>
          </div>
        </button>

        <button 
          onClick={() => startQuiz('review')}
          className={`flex items-center p-4 rounded-lg shadow transition ${
            userHistory.reviewQuestions.length > 0 
              ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
          disabled={userHistory.reviewQuestions.length === 0}
        >
          <BookOpen className="w-6 h-6 mr-3" />
          <div className="text-left">
            <div className="font-bold">要復習の問題</div>
            <div className="text-sm opacity-80">{userHistory.reviewQuestions.length}問</div>
          </div>
        </button>
      </div>

      <div className="flex space-x-4">
        <button 
          onClick={() => setCurrentView('history')}
          className="flex items-center px-4 py-2 text-slate-600 hover:bg-slate-100 rounded"
        >
          <BarChart2 className="w-4 h-4 mr-2" />
          学習履歴
        </button>
      </div>
    </div>
  );

  // チャート・図解レンダリング用ヘルパー
  const renderChart = (type) => {
    switch (type) {
      case 'tree_ie':
        return (
          <div className="bg-slate-50 p-4 rounded text-sm border border-slate-200">
            <div className="font-bold mb-2 text-center bg-orange-200 p-1 rounded inline-block">IE (Industrial Engineering)</div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 border-l-2 border-slate-300 pl-2">
                <div className="font-bold text-blue-700 bg-yellow-100 p-1 inline-block mb-1">方法研究</div>
                <ul className="list-disc ml-5 space-y-1">
                  <li><span className="font-semibold">工程分析</span> (流れを分析)</li>
                  <li><span className="font-semibold">動作研究</span> (作業者の動き)</li>
                </ul>
              </div>
              <div className="flex-1 border-l-2 border-slate-300 pl-2">
                <div className="font-bold text-blue-700 bg-blue-100 p-1 inline-block mb-1">作業測定</div>
                <ul className="list-disc ml-5 space-y-1">
                  <li><span className="font-semibold">稼働分析</span> (稼働状況)</li>
                  <li><span className="font-semibold">時間研究</span> (標準時間設定)</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 'symbol_table':
        return (
          <div className="overflow-x-auto my-2">
            <table className="min-w-full text-xs md:text-sm border-collapse bg-white">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border p-2">工程</th>
                  <th className="border p-2">記号</th>
                  <th className="border p-2">内容</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">加工</td>
                  <td className="border p-2 text-center text-lg">○</td>
                  <td className="border p-2">変質・変形・組立</td>
                </tr>
                <tr>
                  <td className="border p-2">運搬</td>
                  <td className="border p-2 text-center text-lg">○⇒ / ➡</td>
                  <td className="border p-2">位置の変化</td>
                </tr>
                <tr>
                  <td className="border p-2">停滞</td>
                  <td className="border p-2 text-center text-lg">▽ / D</td>
                  <td className="border p-2">貯蔵(▽) / 滞留(D)</td>
                </tr>
                <tr>
                  <td className="border p-2">検査</td>
                  <td className="border p-2 text-center text-lg">□ / ◇</td>
                  <td className="border p-2">数量(□) / 品質(◇)</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case 'flow_process_visual':
        return (
          <div className="flex flex-col items-center space-y-2 p-4 bg-slate-50 border rounded">
             <div className="flex flex-col items-center">
                <Triangle className="rotate-180 fill-white text-black w-8 h-8" /> 
                <span className="text-xs">材料倉庫(▽)</span>
             </div>
             <ArrowDown className="w-4 h-4 text-slate-400" />
             <div className="flex flex-col items-center">
                <Circle className="w-8 h-8 text-black" />
                <span className="text-xs">加工</span>
             </div>
             <ArrowDown className="w-4 h-4 text-slate-400" />
             <div className="flex flex-col items-center relative">
                <div className="w-8 h-8 border-2 border-black rounded-r-full border-l-2" />
                <span className="text-xs">滞留(D)</span>
             </div>
             <ArrowDown className="w-4 h-4 text-slate-400" />
             <div className="flex flex-col items-center">
                <Circle className="w-8 h-8 text-black" />
                <span className="text-xs">加工</span>
             </div>
             <ArrowDown className="w-4 h-4 text-slate-400" />
             <div className="flex flex-col items-center">
                <Circle className="w-10 h-10 text-black" />
                <span className="text-xs">加工(大)</span>
             </div>
             <ArrowDown className="w-4 h-4 text-slate-400" />
             <div className="flex flex-col items-center">
                <Circle className="w-6 h-6 text-black" />
                <span className="text-xs">運搬(小○)</span>
             </div>
             <ArrowDown className="w-4 h-4 text-slate-400" />
             <div className="flex flex-col items-center">
                <div className="w-8 h-8 border-2 border-black transform rotate-45" />
                <span className="text-xs mt-1">品質検査(◇)</span>
             </div>
             <ArrowDown className="w-4 h-4 text-slate-400" />
              <div className="flex flex-col items-center">
                <Circle className="w-6 h-6 text-black" />
                <span className="text-xs">運搬(小○)</span>
             </div>
             <ArrowDown className="w-4 h-4 text-slate-400" />
             <div className="flex flex-col items-center">
                <Triangle className="rotate-180 fill-white text-black w-8 h-8" />
                <span className="text-xs">製品置場(▽)</span>
             </div>
          </div>
        );
      case 'from_to_table':
        return (
          <div className="overflow-auto my-2">
            <table className="w-full text-center border text-sm">
              <thead className="bg-blue-50">
                <tr>
                  <th className="border p-1 bg-slate-200 diagonal-split">F \ T</th>
                  <th className="border p-1">A</th>
                  <th className="border p-1">B</th>
                  <th className="border p-1">C</th>
                  <th className="border p-1">D</th>
                  <th className="border p-1">E</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['A', '', '1', '2', '3', '4'],
                  ['B', '', '', '2', '3', ''],
                  ['C', '', '1(逆流)', '', '', '1'],
                  ['D', '', '', '', '', '4'],
                  ['E', '', '', '', '', '']
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="border font-bold bg-blue-50">{row[0]}</td>
                    {row.slice(1).map((cell, j) => (
                      <td key={j} className={`border p-1 ${i===j ? 'bg-slate-300' : ''} ${cell.includes('逆流') ? 'text-red-600 font-bold' : ''}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-xs text-right mt-1 text-slate-500">*CからBへの「1」が逆流を示す</div>
          </div>
        );
      case 'activity_chart_visual':
        const data = [
          { name: '①床', value: 0 },
          { name: '②箱入', value: 1 },
          { name: '③パレ積', value: 2 },
          { name: '④移動', value: 4 },
          { name: '⑤トラック', value: 4 },
          { name: '⑥降ろす', value: 4 },
          { name: '⑦置く', value: 2 },
        ];
        return (
          <div className="h-64 w-full bg-white p-2 border rounded">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" interval={0} fontSize={10} angle={-30} textAnchor="end" height={60} />
                <YAxis domain={[0, 4]} ticks={[0, 1, 2, 3, 4]} />
                <Tooltip />
                <ReferenceLine y={2.4} label="平均 2.4" stroke="red" strokeDasharray="3 3" />
                <Line type="stepAfter" dataKey="value" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      case 'activity_index_table':
         return (
           <table className="w-full text-xs border my-2">
             <thead className="bg-slate-100"><tr><th className="border">指数</th><th className="border">状態</th><th className="border">省けた手間</th></tr></thead>
             <tbody>
               <tr><td className="border text-center">0</td><td className="border">バラ置き (平)</td><td className="border">なし</td></tr>
               <tr><td className="border text-center">1</td><td className="border">箱入り</td><td className="border">まとめる</td></tr>
               <tr><td className="border text-center">2</td><td className="border">枕 (パレット)</td><td className="border">＋起こす</td></tr>
               <tr><td className="border text-center">3</td><td className="border">車 (台車)</td><td className="border">＋持ち上げる</td></tr>
               <tr><td className="border text-center">4</td><td className="border">移動中 (コンベア)</td><td className="border">＋持っていく</td></tr>
             </tbody>
           </table>
         )
      default:
        return null;
    }
  };

  const QuizScreen = () => {
    const question = currentQuestions[currentIndex];
    
    // 安全対策
    if (!question) return <div>Loading...</div>;

    const isLast = currentIndex === currentQuestions.length - 1;

    return (
      <div className="max-w-2xl w-full mx-auto p-4 flex flex-col min-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-slate-500">
            問題 {currentIndex + 1} / {currentQuestions.length}
          </div>
          <div className="px-2 py-1 bg-slate-100 rounded text-xs font-mono">
            {question.category} ({question.year})
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
          <h2 className="text-lg font-medium text-slate-800 whitespace-pre-wrap leading-relaxed">
            {question.question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {question.options.map((option, idx) => {
            let btnClass = "w-full text-left p-4 rounded-lg border transition-all relative ";
            if (isAnswered) {
              if (idx === question.answer) {
                btnClass += "bg-green-50 border-green-500 text-green-800 font-bold";
              } else if (idx === selectedOption) {
                btnClass += "bg-red-50 border-red-500 text-red-800";
              } else {
                btnClass += "bg-white border-slate-200 opacity-50";
              }
            } else {
              btnClass += "bg-white border-slate-200 hover:bg-slate-50 hover:border-blue-400";
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={isAnswered}
                className={btnClass}
              >
                <div className="flex">
                  <span className="mr-3 font-mono">{['ア', 'イ', 'ウ', 'エ'][idx]}.</span>
                  <span>{option}</span>
                </div>
                {isAnswered && idx === question.answer && (
                  <Check className="absolute right-4 top-4 text-green-600 w-5 h-5" />
                )}
                {isAnswered && idx === selectedOption && idx !== question.answer && (
                  <X className="absolute right-4 top-4 text-red-600 w-5 h-5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation & Navigation */}
        {isAnswered && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 mb-20">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-blue-900 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  解説
                </h3>
                <button 
                  onClick={() => toggleReview(question.id)}
                  className={`flex items-center text-xs px-3 py-1 rounded-full border ${
                    userHistory.reviewQuestions.includes(question.id)
                      ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                      : "bg-white text-slate-500 border-slate-300"
                  }`}
                >
                  <BookOpen className="w-3 h-3 mr-1" />
                  {userHistory.reviewQuestions.includes(question.id) ? "要復習" : "復習リストに追加"}
                </button>
              </div>
              
              <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap mb-4">
                {question.explanation.text}
              </div>

              {/* チャート表示 */}
              {question.explanation.chartType && renderChart(question.explanation.chartType)}

              {question.explanation.details && (
                <ul className="mt-3 bg-white p-3 rounded border border-blue-100 text-sm space-y-1">
                   {question.explanation.details.map((d, i) => <li key={i}>・{d}</li>)}
                </ul>
              )}

              {question.explanation.important && (
                <div className="mt-4 pt-3 border-t border-blue-200">
                  <div className="text-xs font-bold text-slate-500 mb-1">【ここが重要】</div>
                  <ul className="list-disc ml-4 text-sm text-slate-700 space-y-1">
                    {question.explanation.important.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Fixed Bottom Nav */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4 flex justify-end items-center z-10">
              <button 
                onClick={nextQuestion}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-blue-700 flex items-center"
              >
                {isLast ? "結果を見る" : "次の問題へ"}
                <ChevronRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const ResultScreen = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 animate-in zoom-in-50">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">結果発表</h2>
          
          <div className="my-8 relative inline-flex items-center justify-center">
            <svg className="w-40 h-40 transform -rotate-90">
              <circle
                className="text-slate-100"
                strokeWidth="12"
                stroke="currentColor"
                fill="transparent"
                r="70"
                cx="80"
                cy="80"
              />
              <circle
                className="text-blue-600"
                strokeWidth="12"
                strokeDasharray={440}
                strokeDashoffset={440 - (440 * score) / currentQuestions.length}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="70"
                cx="80"
                cy="80"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-bold text-slate-800">{score}</span>
              <span className="text-slate-400 text-sm">/ {currentQuestions.length}</span>
            </div>
          </div>

          <div className="text-slate-600 mb-8">
            {score === currentQuestions.length ? "全問正解！素晴らしい！" : "お疲れ様でした。復習しましょう。"}
          </div>

          <button 
            onClick={() => setCurrentView('menu')}
            className="w-full py-3 bg-slate-800 text-white rounded-lg font-bold hover:bg-slate-700 flex justify-center items-center"
          >
            <Home className="mr-2 w-4 h-4" />
            トップへ戻る
          </button>
        </div>
      </div>
    );
  };

  const HistoryScreen = () => {
    return (
      <div className="max-w-md mx-auto p-4 min-h-screen">
        <div className="flex items-center mb-6">
          <button onClick={() => setCurrentView('menu')} className="p-2 hover:bg-slate-100 rounded-full">
            <Home className="w-5 h-5 text-slate-600" />
          </button>
          <h2 className="text-xl font-bold ml-4">学習履歴</h2>
        </div>

        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <h3 className="font-bold text-slate-700 mb-3 flex items-center">
            <BookOpen className="w-4 h-4 mr-2" />
            ステータス
          </h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-orange-50 p-3 rounded">
              <div className="text-2xl font-bold text-orange-600">{userHistory.wrongQuestions.length}</div>
              <div className="text-xs text-orange-800">未克服</div>
            </div>
            <div className="bg-emerald-50 p-3 rounded">
              <div className="text-2xl font-bold text-emerald-600">{userHistory.reviewQuestions.length}</div>
              <div className="text-xs text-emerald-800">要復習</div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold text-slate-700 text-sm ml-1">最近の取り組み</h3>
          {userHistory.attempts.length === 0 && (
            <div className="text-center text-slate-400 py-8">履歴はありません</div>
          )}
          {userHistory.attempts.map((attempt, i) => (
            <div key={i} className="bg-white p-3 rounded border border-slate-100 flex justify-between items-center">
              <div>
                <div className="text-xs text-slate-400">
                  {new Date(attempt.date).toLocaleDateString()} {new Date(attempt.date).toLocaleTimeString()}
                </div>
                <div className="text-sm font-medium text-slate-700">
                  {attempt.mode === 'all' ? '全問' : attempt.mode === 'retry' ? '再挑戦' : '復習'}
                </div>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-blue-600">{attempt.score}</span>
                <span className="text-xs text-slate-400">/{attempt.total}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {currentView === 'menu' && <StartScreen />}
      {currentView === 'quiz' && <QuizScreen />}
      {currentView === 'result' && <ResultScreen />}
      {currentView === 'history' && <HistoryScreen />}
    </div>
  );
}