// Khai báo API Key của Gemini
const API_KEY = "AIzaSyDVYuI-YTZDAs-xLKB1KCXVYUBuTRUUdec"; // ← Thay bằng API Key thật của bạn

// Lấy các phần tử giao diện từ HTML
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Gắn sự kiện click cho nút Gửi
sendBtn.addEventListener('click', sendMessage);

// Gắn sự kiện nhấn phím Enter để gửi
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

// Hàm tạo tin nhắn mới và hiển thị lên giao diện
function appendMessage(text, className) {
  const msg = document.createElement('div');
  msg.className = `message ${className}`;
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Hàm gửi tin nhắn người dùng và nhận phản hồi từ Gemini
async function sendMessage() {
  const userText = userInput.value.trim();
  if (!userText) return;

  appendMessage(userText, 'user-message');
  userInput.value = '';
  appendMessage("...", 'bot-message');

  try {
    const botReply = await callGemini(userText);
    document.querySelector('.bot-message:last-child').textContent = botReply;
  } catch (error) {
    document.querySelector('.bot-message:last-child').textContent = "Lỗi gọi API 😥";
    console.error(error);
  }
}

// Hàm gọi API Gemini để lấy phản hồi
async function callGemini(userText) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;


  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [
        { role: "user", parts: [{ text: userText }] }
      ]
    })
  });

  if (!response.ok) throw new Error(await response.text());

  const data = await response.json();
  return data.candidates[0].content.parts[0].text.trim();
}