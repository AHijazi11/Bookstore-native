import React, { useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  TextInput,
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

export default Booksearch;
