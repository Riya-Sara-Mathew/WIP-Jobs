import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import { Card, Button, Icon } from '@rneui/themed';
import Swipe from '../components/Swipe';
import * as actions from '../actions';
import {likeJob} from "../actions";

class DeckScreen extends Component {
  static navigationOptions = {
    title: 'Jobs',
    tabBar: {
      icon: ({ tintColor }) => {
        return <Icon name="description" size={30} color={tintColor} />;
      }
    }
  }

  renderCard(job) {
    const initialRegion = {
      longitude: job.longitude,
      latitude: job.latitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    };

      const {
          company, formattedRelativeTime,
          jobtitle, snippet
      } = job;

    return (
      <Card title={jobtitle}>
        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === 'android'}
            initialRegion={initialRegion}
          >
          </MapView>
        </View>
        <View style={styles.detailWrapper}>
          <Text>{company}</Text>
          <Text>{formattedRelativeTime}</Text>
        </View>
        <Text>
          {snippet.replace(/<b>/g, '').replace(/<\/b/g, '')}
        </Text>
      </Card>
    );
  }

  renderNoMoreCards = () => {
    return (
      <Card title="No More Jobs">
        <Button
          title="Back To Map"
          large
          icon={{ name: 'my-location' }}
          backgroundColor="#03A9F4"
          onPress={() => this.props.navigation.navigate('map')}
        />
      </Card>
    );
  }

  render() {
    return (
      <View style={{ marginTop: 10 }}>
        <Swipe
          data={this.props.jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={job => likeJob(job)}
          keyProp="jobkey"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    detailWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10
    }
});

function mapStateToProps({ jobs }) {
  return { jobs: jobs.results };
}

export default connect(mapStateToProps, likeJob(), actions)(DeckScreen);
