// CodePilot data: autocomplete patterns + prompt-to-code templates.
// All local, template-based. No API, no LLM.
window.CODEPILOT_DATA = {
  samples: {
    python: [
      "def greet(name):",
      "    print(f\"Hello, {name}!\")",
      "",
      "",
      "for i in range(5):",
      "    greet(\"World\")"
    ].join("\n"),
    javascript: [
      "function greet(name) {",
      "  console.log(`Hello, ${name}!`);",
      "}",
      "",
      "for (let i = 0; i < 5; i++) {",
      "  greet(\"World\");",
      "}"
    ].join("\n"),
    html: [
      "<!DOCTYPE html>",
      "<html>",
      "<head>",
      "  <title>My Page</title>",
      "</head>",
      "<body>",
      "  <h1>Hello, World!</h1>",
      "</body>",
      "</html>"
    ].join("\n")
  },

  // Autocomplete: trigger = text the user has typed on the current line (prefix match, case-insensitive)
  // completion = full text that replaces / completes the line
  autocomplete: [
    // Python
    { lang: "python", trigger: "for", completion: "for i in range(10):\n    print(i)", label: "for loop" },
    { lang: "python", trigger: "def", completion: "def my_function():\n    return True", label: "function definition" },
    { lang: "python", trigger: "if", completion: "if x > 0:\n    print(\"positive\")", label: "if statement" },
    { lang: "python", trigger: "while", completion: "while count < 10:\n    count += 1", label: "while loop" },
    { lang: "python", trigger: "print", completion: "print(\"Hello, World!\")", label: "print" },
    { lang: "python", trigger: "class", completion: "class User:\n    def __init__(self, name):\n        self.name = name", label: "class" },
    { lang: "python", trigger: "import", completion: "import os", label: "import" },
    { lang: "python", trigger: "try", completion: "try:\n    result = 10 / 2\nexcept ZeroDivisionError:\n    print(\"Cannot divide by zero\")", label: "try / except" },
    { lang: "python", trigger: "list", completion: "numbers = [1, 2, 3, 4, 5]", label: "list" },
    { lang: "python", trigger: "dict", completion: "user = {\"name\": \"Ali\", \"age\": 22}", label: "dictionary" },
    { lang: "python", trigger: "open", completion: "with open(\"data.txt\", \"r\") as f:\n    content = f.read()", label: "open file" },
    { lang: "python", trigger: "return", completion: "return result", label: "return" },
    // JavaScript
    { lang: "javascript", trigger: "function", completion: "function myFunction() {\n  return true;\n}", label: "function" },
    { lang: "javascript", trigger: "const", completion: "const result = 0;", label: "const" },
    { lang: "javascript", trigger: "let", completion: "let count = 0;", label: "let" },
    { lang: "javascript", trigger: "if", completion: "if (x > 0) {\n  console.log(\"positive\");\n}", label: "if statement" },
    { lang: "javascript", trigger: "for", completion: "for (let i = 0; i < 10; i++) {\n  console.log(i);\n}", label: "for loop" },
    { lang: "javascript", trigger: "console", completion: "console.log(\"Hello, World!\");", label: "console.log" },
    { lang: "javascript", trigger: "fetch", completion: "fetch(\"https://api.example.com/data\")\n  .then(res => res.json())\n  .then(data => console.log(data));", label: "fetch API" },
    { lang: "javascript", trigger: "arrow", completion: "const add = (a, b) => a + b;", label: "arrow function" },
    { lang: "javascript", trigger: "map", completion: "const doubled = numbers.map(n => n * 2);", label: "array map" },
    { lang: "javascript", trigger: "addEvent", completion: "document.addEventListener(\"click\", () => {\n  console.log(\"clicked\");\n});", label: "event listener" },
    { lang: "javascript", trigger: "try", completion: "try {\n  const result = 10 / 2;\n} catch (err) {\n  console.error(err);\n}", label: "try / catch" },
    // HTML
    { lang: "html", trigger: "<div", completion: "<div class=\"card\">\n  <h2>Title</h2>\n  <p>Text here</p>\n</div>", label: "div card" },
    { lang: "html", trigger: "<button", completion: "<button onclick=\"handleClick()\">Click me</button>", label: "button" },
    { lang: "html", trigger: "<form", completion: "<form>\n  <input type=\"text\" placeholder=\"Name\">\n  <button type=\"submit\">Submit</button>\n</form>", label: "form" }
  ],

  // Prompt templates: keywords matched (lowercase) -> code
  prompts: [
    { lang: "python", keywords: ["login", "log in"], title: "Login function (Python)", code: "def login(username, password):\n    users = {\"ali\": \"1234\", \"sara\": \"abcd\"}\n    if username in users and users[username] == password:\n        return \"Login successful\"\n    return \"Invalid username or password\"\n\n\nprint(login(\"ali\", \"1234\"))" },
    { lang: "python", keywords: ["sort", "sorting"], title: "Sort a list (Python)", code: "numbers = [5, 2, 9, 1, 7]\nnumbers.sort()\nprint(numbers)  # [1, 2, 5, 7, 9]\n\nnames = [\"Zara\", \"Ali\", \"Mona\"]\nprint(sorted(names))" },
    { lang: "python", keywords: ["fibonacci"], title: "Fibonacci (Python)", code: "def fibonacci(n):\n    a, b = 0, 1\n    result = []\n    for _ in range(n):\n        result.append(a)\n        a, b = b, a + b\n    return result\n\n\nprint(fibonacci(10))" },
    { lang: "python", keywords: ["factorial"], title: "Factorial (Python)", code: "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\n\nprint(factorial(5))  # 120" },
    { lang: "python", keywords: ["palindrome"], title: "Palindrome check (Python)", code: "def is_palindrome(text):\n    clean = text.lower().replace(\" \", \"\")\n    return clean == clean[::-1]\n\n\nprint(is_palindrome(\"madam\"))  # True" },
    { lang: "python", keywords: ["reverse", "string"], title: "Reverse a string (Python)", code: "text = \"hello\"\nreversed_text = text[::-1]\nprint(reversed_text)  # olleh" },
    { lang: "python", keywords: ["prime"], title: "Prime check (Python)", code: "def is_prime(n):\n    if n < 2:\n        return False\n    for i in range(2, int(n ** 0.5) + 1):\n        if n % i == 0:\n            return False\n    return True\n\n\nprint(is_prime(17))  # True" },
    { lang: "python", keywords: ["average", "mean"], title: "Average of numbers (Python)", code: "numbers = [10, 20, 30, 40]\naverage = sum(numbers) / len(numbers)\nprint(average)  # 25.0" },
    { lang: "python", keywords: ["even", "odd"], title: "Even / odd (Python)", code: "def check(number):\n    if number % 2 == 0:\n        return \"Even\"\n    return \"Odd\"\n\n\nprint(check(7))  # Odd" },
    { lang: "python", keywords: ["calculator", "add", "sum"], title: "Simple calculator (Python)", code: "def add(a, b):\n    return a + b\n\n\ndef subtract(a, b):\n    return a - b\n\n\nprint(add(5, 3))       # 8\nprint(subtract(5, 3))  # 2" },
    { lang: "python", keywords: ["todo", "task"], title: "Todo list (Python)", code: "tasks = []\n\n\ndef add_task(task):\n    tasks.append(task)\n\n\nadd_task(\"Learn Python\")\nadd_task(\"Build a project\")\nprint(tasks)" },
    { lang: "javascript", keywords: ["sort", "array"], title: "Sort an array (JavaScript)", code: "const numbers = [5, 2, 9, 1, 7];\nnumbers.sort((a, b) => a - b);\nconsole.log(numbers); // [1, 2, 5, 7, 9]" },
    { lang: "javascript", keywords: ["fetch", "api"], title: "Fetch data from API (JavaScript)", code: "async function getUsers() {\n  const res = await fetch(\"https://jsonplaceholder.typicode.com/users\");\n  const users = await res.json();\n  console.log(users);\n}\n\ngetUsers();" },
    { lang: "javascript", keywords: ["login", "validation", "validate"], title: "Login validation (JavaScript)", code: "function validateLogin(email, password) {\n  if (!email.includes(\"@\")) return \"Invalid email\";\n  if (password.length < 6) return \"Password too short\";\n  return \"Login OK\";\n}\n\nconsole.log(validateLogin(\"ali@test.com\", \"123456\"));" },
    { lang: "javascript", keywords: ["debounce"], title: "Debounce (JavaScript)", code: "function debounce(fn, delay) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}\n\nconst onSearch = debounce((q) => console.log(q), 300);" },
    { lang: "javascript", keywords: ["fibonacci"], title: "Fibonacci (JavaScript)", code: "function fibonacci(n) {\n  const result = [0, 1];\n  for (let i = 2; i < n; i++) {\n    result.push(result[i - 1] + result[i - 2]);\n  }\n  return result.slice(0, n);\n}\n\nconsole.log(fibonacci(10));" },
    { lang: "javascript", keywords: ["factorial"], title: "Factorial (JavaScript)", code: "function factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}\n\nconsole.log(factorial(5)); // 120" },
    { lang: "javascript", keywords: ["palindrome"], title: "Palindrome check (JavaScript)", code: "function isPalindrome(text) {\n  const clean = text.toLowerCase().replace(/ /g, \"\");\n  return clean === clean.split(\"\").reverse().join(\"\");\n}\n\nconsole.log(isPalindrome(\"madam\")); // true" },
    { lang: "javascript", keywords: ["todo"], title: "Todo list (JavaScript)", code: "const tasks = [];\n\nfunction addTask(task) {\n  tasks.push(task);\n}\n\naddTask(\"Learn JavaScript\");\naddTask(\"Build a project\");\nconsole.log(tasks);" },
    { lang: "javascript", keywords: ["counter"], title: "Counter (JavaScript)", code: "let count = 0;\n\nfunction increment() {\n  count++;\n  console.log(count);\n}\n\nincrement();\nincrement();" },
    { lang: "html", keywords: ["card", "profile"], title: "Profile card (HTML)", code: "<div class=\"card\">\n  <h2>Ali Raza</h2>\n  <p>AI Developer</p>\n  <button>Contact</button>\n</div>" },
    { lang: "html", keywords: ["form", "login"], title: "Login form (HTML)", code: "<form>\n  <label>Email</label>\n  <input type=\"email\" placeholder=\"you@test.com\">\n  <label>Password</label>\n  <input type=\"password\" placeholder=\"Password\">\n  <button type=\"submit\">Login</button>\n</form>" },
    { lang: "html", keywords: ["navbar", "nav"], title: "Navbar (HTML)", code: "<nav>\n  <a href=\"#\">Home</a>\n  <a href=\"#\">Projects</a>\n  <a href=\"#\">Contact</a>\n</nav>" }
  ],

  snippets: [
    { lang: "python", title: "For loop", code: "for i in range(5):\n    print(i)" },
    { lang: "python", title: "Function", code: "def greet(name):\n    return f\"Hello, {name}\"" },
    { lang: "python", title: "Read file", code: "with open(\"data.txt\") as f:\n    print(f.read())" },
    { lang: "javascript", title: "Fetch API", code: "fetch(\"/api/data\")\n  .then(r => r.json())\n  .then(console.log);" },
    { lang: "javascript", title: "Array map", code: "const doubled = [1, 2, 3].map(n => n * 2);" },
    { lang: "javascript", title: "Event listener", code: "document.querySelector(\"button\").addEventListener(\"click\", () => {\n  alert(\"Clicked!\");\n});" },
    { lang: "html", title: "Card", code: "<div class=\"card\">\n  <h2>Title</h2>\n  <p>Text</p>\n</div>" },
    { lang: "html", title: "Button", code: "<button>Click me</button>" }
  ]
};
