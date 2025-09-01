
# LamedReactNative

A modern, cross-platform React Native app built with Expo for interactive study and simulation experiences. The app features a study mode, simulation quizzes, and result tracking, supporting multiple languages and RTL/LTR layouts.

## Features

- 📚 Study mode for learning and reviewing content
- 📝 Simulation mode with timed quizzes and instant feedback
- 📊 Results screen to track your progress
- 🌐 Multi-language support (LTR & RTL)
- 🎨 Beautiful, responsive UI with Tailwind CSS (via NativeWind)
- 🔄 File-based routing for easy navigation

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Yarn](https://yarnpkg.com/) or npm

### Installation

```bash
npm install
# or

```

### Running the App

```bash
npx expo start
```

Open the app in:

- Expo Go (scan QR code)
- Android/iOS simulator
- Web browser

## Project Structure

```
app/            # Main screens and navigation
components/     # Reusable UI components
context/        # React context providers (language, simulation, etc.)
utils/          # Utility functions and assets
assets/         # Images, fonts, etc.
```

## Environment Variables

If your app uses secrets (API keys, etc.), create a `.env` file in the root directory. See `.env.example` for reference.

## Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License.
