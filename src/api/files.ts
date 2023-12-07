import axios, { endpoints } from 'src/utils/axios';

import { ErrorResponse, UploadFilesRequest, UploadFilesResponse } from './api-schemas';

// ----------------------------------------------------------------------

export async function postUpload(
  data: UploadFilesRequest
): Promise<{ data: UploadFilesResponse } | ErrorResponse> {
  const URL = endpoints.files.upload.post;
  return axios.post(URL, data);
}

// ----------------------------------------------------------------------
