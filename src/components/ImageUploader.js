import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import '../App.css';

function ImageUploader() {
    const [image, setImage] = useState(null);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            extractTextFromImage(file);
        }
    };

    const extractTextFromImage = (imageFile) => {
        setLoading(true);
        setText("");

        Tesseract.recognize(
            imageFile,
            'eng+chi_sim',  // 支持英文和简体中文
            {
                // logger: (m) => console.log(m), // 日志输出
            }
        )
            .then(({ data: { text } }) => {
                setText(text);
                setLoading(false);
            })
            .catch((error) => {
                // console.error("识别错误:", error);
                setText("Text extraction failed");
                setLoading(false);
            });
    };

    return (
        <div className="container">
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {image && <img src={image} alt="Selected" />}
            {loading && <div className="loader">Text extraction is in progress, please wait...</div>}
            {text && (
                <div>
                    <h3>Extracted Text:</h3>
                    <p>{text}</p>
                </div>
            )}
        </div>
    );
}

export default ImageUploader;
