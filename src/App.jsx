// npm install lucide-react recharts firebase
import React, { useState, useEffect, useRef } from "react";
import { Check, X, Home, ChevronRight, RefreshCw, BarChart2, BookOpen, User, ArrowRight, HelpCircle } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

// データの分離用ID
const APP_ID = "QuizApp_Capital_And_Cost_001";

// Firebase設定 (環境変数を使用)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Firebase初期化
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

// ==========================================
// インラインSVG & HTML 図表コンポーネント (ダークモード最適化)
// ==========================================

// 問題5用の縦型製品工程分析図
const Question5Svg = ({ isExplanation = false }) => (
  <div className="flex flex-col items-center my-6">
    <div className="relative bg-slate-900/40 border border-slate-800 rounded-xl p-4 shadow-inner max-w-sm w-full flex justify-center">
      <svg width="140" height="500" viewBox="0 0 140 500" className="overflow-visible">
        {/* 縦の接続線 */}
        <line x1="70" y1="20" x2="70" y2="480" stroke="#4f46e5" strokeWidth="2.5" />
        
        {/* 1. 貯蔵 ▽ (逆三角形) */}
        <polygon points="40,20 100,20 70,55" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
        <text x="70" y="32" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#e2e8f0">貯蔵</text>
        <text x="110" y="38" fontSize="10" fill="#94a3b8" fontWeight="semibold">① 貯蔵</text>

        {/* 2. 運搬 ○ (小) */}
        <circle cx="70" cy="90" r="14" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="2" />
        <text x="70" y="93" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#e2e8f0">運</text>
        <text x="110" y="94" fontSize="10" fill="#94a3b8" fontWeight="semibold">② 運搬</text>

        {/* 3. 滞留 D */}
        <path d="M 50,130 L 75,130 A 20,20 0 0,1 75,170 L 50,170 Z" fill="#1e1b4b" stroke="#f97316" strokeWidth="2" />
        <text x="63" y="153" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#e2e8f0">滞留</text>
        <text x="110" y="154" fontSize="10" fill="#94a3b8" fontWeight="semibold">③ 滞留</text>

        {/* 4. 運搬 ○ (小) */}
        <circle cx="70" cy="210" r="14" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="2" />
        <text x="70" y="213" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#e2e8f0">運</text>
        <text x="110" y="214" fontSize="10" fill="#94a3b8" fontWeight="semibold">④ 運搬</text>

        {/* 5. 加工 ○ (大) */}
        <circle cx="70" cy="270" r="24" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2.5" />
        <text x="70" y="274" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#e2e8f0">加工</text>
        <text x="110" y="274" fontSize="10" fill="#94a3b8" fontWeight="semibold">⑤ 加工</text>

        {/* 6. 運搬 ○ (小) */}
        <circle cx="70" cy="330" r="14" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="2" />
        <text x="70" y="333" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#e2e8f0">運</text>
        <text x="110" y="334" fontSize="10" fill="#94a3b8" fontWeight="semibold">⑥ 運搬</text>

        {/* 7. 品質検査 ◇ (ひし形) */}
        <polygon 
          points="70,365 95,390 70,415 45,390" 
          fill="#1e1b4b" 
          stroke={isExplanation ? "#a855f7" : "#818cf8"} 
          strokeWidth={isExplanation ? "3.5" : "2"}
          className={isExplanation ? "animate-pulse" : ""}
        />
        <text x="70" y="394" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#e2e8f0">検査</text>
        <text x="110" y="394" fontSize="10" fill="#94a3b8" fontWeight={isExplanation ? "bold" : "semibold"} className={isExplanation ? "text-purple-400" : ""}>⑦ 検査</text>

        {/* 8. 運搬 ○ (小) */}
        <circle cx="70" cy="445" r="14" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="2" />
        <text x="70" y="448" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#e2e8f0">運</text>
        <text x="110" y="449" fontSize="10" fill="#94a3b8" fontWeight="semibold">⑧ 運搬</text>

        {/* 9. 貯蔵 ▽ (逆三角形) */}
        <polygon points="40,465 100,465 70,495" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
        <text x="70" y="477" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#e2e8f0">貯蔵</text>
        <text x="110" y="482" fontSize="10" fill="#94a3b8" fontWeight="semibold">⑨ 貯蔵</text>
      </svg>
    </div>
    {isExplanation && (
      <div className="text-center text-xs text-purple-400 font-bold bg-purple-950/20 py-2 px-4 rounded-lg border border-purple-800/30 max-w-sm">
        ※ ⑦品質検査（ひし形◇）が1箇所あり、これが「最も適切な記述」の根拠となっています。
      </div>
    )}
  </div>
);

// 問題6用のフロムツーチャートテーブル
const Question6FromToTable = ({ isExplanation = false }) => (
  <div className="my-6 overflow-x-auto rounded-xl border border-slate-800 shadow-lg">
    <table className="border-collapse w-full max-w-md mx-auto text-center bg-slate-900/60 text-slate-200 text-xs">
      <thead>
        <tr className="bg-slate-800/80 border-b border-slate-700 font-bold text-slate-100">
          <th className="border border-slate-800 p-2.5 relative w-16 h-12 bg-slate-800/90">
            <span className="absolute top-1.5 right-2 text-[9px] text-slate-400">To</span>
            <span className="absolute bottom-1.5 left-2 text-[9px] text-slate-400">From</span>
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <line x1="0" y1="0" x2="100%" y2="100%" stroke="#475569" strokeWidth="1"/>
            </svg>
          </th>
          <th className="border border-slate-800 p-2.5 font-bold text-indigo-300">A</th>
          <th className="border border-slate-800 p-2.5 font-bold text-indigo-300">B</th>
          <th className="border border-slate-800 p-2.5 font-bold text-indigo-300">C</th>
          <th className="border border-slate-800 p-2.5 font-bold text-indigo-300">D</th>
          <th className="border border-slate-800 p-2.5 font-bold text-indigo-300">E</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-slate-800">
          <td className="border border-slate-800 p-2.5 font-bold bg-slate-800/40 text-slate-300">A</td>
          <td className="border border-slate-800 p-2.5 bg-slate-950/60 text-slate-600"></td>
          <td className="border border-slate-800 p-2.5 font-semibold text-slate-200">1</td>
          <td className="border border-slate-800 p-2.5 font-semibold text-slate-200">2</td>
          <td className="border border-slate-800 p-2.5 font-semibold text-slate-200">3</td>
          <td className="border border-slate-800 p-2.5 font-semibold text-slate-200">4</td>
        </tr>
        <tr className="border-b border-slate-800">
          <td className="border border-slate-800 p-2.5 font-bold bg-slate-800/40 text-slate-300">B</td>
          <td className="border border-slate-800 p-2.5 text-slate-600"></td>
          <td className="border border-slate-800 p-2.5 bg-slate-950/60 text-slate-600"></td>
          <td className="border border-slate-800 p-2.5 font-semibold text-slate-200">2</td>
          <td className="border border-slate-800 p-2.5 font-semibold text-slate-200">3</td>
          <td className="border border-slate-800 p-2.5 text-slate-600"></td>
        </tr>
        <tr className="border-b border-slate-800">
          <td className="border border-slate-800 p-2.5 font-bold bg-slate-800/40 text-slate-300">C</td>
          <td className="border border-slate-800 p-2.5 text-slate-600"></td>
          <td className={`border border-slate-800 p-2.5 font-bold transition-all duration-300 ${isExplanation ? "bg-red-500/20 text-red-400 ring-1 ring-red-500/50" : "font-semibold text-slate-200"}`}>1</td>
          <td className="border border-slate-800 p-2.5 bg-slate-950/60 text-slate-600"></td>
          <td className="border border-slate-800 p-2.5 text-slate-600"></td>
          <td className="border border-slate-800 p-2.5 font-semibold text-slate-200">1</td>
        </tr>
        <tr className="border-b border-slate-800">
          <td className="border border-slate-800 p-2.5 font-bold bg-slate-800/40 text-slate-300">D</td>
          <td className="border border-slate-800 p-2.5 text-slate-600"></td>
          <td className="border border-slate-800 p-2.5 text-slate-600"></td>
          <td className="border border-slate-800 p-2.5 text-slate-600"></td>
          <td className="border border-slate-800 p-2.5 bg-slate-950/60 text-slate-600"></td>
          <td className="border border-slate-800 p-2.5 font-semibold text-slate-200">4</td>
        </tr>
        <tr>
          <td className="border border-slate-800 p-2.5 font-bold bg-slate-800/40 text-slate-300">E</td>
          <td className="border border-slate-800 p-2.5 text-slate-600"></td>
          <td className="border border-slate-800 p-2.5 text-slate-600"></td>
          <td className="border border-slate-800 p-2.5 text-slate-600"></td>
          <td className="border border-slate-800 p-2.5 text-slate-600"></td>
          <td className="border border-slate-800 p-2.5 bg-slate-950/60 text-slate-600"></td>
        </tr>
      </tbody>
    </table>
    {isExplanation && (
      <div className="text-center mt-3 text-[10px] text-red-400 font-bold bg-red-950/20 py-2 border-t border-slate-800">
        ※ C→B (FROM:C, TO:B) に「1」があるため、アルファベット順と逆の「逆流」が発生しています。
      </div>
    )}
  </div>
);

// 問題1用 IE体系ツリー
const IETreeDiagram = () => (
  <div className="flex flex-col items-center p-4 bg-slate-900/50 rounded-xl border border-slate-800 my-4 text-xs max-w-md mx-auto shadow-md">
    <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-4 py-2 rounded-lg font-bold shadow-md mb-4 text-center w-full">IE (Industrial Engineering)</div>
    <div className="flex w-full justify-around relative">
      <div className="flex flex-col items-center w-1/2 px-2 border-r border-dashed border-slate-800">
        <div className="bg-emerald-600/90 text-emerald-100 px-3 py-1 rounded font-semibold shadow-sm mb-3">方法研究</div>
        <div className="space-y-2 w-full max-w-[150px]">
          <div className="bg-slate-950/40 text-slate-300 border border-slate-800 p-2 rounded-lg text-center shadow-xs">工程分析</div>
          <div className="bg-slate-950/40 text-slate-300 border border-slate-800 p-2 rounded-lg text-center shadow-xs">動作研究</div>
        </div>
      </div>
      <div className="flex flex-col items-center w-1/2 px-2">
        <div className="bg-sky-600/90 text-sky-100 px-3 py-1 rounded font-semibold shadow-sm mb-3">作業測定</div>
        <div className="space-y-2 w-full max-w-[150px]">
          <div className="bg-slate-950/40 text-slate-300 border border-slate-800 p-2 rounded-lg text-center shadow-xs font-semibold">時間研究</div>
          <div className="bg-slate-950/40 text-slate-300 border border-slate-800 p-2 rounded-lg text-center shadow-xs">稼働分析</div>
        </div>
      </div>
    </div>
  </div>
);

// 問題2/5解説用 JIS工程記号表
const JISSymbolsTable = () => (
  <div className="my-4 overflow-x-auto shadow-md rounded-xl border border-slate-800">
    <table className="w-full text-xs text-slate-200 text-left border-collapse bg-slate-900/40">
      <thead>
        <tr className="bg-slate-800/80 font-bold border-b border-slate-700 text-slate-100">
          <th className="p-2.5 text-center w-16">記号</th>
          <th className="p-2.5 w-20">名称</th>
          <th className="p-2.5">内容</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-slate-800/50">
          <td className="p-2.5 text-center font-bold text-lg text-emerald-400">○</td>
          <td className="p-2.5 font-bold text-slate-300">加工</td>
          <td className="p-2.5 text-slate-400">原材料や部品の形状を変える、組み立てるなど、製品に付加価値を与える工程。</td>
        </tr>
        <tr className="border-b border-slate-800/50">
          <td className="p-2.5 text-center font-bold text-lg text-sky-400">⇒ / ◯(小)</td>
          <td className="p-2.5 font-bold text-slate-300">運搬</td>
          <td className="p-2.5 text-slate-400">物や作業者を別の場所に移動させる工程。</td>
        </tr>
        <tr className="border-b border-slate-800/50">
          <td className="p-2.5 text-center font-bold text-lg text-amber-400">▽</td>
          <td className="p-2.5 font-bold text-slate-300">貯蔵 (停滞)</td>
          <td className="p-2.5 text-slate-400">計画的な保管状態。許可なしには動かせない（倉庫での保管など）。</td>
        </tr>
        <tr className="border-b border-slate-800/50">
          <td className="p-2.5 text-center font-bold text-lg text-orange-400">D</td>
          <td className="p-2.5 font-bold text-slate-300">滞留 (停滞)</td>
          <td className="p-2.5 text-slate-400">計画外の一時的な待ち状態（次の工程への仕掛品待ち、接着剤の乾燥待ちなど）。</td>
        </tr>
        <tr>
          <td className="p-2.5 text-center font-bold text-lg text-indigo-400">□ / ◇</td>
          <td className="p-2.5 font-bold text-slate-300">検査</td>
          <td className="p-2.5 text-slate-400">□は数量検査（個数や重量）、◇は品質検査（規格や性能）。規格と比較して合否を判定する。</td>
        </tr>
      </tbody>
    </table>
  </div>
);

