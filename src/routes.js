import { createStackNavigator } from 'react-navigation';
import SignIn from './pages/signIn';
import Home from './pages/home';

const Routes = createStackNavigator({
  SignIn,
  Home
});

export default Routes;