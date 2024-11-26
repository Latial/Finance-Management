import { emptySplitApi as api } from "./emptyApi";

export const addTagTypes = [
    "authenticate-controller",
    "profile-controller",
    "expendTypes-controller",
    "expend-controller"
] as const;

const injectedRtkApi = api.enhanceEndpoints({
    addTagTypes,
})
    .injectEndpoints({
        endpoints : (build) => ({
            getAllExpendTypes: build.query<
                GetAllExpendTypesApiResponse,
                GetAllExpendTypesApiArgs
            >({
                query: () => ({ url: `/api/expend`}),
                providesTags: ["expendTypes-controller"],
            }),
            getAllExpends : build.query<
                GetAllExpendsApiResponse,
                GetAllExpendsApiArgs
            >({
                query: () => ({ url: `/api/MoodType`}),
                providesTags: ["expendTypes-controller"],
            }),
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
            expanseAdd: build.mutation<ExpendAddApiResponse, ExpendAddApiArg>({
                query: (queryArg) => ({
                    url: `/api/profile/add`,
                    method: "POST",
                    body: queryArg.expendRequest,
                }),
                invalidatesTags: ["expend-controller"],
            }),
            expanseAlone: build.mutation<ExpendAloneApiResponse, ExpendAloneApiArg>({
                query: (queryArg) => ({
                    url: `/api/expend/addExpend`,
                    method: "POST",
                    body: queryArg.expendAloneRequest,
                }),
                invalidatesTags: ["expend-controller"],
            }),
            logout: build.mutation<LogoutApiResponse, LogoutApiArg>({
                query: () => ({ url: `/api/logout`, method: "POST" }),
                invalidatesTags: ["authenticate-controller"],
            })
        })
    })

export type GetAllExpendTypesApiResponse =
/** status 200 OK */ ExpendTypeResponse[];
export type GetAllExpendTypesApiArgs = void;
export type GetAllExpendsApiResponse =
/** status 200 OK */ ExpendResponse[];
export type GetAllExpendsApiArgs = void;
export type AuthorizeApiResponse = /** status 200 OK */ AuthenticationResponse;
export type AuthorizeApiArg = {
    authenticationRequest: AuthenticationRequest;
};
export type RegisterApiResponse =
/** status 200 OK */ RegisterUserResponse;
export type RegisterApiArg = {
    registerUserRequest: RegisterUserRequest;
};
export type ExpendTypeResponse = {
    id : string;
    type : string;
}
export type ExpendResponse = {
    id:number;
    name : string;
    price :string;
    type: ExpendTypeResponse;
}
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
export type ExpendAddApiResponse = ExpendAddResponse;
export type ExpendAddApiArg = {expendRequest : ExpendRequest}

export type ExpendAloneApiResponse = ExpendAloneResponse;
export type ExpendAloneApiArg = {expendAloneRequest : ExpendAloneRequest}
export type ExpendRequest = {
    user_id : number;
    type_id : number;
}
export type ExpendAloneRequest = {
    name : string;
    price : number;
    typeName : string;
    userId? : string;
}
export type ExpendAddResponse = {
    result? : Array<any>;
}
export type ExpendAloneResponse = {
    result? : Array<any>;
}
export type LogoutApiResponse = unknown;
export type LogoutApiArg = void;
export { injectedRtkApi as api };
export const {
    useAuthorizeMutation,
    useExpanseAloneMutation,
    useExpanseAddMutation,
    useRegisterMutation,
    useLogoutMutation,
    useGetProfileQuery,
} = injectedRtkApi;