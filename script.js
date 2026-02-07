let template = "url";
let qr;

const inputsDiv = document.getElementById("inputs");
const qrContainer = document.getElementById("qrCode");

setTemplate("url");

function setTemplate(type) {
  template = type;
  inputsDiv.innerHTML = "";

  if (type === "url") {
    inputsDiv.innerHTML = `<input id="data" placeholder="https://example.com">`;
  }

  if (type === "phone") {
    inputsDiv.innerHTML = `<input id="data" placeholder="+91XXXXXXXXXX">`;
  }

  if (type === "email") {
    inputsDiv.innerHTML = `
      <input id="email" placeholder="email@example.com">
      <input id="subject" placeholder="Subject">
    `;
  }

  if (type === "wifi") {
    inputsDiv.innerHTML = `
      <input id="ssid" placeholder="WiFi Name">
      <input id="pass" placeholder="Password">
    `;
  }
}

function generateQR() {
  qrContainer.innerHTML = "";

  let data = "";

  if (template === "url" || template === "phone") {
    data = document.getElementById("data").value;
  }

  if (template === "email") {
    const e = document.getElementById("email").value;
    const s = document.getElementById("subject").value;
    data = `mailto:${e}?subject=${encodeURIComponent(s)}`;
  }

  if (template === "wifi") {
    const ssid = document.getElementById("ssid").value;
    const pass = document.getElementById("pass").value;
    data = `WIFI:T:WPA;S:${ssid};P:${pass};;`;
  }

  const c1 = document.getElementById("color1").value;
  const c2 = document.getElementById("color2").value;

  qr = new QRCodeStyling({
    width: 200,
    height: 200,
    data: data,
    dotsOptions: {
      type: "rounded",
      gradient: {
        type: "linear",
        rotation: 0,
        colorStops: [
          { offset: 0, color: c1 },
          { offset: 1, color: c2 }
        ]
      }
    },
    backgroundOptions: {
      color: "#ffffff"
    }
  });

  qr.append(qrContainer);
}

function downloadPoster() {
  html2canvas(document.getElementById("poster")).then(canvas => {
    const link = document.createElement("a");
    link.download = "qr-poster.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}
