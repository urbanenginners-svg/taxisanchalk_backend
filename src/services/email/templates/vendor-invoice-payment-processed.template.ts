import { renderTemplate } from './template.renderer';

const SUBJECT_TEMPLATE =
  'Payment Processed - Invoice {{invoiceReferenceNumber}}';

const BODY_TEMPLATE = `
<!doctype html>
<html>
  <body style="font-family: Arial, sans-serif; background:#f9fafb; padding:20px;">
    <div style="max-width:640px; margin:auto; background:#ffffff; border:1px solid #e5e7eb; border-radius:8px; padding:20px;">

      <h2 style="color:#15803d; margin-bottom:10px;">
        Payment Processed Successfully
      </h2>

      <p style="margin:0 0 16px;">
        Hello {{vendorName}},
      </p>

      <p style="margin-bottom:16px;">
        We are pleased to inform you that your payment for the vendor invoice below has been processed.
      </p>

      <table style="width:100%; border-collapse:collapse; font-size:14px; margin-bottom:20px;">

        <tr>
          <td style="padding:8px; font-weight:bold;">Invoice Reference</td>
          <td style="padding:8px;">{{invoiceReferenceNumber}}</td>
        </tr>

        <tr style="background:#f3f4f6;">
          <td style="padding:8px; font-weight:bold;">Purchase Order Reference</td>
          <td style="padding:8px;">{{purchaseOrderReferenceNumber}}</td>
        </tr>

        <tr>
          <td style="padding:8px; font-weight:bold;">Payment Reference</td>
          <td style="padding:8px;">{{paymentReferenceNumber}}</td>
        </tr>

        <tr style="background:#f3f4f6;">
          <td style="padding:8px; font-weight:bold;">Paid On</td>
          <td style="padding:8px;">{{paidAt}}</td>
        </tr>

        <tr>
          <td style="padding:8px; font-weight:bold;">Warehouse</td>
          <td style="padding:8px;">{{warehouseName}}</td>
        </tr>

        <tr style="background:#f3f4f6;">
          <td style="padding:8px; font-weight:bold;">Raised Amount</td>
          <td style="padding:8px;">{{raisedAmount}}</td>
        </tr>

        <tr>
          <td style="padding:8px; font-weight:bold;">Paid Amount</td>
          <td style="padding:8px; color:#15803d; font-weight:bold;">{{validAmount}}</td>
        </tr>

      </table>

      <h3 style="font-size:16px; margin:0 0 12px;">Invoice Items</h3>

      {{lineItemsTable}}

      <p style="margin-top:20px; font-size:13px; color:#6b7280;">
        If you have any questions regarding this payment, please contact our support team.
      </p>

      <p style="margin-top:20px; font-size:13px; color:#6b7280;">
        Regards,<br/>
        {{teamName}}
      </p>

    </div>
  </body>
</html>
`;

export function vendorInvoicePaymentProcessedTemplate(
  variables: Record<string, string>,
) {
  return {
    subject: renderTemplate(SUBJECT_TEMPLATE, variables),
    html: renderTemplate(BODY_TEMPLATE, variables),
  };
}
