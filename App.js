import React from "react";
import { NativeRouter, Switch, Route } from "react-router-native";
import { SafeAreaView } from "react-native";

import NavBar from "./Components/Navbar";
import Bookshelf from "./Components/Bookshelf";
import Booksearch from "./Components/Booksearch";
import Bookdetails from "./Components/Bookdetails";

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NativeRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Booksearch} />
          <Route exact path="/Bookshelf" component={Bookshelf} />
          <Route path="/Bookdetails" component={Bookdetails} />
        </Switch>
      </NativeRouter>
    </SafeAreaView>
  );
}

const styles = {
  container: {
    marginBottom: 32
  }
};

export default App;
