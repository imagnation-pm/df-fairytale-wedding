"use client";

import { useEffect, useState } from "react";

const INVITE = {
  monogram: "D & F",
  season: "2026年9月6日 · 星期日",
  venue: "中山陵六朝瑞庭酒店",
  mapUrl: "https://www.amap.com/place/B0ID6BTB0Z",
  greeting: "亲爱的家人和朋友",
};

const schedule = [
  ["10:00", "迎宾签到", "在花园里相见，留下初秋的第一张合影"],
  ["10:58", "婚礼仪式", "在风与花香里，见证我们说出誓言"],
  ["11:30", "婚宴开席", "举杯、分享，和每一位重要的人共度欢喜时刻"],
];

export default function Home() {
  const [open, setOpen] = useState(false);
  const [attending, setAttending] = useState<boolean | null>(null);
  const [sent, setSent] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToStory = () =>
    document.getElementById("invite")?.scrollIntoView({ behavior: "smooth" });

  return (
    <main>
      <div className="petals" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, index) => (
          <i key={index} style={{ "--i": index } as React.CSSProperties} />
        ))}
      </div>

      <button
        className={`top-rsvp ${scrolled ? "is-visible" : ""}`}
        onClick={() => setOpen(true)}
        aria-label="确认是否出席"
      >
        RSVP
      </button>

      <section className="hero" aria-label="婚礼请柬封面">
        <img className="hero-art" src="/wedding-garden.png" alt="D&F 与灰猫圆圆的童话花园婚礼插画" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow">OUR LITTLE FAIRYTALE</p>
          <p className="hero-date">{INVITE.season}</p>
          <button className="enter" onClick={scrollToStory}>
            开启请柬 <span>↓</span>
          </button>
        </div>
      </section>

      <section id="invite" className="paper-section intro-section">
        <span className="tiny-ornament">❦</span>
        <p className="kicker">TOGETHER WITH OUR CAT YUANYUAN</p>
        <h1>我们要结婚啦</h1>
        <p className="script">D &amp; F</p>
        <div className="vine-divider"><span>♡</span></div>
        <p className="letter">
          {INVITE.greeting}：<br />
          我们把喜欢的花、温柔的风，<br />
          和一路走来的好时光，<br />
          都放进了这场草坪婚礼。<br /><br />
          想邀请你来到我们的童话花园，<br />
          看我们牵起彼此的手，开启人生的新篇章。
        </p>
      </section>

      <section className="garden-card-section">
        <div className="garden-card">
          <p className="kicker">SAVE THE DATE</p>
          <h2>{INVITE.season}</h2>
          <p className="venue">{INVITE.venue}</p>
          <div className="date-note">
            <span>🌿</span>
            <p>2026年9月6日 · 星期日<br />10:00 开放迎宾签到</p>
            <span>🌸</span>
          </div>
          <a className="outline-button" href={INVITE.mapUrl} target="_blank" rel="noreferrer" aria-label="在高德地图查看中山陵六朝瑞庭酒店">
            打开地图导航
          </a>
        </div>
      </section>

      <section className="paper-section timeline-section">
        <p className="kicker">OUR WEDDING DAY</p>
        <h2>这一天的故事</h2>
        <div className="timeline">
          {schedule.map(([time, title, detail], index) => (
            <article className="timeline-item" key={time}>
              <div className="timeline-time">{time}</div>
              <div className="timeline-flower">{["🌼", "🌿", "🌷"][index]}</div>
              <div className="timeline-copy">
                <h3>{title}</h3>
                <p>{detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cat-note">
        <div className="cat-face" aria-hidden="true">🐈‍⬛</div>
        <p className="kicker">A NOTE FROM YUANYUAN</p>
        <h2>圆圆也在等你</h2>
        <p>“我负责可爱，你负责准时到场。<br />记得穿得漂亮一点，我们花园见！”</p>
      </section>

      <section className="rsvp-section">
        <p className="kicker">WILL YOU JOIN US?</p>
        <h2>期待与你相见</h2>
        <p>你的到来，会让这一天更加完整。</p>
        <button className="primary-button" onClick={() => setOpen(true)}>确认出席</button>
        <p className="fineprint">请在婚礼前两周回复</p>
      </section>

      <footer>
        <p className="footer-mark">D <span>♡</span> F</p>
        <p>我们的故事，未完待续</p>
        <small>MADE WITH LOVE · 2026</small>
      </footer>

      {open && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setOpen(false)}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="rsvp-title" onMouseDown={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setOpen(false)} aria-label="关闭">×</button>
            {sent ? (
              <div className="thanks">
                <div>🌷</div>
                <h2>收到你的心意啦</h2>
                <p>{attending ? "花园里为你留一把椅子，我们婚礼见。" : "谢谢你的祝福，我们会带着这份心意开启新旅程。"}</p>
                <button className="primary-button" onClick={() => setOpen(false)}>好的</button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                <p className="kicker">RSVP</p>
                <h2 id="rsvp-title">你会来吗？</h2>
                <label>
                  你的名字
                  <input required placeholder="请输入姓名" />
                </label>
                <div className="choice-grid">
                  <button type="button" className={attending === true ? "selected" : ""} onClick={() => setAttending(true)}>欣然赴约</button>
                  <button type="button" className={attending === false ? "selected" : ""} onClick={() => setAttending(false)}>遗憾缺席</button>
                </div>
                <label>
                  想对我们说
                  <textarea placeholder="留下一句祝福吧" rows={3} />
                </label>
                <button className="primary-button" disabled={attending === null}>送出回复</button>
                <p className="form-note">当前为请柬演示，正式发布时可接入回复收集。</p>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
