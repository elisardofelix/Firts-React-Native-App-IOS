"use strict";
import React, { Component } from 'react';
import { 	 StyleSheet, 
			     Text,
  			   View,
           ListView,
           Image } from 'react-native';

import moment from 'moment';


export class PushPayload extends Component {
  constructor(props) {
  	super(props);

  	var ds = new ListView.DataSource({
        rowHasChanged: (r1,r2) => r1 != r2
    });

  	this.state = {
        dataSource: ds
  	};
  }

  render() {
      return(
        <View style={{
          flex: 1,
          paddingTop: 80,
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}>
          <Image 
            source={{uri: this.props.pushEvent.actor.avatar_url}}
            style={{
              height: 120,
              width: 120,
              borderRadius: 60
            }} />
            <Text style={{
              paddingTop: 20,
              paddingBottom: 20,
              fontSize: 20
            }} >
              {moment(this.props.pushEvent.created_at).fromNow()}
            </Text>
            <Text>{this.props.pushEvent.actor.login}</Text>
            <Text>{this.props.pushEvent.repo.name}</Text>
        </View>
        );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});