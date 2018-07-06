import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
    Keyboard,
    DatePickerAndroid
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import booksJson from './books.json';
import AwesomeAlert from 'react-native-awesome-alerts';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class BookList extends Component {
    constructor(props) {
        super(props);
        Keyboard.dismiss();
        this.booksData = booksJson.books;
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            bookSource: this.ds,
            dltModalVisible: false,
        }

        if (this.props.isbn) {
            var bookIndex = this.booksData.findIndex((obj) => obj.isbn == this.props.isbn);
            if (bookIndex >= 0) {
                this.booksData[bookIndex].title = this.props.title;
                this.booksData[bookIndex].author = this.props.author;
                this.booksData[bookIndex].published = this.props.published;
            }
            else {
                this.booksData.push(this.props);
            }
        }
        this.newDate = "";
        this.LoadBooks();
    }

    LoadBooks() {
        setTimeout(() => {
            this.setState({
                bookSource: this.ds.cloneWithRows(this.booksData)
            });
        }, 20);
    }

    deleteBook(isbn) {
        var bookIndex = this.booksData.findIndex((obj) => obj.isbn == isbn);
        this.booksData.splice(bookIndex, 1);
        this.setState({
            bookSource: this.ds.cloneWithRows(this.booksData)
        });
        this.bookList = this.booksData;
    }

    setDltModalVissible(visible) {
        this.setState({ dltModalVisible: visible });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.appbar}>
                    <Text style={styles.titleHeader}>
                        Book Library
                        </Text>
                    <TouchableOpacity style={{ marginTop: 15, marginRight: 10 }} onPress={() => {
                        Actions.AddBook(this.booksData);
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name='book' size={15} color='#fff' />
                            <Text style={{ color: "#fff", fontSize: 15 }}> Add Book</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <ListView
                    initialListSize={30}
                    renderRow={this.renderRow()}
                    dataSource={this.state.bookSource}
                />
                <AwesomeAlert
                    show={this.state.dltModalVisible}
                    showProgress={false}
                    title="Delete Book"
                    message="Are you sure you want to delete this book?"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="No, cancel"
                    confirmText="Yes, delete it"
                    confirmButtonColor="#03c000"
                    onCancelPressed={() => {
                        this.setDltModalVissible(!this.state.dltModalVisible);
                    }}
                    onConfirmPressed={() => {
                        this.deleteBook(this.bookToDelete.isbn);
                        this.setDltModalVissible(!this.state.dltModalVisible);
                    }} />
            </View>
        );
    }

    renderRow() {
        return (
            (rowData) =>
                <View style={styles.row}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.textName}>
                            {rowData.title}
                        </Text>
                        <Text style={styles.textStatus}>
                            Author: {rowData.author}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity style={styles.button}
                            onPress={() => {
                                Actions.EditBook(rowData);
                            }}>
                            <Text style={{ color: "#fff" }}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={() => {
                                this.bookToDelete = rowData;
                                this.setDltModalVissible(true);
                            }}>
                            <Text style={{ color: "#fff" }}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    appbar: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        backgroundColor: '#3b5998',
        elevation: 4,
        paddingLeft: 7,
        justifyContent: 'space-between'
    },
    titleHeader: {
        flex: 1,
        margin: 0,
        marginLeft: 10,
        textAlign: 'left',
        fontSize: 18,
        color: 'white',
    },
    button: {
        alignItems: 'flex-end',
        backgroundColor: '#3b5998',
        padding: 5,
        margin: 8,
        borderRadius: 4,
        borderWidth: 0.5,
        justifyContent: 'center',
        height: 30
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        paddingRight: 5,
        paddingLeft: 5,
        borderBottomWidth: 0.5,
        borderColor: '#e7e7e7',
        backgroundColor: 'white',
        justifyContent: 'space-between'
    },
    textName: {
        paddingLeft: 10,
        paddingRight: 10,
        color: 'black',
        alignSelf: 'flex-start',
        maxWidth: 230
    },
    textStatus: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        color: 'gray',
        alignSelf: 'flex-start',
        maxHeight: 25
    },
    deleteModal: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    insideModal: {
        width: 300,
        height: 100,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: '#c0deed',
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        color: '#3f2949',
        marginTop: 10
    }
});
