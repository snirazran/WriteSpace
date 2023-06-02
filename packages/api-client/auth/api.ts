/* tslint:disable */
/* eslint-disable */
/**
 * Auth Service
 * Auth Service api documentation
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
 * @type AuthControllerUpdateUserIdParameter
 * @export
 */
export type AuthControllerUpdateUserIdParameter = number | string;

/**
 * 
 * @export
 * @interface CreateUserDto
 */
export interface CreateUserDto {
    /**
     * User name
     * @type {string}
     * @memberof CreateUserDto
     */
    'username': string;
    /**
     * Email
     * @type {string}
     * @memberof CreateUserDto
     */
    'email': string;
    /**
     * User password
     * @type {string}
     * @memberof CreateUserDto
     */
    'password': string;
    /**
     * User img
     * @type {string}
     * @memberof CreateUserDto
     */
    'img': string | null;
}
/**
 * 
 * @export
 * @interface CreateUserResponseDto
 */
export interface CreateUserResponseDto {
    /**
     * User id
     * @type {string}
     * @memberof CreateUserResponseDto
     */
    '_id': string;
    /**
     * User name
     * @type {string}
     * @memberof CreateUserResponseDto
     */
    'username': string;
    /**
     * User password
     * @type {string}
     * @memberof CreateUserResponseDto
     */
    'password': string;
    /**
     * Email
     * @type {string}
     * @memberof CreateUserResponseDto
     */
    'email': string;
    /**
     * Friends list
     * @type {Array<string>}
     * @memberof CreateUserResponseDto
     */
    'friends': Array<string>;
    /**
     * User bio
     * @type {string}
     * @memberof CreateUserResponseDto
     */
    'bio': string;
    /**
     * User img
     * @type {string}
     * @memberof CreateUserResponseDto
     */
    'img': string;
    /**
     * User token
     * @type {string}
     * @memberof CreateUserResponseDto
     */
    'token': string;
}
/**
 * 
 * @export
 * @interface LoginUserReqDto
 */
export interface LoginUserReqDto {
    /**
     * Email
     * @type {string}
     * @memberof LoginUserReqDto
     */
    'email': string;
    /**
     * User password
     * @type {string}
     * @memberof LoginUserReqDto
     */
    'password': string;
}
/**
 * 
 * @export
 * @interface LoginUserResDto
 */
export interface LoginUserResDto {
    /**
     * User id
     * @type {string}
     * @memberof LoginUserResDto
     */
    '_id': string;
    /**
     * User name
     * @type {string}
     * @memberof LoginUserResDto
     */
    'username': string;
    /**
     * User password
     * @type {string}
     * @memberof LoginUserResDto
     */
    'password': string;
    /**
     * Email
     * @type {string}
     * @memberof LoginUserResDto
     */
    'email': string;
    /**
     * Friends list
     * @type {Array<string>}
     * @memberof LoginUserResDto
     */
    'friends': Array<string>;
    /**
     * User bio
     * @type {string}
     * @memberof LoginUserResDto
     */
    'bio': string;
    /**
     * User img
     * @type {string}
     * @memberof LoginUserResDto
     */
    'img': string;
    /**
     * User token
     * @type {string}
     * @memberof LoginUserResDto
     */
    'token': string;
}
/**
 * 
 * @export
 * @interface UpdateUserReqDto
 */
export interface UpdateUserReqDto {
    /**
     * User name
     * @type {string}
     * @memberof UpdateUserReqDto
     */
    'username': string;
    /**
     * Email
     * @type {string}
     * @memberof UpdateUserReqDto
     */
    'email': string;
    /**
     * User bio
     * @type {string}
     * @memberof UpdateUserReqDto
     */
    'bio': string;
    /**
     * User img
     * @type {string}
     * @memberof UpdateUserReqDto
     */
    'img': string | null;
}
/**
 * 
 * @export
 * @interface UpdateUserResDto
 */
export interface UpdateUserResDto {
    /**
     * User name
     * @type {string}
     * @memberof UpdateUserResDto
     */
    'username': string;
    /**
     * Email
     * @type {string}
     * @memberof UpdateUserResDto
     */
    'email': string;
    /**
     * Friends list
     * @type {Array<string>}
     * @memberof UpdateUserResDto
     */
    'friends': Array<string>;
    /**
     * User bio
     * @type {string}
     * @memberof UpdateUserResDto
     */
    'bio': string;
    /**
     * User img
     * @type {string}
     * @memberof UpdateUserResDto
     */
    'img': string;
    /**
     * User token
     * @type {string}
     * @memberof UpdateUserResDto
     */
    'token': string;
}

/**
 * AuthApi - axios parameter creator
 * @export
 */
