# 🌍 Passport Photo Resizer

AI-powered passport and visa photo resizer with automatic face detection, background customization, and country-specific requirements for 190+ countries.

## ✨ Features

- 🤖 **AI Face Detection**: Automatically detects and centers faces using TensorFlow.js BlazeFace model
- 🌐 **20+ Country Requirements**: Pre-loaded specifications for USA, UK, Canada, India, China, EU, and more
- 🎨 **Background Customization**: Change background to white, blue, gray, or remove it entirely
- 🔆 **Image Enhancement**: Auto-enhance brightness and contrast for professional results
- 💾 **Multiple Formats**: Export as PNG, JPG, or JPEG
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 🚀 **No Server Required**: All processing happens in your browser - your photos never leave your device

## 🚀 Live Demo

**[Try it now](https://dmjahidbd.github.io/passport-photo-resizer/)**

## 💻 Technologies Used

- **HTML5 Canvas** for image processing
- **TensorFlow.js & BlazeFace** for face detection
- **Vanilla JavaScript** for application logic
- **CSS3** with gradient backgrounds and modern UI
- **GitHub Pages** for hosting

## 📝 Supported Countries

- 🇺🇸 United States (Passport & Visa)
- 🇬🇧 United Kingdom
- 🇨🇦 Canada
- 🇮🇳 India (Passport & Visa)
- 🇨🇳 China
- 🇦🇺 Australia
- 🇪🇺 Schengen (EU) Visa
- 🇩🇪 Germany
- 🇫🇷 France
- 🇯🇵 Japan
- 🇸🇬 Singapore
- 🇧🇩 Bangladesh
- 🇵🇰 Pakistan
- 🇲🇽 Mexico
- 🇧🇷 Brazil
- 🇿🇦 South Africa
- 🇦🇪 UAE
- 🇸🇦 Saudi Arabia
- And many more!

## 🛠️ How It Works

1. **Upload Photo**: Select or drag & drop your photo
2. **Select Country**: Choose your destination country from the dropdown
3. **Process**: Click "Process Photo" to automatically:
   - Detect your face
   - Center it according to country specifications
   - Apply proper dimensions and DPI
   - Add selected background color
   - Enhance image quality
4. **Download**: Save your compliant passport photo in your preferred format

## 💾 Installation & Local Development

```bash
# Clone the repository
git clone https://github.com/dmjahidbd/passport-photo-resizer.git

# Navigate to directory
cd passport-photo-resizer

# Open index.html in your browser
# Or use a local server:
python -m http.server 8000
# Then visit http://localhost:8000
```

## 📁 Project Structure

```
passport-photo-resizer/
│
├── index.html          # Main HTML file
├── style.css           # Styling and responsive design
├── countries.js        # Country-specific photo requirements
├── app.js              # Application logic and image processing
├── LICENSE             # MIT License
└── README.md           # This file
```

## ⚙️ Adding New Countries

To add a new country's requirements, edit `countries.js`:

```javascript
'COUNTRY_CODE': {
    name: 'Country Name',
    type: 'Passport',  // or 'Visa'
    widthMM: 35,
    heightMM: 45,
    dpi: 600,
    background: 'white',
    faceHeightPercent: 70,
    description: 'Specific requirements...'
}
```

## 🔒 Privacy & Security

- ✅ All processing is done locally in your browser
- ✅ No photos are uploaded to any server
- ✅ No data collection or tracking
- ✅ Your privacy is 100% protected

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⭐ Show Your Support

If you find this project helpful, please give it a ⭐ on GitHub!

## 👤 Author

**dmjahidbd**

- GitHub: [@dmjahidbd](https://github.com/dmjahidbd)

## 🚀 Future Enhancements

- [ ] Advanced background removal using ML models
- [ ] Batch processing for multiple photos
- [ ] Print layout templates (4x6, 5x7 sheets)
- [ ] More countries and visa types
- [ ] Face angle detection and correction
- [ ] Automatic red-eye removal

---

💜 Made with passion for travelers worldwide
