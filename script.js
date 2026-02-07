let template = "url";
let qr;

const inputsDiv = document.getElementById("inputs");
const qrBox = document.getElementById("qrCode");

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
      <input id="ssid" placeholder="Wi-Fi Name">
      <input id="pass" placeholder="Password">
    `;
  }
}

function toggleColorMode() {
  const mode = document.getElementById("colorMode").value;
  document.getElementById("singleColorBox").style.display =
    mode === "single" ? "block" : "none";
  document.getElementById("gradientBox").style.display =
    mode === "gradient" ? "flex" : "none";
}

function generateQR() {
  qrBox.innerHTML = "";

  let data = "";

  if (template === "url" || template === "phone") {
    data = document.getElementById("data").value;
  }

  if (template === "email") {
    data = `mailto:${email.value}?subject=${encodeURIComponent(subject.value)}`;
  }

  if (template === "wifi") {
    data = `WIFI:T:WPA;S:${ssid.value};P:${pass.value};;`;
  }

  const mode = document.getElementById("colorMode").value;
  let dotsOptions;

  if (mode === "single") {
    dotsOptions = {
      type: "rounded",
      color: document.getElementById("singleColor").value
    };
  } else {
    dotsOptions = {
      type: "rounded",
      gradient: {
        type: "linear",
        rotation: 0,
        colorStops: [
          { offset: 0, color: color1.value },
          { offset: 1, color: color2.value }
        ]
      }
    };
  }

  qr = new QRCodeStyling({
    width: 200,
    height: 200,
    data: data,
    dotsOptions: dotsOptions,
    backgroundOptions: { color: "#ffffff" }
  });

  qr.append(qrBox);
}

function downloadPoster() {
  html2canvas(document.getElementById("poster")).then(canvas => {
    const link = document.createElement("a");
    link.download = "qr-poster.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}
