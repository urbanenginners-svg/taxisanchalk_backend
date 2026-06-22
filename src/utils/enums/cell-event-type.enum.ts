export enum CellEventTypeEnum {
  PRODUCT_ASSIGNED = 'product_assigned',
  PRODUCT_REMOVED = 'product_removed',
  CELL_TOGGLED = 'cell_toggled',
  PUTAWAY_SUBMITTED = 'putaway_submitted',
  LOCATION_TRANSFER_OUT = 'location_transfer_out',
  LOCATION_TRANSFER_IN = 'location_transfer_in',
  ORDER_PACKING_PICK_OUT = 'order_packing_pick_out',
  ORDER_CANCEL_RESTORE = 'order_cancel_restore',
  AUDIT_ADJUSTMENT_IN = 'audit_adjustment_in',
  AUDIT_ADJUSTMENT_OUT = 'audit_adjustment_out',
}
