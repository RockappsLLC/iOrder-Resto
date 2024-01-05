import axios, { endpoints } from 'src/utils/axios';

import {
  LoginRequest,
  LoginReponse,
  ErrorResponse,
  ChangePinRequest,
  ChangePinResponse,
  ForgotPaswordRequest,
  ResetPasswordRequest,
  ResetPaswordResponse,
  ForgotPaswordResponse,
  ChangePasswordRequest,
  ChangePaswordResponse,
} from './api-schemas';

// ----------------------------------------------------------------------

export async function postLogin(
  data: LoginRequest
): Promise<{ data: LoginReponse } | ErrorResponse> {
  const URL = endpoints.auth.login.post;
  return axios.post(URL, data);
}

// ----------------------------------------------------------------------

export async function postForgotPassword(
  data: ForgotPaswordRequest
): Promise<{ data: ForgotPaswordResponse } | ErrorResponse> {
  const URL = endpoints.auth.forgotPassword.post;
  return axios.post(URL, data);
}

// ----------------------------------------------------------------------

export async function postResetPassword(
  data: ResetPasswordRequest
): Promise<{ data: ResetPaswordResponse } | ErrorResponse> {
  const URL = endpoints.auth.resetPassword.post;
  return axios.post(URL, data);
}

// ----------------------------------------------------------------------

export async function postChangePassword(
  data: ChangePasswordRequest
): Promise<{ data: ChangePaswordResponse } | ErrorResponse> {
  const URL = endpoints.auth.changePassword.post;
  return axios.post(URL, data);
}

// ----------------------------------------------------------------------

export async function postChangePin(
  data: ChangePinRequest
): Promise<{ data: ChangePinResponse } | ErrorResponse> {
  const URL = endpoints.auth.changePin.post;
  return axios.post(URL, data);
}

// ----------------------------------------------------------------------
