"use strict";
import React, { Component } from 'react';

import { 	 StyleSheet, 
			     Text,
  			   View,
           ListView,
           ActivityIndicator,
           Image,
           TouchableHighlight
            } from 'react-native';

import {PushPayload} from './pushPayload';           
import moment from 'moment';

export class Feed extends Component {
  constructor(props) {
  	super(props);

  	var ds = new ListView.DataSource({
        rowHasChanged: (r1,r2) => r1 != r2
    });

  	this.state = {
        dataSource: ds.cloneWithRows([{}]),
        showProgress: true
  	};
  }

  pressRow(rowData){
    this.props.navigator.push({
      title: 'Event Detail',
      component: PushPayload,
      passProps: {
          pushEvent: rowData
      }
    });
  }

  renderRow(rowData){
    return (
      <TouchableHighlight 
        onPress={()=> this.pressRow(rowData)}
        underlayColor='#ddd'>
      <View style={{
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        borderColor: '#D7D7D7',
        borderBottomWidth: 1,
        marginTop: 55
      }} >
            <Image
                source={{uri: rowData.actor.avatar_url}}
                style={{
                  height: 36,
                  width: 36,
                  borderRadius: 18
                }}
              />
              <View style={{
                paddingLeft: 20
              }}>
                  <Text style={{backgroundColor: '#fff'}} >
                      {moment(rowData.created_at).fromNow()}
                  </Text>
                  <Text style={{backgroundColor: '#fff'}} >
                      {rowData.actor.login}
                  </Text>
                  <Text style={{backgroundColor: '#fff', fontWeight: 'bold'}} >
                      {rowData.repo.name}
                  </Text>
              </View>

      </View>
      </TouchableHighlight>
      );
  }

  componentDidMount() {
    this.fetchFeed();
  }

  fetchFeed(){
    require('./authService').getAuthInfo((err, authInfo)=> {
      console.log(authInfo.header);
        var url = 'https://api.github.com/users/'
                  + authInfo.user.login
                  + '/received_events';
                  console.log(url);
        fetch(url,{
          headers: authInfo.header

        })
        .then((response)=> {
          console.log(response);
          return response.json();
        })
        .then((responseData)=>{
          var feedItems = responseData.filter((ev)=>ev.type=='ForkEvent');
          console.log(feedItems);
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(feedItems),
              showProgress: false
            })
        })
    })
  }

  render() {
    if(!this.state.showProgress)
        return (
          <View style={{
            flex: 1,
            justifyContent: 'flex-start'
          }} >
              <ListView 
                  dataSource={this.state.dataSource}
                  renderRow={this.renderRow.bind(this)} />
          </View>
           
      );

      return(
         <View style={{
            flex: 1,
            justifyContent: 'center'
          }} >
              <ActivityIndicator
                animating={this.state.showProgress}
                size="large"
                style={styles.loader}/>
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