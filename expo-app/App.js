import { View } from "react-native";
import AppNavigator from "./AppNavigator";
import { Provider } from "react-redux";
import { store } from "./redux-toolkit/store/store";

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
