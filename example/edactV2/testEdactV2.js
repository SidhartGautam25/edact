import { render, useState, useEffect } from "../../src/edactV2.js";
import { view } from "../../src/edactV2View.js";

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    console.log("App effect triggered. Count is now:", count);
  }, [count]);

  return view(
    "div",
    {
      style:
        "font-family: sans-serif; max-width: 500px; margin: 50px auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-align: center;",
    },
    view("h2", "Edact Version 2 - Reconciliation Test"),
    view(
      "p",
      "This test validates that Edact V2 updates the DOM incrementally without rebuilding the entire tree from scratch.",
    ),

    view(
      "div",
      { style: "margin: 20px 0;" },
      view("h3", `Count: ${count}`),
      view(
        "button",
        {
          onClick: () => setCount(count - 1),
          style:
            "padding: 8px 16px; margin: 5px; font-size: 16px; cursor: pointer; border-radius: 4px; border: 1px solid #aaa; background-color: #f0f0f0;",
        },
        "- Decrement",
      ),
      view(
        "button",
        {
          onClick: () => setCount(count + 1),
          style:
            "padding: 8px 16px; margin: 5px; font-size: 16px; cursor: pointer; border-radius: 4px; border: 1px solid #007bff; background-color: #007bff; color: white;",
        },
        "+ Increment",
      ),
    ),

    view(
      "div",
      { style: "margin: 20px 0; border-top: 1px solid #eee; padding-top: 20px;" },
      view("h4", "Hook State & Event Handling Test"),
      view("input", {
        type: "text",
        value: text,
        placeholder: "Type something...",
        onInput: (e) => setText(e.target.value),
        style:
          "padding: 8px; width: 80%; font-size: 14px; border-radius: 4px; border: 1px solid #ccc;",
      }),
      view(
        "p",
        { style: "font-style: italic; color: #555; margin-top: 10px;" },
        text ? `You typed: ${text}` : "Type in the box above to test inputs",
      ),
    ),
  );
}

render(view(App), document.getElementById("app"));
