import { CONFIG } from "@/config";

class JWT {
  private readonly SECRET: Uint8Array<ArrayBuffer>;
  private readonly JWT_ISSUER = "keynest-api";

  constructor() {
    this.SECRET = new TextEncoder().encode(CONFIG.JWT_SECRET);
  }

  sign = () => {};

  verify = () => {};
}
