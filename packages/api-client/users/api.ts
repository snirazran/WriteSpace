/* tslint:disable */
/* eslint-disable */
/**
 * User Service
 * User Service api documentation
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface GetAllUsersDTO
 */
export interface GetAllUsersDTO {
    /**
     * Users
     * @type {Array<UserResponseDTO>}
     * @memberof GetAllUsersDTO
     */
    'users': Array<UserResponseDTO>;
}
/**
 * 
 * @export
 * @interface GetAllUsersFriendsDTO
 */
export interface GetAllUsersFriendsDTO {
    /**
     * User friends
     * @type {Array<UserResponseDTO>}
     * @memberof GetAllUsersFriendsDTO
     */
    'userFriends': Array<UserResponseDTO>;
}
/**
 * 
 * @export
 * @interface GetUserByIdDTO
 */
export interface GetUserByIdDTO {
    /**
     * User id
     * @type {string}
     * @memberof GetUserByIdDTO
     */
    '_id': string;
    /**
     * User name
     * @type {string}
     * @memberof GetUserByIdDTO
     */
    'username': string;
    /**
     * Email
     * @type {string}
     * @memberof GetUserByIdDTO
     */
    'email': string;
    /**
     * Friends list
     * @type {Array<UserResponseDTO>}
     * @memberof GetUserByIdDTO
     */
    'friends': Array<UserResponseDTO>;
    /**
     * User bio
     * @type {string}
     * @memberof GetUserByIdDTO
     */
    'bio': string;
    /**
     * User img
     * @type {string}
     * @memberof GetUserByIdDTO
     */
    'img': string;
}
/**
 * 
 * @export
 * @interface GetUserLikesDTO
 */
export interface GetUserLikesDTO {
    /**
     * User likes
     * @type {number}
     * @memberof GetUserLikesDTO
     */
    'totalLikes': number;
}
/**
 * @type UserControllerGetUserByIdIdParameter
 * @export
 */
export type UserControllerGetUserByIdIdParameter = number | string;

/**
 * 
 * @export
 * @interface UserDTO
 */
export interface UserDTO {
    /**
     * User id
     * @type {string}
     * @memberof UserDTO
     */
    '_id': string;
    /**
     * User name
     * @type {string}
     * @memberof UserDTO
     */
    'username': string;
    /**
     * User Password
     * @type {string}
     * @memberof UserDTO
     */
    'password': string;
    /**
     * Email
     * @type {string}
     * @memberof UserDTO
     */
    'email': string;
    /**
     * Friends list
     * @type {Array<string>}
     * @memberof UserDTO
     */
    'friends': Array<string>;
    /**
     * User bio
     * @type {string}
     * @memberof UserDTO
     */
    'bio': string;
    /**
     * User img
     * @type {string}
     * @memberof UserDTO
     */
    'img': string;
}
/**
 * 
 * @export
 * @interface UserResponseDTO
 */
export interface UserResponseDTO {
    /**
     * User id
     * @type {string}
     * @memberof UserResponseDTO
     */
    '_id': string;
    /**
     * User name
     * @type {string}
     * @memberof UserResponseDTO
     */
    'username': string;
    /**
     * Email
     * @type {string}
     * @memberof UserResponseDTO
     */
    'email': string;
    /**
     * Friends list
     * @type {Array<UserResponseDTO>}
     * @memberof UserResponseDTO
     */
    'friends': Array<UserResponseDTO>;
    /**
     * User bio
     * @type {string}
     * @memberof UserResponseDTO
     */
    'bio': string;
    /**
     * User img
     * @type {string}
     * @memberof UserResponseDTO
     */
    'img': string;
}

/**
 * FriendsApi - axios parameter creator
 * @export
 */
