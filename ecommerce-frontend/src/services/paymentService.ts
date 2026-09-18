import api from "./api";

export interface PaymentOrderResponse {
  orderId: number;
  razorpayOrderId: string;
  amount: number;
  currency: string;
  keyId: string;
}

export interface PaymentVerificationRequest {
  orderId: number;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export const createPaymentOrder = async(
    orderId:number
):Promise<PaymentOrderResponse> =>{
    const response = await api.post<PaymentOrderResponse>(
        `/payments/create-order?orderId=${orderId}`
    )

    return response.data;
}

export const verifyPayment = async (
  data: PaymentVerificationRequest
): Promise<void> => {
  await api.post("/payments/verify", data);
};