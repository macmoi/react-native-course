import React, {useState} from 'react'
import { 
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  Alert,
  Pressable
} from 'react-native'
import dsd from './assets/red-diamond.png';
import * as ImagePicker from 'expo-image-picker';

const App = () => {

  const [selectedImage, setSelectedImage] = useState(null);
  
  const openImagePickerAsync = async () => {
    
    // Pedimos permiso para acceder a la libreria
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    // Si no tenemos permiso mostramos alert y salimos
    if (permissionResult.granted === false){
      alert('Permission to access galery is required');
      return;
    }

    // Si tenemos procedemos a levantar la galeria
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled) {
      return 
    }else{
      setSelectedImage({localUri: pickerResult.uri})
    }

  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prueba React</Text>
      <Image
        source={{ 
          uri: 
            selectedImage != null 
            ? selectedImage.localUri
            :'https://picsum.photos/200'
        }} 
        style={styles.image}
      />
      <Button onPress={() => Alert.alert('Testing')} title="Press me.!" />
      <Pressable style={styles.button} onPress={openImagePickerAsync}>
        <Text style={styles.text}>Press me.!</Text>
      </Pressable>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#292929",
  },
  title: { fontSize: 20, color: "#FFFFFF" },
  image: { height: 200, width: 200, borderRadius: 100 },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#007AFF',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default App;