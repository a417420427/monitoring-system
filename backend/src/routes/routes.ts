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
import { JsErrorController } from './../controllers/JsErrorLogController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { FetchErrorController } from './../controllers/FetchErrorController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ExposureEventController } from './../controllers/ExposureEventController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ClickEventController } from './../controllers/ClickEventController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from './../controllers/AuthController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ApiKeyController } from './../controllers/ApiKeyController';
import { expressAuthentication } from './../utils/auth';
// @ts-ignore - no great way to install types from subpackage
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';

const expressAuthenticationRecasted = expressAuthentication as (req: ExRequest, securityName: string, scopes?: string[], res?: ExResponse) => Promise<any>;


// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "Record_string.number_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"double"},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Project": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
            "appId": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime"},
            "category": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["web"]},{"dataType":"enum","enums":["h5"]},{"dataType":"enum","enums":["miniapp"]},{"dataType":"enum","enums":["backend"]}],"required":true},
            "status": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["active"]},{"dataType":"enum","enums":["inactive"]}],"required":true},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"JsErrorLog"},"required":true},
            "performanceLog": {"dataType":"array","array":{"dataType":"refObject","ref":"PerformanceLog"},"required":true},
            "apiKeys": {"dataType":"array","array":{"dataType":"refObject","ref":"ApiKey"}},
            "user": {"ref":"User","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "JsErrorLog": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "url": {"dataType":"string","required":true},
            "projectId": {"dataType":"double"},
            "lang": {"dataType":"string"},
            "userAgent": {"dataType":"string","required":true},
            "os": {"dataType":"string"},
            "browser": {"dataType":"string"},
            "deviceType": {"dataType":"string"},
            "ip": {"dataType":"string"},
            "country": {"dataType":"string"},
            "region": {"dataType":"string"},
            "city": {"dataType":"string"},
            "message": {"dataType":"string"},
            "payload": {"ref":"Record_string.number_"},
            "clientTimestamp": {"dataType":"double"},
            "project": {"ref":"Project","required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PerformanceLog": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "url": {"dataType":"string","required":true},
            "projectId": {"dataType":"double"},
            "lang": {"dataType":"string"},
            "userAgent": {"dataType":"string","required":true},
            "os": {"dataType":"string"},
            "browser": {"dataType":"string"},
            "deviceType": {"dataType":"string"},
            "ip": {"dataType":"string"},
            "country": {"dataType":"string"},
            "region": {"dataType":"string"},
            "city": {"dataType":"string"},
            "payload": {"ref":"Record_string.number_"},
            "clientTimestamp": {"dataType":"double"},
            "project": {"ref":"Project","required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiKey": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "projectId": {"dataType":"double","required":true},
            "key": {"dataType":"string","required":true},
            "status": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["enabled"]},{"dataType":"enum","enums":["disabled"]}],"required":true},
            "label": {"dataType":"string"},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
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
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"double"},"name":{"dataType":"string"},"appId":{"dataType":"string"},"createdAt":{"dataType":"datetime"},"updatedAt":{"dataType":"datetime"},"category":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["web"]},{"dataType":"enum","enums":["h5"]},{"dataType":"enum","enums":["miniapp"]},{"dataType":"enum","enums":["backend"]}]},"status":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["active"]},{"dataType":"enum","enums":["inactive"]}]},"errors":{"dataType":"array","array":{"dataType":"refObject","ref":"JsErrorLog"}},"performanceLog":{"dataType":"array","array":{"dataType":"refObject","ref":"PerformanceLog"}},"apiKeys":{"dataType":"array","array":{"dataType":"refObject","ref":"ApiKey"}},"user":{"ref":"User"}},"validators":{}},
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
    "Record_string.any_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_PerformanceLog_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"double"},"url":{"dataType":"string"},"projectId":{"dataType":"double"},"lang":{"dataType":"string"},"userAgent":{"dataType":"string"},"os":{"dataType":"string"},"browser":{"dataType":"string"},"deviceType":{"dataType":"string"},"ip":{"dataType":"string"},"country":{"dataType":"string"},"region":{"dataType":"string"},"city":{"dataType":"string"},"payload":{"ref":"Record_string.number_"},"clientTimestamp":{"dataType":"double"},"project":{"ref":"Project"},"createdAt":{"dataType":"datetime"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ServiceResponse_PerformanceLog-Array-or-null_": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "data": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"PerformanceLog"}},{"dataType":"enum","enums":[null]}]},
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
    "Partial_JsErrorLog_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"double"},"url":{"dataType":"string"},"projectId":{"dataType":"double"},"lang":{"dataType":"string"},"userAgent":{"dataType":"string"},"os":{"dataType":"string"},"browser":{"dataType":"string"},"deviceType":{"dataType":"string"},"ip":{"dataType":"string"},"country":{"dataType":"string"},"region":{"dataType":"string"},"city":{"dataType":"string"},"message":{"dataType":"string"},"payload":{"ref":"Record_string.number_"},"clientTimestamp":{"dataType":"double"},"project":{"ref":"Project"},"createdAt":{"dataType":"datetime"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ServiceResponse_JsErrorLog-Array-or-null_": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "data": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"JsErrorLog"}},{"dataType":"enum","enums":[null]}]},
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
    "ServiceResponse_ApiKey-or-null_": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "data": {"dataType":"union","subSchemas":[{"ref":"ApiKey"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ServiceResponse_ApiKey-Array-or-null_": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "data": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"ApiKey"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ServiceResponse_any_": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "data": {"dataType":"any"},
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
                body: {"in":"body","name":"body","required":true,"ref":"Record_string.any_"},
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
        const argsPerformanceController_batchReport: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"dataType":"array","array":{"dataType":"refAlias","ref":"Partial_PerformanceLog_"}},
        };
        app.post('/report/performance/batch',
            ...(fetchMiddlewares<RequestHandler>(PerformanceController)),
            ...(fetchMiddlewares<RequestHandler>(PerformanceController.prototype.batchReport)),

            async function PerformanceController_batchReport(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPerformanceController_batchReport, request, response });

                const controller = new PerformanceController();

              await templateService.apiHandler({
                methodName: 'batchReport',
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
        const argsPerformanceController_listPerformanceLogs: Record<string, TsoaRoute.ParameterSchema> = {
                projectId: {"in":"query","name":"projectId","dataType":"double"},
                limit: {"default":50,"in":"query","name":"limit","dataType":"double"},
                url: {"in":"query","name":"url","dataType":"string"},
                deviceType: {"in":"query","name":"deviceType","dataType":"string"},
                os: {"in":"query","name":"os","dataType":"string"},
                browser: {"in":"query","name":"browser","dataType":"string"},
                country: {"in":"query","name":"country","dataType":"string"},
                startTime: {"in":"query","name":"startTime","dataType":"string"},
                endTime: {"in":"query","name":"endTime","dataType":"string"},
        };
        app.get('/report/performance/list',
            ...(fetchMiddlewares<RequestHandler>(PerformanceController)),
            ...(fetchMiddlewares<RequestHandler>(PerformanceController.prototype.listPerformanceLogs)),

            async function PerformanceController_listPerformanceLogs(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPerformanceController_listPerformanceLogs, request, response });

                const controller = new PerformanceController();

              await templateService.apiHandler({
                methodName: 'listPerformanceLogs',
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
        const argsJsErrorController_report: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"Record_string.any_"},
        };
        app.post('/report/jsErrorLog',
            ...(fetchMiddlewares<RequestHandler>(JsErrorController)),
            ...(fetchMiddlewares<RequestHandler>(JsErrorController.prototype.report)),

            async function JsErrorController_report(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsJsErrorController_report, request, response });

                const controller = new JsErrorController();

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
        const argsJsErrorController_batchReport: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"dataType":"array","array":{"dataType":"refAlias","ref":"Partial_JsErrorLog_"}},
        };
        app.post('/report/jsErrorLog/batch',
            ...(fetchMiddlewares<RequestHandler>(JsErrorController)),
            ...(fetchMiddlewares<RequestHandler>(JsErrorController.prototype.batchReport)),

            async function JsErrorController_batchReport(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsJsErrorController_batchReport, request, response });

                const controller = new JsErrorController();

              await templateService.apiHandler({
                methodName: 'batchReport',
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
        const argsJsErrorController_listPerformanceLogs: Record<string, TsoaRoute.ParameterSchema> = {
                projectId: {"in":"query","name":"projectId","dataType":"double"},
                limit: {"default":50,"in":"query","name":"limit","dataType":"double"},
                url: {"in":"query","name":"url","dataType":"string"},
                deviceType: {"in":"query","name":"deviceType","dataType":"string"},
                os: {"in":"query","name":"os","dataType":"string"},
                browser: {"in":"query","name":"browser","dataType":"string"},
                country: {"in":"query","name":"country","dataType":"string"},
                startTime: {"in":"query","name":"startTime","dataType":"string"},
                endTime: {"in":"query","name":"endTime","dataType":"string"},
        };
        app.get('/report/jsErrorLog/list',
            ...(fetchMiddlewares<RequestHandler>(JsErrorController)),
            ...(fetchMiddlewares<RequestHandler>(JsErrorController.prototype.listPerformanceLogs)),

            async function JsErrorController_listPerformanceLogs(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsJsErrorController_listPerformanceLogs, request, response });

                const controller = new JsErrorController();

              await templateService.apiHandler({
                methodName: 'listPerformanceLogs',
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
        const argsApiKeyController_create: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"label":{"dataType":"string","required":true},"appId":{"dataType":"double","required":true}}},
        };
        app.post('/apikeys',
            ...(fetchMiddlewares<RequestHandler>(ApiKeyController)),
            ...(fetchMiddlewares<RequestHandler>(ApiKeyController.prototype.create)),

            async function ApiKeyController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsApiKeyController_create, request, response });

                const controller = new ApiKeyController();

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
        const argsApiKeyController_list: Record<string, TsoaRoute.ParameterSchema> = {
                appId: {"in":"query","name":"appId","required":true,"dataType":"double"},
        };
        app.get('/apikeys',
            ...(fetchMiddlewares<RequestHandler>(ApiKeyController)),
            ...(fetchMiddlewares<RequestHandler>(ApiKeyController.prototype.list)),

            async function ApiKeyController_list(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsApiKeyController_list, request, response });

                const controller = new ApiKeyController();

              await templateService.apiHandler({
                methodName: 'list',
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
        const argsApiKeyController_toggle: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"status":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["enabled"]},{"dataType":"enum","enums":["disabled"]}],"required":true}}},
        };
        app.patch('/apikeys/:id/status',
            ...(fetchMiddlewares<RequestHandler>(ApiKeyController)),
            ...(fetchMiddlewares<RequestHandler>(ApiKeyController.prototype.toggle)),

            async function ApiKeyController_toggle(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsApiKeyController_toggle, request, response });

                const controller = new ApiKeyController();

              await templateService.apiHandler({
                methodName: 'toggle',
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
        const argsApiKeyController_remove: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.delete('/apikeys/:id',
            ...(fetchMiddlewares<RequestHandler>(ApiKeyController)),
            ...(fetchMiddlewares<RequestHandler>(ApiKeyController.prototype.remove)),

            async function ApiKeyController_remove(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsApiKeyController_remove, request, response });

                const controller = new ApiKeyController();

              await templateService.apiHandler({
                methodName: 'remove',
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

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
