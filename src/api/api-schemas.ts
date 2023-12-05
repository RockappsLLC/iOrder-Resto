export interface LoginRequest {
  email: string;
  password?: string;
  pin?: string;
}
export interface LoginReponse {
  success?: boolean;
  data?: string;
}
export interface ForgotPaswordRequest {
  email: string;
}
export interface ForgotPaswordResponse {
  success?: boolean;
  data?: string;
}
export interface ResetPasswordRequest {
  email: string;
  newPassword?: string;
  resetToken?: string;
}
export interface ResetPaswordResponse {
  success?: boolean;
  data?: string;
}
export interface CreateUserRequestSchema {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber?: string;
  restaurantId: string;
  password: string;
  pin?: string;
  role: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}
export interface UpdateUserRequestSchema {
  firstName?: string;
  lastName?: string;
  email?: string;
  contactNumber?: string;
  restaurantId?: string;
  role?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}
export interface UserResponseSchema {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  contactNumber?: string;
  restaurantId?: string;
  password?: string;
  role?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}
export interface UsersResponseSchema {
  users?: UserResponseSchema[];
  offset?: number;
  limit?: number;
  totalLength?: number;
}
export interface GetUserByIdResponse {
  success?: boolean;
  data?: UserResponseSchema;
}
export interface GetUsersResponse {
  success?: boolean;
  data?: UsersResponseSchema;
}
export interface CreateCategoryRequestSchema {
  name: string;
  icon?: string;
  status?: boolean;
}
export interface CategoryResponseSchema {
  _id?: string;
  name?: string;
  icon?: string;
  status?: boolean;
}
export interface CategoriesResponseSchema {
  categories?: CategoryResponseSchema[];
  offset?: number;
  limit?: number;
  totalLength?: number;
}
export interface GetCategoryByIdResponse {
  success?: boolean;
  data?: CategoryResponseSchema;
}
export interface GetCategoriesResponse {
  success?: boolean;
  data?: CategoriesResponseSchema;
}
export interface CreateRestaurantRequestSchema {
  name: string;
  taxId: string;
  categoryId: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  contactNumber?: string;
  password?: string;
  streetAndNumber?: string;
  zip?: string;
  place?: string;
  canton?: string;
  startDate?: Date;
  endDate?: Date;
}
export interface UpdateRestaurantRequestSchema {
  name?: string;
  taxId?: string;
  categoryId?: string;
  streetAndNumber?: string;
  zip?: string;
  place?: string;
  canton?: string;
  startDate?: Date;
  endDate?: Date;
}
export interface GetRestaurantsResponse {
  success?: boolean;
  data?: RestaurantsResponseSchema;
}
export interface GetRestaurantByIdResponse {
  success?: boolean;
  data?: RestaurantResponseSchema;
}
export interface RestaurantsResponseSchema {
  restaurants?: RestaurantResponseSchema[];
  offset?: number;
  limit?: number;
  totalLength?: number;
}
export interface RestaurantResponseSchema {
  _id?: string;
  name?: string;
  taxId?: string;
  address?: AddressSchema;
  startDate?: Date;
  endDate?: Date;
}
export interface CreateRestaurantResponseSchema {
  success?: boolean;
  data?: CreateRestaurantSchema;
}
export interface CreateRestaurantSchema {
  restaurant?: RestaurantResponseSchema;
  user?: UserResponseSchema;
}
export interface AddressSchema {
  streetAndNumber?: string;
  zip?: string;
  place?: string;
  canton?: string;
}
export interface CreateMenuCategoryRequestSchema {
  name: string;
  icon?: string;
  restaurantId?: string;
}
export interface UpdateMenuCategoryRequestSchema {
  name: string;
  icon?: string;
}
export interface MenuCategoryResponseSchema {
  _id?: string;
  name?: string;
  icon?: string;
  restaurantId?: string;
  status?: boolean;
}
export interface GetMenuCategoryByIdResponse {
  success?: boolean;
  data?: MenuCategoryResponseSchema;
}
export interface GetMenuCategoriesResponse {
  success?: boolean;
  data?: MenuCategoriesResponseSchema;
}
export interface CreateMenuItemRequestSchema {
  name: string;
  price: number;
  restaurantId?: string;
  menuCategoryId?: string;
  icon?: string;
  status?: boolean;
  preparationTime?: number;
}
export interface MenuItemResponseSchema {
  _id?: string;
  name?: string;
  price?: number;
  restaurantId?: string;
  menuCategoryId?: string;
  icon?: string;
  status?: boolean;
  preparationTime?: number;
}
export interface MenuItemsResponseSchema {
  menuItems?: MenuItemResponseSchema[];
  offset?: number;
  limit?: number;
  totalLength?: number;
}
export interface MenuCategoriesResponseSchema {
  menuCategories?: MenuCategoryResponseSchema[];
  offset?: number;
  limit?: number;
  totalLength?: number;
}
export interface GetMenuItemByIdResponse {
  success?: boolean;
  data?: MenuItemResponseSchema;
}
export interface GetMenuItemsResponse {
  success?: boolean;
  data?: MenuItemsResponseSchema;
}
export interface CreateTableRequestSchema {
  name: string;
  seatsNumber?: number;
  restaurantId: string;
  status?: number;
  positionX?: number;
  positionY?: number;
  height?: number;
  width?: number;
  type?: string;
}
export interface TableResponseSchema {
  _id?: string;
  name?: string;
  seatsNumber?: number;
  restaurantId?: string;
  status?: number;
  positionX?: number;
  positionY?: number;
  height?: number;
  width?: number;
  type?: string;
}
export interface GetTableByIdResponse {
  success?: boolean;
  data?: TableResponseSchema;
}
export interface GetTablesResponse {
  success?: boolean;
  data?: TablesResponseSchema;
}
export interface TablesResponseSchema {
  tables?: TableResponseSchema[];
  offset?: number;
  limit?: number;
  totalLength?: number;
}
export interface CreateCustomerRequestSchema {
  name: string;
  email: string;
  contactNumber: string;
  sex: 'male' | 'female';
  restaurantId: string;
  street?: string;
  city?: string;
  canton?: string;
  dateOfBirth?: Date;
}
export interface UpdateCustomerRequestSchema {
  name?: string;
  email?: string;
  contactNumber?: string;
  sex?: 'male' | 'female';
  restaurantId?: string;
  street?: string;
  city?: string;
  canton?: string;
  dateOfBirth?: Date;
}
export interface CustomerResponseSchema {
  _id?: string;
  name?: string;
  email?: string;
  contactNumber?: string;
  sex?: 'male' | 'female';
  restaurantId?: string;
  street?: string;
  city?: string;
  canton?: string;
  dateOfBirth?: Date;
}
export interface GetCustomerByIdResponse {
  success?: boolean;
  data?: CustomerResponseSchema;
}
export interface GetCustomersResponse {
  success?: boolean;
  data?: CustomersResponseSchema;
}
export interface CustomersResponseSchema {
  customers?: CustomerResponseSchema[];
  offset?: number;
  limit?: number;
  totalLength?: number;
}
export interface CreateReservationRequestSchema {
  name: string;
  tableId: string;
  restaurantId?: string;
  userId: string;
  status?: boolean;
  guestNumber: number;
  startTime: Date;
  endTime: Date;
}
export interface UpdateReservationRequestSchema {
  name?: string;
  tableId?: string;
  restaurantId?: string;
  userId?: string;
  status?: boolean;
  guestNumber?: number;
  startTime?: Date;
  endTime?: Date;
}
export interface GetReservationsResponse {
  success?: boolean;
  data?: ReservationsResponseSchema;
}
export interface GetReservationByIdResponse {
  success?: boolean;
  data?: ReservationResponseSchema;
}
export interface ReservationResponseSchema {
  name?: string;
  tableId?: string;
  restaurantId?: string;
  userId?: string;
  status?: boolean;
  guestNumber?: number;
  startTime?: Date;
  endTime?: Date;
}
export interface CreateReservationResponseSchema {
  success?: boolean;
  data?: ReservationResponseSchema;
}
export interface ReservationsResponseSchema {
  reservations?: ReservationResponseSchema[];
  offset?: number;
  limit?: number;
  totalLength?: number;
}
export interface UpdateDeviceRequestSchema {
  mac?: string;
  category?: 'back' | 'front';
  condition?: boolean;
  assignToClient?: string;
}
export interface DeviceRequestSchema {
  mac: string;
  category?: 'back' | 'front';
  condition?: boolean;
  assignToClient?: string;
}
export interface GetDeviceByIdResponse {
  success?: boolean;
  data?: DeviceResponseSchema;
}
export interface DeviceResponseSchema {
  _id?: string;
  deviceId?: number;
  mac?: string;
  category?: 'back' | 'front';
  condition?: boolean;
  status?: boolean;
  assignToClient?: string;
}
export interface DevicesResponseSchema {
  devices?: DeviceResponseSchema[];
  offset?: number;
  limit?: number;
  totalLength?: number;
}
export interface GetDevicesResponse {
  success?: boolean;
  data?: DevicesResponseSchema;
}
export interface CreateTaskRequestSchema {
  title: string;
  comment?: string;
  status: 0 | 1 | 2 | 3;
  label?: string;
  dueDate?: Date;
  members?: string[];
}
export interface TaskResponseSchema {
  _id?: string;
  title?: string;
  comment?: string;
  status?: 0 | 1 | 2 | 3;
  label?: string;
  dueDate?: Date;
  members?: string[];
  attachment?: string;
}
export interface TasksResponseSchema {
  tasks?: TaskResponseSchema[];
  offset?: number;
  limit?: number;
  totalLength?: number;
}
export interface GetTaskByIdResponse {
  success?: boolean;
  data?: TaskResponseSchema;
}
export interface GetTasksResponse {
  success?: boolean;
  data?: TasksResponseSchema;
}
export interface CreateLeadRequestSchema {
  firstName: string;
  lastName: string;
  businessName: string;
  billingEmail?: string;
  status?: boolean;
  taxId?: string;
  contact?: string;
  language?: string;
  country?: string;
  useBillingAddress?: boolean;
}
export interface LeadResponseSchema {
  _id?: string;
  firstName?: string;
  lastName?: string;
  businessName?: string;
  billingEmail?: string;
  status?: boolean;
  taxId?: string;
  contact?: string;
  language?: string;
  country?: string;
  useBillingAddress?: boolean;
}
export interface LeadsResponseSchema {
  leads?: LeadResponseSchema[];
  offset?: number;
  limit?: number;
  totalLength?: number;
}
export interface GetLeadByIdResponse {
  success?: boolean;
  data?: LeadResponseSchema;
}
export interface GetLeadsResponse {
  success?: boolean;
  data?: LeadsResponseSchema;
}
export interface CreateAppointmentRequestSchema {
  title?: string;
  restaunantName?: string;
  categoryId?: string;
  contact?: string;
  package?: string;
  from?: Date;
  to?: Date;
  type?: string;
  status?: boolean;
}
export interface AppointmentResponseSchema {
  _id?: string;
  title?: string;
  restaunantName?: string;
  categoryId?: string;
  contact?: string;
  package?: string;
  from?: Date;
  to?: Date;
  type?: string;
  status?: boolean;
}
export interface AppointmentsResponseSchema {
  appointments?: AppointmentResponseSchema[];
  offset?: number;
  limit?: number;
  totalLength?: number;
}
export interface GetAppointmentByIdResponse {
  success?: boolean;
  data?: AppointmentResponseSchema;
}
export interface GetAppointmentsResponse {
  success?: boolean;
  data?: AppointmentsResponseSchema;
}
export interface CreatePackageRequestSchema {
  name: string;
  description: string;
  price: number;
  currency: string;
  period: string;
  points?: string[];
  icon?: string;
  popular?: boolean;
}
export interface PackageResponseSchema {
  _id?: string;
  name?: string;
  description?: string;
  price?: number;
  currency?: string;
  period?: string;
  points?: string[];
  icon?: string;
  popular?: boolean;
}
export interface PackagesResponseSchema {
  packages?: PackageResponseSchema[];
  offset?: number;
  limit?: number;
  totalLength?: number;
}
export interface GetPackageByIdResponse {
  success?: boolean;
  data?: PackageResponseSchema;
}
export interface GetPackagesResponse {
  success?: boolean;
  data?: PackagesResponseSchema;
}
export interface UpdateOrderRequestSchema {
  customer?: CustomerResponseSchema;
  paymentType?: 0 | 1;
  status?: 0 | 1 | 2;
  menuItems?: MenuItemResponseSchema[];
  staffId?: string;
  restaurantId?: string;
}
export interface OrderRequestSchema {
  customer: CustomerResponseSchema;
  paymentType?: 0 | 1;
  status?: 0 | 1 | 2;
  menuItems?: MenuItemResponseSchema[];
  staffId?: string;
  restaurantId?: string;
}
export interface GetOrderByIdResponse {
  success?: boolean;
  data?: OrderResponseSchema;
}
export interface OrderResponseSchema {
  _id?: string;
  orderId?: number;
  price?: number;
  currency?: string;
  customer?: CustomerResponseSchema;
  paymentType?: 0 | 1;
  status?: 0 | 1 | 2;
  menuItems?: MenuItemResponseSchema[];
  staffId?: string;
}
export interface OrdersResponseSchema {
  orders?: OrderResponseSchema[];
  offset?: number;
  limit?: number;
  totalLength?: number;
}
export interface GetOrdersResponse {
  success?: boolean;
  data?: OrdersResponseSchema;
}
export interface ErrorResponse {
  success?: boolean;
  message?: string;
  data?: any;
}
export interface CreateInvoiceRequestSchema {
  number: number;
  dateIssued: Date;
  dateDue: Date;
  invoiceTo: RestaurantResponseSchema;
  items: InvoiceItemSchema[];
  subtotal?: number;
  tax?: number;
  total: number;
  salesPerson?: string;
  salesPersonNote?: string;
  note?: string;
}
export interface UpdateInvoiceRequestSchema {
  number?: number;
  dateIssued?: Date;
  dateDue?: Date;
  invoiceTo?: RestaurantResponseSchema;
  items?: InvoiceItemSchema[];
  subtotal?: number;
  tax?: number;
  total?: number;
  salesPerson?: string;
  salesPersonNote?: string;
  note?: string;
}
export interface GetInvoiceByIdResponse {
  success?: boolean;
  data?: InvoiceResponseSchema;
}
export interface GetInvoicesResponse {
  success?: boolean;
  data?: InvoicesResponseSchema;
}
export interface InvoiceItemSchema {
  name?: string;
  description?: string;
  cost?: number;
  hours?: number;
  price?: number;
}
export interface InvoicesResponseSchema {
  invoices?: InvoiceResponseSchema[];
  offset?: number;
  limit?: number;
  totalLength?: number;
}
export interface InvoiceResponseSchema {
  _id?: string;
  number?: number;
  dateIssued?: Date;
  dateDue?: Date;
  invoiceTo?: RestaurantResponseSchema;
  items?: InvoiceItemSchema[];
  subtotal?: number;
  tax?: number;
  total?: number;
  salesPerson?: string;
  salesPersonNote?: string;
  note?: string;
}
export interface StatisticsResponseSchema {
  appointments?: number;
  categories?: number;
  customers?: number;
  devices?: number;
  invoices?: number;
  leads?: number;
  menuCategories?: number;
  menuItems?: number;
  orders?: number;
  packages?: number;
  reservations?: number;
  restaurants?: number;
  tables?: number;
  tasks?: number;
  users?: number;
}
export interface GetStatisticsResponse {
  success?: boolean;
  data?: StatisticsResponseSchema;
}
