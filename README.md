
# 📖 Blog Spotter Client  

**Blog Spotter Client** is a user-friendly application for interacting with a blogging platform. It enables users to explore, post, edit, and manage blogs, comment on posts, and maintain a personalized wishlist. The app provides a seamless and intuitive interface for an enhanced blogging experience.  
🔗 **Live Demo:** [Blog Spotter](https://blog-spotter.web.app/)  

![Discounts Pro Screenshot](https://i.ibb.co.com/ccSth81L/Screenshot-2025-02-05-164716.png)   

## 📚 Table of Contents  
- [Features](#features)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Configuration](#configuration)  
- [Dependencies](#dependencies)  
- [Development](#development)  
- [Troubleshooting](#troubleshooting)  
- [Contributing](#contributing)  
- [License](#license)  

## ✨ Features  
- 📌 **Explore Blogs** – Browse through a collection of user-generated blogs.  
- ✍ **Create & Edit Blogs** – Write, edit, and publish your own blog posts.  
- 💬 **Commenting System** – Engage in discussions by commenting on blogs.  
- 📌 **Wishlist** – Save your favorite blogs for later.  
- 🔍 **Search & Filter** – Easily find blogs using a powerful search and filtering system.  
- 🎨 **Modern UI** – Built with Material UI and Tailwind CSS for an elegant interface.  
- 🔥 **Realtime Data Sync** – Uses Firebase for real-time updates and storage.  

## 🚀 Installation  

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/yourusername/blog-spotter-client.git
   cd blog-spotter-client
   ```  

2. **Install Dependencies**  
   ```bash
   npm install
   ```  

3. **Set Up Environment Variables**  
   Create a `.env` file in the root directory and add your Firebase credentials:  
   ```env
   VITE_apiKey=your-api-key
   VITE_authDomain=your-auth-domain
   VITE_projectId=your-project-id
   VITE_storageBucket=your-storage-bucket
   VITE_messagingSenderId=your-messaging-sender-id
   VITE_appId=your-app-id
   ```

4. **Start the Development Server**  
   ```bash
   npm run dev
   ```  

## 🛠 Configuration  
- The project uses **Vite** as the build tool.  
- Firebase is configured using environment variables.  
- Tailwind CSS and DaisyUI are used for styling.  

## 📦 Dependencies  
The Blog Spotter Client relies on several key libraries:  

### **Main Dependencies**  
- [React](https://react.dev/) `^18.3.1` – Frontend library.  
- [React Router DOM](https://reactrouter.com/) `^7.1.1` – Routing solution.  
- [Firebase](https://firebase.google.com/) `^11.1.0` – Backend services.  
- [Axios](https://axios-http.com/) `^1.7.9` – HTTP client.  
- [Framer Motion](https://www.framer.com/motion/) `^11.15.0` – Animations.  
- [MUI System](https://mui.com/system/) `^6.3.0` – UI components.  
- [Lodash](https://lodash.com/) `^4.17.21` – Utility functions.  

### **Development Dependencies**  
- [Vite](https://vitejs.dev/) `^6.0.5` – Fast build tool.  
- [Tailwind CSS](https://tailwindcss.com/) `^3.4.17` – Utility-first CSS framework.  
- [ESLint](https://eslint.org/) `^9.17.0` – Code linting.  
- [DaisyUI](https://daisyui.com/) `^4.12.23` – UI components for Tailwind.  

## 🏗 Development  

### **Run Development Server**  
```bash
npm run dev
```  

### **Build for Production**  
```bash
npm run build
```  

### **Run ESLint**  
```bash
npm run lint
```  

## ❓ Troubleshooting  
- Ensure you have **Node.js v16+** installed.  
- Double-check that your `.env` file contains the correct Firebase credentials.  
- If styles are not applying, run:  
  ```bash
  npm run postcss
  ```  
- Restart the development server after installing new dependencies.  

## 🤝 Contributing  
Contributions are welcome! Feel free to open an issue or submit a pull request.  

## 📜 License  
This project is licensed under the **MIT License**.  

---

This README provides a solid introduction, setup instructions, and key details about the project. Let me know if you need any modifications! 🚀
