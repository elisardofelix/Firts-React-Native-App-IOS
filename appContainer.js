"use strict";
import React, { Component } from 'react';
import buffer from 'buffer';
import { 	 StyleSheet, 
			     Text,
  			   View,
           TabBarIOS,
           NavigatorIOS  } from 'react-native';

import {Feed} from './feed';
import {Search} from './search';

export class AppContainer extends Component {
  constructor(props) {
  	super(props);
  	
  	this.state = {
        selectedTab: 'feed'
  	};
  }

  render() {
    return (
        <TabBarIOS style={styles.container}>
            <TabBarIOS.Item 
            title="Feed"
            selected={this.state.selectedTab == 'feed'}
            icon={{uri: 'inbox'}}
            onPress={()=> this.setState({selectedTab: 'feed'})} >
                <NavigatorIOS
                    style={{
                      flex: 1
                    }}
                    initialRoute={{
                      title: 'Feed',
                      component: Feed
                    }} />
            </TabBarIOS.Item>
            <TabBarIOS.Item 
            title="Search"
            selected={this.state.selectedTab == 'search'}
            icon={{uri: 'search'}}
            onPress={()=> this.setState({selectedTab: 'search'})} >
                <NavigatorIOS
                    style={{
                      flex: 1
                    }}
                    initialRoute={{
                      title: 'Search',
                      component: Search
                    }} />
            </TabBarIOS.Item>
        </TabBarIOS>
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