import { ReactElement } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { AppRouter } from "./router/router";

function App(): ReactElement {
  return(
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )
}

export default App;
