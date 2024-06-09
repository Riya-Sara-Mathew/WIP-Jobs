import * as Notifications from 'expo-notifications';
import { MMKV } from 'react-native-mmkv';
import axios from 'axios';

export const storage = new MMKV()

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';

export default async () => {
  try {
    let previousToken = storage.getString('pushtoken');
    console.log(previousToken);
    if (previousToken) {
      return;
    } else {
      let { data: { data: token } } = await Notifications.getExpoPushTokenAsync();
      await axios.post(PUSH_ENDPOINT, { token });
      storage.set('pushtoken', token);
    }
  } catch (error) {
    console.error('Error while registering for notifications:', error);
  }
};
