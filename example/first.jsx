/** @jsx createElement */

import { createElement, render, useState } from "../src/edact.js";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div
      style="
        display:flex;
        justify-content:center;
        align-items:center;
        height:100vh;
        background:#f4f6f9;
        font-family:Arial, sans-serif;
      "
    >
      <div
        style="
          background:white;
          padding:40px;
          border-radius:16px;
          box-shadow:0 10px 30px rgba(0,0,0,0.1);
          text-align:center;
          width:420px;
        "
      >
        <h1
          style="
    margin:0;
    color:#2563eb;
    font-size:34px;
    font-weight:700;
  "
        >
          Edact
        </h1>

        <h3
          style="
    margin-top:8px;
    margin-bottom:25px;
    color:#4b5563;
    font-weight:500;
    font-size:18px;
    line-height:1.5;
  "
        >
          Our own beautiful and simple React implementation
        </h3>

        <p
          style="
            color:#666;
            margin-top:10px;
            margin-bottom:30px;
            line-height:1.5;
          "
        >
          This application is built entirely using our own
          <strong> Edact </strong>
          library.
          <br />
          No React, Preact, Vue, Solid, or any other UI library is being used.
        </p>

        <h2
          style="
            font-size:48px;
            margin:20px 0;
            color:#111827;
          "
        >
          {count}
        </h2>

        <div
          style="
            display:flex;
            justify-content:center;
            gap:15px;
          "
        >
          <button
            style="
              padding:12px 24px;
              font-size:22px;
              cursor:pointer;
              border:none;
              border-radius:10px;
              background:#ef4444;
              color:white;
            "
            onClick={() => setCount(count - 1)}
          >
            −
          </button>

          <button
            style="
              padding:12px 24px;
              font-size:22px;
              cursor:pointer;
              border:none;
              border-radius:10px;
              background:#22c55e;
              color:white;
            "
            onClick={() => setCount(count + 1)}
          >
            +
          </button>
        </div>

        <p
          style="
            margin-top:25px;
            color:#6b7280;
            font-size:14px;
          "
        >
          ✔ Function Components
          <br />
          ✔ JSX
          <br />
          ✔ useState
          <br />
          ✔ useEffect
          <br />
          ✔ Events
          <br />✔ Re-rendering
        </p>
      </div>
    </div>
  );
}

render(<Counter />, document.getElementById("app"));
