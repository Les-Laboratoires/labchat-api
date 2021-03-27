import {randomBytes} from "crypto"
export default function generateIdentifier() {
  return randomBytes(16).toString("hex")
}