import { User } from "./user";

export interface ApiResult {
  result?: boolean;
  user?: User;
  status?: string;
}
