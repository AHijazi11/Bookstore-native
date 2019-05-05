import React from "react";
import { View, Text } from "react-native";
import { Link } from "react-router-native";

function NavBar() {
  return (
    <View style={styles.container}>
      <Link to="/" style={styles.link}>
        <Text style={styles.text}>Bookshelf</Text>
      </Link>
      <Link to="/Booksearch" style={styles.link}>
        <Text style={styles.text}>Search</Text>
      </Link>
    </View>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#167FFB"
  },
  link: {
    paddingVertical: 12,
    paddingHorizontal: 16
  },
  text: {
    fontSize: 20,
    color: "#fff"
  }
};

export default NavBar;
