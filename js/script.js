function runTypingEffect() {
  const text = 'I am Uche Ucodes.';
  const typingElement = document.getElementById('typing-text');
  const typingDelay = 100;

  typeText(text, typingElement, typingDelay);
}

function typeText(text, typingElement, delay) {
  for (let i = 0; i < text.length; i++) {
    setTimeout(() => {
      typingElement.textContent += text.charAt(i);
    }, delay * i);
  }
}

document.addEventListener('DOMContentLoaded', runTypingEffect);

//

const form = document.getElementById('contact-form');
const status = document.getElementById('status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  };

  function showStatus(message, type) {
  status.textContent = message;

  // Remove previous styles
  status.classList.remove("success", "error");

  // Apply new style
  status.classList.add(type, "show");

  // Hide after 3 seconds
  setTimeout(() => {
    status.classList.remove("show");

    setTimeout(() => {
      status.textContent = "";
      status.classList.remove("success", "error");
    }, 300); // Wait for fade-out animation
  }, 3000);
}

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
        showStatus("✅ Message sent successfully!", "success");
        form.reset();
      } else {
      showStatus(result.message || "❌ Failed to send message.", "error");
      }
  } catch (error) {
      console.error(error);
     showStatus("⚠️ Something went wrong. Please try again.", "error");
    }
});