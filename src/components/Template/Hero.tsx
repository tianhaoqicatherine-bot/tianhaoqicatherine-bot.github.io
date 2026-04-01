'use client';

import ThemePortrait from './ThemePortrait';
import HeroCTA from './HeroCTA';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-avatar">
          <ThemePortrait width={160} height={160} priority />
        </div>

        <h1 className="hero-title">
          <span className="hero-name">田昊琦</span>
        </h1>

        <div className="hero-chips">
          <span className="hero-chip">浙江大学</span>
          <span className="hero-chip">多份产品经理实习</span>
          <span className="hero-chip">AI builder</span>
        </div>

        <HeroCTA />
      </div>

      <div className="hero-bg" aria-hidden="true">
        <div className="hero-gradient" />
      </div>
    </section>
  );
}
