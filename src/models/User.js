import AsyncStorage from '@react-native-async-storage/async-storage';

class User {
    constructor() {
        this.userData = null;
        this.initialized = false;
    }

    // Initialize or load user data
    async initialize() {
        if (this.initialized) return;
        
        try {
            const storedData = await AsyncStorage.getItem('userData');
            if (storedData) {
                this.userData = JSON.parse(storedData);
            } else {
                // Create new user data structure
                this.userData = {
                    id: Date.now().toString(),
                    name: 'Default User',
                    readBooks: [],
                    wantToReadBooks: [],
                    recommendedBooks: [],
                    createdAt: new Date().toISOString()
                };
                await this.save();
            }
            this.initialized = true;
            console.log('Successfully initialized user');
        } catch (error) {
            console.error('Error initializing user:', error);
            // Initialize with default data if there's an error
            // this.userData = {
            //     id: Date.now().toString(),
            //     name: 'Default User',
            //     readBooks: [],
            //     wantToReadBooks: [],
            //     recommendedBooks: [],
            //     createdAt: new Date().toISOString()
            // };
            // this.initialized = true;
        }
    }

    // Save user data to AsyncStorage
    async save() {
        try {
            await AsyncStorage.setItem('userData', JSON.stringify(this.userData));
            console.log('Saved user data');
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    }

    // Add a book to read books
    async addToReadBooks(book) {
        console.log('Entered here');
        if (!this.initialized) await this.initialize();
        
        const bookWithMetadata = {
            ...book,
            addedAt: new Date().toISOString(),
            status: 'read'
        };

        // Check if book already exists
        console.log('Read books length', this.userData.readBooks.length);
        const existingIndex = this.userData.readBooks.findIndex(b => b.id === book.id);
        if (existingIndex === -1) {
            this.userData.readBooks.push(bookWithMetadata);
            await this.save();
        }
    }

    // Add a book to want to read list
    async addToWantToRead(book) {
        if (!this.initialized) await this.initialize();
        
        const bookWithMetadata = {
            ...book,
            addedAt: new Date().toISOString(),
            status: 'want-to-read'
        };

        const existingIndex = this.userData.wantToReadBooks.findIndex(b => b.id === book.id);
        if (existingIndex === -1) {
            this.userData.wantToReadBooks.push(bookWithMetadata);
            await this.save();
        }
    }

    // Add a book to recommendations
    async addToRecommendations(book) {
        if (!this.initialized) await this.initialize();
        
        const bookWithMetadata = {
            ...book,
            addedAt: new Date().toISOString(),
            status: 'recommended'
        };

        const existingIndex = this.userData.recommendedBooks.findIndex(b => b.id === book.id);
        if (existingIndex === -1) {
            this.userData.recommendedBooks.push(bookWithMetadata);
            await this.save();
        }
    }

    // Remove a book from any category
    async removeBook(bookId, category) {
        if (!this.initialized) await this.initialize();

        switch (category) {
            case 'read':
                this.userData.readBooks = this.userData.readBooks.filter(b => b.id !== bookId);
                break;
            case 'want-to-read':
                this.userData.wantToReadBooks = this.userData.wantToReadBooks.filter(b => b.id !== bookId);
                break;
            case 'recommended':
                this.userData.recommendedBooks = this.userData.recommendedBooks.filter(b => b.id !== bookId);
                break;
        }
        await this.save();
    }

    // Get all books from a specific category
    getBooks(category) {
        if (!this.initialized) return [];
        
        switch (category) {
            case 'read':
                return this.userData.readBooks;
            case 'want-to-read':
                return this.userData.wantToReadBooks;
            case 'recommended':
                return this.userData.recommendedBooks;
            default:
                return [];
        }
    }

    // Check if a book exists in any category
    hasBook(bookId) {
        if (!this.initialized) return false;
        
        return (
            this.userData.readBooks.some(b => b.id === bookId) ||
            this.userData.wantToReadBooks.some(b => b.id === bookId) ||
            this.userData.recommendedBooks.some(b => b.id === bookId)
        );
    }

    // Get book status (which category it's in)
    getBookStatus(bookId) {
        if (!this.initialized) return null;
        
        if (this.userData.readBooks.some(b => b.id === bookId)) return 'read';
        if (this.userData.wantToReadBooks.some(b => b.id === bookId)) return 'want-to-read';
        if (this.userData.recommendedBooks.some(b => b.id === bookId)) return 'recommended';
        return null;
    }
}

// Create a singleton instance
const userInstance = new User();

// Export the instance
export default userInstance; 