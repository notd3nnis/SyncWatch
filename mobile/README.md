# Welcome to your Expo app 👋

## Project overview

SyncWatch is a mobile app prototype for planning and joining synchronized watch parties with friends.

Core user flow:

1. Onboarding screens introduce "watch together" functionality.
2. Users pick a streaming provider.
3. The tabbed app experience includes:
   - **Home**: browse movies and create a watch party via a 3-step modal (details → form → success).
   - **Parties**: view current/past parties and join a party using an invite code.
   - **Settings**: manage profile, streaming accounts, push notifications, and logout.

Implementation notes:

- Built with Expo + React Native + TypeScript.
- Uses Expo Router with file-based routing.
- Uses `react-native-unistyles` with a dark theme and shared design tokens.
- Current app data is powered by local mock/dummy datasets in `src/utils/dummyData.tsx`.

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
