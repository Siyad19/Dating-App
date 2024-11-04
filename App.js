import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/LoginScreen';
import ForgotPassword from './components/ForgotPassword';
import Icon from 'react-native-vector-icons/Ionicons';


export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Sign-In'>
        <Stack.Screen name='Sign-In' component={LoginScreen} options={{headerTitleStyle:{color:"#CC2B52"}}}/>
        <Stack.Screen name='Forgot-Password' component={ForgotPassword} options={({ navigation }) => ({
            title: 'Forgot Password',
            headerTitleStyle: {color:"#CC2B52"},
            headerLeft: () => (
              <Icon.Button
              name="arrow-back"
              size={24}
              backgroundColor="transparent"
              color="#CC2B52"
              onPress={() => navigation.goBack()}/>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AF1740',
  },
});
