import React, { Component } from 'react';
import { Actions, Scene, Router } from 'react-native-router-flux';
import BookList from './BookList';
import EditBook from './EditBook';
import AddBook from './AddBook';

//unmountScenes
const scenes = Actions.create(
    <Scene key="root" hideNavBar={true}>
        <Scene key="BookList" component={BookList} title="BookList" initial={true} />
        <Scene key="EditBook" component={EditBook} title="EditBook" />
        <Scene key="AddBook" component={AddBook} title="AddBook" />
    </Scene>
);

export default class InitRout extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Router scenes={scenes} />
        );
    }
}