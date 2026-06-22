import { resource } from 'src/utils/constants/resource';
import { PermissionEnum } from 'src/utils/enums/permission.enum';
import { RoleSlugEnum } from 'src/utils/enums/role-slug.enum';

export { RoleSlugEnum };

export const ROLES = {
  ADMIN: 'Admin',
  DRIVER: 'Driver',
};

const driverPermissions = [
  `${resource.Me}:${PermissionEnum.READ}`,
  `${resource.Me}:${PermissionEnum.WRITE}`,
  `${resource.Me}:${PermissionEnum.UPDATE}`,
  `${resource.File}:${PermissionEnum.READ}`,
  `${resource.File}:${PermissionEnum.WRITE}`,
  `${resource.TeamDriver}:${PermissionEnum.READ}`,
  `${resource.TeamDriver}:${PermissionEnum.WRITE}`,
  `${resource.TeamDriver}:${PermissionEnum.UPDATE}`,
  `${resource.TeamDriver}:${PermissionEnum.DELETE}`,
  `${resource.Vehicle}:${PermissionEnum.READ}`,
  `${resource.Vehicle}:${PermissionEnum.WRITE}`,
  `${resource.Vehicle}:${PermissionEnum.UPDATE}`,
  `${resource.Vehicle}:${PermissionEnum.DELETE}`,
  `${resource.Booking}:${PermissionEnum.READ}`,
  `${resource.Booking}:${PermissionEnum.WRITE}`,
  `${resource.Booking}:${PermissionEnum.UPDATE}`,
  `${resource.BookingRequest}:${PermissionEnum.READ}`,
  `${resource.BookingRequest}:${PermissionEnum.WRITE}`,
  `${resource.BookingRequest}:${PermissionEnum.UPDATE}`,
  `${resource.CommissionPayment}:${PermissionEnum.READ}`,
  `${resource.CommissionPayment}:${PermissionEnum.WRITE}`,
  `${resource.CommissionPayment}:${PermissionEnum.UPDATE}`,
  `${resource.TaxiAvailability}:${PermissionEnum.READ}`,
  `${resource.TaxiAvailability}:${PermissionEnum.WRITE}`,
  `${resource.TaxiAvailability}:${PermissionEnum.UPDATE}`,
  `${resource.TaxiAvailability}:${PermissionEnum.DELETE}`,
  `${resource.TaxiEnquiry}:${PermissionEnum.READ}`,
  `${resource.TaxiEnquiry}:${PermissionEnum.WRITE}`,
  `${resource.TaxiEnquiry}:${PermissionEnum.UPDATE}`,
  `${resource.Chat}:${PermissionEnum.READ}`,
  `${resource.Chat}:${PermissionEnum.WRITE}`,
  `${resource.Ticket}:${PermissionEnum.READ}`,
  `${resource.Ticket}:${PermissionEnum.WRITE}`,
];

export const roles = [
  {
    name: ROLES.ADMIN,
    slug: RoleSlugEnum.ADMIN,
    description: 'Admin with full access to all APIs',
    permissions: 'ALL',
  },
  {
    name: ROLES.DRIVER,
    slug: RoleSlugEnum.DRIVER,
    description: 'Taxi driver with access to bookings, vehicles, and team management',
    permissions: driverPermissions,
  },
];
