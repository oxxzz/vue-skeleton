import http from "@/libs/http";

export namespace Auth {
  export function login(params: object) {
    return http.post("/v1/auth/login", params)
  }
}