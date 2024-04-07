import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View , Linking, TextInput} from 'react-native';

const WelcomeScreen = ({ onStart }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [speedDial, setSpeedDial] = useState('');
  const [passcode, setPasscode] = useState('');
  const [passcodeConfirm, setPasscodeConfirm] = useState('');

  const handleStart = () => {
    // Check if all input fields are filled
    if (!name || !phoneNumber || !passcode || !passcodeConfirm || !speedDial) {
      alert('Please fill in all fields.');
      return;
    }

    // Check passcode length
    if (passcode.length !== 6) {
      alert('Passcode must be 6 characters long.');
      return;
    }

    // Verify password match
    if (passcode !== passcodeConfirm) {
      alert('Passcodes do not match. Please try again.');
      return;
    }

    // If all validations pass, submit the form
    onStart(name, phoneNumber, passcode);
  };

  return (

    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to the Safety in Numbers App!</Text>
      <TextInput
        style={styles.input}
        placeholder="Emergency Contact Name"
        placeholderTextColor="#CCCCCC"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Emergency Contact Number (only #s)"
        placeholderTextColor="#CCCCCC"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        marginBottom = {10}
      />
      <TextInput
        style={styles.input}
        placeholder="Emergency Contact Speed-Dial (only #s)"
        placeholderTextColor="#CCCCCC"
        value={speedDial}
        onChangeText={setSpeedDial}
        marginBottom = {30}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your app passcode (only #s)"
        placeholderTextColor="#CCCCCC"
        secureTextEntry={true}
        value={passcode}
        onChangeText={setPasscode}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm your app passcode"
        placeholderTextColor="#CCCCCC"
        secureTextEntry={true}
        value={passcodeConfirm}
        onChangeText={setPasscodeConfirm}
        marginBottom = {30}
      />
      <TouchableOpacity style={styles.startButton} onPress={handleStart}>
        <Text style={styles.startButtonText}>Start</Text>
      </TouchableOpacity>

      <Text style={styles.welcomeText} marginTop = {30}>*Type 911 for emergency speed-dial*</Text>
    </View>
  );
};

export default function App() {
  const [result, setResult] = useState('0');
  const [currentInput, setCurrentInput] = useState('');
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true); // State for controlling the visibility of the welcome screen

  const handleButtonClick = (value, passcode, speedDial) => {
    let newResult;
    if (value === 'AC') {
      newResult = '0';
      setCurrentInput('');
    } 
    else if (value === '=') {
      try {
        newResult = eval(currentInput).toString(); //this performs the arithmetic operation
        setCurrentInput(eval(currentInput).toString());
      } catch (error) {
        newResult = 'Error';
        setCurrentInput('');
      }
    } else {
      const newValue = currentInput === '0' ? value : currentInput + value;
      setCurrentInput(newValue);
      newResult = newValue.length > 7 ? newValue.slice(0, 7) : newValue;
    }
    setResult(newResult);

    if(newResult === "911."){
      Linking.openURL('tel:+13147086225'); //Ruth is 911
    }

    let tempPasscode = passcode + '.';

    if (newResult === "123456."){
      setShowWelcomeScreen(true); // Show the welcome screen if certain number is pressed
    }else{
      setShowWelcomeScreen(false);
    }

    let tempSpeedDial = speedDial + '.';

    if(newResult === "123."){
      Linking.openURL('tel:+13145409986'); //Anika is emergency contact
    }
  };

  return (
    <View style={styles.container}>
      {showWelcomeScreen ? (
        <WelcomeScreen onStart={() => setShowWelcomeScreen(false)} />
      ) : (
        <View style={{ flex: 1 }}>
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>{result}</Text>
          </View>
         <View style={styles.buttonContainer}>
            <View style={styles.row}>
              <TouchableOpacity style={[styles.button, { backgroundColor: '#A5A5A5' }]} onPress={() => handleButtonClick('AC')}><Text style={styles.buttonTextTopRow}>AC</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: '#A5A5A5' }]}><Text style={styles.buttonTextTopRow}><Text style={styles.symbolText}>&#8314;&#8725;&#8331;</Text></Text></TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: '#A5A5A5' }]}><Text style={styles.buttonTextTopRow}>%</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: '#FFA317' }]}><Text style={styles.symbolsText}><Text style={styles.symbolText}>&#xF7;</Text></Text></TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity style={styles.button} onPress={() => handleButtonClick('7')}><Text style={styles.buttonText}>7</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleButtonClick('8')}><Text style={styles.buttonText}>8</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleButtonClick('9')}><Text style={styles.buttonText}>9</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: '#FFA317' }]}><Text style={styles.symbolsText}><Text style={styles.symbolText}>&#xD7;</Text></Text></TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity style={styles.button} onPress={() => handleButtonClick('4')}><Text style={styles.buttonText}>4</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleButtonClick('5')}><Text style={styles.buttonText}>5</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleButtonClick('6')}><Text style={styles.buttonText}>6</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: '#FFA317' }]}><Text style={styles.symbolsText}><Text style={styles.minusSign}>&#x2212;</Text></Text></TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity style={styles.button} onPress={() => handleButtonClick('1')}><Text style={styles.buttonText}>1</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleButtonClick('2')}><Text style={styles.buttonText}>2</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleButtonClick('3')}><Text style={styles.buttonText}>3</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: '#FFA317' }]}><Text style={styles.symbolsText}>+</Text></TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity style={[styles.button, { flex: 0.72 }]} onPress={() => handleButtonClick('0')}><Text style={styles.buttonText0}>0           </Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleButtonClick('.')}><Text style={styles.buttonText}>.</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: '#FFA317' }]}><Text style={styles.symbolsText}>=</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center', //affects position of welcome screen
  },
  welcomeText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  startButton: {//box aound start
    backgroundColor: '#FFA317',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  startButtonText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  resultContainer: { 
    paddingRight: 20,
    paddingTop: 290,
    alignItems: 'flex-end', //area where you see the input numbers
    justifyContent: 'flex-start',
    flex: 1 //important one to have
  },
  resultText: {
    color: '#fff',
    fontSize: 90,
    fontWeight: '300',
    justifyContent: 'flex-start',
    flex: 1
  },
  symbolsText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 50,
  },
  buttonContainer: {
    backgroundColor: '#000',
    paddingBottom: 10,
    justifyContent: "flex-start",
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#333',
  },
  buttonText: {
    fontWeight: '400',
    color: '#fff',
    fontSize: 40,
  },
  buttonText0: {
    fontWeight: '400',
    color: '#fff',
    fontSize: 40,
    textAlign: 'left',
  },
  buttonTextTopRow: {
    fontWeight: '500',
    color: '#000',
    fontSize: 30,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    color: '#CCCCCC',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    alignSelf: 'center'
  }
});
