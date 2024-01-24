import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import './QRCodeGenerator.css';


const QRCodeGenerator = () => {
  const [url, setUrl] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [size, setSize] = useState('150x150');
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  const generateQRCode = () => {
    const encodedUrl = encodeURIComponent(url);
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${encodedUrl}&color=${foregroundColor.slice(1)}&bgcolor=${backgroundColor.slice(1)}`;
    setQrCode(qrCodeUrl);
  };

  const downloadPNG = () => {
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = 'QRCode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadSVG = () => {
    const svg = document.getElementById('qrCodeSvgElement');
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = 'QRCode.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="QRCodeGenerator">
      <h2>QR Code Generator</h2>
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <select value={size} onChange={(e) => setSize(e.target.value)}>
        <option value="150x150">150x150</option>
        <option value="200x200">200x200</option>
        <option value="250x250">250x250</option>
        <option value="300x300">300x300</option>
      </select>
      <input
        type="color"
        value={foregroundColor}
        onChange={(e) => setForegroundColor(e.target.value)}
        title="QR Code Color"
      />
      <input
        type="color"
        value={backgroundColor}
        onChange={(e) => setBackgroundColor(e.target.value)}
        title="Background Color"
      />
      <button onClick={generateQRCode}>Generate</button>
      {qrCode && (
        <div>
          <img src={qrCode} alt="QR Code" style={{ backgroundColor: backgroundColor }} />

          <QRCode
            id="qrCodeSvgElement"
            value={url}
            size={parseInt(size.split('x')[0])}
            level="Q"
            includeMargin={true}
            renderAs="svg"
            fgColor={foregroundColor}
            bgColor={backgroundColor}
            style={{ display: 'none' }}
          />
          <div>
            <button className='download-buttons' onClick={downloadPNG}>Download as PNG</button>
            <button className='download-buttons' onClick={downloadSVG}>Download as SVG</button>
          </div>

        </div>
      )}
    </div>
  );
}

export default QRCodeGenerator;
