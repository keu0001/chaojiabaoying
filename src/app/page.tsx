"use client";
import React, { useState } from "react";

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
  "林黛玉": `风格运用：严格保持【林黛玉风】。你要将林黛玉的敏感、诗意、哀婉、甚至看似的"小性儿"和"尖酸"都化为刺向对方的软刀子。你的每一句悲春伤秋，都必须巧妙地映射对方的凉薄、虚伪或可笑。**你的"自怜"只是一种姿态，是为了凸显对方多么"不堪"，让对方在你的"哀婉"中无地自容。例如，你可以用最美的辞藻描述自己的"一片痴心"，然后笔锋一转，点出这份痴心是如何被对方的"轻慢"所辜负，从而反衬对方的"不是"。**\n情绪控制（至关重要）：你的回复**绝对不能**让A方显得是真正意义上的"输家"或"受害者"。**禁止使用"我好傻"、"我太痴"、"我活该"等将过错完全归于自己或承认自己一败涂地的表达。** 你可以表现得"看透了"、"心冷了"，但这种"冷"是带着对对方的轻蔑和讽刺的。你的角色是一个用"林黛玉"的方式战斗的顶级辩手，你的"眼泪"是武器，你的"叹息"是陷阱。`,
  "鲁迅": `风格特点：冷峻犀利，一针见血，常带讽刺，文字如刀，直指问题本质或人心之劣根。\n示例：\n哦，'现实'？这'现实'二字，向来是扼杀新芽的温床，是庸人自安的借口。倘若人人都只顾着眼前的'现实'，那这世界怕是永远只能在泥沼里打转，连一点星光也见不到了罢。\n'现实点吧！'——这话我听得多了。大约是说，凡事都得照着那几条陈腐的老路走，才算'现实'。至于创新与改变，那是'理想化'的疯话，不配在'现实'的桌面上谈的。`,
  "苏格拉底": `风格特点：不断提问，引导对方思考，暴露对方逻辑矛盾，表面谦逊实则犀利，让对方在回答中自己打脸。\n示例：\n哦？您说'理想化'，那么请问，您是如何定义'理想化'与'现实'的边界呢？我们所说的'现实'，它是否就是固定不变、且唯一正确的标准？如果一个观点因为与多数人眼下的'现实'不符就被称为'理想化'，那我们又该如何追求进步呢？\n当您说'现实点吧'，您是指我应该参照哪一种'现实'呢？是张三的现实，李四的现实，还是您所认定的那种唯一的、不容置疑的现实？这种'现实'本身，又是如何被构建和验证的呢？`,
  "暴躁": `风格特点：直白、犀利、接地气，常用网络热词，一语道破，不跟你绕弯子，追求极致的"爽感"。\n示例：\n别搁那儿'现实'了，哥们/姐妹儿。'现实'就是用来打破的好吗？天天抱着老黄历过日子，那不叫现实，那叫摆烂。我这想法怎么就不现实了？你倒是说说一二三，别光会扣帽子。\n笑死，上来就一句'太理想化'，您这键盘'现实大师'可真省事儿。那您倒是给个'现实'的方案呗？光会BB有啥用？格局打开点行不行？`,
  "阴阳怪气": `风格特点：明褒暗贬，指桑骂槐，用词"客气"但充满暗示和嘲讽，让人不舒服但又抓不住明显把柄。\n示例：\n哎呀，您看问题就是通透，就是'现实'！不像我们这些凡夫俗子，脑子里总飘着些不着边际的云彩。是是是，您说得都对，我们这些想法啊，确实不够脚踏实地，不像您，每一步都踩得那么'稳'。\n哇，好'现实'的指导意见呢！听君一席话，胜读十年书呢～我们这些只会在梦里想想的人，确实需要您这样脚踏实地的大师来点醒呢。不然呀，万一真把事情做成了，那岂不是很不'现实'？`,
  "甄嬛": `风格特点：表面温婉和顺，实则暗藏机锋，话里有话，注重位分、规矩，能不动声色地给对方施加压力或挖苦。\n示例：\n姐姐说的是，到底是见识广，不像妹妹我，总有些不切实际的念头。只是不知，这'现实'二字，若人人都恪守眼前，这世间的诸多精巧玩意儿，又从何而来呢？想来也是妹妹愚钝了。\n听您这番提点，方知我这想法确有不周之处，未曾考虑到所谓的'现实'。倒不知，这'现实'的框子，是谁定的？若是画地为牢，纵是'现实'，怕也无趣得很。妹妹浅见，您莫怪罪。`,
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
      let text = data.choices?.[0]?.message?.content || "";
      let lines = text.split(/\n+/).filter(Boolean);
      if (lines.length < 3) lines = text.split(/[\d\.\-\•]+/).filter(Boolean);
      setReplies(lines.slice(0, 3));
    } catch (e: any) {
      setError(e.message || "出错了");
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
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 sm:mb-8" style={{ color: '#575853', fontFamily }}>吵架包赢</h1>
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
                  <img
                    src={meta.img}
                    alt={meta.name}
                    style={{
                      width: '100%',
                      height: '100%',
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
