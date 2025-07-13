/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { StayDurationController } from './../controllers/StayDurationController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ResourceErrorController } from './../controllers/ResourceErrorController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ProjectController } from './../controllers/ProjectController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PerformanceController } from './../controllers/PerformanceController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PageViewController } from './../controllers/PageViewController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { FetchErrorController } from './../controllers/FetchErrorController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ExposureEventController } from './../controllers/ExposureEventController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ErrorLogController } from './../controllers/ErrorLogController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ClickEventController } from './../controllers/ClickEventController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from './../controllers/AuthController';
import { expressAuthentication } from './../utils/auth';
// @ts-ignore - no great way to install types from subpackage
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';

const expressAuthenticationRecasted = expressAuthentication as (req: ExRequest, securityName: string, scopes?: string[], res?: ExResponse) => Promise<any>;


// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "Project": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
            "appId": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "category": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["web"]},{"dataType":"enum","enums":["h5"]},{"dataType":"enum","enums":["miniapp"]},{"dataType":"enum","enums":["backend"]}],"required":true},
            "status": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["active"]},{"dataType":"enum","enums":["inactive"]}],"required":true},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"ErrorLog"},"required":true},
            "user": {"ref":"User","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ErrorLog": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "type": {"dataType":"string","required":true},
            "message": {"dataType":"string","required":true},
            "stack": {"dataType":"string"},
            "lineno": {"dataType":"double"},
            "colno": {"dataType":"double"},
            "userId": {"dataType":"string"},
            "timestamp": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "project": {"ref":"Project","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "User": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "passwordHash": {"dataType":"string"},
            "username": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
            "phone": {"dataType":"string"},
            "email": {"dataType":"string"},
            "lastLoginAt": {"dataType":"datetime"},
            "records": {"dataType":"array","array":{"dataType":"refObject","ref":"Project"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_StayDuration_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"double"},"url":{"dataType":"string"},"duration":{"dataType":"double"},"userId":{"dataType":"string"},"timestamp":{"dataType":"double"},"createdAt":{"dataType":"datetime"},"project":{"ref":"Project"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StayDuration": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "url": {"dataType":"string","required":true},
            "duration": {"dataType":"double","required":true},
            "userId": {"dataType":"string"},
            "timestamp": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "project": {"ref":"Project","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_ResourceError_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"double"},"tagName":{"dataType":"string"},"src":{"dataType":"string"},"userId":{"dataType":"string"},"timestamp":{"dataType":"double"},"createdAt":{"dataType":"datetime"},"project":{"ref":"Project"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResourceError": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "tagName": {"dataType":"string","required":true},
            "src": {"dataType":"string","required":true},
            "userId": {"dataType":"string"},
            "timestamp": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "project": {"ref":"Project","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ServiceResponse_Project-or-null_": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "data": {"dataType":"union","subSchemas":[{"ref":"Project"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_Project_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"double"},"name":{"dataType":"string"},"appId":{"dataType":"string"},"createdAt":{"dataType":"datetime"},"category":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["web"]},{"dataType":"enum","enums":["h5"]},{"dataType":"enum","enums":["miniapp"]},{"dataType":"enum","enums":["backend"]}]},"status":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["active"]},{"dataType":"enum","enums":["inactive"]}]},"errors":{"dataType":"array","array":{"dataType":"refObject","ref":"ErrorLog"}},"user":{"ref":"User"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ServiceResponse__data-Project-Array--total-number--page-number--size-number_-or-null_": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "data": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{"size":{"dataType":"double","required":true},"page":{"dataType":"double","required":true},"total":{"dataType":"double","required":true},"data":{"dataType":"array","array":{"dataType":"refObject","ref":"Project"},"required":true}}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ServiceResponse_null_": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "data": {"dataType":"enum","enums":[null]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Record_string.number_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"double"},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_PerformanceLog_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"double"},"projectId":{"dataType":"double"},"appId":{"dataType":"string"},"url":{"dataType":"string"},"referrer":{"dataType":"string"},"userAgent":{"dataType":"string"},"ip":{"dataType":"string"},"deviceType":{"dataType":"string"},"os":{"dataType":"string"},"browser":{"dataType":"string"},"screen":{"dataType":"string"},"lang":{"dataType":"string"},"metrics":{"ref":"Record_string.number_"},"sessionId":{"dataType":"string"},"timestamp":{"dataType":"datetime"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PerformanceLog": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "projectId": {"dataType":"double","required":true},
            "appId": {"dataType":"string","required":true},
            "url": {"dataType":"string","required":true},
            "referrer": {"dataType":"string"},
            "userAgent": {"dataType":"string","required":true},
            "ip": {"dataType":"string"},
            "deviceType": {"dataType":"string"},
            "os": {"dataType":"string"},
            "browser": {"dataType":"string"},
            "screen": {"dataType":"string"},
            "lang": {"dataType":"string"},
            "metrics": {"ref":"Record_string.number_","required":true},
            "sessionId": {"dataType":"string"},
            "timestamp": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_PageView_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"double"},"url":{"dataType":"string"},"userId":{"dataType":"string"},"timestamp":{"dataType":"double"},"createdAt":{"dataType":"datetime"},"project":{"ref":"Project"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PageView": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "url": {"dataType":"string","required":true},
            "userId": {"dataType":"string"},
            "timestamp": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "project": {"ref":"Project","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_FetchError_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"double"},"url":{"dataType":"string"},"status":{"dataType":"double"},"error":{"dataType":"string"},"duration":{"dataType":"double"},"userId":{"dataType":"string"},"timestamp":{"dataType":"double"},"createdAt":{"dataType":"datetime"},"project":{"ref":"Project"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FetchError": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "url": {"dataType":"string","required":true},
            "status": {"dataType":"double"},
            "error": {"dataType":"string"},
            "duration": {"dataType":"double","required":true},
            "userId": {"dataType":"string"},
            "timestamp": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "project": {"ref":"Project","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_ExposureEvent_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"double"},"selector":{"dataType":"string"},"userId":{"dataType":"string"},"timestamp":{"dataType":"double"},"createdAt":{"dataType":"datetime"},"project":{"ref":"Project"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ExposureEvent": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "selector": {"dataType":"string","required":true},
            "userId": {"dataType":"string"},
            "timestamp": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "project": {"ref":"Project","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_ErrorLog_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"double"},"type":{"dataType":"string"},"message":{"dataType":"string"},"stack":{"dataType":"string"},"lineno":{"dataType":"double"},"colno":{"dataType":"double"},"userId":{"dataType":"string"},"timestamp":{"dataType":"double"},"createdAt":{"dataType":"datetime"},"project":{"ref":"Project"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_ClickEvent_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"double"},"selector":{"dataType":"string"},"tag":{"dataType":"string"},"className":{"dataType":"string"},"extraData":{"dataType":"any"},"userId":{"dataType":"string"},"timestamp":{"dataType":"double"},"createdAt":{"dataType":"datetime"},"project":{"ref":"Project"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ClickEvent": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "selector": {"dataType":"string","required":true},
            "tag": {"dataType":"string","required":true},
            "className": {"dataType":"string","required":true},
            "extraData": {"dataType":"any"},
            "userId": {"dataType":"string"},
            "timestamp": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "project": {"ref":"Project","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ServiceResponse_null-or-_40_User-and-_token-string__41__": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "data": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":[null]},{"dataType":"intersection","subSchemas":[{"ref":"User"},{"dataType":"nestedObjectLiteral","nestedProperties":{"token":{"dataType":"string","required":true}}}]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsStayDurationController_report: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"Partial_StayDuration_"},
        };
        app.post('/report/stay',
            ...(fetchMiddlewares<RequestHandler>(StayDurationController)),
            ...(fetchMiddlewares<RequestHandler>(StayDurationController.prototype.report)),

            async function StayDurationController_report(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsStayDurationController_report, request, response });

                const controller = new StayDurationController();

              await templateService.apiHandler({
                methodName: 'report',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsStayDurationController_getByProject: Record<string, TsoaRoute.ParameterSchema> = {
                projectId: {"in":"query","name":"projectId","required":true,"dataType":"double"},
        };
        app.get('/report/stay',
            ...(fetchMiddlewares<RequestHandler>(StayDurationController)),
            ...(fetchMiddlewares<RequestHandler>(StayDurationController.prototype.getByProject)),

            async function StayDurationController_getByProject(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsStayDurationController_getByProject, request, response });

                const controller = new StayDurationController();

              await templateService.apiHandler({
                methodName: 'getByProject',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsResourceErrorController_report: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"Partial_ResourceError_"},
        };
        app.post('/report/resource-error',
            ...(fetchMiddlewares<RequestHandler>(ResourceErrorController)),
            ...(fetchMiddlewares<RequestHandler>(ResourceErrorController.prototype.report)),

            async function ResourceErrorController_report(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsResourceErrorController_report, request, response });

                const controller = new ResourceErrorController();

              await templateService.apiHandler({
                methodName: 'report',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsResourceErrorController_getByProject: Record<string, TsoaRoute.ParameterSchema> = {
                projectId: {"in":"query","name":"projectId","required":true,"dataType":"double"},
        };
        app.get('/report/resource-error',
            ...(fetchMiddlewares<RequestHandler>(ResourceErrorController)),
            ...(fetchMiddlewares<RequestHandler>(ResourceErrorController.prototype.getByProject)),

            async function ResourceErrorController_getByProject(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsResourceErrorController_getByProject, request, response });

                const controller = new ResourceErrorController();

              await templateService.apiHandler({
                methodName: 'getByProject',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProjectController_create: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                body: {"in":"body","name":"body","required":true,"ref":"Partial_Project_"},
        };
        app.post('/projects',
            ...(fetchMiddlewares<RequestHandler>(ProjectController)),
            ...(fetchMiddlewares<RequestHandler>(ProjectController.prototype.create)),

            async function ProjectController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProjectController_create, request, response });

                const controller = new ProjectController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProjectController_getAllByUser: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                page: {"default":1,"in":"query","name":"page","dataType":"double"},
                size: {"default":10,"in":"query","name":"size","dataType":"double"},
        };
        app.get('/projects/list',
            ...(fetchMiddlewares<RequestHandler>(ProjectController)),
            ...(fetchMiddlewares<RequestHandler>(ProjectController.prototype.getAllByUser)),

            async function ProjectController_getAllByUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProjectController_getAllByUser, request, response });

                const controller = new ProjectController();

              await templateService.apiHandler({
                methodName: 'getAllByUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProjectController_getById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"query","name":"id","required":true,"dataType":"double"},
        };
        app.get('/projects/by-id',
            ...(fetchMiddlewares<RequestHandler>(ProjectController)),
            ...(fetchMiddlewares<RequestHandler>(ProjectController.prototype.getById)),

            async function ProjectController_getById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProjectController_getById, request, response });

                const controller = new ProjectController();

              await templateService.apiHandler({
                methodName: 'getById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProjectController_getByAppId: Record<string, TsoaRoute.ParameterSchema> = {
                appId: {"in":"query","name":"appId","required":true,"dataType":"string"},
        };
        app.get('/projects/by-appId',
            ...(fetchMiddlewares<RequestHandler>(ProjectController)),
            ...(fetchMiddlewares<RequestHandler>(ProjectController.prototype.getByAppId)),

            async function ProjectController_getByAppId(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProjectController_getByAppId, request, response });

                const controller = new ProjectController();

              await templateService.apiHandler({
                methodName: 'getByAppId',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProjectController_updateStatus: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"status":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["active"]},{"dataType":"enum","enums":["inactive"]}],"required":true}}},
        };
        app.patch('/projects/:id/status',
            ...(fetchMiddlewares<RequestHandler>(ProjectController)),
            ...(fetchMiddlewares<RequestHandler>(ProjectController.prototype.updateStatus)),

            async function ProjectController_updateStatus(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProjectController_updateStatus, request, response });

                const controller = new ProjectController();

              await templateService.apiHandler({
                methodName: 'updateStatus',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProjectController_deleteProject: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.delete('/projects/:id',
            ...(fetchMiddlewares<RequestHandler>(ProjectController)),
            ...(fetchMiddlewares<RequestHandler>(ProjectController.prototype.deleteProject)),

            async function ProjectController_deleteProject(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProjectController_deleteProject, request, response });

                const controller = new ProjectController();

              await templateService.apiHandler({
                methodName: 'deleteProject',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPerformanceController_report: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"Partial_PerformanceLog_"},
        };
        app.post('/report/performance',
            ...(fetchMiddlewares<RequestHandler>(PerformanceController)),
            ...(fetchMiddlewares<RequestHandler>(PerformanceController.prototype.report)),

            async function PerformanceController_report(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPerformanceController_report, request, response });

                const controller = new PerformanceController();

              await templateService.apiHandler({
                methodName: 'report',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPerformanceController_getRecent: Record<string, TsoaRoute.ParameterSchema> = {
                appId: {"in":"query","name":"appId","required":true,"dataType":"string"},
                limit: {"default":50,"in":"query","name":"limit","dataType":"double"},
        };
        app.get('/report/performance',
            ...(fetchMiddlewares<RequestHandler>(PerformanceController)),
            ...(fetchMiddlewares<RequestHandler>(PerformanceController.prototype.getRecent)),

            async function PerformanceController_getRecent(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPerformanceController_getRecent, request, response });

                const controller = new PerformanceController();

              await templateService.apiHandler({
                methodName: 'getRecent',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPageViewController_report: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"Partial_PageView_"},
        };
        app.post('/report/page-view',
            ...(fetchMiddlewares<RequestHandler>(PageViewController)),
            ...(fetchMiddlewares<RequestHandler>(PageViewController.prototype.report)),

            async function PageViewController_report(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPageViewController_report, request, response });

                const controller = new PageViewController();

              await templateService.apiHandler({
                methodName: 'report',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPageViewController_getByProject: Record<string, TsoaRoute.ParameterSchema> = {
                projectId: {"in":"query","name":"projectId","required":true,"dataType":"double"},
        };
        app.get('/report/page-view',
            ...(fetchMiddlewares<RequestHandler>(PageViewController)),
            ...(fetchMiddlewares<RequestHandler>(PageViewController.prototype.getByProject)),

            async function PageViewController_getByProject(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPageViewController_getByProject, request, response });

                const controller = new PageViewController();

              await templateService.apiHandler({
                methodName: 'getByProject',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsFetchErrorController_report: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"Partial_FetchError_"},
        };
        app.post('/report/fetch-error',
            ...(fetchMiddlewares<RequestHandler>(FetchErrorController)),
            ...(fetchMiddlewares<RequestHandler>(FetchErrorController.prototype.report)),

            async function FetchErrorController_report(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsFetchErrorController_report, request, response });

                const controller = new FetchErrorController();

              await templateService.apiHandler({
                methodName: 'report',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsFetchErrorController_getByProject: Record<string, TsoaRoute.ParameterSchema> = {
                projectId: {"in":"query","name":"projectId","required":true,"dataType":"double"},
        };
        app.get('/report/fetch-error',
            ...(fetchMiddlewares<RequestHandler>(FetchErrorController)),
            ...(fetchMiddlewares<RequestHandler>(FetchErrorController.prototype.getByProject)),

            async function FetchErrorController_getByProject(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsFetchErrorController_getByProject, request, response });

                const controller = new FetchErrorController();

              await templateService.apiHandler({
                methodName: 'getByProject',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsExposureEventController_report: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"Partial_ExposureEvent_"},
        };
        app.post('/report/exposure',
            ...(fetchMiddlewares<RequestHandler>(ExposureEventController)),
            ...(fetchMiddlewares<RequestHandler>(ExposureEventController.prototype.report)),

            async function ExposureEventController_report(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsExposureEventController_report, request, response });

                const controller = new ExposureEventController();

              await templateService.apiHandler({
                methodName: 'report',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsExposureEventController_getByProject: Record<string, TsoaRoute.ParameterSchema> = {
                projectId: {"in":"query","name":"projectId","required":true,"dataType":"double"},
        };
        app.get('/report/exposure',
            ...(fetchMiddlewares<RequestHandler>(ExposureEventController)),
            ...(fetchMiddlewares<RequestHandler>(ExposureEventController.prototype.getByProject)),

            async function ExposureEventController_getByProject(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsExposureEventController_getByProject, request, response });

                const controller = new ExposureEventController();

              await templateService.apiHandler({
                methodName: 'getByProject',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsErrorLogController_report: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"Partial_ErrorLog_"},
        };
        app.post('/report/errors',
            ...(fetchMiddlewares<RequestHandler>(ErrorLogController)),
            ...(fetchMiddlewares<RequestHandler>(ErrorLogController.prototype.report)),

            async function ErrorLogController_report(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsErrorLogController_report, request, response });

                const controller = new ErrorLogController();

              await templateService.apiHandler({
                methodName: 'report',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsErrorLogController_getRecent: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"query","name":"id","required":true,"dataType":"double"},
                limit: {"default":50,"in":"query","name":"limit","dataType":"double"},
        };
        app.get('/report/errors',
            ...(fetchMiddlewares<RequestHandler>(ErrorLogController)),
            ...(fetchMiddlewares<RequestHandler>(ErrorLogController.prototype.getRecent)),

            async function ErrorLogController_getRecent(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsErrorLogController_getRecent, request, response });

                const controller = new ErrorLogController();

              await templateService.apiHandler({
                methodName: 'getRecent',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsClickEventController_report: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"Partial_ClickEvent_"},
        };
        app.post('/report/click',
            ...(fetchMiddlewares<RequestHandler>(ClickEventController)),
            ...(fetchMiddlewares<RequestHandler>(ClickEventController.prototype.report)),

            async function ClickEventController_report(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsClickEventController_report, request, response });

                const controller = new ClickEventController();

              await templateService.apiHandler({
                methodName: 'report',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsClickEventController_getByProject: Record<string, TsoaRoute.ParameterSchema> = {
                projectId: {"in":"query","name":"projectId","required":true,"dataType":"double"},
        };
        app.get('/report/click',
            ...(fetchMiddlewares<RequestHandler>(ClickEventController)),
            ...(fetchMiddlewares<RequestHandler>(ClickEventController.prototype.getByProject)),

            async function ClickEventController_getByProject(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsClickEventController_getByProject, request, response });

                const controller = new ClickEventController();

              await templateService.apiHandler({
                methodName: 'getByProject',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthController_loginByPassword: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"email":{"dataType":"string"},"username":{"dataType":"string"},"password":{"dataType":"string","required":true}}},
        };
        app.post('/auth/login-by-password',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.loginByPassword)),

            async function AuthController_loginByPassword(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_loginByPassword, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'loginByPassword',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthController_register: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"username":{"dataType":"string","required":true},"email":{"dataType":"string","required":true},"password":{"dataType":"string","required":true}}},
        };
        app.post('/auth/register',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.register)),

            async function AuthController_register(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_register, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'register',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
