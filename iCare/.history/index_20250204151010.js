import { registerRootComponent } from 'expo';
import App from './App';

registerRootComponent(App);

import { AppRegistry } from "react-native";
import { iCare } from "./app.json";

import appConfig from "./app.json";

const appName = appConfig.expo.name;

AppRegistry.registerComponent(appName, () => App);