// 問題3解説用
const ProcessAnalysisDiagram = () => (
  <div className="my-4 flex flex-col items-center p-4 bg-slate-900/50 rounded-xl border border-slate-800 text-slate-200 text-xs max-w-md mx-auto shadow-md">
    <div className="bg-emerald-600/90 text-emerald-100 px-3 py-1 rounded-md font-bold shadow-sm mb-3 text-center">工程分析の分類</div>
    <div className="flex w-full justify-around">
      <div className="flex flex-col items-center w-1/2 border-r border-slate-800 px-1">
        <div className="font-bold text-slate-300 mb-2">製品・作業者の工程分析</div>
        <div className="space-y-1.5 text-center w-full">
          <div className="bg-slate-950/40 text-slate-300 p-1.5 rounded-lg border border-slate-800">単純工程分析</div>
          <div className="bg-slate-950/40 text-slate-300 p-1.5 rounded-lg border border-slate-800">製品工程分析</div>
          <div className="bg-slate-950/40 text-slate-300 p-1.5 rounded-lg border border-slate-800">作業者工程分析</div>
        </div>
      </div>
      <div className="flex flex-col items-center w-1/2 px-1">
        <div className="font-bold text-slate-300 mb-2">流動・配置の分析</div>
        <div className="space-y-1.5 text-center w-full">
          <div className="bg-slate-950/40 text-slate-300 p-1.5 rounded-lg border border-slate-800">流れ線図</div>
          <div className="bg-slate-950/40 text-slate-300 p-1.5 rounded-lg border border-slate-800">フロムツーチャート</div>
        </div>
      </div>
    </div>
  </div>
);

// 問題4解説用
const ProcessAnalysisApplicationTable = () => (
  <div className="my-4 overflow-x-auto shadow-md rounded-xl border border-slate-800">
    <table className="w-full text-xs text-slate-200 text-left border-collapse bg-slate-900/40">
      <thead>
        <tr className="bg-slate-800/80 font-bold border-b border-slate-700 text-slate-100">
          <th className="p-2.5 w-28">分析手法</th>
          <th className="p-2.5">主な目的・適用場面</th>
          <th className="p-2.5">特徴</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-slate-800/50">
          <td className="p-2.5 font-bold text-slate-300 bg-slate-800/20">単純工程分析</td>
          <td className="p-2.5 text-slate-400">全体の加工プロセスの把握、工場レイアウト設計の初期段階。</td>
          <td className="p-2.5 text-slate-500">加工と検査のみを表記。運搬・停滞は除外して単純化。</td>
        </tr>
        <tr className="border-b border-slate-800/50">
          <td className="p-2.5 font-bold text-slate-300 bg-slate-800/20">製品工程分析</td>
          <td className="p-2.5 text-slate-400">製品の工程改善、停滞時間・距離の削減。</td>
          <td className="p-2.5 text-slate-300 font-medium">加工・運搬・検査・停滞をすべて追跡して時系列で記録。</td>
        </tr>
        <tr className="border-b border-slate-800/50">
          <td className="p-2.5 font-bold text-slate-300 bg-slate-800/20">流れ線図</td>
          <td className="p-2.5 text-slate-400">工場の機械・設備レイアウトの改善、運搬経路の無駄排除。</td>
          <td className="p-2.5 text-slate-500">実際のレイアウト図の上に工程図記号をプロットして流れを可視化。</td>
        </tr>
        <tr className="border-b border-slate-800/50">
          <td className="p-2.5 font-bold text-slate-300 bg-slate-800/20">作業者工程分析</td>
          <td className="p-2.5 text-slate-400">作業手順の標準化、作業の無駄（手待ち等）の改善。</td>
          <td className="p-2.5 text-slate-500">「作業者」の動きを中心に加工・移動・手待ち・検査を分析。</td>
        </tr>
        <tr>
          <td className="p-2.5 font-bold text-slate-300 bg-slate-800/20">フロムツーチャート</td>
          <td className="p-2.5 text-slate-400">多品種少量生産 of 工程分析、工程間の正流・逆流物量の把握。</td>
          <td className="p-2.5 text-slate-500">From/To のマトリクス表で工程間の移動量・重量・距離を表現。</td>
        </tr>
      </tbody>
    </table>
  </div>
);

// 問題7解説用
const HandlingAnalysisDiagram = () => (
  <div className="my-4 space-y-4 text-slate-200">
    <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 text-xs shadow-md">
      <div className="font-bold text-slate-100 mb-3 text-center">運搬工程分析記号の分類</div>
      <div className="grid grid-cols-2 gap-3 text-center">
        <div className="bg-slate-950/40 p-2.5 rounded-lg border border-slate-850">
          <div className="font-bold text-sky-400 mb-1.5">台記号</div>
          <div className="space-y-1 text-slate-400 font-mono text-[10px]">
            <div>◯ : 平 (床置き)</div>
            <div>⨀ : 箱 (容器内)</div>
            <div>⨂ : パレット (台の上)</div>
            <div>⨃ : 車台 (移動車)</div>
          </div>
        </div>
        <div className="bg-slate-950/40 p-2.5 rounded-lg border border-slate-850">
          <div className="font-bold text-indigo-400 mb-1.5">経路・移動</div>
          <div className="space-y-1 text-slate-400 font-mono text-[10px]">
            <div>直線 : 直線移動</div>
            <div>波線 : エレベータ等</div>
            <div>矢印 (→) : 移動方向</div>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-slate-900 border border-slate-800 text-slate-200 p-4 rounded-xl text-center font-mono shadow-md">
      <div className="text-sky-400 font-bold mb-1 text-xs">空運搬係数の公式</div>
      <div className="text-xs">空運搬係数 ＝ 空運搬距離 ÷ 品物の移動距離</div>
      <div className="text-[9px] text-slate-500 mt-1.5">※空運搬：物を運ばずに空で移動する距離</div>
    </div>
  </div>
);

// 問題8/9解説用
const ActivityAnalysisDiagram = () => (
  <div className="my-4 space-y-4 text-slate-200">
    <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 text-xs shadow-md">
      <div className="font-bold text-slate-100 mb-3 text-center">工程ごとの活性示数 (本問の例)</div>
      <ol className="list-decimal pl-4 space-y-1 text-slate-400 text-[11px]">
        <li>鉄の棒材が床に平置き : <span className="font-bold text-red-400">示数 0</span></li>
        <li>搬送用の箱に鉄の棒材を入れる : <span className="font-bold text-orange-400">示数 1</span></li>
        <li>パレットに搬送用の箱を乗せる : <span className="font-bold text-yellow-400">示数 2</span></li>
        <li>フォークリフトでパレットを運ぶ : <span className="font-bold text-emerald-400">示数 4</span> (移動中)</li>
        <li>トラックにパレットを積み運ぶ : <span className="font-bold text-emerald-400">示数 4</span> (移動中)</li>
        <li>フォークリフトでパレットを降ろす : <span className="font-bold text-emerald-400">示数 4</span> (移動中)</li>
        <li>パレットを所定場所に置く : <span className="font-bold text-yellow-400">示数 2</span></li>
      </ol>
      <div className="bg-slate-900 border border-slate-800 text-slate-200 p-3.5 rounded-xl font-mono mt-3.5 text-center text-xs shadow-inner">
        <div className="text-sky-400 font-bold mb-1">平均活性示数の計算</div>
        <div>(0 + 1 + 2 + 4 + 4 + 4 + 2) ÷ 7 = 17 ÷ 7 ≒ <span className="text-yellow-400 font-bold text-sm">2.4</span></div>
      </div>
    </div>
    
    <div className="bg-slate-900/30 p-4 rounded-xl border border-slate-800 shadow-md">
      <div className="text-[10px] font-bold text-slate-400 text-center mb-3">運搬活性分析図イメージ</div>
      <svg width="260" height="110" viewBox="0 0 260 110" className="mx-auto">
        <line x1="30" y1="15" x2="250" y2="15" stroke="#1e293b" strokeWidth="1" />
        <line x1="30" y1="35" x2="250" y2="35" stroke="#1e293b" strokeWidth="1" />
        <line x1="30" y1="55" x2="250" y2="55" stroke="#1e293b" strokeWidth="1" />
        <line x1="30" y1="75" x2="250" y2="75" stroke="#1e293b" strokeWidth="1" />
        <line x1="30" y1="95" x2="250" y2="95" stroke="#334155" strokeWidth="1.5" />
        
        <text x="25" y="18" textAnchor="end" fontSize="7" fill="#64748b">4 (移動)</text>
        <text x="25" y="38" textAnchor="end" fontSize="7" fill="#64748b">3 (車台)</text>
        <text x="25" y="58" textAnchor="end" fontSize="7" fill="#64748b">2 (パレ)</text>
        <text x="25" y="78" textAnchor="end" fontSize="7" fill="#64748b">1 (箱)</text>
        <text x="25" y="98" textAnchor="end" fontSize="7" fill="#64748b">0 (平)</text>
        
        <rect x="40" y="95" width="12" height="0" fill="#ef4444" opacity="0.8" />
        <text x="46" y="106" textAnchor="middle" fontSize="7" fill="#94a3b8">①</text>
        
        <rect x="70" y="75" width="12" height="20" fill="#f97316" opacity="0.8" />
        <text x="76" y="106" textAnchor="middle" fontSize="7" fill="#94a3b8">②</text>
        
        <rect x="100" y="55" width="12" height="40" fill="#eab308" opacity="0.8" />
        <text x="106" y="106" textAnchor="middle" fontSize="7" fill="#94a3b8">③</text>
        
        <rect x="130" y="15" width="12" height="80" fill="#10b981" opacity="0.8" />
        <text x="136" y="106" textAnchor="middle" fontSize="7" fill="#94a3b8">④</text>
        
        <rect x="160" y="15" width="12" height="80" fill="#10b981" opacity="0.8" />
        <text x="166" y="106" textAnchor="middle" fontSize="7" fill="#94a3b8">⑤</text>
        
        <rect x="190" y="15" width="12" height="80" fill="#10b981" opacity="0.8" />
        <text x="196" y="106" textAnchor="middle" fontSize="7" fill="#94a3b8">⑥</text>
        
        <rect x="220" y="55" width="12" height="40" fill="#eab308" opacity="0.8" />
        <text x="226" y="106" textAnchor="middle" fontSize="7" fill="#94a3b8">⑦</text>
      </svg>
    </div>
  </div>
);

// 問題10解説用
const TherbligAnalysisTable = () => (
  <div className="my-4 overflow-x-auto shadow-md rounded-xl border border-slate-800">
    <table className="w-full text-xs text-slate-200 text-left border-collapse bg-slate-900/40">
      <thead>
        <tr className="bg-slate-800/80 font-bold border-b border-slate-700 text-slate-100">
          <th className="p-2.5 w-16">分類</th>
          <th className="p-2.5">定義</th>
          <th className="p-2.5">該当する動作例</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-slate-800/50">
          <td className="p-2.5 font-bold text-emerald-400 bg-emerald-950/20 text-center">第1類</td>
          <td className="p-2.5 font-bold text-slate-300">作業を行うために直接必要な動作</td>
          <td className="p-2.5 text-slate-400">手を伸ばす、つかむ、運ぶ、位置決めする、組み立てる、使う、放す</td>
        </tr>
        <tr className="border-b border-slate-800/50">
          <td className="p-2.5 font-bold text-sky-400 bg-sky-950/20 text-center">第2類</td>
          <td className="p-2.5 font-bold text-slate-300">第1類の動作を遅らせる原因となる動作</td>
          <td className="p-2.5 text-slate-400">探す、見つけ出す、選ぶ、考える、調べる、準備する</td>
        </tr>
        <tr>
          <td className="p-2.5 font-bold text-red-400 bg-red-950/20 text-center">第3類</td>
          <td className="p-2.5 font-bold text-slate-300">作業に必要がなく、疲労や遅れの原因となる動作（無駄）</td>
          <td className="p-2.5 text-slate-400">保持する（手で固定する）、避けることのできない遅れ、避けることのできる遅れ、休息、手待ち</td>
        </tr>
      </tbody>
    </table>
  </div>
);

