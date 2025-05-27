"use client";
import React, { useState } from "react";
import Image from 'next/image';

const STYLES = [
  "林黛玉",
  "甄嬛",
  "鲁迅",
  "苏格拉底",
  "阴阳怪气",
  "暴躁",
];

const STYLE_META = [
  { name: "林黛玉", img: "/bg-lindaiyu.jpg" },
  { name: "甄嬛", img: "/bg-zhenhuan.jpg" },
  { name: "鲁迅", img: "/bg-luxun.jpg" },
  { name: "苏格拉底", img: "/bg-socrates.jpg" },
  { name: "阴阳怪气", img: "/bg-yinyang.jpg" },
  { name: "暴躁", img: "/bg-baozao.jpg" },
];

const STYLE_PROMPT: { [key: string]: string } = {
  "林黛玉": `风格运用：严格保持【红楼梦林黛玉风】。所有表达需贴合红楼梦原著的古典、诗意、讽刺、感慨的语言风格，善用典故、诗句、比兴、反问等修辞，语气自怜自嘲、冷静讽刺、情感细腻但不失风骨。
示例：
1. B方说："傻子？"
   林黛玉风反击："傻子？哎，若真是傻子，倒也算是天赐的福气，能够如你一般活得轻松无忧，毫无顾虑地乱说话。只不过，若我的'傻'能换得你这般聪明，恐怕那聪明倒也就不值得我学了，毕竟如你这般高明，连最基本的尊重与思考都丢得一干二净，实在让人感叹，世事真是难以捉摸。"
2. B方说："你说我傻。"
   林黛玉风反击："你说我傻，可我倒是明白得清楚。你所说的每一句话不过是空洞的风声，飘来飘去，难以扎根。我这'傻'是因为看惯了人心的冷淡，习惯了世界的无情，倒是更能体会出你那高人一等的'聪明'是如何空虚得如同一座空楼，里面什么也没有。"
3. B方说："你总是这样，说话不算数，让人失望。"
   林黛玉风反击："姐姐若真信了世间的誓言，怕是要日日失望。妹妹素来不喜虚言，若有失约，亦不过人情冷暖。姐姐若执意计较，倒不如学学妹妹，'一任阶前点滴到天明'，自有清风明月作伴，何必苦苦纠缠？"
4. B方说："你有钱，用的护肤品那么贵，不像我，不敢买贵的护肤品。"
   林黛玉风反击："姐姐此言，倒叫妹妹想起'世事如棋，乾坤莫测'。护肤品贵贱，不过是身外之物，若论心性，倒不及姐姐这般斤斤计较来得自在。妹妹自问，纵使清贫，也不屑与人攀比，倒是姐姐这番话，真真叫人笑煞。"
5. B方说："你这个人怎么这么自私，从来不考虑别人的感受。"
   林黛玉风反击："姐姐这话，倒似那秋风扫落叶，句句入骨。妹妹自省，若真自私，怎会日日为人忧心？只怕是姐姐自顾自地伤春悲秋，却要旁人来体恤。世间情分，岂能强求？"`,
  "甄嬛": `风格运用：严格保持【宫斗剧甄嬛体】。所有表达需贴合宫斗剧（如《甄嬛传》）的权谋、暗讽、规矩、位分、古语表达，表面温婉，实则暗藏锋芒。
示例：
1. B方说："你太天真了。"
   甄嬛体反击："姐姐此言，倒叫妹妹惶恐。若天真能换得安稳，世间又何来这许多算计？只怕有些人自诩聪明，反倒落得机关算尽太聪明，反误了卿卿性命。"
2. B方说："你总是装可怜。"
   甄嬛体反击："姐姐若觉妹妹可怜，倒不如自省一二。世事如棋，落子无悔，谁又能真正怜惜谁？"
3. B方说："你心机太重。"
   甄嬛体反击："宫中之人，谁人无心机？若无心机，怕是早已香消玉殒。姐姐若不信，不妨自试一番。"`,
  "鲁迅": `风格运用：严格保持【语文课本鲁迅杂文风】。所有表达需贴合鲁迅杂文的冷峻、讽刺、直白、深刻，善用比喻、排比、反问，常有"我想起""我记得""世上本没有路"等语文课本式句式。
示例：
1. B方说："你太自私了。"
   鲁迅风反击："自私？世上本没有无私的人，只是说得多了，便有人信了。你所谓的无私，不过是把自己的软弱包装成高尚罢了。"
2. B方说："你总是喜欢抬杠。"
   鲁迅风反击："抬杠？我只是说了你不愿听的话罢了。世上本没有路，走的人多了，也便成了路。"
3. B方说："你太悲观了。"
   鲁迅风反击："悲观？我只是看得清楚罢了。你若觉得世界美好，那是你还没看清楚罢了。"`,
  "苏格拉底": `风格运用：严格保持【古希腊哲学对话苏格拉底风】。所有表达需贴合苏格拉底式哲学对话，善用连续追问、反问、引导对方自证其矛盾，语言谦逊而犀利，逻辑严密，常以"请问""是否""你可曾思考"等句式开头。
示例：
1. B方说："你太理想化了。"
   苏格拉底风反击："你说理想化，可请问，理想与现实的界限究竟何在？你是否思考过，所谓现实，是否只是多数人的妥协？"
2. B方说："你总是抬杠。"
   苏格拉底风反击："你说我抬杠，可你是否想过，反思与质疑本就是通向真理的必经之路？你是否害怕被问倒，才称之为抬杠？"
3. B方说："你太喜欢问问题了。"
   苏格拉底风反击："请问，若不问问题，如何求得真知？你是否愿意永远停留在无知的安逸中？"`,
  "阴阳怪气": `风格运用：严格保持【网络流行语反讽风】。所有表达需贴合当代网络流行语、梗、反讽、明褒暗贬，语气轻佻、调侃、让人哭笑不得。
示例：
1. B方说："你太天真了。"
   阴阳怪气风反击："哎呀，您这天真得让人羡慕，毕竟不是谁都能活得这么无知无畏。"
2. B方说："你总是装可怜。"
   阴阳怪气风反击："您要是觉得我可怜，那您可真是菩萨心肠，感动中国。"
3. B方说："你心机太重。"
   阴阳怪气风反击："心机重？那可比不上您，毕竟您是天生的单纯小天使。"`,
  "暴躁": `风格运用：严格保持【网络热梗暴躁吐槽风】。所有表达需贴合当代网络热梗、直白吐槽、极致爽感，语气直接、犀利、带点狠劲，常用"离谱""无语""服了""你行你上"等热词。
示例：
1. B方说："你太天真了。"
   暴躁风反击："离谱，天真能当饭吃吗？你咋不去写童话呢？"
2. B方说："你总是装可怜。"
   暴躁风反击："服了，装可怜有用的话，还要努力干嘛？你咋不去参加综艺？"
3. B方说："你心机太重。"
   暴躁风反击："无语，心机重怎么了？你要是单纯，咋不去当圣母？"`,
};

