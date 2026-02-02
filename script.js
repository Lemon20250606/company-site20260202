// 年份
document.getElementById("year").textContent = new Date().getFullYear();

// 手機選單開關
const toggleBtn = document.querySelector(".nav-toggle");
const nav = document.getElementById("site-nav");

toggleBtn.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  toggleBtn.setAttribute("aria-expanded", String(isOpen));
});

// 點選導覽後自動收起（手機）
nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A" && nav.classList.contains("open")) {
    nav.classList.remove("open");
    toggleBtn.setAttribute("aria-expanded", "false");
  }
});

// 表單：用 mailto 方式（不需要後端）
const form = document.getElementById("contact-form");
const hint = document.getElementById("form-hint");

// 改成你的收件信箱
const TO_EMAIL = "hello@example.com";

function isValidEmail(email){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = form.elements["name"].value.trim();
  const email = form.elements["email"].value.trim();
  const message = form.elements["message"].value.trim();

  if (!name || !email || !message) {
    hint.textContent = "請填寫姓名、Email 與訊息。";
    return;
  }
  if (!isValidEmail(email)) {
    hint.textContent = "Email 格式看起來不正確，請再確認。";
    return;
  }

  const subject = encodeURIComponent(`網站詢問｜${name}`);
  const body = encodeURIComponent(
    `姓名：${name}\nEmail：${email}\n\n需求/訊息：\n${message}\n`
  );

  // 開啟使用者預設郵件軟體
  window.location.href = `mailto:${TO_EMAIL}?subject=${subject}&body=${body}`;

  hint.textContent = "已為你開啟 Email 草稿，請按送出即可。";
  form.reset();
});