export const AuthApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {LoginUserReqDto} loginUserReqDto 
         * @param {string} [authAPI] Auth related endpoints
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authControllerLoginUser: async (loginUserReqDto: LoginUserReqDto, authAPI?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'loginUserReqDto' is not null or undefined
            assertParamExists('authControllerLoginUser', 'loginUserReqDto', loginUserReqDto)
            const localVarPath = `/api/auth/login`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (authAPI != null) {
                localVarHeaderParameter['Auth-API'] = String(authAPI);
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(loginUserReqDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {CreateUserDto} createUserDto 
         * @param {string} [authAPI] Auth related endpoints
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authControllerRegisterUser: async (createUserDto: CreateUserDto, authAPI?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'createUserDto' is not null or undefined
            assertParamExists('authControllerRegisterUser', 'createUserDto', createUserDto)
            const localVarPath = `/api/auth`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (authAPI != null) {
                localVarHeaderParameter['Auth-API'] = String(authAPI);
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(createUserDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {AuthControllerUpdateUserIdParameter} id string for the user id
         * @param {UpdateUserReqDto} updateUserReqDto 
         * @param {string} [authAPI] Auth related endpoints
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authControllerUpdateUser: async (id: AuthControllerUpdateUserIdParameter, updateUserReqDto: UpdateUserReqDto, authAPI?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('authControllerUpdateUser', 'id', id)
            // verify required parameter 'updateUserReqDto' is not null or undefined
            assertParamExists('authControllerUpdateUser', 'updateUserReqDto', updateUserReqDto)
            const localVarPath = `/api/auth/updateUser/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (authAPI != null) {
                localVarHeaderParameter['Auth-API'] = String(authAPI);
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(updateUserReqDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * AuthApi - functional programming interface
 * @export
 */
export const AuthApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = AuthApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {LoginUserReqDto} loginUserReqDto 
         * @param {string} [authAPI] Auth related endpoints
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async authControllerLoginUser(loginUserReqDto: LoginUserReqDto, authAPI?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LoginUserResDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.authControllerLoginUser(loginUserReqDto, authAPI, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {CreateUserDto} createUserDto 
         * @param {string} [authAPI] Auth related endpoints
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async authControllerRegisterUser(createUserDto: CreateUserDto, authAPI?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CreateUserResponseDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.authControllerRegisterUser(createUserDto, authAPI, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {AuthControllerUpdateUserIdParameter} id string for the user id
         * @param {UpdateUserReqDto} updateUserReqDto 
         * @param {string} [authAPI] Auth related endpoints
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async authControllerUpdateUser(id: AuthControllerUpdateUserIdParameter, updateUserReqDto: UpdateUserReqDto, authAPI?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UpdateUserResDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.authControllerUpdateUser(id, updateUserReqDto, authAPI, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * AuthApi - factory interface
 * @export
 */
export const AuthApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = AuthApiFp(configuration)
    return {
        /**
         * 
         * @param {LoginUserReqDto} loginUserReqDto 
         * @param {string} [authAPI] Auth related endpoints
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authControllerLoginUser(loginUserReqDto: LoginUserReqDto, authAPI?: string, options?: any): AxiosPromise<LoginUserResDto> {
            return localVarFp.authControllerLoginUser(loginUserReqDto, authAPI, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {CreateUserDto} createUserDto 
         * @param {string} [authAPI] Auth related endpoints
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authControllerRegisterUser(createUserDto: CreateUserDto, authAPI?: string, options?: any): AxiosPromise<CreateUserResponseDto> {
            return localVarFp.authControllerRegisterUser(createUserDto, authAPI, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {AuthControllerUpdateUserIdParameter} id string for the user id
         * @param {UpdateUserReqDto} updateUserReqDto 
         * @param {string} [authAPI] Auth related endpoints
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authControllerUpdateUser(id: AuthControllerUpdateUserIdParameter, updateUserReqDto: UpdateUserReqDto, authAPI?: string, options?: any): AxiosPromise<UpdateUserResDto> {
            return localVarFp.authControllerUpdateUser(id, updateUserReqDto, authAPI, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * AuthApi - object-oriented interface
 * @export
 * @class AuthApi
 * @extends {BaseAPI}
 */
export class AuthApi extends BaseAPI {
    /**
     * 
     * @param {LoginUserReqDto} loginUserReqDto 
     * @param {string} [authAPI] Auth related endpoints
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public authControllerLoginUser(loginUserReqDto: LoginUserReqDto, authAPI?: string, options?: AxiosRequestConfig) {
        return AuthApiFp(this.configuration).authControllerLoginUser(loginUserReqDto, authAPI, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {CreateUserDto} createUserDto 
     * @param {string} [authAPI] Auth related endpoints
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public authControllerRegisterUser(createUserDto: CreateUserDto, authAPI?: string, options?: AxiosRequestConfig) {
        return AuthApiFp(this.configuration).authControllerRegisterUser(createUserDto, authAPI, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {AuthControllerUpdateUserIdParameter} id string for the user id
     * @param {UpdateUserReqDto} updateUserReqDto 
     * @param {string} [authAPI] Auth related endpoints
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public authControllerUpdateUser(id: AuthControllerUpdateUserIdParameter, updateUserReqDto: UpdateUserReqDto, authAPI?: string, options?: AxiosRequestConfig) {
        return AuthApiFp(this.configuration).authControllerUpdateUser(id, updateUserReqDto, authAPI, options).then((request) => request(this.axios, this.basePath));
    }
}


