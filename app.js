(function(){
  const D = window.CODEPILOT_DATA;
  let lang = "python";
  let pendingSuggestion = null;
  let pendingFull = null;
  let refactorCode = null;
  const codeEl = document.getElementById("code");
  const gutter = document.getElementById("gutter");
  const suggestBox = document.getElementById("suggest");
  const suggestText = document.getElementById("suggestText");
  const aiout = document.getElementById("aiout");
  const promptEl = document.getElementById("prompt");
  const historyEl = document.getElementById("history");
  const history = [];

  function escapeHtml(s){ return s.replace(/&/g,"&amp;").replace(/</g,"&lt;"); }
  function updateGutter(){
    const n = codeEl.value.split("\n").length;
    gutter.textContent = Array.from({length:n},(_,i)=>i+1).join("\n");
  }
  function setCode(text){ codeEl.value = text; updateGutter(); hideSuggest(); }
  function loadSample(){ setCode(D.samples[lang]); }
  function setLang(l){
    lang = l;
    document.querySelectorAll(".langbtns button").forEach(b=>b.classList.toggle("active", b.dataset.lang===l));
    document.getElementById("langLabel").textContent = l === "python" ? "Python" : l === "javascript" ? "JavaScript" : "HTML";
    loadSample(); renderSnippets();
  }
  function hideSuggest(){ suggestBox.classList.remove("show"); pendingSuggestion=null; pendingFull=null; }
  function currentLine(){
    const pos = codeEl.selectionStart || 0;
    const before = codeEl.value.slice(0, pos);
    const line = before.split("\n").pop().trim();
    return { line, before, pos };
  }
  function checkAutocomplete(){
    const { line } = currentLine();
    if(!line){ hideSuggest(); return; }
    const key = line.toLowerCase().replace(/[^a-z<>]/g,"");
    const match = D.autocomplete.find(a => a.lang===lang && key.startsWith(a.trigger) && a.completion.toLowerCase() !== line.toLowerCase());
    if(!match){ hideSuggest(); return; }
    pendingFull = match.completion;
    pendingSuggestion = match.completion;
    suggestText.textContent = match.label + ": " + match.completion;
    suggestBox.classList.add("show");
  }
  function acceptSuggestion(){
    if(!pendingFull) return;
    const { before, pos } = currentLine();
    const after = codeEl.value.slice(pos);
    const lastNl = before.lastIndexOf("\n");
    const newVal = before.slice(0, lastNl+1) + pendingFull + after;
    setCode(newVal);
    codeEl.focus();
  }
  function renderSnippets(){
    const wrap = document.getElementById("snippets");
    wrap.innerHTML = "";
    D.snippets.filter(s=>s.lang===lang).forEach(s=>{
      const d = document.createElement("div");
      d.className="snip";
      d.innerHTML = "<b>"+escapeHtml(s.title)+"</b> <span>· click to insert</span><pre>"+escapeHtml(s.code)+"</pre>";
      d.onclick = ()=>{ setCode(codeEl.value ? codeEl.value + "\n\n" + s.code : s.code); };
      wrap.appendChild(d);
    });
  }
  function addHistory(p){ history.unshift(p); historyEl.innerHTML = history.slice(0,5).map(h=>"<div>• <b>"+escapeHtml(h)+"</b></div>").join("") || "No prompts yet."; }
  function generate(){
    const q = promptEl.value.trim().toLowerCase();
    if(!q){ aiout.innerHTML="<h4>Prompt needed</h4>Please write a prompt first, e.g. 'Python me login function banao'."; return; }
    const match = D.prompts.find(p => p.keywords.some(k=>q.includes(k)));
    if(match){
      setCode(match.code);
      aiout.innerHTML = "<h4>Generated: "+escapeHtml(match.title)+"</h4>Code has been inserted into the editor. This is a template match, not an LLM generation.";
      addHistory(promptEl.value.trim());
    } else {
      aiout.innerHTML = "<h4>No template matched</h4>Try one of these prompts:\n• Python me login function banao\n• JavaScript me array sort karo\n• Python me fibonacci banao\n• JavaScript me fetch API use karo\n• HTML me login form banao";
    }
  }
  function explain(){
    const code = codeEl.value;
    if(!code.trim()){ aiout.textContent="Editor is empty. Load a sample first."; return; }
    const lines = [];
    if(/def |function /.test(code)) lines.push("• This code defines a function — a reusable block that runs when called.");
    if(/for |while/.test(code)) lines.push("• It uses a loop, so the same step repeats for each item / while a condition is true.");
    if(/if /.test(code)) lines.push("• It uses an if condition to make a decision based on a value.");
    if(/class /.test(code)) lines.push("• It defines a class, a blueprint for creating objects with data and methods.");
    if(/fetch|await/.test(code)) lines.push("• It fetches data from an API and waits for the response before continuing.");
    if(/print\(|console\.log/.test(code)) lines.push("• It prints output so you can see the result.");
    if(/return/.test(code)) lines.push("• It returns a value from a function to the caller.");
    if(/<div|<form|<nav/.test(code)) lines.push("• This is HTML markup that structures a web page (headings, forms, navigation).");
    if(!lines.length) lines.push("• This code has no common construct I recognise yet — try a sample from the language switcher.");
    aiout.innerHTML = "<h4>Code explanation ("+lang+")</h4>" + lines.join("\n") + "\n\nLines: " + code.split("\n").length + " · Characters: " + code.length;
  }
  function findBugs(){
    const code = codeEl.value; const bugs=[];
    code.split("\n").forEach((line,i)=>{
      const n=i+1, t=line.trim();
      if(lang==="python" && /^(def|if|for|while|class|elif|else|try|except)\b.*[^:]$/.test(t) && !t.endsWith(":")) bugs.push("Line "+n+": possible missing ':' at the end — Python blocks need a colon.");
      if(lang==="python" && /print\s+[^(]/.test(t)) bugs.push("Line "+n+": print without parentheses — in Python 3 use print(...).");
      if(lang==="javascript" && /if\s*\(.*[^=!<>]=(?!=)/.test(t)) bugs.push("Line "+n+": single '=' inside if — did you mean '===' for comparison?");
      if(lang==="javascript" && /\bvar\s+/.test(t)) bugs.push("Line "+n+": 'var' is old-style — prefer 'let' or 'const'.");
    });
    const varMatch = code.match(/\b(?:let|const|var)\s+(\w+)/);
    if(varMatch && !code.split(varMatch[0]).slice(1).join("").includes(varMatch[1])) bugs.push("Possible unused variable: '"+varMatch[1]+"' is declared but never used later.");
    if(!bugs.length) bugs.push("No common mistakes found in this quick check. This is a simple pattern check, not a full compiler.");
    aiout.innerHTML = "<h4>Bug check</h4>" + bugs.join("\n");
  }
  function refactor(){
    const code = codeEl.value;
    let improved = null, note="";
    if(lang==="python" && /for .* in .*:\n\s+\w+\.append/.test(code)){ improved = code.replace(/for (\w+) in (\w+):\n\s+\w+\.append\(([^)]+)\)/, "result = [$3 for $1 in $2]"); note="Loop + append converted to a list comprehension (shorter, faster to read)."; }
    else if(lang==="javascript" && /\bvar\s+/.test(code)){ improved = code.replace(/\bvar\s+/g,"const "); note="'var' replaced with 'const' where possible — review before using."; }
    else if(lang==="python" && /" \+ /.test(code)){ improved = code.replace(/" \+ /g,'" + f"'); note="String concatenation flagged — consider an f-string for readability."; }
    else if(code.includes("console.log")){ improved = code; note="No safe automatic refactor for this code. Tip: extract repeated console.log calls into a helper function."; }
    else { improved = code; note="No common refactor pattern matched. Tip: break long functions into smaller, named functions."; }
    refactorCode = improved;
    aiout.innerHTML = "<h4>Refactor suggestion</h4>" + note + "\n\nImproved code:\n" + improved + "\n\n(Click 'Apply refactor' to replace the editor code.)";
  }

  document.querySelectorAll(".langbtns button").forEach(b=>b.onclick=()=>setLang(b.dataset.lang));
  document.getElementById("sampleBtn").onclick = loadSample;
  document.getElementById("clearBtn").onclick = ()=>setCode("");
  document.getElementById("copyBtn").onclick = async ()=>{
    try{ await navigator.clipboard.writeText(codeEl.value); aiout.textContent="Code copied to clipboard."; }
    catch(e){ codeEl.select(); document.execCommand("copy"); aiout.textContent="Code copied (fallback)."; }
  };
  document.getElementById("acceptBtn").onclick = acceptSuggestion;
  document.getElementById("generateBtn").onclick = generate;
  document.getElementById("explainBtn").onclick = explain;
  document.getElementById("bugBtn").onclick = findBugs;
  document.getElementById("refactorBtn").onclick = refactor;
  document.getElementById("applyRefactorBtn").onclick = ()=>{ if(refactorCode!==null){ setCode(refactorCode); aiout.textContent="Refactor applied to the editor."; } };
  document.querySelectorAll(".chip").forEach(c=>c.onclick=()=>{ promptEl.value=c.dataset.prompt; generate(); });
  codeEl.addEventListener("input", ()=>{ updateGutter(); checkAutocomplete(); });
  codeEl.addEventListener("keydown", (e)=>{
    if(e.key==="Tab" && pendingFull){ e.preventDefault(); acceptSuggestion(); }
  });
  codeEl.addEventListener("scroll", ()=>{ gutter.scrollTop = codeEl.scrollTop; });
  setLang("python");
})();
