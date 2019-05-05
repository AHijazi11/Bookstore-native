import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import axios from "axios";

function Booksearch(props) {
  const [searchfield, setSearchfield] = useState("");
  const [searchresults, setSearchresults] = useState([]);
  const [searchcomplete, setSearchcomplete] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [hasError, sethasError] = useState(false);

  const searchhistory = props.history.location.pathname.slice(12);
  let renderresults = false;

  const Search = e => {
    setSearchfield(e.target.value);
    props.history.push(`/Booksearch/${e.target.value}`);
  };

  const books = [
    {
      id: "AFgZAAAAYAAJ",
      title: "The Adventures of Huckleberry Finn (Tom Sawyer's Comrade) ...",
      authors: "Mark Stark",
      publishedDate: "1918"
    },
    {
      id: "AFgZAAAAYAAJ",
      title: "Testing",
      authors: "Farty Marty",
      publishedDate: "1998"
    }
  ];

  useEffect(() => {
    if (searchfield) {
      setisLoading(true);
      sethasError(false);
      axios
        .get(`http://localhost:7000/books/search/${searchfield}`)
        .then(data => {
          setSearchresults(data.data.books);
          setisLoading(false);
          setSearchcomplete(true);
        })
        .catch(() => {
          sethasError(true);
          setisLoading(false);
        });
    }
  }, [searchfield]);

  return (
    <SafeAreaView>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        placeholder="Enter Book Title or Author"
        value={searchfield}
        onChangeText={searchfield => {
          setSearchfield(searchfield.toString());
        }}
      />
      {hasError == true && <Text>Error Retrieving Data from Server!</Text>}
      {isLoading && <Text>Loading...</Text>}
      {Array.isArray(searchresults) &&
        searchcomplete &&
        searchresults.length === 0 && <Text>No matching results found :(</Text>}

      <ScrollView>
        {Array.isArray(searchresults) &&
          searchresults.length > 0 &&
          searchresults.map((book, idx) => {
            return (
              <View key={idx}>
                <TouchableOpacity
                  onPress={() => props.history.push(`/Bookdetails/${book.id}`)}
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
                  <Text>{book.title}</Text>
                  {book.authors && <Text>{book.authors}</Text>}
                </TouchableOpacity>
              </View>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  gridView: {
    marginTop: 30,
    flex: 1
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: 150
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600"
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff"
  }
};

export default Booksearch;
