# VConnn - Mobile Video Editor

Aplikasi pembuat video pendek 100% gratis untuk Android dan iOS dengan fitur editing profesional.

## 📱 Platform
- **Android** (5.0+)
- **iOS** (12.0+)

## ✨ Fitur Unggulan

### 🎥 Recording
- Perekaman video langsung dari kamera
- Durasi 15-60 detik (otomatis stop)
- Toggle flash & switch front/back camera
- Real-time recording duration counter
- Progress bar saat recording

### ✂️ Trimming & Cutting
- Potong video dengan presisi per detik
- Slide trim start & end points
- Durasi display real-time
- Preview sebelum export

### 🎨 Effects & Filters
- **Brightness Control** - Sesuaikan kecerahan video
- **Contrast Adjustment** - Ubah kontras untuk efek dramatis
- **Saturation Control** - Kontrol warna vividness
- **Filter Presets**:
  - Normal
  - Vivid
  - Cool
  - Warm
  - Black & White
  - Sepia

### 📝 Text Overlay
- Tambahkan teks dengan mudah
- Customizable font size & color
- Positionable text overlay
- Multiple text layers support

### 🎵 Music Library
- Ribuan musik royalty-free
- Integrasi dengan Pexels Music
- Preview audio sebelum dipakai

### ⚡ Speed Control
- Kecepatan 0.5x - 2x
- Quick preset buttons (0.5x, 0.75x, 1x, 1.5x, 2x)
- Smooth speed transitions

### 🎬 Transitions
- Fade
- Slide
- Zoom
- Cross dissolve

### 📤 Export
- Multiple quality options (480p, 720p, 1080p)
- Automatic save to device gallery
- Background export processing
- Progress indication

### 📱 Gallery Management
- View all saved videos
- Edit existing videos
- Delete videos
- Rename videos
- Share to social media (TikTok, Instagram)
- Auto-organized by creation date

## 🛠️ Tech Stack

- **Framework**: React Native dengan Expo
- **UI Library**: React Native Paper
- **State Management**: Zustand
- **Video Processing**: 
  - expo-av (playback)
  - expo-camera (recording)
- **Media Library**: expo-media-library
- **Navigation**: React Navigation
- **Storage**: Async Storage + Device Storage
- **Icons**: Material Community Icons

## 📋 Prerequisites

- Node.js 16 atau lebih tinggi
- npm atau yarn
- Expo CLI: `npm install -g expo-cli`
- Android Studio (untuk testing Android)
- Xcode (untuk testing iOS)

## 🚀 Setup & Installation

### 1. Clone Repository
```bash
git clone https://github.com/sosialmaster369-rgb/VConnn.git
cd VConnn
```

### 2. Install Dependencies
```bash
npm install
# atau
yarn install
```

### 3. Install Expo CLI (jika belum)
```bash
npm install -g expo-cli
```

### 4. Start Development Server
```bash
npm start
# atau
expo start
```

### 5. Run on Device/Emulator

**Android:**
- Tekan `a` di terminal untuk membuka Android Emulator
- Atau scan QR code dengan Expo Go app

**iOS:**
- Tekan `i` di terminal untuk membuka iOS Simulator
- Atau scan QR code dengan Expo Go app

## 📁 Project Structure

```
VConnn/
├── app/
│   ├── screens/
│   │   ├── HomeScreen.js          # Halaman utama & dashboard
│   │   ├── CameraScreen.js        # Perekaman video
│   │   ├── EditorScreen.js        # Editor lengkap dengan semua fitur
│   │   ├── GalleryScreen.js       # Library video & management
│   │   └── SettingsScreen.js      # Pengaturan app
│   ├── store/
│   │   └── videoStore.js          # Zustand state management
│   ├── components/
│   │   ├── VideoPreview.js        # Preview component
│   │   └── EffectControls.js      # Effect control component
│   ├── utils/
│   │   ├── videoProcessor.js      # Video processing utilities
│   │   └── constants.js           # App constants
│   └── index.js                   # App entry point
├── assets/
│   ├── icon.png
│   ├── splash.png
│   └── adaptive-icon.png
├── package.json
├── app.json                       # Expo configuration
├── babel.config.js
├── .gitignore
├── .env.example
└── README.md
```

