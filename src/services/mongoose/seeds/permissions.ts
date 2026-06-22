import { resource } from 'src/utils/constants/resource';
import { PermissionEnum } from 'src/utils/enums/permission.enum';

const taxiResources = [
  resource.Me,
  resource.User,
  resource.Role,
  resource.File,
  resource.TeamDriver,
  resource.Vehicle,
  resource.Booking,
  resource.BookingRequest,
  resource.CommissionPayment,
  resource.TaxiAvailability,
  resource.TaxiEnquiry,
  resource.Chat,
  resource.Ticket,
];

export const permissions = taxiResources.flatMap((res) =>
  Object.values(PermissionEnum).map((action) => ({
    action,
    resource: res,
    slug: `${res}:${action}`,
  })),
);
