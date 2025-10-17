// Điều hướng giữa các trang (dùng chung cho toàn web)

// Hàm chuyển trang
function goTo(page) {
  window.location.href = page;
}

// Gán sự kiện sau khi DOM sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
  const homeBtn = document.getElementById("home");
  const workBtn = document.getElementById("work");
  const chartBtn = document.getElementById("chart");
  const logoutBtn = document.getElementById("logout");

  // Điều hướng từng trang
  if (homeBtn) homeBtn.onclick = () => goTo("index.html");
  if (workBtn) workBtn.onclick = () => goTo("work.html");
  if (chartBtn) chartBtn.onclick = () => goTo("chart.html");

  // Nút logout → quay về trang đăng ký
  if (logoutBtn) logoutBtn.onclick = () => goTo("register.html");

  // Giữ trạng thái nút đang active
  const currentPage = window.location.pathname.split("/").pop();
  document.querySelectorAll(".tab").forEach(btn => {
    const id = btn.id;
    if (
      (currentPage === "index.html" && id === "home") ||
      (currentPage === "work.html" && id === "work") ||
      (currentPage === "chart.html" && id === "chart")
    ) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
});
