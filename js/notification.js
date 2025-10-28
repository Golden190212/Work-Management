document.addEventListener("DOMContentLoaded", () => {
  // Yêu cầu quyền thông báo nếu chưa có
  if (
    Notification.permission !== "granted" &&
    Notification.permission !== "denied"
  ) {
    Notification.requestPermission();
  }

  const WARNING_MINUTES = 20; //  Thời gian cảnh báo trước deadline (phút)

  // Hàm kiểm tra deadline và gửi thông báo
  function checkDeadlines() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const now = Date.now();
    let updated = false;

    tasks.forEach((task) => {
      if (task.done) return;

      const deadlineTime = new Date(task.deadline).getTime();
      const timeLeft = deadlineTime - now;

      // Gửi thông báo nếu còn ≤ 20 phút
      if (
        timeLeft <= WARNING_MINUTES * 60 * 1000 &&
        timeLeft > 0 &&
        !task.notified
      ) {
        sendNotification(task);
        task.notified = true;
        updated = true;
      }

      // ✅ Gắn cờ "gần hết hạn" để index.html nhận biết hiển thị
      const oneDay = 24 * 60 * 60 * 1000;
      task.nearDeadline = timeLeft > 0 && timeLeft <= oneDay;
    });

    if (updated) localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Hàm gửi thông báo
  function sendNotification(task) {
    if (Notification.permission === "granted") {
      new Notification("⏰ Sắp đến hạn công việc!", {
        body: `${task.name} chỉ còn khoảng 20 phút nữa (${task.deadline})`,
        icon: "https://cdn-icons-png.flaticon.com/512/565/565547.png",
      });

      // Phát âm thanh cảnh báo
      const audio = new Audio(
        "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c2d86e7a44.mp3?filename=notification-109070.mp3"
      );
      audio.play();
    }
  }

  // Kiểm tra mỗi phút
  setInterval(checkDeadlines, 60000);

  // Kiểm tra ngay khi mở trang
  checkDeadlines();
});
