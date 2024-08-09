import { HttpContextToken } from "@angular/common/http";

export const API_REQUEST = new HttpContextToken<boolean>(() => true);
export const NEED_AUTH = new HttpContextToken<boolean>(() => true);