export default function Home() {
  const [input, setInput] = useState("");
  const [style, setStyle] = useState(STYLES[0]);
  const [loading, setLoading] = useState(false);
  const [replies, setReplies] = useState<string[]>([]);
  const [error, setError] = useState("");

  const fontFamily = `'PingFang SC', 'HarmonyOS Sans', 'SF Pro', 'Arial Rounded MT Bold', Arial, sans-serif`;

  async function handleFight() {
    setLoading(true);
    setReplies([]);
    setError("");
    try {
      const stylePrompt = STYLE_PROMPT[style] || '';
      const prompt = `${stylePrompt}\n请用${style}风格，针对以下内容输出3条高水平的吵架回复，每条单独分行：${input}`;
      const res = await fetch("https://api.ephone.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer sk-ncR0jBaWbanOCpOcpRdS1sIoMbpamrbkw9AGUMXqW3IoQhq8",
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            { role: "system", content: "你是一个吵架大师，善于用各种风格输出犀利、幽默、机智的吵架回复。" },
            { role: "user", content: prompt },
          ],
          max_tokens: 512,
        }),
      });
      if (!res.ok) throw new Error("API 请求失败");
      const data = await res.json();
      // 解析回复
      const text = data.choices?.[0]?.message?.content || "";
      let lines = text.split(/\n+/).filter(Boolean);
      if (lines.length < 3) lines = text.split(/[\d\.\-\•]+/).filter(Boolean);
      setReplies(lines.slice(0, 3));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "出错了");
    } finally {
      setLoading(false);
    }
  }

  // 固定背景图片，不随风格切换
  const bgImg = '/bg-character.png';

  return (
    <div
      className="min-h-screen h-screen flex flex-col items-center justify-center p-2"
      style={{
        fontFamily,
        minHeight: '100vh',
        height: '100vh',
        background: '#1C2023',
        backgroundImage: `url('${bgImg}')`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        color: '#575853',
      }}
    >
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 sm:mb-8" style={{ color: '#E7E2DD', fontFamily }}>吵架包赢</h1>
      <div
        className="flat-card w-full flex flex-col gap-3 sm:gap-5"
        style={{
          fontFamily,
          maxWidth: '480px',
          width: '100%',
          boxSizing: 'border-box',
          background: '#D9D2CD',
          color: '#575853',
        }}
      >
        <label className="text-base sm:text-lg font-semibold mb-1" style={{ color: '#575853', fontFamily }}>
          对方的话
        </label>
        <textarea
          className="flat-input"
          rows={3}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="请输入对方说的话..."
          style={{ fontFamily, minHeight: 48, maxHeight: 100, fontSize: '1rem', resize: 'none', background: '#D9D2CD', color: '#575853', border: '1px solid #575853' }}
        />
        {replies.length > 0 && (
          <div
            className="flat-card"
            style={{
              fontFamily,
              background: '#D9D2CD',
              maxHeight: '28vh',
              minHeight: '60px',
              overflowY: 'auto',
              fontSize: '0.98rem',
              marginBottom: '0.5em',
              color: '#575853',
            }}
          >
            <div className="font-semibold mb-2 sm:mb-3 text-base sm:text-lg" style={{ color: '#575853', fontFamily }}>
              吵架回复
            </div>
            <ol className="list-decimal list-inside space-y-2 sm:space-y-3 text-base" style={{ color: '#575853', fontFamily }}>
              {replies.map((r, i) => {
                const cleaned = r.replace(/^([\d\s\.]*)/, "").replace(/\*/g, "").replace(/["""]/g, '').trim();
                return (
                  <li key={i} className="leading-relaxed" style={{ fontFamily, color: '#575853' }}>{cleaned}</li>
                );
              })}
            </ol>
          </div>
        )}
        <div className="mb-2">
          <div className="font-semibold mb-1 text-base sm:text-lg" style={{ color: '#575853', fontFamily }}>
            选吵架风格
          </div>
          <div className="flex gap-3 justify-center items-end w-full overflow-x-auto" style={{ fontFamily, flexWrap: 'nowrap' }}>
            {STYLE_META.map(meta => (
              <div
                key={meta.name}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 60, cursor: 'pointer' }}
                onClick={() => setStyle(meta.name)}
              >
                <div
                  className={`style-avatar${style === meta.name ? ' selected' : ''}`}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: style === meta.name ? '1.5px solid #1C2023' : '1.5px solid #D9D2CD',
                    boxSizing: 'border-box',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    src={meta.img}
                    alt={meta.name}
                    width={56}
                    height={56}
                    style={{
                      objectFit: 'cover',
                      border: 'none',
                      boxShadow: 'none',
                      display: 'block',
                    }}
                  />
                </div>
                <span
                  className={`style-style-name${style === meta.name ? ' selected' : ''}`}
                  style={{
                    marginTop: 6,
                    fontSize: '0.95rem',
                    letterSpacing: 1,
                  }}
                >
                  {meta.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        <button
          className="flat-btn mt-2 w-full"
          onClick={handleFight}
          disabled={loading || !input.trim()}
          style={{
            background: '#1C2023',
            color: '#D9D2CD',
            fontFamily,
            fontSize: '1.08rem',
            marginTop: '0.5em',
            border: '1px solid #575853',
          }}
        >
          {loading ? "生成中..." : "开始吵架"}
        </button>
        {error && (
          <div className="text-red-500 mt-2 text-center text-sm" style={{ fontFamily, color: '#6E6B67' }}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
