document.getElementById("lostForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const imei = document.getElementById("imei").value;
  const brand = document.getElementById("brand").value;
  const email = document.getElementById("email").value;

  if (imei.length !== 15) {
    alert("IMEI must be 15 digits");
    return;
  }

  const record = {
    imei,
    brand,
    email,
    date: new Date().toLocaleString()
  };

  let data = JSON.parse(localStorage.getItem("lostPhones")) || [];
  data.push(record);
  localStorage.setItem("lostPhones", JSON.stringify(data));

  document.getElementById("message").innerText =
    "✅ Your lost phone record has been saved safely.";

  document.getElementById("lostForm").reset();
});
