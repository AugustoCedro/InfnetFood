import { Text, View } from 'react-native';
import {ThemeProvider} from "./contexts/ThemeContext";

import AppNavigation from "./components/navigation/AppNavigation";

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigation />
    </ThemeProvider>
  );
}

