import {
  AccessToken,
  LoginManager,
} from "react-native-fbsdk-next";

import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL
} from './types';
import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV()

export const facebookLogin = () => async dispatch => {
  let token = storage.getString('fb_token');

  if (token) {
    // Dispatch an action saying FB login is done
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    // Start up FB Login process
    await doFacebookLogin(dispatch);
  }
};

const doFacebookLogin = async dispatch => {
  let token = '';
  const result = await LoginManager.logInWithPermissions(
      [
        "public_profile",
      ],
  );

  AccessToken.getCurrentAccessToken().then(
      (data) => {
        token = data.accessToken.toString()
      }
  )

  if (token === '' || !result) {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }

  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};
