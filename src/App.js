import "./App.css";
import { useState } from "react";


function App() {
  const [inputText, setInputText] = useState("");
  const [img, setImg] = useState("");
  const [size, setSize] = useState("");
  const [loading, setLoading] = useState(false);

  const generateQRButton = () => {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
        inputText
      )}`;
      setImg(url);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const downloadQRCode = () => {
    const link = document.createElement("a");
    link.href = img;
    link.download = "QRCode.png";
    link.click();
  };

  return (
    <div className="container">
      <h1>QR CODE GENERATOR</h1>
      {loading && <p>Please wait...</p>}
      {img && <img src={img} alt="Generated QR Code" className="qrimage" />}
      <div>
        <label htmlFor="datainput" className="input-label">
          Data for QR code
        </label>
        <input
          id="datainput"
          type="text"
          placeholder="Enter Data for QR code"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <label htmlFor="sizeinput" className="input-label">
          Enter image size (e.g., 150 for 150x150)
        </label>
        <input
          id="sizeinput"
          type="text"
          placeholder="Enter image size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
        <button
          type="button"
          disabled={loading || !inputText || !size}
          className="Generate-button"
          onClick={generateQRButton}
        >
          Generate QR code
        </button>
        {img && (
          <button
            type="button"
            className="download-button"
            onClick={downloadQRCode}
          >
            Download QR code
          </button>
        )}
      </div>
      <p className="Footer">Designed By:<a href="https://www.linkedin.com/in/dison-t-20241a315/">Dison Dys</a></p>
    </div>
  );
}

export default App;
