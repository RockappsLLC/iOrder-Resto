import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import { LoginRequest, LoginReponse, ForgotPaswordRequest, ForgotPaswordResponse, ResetPasswordRequest, ResetPaswordResponse, CreateUserRequestSchema, UpdateUserRequestSchema, UserResponseSchema, UsersResponseSchema, GetUserByIdResponse, GetUsersResponse, CreateCategoryRequestSchema, CategoryResponseSchema, CategoriesResponseSchema, GetCategoryByIdResponse, GetCategoriesResponse, CreateRestaurantRequestSchema, UpdateRestaurantRequestSchema, GetRestaurantsResponse, GetRestaurantByIdResponse, RestaurantsResponseSchema, RestaurantResponseSchema, CreateRestaurantResponseSchema, CreateRestaurantSchema, AddressSchema, CreateMenuCategoryRequestSchema, UpdateMenuCategoryRequestSchema, MenuCategoryResponseSchema, GetMenuCategoryByIdResponse, GetMenuCategoriesResponse, CreateMenuItemRequestSchema, MenuItemResponseSchema, MenuItemsResponseSchema, MenuCategoriesResponseSchema, GetMenuItemByIdResponse, GetMenuItemsResponse, CreateTableRequestSchema, TableResponseSchema, GetTableByIdResponse, GetTablesResponse, TablesResponseSchema, CreateCustomerRequestSchema, UpdateCustomerRequestSchema, CustomerResponseSchema, GetCustomerByIdResponse, GetCustomersResponse, CustomersResponseSchema, CreateReservationRequestSchema, UpdateReservationRequestSchema, GetReservationsResponse, GetReservationByIdResponse, ReservationResponseSchema, CreateReservationResponseSchema, ReservationsResponseSchema, UpdateDeviceRequestSchema, DeviceRequestSchema, GetDeviceByIdResponse, DeviceResponseSchema, DevicesResponseSchema, GetDevicesResponse, CreateTaskRequestSchema, TaskResponseSchema, TasksResponseSchema, GetTaskByIdResponse, GetTasksResponse, CreateLeadRequestSchema, LeadResponseSchema, LeadsResponseSchema, GetLeadByIdResponse, GetLeadsResponse, CreateAppointmentRequestSchema, AppointmentResponseSchema, AppointmentsResponseSchema, GetAppointmentByIdResponse, GetAppointmentsResponse, CreatePackageRequestSchema, PackageResponseSchema, PackagesResponseSchema, GetPackageByIdResponse, GetPackagesResponse, UpdateOrderRequestSchema, OrderRequestSchema, GetOrderByIdResponse, OrderResponseSchema, OrdersResponseSchema, GetOrdersResponse, ErrorResponse, CreateInvoiceRequestSchema, UpdateInvoiceRequestSchema, GetInvoiceByIdResponse, GetInvoicesResponse, InvoiceItemSchema, InvoicesResponseSchema, InvoiceResponseSchema, StatisticsResponseSchema, GetStatisticsResponse, PaymentRequestSchema, PaymentResponseSchema, PaymentsResponseSchema, GetPaymentByIdResponse, GetPaymentsResponse, FilesResponseSchema, UploadFilesRequest, UploadFilesResponse } from './api-schemas'

// ----------------------------------------------------------------------

export async function postUpload(
  data: 
): Promise<{ data: UploadFilesResponse } | ErrorResponse> {
  const URL = endpoints.files.upload.post;
  return axios.post(URL, data);
}

// ----------------------------------------------------------------------