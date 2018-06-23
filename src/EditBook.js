import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Button,
    Text
} from 'react-native';
import Toast from 'react-native-root-toast';
import { Actions } from 'react-native-router-flux';

export default class BookList extends Component {
    constructor(props) {
        super(props);
        this.currentBook = {
            isbn: this.props.isbn,
            title: this.props.title,
            author: this.props.author,
            published: this.props.published
        }
        this.state = {
            bookTitle: "",
            bookAuthor: "",
            publishedDate: ""
        }

        this.day = new Date().getDate();
        this.month = new Date().getMonth() + 1;
        this.year = new Date().getFullYear();
        this.today = this.day + '/' + this.month + '/' + this.year;
    }

    componentDidMount() {
        this.setState({
            bookTitle: this.props.title,
            bookAuthor: this.props.author,
            publishedDate: this.props.published
        });
    }

    updateBook() {
        var msg = '';
        if (!this.state.bookTitle) {
            msg = 'Please Enter Book Title';
            this.setState({
                bookTitle: ''
            });
        } else if (!this.state.bookAuthor) {
            msg = 'Please Enter Book Author';
            this.setState({
                bookAuthor: ''
            });
        } else if (!this.dateValidation(this.state.publishedDate)) {
            msg = 'Please fill a Valid Date';
            this.setState({
                publishedDate: ''
            });
        }

        if (msg.length > 0) {
            var toast = Toast.show(msg, {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0
            });
            return;
        }

        this.currentBook.title = this.stringValidation(this.state.bookTitle);
        this.currentBook.author = this.stringValidation(this.state.bookAuthor);
        this.currentBook.published = this.state.publishedDate;

        Actions.BookList(this.currentBook);
    }

    stringValidation(str) {
        return this.toTitleCase(str.replace(/[^a-zA-Z ]/g, "").replace(/ +/g, " "));
    }

    toTitleCase(str) {
        return str.replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    dateValidation(dateString) {
        if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
            return false;
        }
        var parts = dateString.split("/");
        var newDay = parseInt(parts[0], 10);
        var newMonth = parseInt(parts[1], 10);
        var newYear = parseInt(parts[2], 10);
        var currentYear = parseInt(this.year, 10);

        if (newYear < 1000 || newYear > currentYear || newMonth < 1 || newMonth > 12) {
            return false;
        }

        var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if (newYear % 400 == 0 || (newYear % 100 != 0 && newYear % 4 == 0))
            monthLength[1] = 29;

        return newDay > 0 && newDay <= monthLength[newMonth - 1];
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.appbar}>
                    <Text style={styles.titleHeader}>
                        Edit Book :{"\n"}
                        {this.props.title}
                    </Text>
                </View>
                <TextInput
                    style={{ height: 40 }}
                    onChangeText={(text) => this.setState({ bookTitle: text })}
                    placeholder={this.props.title}
                />
                <TextInput
                    style={{ height: 40 }}
                    onChangeText={(text) => this.setState({ bookAuthor: text })}
                    placeholder={this.props.author}
                />
                <TextInput
                    style={{ height: 40 }}
                    onChangeText={(text) => this.setState({ publishedDate: text })}
                    placeholder={"DD/MM/YYYY"}
                />
                <View style={styles.buttons}>
                    <Button
                        onPress={() => this.updateBook()}
                        color="#3b5998"
                        title="Save"
                    />
                    <Button
                        onPress={() => Actions.pop()}
                        color="#3b5998"
                        title="Cancel"
                    />
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
        marginTop: 10
    },
    appbar: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        backgroundColor: '#3b5998',
        elevation: 4,
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
    buttons: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10
    }
});
