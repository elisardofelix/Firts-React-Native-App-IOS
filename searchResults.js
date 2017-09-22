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


export class SearchResults extends Component {
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


  renderRow(rowData){
    return (
      <View style={{
        borderColor: '#D7D7D7',
        borderBottomWidth: 1,
        padding: 10
      }}>
            
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold'
          }} >
            {rowData.full_name}
          </Text>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            marginBottom: 0
          }}>
            <View style={styles.repoCell}>
              <Image source={{uri: 'star'}} style={styles.repoCellIcon} />
              <Text style={styles.repoCellLabel} >
                {rowData.stargazers_count}
              </Text>
            </View>

            <View style={styles.repoCell}>
              <Image source={{uri: 'fork'}} style={styles.repoCellIcon} />
              <Text style={styles.repoCellLabel} >
                {rowData.forks}
              </Text>
            </View>

            <View style={styles.repoCell}>
              <Image source={{uri: 'issues2'}} style={styles.repoCellIcon} />
              <Text style={styles.repoCellLabel} >
                {rowData.open_issues}
              </Text>
            </View>

          </View>

      </View>
      );
  }

  componentDidMount() {
    this.doSearch();
  }

  doSearch(){
        var url = 'https://api.github.com/search/repositories?q=' + encodeURIComponent(this.props.searchQuery);

        fetch(url)
        .then((response)=> response.json())
        .then((responseData)=>{
            this.setState({
              repositories: responseData.repositories,
              dataSource: this.state.dataSource.cloneWithRows(responseData.items),
              showProgress: false
            })
        })
   
  }

  render() {
    if(!this.state.showProgress)
        return (
          <View style={{
            flex: 1,
            justifyContent: 'flex-start',
            paddingTop: 100
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
  repoCell: {
      width: 50,
      alignItems: 'center'
  },
  repoCellIcon: {
      width: 20,
      height: 20
  },
  repoCellLabel: {
      textAlign: 'center'
  },
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