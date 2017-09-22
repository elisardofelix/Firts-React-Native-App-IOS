"use strict";
import React, { Component } from 'react';

import { 	StyleSheet, 
			   Text,
  			View,
        TextInput,
  			TouchableHighlight,
  			ActivityIndicator } from 'react-native';

import {SearchResults} from './searchResults';

export class Search extends Component {
  constructor(props) {
  	super(props);
  	
  	this.state = {
  	};
  }

  render() {
    return (
    	<View style={styles.container}>
    		<TextInput
    			onChangeText={(text) => this.setState({searchQuery : text})} 
    			style={styles.input} 
    			placeholder="Search Query" />
    		<TouchableHighlight
    			onPress={this.onSearchPressed.bind(this)}
    			style={styles.button}>
    			<Text style={styles.buttonText}>
    				Search
    			</Text>
    		</TouchableHighlight>
    	</View>
      
    );
  }

  onSearchPressed() {
  		console.log('Tratando de Buscar : ' + this.state.searchQuery);
      this.props.navigator.push({
                component: SearchResults,
                title: 'Result',
                passProps: {
                  searchQuery: this.state.searchQuery
                }
        })
      
  		
  }

}

const styles = StyleSheet.create({
  container: {
  	backgroundColor: '#F5FCFF',
  	flex : 1,
  	paddingTop: 100,
  	alignItems: 'center',
  	margin: 20
  	},
  	logo: {
  		width : 66,
  		height: 55
  	},
  	heading: {
  		fontSize: 30,
  		marginTop: 10
  	},
  	input: {
  		height: 50,
  		marginTop: 10,
  		padding: 4,
  		fontSize: 18,
  		borderWidth: 1,
  		borderColor: '#48bbec',
  		width: '100%',
  		borderRadius: 5

  	},
  	button: {
  		height: 50,
  		backgroundColor: '#48bbec',
  		alignSelf: 'stretch',
  		marginTop: 10,
  		justifyContent: 'center',
  		borderRadius: 5
  	},
  	buttonText: {
  		fontSize: 22,
  		color: 'white',
  		alignSelf: 'center'
  	}
  });