import { emptySplitApi as api } from "./emptyApi";

export const addTagTypes = [
    "authenticate-controller",
    "profile-controller",
] as const;

const injectedRtkApi = api.enhanceEndpoints({
    addTagTypes,
})
    .injectEndpoints({
        endpoints : (build) => ({
            authorize: build.mutation<AuthorizeApiResponse, AuthorizeApiArg>({
                query: (queryArg) => ({
                    url: `/api/auth/authorize`,
                    method: "POST",
                    body: queryArg.authenticationRequest,
                }),
                invalidatesTags: ["authenticate-controller"],
            }),
            register: build.mutation<RegisterApiResponse, RegisterApiArg>({
                query: (queryArg) => ({
                    url: `/api/auth/register`,
                    method: "POST",
                    body: queryArg.registerUserRequest,
                }),
                invalidatesTags: ["authenticate-controller"],
            }),
            getProfile: build.query<GetProfileApiResponse, GetProfileApiArg>({
                query: (queryArg) => ({ url: `/api/profile/${queryArg.idOrMe}` }),
                providesTags: ["profile-controller"],
            }),
            logout: build.mutation<LogoutApiResponse, LogoutApiArg>({
                query: () => ({ url: `/api/logout`, method: "POST" }),
                invalidatesTags: ["authenticate-controller"],
            })
        })
    })

export type AuthorizeApiResponse = /** status 200 OK */ AuthenticationResponse;
export type AuthorizeApiArg = {
    authenticationRequest: AuthenticationRequest;
};
export type RegisterApiResponse =
/** status 200 OK */ RegisterUserResponse;
export type RegisterApiArg = {
    registerUserRequest: RegisterUserRequest;
};
export type RegisterUserRequest = {
    password: string;
    email: string;
    firstName : string;
    lastName: string;
};
export type UserProfileResponse = {
    id: number;
    email: string;
    firstName: string;
    lastName : string;
};
export type AuthenticationRequest = {
    email: string;
    password: string;
};
export type AuthenticationResponse = {
    token?: string;
};
export type RegisterUserResponse = {
    token?: string;
};
export type GetProfileApiResponse =
/** status 200 OK */ UserProfileResponse;
export type GetProfileApiArg = {
    idOrMe: string;
};
export type LogoutApiResponse = unknown;
export type LogoutApiArg = void;
export { injectedRtkApi as api };
export const {
    useAuthorizeMutation,
    useRegisterMutation,
    useLogoutMutation,
    useGetProfileQuery,
} = injectedRtkApi;