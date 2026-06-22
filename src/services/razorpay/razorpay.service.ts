import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const Razorpay = require('razorpay');
import { AppConfigService } from 'src/services/env/env.service';

@Injectable()
export class RazorpayService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly razorpay: any;
  private readonly logger = new Logger(RazorpayService.name);

  constructor(private readonly config: AppConfigService) {
    this.razorpay = new Razorpay({
      key_id: config.get('RAZORPAY_KEY_ID') as string,
      key_secret: config.get('RAZORPAY_KEY_SECRET') as string,
    });
  }

  get keyId(): string {
    return this.config.get('RAZORPAY_KEY_ID') as string;
  }

  /**
   * Creates a Razorpay order.
   * @param amountInPaise - Amount in smallest currency unit (paise for INR).
   * @param currency - ISO currency code, defaults to INR.
   * @param receipt - Internal order reference (max 40 chars).
   */
  async createOrder(
    amountInPaise: number,
    receipt: string,
    currency = 'INR',
  ): Promise<{ id: string; amount: number; currency: string }> {
    try {
      const order = await this.razorpay.orders.create({
        amount: amountInPaise,
        currency,
        receipt: receipt.slice(0, 40),
      });
      return { id: order.id, amount: order.amount as number, currency: order.currency };
    } catch (err) {
      this.logger.error('Failed to create Razorpay order', err);
      throw new InternalServerErrorException('Payment gateway error. Please try again.');
    }
  }

  /**
   * Verifies the payment signature sent by the Razorpay checkout widget on the client.
   * Must be called after a successful payment to confirm authenticity.
   */
  verifyPaymentSignature(
    razorpayOrderId: string,
    razorpayPaymentId: string,
    signature: string,
  ): boolean {
    try {
      return Razorpay.validateWebhookSignature(
        `${razorpayOrderId}|${razorpayPaymentId}`,
        signature,
        this.config.get('RAZORPAY_KEY_SECRET') as string,
      );
    } catch {
      return false;
    }
  }

  /**
   * Verifies the HMAC-SHA256 signature on an incoming Razorpay webhook.
   * @param rawBody - The raw request body string (must not be parsed).
   * @param signature - Value of the `x-razorpay-signature` header.
   */
  verifyWebhookSignature(rawBody: string, signature: string): boolean {
    try {
      return Razorpay.validateWebhookSignature(
        rawBody,
        signature,
        this.config.get('RAZORPAY_WEBHOOK_SECRET') as string,
      );
    } catch {
      return false;
    }
  }
}
