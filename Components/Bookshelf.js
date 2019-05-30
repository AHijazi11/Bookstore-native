import React, { useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  ImageBackground,
  Picker
} from "react-native";
import axios from "axios";

function Bookshelf(props) {
  const [bookshelf, setBookshelf] = useState({});
  const [isLoading, setisLoading] = useState(true);
  const [hasError, sethasError] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:7000/bookshelf")
      .then(data => {
        setBookshelf(data.data.books);
        setisLoading(false);
      })
      .catch(() => {
        sethasError(true);
        setisLoading(false);
      });
  }, []);

  const MoveBooktoShelf = async (bookid, shelf) => {
    await axios
      .get(`http://localhost:7000/bookshelf/update/${bookid}/${shelf}`)
      .then(data => {
        setBookshelf(data.data.books);
      })
      .catch(() => sethasError(true));
  };

  const ShelfCategoryTextEditor = shelf => {
    if (shelf === "wantToRead") {
      return "Wishlist";
    } else if (shelf === "currentlyReading") {
      return "Reading";
    } else if (shelf === "read") {
      return "Read";
    } else if (shelf === "none") {
      return "None";
    }
  };

  return (
    <SafeAreaView>
      {hasError && <Text>Error Retrieving Data from Server!</Text>}
      {isLoading && <Text>Bookshelf Loading</Text>}
      {Object.keys(bookshelf).length > 0 && (
        <ScrollView style={styles.Padding}>
          <Text style={styles.shelfText}>Want to Read</Text>
          {Object.keys(bookshelf).length > 0 &&
            bookshelf.wantToRead.map((book, idx) => {
              return (
                <View style={styles.bookMargin} key={idx}>
                  <View style={styles.textFlexRow}>
                    <TouchableOpacity
                      onPress={() =>
                        props.history.push(`/Bookdetails/${book.id}`)
                      }
                    >
                      <ImageBackground
                        source={
                          book.imageLinks
                            ? {
                                uri: book.imageLinks.thumbnail
                              }
                            : require("../Images/No-image-available.jpg")
                        }
                        style={{ width: 100, height: 150 }}
                      />
                    </TouchableOpacity>
                    <Picker
                      selectedValue={ShelfCategoryTextEditor(book.shelf)}
                      style={styles.picker}
                      onValueChange={(itemValue, itemIndex) => {
                        if (itemIndex === 1) {
                          MoveBooktoShelf(book.id, "currentlyReading");
                        } else if (itemIndex === 2) {
                          MoveBooktoShelf(book.id, "read");
                        } else if (itemIndex === 3) {
                          MoveBooktoShelf(book.id, "none");
                        }
                      }}
                    >
                      <Picker.Item label="Wishlist" value="Wishlist" />
                      <Picker.Item label="Reading" value="Reading" />
                      <Picker.Item label="Read" value="Read" />
                      <Picker.Item label="None" value="None" />
                    </Picker>
                  </View>
                </View>
              );
            })}
          <Text style={styles.shelfText}>Currently Reading</Text>
          {Object.keys(bookshelf).length > 0 &&
            bookshelf.currentlyReading.map((book, idx) => {
              return (
                <View style={styles.bookMargin} key={idx}>
                  <View style={styles.textFlexRow}>
                    <TouchableOpacity
                      onPress={() =>
                        props.history.push(`/Bookdetails/${book.id}`)
                      }
                    >
                      <ImageBackground
                        source={
                          book.imageLinks
                            ? {
                                uri: book.imageLinks.thumbnail
                              }
                            : require("../Images/No-image-available.jpg")
                        }
                        style={{ width: 100, height: 150 }}
                      />
                    </TouchableOpacity>
                    <Picker
                      selectedValue={ShelfCategoryTextEditor(book.shelf)}
                      style={styles.picker}
                      onValueChange={(itemValue, itemIndex) => {
                        if (itemIndex === 0) {
                          MoveBooktoShelf(book.id, "wantToRead");
                        } else if (itemIndex === 2) {
                          MoveBooktoShelf(book.id, "read");
                        } else if (itemIndex === 3) {
                          MoveBooktoShelf(book.id, "none");
                        }
                      }}
                    >
                      <Picker.Item label="Wishlist" value="Wishlist" />
                      <Picker.Item label="Reading" value="Reading" />
                      <Picker.Item label="Read" value="Read" />
                      <Picker.Item label="None" value="None" />
                    </Picker>
                  </View>
                </View>
              );
            })}
          <Text style={styles.shelfText}>Read</Text>
          {Object.keys(bookshelf).length > 0 &&
            bookshelf.read.map((book, idx) => {
              return (
                <View style={styles.bookMargin} key={idx}>
                  <View style={styles.textFlexRow}>
                    <TouchableOpacity
                      onPress={() =>
                        props.history.push(`/Bookdetails/${book.id}`)
                      }
                    >
                      <ImageBackground
                        source={
                          book.imageLinks
                            ? {
                                uri: book.imageLinks.thumbnail
                              }
                            : require("../Images/No-image-available.jpg")
                        }
                        style={{ width: 100, height: 150 }}
                      />
                    </TouchableOpacity>
                    <Picker
                      selectedValue={ShelfCategoryTextEditor(book.shelf)}
                      style={styles.picker}
                      onValueChange={(itemValue, itemIndex) => {
                        if (itemIndex === 0) {
                          MoveBooktoShelf(book.id, "wantToRead");
                        } else if (itemIndex === 1) {
                          MoveBooktoShelf(book.id, "currentlyReading");
                        } else if (itemIndex === 3) {
                          MoveBooktoShelf(book.id, "none");
                        }
                      }}
                    >
                      <Picker.Item label="Wishlist" value="Wishlist" />
                      <Picker.Item label="Reading" value="Reading" />
                      <Picker.Item label="Read" value="Read" />
                      <Picker.Item label="None" value="None" />
                    </Picker>
                  </View>
                </View>
              );
            })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = {
  Padding: {
    padding: 5
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  shelfText: {
    fontSize: 30,
    fontWeight: "bold"
  },
  textFlexRow: {
    flex: 1,
    flexDirection: "row"
  },
  bookMargin: {
    marginTop: 20,
    marginBottom: 20
  },
  picker: {
    height: 50,
    width: 100
  }
};

export default Bookshelf;
