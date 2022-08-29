"use strict";
import {
	Diagnostic,
	DiagnosticSeverity, Range, Position
} from 'vscode-languageserver/node';

export function CreateDiagnostic(params){
	switch(params.test){
		case 'invalidSyntax':
			return createSyntaxError(params);
		case 'invalidKey':
		case 'invalidCardData':
		case 'duplicateData':
			return null;
		default:
			return null;
	}
}
function createSyntaxError(params){
	const message = `${params.text} is not a valid syntax`;
	const additional_message = `Please remove the invalid text, or surround it with quotation marks`
	const s = Position.create(params.line_num,params.index);
	const e = Position.create(params.line_num,params.index+params.length);
	const r = Range.create(s,e);
	return CreateErrorDiagnostic(message,r,DiagnosticSeverity.Error,additional_message)
}
/**
 *	Creates the standard error diagnostic that is returned to the validator
 * @param arg The argument that will be highlighted with the provided diagnostic information
 * @param message The message that will appear in the terminal and during hover-over
 * @param severity The severity type of the diagnostic
 * @param additional_message Additional information that will be displayed only during hover-over
 */
function CreateErrorDiagnostic(message, location, severity, additional_message) {
	let diagnostic = {
			severity: severity,
			range:location,
			message: message,
			source: 'serpent',
	};
	// Additional Information
	if (additional_message != undefined && additional_message != "") {
			diagnostic.relatedInformation = [
					{
							location: {
									uri: "",
									range: Object.assign({}, diagnostic.range)
							},
							message: additional_message
					}
			];
	}
	return diagnostic;
}
export class SerpentArgumentException extends Error {
    constructor(arg, message, additional_message, severity) {
        super();
        if (!severity)
            severity = DiagnosticSeverity.Error;
        this.diagnostic = CreateErrorDiagnostic(arg, message, severity, additional_message);
    }
}

export class SerpentException extends Error {
    constructor(message, additional_message, severity_input) {
        super();
        if (!severity_input)
            this.severity = DiagnosticSeverity.Error;
        else
            this.severity = severity_input;
        this.stack = message;
        this.additional_message = additional_message;
    }
    CreateArgumentException(arg) {
        return new SerpentArgumentException(arg, this.stack, this.additional_message, this.severity);
    }
}

