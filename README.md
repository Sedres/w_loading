# 🌟 FiveM Modern Loading Screen

A sleek and fully customizable loading screen for your FiveM server! Designed with aesthetics and functionality in mind, this loading screen will enhance your players' experience while they wait to load into your server.

---

## 🔗 Useful Links

- 📝 **Forum Post on CFX**: [Visit Forum](#)
- 📚 **Documentation (GitBook)**: [Visit GitBook](#)

---

## ✨ Features

### 🎨 1. **Customizable Background**

- 🖼️ Set a background image, a local video, or even a YouTube video to make your loading screen stand out.

### 🎵 2. **Modern Music Player**

- 🎧 Integrated music player with:
  - ▶️ Play, ⏸️ Pause, and 🔊 Volume controls.
  - 🎼 Song title and artist display.

### 📱 3. **Social Media Integration**

- 🌐 Showcase your server’s social media links with intuitive icons for:
  - 💬 Discord
  - 📹 YouTube
  - 🎮 Twitch
  - 📸 Instagram
  - 🐦 Twitter

### 🖥️ 4. **Server Information**

- ⏳ A loading progress bar to keep players informed.
- 🪪 Display your server's logo prominently.

### 🗂️ 5. **Tabbed Information Sections**

- 📰 **News**: Display the latest updates or announcements about your server.
- 👥 **Team**: Introduce your team with profile cards featuring:
  - 🏷️ Name
  - 💼 Role
  - 🔗 Social links
- 📜 **Changelog**: Log all updates and bug fixes with a clean, timeline-style design.

---

## 📸 Screenshots

### 💎 **Main Loading Screen**

![Main Loading Section](https://github.com/user-attachments/assets/f24e75a9-a491-4ef9-bc8c-370c756d5506)

### 📰 **News Section**

![News Section](https://github.com/user-attachments/assets/f30bc3af-f92e-4f9b-9a40-bac0e63468d8)

### 👥 **Team Section**

![Team Section](https://github.com/user-attachments/assets/5b22747d-7d92-43ee-a79c-14d2b65c9453)

### 📜 **Changelog Section**

![Changelog Section](https://github.com/user-attachments/assets/9e7fd3a0-76f3-437d-8351-826a78d20998)

---

## 🛠️ Installation

1. **📥 Download** the repository.
2. Place the folder into your FiveM server’s `resources` directory.
3. Add the following to your `server.cfg`:
   ```
   start w_loading
   ```
4. 🖋️ Customize the files in the `config` folder to suit your server’s branding and features.

---

## ⚙️ Configuration

All settings can be adjusted in the files located in the `config` folder:

- 🌌 Background settings: Image, video URL, or YouTube link.
- 🎶 Music player: Playlist and volume.
- 🌐 Social media links.
- 📰 News, 👥 Team, and 📜 Changelog entries.

---

## 🛠️ Modifying the Interface

This loading screen uses **Vue.js** along with **Vuetify** and is managed using **Vite**. Here’s a quick guide to get started with modifications:

### 📂 File Structure

- The Vue source files are located in the `vue` folder.
- When you build the project, the compiled files are placed in the `ui` folder, which contains:
  - `index.html`
  - `assets/` (CSS, JS, images, etc.)

### 🖌️ Steps to Modify the Interface

1. **Navigate to the Vue Source Folder**:

   ```bash
   cd vue
   ```

2. **Install Dependencies** (if not already installed):

   ```bash
   npm install
   ```

3. **Enable Live Updates**:
   Use the following command to watch for changes and automatically build the project:

   ```bash
   npm run watch
   ```

4. **Make Changes**:

   - Modify components or layouts in the `src` folder.
   - For Vuetify-specific styles or components, refer to the [Vuetify documentation](https://vuetifyjs.com).

5. **Build the Project** (for production):

   ```bash
   npm run build
   ```

   - The output will be placed in the `ui` folder.

6. **Restart the Server**:
   - Ensure your changes are applied by restarting your FiveM server.

---

## 🤝 Contributing

We welcome contributions from the community! If you have ideas for improvements or want to report a bug, feel free to create an issue or a pull request.

---

## 📜 License

This project is licensed under the Creative Commons License. See the [LICENSE](./LICENSE) file for details.

---

💫 **Make your server’s loading experience memorable with this modern and stylish loading screen!**
