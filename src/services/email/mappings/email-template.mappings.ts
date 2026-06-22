import { EmailTemplateMapping } from '../types/email-template-mapping.type';
import { genericNotificationTemplate } from '../templates/generic-notification.template';
import { franchiseEnquiryTemplate } from '../templates/franchis-enquiry.template';
import { franchiseEnquiryAdminNotificationTemplate } from '../templates/franchise-enquiry-admin-notification.template';
import { franchiseDocumentVerifiedTemplate } from '../templates/franchise-document-verified.template';
import { franchiseApprovedTemplate } from '../templates/franchise-approved.template';
import{ lowStockAlertTemplate } from '../templates/low-stock-alert.template';
import { productUnavailableAlertTemplate } from '../templates/product-variant-unavailble-alert';
import { vendorInvoicePaymentProcessedTemplate } from '../templates/vendor-invoice-payment-processed.template';

export const emailTemplateMappings: EmailTemplateMapping = {
  generic_notification: (variables: Record<string, string>) =>
    genericNotificationTemplate(variables),
  franchise_enquiry_notification: (variables: Record<string, string>) =>
    franchiseEnquiryTemplate(variables),
  franchise_enquiry_admin_notification: (variables: Record<string, string>) =>
    franchiseEnquiryAdminNotificationTemplate(variables),
  franchise_document_verified: (variables: Record<string, string>) =>
    franchiseDocumentVerifiedTemplate(variables),
  franchise_approved: (variables: Record<string, string>) =>
    franchiseApprovedTemplate(variables),
  low_stock_alert: (variables: Record<string, string>) => lowStockAlertTemplate(variables),
  product_unavailable_alert: (variables: Record<string, string>) =>
    productUnavailableAlertTemplate(variables),
  vendor_invoice_payment_processed: (variables: Record<string, string>) =>
    vendorInvoicePaymentProcessedTemplate(variables),
};
