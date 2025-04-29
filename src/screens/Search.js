import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';

const Search = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const searchBooks = async (query) => {
        if (query.length < 2) {
            setSearchResults([]);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=5`
            );
            const data = await response.json();
            
            if (data.items) {
                const formattedResults = data.items.map(item => {
                    // Get the best available image
                    const imageLinks = item.volumeInfo.imageLinks;
                    let imageUrl = null;
                    if (imageLinks) {
                        // Try to get the largest available image and ensure HTTPS
                        const rawUrl = imageLinks.extraLarge || 
                                     imageLinks.large || 
                                     imageLinks.medium || 
                                     imageLinks.small || 
                                     imageLinks.thumbnail ||
                                     imageLinks.smallThumbnail;
                        
                        // Convert HTTP to HTTPS if needed
                        if (rawUrl) {
                            imageUrl = rawUrl.replace('http://', 'https://');
                        }
                    }
                    
                    return {
                        id: item.id,
                        title: item.volumeInfo.title,
                        authors: item.volumeInfo.authors,
                        image: imageUrl,
                        description: item.volumeInfo.description,
                        categories: item.volumeInfo.categories
                    };
                });
                setSearchResults(formattedResults);
            } else {
                setSearchResults([]);
            }
        } catch (error) {
            console.error('Error fetching books:', error);
            setSearchResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (text) => {
        setSearchQuery(text);
        searchBooks(text);
    };

    const renderBookItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.bookItem}
            onPress={() => navigation.navigate('Book', {
                id: item.id,
                title: item.title,
                author: item.authors ? item.authors.join(', ') : 'Unknown Author',
                genre: item.categories ? item.categories[0] : 'Unknown Genre',
                coverImage: item.image || 'https://via.placeholder.com/150x200?text=No+Cover',
                description: item.description || 'No description available'
            })}
        >
            <Image 
                source={{ uri: item.image || 'https://via.placeholder.com/150x200?text=No+Cover' }}
                style={styles.bookCover}
                resizeMode="contain"
                onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
            />
            <View style={styles.bookInfo}>
                <Text style={styles.bookTitle}>{item.title}</Text>
                <Text style={styles.bookAuthor}>
                    {item.authors ? item.authors.join(', ') : 'Unknown Author'}
                </Text>
                {item.categories && item.categories.length > 0 && (
                    <Text style={styles.bookGenre}>{item.categories[0]}</Text>
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for books or authors..."
                    value={searchQuery}
                    onChangeText={handleSearch}
                    autoCapitalize="none"
                />
            </View>
            
            {isLoading ? (
                <Text style={styles.loadingText}>Loading...</Text>
            ) : (
                <FlatList
                    data={searchResults}
                    renderItem={renderBookItem}
                    keyExtractor={(item) => item.id}
                    style={styles.resultsList}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DAEFFF',
        padding: 15,
    },
    searchContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    searchInput: {
        height: 50,
        fontSize: 16,
    },
    resultsList: {
        flex: 1,
    },
    bookItem: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    bookCover: {
        width: 60,
        height: 90,
        borderRadius: 5,
        backgroundColor: '#f0f0f0',
    },
    bookInfo: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    },
    bookTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    bookAuthor: {
        fontSize: 14,
        color: '#666',
        marginBottom: 3,
    },
    bookGenre: {
        fontSize: 12,
        color: '#888',
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#666',
    },
    debugText: {
        fontSize: 10,
        color: 'red',
        marginTop: 5,
    },
});

export default Search;