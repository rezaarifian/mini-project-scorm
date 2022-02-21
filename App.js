/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { WebView } from 'react-native-webview'
import Orientation from 'react-native-orientation-locker'
var deviceWidth = Dimensions.get('window').width
var deviceHeight = Dimensions.get('window').height
// import "scorm-again/dist/scorm12.js";
// import "scorm-again/dist/scorm2004.js";
// import "scorm-again/dist/aicc.js";

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const INJECTED_JAVASCRIPT = `(function() {
    setTimeout(function () {
      window.ReactNativeWebView.postMessage('timeoot')
    }, 5000)
  })();`;

  const onNavigationStateChange = React.useCallback((navState) => {
    console.log('onNavigationStateChange', navState)
  }, [])

  const onMessage = React.useCallback((event) => {
    console.log('messageData', event)
  }, [])

  let myWebView
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        containerStyle={{ minHeight: deviceHeight, width: deviceWidth }}
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        >
          <WebView
            ref={(el) => (myWebView = el)}
            style={{ minHeight: deviceHeight }}
            containerStyle={{ minHeight: deviceHeight, width: deviceWidth }}
            horizontal={true}
            scrollEnabled={true}
            androidHardwareAccelerationDisabled
            startInLoadingState
            source={{ uri: "https://frontend.staging.pawonmburi.com/mobile-scorm/?lesson_url=https://files.staging.pawonmburi.com/files/learning_staging_(updated)/html5/240bcee1da8678c0943637304f924cc3/&company_domain=https://frontend.staging.pawonmburi.com" }}
            injectedJavaScript={INJECTED_JAVASCRIPT}
            javaScriptEnabledAndroid={true}
            javaScriptEnabled
            onNavigationStateChange={(state) => onNavigationStateChange(state)}
            onMessage={(message) => onMessage(message)}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.log('WebView error: ', nativeEvent);
            }}
            onLoadEnd={() => console.log('onLoadEnd')} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 20
  }
});

export default App;
