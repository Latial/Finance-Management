import { emptySplitApi as api } from "./emptyApi";

export const addTagTypes = [
    "authenticate-controller",
    "profile-controller",
    "expendTypes-controller",
    "expend-controller",
    "history-controller",
    "stats-controller"
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
            getWholeHistory : build.query<
                GetWholeHistoryApiResponse,
                GetWholeHistoryApiArgs
            >({
                query: () => ({ url: `/api/history`}),
                providesTags: ["history-controller"],
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
            expanseRemove: build.mutation<ExpendRemoveApiResponse, ExpendRemoveApiArg>({
                query: (queryArg) => ({
                    url: `/api/profile/remove`,
                    method: "DELETE",
                    body: queryArg.expendRemoveRequest,
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
            history : build.mutation<HistoryApiResponse, HistoryApiArg>({
                query: (queryArg) => ({
                    url: `/api/history/addHistoryDate`,
                    method: "POST",
                    body: queryArg.historyRequest,
                }),
                invalidatesTags: ["history-controller"],
            }),
            stats : build.mutation<StatsApiResponse, StatsApiArg>({
                query: (queryArg) => ({
                    url: `/api/stats/addStat`,
                    method: "POST",
                    body: queryArg.statsRequest,
                }),
                invalidatesTags: ["stats-controller"],
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
export type GetWholeHistoryApiResponse =
/** status 200 OK */ HistoryResponseAll[];
export type GetAllExpendsApiArgs = void;
export type GetWholeHistoryApiArgs = void;
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
    date : Date;
}
export type HistoryResponseAll = {
    id:number;
    date : Date;
    expendName : string;
    expendPrice :string;
    type: ExpendTypeResponse;
    status : string;
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
export type ExpendRemoveApiResponse = ExpendRemoveResponse;
export type ExpendAddApiArg = {expendRequest : ExpendRequest}
export type ExpendRemoveApiArg = {expendRemoveRequest : ExpendRemoveRequest}
export type ExpendAloneApiResponse = ExpendAloneResponse;
export type HistoryApiResponse = HistoryResponse;
export type StatsApiResponse = StatisticsResponse;
export type ExpendAloneApiArg = {expendAloneRequest : ExpendAloneRequest}
export type HistoryApiArg = {historyRequest : HistoryRequest}
export type StatsApiArg = {statsRequest : StatsRequest}
export type ExpendRequest = {
    user_id : number;
    type_id : number;
}
export type ExpendRemoveRequest = {
    expend_id : number;
    user_id : string;
}
export type ExpendAloneRequest = {
    name : string;
    price : number;
    typeName : string;
    userId? : string;
}
export type HistoryRequest = {
    date : Date;
    name : string;
    price : number;
    typeName : string;
    userId? : string;
    status : string;
}
export type StatsRequest = {
    userId? : string;
    month? : string;
    year ? : string;
}
export type ExpendAddResponse = {
    result? : Array<any>;
}
export type ExpendRemoveResponse = {
    result? : ""
}
export type ExpendAloneResponse = {
    result? : Array<any>;
}
export type HistoryResponse = {
    id: number;
    date : Date;
    expendName : string;
    expendPrice : string;
    type : ExpendTypeResponse;
    status : string
}
export type StatisticsResponse = {
    biggestExpend :number
    smallestExpend : number
    monthlyExpend : number
    fixedCostsCount : number
    bigPurchasesCount : number
    flexibleCostsCount : number
    fixedCostsCountMonth : number
    flexibleCostsCountMonth : number
    bigPurchasesCountMonth : number
    smallestMonthlyPurchase : number
}
export type PageHistoryResponse = {
    totalPages?: number;
    totalElements?: number;
    size?: number;
    content?: HistoryResponse[];
    number?: number;
    sort?: SortObject;
    first?: boolean;
    last?: boolean;
    numberOfElements?: number;
    pageable?: PageableObject;
    empty?: boolean;
};
export type SortObject = {
    empty?: boolean;
    sorted?: boolean;
    unsorted?: boolean;
};
export type PageableObject = {
    offset?: number;
    sort?: SortObject;
    pageNumber?: number;
    pageSize?: number;
    paged?: boolean;
    unpaged?: boolean;
};
export type LogoutApiResponse = unknown;
export type LogoutApiArg = void;
export { injectedRtkApi as api };
export const {
    useAuthorizeMutation,
    useExpanseAloneMutation,
    useExpanseRemoveMutation,
    useHistoryMutation,
    useStatsMutation,
    useExpanseAddMutation,
    useRegisterMutation,
    useLogoutMutation,
    useGetProfileQuery,
} = injectedRtkApi;