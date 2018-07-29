import React, { Component } from 'react';
import {
    View, Text, ToolbarAndroid, Image,
    Switch, StyleSheet, TextInput, FlatList,
    Alert
} from 'react-native';

import Logo from '../src/assets/Chrysanthemum.jpg';
import LocalImage from '../src/assets/Desert.jpg';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            switchState: false,
            query: '',
            datasource: []
        };
    }

    handleSwitch(value) {
        this.setState({ switchState: value });
    }

    handleTextChange(value) {
        this.setState({ query: value, }, () => {
            let api = "https://www.googleapis.com/books/v1/volumes?q=" + this.state.query;
            //network api calls 
            fetch(api)
                .catch(error => { console.log(error); })
                .then((response) => {
                    return response.json();
                })
                .then((preservedresult) => {
                    this.setState({ datasource: preservedresult.items });
                });
        });
    }

    render() {
        let image = this.state.switchState ? <Image source={LocalImage} style={{ width: 150, height: 150 }} /> : <Text></Text>
        return (
            <View>
                {/* <Text>Hello Dude!!</Text> */}
                <ToolbarAndroid
                    title="Business App"
                    subtitle="Nagp sample app"
                    titleColor="#FFFFFF"
                    subtitleColor="#000000"
                    navIcon={Logo}
                    style={{ width: "100%", height: 60, backgroundColor: "grey" }}
                />
                <View style={styles.imageContainer}>
                    {/* <Image source={LocalImage} style={{ width: 150, height: 150 }} /> */}
                    {image}
                    <Switch value={this.state.switchState} onValueChange={this.handleSwitch.bind(this)} />
                </View>
                {/* <CompanyItem title="Home"></CompanyItem>
                <CompanyItem description="Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was popularised in
                the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including
                 versions of Lorem Ipsum."></CompanyItem> */}
                <View>
                    <TextInput placeholder="Keyle John" value={this.state.query} onChangeText={this.handleTextChange.bind(this)} style={{ color: "black", borderWidth: 2 }}></TextInput>
                    <FlatList
                        data={this.state.datasource}
                        renderItem={
                            (info) => (
                                <View>
                                    {/* <Image source={{uri:item.volumeInfo}} /> */}
                                    <Text>{info.kind}</Text>
                                </View>
                            )
                        } />


                </View>
            </View >
        );
    }
}

const CompanyItem = (props) => {
    return (
        <View style={styles.textConatiner}>
            <Text>{props.title}</Text>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                {props.description}
            </Text>
        </View>
    );
}


const styles = StyleSheet.create({
    imageContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    textConatiner: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#F5FCFF',
    }
});