// 問題11解説用
const MotionEconomyPrinciplesTable = () => (
  <div className="my-4 overflow-x-auto shadow-md rounded-xl border border-slate-800">
    <table className="w-full text-xs text-slate-200 text-left border-collapse bg-slate-900/40">
      <thead>
        <tr className="bg-slate-800/80 font-bold border-b border-slate-700 text-slate-100">
          <th className="p-2.5 w-28">原則の分類</th>
          <th className="p-2.5">具体的な改善指針・原則の例</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-slate-800/50">
          <td className="p-2.5 font-bold text-slate-300 bg-slate-800/20">身体の動作</td>
          <td className="p-2.5 text-slate-400 leading-relaxed">
            ・両手は同時に、左右対称的に、反対方向に動かし始めること。<br/>
            ・基本動作の数を極力少なくし、最短経路で行うこと。<br/>
            ・動作をリズミカルにし、急激な方向転換を避ける。
          </td>
        </tr>
        <tr className="border-b border-slate-800/50">
          <td className="p-2.5 font-bold text-slate-300 bg-slate-800/20">作業場の配置</td>
          <td className="p-2.5 text-slate-400 leading-relaxed">
            ・材料や工具は、体の前方に、手の届く範囲で配置すること。<br/>
            ・材料や工具は、作業順序に合わせて定位置に配置する（探す手間の排除）。<br/>
            ・重力などを利用し、供給・排出を楽にする。
          </td>
        </tr>
        <tr>
          <td className="p-2.5 font-bold text-slate-300 bg-slate-800/20">工具や設備</td>
          <td className="p-2.5 text-slate-400 leading-relaxed">
            ・手で保持する代わりに、治具やクランプで固定すること。<br/>
            ・2つ以上の工具を組み合わせて複合工具にする。<br/>
            ・ペダルなど足操作を利用し、手を他の作業に空ける。
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

// 問題12/13解説用
const WorkSamplingVsContinuousTable = () => (
  <div className="my-4 overflow-x-auto shadow-md rounded-xl border border-slate-800">
    <table className="w-full text-xs text-slate-200 text-left border-collapse bg-slate-900/40">
      <thead>
        <tr className="bg-slate-800/80 font-bold border-b border-slate-700 text-slate-100">
          <th className="p-2.5 w-20">測定手法</th>
          <th className="p-2.5">メリット</th>
          <th className="p-2.5">デメリット・不向きな点</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-slate-800/50">
          <td className="p-2.5 font-bold text-emerald-400 bg-emerald-950/20">ワークサンプリング<br/>(瞬間観測)</td>
          <td className="p-2.5 text-slate-400 leading-relaxed">
            ・付きっきりの必要がなく、測定の労力が少ない。<br/>
            ・1人で多くの対象を同時に測定できる。<br/>
            ・作業者が意識しないため、偏りのないデータが取れる。
          </td>
          <td className="p-2.5 text-slate-500 leading-relaxed">
            ・瞬間的な観測であるため、発生頻度の極めて低い作業や、非周期的な作業の深い分析には向かない。<br/>
            ・サンプル数が少ないと誤差が大きくなる。
          </td>
        </tr>
        <tr>
          <td className="p-2.5 font-bold text-sky-400 bg-sky-950/20">連続観測法<br/>(付きっきり)</td>
          <td className="p-2.5 text-slate-400 leading-relaxed">
            ・時系列の詳細なデータが取れ、作業の無駄や細かい流れを深く分析できる。<br/>
            ・繰返しのない非定常作業や、複雑な作業プロセスの観測に適する。
          </td>
          <td className="p-2.5 text-slate-500 leading-relaxed">
            ・測定に付きっきりの多大な時間と手間がかかる。<br/>
            ・観測者がそばにいるため、作業者が意識して通常と異なるペースになりやすい。
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

// 問題14/16解説用
const StandardTimeFormulas = () => (
  <div className="my-4 space-y-3 text-slate-200">
    <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 text-xs shadow-md">
      <div className="font-bold text-indigo-400 mb-2 text-center">標準時間の構成関係</div>
      <div className="flex flex-col space-y-1 bg-slate-950/60 p-3 rounded-lg border border-slate-800 font-mono text-center text-slate-300">
        <div>標準時間 ＝ 正味時間 ＋ 余裕時間</div>
        <div className="text-[10px] text-slate-500 mt-1">
          正味時間 ＝ 主体作業時間 ＋ 準備段取り時間<br/>
          余裕時間 ＝ 管理余裕 ＋ 人的余裕
        </div>
      </div>
    </div>
    
    <div className="bg-slate-900 border border-slate-800 text-slate-200 p-4 rounded-xl text-xs font-mono shadow-md">
      <div className="text-sky-400 font-bold text-center mb-3">余裕率の２つの計算方法</div>
      <div className="space-y-3">
        <div className="border-b border-slate-800 pb-3">
          <div className="font-bold text-yellow-400">■ 外掛け法 (正味時間に対する割合)</div>
          <div className="pl-2.5 mt-1">余裕率 ＝ 余裕時間 ÷ 正味時間</div>
          <div className="pl-2.5 text-[10px] text-slate-500 mt-0.5">標準時間 ＝ 正味時間 × (1 ＋ 余裕率)</div>
        </div>
        <div>
          <div className="font-bold text-yellow-400">■ 内掛け法 (標準時間に対する割合)</div>
          <div className="pl-2.5 mt-1">余裕率 ＝ 余裕時間 ÷ 標準時間</div>
          <div className="pl-2.5 text-[10px] text-slate-500 mt-0.5">標準時間 ＝ 正味時間 ÷ (1 － 余裕率)</div>
        </div>
      </div>
    </div>
  </div>
);

// 問題15解説用
const StandardTimeSettingMethodsTable = () => (
  <div className="my-4 overflow-x-auto shadow-md rounded-xl border border-slate-800">
    <table className="w-full text-xs text-slate-200 text-left border-collapse bg-slate-900/40">
      <thead>
        <tr className="bg-slate-800/80 font-bold border-b border-slate-700 text-slate-100">
          <th className="p-2.5 w-28">設定手法</th>
          <th className="p-2.5">概要・特徴</th>
          <th className="p-2.5 text-center w-20">レイティング</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-slate-800/50">
          <td className="p-2.5 font-bold text-slate-300 bg-slate-800/20">ストップウォッチ法</td>
          <td className="p-2.5 text-slate-400">作業者を直接ストップウォッチで計測。最も一般的で直接的。</td>
          <td className="p-2.5 text-center font-bold text-red-400 bg-red-950/30">必要</td>
        </tr>
        <tr className="border-b border-slate-800/50">
          <td className="p-2.5 font-bold text-slate-300 bg-slate-800/20">実績資料法</td>
          <td className="p-2.5 text-slate-400">過去の実績作業データから標準時間を算出。個別受注生産で多用。手間は少ないが精度は低い。</td>
          <td className="p-2.5 text-center text-slate-500">不要</td>
        </tr>
        <tr className="border-b border-slate-800/50">
          <td className="p-2.5 font-bold text-slate-300 bg-slate-800/20">標準時間資料法</td>
          <td className="p-2.5 text-slate-400">あらかじめ用意した作業要素別の時間データ（資料）を足し合わせて標準時間を合成。</td>
          <td className="p-2.5 text-center text-slate-500">不要</td>
        </tr>
        <tr>
          <td className="p-2.5 font-bold text-slate-300 bg-slate-800/20">PTS法</td>
          <td className="p-2.5 text-slate-400">動作を微動作レベルに分解し、あらかじめ定められた時間値から合成。繰り返しの多い量産で有効。</td>
          <td className="p-2.5 text-center text-slate-500">不要</td>
        </tr>
      </tbody>
    </table>
  </div>
);

// 図表の条件レンダラー
const renderDiagram = (id, isExplanation = false) => {
  if (!isExplanation) {
    if (id === 5) return <Question5Svg isExplanation={false} />;
    if (id === 6) return <Question6FromToTable isExplanation={false} />;
    return null;
  } else {
    switch (id) {
      case 1: return <IETreeDiagram />;
      case 2: return <JISSymbolsTable />;
      case 3: return <ProcessAnalysisDiagram />;
      case 4: return <ProcessAnalysisApplicationTable />;
      case 5: return <Question5Svg isExplanation={true} />;
      case 6: return <Question6FromToTable isExplanation={true} />;
      case 7: return <HandlingAnalysisDiagram />;
      case 8: return <ActivityAnalysisDiagram />;
      case 9: return <ActivityAnalysisDiagram />;
      case 10: return <TherbligAnalysisTable />;
      case 11: return <MotionEconomyPrinciplesTable />;
      case 12: return <WorkSamplingVsContinuousTable />;
      case 13: return <WorkSamplingVsContinuousTable />;
      case 14: return <StandardTimeFormulas />;
      case 15: return <StandardTimeSettingMethodsTable />;
      case 16: return <StandardTimeFormulas />;
      default: return null;
    }
  }
};

// ==========================================
// パースされた問題データ配列 (完全ノンカット)
// ==========================================
const QUESTIONS = [
  {
    "id": 1,
    "title": "IEの全体像",
    "answer": "ウ",
    "choices": [
      "ア　IEは、生産性を高めるための工学的な手法の体系である。",
      "イ　IEは、製品だけでなく、システム全体を最適に設計・改善・運用する手法である。",
      "ウ　IEを大きく分けると、「方法研究」と「時間研究」から構成される。",
      "エ　IEの「方法研究」は、さらに「工程分析」と「動作研究」に分けられる。"
    ],
    "source": "スマート問題集 3-5",
    "question": "IE（Industrial Engineering）に関する記述として、最も不適切なものはどれか。",
    "explanation": "ここが重要\n　本問ではIEの概要や、体系について問われています。\n　IEは、生産性を高めるための工学的な手法の体系で、日本語では経営工学や生産工学、管理工学などと呼ばれています。\n　IEの対象は、製品だけでなく、人や物、設備、情報などを含めたシステム全体です。\n　システム全体を最適に設計・改善・運用していくために、次のような体系で構成されています。\n\n　IEの体系は混乱し易いので、上の図の体系をしっかりと覚えましょう。\nア　○：\n　IEは、生産性を高めるための工学的な手法の体系で、日本語では経営工学や生産工学、管理工学などと呼ばれています。よって記述は適切です。\n\nイ　○：\n　IEが対象にするのは、製品だけでなく、人や物、設備、情報などを含めたシステム全体です。よって記述は適切です。\n\nウ　×：\n　IEを大きく分けると、「作業測定」と「方法研究」から構成されます。（時間研究ではありません）「時間研究」は「作業測定」の構成要素となります。よって記述は不適切です。\n\nエ　○：\n　「方法研究」は、さらに「工程分析」と「動作研究」に分けられます。「工程分析」は、生産工程や運搬工程を分析する手法です。「動作研究」は、作業者の動作を細かく分析し、最適な作業方法を求めるための手法です。よって記述は適切です。"
  },
  {
    "id": 2,
    "title": "工程分析1",
    "answer": "イ",
    "choices": [
      "ア　6個",
      "イ　5個",
      "ウ　4個",
      "エ　2個"
    ],
    "source": "スマート問題集 3-5",
    "question": "次に示す作業者の動きを、作業者工程分析により、分析記号「○」、「◇」、「Ｄ」、「⇒」を用いて分析した。「○」記号の数として、最も適切なものはどれか。\n①部品倉庫に生産に必要な部品を取りに行く。\n②部品棚に保管してある部品梱包箱から、使用する部品を取り出す。\n③部品を持って現場に戻る。\n④部品Aと部品Bを接着材で固定する。\n⑤接着が乾くまで待つ。\n⑥部品Cの数か所にドリルで穴を開ける。\n⑦部品Aを部品Cにネジで固定する。\n⑧トルク試験機でネジの締付けトルクを確認する。\n⑨出荷が出来るように製品梱包箱に入れる。\n⑩発送場まで梱包箱を移動する。",
    "explanation": "ここが重要\n　本問では与えられた作業の内容を、それぞれ該当する工程図記号を用いて表すことが求められています。\n　工程分析は、工程を分析する手法で、大きく分けて「製品や作業者の工程分析」と、「運搬の分析」があります。\n　工程分析では、作業や物の流れを表すために、工程図記号を使って工程図を作成します。\n　工程図記号には、「加工」「運搬」「停滞」「検査」があります。さらに「停滞」には「貯蔵」と「滞留」、「検査」には「数量検査」と「品質検査」があり、内容は次のようになります。\n\n　具体例が与えられ、工程を分析する問題は過去に何度か出題されています。より理解を深めるために、小売店舗や食事に出かけた際に店員さんの動きや、物の状態に着目して、各動作や状態が、どの工程に相当するか考える訓練をしてみるのも良いでしょう。\n正解：イ　5個\n　本問の①～⑨の行動について工程図記号を用いて表すと次のようになります。\n　①部品倉庫に生産に必要な部品を取りに行く。(運搬 ⇒)\n　②部品棚に保管してある部品梱包箱から、使用する部品を取り出す。(加工○)\n　③部品を持って現場に戻る。（運搬⇒）\n　④部品Aと部品Bを接着材で固定する。（加工○）\n　⑤接着が乾くまで待つ。（滞留Ｄ）\n　⑥部品Cの数か所にドリルで穴を開ける。（加工○）\n　⑦部品Aを部品Cにネジで固定する。（加工○）\n　⑧トルク試験機でネジの締付けトルクを確認する。（品質検査◇）\n　⑨出荷出来るように製品梱包箱に入れる。（加工○）\n　⑩発送場まで梱包箱を移動する。（運搬⇒）\n\n　この中で②と⑨が少し判断に迷ったかもしれません。②は実際の製品を組み立てるための部品ピックアップになりますので付加価値を生む作業（加工）になります。また⑨は、製品梱包箱も製品の一部であり、複数の部品を組立てる作業（加工）と同一視できます。よって「○」記号は5個となるため、正解はイとなります。"
  },
  {
    "id": 3,
    "title": "工程分析2",
    "answer": "エ",
    "choices": [
      "ア　製品工程分析では、工場などのレイアウト図の上に、工程図記号を記入することで、工程の流れを表す。",
      "イ　流れ線図は、製品が加工される流れを、運搬、検査、停滞を含めて表し、問題点を明らかにする。",
      "ウ　フロムツーチャートは、工程間の物の流れを分析する手法で、各工程間でどれぐらいの物が滞留しているかを分析する。",
      "エ　作業者工程分析は、作業者の作業を中心に分析するもので、作業手順や作業の無駄を改善する際に利用される。"
    ],
    "source": "スマート問題集 3-5",
    "question": "工程分析に関する記述として、最も適切なものはどれか。",
    "explanation": "ここが重要\n　本問では工程分析の各手法の内容が問われています。\n　IE全体における、工程分析の位置づけは次のようになっており、各手法があります。\n\n　各手法の詳細は次のようになっています。※（ ）内は別の呼び名\n●単純工程分析（オペレーション･プロセス･チャート）\n・概要：原材料や部品が投入され、加工される過程を、工程図記号を用いて明らかにして分析する手法。\n・手法：運搬や貯蔵、滞留は記入せず、加工と検査のみを表す。そのため、加工の流れが単純に表現でき、原材料からの加工プロセスの全体の流れをつかみやすい。\n・適用場面：工場のレイアウト設計や、詳細な工程分析を行う前の基礎資料として利用。\n\n●製品工程分析（フロー･プロセス･チャート）\n・概要：製品が加工される流れを、運搬、検査、停滞を含めて明らかにして分析する手法。\n・手法：工程ごとに、作業の種類を表す工程図記号を線で結び、線の場所によって、どこに問題があるかを明確にする。\n・適用場面：製品の工程改善など。特に滞留工程（時間）の削減に活用。\n\n●流れ線図（フロー･ダイアグラム）\n・概要：工場などのレイアウト図の上に、工程図記号を記入し、工程の流れを表したもの。\n・手法：機械･設備などの配置を記載したレイアウト図に、工程図記号を記入して、物の動きを具体的に表し、工程の流れを分析する。\n・適用場面：レイアウト設計や工程の流れの改善などに利用。\n\n●作業者工程分析\n・概要：作業者の作業を中心に、加工・移動・手待ち・検査を含めて、工程図記号で明らかにして分析する手法。\n・適用場面：作業手順や作業の無駄の改善などに利用。\n\n●フロムツーチャート（流出流入図表）\n・概要：各工程の間でどれぐらいの物量が流れているかを分析する手法。\n・手法：工程の一覧を縦と横に記載した表を作成し、ある工程(From)から別の工程(To)に流れた運搬重量、もしくは移動距離を表の中に記入する。これにより、工程上を正流方向（前から順）に流れている物量と、逆流している物量を明らかする。\n・適用場面：多品種の製品で、それぞれの加工経路が異なる場合でも表現できるため、多種少量生産の工程の分析や、工場レイアウトの設計に利用。\n\n　工程分析に関する問題は過去に何度か出題されています。各分析手法の内容とともに、どんな場面で使うかについても併せて理解しましょう。\nア　×：\n　選択肢の記述は、流れ線図に関するものです。製品工程分析とは、製品が加工される流れを、運搬、検査、停滞を含めて表し、問題点を明らかにする分析手法です。よって記述は不適切です。\n\nイ　×：\n　選択肢の記述は、製品工程分析に関するものです。流れ線図は、工場などのレイアウト図の上に、工程図記号を記入したものです。機械･設備の配置と物の動きを具体的に表すことができるため、レイアウトの設計や工程の流れの改善などによく使われます。よって記述は不適切です。\n\nウ　×：\n　フロムツーチャートでは、各工程間でどれぐらいの物量が流れているかを分析します。滞留の分析ではありません。よって記述は不適切です。\n\n- エ　○：\n　作業者工程分析とは、選択肢の記述の通りです。作業者工程分析では、作業者の作業を中心とした工程を全てリストアップし、それぞれの作業を、「加工」「移動」「手待ち」「検査」に分類して分析することで、作業手順や作業の無駄の改善を行います。よって記述は適切です。"
  },
  {
    "id": 4,
    "title": "工程分析3",
    "answer": "ウ",
    "choices": [
      "ア　現在の状況を大まかに把握するため、まず単純工程分析を行った。",
      "イ　滞留時間が長い、工程Aと工程Bの間の作業のラインバランスを見直した。",
      "ウ　レイアウトの見直しを行うため、作業者工程分析を行った。",
      "エ　製品工程分析で明らかになった問題を改善するため、ECRSを活用した。"
    ],
    "source": "スマート問題集 3-5",
    "question": "ある食品加工の工場において、生産管理の分析手法を用いて問題点を解決する場合の取組みとして、最も不適切なものはどれか。",
    "explanation": "ここが重要\n　本問では工程分析の各手法の適用場面や、明らかになった問題点を解決するための方法を問われています。\n　実際に工程分析を行う際には、最初に分析の目的を明確にすることが重要です。例えば、レイアウトを改善したいのか、作業方法を改善したいのかなどの目的によって、分析の手法や範囲が変わってきます。各分析手法の適用場面は次のようになります。\n\n　また、工程分析を基に、改善をする場合には、付加価値を生んでいない作業をいかに削減していくかが重要です。ここでは、以前学習したECRSの原則を用いることで、改善のヒントが得られます。\n　例えば、停滞に関しては無駄が生じているので、ラインバランシングを行ったり、段取り替えを改善することが考えられます。\n　運搬に関しては、距離や回数を減らしたり、運搬をより自動化することが考えられます。\n　検査に関しては、必要ない検査を減らしたり、加工と同時に検査をしたり、検査自体の効率を上げることが考えられます。\n\n　各分析手法が、それぞれどんな場面で使われるか、また、明らかになった問題をどんな方法で解決するのか、しっかりと理解しましょう。\nア　○：\n　単純工程分析では、運搬や貯蔵、滞留は記入せず、加工と検査のみを表します。このため、原材料からの加工プロセスの全体の流れをつかみやすく、工場レイアウト設計や、詳細な工程分析を行う前の基礎資料として利用されます。よって記述は適切です。\n\nイ　○：\n　工程分析により、滞留時間が長い工程が明らかになった場合は、ラインバランスを見直し、段取り替えの改善をすることで、滞留時間を減らす取組みをします。よって記述は適切です。\n\nウ　×：\n　作業者工程分析は、作業者の作業を中心に分析するものです。レイアウトの見直しを行う場合は、流れ線図を用いた流れ分析や、フロムツーチャートを用いた分析を行うのが一般的です。よって記述は不適切です。\n\nエ　○：\n　製品工程分析で明らかになった問題を改善するためは、以前学習したECRSの原則（E：やめる、捨てる / C：一緒にする / R：置き換える、順番を変える / S：単純化する)を用いて改善方法を考えることで、多くのヒントが得られます。よって記述は適切です。"
  },
  {
    "id": 5,
    "title": "工程分析４",
    "answer": "イ",
    "choices": [
      "ア　加工を行う工程が4ヶ所ある。",
      "イ　品質検査を行う工程が１ヶ所ある。",
      "ウ　ベルトコンベアーを活用して運搬している。",
      "エ　物が滞留している箇所はない。"
    ],
    "source": "スマート問題集 3-5",
    "question": "下図は、ある製品の製品工程分析の結果である。この図から読み取ることができる記述として、最も適切なものはどれか。",
    "explanation": "ここが重要\n本問では工程図記号についての知識を問われています。\n●工程図記号\n工程図記号とは、製品の加工、運搬、検査などの各工程を視覚的に表現するための記号です。これにより、工程の流れや問題点を一目で把握することができます。一般的に工程図記号はJISで定められている下図の記号を用います。\n\n過去の本試験では、工程図記号から工程の種類を読み取らせる問題が出題されています。複合記号も併せて覚えておきましょう。\nア　×：　\n加工工程は１ヶ所です。４ヶ所あるのは運搬工程です。\n\nイ　〇：　\n品質検査を行う工程は１ヶ所です。\n\nウ　×：　\n工程図記号は工程を示しており、どのような運搬方法であるかを読み取ることはできません。\n\nエ　×：　\n滞留している工程は１ヶ所あります。"
  },
  {
    "id": 6,
    "title": "フロムツーチャート",
    "answer": "エ",
    "choices": [
      "ア　A→B→C→D→Eの順番に物が流れている。",
      "イ　Bの工程では仕掛品が滞留している。",
      "ウ　Cの工程は検査工程であることがわかる。",
      "エ　逆流している工程がある。"
    ],
    "source": "スマート問題集 3-5",
    "question": "下図はAからEまで5つの工程におけるフロムツーチャートを表している。このフロムツーチャートから読み取れる記述として、最も適切なものはどれか。\n（Fromは前工程を示し、Toは後工程を示す）",
    "explanation": "ここが重要\n本問ではフロムツーチャートについて問われています。\nフロムツーチャートは、工程間の物の流れを分析する手法で、入流出図表とも呼ばれます。各工程の間でどれぐらいの物量が流れているかを分析することができます。\nフロムツーチャートの表は、縦がFROMである前工程を表し、横はTOである後工程を表します。表中の数値は、FROMの工程からTOの工程に流れた運搬数量や距離などが示されます。\n\nア　×：　\nAから全ての工程に物が流れていますが、A→B→C→D→Eの順番には流れていません（工程Cから工程Dへ物の流れがありません）。よって不適切な記述です。\n\nイ　×：　\nフロムツーチャートでは、仕掛品の滞留は読み取れません。よって不適切な記述です。\n\nウ　×：　\nフロムツーチャートでは、工程の種類は読み取れません。よって不適切な記述です。\n\nエ　○：　\n逆流とは、後工程から前工程の物の流れを指します。フロムツーチャートを確認すると、工程Cから工程Bへ逆流が発生しています。よって適切な記述です。"
  },
  {
    "id": 7,
    "title": "運搬分析",
    "answer": "イ",
    "choices": [
      "ア　マテリアルハンドリングとは、原材料、仕掛品、完成品などの、運搬や取扱いに関することである。",
      "イ　台記号における平（ひら）は、物が床や台の上にひら置きされている状態で、活性示数は1である。",
      "ウ　加工する材料を資材倉庫に取りに行く作業は、空運搬に該当する。",
      "エ　配置式運搬工程分析は、レイアウト図の上に運搬工程記号を記入して、運搬の流れを分析する手法である。"
    ],
    "source": "スマート問題集 3-5",
    "question": "運搬分析に関する記述として、最も不適切なものはどれか。",
    "explanation": "ここが重要\n　本問では運搬分析の内容が問われています。\n　IE全体における、運搬分析の位置づけは次のようになっており、主な手法として、運搬工程分析、運搬活性分析、空運搬分析があります。運搬自体は、付加価値を生まないため、できるだけ削減したり、効率化することが重要です。\n\n　運搬分析に関する具体的な内容は次のようになります。\n●運搬工程分析記号\n　運搬分析においても、工程分析と同様に運搬の工程を表すために次のような記号を用いて分析を行います。\n\n●運搬工程分析の種類\n　上記の運搬分析記号を使って物の移動を表現します。分析方法として、直線式運搬工程分析と、配置式運搬工程分析があります。\n・直線式運搬工程分析：製品工程分析のように、直線的に運搬の流れを記号で表し、運搬の流れや問題点を分析します。\n・配置式運搬工程分析：レイアウト図の上に運搬工程記号を記入して、レイアウトや運搬距離などの問題点を視覚的にわかりやすくして、運搬の流れを分析します。\n●空運搬分析\n　空運搬とは、物の移動を伴わずに、人や運搬機器のみが移動することです。空運搬分析では、空運搬の割合を表すために、次の式で示す空運搬係数を計算します。空運搬係数を、できるだけ小さくするため、人のみの移動を極力減らす必要があります。 (空運搬係数 ＝ 空運搬距離 ÷ 品物の移動距離)\n\n　活性化示数は0から始まり、平の状態が最も低く活性度が0になります。間違えやすいので注意しましょう。尚、運搬活性分析については、次の問題で詳しく解説します。\nア　○：\n　生産拠点内や物流拠点内における、物の運搬や取り扱いのことを、マテリアルハンドリング、略してマテハンと呼びます。よって記述は適切です。\n\nイ　×：\n　平の状態における記述は正しいです。しかし、活性化示数は最も低い0になります。運搬活性分析では、運搬のしやすさを表す数値として0～4の活性示数を使用します。よって記述は不適切です。\n\nウ　○：\n　空運搬とは、物の移動を伴わずに、人や運搬機器のみが移動することです。選択肢の記述にあるような、何も付加価値を生まない人の移動は空運搬に該当します。よって記述は適切です。\n\nエ　○：\n　配置式運搬工程分析では、流れ線図のように、レイアウト図の上に運搬工程記号を記入することで、レイアウトや運搬距離などの問題点を視覚的にわかりやすくします。よって記述は適切です。"
  },
  {
    "id": 8,
    "title": "運搬活性分析",
    "answer": "ア",
    "choices": [
      "ア　2.4",
      "イ　3.5",
      "ウ　4.4",
      "エ　5.5"
    ],
    "source": "スマート問題集 3-5",
    "question": "次に示す工程の平均活性示数の値として、最も適切なものはどれか。\n①鉄の棒材が床に平置き。\n②搬送用の箱に鉄の棒材を入れる。\n③パレットに搬送用の箱を乗せる。\n④フォークリフトでパレットを運ぶ。\n⑤トラックにパレットを積み、加工工場に運ぶ。\n⑥フォークリフトでパレットを降ろす。\n⑦パレットを所定場所に置く。",
    "explanation": "ここが重要\n　本問では具体例から平均活性示数を算出することが求められています。\n　運搬活性分析では、運搬のしやすさについて活性示数を用いて表し、どれぐらい運搬がしやすい状態になっているかを明らかにします。平均活性示数とは工程全体の運搬のしやすさの平均値となります。運搬活性分析の具体的な内容は次のようになります。\n●活性示数\n　運搬のしやすさを表す数値で、活性示数面は、0から4の間の数値を取ります。これは、物を移動するときに、既に省かれている手間の数を表します。この手間の種類は、①まとめる②起こす③持ち上げる④持っていく、の4つです。具体的には次のようになります。\n\n●運搬活性分析図\n　活性示数を使って運搬の工程を表したのが、運搬活性分析図です。次のように、運搬の工程ごとの活性示数をグラフで表すことで、運搬活性が低い工程が一目でわかります。\n\n●平均活性示数\n　工程全体の平均活性示数は次の式で求められます。\n平均活性示数＝ 工程の活性示数の合計 ÷ 工程数\n\n　平均活性示数については、各活性示数の状態を覚えていれば簡単に回答できます。繰返しになりますが、活性示数は既に省かれている手間の数を表し、平の状態が最も低く0になります。間違えないように注意しましょう。\n正解：ア　2.4\n本問の①～⑦の状態を活性示数は、それぞれ次のようになります。\n\n　この中で④～⑥は少し判断に迷ったかもしれません。既に動いている状態は最も活性度が高い4となります。以上を踏まえると活性示数の合計が17、工程数が7ですから、平均活性示数は「17÷7」より約2.4となります。よって正解はアとなります。"
  },
  {
    "id": 9,
    "title": "マテリアルハンドリング",
    "answer": "エ",
    "choices": [
      "ア　平均活性示数は、停滞工程の活性示数の合計を停滞工程数で除した値として求められる。",
      "イ　マテリアルハンドリングによって、運搬の自動化や効率化が図れるようになる。",
      "ウ　運搬管理の改善には、レイアウトの改善、運搬方法の改善、運搬制度の改善がある。",
      "エ　運搬活性示数は、置かれている物品を運び出すために必要となる取り扱いの手間の数を示している。"
    ],
    "source": "スマート問題集 3-5",
    "question": "マテリアルハンドリングに関する記述として、最も不適切なものはどれか。",
    "explanation": "ここが重要\n　本問ではマテリアルハンドリングについて問われています。\n　物の運搬や取り扱いのことを、マテリアルハンドリングと言います。略してマテハンと呼ばれることがあります。一般的に、マテリアルハンドリングは輸送機械や自動化装置を指す場合が多いですが、こういった運搬に関して自動化することで運搬を効率化することができます。\nア　○：\n　平均活性示数は、停滞工程の活性示数の合計を停滞工程数で割った値として求めることができます。値が小さいほど物の置き方が非効率であり、移動のために多くの手間を要することになります。よって記述は適切です。\n\nイ　○：\n　マテリアルハンドリングによって、運搬の自動化や効率化が図れるようになります。よって記述は適切です。\n\n- ウ　○：\n　運搬管理を改善するには、非効率な部分をなくすことが必要になります。具体的には、レイアウトの変更、運搬方法の改善、運搬制度の改善があります。これらの改善に取り組むことによって、運搬の効率化が図れるようになります。よって記述は適切です。\n\nエ　×：\n　運搬活性示数は、物を移動するときに「すでに省かれている手間の数」を表し、０から４の間の数値を取ります。例えば、活性示数０は、床にバラ置きしてあるものを運搬する状態のことを指します。活性示数１は、箱に入っているものを運搬する状態のことで、まとめるという手順を省くことができます。このように、活性示数は大きいほうが効率的に運搬している状態となります。よって記述は不適切であり、これが正解です。"
  },
  {
    "id": 10,
    "title": "動作研究",
    "answer": "イ",
    "choices": [
      "ア　マイクロモーション分析により、通常より遅いスピードで撮影すると気がつかない無駄な動きを発見できる。",
      "イ　連合作業分析により、作業者の多工程持ちや、適正な配置人員を検討できる。",
      "ウ　メモモーション分析は、通常よりも早いスピードで撮影することで、細かい動作が分析できる。",
      "エ　サーブリッグ分析の第1類に分類される作業は、必要のない動作である。"
    ],
    "source": "スマート問題集 3-5",
    "question": "動作研究に関する記述として、最も適切なものはどれか。",
    "explanation": "ここが重要\n　本問では動作研究のいくつかの分析手法の内容が問われています。\n　IE全体における、動作研究の位置づけは次のようになっており、作業者の動作を詳細に分析することで、作業者の無駄な動きをなくしたり、最適な動作を検討していきます。\n\n各分析手法の具体的な内容は次のようになります。\n●サーブリッグ分析\n・概要：作業者の動作を18の基本動作に分解して、微動作を分析。\n・分析内容：18の基本動作を、次の3つに分類して分類毎の改善を図る。\n\n●両手動作分析\n・概要：作業者の両手の動作を分析。\n・分析内容：作業者の動作プロセスごとの、左手と右手の動きを工程図記号などを使って表し分析する。左右のバランスを取ったり、無駄な動きを排除する。\n●VTR分析\n・概要：作業をビデオなどで撮影し、再生することで作業を分析。\n・分析内容：スロー再生やコマ送りなどで、動作を細かく分析する。\n●メモモーション分析\n・概要：通常よりも遅いスピードで撮影し、高速再生して作業を分析。\n・分析内容：高速再生することで、ゆっくり再生すると気がつかない無駄な動きなどを分析する。\n●マイクロモーション分析\n・概要：通常よりも早いスピードで撮影し、スロー再生して作業を分析。\n・分析内容：ゆっくり再生することで、細かい動作を分析する。\n●連合作業分析\n・概要：作業者と機械、2人以上の作業者が共同（連合）して行う、作業の状況を分析。\n・分析内容：作業者と機械の連合作業では、作業者と機械の関連する作業を時系列で記録したマン・マシンチャートを用いて、作業者の手待ちや機械の稼働状況などを分析する。ムダが発生していれば、作業順序を変更したり、多工程持ちなどを検討し、配置人員を適正にする。\n\n　動作研究に関する問題は過去に何度か出題されています。各分析手法の内容をしっかりと理解しましょう。メモモーションとマイクロモーションが混乱する場合、「マイクロモーション：高速撮影、ゆっくり再生、細かい動作確認」のように、どちらか一方を確実に覚えておくとよいでしょう。\nア　×：\n　選択肢の記述は、メモモーション分析に関する内容です。マイクロモーション分析では、通常よりも早いスピードで撮影し、ゆっくり再生します。遅いスピードで再生することで、細かい動作を分析するのが狙いです。よって記述は不適切です。\n\nイ　○：\n　連合作業分析により、作業者の手待ちや、機械の稼働状況などを把握することで、作業者の多工程持ちや、配置人員の削減を検討することができます。よって記述は適切です。\n\nウ　×：\n　選択肢の記述は、マイクロモーション分析に関する内容です。メモモーション分析では、通常よりも遅いスピードで撮影し、高速に再生します。高速に再生することで、ゆっくり再生すると気がつかない無駄な動きなどを発見するのが狙いです。よって記述は不適切です。\n\nエ　×：\n　サーブリッグ分析で、「必要のない動作」に分類されるのは、第3類です。第1類は、「作業の基本となる動作」です。よって記述は不適切です。"
  },
  {
    "id": 11,
    "title": "動作経済の原則",
    "answer": "イ",
    "choices": [
      "ア　作業台の上に置いて使用していた電動ドライバを、伸縮ロープに付けて天井から吊るすようにした。",
      "イ　手が疲れないよう、両手を同時に使う作業を極力減らすように組み立て手順を検討した。",
      "ウ　使用する工具の形状にくり抜いたマットを用意して、マット上に使う工具を順番に並べた。",
      "エ　横にいる次工程の作業者に加工品を手渡す際に、真横ではなく、少し前に置くように作業指導した。"
    ],
    "source": "スマート問題集 3-5",
    "question": "次の作業改善を、動作経済 of 原則に照らした場合、最も不適切なものはどれか。",
    "explanation": "ここが重要\n　本問では動作経済の原則について問われています。\n　動作経済の原則は、疲労を少なくして、できるだけ少ないエネルギーで楽に作業をするための原則です。この原則には次のような内容があります。\n\n　動作経済の原則について問われた時には、「動きが自然で疲労が少ないか」「無駄がないか」という観点で考えると良いでしょう。\nア　○：\n　工具や設備に関する原則に「手で保持する代わりに工具などで保持すること」があります。机にドライバが置いてある場合、使用時に持ち上げたり、使用中に保持する力が必要になります。天井からドライバを吊るすことで、これらの動作を排除したり、緩和することができます。よって記述は適切です。\n\n- イ　×：\n　身体の動作に関する原則に、「両手を同時かつ左右対称的に動かすこと」があります。両手を同時に動かすことで生産性を高める狙いと、動作を対照的に進めることで、保持・手待ちなどを解消してリズミカルな動作にする狙いがあります。よって記述は不適切です。\n\nウ　○：\n　作業場の配置に関する原則に「材料や工具は作業順序に合わせて置くこと」があります。工具を所定の場所に安定した状態で置いたり、使う順番に並べたりすることで、工具を取りやすくしたり、探す手間を省くことができます。よって記述は適切です。\n\nエ　○：\n　作業場の配置の原則に、「物は手の届く範囲で体の前方に配置すること」があります。作業者の前に物を配置することで、作業がしやすくなります。また、手渡す側も真横に渡すより、前方に置く方が、動作が自然になります。よって記述は適切です。"
  },
  {
    "id": 12,
    "title": "稼働分析",
    "answer": "ウ",
    "choices": [
      "ア　連続観測法は、ワークサンプリングと比較して測定に手間がかかる。",
      "イ　稼働率は、「実際の稼働時間」を、「実際の稼働時間と非稼働時間の合計」で除して求めることができる。",
      "ウ　ワークサンプリングは、隠れて観測することで、作業者は観測されることを意識せず、偏りのないデータが取れる。",
      "エ　連続観測法は、非繰返しの作業の観測に適している。"
    ],
    "source": "スマート問題集 3-5",
    "question": "稼働分析の手法に関する記述として、最も不適切なものはどれか。",
    "explanation": "ここが重要\n　本問では稼働分析の内容が問われています。\n　IE全体における、稼働分析の位置づけは次のようになっています。稼働分析では、作業者や機械の作業効率や無駄な稼働を分析します。\n\n　実際に稼働状況を調査する方法には、大きく分けて、ワークサンプリングと連続観測法の2種類があり、具体的な内容は次のようになります。\n●ワークサンプリング\n　作業を瞬間的に観測して、稼働状況を統計的に求める方法です。時々観測を行い、その時の作業内容を記録して、最後に集計することで稼働内容や稼働率の分析を行います。この方法の特徴は次のようになります。\n\n●連続観測法（連続稼働分析）\n　観測対象に付きっ切りで観測する方法です。この方法の特徴は次のようになります。\n\n　ワークサンプリング（瞬間観測）、連続観測法（付き切り観測）と覚えておけば、特徴をイメージしやすいでしょう。\nア　○：\n　ワークサンプリングが作業を瞬間的に観測するのに対して、連続観測法は観測対象に付きっ切りで観測するため、測定に手間がかかります。よって記述は適切です。\n\nイ　○：\n　稼働率は、「稼働率 ＝ 実際稼働時間 ÷ 総時間」で求めることができます。ここで総時間は、「実際の稼働時間＋非稼働時間」となります。よって記述は適切です。\n\n- ウ　×：\n　ワークサンプリングは隠れて観測するわけではありません。作業を瞬間的に時々観測して、稼働状況を統計的に求めます。連続観測法が観測対象に付きっ切りで観測するのに対し、ワークサンプリングは瞬間的な観測であるため、作業者が観測されることを意識せず、偏りのないデータが取りやすいメリットがあります。よって記述は不適切です。\n\nエ　○：\n　連続観測法は観測対象に付きっ切りで観測するため、非繰返しの作業がある場合の観測に適しています。仮に、同じ作業をワークサンプリングで観測した場合、非繰返し作業が観測されない可能性があります。よって記述は適切です。"
  },
  {
    "id": 13,
    "title": "ワークサンプリング",
    "answer": "ウ",
    "choices": [
      "ア　ワークサンプリングは、瞬間的な観測のため深い分析に不向きである。",
      "イ　ワークサンプリングのメリットには、少ない労力で観測できる点が挙げられる。",
      "ウ　ワークサンプリングでは、1人の観測者が多くの観測対象を観測することが難しい。",
      "エ　ワークサンプリングは、連続観測法のように、観測対象に付きっきりになる必要がない。"
    ],
    "source": "スマート問題集 3-5",
    "question": "ワークサンプリングに関する記述として、最も不適切なものはどれか。",
    "explanation": "ここが重要\n　本問ではワークサンプリングのメリット、デメリット、連続観測法と比較した時の特徴などが問われています。\n　ワークサンプリングは、作業を瞬間的に観測して、稼働状況を統計的に求める方法です。この方法では、時々観測を行い、その時の作業内容を記録します。そして、最後に集計をすることで稼働内容や稼働率の分析を行います。\n●ワークサンプリングのメリット\n・少ない労力で観測できる\n・1人の観測者で多くの観測対象の観測ができる\n・作業者が観測されることを意識しないため、偏りが少ないデータが取れる\n●ワークサンプリングのデメリット\n・瞬間的な観測のため深い分析には不向きである\n・サンプル数が少ない場合に誤差が大きくなる\nア　○：\n　ワークサンプリングは、瞬間的な観測のため深い分析には向いていません。よって記述は適切です。\n\nイ　○：\n　ワークサンプリングは、時々観測を行うため、少ない労力で観測することができます。よって記述は適切です。\n\n- ウ　×：\n　ワークサンプリングでは、1人の観測者で多くの観測対象を観測することができます。よって記述は不適切です。\n\nエ　○：\n　ワークサンプリングは、連続観測法のように、観測対象に付きっきりになる必要がありません。その代わり、深い分析をすることが難しくなります。よって記述は適切です。"
  },
  {
    "id": 14,
    "title": "時間研究",
    "answer": "イ",
    "choices": [
      "ア　余裕時間のうち、機械を調整し、打合せをするなどの余裕は、人的余裕に含まれる。",
      "イ　標準時間は、正味時間と余裕時間の和で求められ、外掛け法で算出された余裕率を使う場合は、「標準時間 ＝ 正味時間 × （1＋余裕率）」によって計算される。",
      "ウ　標準時間は、「その仕事に習熟した作業者が」、「適切な所定の作業条件のもとで」、「必要な余裕を持ち」、作業するのに必要となる時間である。",
      "エ　作業時間を観測した作業者のペースが、基準より速い場合は、レイティング係数の値は100%よりも小さくなる。"
    ],
    "source": "スマート問題集 3-5",
    "question": "標準時間に関する記述として、最も適切なものはどれか。",
    "explanation": "ここが重要\n　本問では時間研究の内容が問われています。\n　IE全体における、時間研究の位置づけは次のようになっています。時間研究は、作業を分解し、各作業の標準時間を設定するための手法です。\n\n時間研究に関する具体的な内容は次のようになっています。\n●標準時間\n　標準時間の定義には、次の4つの条件があります。①習熟した作業者であること　②適切な所定の作業条件の元であること　③必要な余裕を持つこと　④正常な無理のない作業ペースで作業することです。この4つの条件を全て満たした時の、作業にかかる時間が、標準時間となります。\n　標準時間は図のように、「主体作業時間」と「準備段取り作業時間」から構成されます。標準時間を設定するには、作業測定などで時間を測定した上で、正味時間と余裕時間を合計する必要があります。このとき、余裕率とレイティングという考え方を用います。\n●余裕率\n　標準時間もしくは正味時間に占める、余裕時間の割合で、外掛け法と、内掛け法の2つの計算方法があります。\n・外掛け法\n　正味時間に対する余裕時間の割合で、次の式で求めます。\n余裕率＝ 余裕時間 ÷ 正味時間\n　また、外掛け法による余裕率を使って、標準時間を求める式は次になります。\n　標準時間 ＝ 正味時間 ×（１＋余裕率）\n・内掛け法\n　標準時間に対する余裕時間の割合で、次の式で求めます。\n余裕率＝ 余裕時間 ÷ 標準時間 ＝ 余裕時間 ÷ （正味時間＋余裕時間）\n　また、内掛け法による余裕率を使って、標準時間を求める式は次になります。\n標準時間＝ 正味時間 ÷ （1－余裕率）\n\n●レイティング\n　実際に観測した作業時間を、正味時間に修正することです。例えば、非常に作業が速い作業者を基に正味時間を設定すると、標準作業時間としては不適切になるため、標準的な作業者の時間に修正する必要があります。これがレイティングです。\n　レイティング係数は、基準とする作業ペースを100%とした場合の、その作業者の作業ペースで、この係数を用いて正味時間を次のように計算します。\n正味時間 ＝ 観測時間の基準値 × レイティング係数\n\nア　×：\n　人的余裕に含まれるのは、休憩やトイレに行くなど人間的な要素で必要な余裕です。選択肢の記述にあるような、作業の管理に必要な余裕は、管理余裕になります。よって記述は不適切です。\n\n- イ　○：\n　外掛け法による余裕率は、正味時間に対する余裕時間の割合です。このため、「余裕時間 ＝ 正味時間 × 余裕率」 となります。また、「標準時間 ＝ 正味時間 ＋余裕時間」となりますから、この式に最初の式を代入すると、「標準時間 ＝ 正味時間 ×（1＋余裕率）」となります。よって記述は適切です。\n\nウ　×：\n　標準時間を設定する際は、選択肢の記述に対して「正常な無理のない作業ペースで作業する」を加えた、4つの条件が必要になります。これら4つの条件を全て満たした上で作業にかかる時間が、標準時間となります。よって記述は不適切です。\n\nエ　×：\n　レイティング係数は、基準とする作業ペースを100%とした場合の、作業者の作業ペースです。基準値より作業者のペースが速い場合は、レイティングは100%より大きくなります。よって記述は不適切です。"
  },
  {
    "id": 15,
    "title": "標準時間の設定法",
    "answer": "エ",
    "choices": [
      "ア　ストップウォッチ法を用いて標準時間を設定する際は、レイティング操作を行う必要がある。",
      "イ　標準時間資料法は、作業時間のデータを分類・整理した図表などを用いて標準時間を設定する方法である。",
      "ウ　実績資料法では、過去のデータを基礎として標準時間を設定する方法で、個別生産でよく利用される。",
      "エ　PTS法は、繰返しの少ない作業の標準時間の設定に適しており、標準時間の設定も容易にできる。"
    ],
    "source": "スマート問題集 3-5",
    "question": "標準時間を設定する手法に関する記述として、最も不適切なものはどれか。",
    "explanation": "ここが重要\n　本問ではいくつかの標準時間の設定法について問われています。\n　具体的な標準時間の設定法については、次のような手法があります。\n●ストップウォッチ法\n　作業の要素ごとにストップウォッチで時間を測定し、レイティングを行って標準時間を設定する方法です。また余裕率については、ワークサンプリング法などで求めます。\n●実績資料法\n　過去の実績から標準時間を見積る方法です。この方法は、新たに測定の必要が無いため手間があまりかからないメリットはありますが、精度が低いというデメリットがあります。\n●標準時間資料法\n　直接時間を観測せずに、あらかじめ用意しておいた作業要素別の標準時間を合計することで、標準時間を合成する方法です。この方法は、毎回観測をせずに標準時間を求めることができるメリットがあります。ただし、事前に細かい作業単位で標準時間を定めておく必要があります。\n●PTS法（Predetermined Time Standard System）\n　動作を微動作（サーブリッグ）のレベルに分解し、あらかじめ定められた微動作ごとの標準時間を合計する方法です。この方法は、標準時間資料法より、さらに細かい微動作まで分解するのが特徴です。\n\n　これらの標準時間の設定法のうち、ストップウォッチ法は直接時間を測定するため、レイティングが必要となります。一方、残りの方法は、時間を測定せずに資料から間接的に標準時間を求めるため、レイティングは不要です。\n\nア　○：\n　ストップウォッチ法では、作業の要素ごとにストップウォッチで計測した値にレイティングして正味時間を求め、余裕時間を付加して標準時間を設定します。よって記述は適切です。\n\nイ　○：\n　標準時間資料法は、直接時間を観測せずに、あらかじめ用意しておいたデータや作業要素別の標準時間を用いて、標準時間を合成する方法です。よって記述は適切です。\n\nウ　○：\n　実績資料法は、過去の実績から標準時間を見積もる方法で、個別生産でよく利用されます。比較的容易に標準時間を設定できる一方で、見積もり精度は低くなる傾向にあります。よって記述は適切です。\n\n- エ　×：\n　PTS法は、動作を微動作（サーブリッグ）のレベルに分解し、あらかじめ定められた微動作ごとの標準時間を合計する方法です。作業者を直接計測する必要がなく、繰返しの多い作業の標準時間の設定に適しています。一方で、作業を微動作レベルまで分析する必要があるため、手間がかかります。よって記述は不適切です。"
  },
  {
    "id": 16,
    "title": "余裕率",
    "answer": "エ",
    "choices": [
      "ア　内掛け法の余裕率：25％",
      "イ　内掛け法の余裕率：80％",
      "ウ　外掛け法の余裕率：20％",
      "エ　外掛け法の余裕率：25％",
      "オ　外掛け法の余裕率：80％"
    ],
    "source": "スマート問題集 3-5",
    "question": "ある製造工程における作業時間のデータが以下の通り与えられている。この作業に対する余裕率の値として、最も適切なものはどれか。\n\n正味時間：16分\n余裕時間：4分\n標準時間：20分",
    "explanation": "ここが重要\n本問では余裕率を求める知識が問われています。\n●余裕率\n余裕率とは、正味時間あるいは標準時間に対する余裕時間の割合です。内掛け法と外掛け法があります。内掛け法は、標準時間に対する余裕時間の割合で、外掛け法は正味時間に対する余裕時間の割合です。\nそれぞれ次の公式で求めます。\n内掛け法の余裕率 ＝ 余裕時間 ÷ 標準時間（標準時間は正味時間＋余裕時間）\n外掛け法の余裕率 ＝ 余裕時間 ÷ 正味時間\n\n余裕率の計算問題は過去の本試験でも定期的に出題されています。外掛け法と内掛け法の両方とも計算できるようにしておきましょう。\n本問の余裕率はそれぞれ次の通りです。\n内掛け法の余裕率：余裕時間÷標準時間＝4分÷20分＝20％\n外掛け法の余裕率：余裕時間÷正味時間＝4分÷16分＝25％\nしたがって、選択肢エが正解です。"
  }
];

// ==========================================
// メインアプリケーションコンポーネント
// ==========================================
export default function App() {
  const [userId, setUserId] = useState("");
  const [inputUserId, setInputUserId] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFirebaseReady, setIsFirebaseReady] = useState(false);
  const [loading, setLoading] = useState(false);

  // クイズ状態
  const [screen, setScreen] = useState("login"); // "login", "dashboard", "quiz", "result"
  const [progressMode, setProgressMode] = useState("all"); // "all", "wrong", "review"
  const [currentQuizQuestions, setCurrentQuizQuestions] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswerIdx, setSelectedAnswerIdx] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Firestore / ローカル同期状態
  const [history, setHistory] = useState({}); // { [questionId]: { correct: bool, timestamp: number } }
  const [reviews, setReviews] = useState({}); // { [questionId]: bool }

  // 途中再開モーダル状態
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [pendingProgress, setPendingProgress] = useState(null);

  // screenRefによる途中再開ダイアログの割り込み防止ガードレール
  const screenRef = useRef(screen);
  useEffect(() => {
    screenRef.current = screen;
  }, [screen]);

  // 初回ロード制御用 Ref
  const isFirstLoad = useRef(true);
  useEffect(() => {
    isFirstLoad.current = true;
  }, [userId]);

  const labels = ["ア", "イ", "ウ", "エ", "オ"];

  // 匿名認証の実行
  useEffect(() => {
    const initAuth = async () => {
      try {
        const auth = getAuth(app);
        await signInAnonymously(auth);
        setIsFirebaseReady(true);
        console.log("Firebase anonymous authentication successful.");
      } catch (error) {
        console.error("Firebase initialization/auth failed:", error);
        // オフラインまたは通信障害時でもローカル機能を提供するためReadyにする
        setIsFirebaseReady(true);
      }
    };
    initAuth();
  }, []);

  // リアルタイム進捗監視 (onSnapshot) と screenRef ガードレール
  useEffect(() => {
    if (!userId || !isAuthenticated) return;
    
    console.log("Starting onSnapshot listener for user:", userId);
    const docRef = doc(db, "user_progress", `${APP_ID}_${userId}`);
    
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        const parsedProgress = {
          progressIndex: Number(data.progressIndex || 0),
          progressMode: data.progressMode || "all",
          history: data.history || {},
          reviews: data.reviews || {}
        };

        console.log("onSnapshot update received:", parsedProgress);

        // 【重要】初回ロード判定かつ画面がダッシュボードのときのみ途中再開モーダルをトリガー
        if (isFirstLoad.current && screenRef.current === "dashboard") {
          isFirstLoad.current = false;
          if (parsedProgress.progressIndex > 0) {
            setPendingProgress(parsedProgress);
            setShowResumeModal(true);
            // 状態自体はマージのみしておき、モーダル選択を待つ
            setHistory(parsedProgress.history);
            setReviews(parsedProgress.reviews);
            return;
          }
        }

        // クイズ解答中 (screen !== "dashboard") や再開不要な場合は、ダイアログを出さずに進捗（履歴・要復習）のみ同期
        setHistory(parsedProgress.history);
        setReviews(parsedProgress.reviews);
        
        // ローカルストレージに最新状態をキャッシュ
        localStorage.setItem(`progress_${APP_ID}_${userId}`, JSON.stringify(parsedProgress));
      }
    }, (error) => {
      console.error("onSnapshot listener error:", error);
    });

    return () => unsubscribe();
  }, [userId, isAuthenticated]);

  // Firestore / LocalStorage への進捗保存ヘルパー
  const saveProgress = async (uid, updatedIndex, updatedMode, updatedHistory, updatedReviews) => {
    const data = {
      progressIndex: updatedIndex,
      progressMode: updatedMode,
      history: updatedHistory,
      reviews: updatedReviews,
      lastUpdated: Date.now()
    };

    // ローカルストレージに即時保存
    localStorage.setItem(`progress_${APP_ID}_${uid}`, JSON.stringify(data));

    // Firestoreへの書き込み
    try {
      const docRef = doc(db, "user_progress", `${APP_ID}_${uid}`);
      await setDoc(docRef, data, { merge: true });
      console.log("Progress saved to Firestore:", data);
    } catch (e) {
      console.error("Failed to save progress to Firestore:", e);
    }
  };

  // ログイン (合言葉入力と初期フェッチ)
  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    if (!inputUserId.trim()) return;

    setLoading(true);
    const uid = inputUserId.trim();
    console.log("Logging in with AppId/UserId:", APP_ID, uid);

    let initialData = {
      progressIndex: 0,
      progressMode: "all",
      history: {},
      reviews: {}
    };

    // 1. ローカルキャッシュの読み込み
    try {
      const local = localStorage.getItem(`progress_${APP_ID}_${uid}`);
      if (local) {
        initialData = JSON.parse(local);
        console.log("Loaded cached data from LocalStorage:", initialData);
      }
    } catch (err) {
      console.error("Failed to parse local storage cache", err);
    }

    // 2. Firestoreからのデータフェッチ (履歴復元)
    try {
      const docRef = doc(db, "user_progress", `${APP_ID}_${uid}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const dbData = docSnap.data();
        initialData = {
          progressIndex: dbData.progressIndex !== undefined ? dbData.progressIndex : initialData.progressIndex,
          progressMode: dbData.progressMode || initialData.progressMode,
          history: dbData.history || initialData.history,
          reviews: dbData.reviews || initialData.reviews
        };
        console.log("Fetched progress from Firestore:", initialData);
      } else {
        // 新規ユーザーの場合は初期オブジェクトでドキュメント作成
        await setDoc(docRef, initialData);
        console.log("Created new progress document in Firestore.");
      }
    } catch (err) {
      console.error("Firestore fetch failed, using cached/local data:", err);
    }

    // ステートに同期
    setUserId(uid);
    setHistory(initialData.history);
    setReviews(initialData.reviews);
    
    // ガードレールのトリガー用にペンディングデータを準備
    if (initialData.progressIndex > 0) {
      setPendingProgress(initialData);
    }

    // すべての読み込み完了をもって初めて認証フラグを true に変更 (フライング防止)
    setIsAuthenticated(true);
    setScreen("dashboard");
    setLoading(false);
  };

  // クイズ開始処理
  const startQuiz = (mode) => {
    setProgressMode(mode);
    let questionsList = [];

    if (mode === "all") {
      questionsList = [...QUESTIONS];
    } else if (mode === "wrong") {
      questionsList = QUESTIONS.filter(q => history[q.id]?.correct === false);
    } else if (mode === "review") {
      questionsList = QUESTIONS.filter(q => reviews[q.id] === true);
    }

    if (questionsList.length === 0) {
      alert("該当する問題がありません。別モードを選択してください。");
      return;
    }

    setCurrentQuizQuestions(questionsList);
    setCurrentQuizIndex(0);
    setSelectedAnswerIdx(null);
    setIsAnswered(false);
    setScreen("quiz");

    // 開始時の進捗インデックス0を保存
    saveProgress(userId, 0, mode, history, reviews);
  };

  // 途中再開の実行
  const handleResume = () => {
    if (!pendingProgress) return;
    const { progressIndex, progressMode } = pendingProgress;

    console.log("Resuming from index/mode:", progressIndex, progressMode);
    
    let questionsList = [];
    if (progressMode === "all") {
      questionsList = [...QUESTIONS];
    } else if (progressMode === "wrong") {
      questionsList = QUESTIONS.filter(q => pendingProgress.history[q.id]?.correct === false);
    } else if (progressMode === "review") {
      questionsList = QUESTIONS.filter(q => pendingProgress.reviews[q.id] === true);
    }

    if (questionsList.length === 0 || progressIndex >= questionsList.length) {
      console.log("Invalid resume index, fallback to dashboard.");
      setShowResumeModal(false);
      return;
    }

    setCurrentQuizQuestions(questionsList);
    setCurrentQuizIndex(progressIndex);
    setSelectedAnswerIdx(null);
    setIsAnswered(false);
    setProgressMode(progressMode);
    setScreen("quiz");
    setShowResumeModal(false);
  };

  // 途中再開を拒否して最初から始める処理
  const handleRestart = () => {
    console.log("Restarting progress. Index reset to 0.");
    setShowResumeModal(false);
    setPendingProgress(null);
    saveProgress(userId, 0, progressMode, history, reviews);
  };

  // 解答選択アクション (解答したタイミングで即座に保存)
  const handleAnswerSelect = (idx) => {
    if (isAnswered) return;
    setSelectedAnswerIdx(idx);
    setIsAnswered(false); // 回答済み演出のトリガー

    const currentQuestion = currentQuizQuestions[currentQuizIndex];
    const isCorrect = labels[idx] === currentQuestion.answer;

    // 履歴更新
    const updatedHistory = {
      ...history,
      [currentQuestion.id]: {
        correct: isCorrect,
        timestamp: Date.now()
      }
    };
    setHistory(updatedHistory);
    setIsAnswered(true);

    // 次に進むべき問題インデックスを算出
    const nextIndex = currentQuizIndex + 1;
    const isLast = nextIndex >= currentQuizQuestions.length;
    const saveIndex = isLast ? 0 : nextIndex; // 完走した場合は0にリセット

    // 進捗のリアルタイムFirestore保存
    saveProgress(userId, saveIndex, progressMode, updatedHistory, reviews);
  };

  // 次の問題へ
  const handleNext = () => {
    if (currentQuizIndex === currentQuizQuestions.length - 1) {
      // 全問完走
      saveProgress(userId, 0, progressMode, history, reviews);
      setScreen("result");
    } else {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setSelectedAnswerIdx(null);
      setIsAnswered(false);
    }
  };

  // 要復習チェックボックス切り替え
  const toggleReview = (questionId) => {
    const updatedReviews = {
      ...reviews,
      [questionId]: !reviews[questionId]
    };
    setReviews(updatedReviews);
    saveProgress(userId, currentQuizIndex, progressMode, history, updatedReviews);
  };

  // ホーム（ダッシュボード）に戻るアクション
  const handleGoHome = () => {
    // 途中インデックスの保存
    saveProgress(userId, currentQuizIndex, progressMode, history, reviews);
    setScreen("dashboard");
    console.log("Returned to dashboard. Progress index saved:", currentQuizIndex);
  };

  // 学習指標データの計算 (レーダーチャート用)
  const statsData = (() => {
    const total = QUESTIONS.length;
    const solved = QUESTIONS.filter(q => history[q.id] !== undefined).length;
    const corrects = QUESTIONS.filter(q => history[q.id]?.correct === true).length;
    
    const overallProgress = Math.round((solved / total) * 100) || 0;
    const accuracyOfAll = Math.round((corrects / total) * 100) || 0;
    const precision = solved > 0 ? Math.round((corrects / solved) * 100) : 0;

    // カテゴリ1: 方法研究 (問題1〜11)
    const cat1Questions = QUESTIONS.filter(q => q.id <= 11);
    const cat1Solved = cat1Questions.filter(q => history[q.id] !== undefined).length;
    const cat1Progress = Math.round((cat1Solved / cat1Questions.length) * 100) || 0;

    // カテゴリ2: 作業測定 (問題12〜16)
    const cat2Questions = QUESTIONS.filter(q => q.id >= 12);
    const cat2Solved = cat2Questions.filter(q => history[q.id] !== undefined).length;
    const cat2Progress = Math.round((cat2Solved / cat2Questions.length) * 100) || 0;

    return [
      { subject: "総合進捗率", A: overallProgress, fullMark: 100 },
      { subject: "全問正解率", A: accuracyOfAll, fullMark: 100 },
      { subject: "回答正確性", A: precision, fullMark: 100 },
      { subject: "方法研究進捗", A: cat1Progress, fullMark: 100 },
      { subject: "作業測定進捗", A: cat2Progress, fullMark: 100 }
    ];
  })();

  // 認証前画面 (合言葉入力)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex justify-center items-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-black bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">
              3-5 スマート問題集
            </h1>
            <p className="text-xs text-slate-400">IE (Industrial Engineering) 演習システム</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">合言葉 (ユーザーID)</label>
              <input
                type="text"
                placeholder="合言葉を入力してください..."
                value={inputUserId}
                onChange={(e) => setInputUserId(e.target.value)}
                disabled={loading || !isFirebaseReady}
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none transition disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !inputUserId.trim() || !isFirebaseReady}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-xs rounded-xl shadow-lg transition active:scale-95 disabled:opacity-50 disabled:scale-100 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <span className="flex items-center space-x-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>同期中...</span>
                </span>
              ) : (
                <>
                  <span>ログイン・同期開始</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {!isFirebaseReady && (
            <div className="text-center text-[10px] text-slate-500 animate-pulse">
              Firebase初期化中...
            </div>
          )}
        </div>
      </div>
    );
  }

  // ==========================================
  // A. ダッシュボード画面
  // ==========================================
  if (screen === "dashboard") {
    const wrongCount = QUESTIONS.filter(q => history[q.id]?.correct === false).length;
    const reviewCount = QUESTIONS.filter(q => reviews[q.id] === true).length;

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 pb-20">
        <header className="max-w-4xl mx-auto flex items-center justify-between pb-6 border-b border-slate-900">
          <div className="space-y-1">
            <h1 className="text-lg font-black text-slate-100 flex items-center space-x-2">
              <span className="bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded text-[10px] font-bold">Smart</span>
              <span>IE スマート演習</span>
            </h1>
            <p className="text-[10px] text-slate-400 flex items-center space-x-1">
              <User className="w-3 h-3 text-indigo-400" />
              <span>同期ID: {userId}</span>
            </p>
          </div>
          <button
            onClick={() => {
              setIsAuthenticated(false);
              setUserId("");
              setInputUserId("");
            }}
            className="text-[10px] text-slate-400 hover:text-slate-200 border border-slate-800 bg-slate-900/40 px-3 py-1.5 rounded-lg transition"
          >
            ログアウト
          </button>
        </header>

        <main className="max-w-4xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 進捗レーダーチャート */}
          <div className="md:col-span-1 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-4">
            <div className="space-y-1">
              <h2 className="text-xs font-bold text-slate-200 flex items-center space-x-1.5">
                <BarChart2 className="w-4 h-4 text-indigo-400" />
                <span>学習進捗レーダー</span>
              </h2>
              <p className="text-[9px] text-slate-500">分野別正解率および進捗度を表します</p>
            </div>
            
            <div className="w-full h-48 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" radius="70%" data={statsData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 8 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#475569', fontSize: 6 }} />
                  <Radar name="進捗" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-[10px] border-t border-slate-850 pt-3">
              <div className="bg-slate-950/40 p-2 rounded-lg border border-slate-850">
                <p className="text-slate-500">方法研究進捗</p>
                <p className="text-sm font-bold font-mono text-indigo-400">{statsData[3].A}%</p>
              </div>
              <div className="bg-slate-950/40 p-2 rounded-lg border border-slate-850">
                <p className="text-slate-500">作業測定進捗</p>
                <p className="text-sm font-bold font-mono text-indigo-400">{statsData[4].A}%</p>
              </div>
            </div>
          </div>

          {/* モード選択 & 問題リスト */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
              <h2 className="text-xs font-bold text-slate-200 flex items-center space-x-1.5">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>出題モードを選択</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => startQuiz("all")}
                  className="p-4 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-900 transition flex flex-col items-center justify-center space-y-1 shadow-sm active:scale-95 group"
                >
                  <span className="font-bold text-xs text-slate-200 group-hover:text-indigo-400">すべての問題</span>
                  <span className="text-[10px] text-slate-500 font-mono">16問収録</span>
                </button>

                <button
                  onClick={() => startQuiz("wrong")}
                  disabled={wrongCount === 0}
                  className="p-4 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-900 transition flex flex-col items-center justify-center space-y-1 shadow-sm active:scale-95 group disabled:opacity-50 disabled:scale-100"
                >
                  <span className="font-bold text-xs text-red-400">前回不正解のみ</span>
                  <span className="text-[10px] text-slate-500 font-mono">{wrongCount}問該当</span>
                </button>

                <button
                  onClick={() => startQuiz("review")}
                  disabled={reviewCount === 0}
                  className="p-4 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-900 transition flex flex-col items-center justify-center space-y-1 shadow-sm active:scale-95 group disabled:opacity-50 disabled:scale-100"
                >
                  <span className="font-bold text-xs text-yellow-400">要復習のみ</span>
                  <span className="text-[10px] text-slate-500 font-mono">{reviewCount}問該当</span>
                </button>
              </div>
            </div>

            {/* 問題進捗状況一覧 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
              <h2 className="text-xs font-bold text-slate-200">問題進捗グリッド</h2>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {QUESTIONS.map((q) => {
                  const hasHistory = history[q.id] !== undefined;
                  const isCorrect = history[q.id]?.correct === true;
                  const isReview = reviews[q.id] === true;

                  let badgeColor = "bg-slate-950 text-slate-600 border border-slate-850";
                  if (hasHistory) {
                    badgeColor = isCorrect
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-red-500/10 text-red-400 border border-red-500/20";
                  }

                  return (
                    <div
                      key={q.id}
                      className={`relative py-3 rounded-lg flex flex-col items-center justify-center font-bold text-xs font-mono shadow-inner ${badgeColor}`}
                    >
                      <span>{q.id}</span>
                      {isReview && (
                        <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>

        {/* 途中再開案内モーダル */}
        {showResumeModal && pendingProgress && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex justify-center items-center p-4 z-50">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl max-w-sm w-full space-y-4">
              <div className="flex items-center space-x-2 text-indigo-400">
                <HelpCircle className="w-5 h-5" />
                <h3 className="font-bold text-sm text-slate-100">学習の中断データがあります</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                前回は【問題 {pendingProgress.progressIndex + 1}】まで進んでいます。<br/>
                中断したモード（{pendingProgress.progressMode === "all" ? "すべての問題" : pendingProgress.progressMode === "wrong" ? "不正解のみ" : "要復習のみ"}）の続きから再開しますか？
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleRestart}
                  className="py-2.5 rounded-lg border border-slate-800 hover:bg-slate-850 text-slate-400 hover:text-slate-200 transition font-bold text-xs"
                >
                  最初から始める
                </button>
                <button
                  onClick={handleResume}
                  className="py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-md shadow-indigo-600/10"
                >
                  続きから再開する
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // B. クイズ出題・回答画面
  // ==========================================
  if (screen === "quiz") {
    const currentQuestion = currentQuizQuestions[currentQuizIndex];
    if (!currentQuestion) return null;

    const progressPercent = Math.round(((currentQuizIndex) / currentQuizQuestions.length) * 100);
    const showExplanation = selectedAnswerIdx !== null;

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
        <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
            <button
              onClick={handleGoHome}
              className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-slate-200 transition"
            >
              <Home className="w-4 h-4" />
              <span>ホームに戻る</span>
            </button>
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-slate-400">
                {currentQuizIndex + 1} / {currentQuizQuestions.length} 問
              </span>
            </div>
          </div>
        </header>

        {/* 進行状況バー */}
        <div className="w-full h-1 bg-slate-900">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-sky-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <main className="max-w-2xl mx-auto px-4 mt-6 space-y-6">
          {/* 問題カード */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider">
                {currentQuestion.source}
              </span>
              <span className="text-xs font-bold text-slate-400">
                問題 {currentQuestion.id}
              </span>
            </div>

            <h2 className="text-base font-extrabold text-slate-100 leading-relaxed whitespace-pre-wrap">
              {currentQuestion.question}
            </h2>

            {/* 問題文内蔵 of インライン図表 */}
            {renderDiagram(currentQuestion.id, false)}
          </div>

          {/* 選択肢リスト */}
          <div className="space-y-3">
            {currentQuestion.choices.map((choice, idx) => {
              const choiceLetter = labels[idx];
              const isCorrectChoice = choiceLetter === currentQuestion.answer;
              const isSelected = selectedAnswerIdx === idx;

              let btnStyle = "bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-900/60";
              
              if (showExplanation) {
                if (isCorrectChoice) {
                  // 正解の選択肢は常に緑
                  btnStyle = "bg-emerald-500/15 border-emerald-500 text-emerald-400 font-bold";
                } else if (isSelected) {
                  // 不正解の選択肢を選択していた場合は赤
                  btnStyle = "bg-red-500/15 border-red-500 text-red-400 font-bold";
                } else {
                  // それ以外はトーンダウン
                  btnStyle = "bg-slate-900/30 border-slate-800/50 text-slate-500 opacity-60";
                }
              }

              return (
                <button
                  key={idx}
                  disabled={showExplanation}
                  onClick={() => handleAnswerSelect(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition flex items-start justify-between space-x-3 text-xs leading-relaxed ${btnStyle}`}
                >
                  <span className="flex-1">{choice}</span>
                  {showExplanation && (
                    <span className="shrink-0 mt-0.5">
                      {isCorrectChoice && <Check className="w-4 h-4 text-emerald-400" />}
                      {!isCorrectChoice && isSelected && <X className="w-4 h-4 text-red-400" />}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* 解答後の解説エリア */}
          {showExplanation && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-5">
              {/* 正誤判定 */}
              <div className={`flex items-center space-x-2 font-black text-sm ${labels[selectedAnswerIdx] === currentQuestion.answer ? "text-emerald-400" : "text-red-400"}`}>
                {labels[selectedAnswerIdx] === currentQuestion.answer ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>正解です！</span>
                  </>
                ) : (
                  <>
                    <X className="w-5 h-5" />
                    <span>不正解です</span>
                  </>
                )}
              </div>

              {/* 正解の明示 */}
              <div className="text-xs font-bold text-slate-100 flex items-center space-x-2 bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="bg-indigo-600 text-white px-2 py-0.5 rounded text-[10px]">正解</span>
                <span>選択肢 【 {currentQuestion.answer} 】</span>
              </div>

              {/* 解説テキスト */}
              <div className="space-y-2">
                <h3 className="font-bold text-slate-200 text-xs border-l-2 border-indigo-500 pl-2">解説レジュメ</h3>
                <p className="text-slate-300 text-xs leading-relaxed whitespace-pre-wrap">
                  {currentQuestion.explanation}
                </p>
              </div>

              {/* 解説用のインライン図表（体系図、テーブルなど） */}
              {renderDiagram(currentQuestion.id, true)}

              {/* 復習フラグと次のアクション */}
              <div className="border-t border-slate-800 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <label className="flex items-center space-x-2 cursor-pointer select-none text-xs text-slate-400 hover:text-slate-200">
                  <input
                    type="checkbox"
                    checked={reviews[currentQuestion.id] === true}
                    onChange={() => toggleReview(currentQuestion.id)}
                    className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-indigo-500 focus:ring-indigo-500"
                  />
                  <span>この問題を「要復習リスト」に登録する</span>
                </label>

                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center space-x-1 transition self-end sm:self-auto shadow-md"
                >
                  <span>
                    {currentQuizIndex === currentQuizQuestions.length - 1 ? "結果を表示" : "次の問題へ"}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  // ==========================================
  // C. クイズ結果画面
  // ==========================================
  if (screen === "result") {
    const total = currentQuizQuestions.length;
    // 解答履歴を基に、正解数を算出
    const corrects = currentQuizQuestions.filter(q => history[q.id]?.correct === true).length;
    const scoreRate = Math.round((corrects / total) * 100) || 0;

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex justify-center items-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
            <Check className="text-emerald-400 w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-black text-slate-100">演習完了！</h1>
            <p className="text-xs text-slate-400">お疲れ様でした。今回の結果は以下の通りです。</p>
          </div>

          {/* スコア表示 */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-1">
            <p className="text-4xl font-extrabold text-indigo-400 font-mono">{scoreRate}%</p>
            <p className="text-xs text-slate-500">
              正解数: {corrects} / {total} 問
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                setScreen("dashboard");
              }}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg transition shadow-md shadow-indigo-600/10"
            >
              ダッシュボードへ戻る
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
