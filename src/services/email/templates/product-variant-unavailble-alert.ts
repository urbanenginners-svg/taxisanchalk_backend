import { renderTemplate } from './template.renderer';

const SUBJECT_TEMPLATE =
  'Product Unavailable Alert - {{productName}} (SKU: {{variantSku}})';

const BODY_TEMPLATE = `
<!doctype html>
<html>
  <body style="font-family: Arial, sans-serif; background:#f9fafb; padding:20px;">
    <div style="max-width:600px; margin:auto; background:#ffffff; border:1px solid #e5e7eb; border-radius:8px; padding:20px;">

      <h2 style="color:#b91c1c; margin-bottom:10px;">
        Product  Variant Unavailable Alert
      </h2>

      <p style="margin:0 0 16px;">
        Hello Inventory Team,
      </p>

      <p style="margin-bottom:16px;">
        A customer attempted to place an order for a product variant that is currently unavailable.
      </p>

      <table style="width:100%; border-collapse:collapse; font-size:14px;">

        <tr>
          <td style="padding:8px; font-weight:bold;">Product Name</td>
          <td style="padding:8px;">{{productName}}</td>
        </tr>

        <tr style="background:#f3f4f6;">
          <td style="padding:8px; font-weight:bold;">Variant SKU</td>
          <td style="padding:8px;">{{variantSku}}</td>
        </tr>

        <tr>
          <td style="padding:8px; font-weight:bold;">Packet Size</td>
          <td style="padding:8px;">{{packetSize}}</td>
        </tr>

        <tr style="background:#f3f4f6;">
          <td style="padding:8px; font-weight:bold;">Unit Type</td>
          <td style="padding:8px;">{{unitType}}</td>
        </tr>

        <tr>
          <td style="padding:8px; font-weight:bold;">Customer ID</td>
          <td style="padding:8px;">{{customerId}}</td>
        </tr>

        <tr style="background:#f3f4f6;">
          <td style="padding:8px; font-weight:bold;">External Order ID</td>
          <td style="padding:8px;">{{externalOrderId}}</td>
        </tr>

        <tr>
          <td style="padding:8px; font-weight:bold;">Warehouse ID</td>
          <td style="padding:8px;">{{warehouseId}}</td>
        </tr>

        <tr style="background:#f3f4f6;">
          <td style="padding:8px; font-weight:bold;">Triggered At</td>
          <td style="padding:8px;">{{triggeredAt}}</td>
        </tr>

      </table>

      <p style="margin-top:20px; color:#b91c1c;">
        Please review inventory availability and update the product status if required.
      </p>

      <p style="margin-top:20px; font-size:13px; color:#6b7280;">
        Regards,<br/>
        {{teamName}}
      </p>

    </div>
  </body>
</html>
`;

export function productUnavailableAlertTemplate(
  variables: Record<string, string>,
) {
  return {
    subject: renderTemplate(SUBJECT_TEMPLATE, variables),
    html: renderTemplate(BODY_TEMPLATE, variables),
  };
}