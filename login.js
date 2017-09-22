"use strict";
import React, { Component } from 'react';
import buffer from 'buffer';
import { 	StyleSheet, 
			Text,
  			View,
  			Image,
  			TextInput,
  			TouchableHighlight,
  			ActivityIndicator } from 'react-native';

export class Login extends Component {
  constructor(props) {
  	super(props);
  	
  	this.state = {
  		showProgress: false,
  		success: false
  	};
  }

  render() {

  	var errorCtrl = <View />;

  	if(!this.state.success && this.state.badCredentials){
  		errorCtrl = <Text style={styles.error}>
  						That username and password combination did not work.
  					</Text>;
  	}
	if(!this.state.success && this.state.unknowError){
  		errorCtrl = <Text style={styles.error}>
  						We experienced an unexpected issue
  					</Text>;
  	}
    return (
    	<View style={styles.container}>
    		<Image style={styles.logo} 
    		source={{uri: 'Octocat'}} />
    		<Text style={styles.heading} >
    			GitHub Browser
    		</Text>
    		<TextInput
    			onChangeText={(text) => this.setState({username : text})} 
    			style={styles.input} 
    			placeholder="GitHub username" />
    		<TextInput 
    			onChangeText={(text) => this.setState({password : text})}
    			style={styles.input} 
    			placeholder="GitHub password" 
    			secureTextEntry={true}/>
    		<TouchableHighlight
    			onPress={this.onLoginPressed.bind(this)}
    			style={styles.button}>
    			<Text style={styles.buttonText}>
    				Log in
    			</Text>
    		</TouchableHighlight>
    		{errorCtrl}
    		<ActivityIndicator
    			animating={this.state.showProgress}
    			size="large"
    			style={styles.loader}/>
    	</View>
      
    );
  }

  onLoginPressed() {
  		//console.log('Tratando de entrar con el usuario : ' + this.state.username);
  		this.setState({showProgress: true});

  		var authService = require('./authService');

  		authService.login({
  			username: this.state.username,
  			password: this.state.password
  		}, (results) => {
  			this.setState(Object.assign({showProgress: false}, 
  				results));

  			if(results.success && this.props.onLogin)
  				this.props.onLogin();
  			
  		});
  }

}

const styles = StyleSheet.create({
  container: {
  	backgroundColor: '#F5FCFF',
  	flex : 1,
  	paddingTop: 40,
  	alignItems: 'center',
  	padding: 7
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
  	},
  	loader: {
  		marginTop: 20
  	},
  	error: {
  		color: 'red',
  		paddingTop: 10
  	}
  });