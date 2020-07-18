import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  StyleSheet,
  Platform,
  TouchableOpacity
} from 'react-native';
import { Button } from 'react-native-elements';
import { Header, Overlay } from 'react-native-elements';
import BottomSheet from 'reanimated-bottom-sheet';




export default class FriendView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'Find Order'
    }
    this.BottomSheetRef = React.createRef();


  }

  componentDidMount() {

  }

  render() {


    const { navigation, route } = this.props;


    // DEFINE COMPONENTS HERE

    const RenderInner = () => {
      return <View style={styles.panel}>

      </View>
    }

    // DEFINE COMPONENTS HERE





    return (<View style={styles.container} >



      

      <BottomSheet
        // enabledHeaderGestureInteraction={true}
        enabledContentGestureInteraction={true}
        snapPoints={[650, 350, 70]}
        renderHeader={this.renderHeader}
        renderContent={RenderInner}
        ref={this.BottomSheetRef}
        initialSnap={1}
      />


      <View style={{ zIndex: 5 }}></View>

    </View>);

  }





  renderHeader() {
    return (
      <View style={styles.header}>
        <View style={styles.panelHeader}>
          <View style={styles.panelHandle} />
          <Text style={styles.sheetHeaderText}>Select Order</Text>
        </View>
      </View>

    );
  }







}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA"
  },
  map: {
    flex: 1,
    width: "100%"
  },
  panelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 500,
    left: 0,
    right: 0,
  },
  panel: {
    height: 700,
    padding: 20,
    backgroundColor: '#ffffff',

  },
  header: {
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 500
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  sheetHeaderText: {
    fontSize: 18,

  }
})