export const FriendsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {UserControllerGetUserByIdIdParameter} friendId string for the friend id
         * @param {UserControllerGetUserByIdIdParameter} id string for the user id
         * @param {string} [friendsAPI] Friends related endpoints
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        friendControllerAddRemoveFriend: async (friendId: UserControllerGetUserByIdIdParameter, id: UserControllerGetUserByIdIdParameter, friendsAPI?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'friendId' is not null or undefined
            assertParamExists('friendControllerAddRemoveFriend', 'friendId', friendId)
            // verify required parameter 'id' is not null or undefined
            assertParamExists('friendControllerAddRemoveFriend', 'id', id)
            const localVarPath = `/api/friends/{id}/{friendId}`
                .replace(`{${"friendId"}}`, encodeURIComponent(String(friendId)))
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (friendsAPI != null) {
                localVarHeaderParameter['Friends-API'] = String(friendsAPI);
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {UserControllerGetUserByIdIdParameter} id string for the user id
         * @param {string} [friendsAPI] Friends related endpoints
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        friendControllerGetUserFriends: async (id: UserControllerGetUserByIdIdParameter, friendsAPI?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('friendControllerGetUserFriends', 'id', id)
            const localVarPath = `/api/friends/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (friendsAPI != null) {
                localVarHeaderParameter['Friends-API'] = String(friendsAPI);
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * FriendsApi - functional programming interface
 * @export
 */
export const FriendsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = FriendsApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {UserControllerGetUserByIdIdParameter} friendId string for the friend id
         * @param {UserControllerGetUserByIdIdParameter} id string for the user id
         * @param {string} [friendsAPI] Friends related endpoints
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async friendControllerAddRemoveFriend(friendId: UserControllerGetUserByIdIdParameter, id: UserControllerGetUserByIdIdParameter, friendsAPI?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserDTO>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.friendControllerAddRemoveFriend(friendId, id, friendsAPI, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {UserControllerGetUserByIdIdParameter} id string for the user id
         * @param {string} [friendsAPI] Friends related endpoints
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async friendControllerGetUserFriends(id: UserControllerGetUserByIdIdParameter, friendsAPI?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GetAllUsersFriendsDTO>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.friendControllerGetUserFriends(id, friendsAPI, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * FriendsApi - factory interface
 * @export
 */
export const FriendsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = FriendsApiFp(configuration)
    return {
        /**
         * 
         * @param {UserControllerGetUserByIdIdParameter} friendId string for the friend id
         * @param {UserControllerGetUserByIdIdParameter} id string for the user id
         * @param {string} [friendsAPI] Friends related endpoints
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        friendControllerAddRemoveFriend(friendId: UserControllerGetUserByIdIdParameter, id: UserControllerGetUserByIdIdParameter, friendsAPI?: string, options?: any): AxiosPromise<UserDTO> {
            return localVarFp.friendControllerAddRemoveFriend(friendId, id, friendsAPI, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {UserControllerGetUserByIdIdParameter} id string for the user id
         * @param {string} [friendsAPI] Friends related endpoints
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        friendControllerGetUserFriends(id: UserControllerGetUserByIdIdParameter, friendsAPI?: string, options?: any): AxiosPromise<GetAllUsersFriendsDTO> {
            return localVarFp.friendControllerGetUserFriends(id, friendsAPI, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * FriendsApi - object-oriented interface
 * @export
 * @class FriendsApi
 * @extends {BaseAPI}
 */
export class FriendsApi extends BaseAPI {
    /**
     * 
     * @param {UserControllerGetUserByIdIdParameter} friendId string for the friend id
     * @param {UserControllerGetUserByIdIdParameter} id string for the user id
     * @param {string} [friendsAPI] Friends related endpoints
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FriendsApi
     */
    public friendControllerAddRemoveFriend(friendId: UserControllerGetUserByIdIdParameter, id: UserControllerGetUserByIdIdParameter, friendsAPI?: string, options?: AxiosRequestConfig) {
        return FriendsApiFp(this.configuration).friendControllerAddRemoveFriend(friendId, id, friendsAPI, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {UserControllerGetUserByIdIdParameter} id string for the user id
     * @param {string} [friendsAPI] Friends related endpoints
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FriendsApi
     */
    public friendControllerGetUserFriends(id: UserControllerGetUserByIdIdParameter, friendsAPI?: string, options?: AxiosRequestConfig) {
        return FriendsApiFp(this.configuration).friendControllerGetUserFriends(id, friendsAPI, options).then((request) => request(this.axios, this.basePath));
    }
}


/**
 * UsersApi - axios parameter creator
 * @export
 */
export const UsersApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} [usersAPI] User related endpoints
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userControllerGetAllUsers: async (usersAPI?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/users`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (usersAPI != null) {
                localVarHeaderParameter['Users-API'] = String(usersAPI);
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {UserControllerGetUserByIdIdParameter} id string for the user id
         * @param {string} [usersAPI] User related endpoints
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userControllerGetUserById: async (id: UserControllerGetUserByIdIdParameter, usersAPI?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('userControllerGetUserById', 'id', id)
            const localVarPath = `/api/users/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (usersAPI != null) {
                localVarHeaderParameter['Users-API'] = String(usersAPI);
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {UserControllerGetUserByIdIdParameter} id string for the user id
         * @param {string} [usersAPI] User related endpoints
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userControllerGetUserLikes: async (id: UserControllerGetUserByIdIdParameter, usersAPI?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('userControllerGetUserLikes', 'id', id)
            const localVarPath = `/api/users/likes/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (usersAPI != null) {
                localVarHeaderParameter['Users-API'] = String(usersAPI);
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * UsersApi - functional programming interface
 * @export
 */
export const UsersApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = UsersApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {string} [usersAPI] User related endpoints
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userControllerGetAllUsers(usersAPI?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GetAllUsersDTO>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.userControllerGetAllUsers(usersAPI, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {UserControllerGetUserByIdIdParameter} id string for the user id
         * @param {string} [usersAPI] User related endpoints
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userControllerGetUserById(id: UserControllerGetUserByIdIdParameter, usersAPI?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GetUserByIdDTO>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.userControllerGetUserById(id, usersAPI, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {UserControllerGetUserByIdIdParameter} id string for the user id
         * @param {string} [usersAPI] User related endpoints
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userControllerGetUserLikes(id: UserControllerGetUserByIdIdParameter, usersAPI?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GetUserLikesDTO>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.userControllerGetUserLikes(id, usersAPI, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * UsersApi - factory interface
 * @export
 */
export const UsersApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = UsersApiFp(configuration)
    return {
        /**
         * 
         * @param {string} [usersAPI] User related endpoints
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userControllerGetAllUsers(usersAPI?: string, options?: any): AxiosPromise<GetAllUsersDTO> {
            return localVarFp.userControllerGetAllUsers(usersAPI, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {UserControllerGetUserByIdIdParameter} id string for the user id
         * @param {string} [usersAPI] User related endpoints
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userControllerGetUserById(id: UserControllerGetUserByIdIdParameter, usersAPI?: string, options?: any): AxiosPromise<GetUserByIdDTO> {
            return localVarFp.userControllerGetUserById(id, usersAPI, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {UserControllerGetUserByIdIdParameter} id string for the user id
         * @param {string} [usersAPI] User related endpoints
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userControllerGetUserLikes(id: UserControllerGetUserByIdIdParameter, usersAPI?: string, options?: any): AxiosPromise<GetUserLikesDTO> {
            return localVarFp.userControllerGetUserLikes(id, usersAPI, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * UsersApi - object-oriented interface
 * @export
 * @class UsersApi
 * @extends {BaseAPI}
 */
export class UsersApi extends BaseAPI {
    /**
     * 
     * @param {string} [usersAPI] User related endpoints
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public userControllerGetAllUsers(usersAPI?: string, options?: AxiosRequestConfig) {
        return UsersApiFp(this.configuration).userControllerGetAllUsers(usersAPI, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {UserControllerGetUserByIdIdParameter} id string for the user id
     * @param {string} [usersAPI] User related endpoints
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public userControllerGetUserById(id: UserControllerGetUserByIdIdParameter, usersAPI?: string, options?: AxiosRequestConfig) {
        return UsersApiFp(this.configuration).userControllerGetUserById(id, usersAPI, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {UserControllerGetUserByIdIdParameter} id string for the user id
     * @param {string} [usersAPI] User related endpoints
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public userControllerGetUserLikes(id: UserControllerGetUserByIdIdParameter, usersAPI?: string, options?: AxiosRequestConfig) {
        return UsersApiFp(this.configuration).userControllerGetUserLikes(id, usersAPI, options).then((request) => request(this.axios, this.basePath));
    }
}


