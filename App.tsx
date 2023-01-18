import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { Auth0Provider, useAuth0 } from "react-native-auth0";
import { Logs } from "expo";

Logs.enableExpoCliLogging();

const TestApp = () => {
  const { user, error, authorize, getCredentials, clearSession } = useAuth0();

  console.log("ERROR", error);
  const onLogin = async () => {
    try {
      await authorize({});
      const credentials = await getCredentials();
      Alert.alert('AccessToken: ' + credentials);
    } catch (e) {
      console.log(e);
    }
  };

  const loggedIn = user !== undefined && user !== null;

  const onLogout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log('Log out cancelled');
    }
  };

  return (
    <View style={styles.container}>
      {user && <Text>You are logged in as {user.name}</Text>}
      {!user && <Text>You are not logged in</Text>}
      <Button
        onPress={loggedIn ? onLogout : onLogin}
        title={loggedIn ? 'Log Out' : 'Log In'}
      />
    </View>
  );
}
export default function App() {
  return (
    <Auth0Provider domain={"{AUTH0_DOMAIN}"} clientId={"{AUTH0_CLIENT_ID}"}>
      <TestApp />
    </Auth0Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
