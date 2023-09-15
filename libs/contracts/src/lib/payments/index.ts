export namespace PaymentGenerateLink {
  export const topic = 'payment.generate-link.command';

  export class Request {
    sum!: number;
    courseId!: string;
    userId!: string;
  }

  export class Response {
    link!: string;
  }
}

export type statusType = 'cancel' | 'progress' | 'success';

export namespace PaymentCheck {
  export const topic = 'payment.check-link.query';

  export class Request {
    courseId!: string;
    userId!: string;
  }

  export class Response {
    status!: statusType;
  }
}
