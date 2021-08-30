import React, { useState } from 'react';
import {launchCamera, launchImageLibrary, ImagePickerResponse, Asset} from 'react-native-image-picker';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';

const pictureOptions = {
  mediaType: 'photo',
  quality: 0.5,
  includeBase64: true,
} as const;

const App = () => {
  const [image, setImage] = useState<Asset>();
  const handleGalleryOpen = (): void => {
    launchImageLibrary(pictureOptions, ({ didCancel, assets }: ImagePickerResponse) => {
      if (!didCancel && assets && assets.length > 0) {
        setImage(assets[0]);
        console.log(assets[0]);
      }
    });
  };

  const handleCameraOpen = (): void => {
    launchCamera({
        ...pictureOptions,
        cameraType: 'front',
      },
      (response: ImagePickerResponse) => {
        console.log(response);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
      <View style={styles.container}>
        {image ? (
          <View>
            <Image source={{ uri: image.uri }} style={styles.images} />
            <ScrollView>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </Text>
            </ScrollView>
          </View>
        ) : (
          <>
            <View style={styles.titleContainer}>
              <Text style={{ fontSize: 20 }}>+ Add Bill</Text>
            </View>
            <View style={styles.bodyContainer}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleGalleryOpen}>
                  <Text style={styles.buttonText}>Gallery</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleCameraOpen}>
                  <Text style={styles.buttonText}>Photo</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'flex-end',
    padding: 20,
  },
  bodyContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  buttonContainer: {},
  button: {
    padding: 20,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#000',
    margin: 10,
    backgroundColor: 'grey',
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
  },
});

export default App;
