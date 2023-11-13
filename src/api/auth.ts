import axios, { endpoints } from 'src/utils/axios';

import {
  LoginRequest,
  LoginReponse,
  ForgotPaswordRequest,
  ResetPasswordRequest,
  ResetPaswordResponse,
  ForgotPaswordResponse,
} from './api-schemas';

// ----------------------------------------------------------------------

export async function postLogin(data: LoginRequest): Promise<{ data: LoginReponse }> {
  const URL = endpoints.auth.login.post;
  return axios.post(URL, data);
}

// ----------------------------------------------------------------------

export async function postForgotPassword(
  data: ForgotPaswordRequest
): Promise<{ data: ForgotPaswordResponse }> {
  const URL = endpoints.auth.forgotPassword.post;
  return axios.post(URL, data);
}

// ----------------------------------------------------------------------

export async function postResetPassword(
  data: ResetPasswordRequest
): Promise<{ data: ResetPaswordResponse }> {
  const URL = endpoints.auth.resetPassword.post;
  return axios.post(URL, data);
}

// ----------------------------------------------------------------------
