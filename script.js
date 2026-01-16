document.getElementById("lostForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const imei = document.getElementById("imei").value;
  const brand = document.getElementById("brand").value;
  const email = document.getElementById("email").value;

  const res = await fetch("https://YOUR-BACKEND-URL/report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imei, brand, email })
  });

  const data = await res.json();

  document.getElementById("message").innerText =
    data.success ? "✅ Report submitted & email sent" : "❌ Error occurred";
});
