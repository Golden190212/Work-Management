// Điều hướng giữa các trang (dùng chung cho toàn web)

// Hàm chuyển trang
function goTo(page) {
  window.location.href = page;
}

// Gán sự kiện sau khi DOM sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
  // Lấy các nút điều hướng
  const homeBtn = document.getElementById("home");
  const workBtn = document.getElementById("work");
  const chartBtn = document.getElementById("chart");
  const chatbotBtn = document.getElementById("chatbot-btn");
  const logoutBtn = document.getElementById("logout");

  // Gán sự kiện click cho từng nút
  if (homeBtn) homeBtn.onclick = () => goTo("index.html");
  if (workBtn) workBtn.onclick = () => goTo("work.html");
  if (chartBtn) chartBtn.onclick = () => goTo("chart.html");
  if (chatbotBtn) chatbotBtn.onclick = () => goTo("chatbot.html");
  if (logoutBtn) logoutBtn.onclick = () => goTo("register.html");

  // Xác định trang hiện tại để đánh dấu nút đang active
  const currentPage = window.location.pathname.split("/").pop();
  document.querySelectorAll(".tab").forEach(btn => {
    const id = btn.id;
    const isActive =
      (currentPage === "index.html" && id === "home") ||
      (currentPage === "work.html" && id === "work") ||
      (currentPage === "chart.html" && id === "chart") ||
      (currentPage === "chatbot.html" && id === "chatbot-btn");

    btn.classList.toggle("active", isActive);
  });
});// Điều hướng giữa các trang (dùng chung cho toàn web)

// Hàm chuyển trang
function goTo(page) {
  window.location.href = page;
}

// Gán sự kiện sau khi DOM sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
  // Lấy các nút điều hướng
  const homeBtn = document.getElementById("home");
  const workBtn = document.getElementById("work");
  const chartBtn = document.getElementById("chart");
  const chatbotBtn = document.getElementById("chatbot-btn");
  const logoutBtn = document.getElementById("logout");

  // Gán sự kiện click cho từng nút
  if (homeBtn) homeBtn.onclick = () => goTo("index.html");
  if (workBtn) workBtn.onclick = () => goTo("work.html");
  if (chartBtn) chartBtn.onclick = () => goTo("chart.html");
  if (chatbotBtn) chatbotBtn.onclick = () => goTo("chatbot.html");
  if (logoutBtn) logoutBtn.onclick = () => goTo("register.html");

  // Xác định trang hiện tại để đánh dấu nút đang active
  const currentPage = window.location.pathname.split("/").pop();
  document.querySelectorAll(".tab").forEach(btn => {
    const id = btn.id;
    const isActive =
      (currentPage === "index.html" && id === "home") ||
      (currentPage === "work.html" && id === "work") ||
      (currentPage === "chart.html" && id === "chart") ||
      (currentPage === "chatbot.html" && id === "chatbot-btn");

    btn.classList.toggle("active", isActive);
  });
});