## 🎮 Cara Menggunakan

### Membuat Video Baru
1. Tap tab **Camera**
2. Tap tombol **Rekam** untuk mulai recording
3. Record hingga minimal 15 detik (maksimal 60 detik)
4. Tap **Selesai** untuk stop recording

### Edit Video
1. Video akan otomatis dibuka di **Editor**
2. Gunakan tab untuk edit:
   - **Trim**: Potong video
   - **Effects**: Sesuaikan brightness, contrast, saturation
   - **Speed**: Ubah kecepatan video
   - **Text**: Tambah teks overlay
3. Preview perubahan di video preview area
4. Tap **Export** untuk simpan

### Manage Video
1. Buka tab **Gallery**
2. Pilih video untuk:
   - ✏️ Edit (ubah settings)
   - 📤 Share (bagikan ke social media)
   - 📝 Rename (ganti nama file)
   - 🗑️ Delete (hapus video)

## 🔧 Configuration

### Environment Variables
Buat file `.env` di root project:
```
PEXELS_API_KEY=your_pexels_api_key
MUSIC_API_KEY=your_music_api_key
```

### App Settings
Edit `app.json` untuk customize:
- App name & slug
- Icon & splash screen
- iOS & Android package names
- Permissions

## 📦 Dependencies

### Core Dependencies
```json
{
  "expo": "~50.0.0",
  "react": "^18.2.0",
  "react-native": "^0.73.0",
  "react-native-paper": "^5.11.0",
  "zustand": "^4.4.0"
}
```

### Media & Camera
```json
{
  "expo-camera": "^14.0.0",
  "expo-media-library": "^15.0.0",
  "expo-av": "^13.0.0",
  "expo-video": "^0.4.0"
}
```

### Navigation
```json
{
  "@react-navigation/native": "^6.1.0",
  "@react-navigation/bottom-tabs": "^6.5.0",
  "react-native-screens": "^3.27.0",
  "react-native-safe-area-context": "^4.8.0"
}
```

## 🐛 Known Issues

- Text overlay positioning perlu penyempurnaan pada devices berbeda
- FFmpeg integration masih dalam tahap development
- Music library API integration belum final

## 📋 Roadmap (Fitur Mendatang)

- [ ] Advanced color grading tools
- [ ] Sticker & emoji library
- [ ] Custom transition effects
- [ ] Video templates
- [ ] Cloud backup & sync
- [ ] Multi-track audio editing
- [ ] Green screen effects
- [ ] Face filters & AR effects
- [ ] Direct upload ke TikTok
- [ ] Offline editing support
- [ ] Collaboration features
- [ ] Analytics & view counter

## 🤝 Contributing

Kontribusi sangat diterima! Berikut cara berkontribusi:

1. Fork repository
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Development Guidelines
- Follow React Native best practices
- Use meaningful commit messages
- Add comments untuk complex logic
- Test sebelum submit PR

## 📄 License

Project ini dilisensikan di bawah **MIT License** - lihat file [LICENSE](LICENSE) untuk detail lengkap.

## 📞 Support & Contact

Untuk pertanyaan, saran, atau laporan bug:
- 📧 Email: support@vconnn.app
- 🐛 Issues: [GitHub Issues](https://github.com/sosialmaster369-rgb/VConnn/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/sosialmaster369-rgb/VConnn/discussions)

## 👨‍💻 Author

**sosialmaster369-rgb**
- GitHub: [@sosialmaster369-rgb](https://github.com/sosialmaster369-rgb)

## 🙏 Acknowledgments

- Expo team untuk framework yang awesome
- React Native Paper untuk UI components
- Pexels untuk royalty-free media
- Community contributors

---

⭐ **Jika Anda menyukai project ini, jangan lupa berikan bintang!**

**Happy Video Creating! 🎬✨**
