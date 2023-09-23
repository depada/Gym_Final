import AppNavigator from "./src/Navigation/AppNavigator";
import { AppProvider } from "./src/Context/AppContext.jsx";

export default function App() {
  return (
    <AppProvider>
      <AppNavigator />
    </AppProvider>
  );
}
