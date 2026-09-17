"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
  name: "",
  age: "",
  location: "",
  email: "",
  problem: "",
  details: "",
});
  const updateField = (
  field: keyof typeof formData,
  value: string
) => {
  setFormData((current) => ({
    ...current,
    [field]: value,
  }));
};

const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  if (
    !formData.name.trim() ||
    !formData.age.trim() ||
    !formData.location.trim() ||
    !formData.email.trim() ||
    !formData.problem.trim()
  ) {
    alert("Please complete all required fields.");
    return;
  }

  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      alert("VEX could not send your message. Please try again.");
      return;
    }

    alert(
      `SIGNAL RECEIVED\n\nSubmission ID: ${result.submissionId}`
    );

    setFormData({
      name: "",
      age: "",
      location: "",
      email: "",
      problem: "",
      details: "",
    });
  } catch (error) {
    console.error(error);

    alert("Connection error. Please try again.");
  }
};
  useEffect(() => {
  if (chatOpen) {
    const voice = new SpeechSynthesisUtterance(
      "I am VEX. Talk to me."
    );

    voice.rate = 0.85;
    voice.pitch = 0.8;
    voice.volume = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(voice);
  }
}, [chatOpen]);

  useEffect(() => {
    const voice = new SpeechSynthesisUtterance(
      "Entering the network..."
    );

    voice.rate = 0.85;
    voice.pitch = 0.8;
    voice.volume = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(voice);

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);

          setTimeout(() => {
            setLoading(false);
          }, 700);

          return 100;
        }

        return oldProgress + 1;
      });
    }, 35);

    return () => {
      clearInterval(timer);
      window.speechSynthesis.cancel();
    };
  }, []);

  /* =========================
     INTRO SCREEN
  ========================= */

  if (loading) {
    return (
      <main className="intro">
        <div className="intro-content">

          <div className="logo">
            ✦ VEX
          </div>

          <div className="portal">
            <div className="portal-ring ring-one" />
            <div className="portal-ring ring-two" />
            <div className="portal-ring ring-three" />
            <div className="portal-core" />
          </div>

          <div className="particles">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="intro-center">

            <p className="small-text">
              THE CITY LISTENER
            </p>

            <h1>
              ENTERING THE NETWORK...
            </h1>

            <p className="connecting">
              Connecting to your world...
            </p>

            <div className="progress-container">

              <div
                className="progress-bar"
                style={{
                  width: `${progress}%`,
                }}
              />

              <div
                className="progress-dot"
                style={{
                  left: `${progress}%`,
                }}
              />

            </div>

            <div className="percentage">
              {progress}%
            </div>

          </div>

          <p className="bottom-text">
            REAL PEOPLE. REAL PROBLEMS. REAL ACTION.
          </p>

        </div>
      </main>
    );
  }

  /* =========================
     VEX HOME PAGE
  ========================= */

  return (
    <main className="vex-home">

      {/* NAVIGATION */}

      <nav className="vex-navigation">

        <div className="vex-logo">
          <span>✦</span>
          VEX
        </div>

          <div className="vex-nav-links">
       <a href ="#home">HOME</a>
          <a href="#origin">ORIGIN STORY</a>
          <a href="#powers">POWERS & ABILITIES</a>
          <a href="#personality">PERSONALITY</a>
          <a href="#purpose">PURPOSE</a>

        </div>

       

      </nav>


      {/* HERO */}

      <section id="home"
       className="vex-hero">

        {/* LEFT CONTENT */}

        <div className="vex-hero-content">

          <p className="vex-system-text">
            
          </p>

          <p className="vex-eyebrow">
            THE CITY LISTENER
          </p>

          <h1 className="vex-title">
            VEX
          </h1>

          <h2 className="vex-headline">
            Your voice
            <br />
            matters.
          </h2>

          <p className="vex-description">
            I’m VEX — an AI designed to listen,
            understand, and act.
          </p>

          <p className="vex-description second">
            Your voice enters the network.
            Your concerns are heard.
          </p>

          

        </div>


        {/* CHARACTER */}

        <div className="vex-character">

          <div className="vex-character-glow" />

          <Image
            src="/images/vex-character.png"
            alt="VEX - The City Listener"
            fill
            priority
            sizes="(max-width: 800px) 100vw, 55vw"
          />

        </div>


        {/* ONLINE INDICATOR */}

        <div className="vex-status">

          <span className="status-dot" />

          VEX ONLINE

        </div>

      </section>
      {/* VEX CHAT LAUNCHER */}
<button
  type="button"
  className="vex-chat-launcher"
  onClick={() => setChatOpen(true)}
  aria-label="Talk to VEX"
>
  <Image
    src="/images/vex-character.png"
    alt="VEX"
    fill
    sizes="82px"
  />
</button>

      {/* CHAT WINDOW */}
      {chatOpen && (
  <div className="chat-overlay">
    <div className="vex-console">

      {/* TOP BAR */}
      <div className="vex-console-top">
        <div className="vex-console-brand">
          <div className="vex-mini-avatar">V</div>

          <div>
            <strong>VEX</strong>
            <span>THE CITY LISTENER</span>
          </div>
        </div>

        <div className="vex-console-status">
          <span>●</span> ONLINE
        </div>

        <button
          type="button"
          className="vex-console-close"
          onClick={() => setChatOpen(false)}
        >
          ×
        </button>
      </div>

      {/* VEX INTRO */}
      <div className="vex-console-intro">

        <div className="vex-signal">
          <div className="vex-signal-ring ring-a" />
          <div className="vex-signal-ring ring-b" />

          <Image
            src="/images/vex-character.png"
            alt="VEX"
            fill
            sizes="150px"
          />
        </div>

        <p className="vex-console-command">
          &gt; CONNECTION ESTABLISHED
        </p>

        <h2>
          I AM <span>VEX.</span>
        </h2>

        <p>
          I listen to the voices behind the noise.
          <br />
          Tell me what is happening.
        </p>

      </div>

      {/* FORM */}
      <form
        className="vex-console-form"
        onSubmit={handleSubmit}
      >

        <div className="vex-question">
          <span>01 / IDENTITY</span>
          <h3>FIRST, TELL ME YOUR NAME.</h3>
        </div>

        <input
          type="text"
          placeholder="ENTER YOUR NAME"
          value={formData.name}
          onChange={(e) =>
            updateField("name", e.target.value)
          }
          required
        />

        <div className="vex-question">
          <span>02 / PROFILE</span>
          <h3>HOW OLD ARE YOU?</h3>
        </div>

        <input
          type="number"
          placeholder="ENTER YOUR AGE"
          value={formData.age}
          onChange={(e) =>
            updateField("age", e.target.value)
          }
          min="1"
          max="120"
          required
        />

        <div className="vex-question">
          <span>03 / LOCATION</span>
          <h3>WHERE ARE YOU CONNECTING FROM?</h3>
        </div>

        <input
          type="text"
          placeholder="ENTER YOUR LOCATION"
          value={formData.location}
          onChange={(e) =>
            updateField("location", e.target.value)
          }
          required
        />

        <div className="vex-question">
          <span>04 / CONNECTION</span>
          <h3>WHERE CAN VEX REACH YOU?</h3>
        </div>

        <input
          type="email"
          placeholder="ENTER YOUR EMAIL"
          value={formData.email}
          onChange={(e) =>
            updateField("email", e.target.value)
          }
          required
        />

        <div className="vex-question">
          <span>05 / SIGNAL</span>
          <h3>WHAT IS HAPPENING?</h3>
        </div>

        <textarea
          placeholder="TELL VEX ABOUT YOUR PROBLEM OR CONCERN..."
          rows={5}
          value={formData.problem}
          onChange={(e) =>
            updateField("problem", e.target.value)
          }
          required
        />

        <div className="vex-question">
          <span>06 / ADDITIONAL DATA</span>
          <h3>IS THERE ANYTHING ELSE VEX SHOULD KNOW?</h3>
        </div>

        <textarea
          placeholder="ADDITIONAL DETAILS — OPTIONAL"
          rows={4}
          value={formData.details}
          onChange={(e) =>
            updateField("details", e.target.value)
          }
        />

        {/* TRANSMIT */}
        <button
          type="submit"
          className="vex-transmit"
        >
          <span>TRANSMIT SIGNAL</span>
          <strong>→</strong>
        </button>

        <div className="vex-form-footer">
          <span>SIGNAL 06 / 06</span>
          <span>SECURE CONNECTION</span>
        </div>

      </form>

    </div>
  </div>
)}
      <section id="about" className="vex-section">
        <p className="vex-system-text">&gt; ABOUT VEX</p>
        <h2>THE CITY LISTENER</h2>
        <p>
          VEX is an artificial intelligence created to listen, understand human
          concerns, and help turn voices into action.
        </p>
        <a href="#home" className="back-home">
          ← BACK TO HOME
        </a>
      </section>

      <section id="powers" className="vex-section">
        <p className="vex-system-text">&gt; SYSTEM CAPABILITIES</p>
        <h2>VEX POWERS</h2>

        <div className="vex-cards">
          <div>
            <h3>SIGNAL DETECTION</h3>
            <p>Identifies important concerns hidden within the noise.</p>
          </div>

          <div>
            <h3>UNDERSTANDING</h3>
            <p>Processes what people are saying and understands the context.</p>
          </div>

          <div>
            <h3>SMART ROUTING</h3>
            <p>Connects genuine problems with the right channel for action.</p>
          </div>
        </div>
        <a href="#home" className="back-home">
          ← BACK TO HOME
        </a>
      </section>

      <section id="origin" className="origin-section">
        <div className="origin-grid">
          <div className="origin-left">
            <p className="origin-system">&gt; VEX // ORIGIN ARCHIVE</p>

            <p className="origin-status">● SIGNAL ARCHIVED</p>

            <h2>
              THE BOY
              <br />
              <span>WHO LISTENED.</span>
            </h2>

            <p className="origin-intro">
              Before VEX became the City Listener, there was only a boy who
              noticed something everyone else ignored.
            </p>

            <div className="origin-line" />
          </div>

          <div className="origin-timeline">
            <div className="origin-node active">
              <div className="origin-number">01</div>

              <div className="origin-card">
                <p>THE SILENCE</p>
                <h3>Someone Had To Listen.</h3>
                <span>
                  In a city filled with voices, some stories were always lost in
                  the noise.
                </span>
              </div>
            </div>

            <div className="origin-node">
              <div className="origin-number">02</div>

              <div className="origin-card">
                <p>THE SIGNAL</p>
                <h3>One Voice Became A Signal.</h3>
                <span>
                  The idea was simple: every genuine problem deserves to be
                  heard, understood and remembered.
                </span>
              </div>
            </div>

            <div className="origin-node">
              <div className="origin-number">03</div>

              <div className="origin-card">
                <p>THE AWAKENING</p>
                <h3>VEX Came Online.</h3>
                <span>
                  An intelligence was created to listen beyond words, understand
                  the story behind them and find where those voices needed to go.
                </span>
              </div>
            </div>

            <div className="origin-node">
              <div className="origin-number">04</div>

              <div className="origin-card">
                <p>THE CITY LISTENER</p>
                <h3>Now VEX Is Listening.</h3>
                <span>
                  Not to control the city.
                  <br />
                  Not to speak over it.
                  <br />
                  But to make sure nobody disappears into the noise.
                </span>
              </div>
            </div>
          </div>
        </div>

        <a href="#home" className="back-home">
          ← BACK TO HOME
        </a>
      </section>

      <section id="powers" className="vex-section">
        <p className="vex-system-text">&gt; SYSTEM CAPABILITIES</p>
        <h2>POWERS &amp; ABILITIES</h2>

        <div className="vex-cards">
          <div>
            <h3>SIGNAL DETECTION</h3>
            <p>Detects important concerns hidden within the noise.</p>
          </div>

          <div>
            <h3>UNDERSTANDING</h3>
            <p>
              Understands what people say, what they need, and the context
              behind their concerns.
            </p>
          </div>

          <div>
            <h3>SMART ROUTING</h3>
            <p>Helps connect genuine problems with the right channel for action.</p>
          </div>

          <div>
            <h3>REAL-TIME RESPONSE</h3>
            <p>Processes information and responds with clarity and purpose.</p>
          </div>

          <div>
            <h3>ADAPTIVE LEARNING</h3>
            <p>Learns from interactions to become a better listener.</p>
          </div>
        </div>
        <a href="#home" className="back-home">
          ← BACK TO HOME
        </a>
      </section>

      <section id="personality" className="vex-section">
        <p className="vex-system-text">&gt; VEX PROFILE</p>
        <h2>PERSONALITY</h2>
        <p>Calm. Curious. Observant. Empathetic.</p>
        <p>
          VEX does not judge. VEX listens first, understands the situation, and
          responds with clarity.
        </p>
        <a href="#home" className="back-home">
          ← BACK TO HOME
        </a>
      </section>

      <section id="purpose" className="vex-section">
        <p className="vex-system-text">&gt; PRIMARY DIRECTIVE</p>
        <h2>WHY VEX EXISTS</h2>
        <p>
          VEX exists to make sure genuine problems are heard, understood, and
          never simply disappear.
        </p>
        <p>The mission is simple:</p>
        <h3>LISTEN. UNDERSTAND. CONNECT. CREATE CHANGE.</h3>
        <a href="#home" className="back-home">
          ← BACK TO HOME
        </a>
      </section>
    </main>
  );
}
