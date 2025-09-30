// Lấy phần tử
const modal = document.getElementById("myModal");
const modalTitle = document.getElementById("modal-title");
const modalText = document.getElementById("modal-text");
const closeBtn = document.querySelector(".close");

// Nút Add work
document.getElementById("add-work").onclick = function() {
  modalTitle.textContent = "Add Work";
  modalText.textContent = "Điền thông tin công việc bạn muốn thêm.";
  modal.style.display = "flex";
};

// Nút Delete work
document.getElementById("delete-work").onclick = function() {
  modalTitle.textContent = "Delete Work";
  modalText.textContent = "Chọn công việc bạn muốn xóa.";
  modal.style.display = "flex";
};

// Nút X đóng modal
closeBtn.onclick = function() {
  modal.style.display = "none";
};

// Click ra ngoài modal cũng đóng
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
