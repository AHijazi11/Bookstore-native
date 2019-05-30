import React, { useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  View,
  ImageBackground,
  ScrollView,
  Picker
} from "react-native";
import axios from "axios";

function Bookdetails(props) {
  const bookid = props.history.location.pathname.slice(13);
  const [bookinfo, setBookinfo] = useState({});
  const [isLoading, setisLoading] = useState(true);
  const [hasError, sethasError] = useState(false);
  const [refreshcount, setRefreshcount] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:7000/book/${bookid}`)
      .then(data => {
        setBookinfo(data.data.book);
        setisLoading(false);
      })
      .catch(() => {
        sethasError(true);
      });
  }, [refreshcount]);

  const AddBooktoShelf = async (bookid, shelf) => {
    await axios
      .get(`http://localhost:7000/bookshelf/update/${bookid}/${shelf}`)
      .then(data => {
        setRefreshcount(refreshcount + 1);
      });
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
      {hasError === true && <Text>Error Retrieving Data from Server!</Text>}
      {isLoading === true && <Text>Loading...</Text>}
      {Object.keys(bookinfo).length > 0 && (
        <ScrollView style={styles.Padding}>
          <View style={styles.textFlexRow}>
            <ImageBackground
              source={
                bookinfo.imageLinks
                  ? {
                      uri: bookinfo.imageLinks.thumbnail
                    }
                  : require("../Images/No-image-available.jpg")
              }
              style={{ width: 100, height: 150 }}
            />
            <Picker
              selectedValue={ShelfCategoryTextEditor(bookinfo.shelf)}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => {
                if (itemIndex === 0) {
                  AddBooktoShelf(bookid, "wantToRead");
                } else if (itemIndex === 1) {
                  AddBooktoShelf(bookid, "currentlyReading");
                } else if (itemIndex === 2) {
                  AddBooktoShelf(bookid, "read");
                } else if (itemIndex === 3) {
                  AddBooktoShelf(bookid, "none");
                }
              }}
            >
              <Picker.Item label="Wishlist" value="Wishlist" />
              <Picker.Item label="Reading" value="Reading" />
              <Picker.Item label="Read" value="Read" />
              <Picker.Item label="None" value="None" />
            </Picker>
          </View>
          <Text style={styles.booktitleText}>{bookinfo.title}</Text>
          {bookinfo.authors && (
            <View style={styles.textFlexRow}>
              <Text style={styles.smallerboldText}>Author(s):</Text>

              <Text>{bookinfo.authors}</Text>
            </View>
          )}
          {bookinfo.publisher && (
            <View style={styles.textFlexRow}>
              <Text style={styles.smallerboldText}>Publisher:</Text>
              <Text>{bookinfo.publisher}</Text>
            </View>
          )}
          {bookinfo.publishedDate && (
            <View style={styles.textFlexRow}>
              <Text style={styles.smallerboldText}>Published:</Text>
              <Text>
                {bookinfo.publishedDate}
                {"\n"}
              </Text>
            </View>
          )}
          {bookinfo.description && <Text>{bookinfo.description}</Text>}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = {
  Padding: {
    padding: 10
  },
  booktitleText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  smallerboldText: {
    fontSize: 15,
    fontWeight: "bold"
  },
  textFlexRow: { flexDirection: "row" },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white"
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 150
  },
  picker: {
    height: 50,
    width: 150
  }
};

export default Bookdetails;
