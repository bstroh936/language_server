/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import {
	createConnection,
	TextDocuments,
	Diagnostic,
	DiagnosticSeverity,
	ProposedFeatures,
	InitializeParams,
	DidChangeConfigurationNotification,
	CompletionItem,
	CompletionItemKind,
	TextDocumentPositionParams,
	TextDocumentSyncKind,
	InitializeResult,
	DiagnosticRelatedInformation, Range, MarkupContent, MarkupKind
} from 'vscode-languageserver/node';

import {
	TextDocument
} from 'vscode-languageserver-textdocument';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {FileManager } from './file/manager';
import { ReadBuffer } from './file/reader';
import { connect } from 'http2';
// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = createConnection(ProposedFeatures.all);
// Create a simple text document manager.
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);
const file = new FileManager();
let hasConfigurationCapability = false;
let hasWorkspaceFolderCapability = false;
let hasDiagnosticRelatedInformationCapability = false;

connection.onInitialize((params: InitializeParams) => {
	const capabilities = params.capabilities;
	const ini_params = params.initializationOptions;
	connection.console.log(`LSP provided init options:\n${JSON.stringify(ini_params)}`);
	// Does the client support the `workspace/configuration` request?
	// If not, we fall back using global settings.
	hasConfigurationCapability = !!(
		capabilities.workspace && !!capabilities.workspace.configuration
	);
	hasWorkspaceFolderCapability = !!(
		capabilities.workspace && !!capabilities.workspace.workspaceFolders
	);
	hasDiagnosticRelatedInformationCapability = !!(
		capabilities.textDocument &&
		capabilities.textDocument.publishDiagnostics &&
		capabilities.textDocument.publishDiagnostics.relatedInformation
	);

	const result: InitializeResult = {
		capabilities: {
			hoverProvider : true,
			textDocumentSync: TextDocumentSyncKind.Incremental,
			// Tell the client that this server supports code completion.
			completionProvider: {
				resolveProvider: true
			}/*,
			semanticTokensProvider:{
				legend:{
					tokenTypes:['cell','mat','disp'],
					tokenModifiers:['readonly']
				},
				range:true,
				full:{delta:true}
			}*/
		}
	};
	if (hasWorkspaceFolderCapability) {
		result.capabilities.workspace = {
			workspaceFolders: {
				supported: true
			}
		};
	}
	return result;
});

connection.onInitialized(() => {
	
	if (hasConfigurationCapability) {
		// Register for all configuration changes.
		connection.client.register(DidChangeConfigurationNotification.type, undefined);
	}
	if (hasWorkspaceFolderCapability) {
		connection.workspace.onDidChangeWorkspaceFolders(_event => {
			connection.console.log('Workspace folder change event received.');
		});
	}
});

// The example settings
export interface ExampleSettings {
	maxNumberOfProblems: number;
}

connection.onHover((params) => {
	const content: MarkupContent = {
			kind: MarkupKind.Markdown,
			value: `**hello**`,
	};

	return {
			contents: content,
	};
});
// The global settings, used when the `workspace/configuration` request is not supported by the client.
// Please note that this is not the case when using this server with the client provided in this example
// but could happen with other clients.
const defaultSettings: ExampleSettings = { maxNumberOfProblems: 1000 };
let globalSettings: ExampleSettings = defaultSettings;

// Cache the settings of all open documents
const documentSettings: Map<string, Thenable<ExampleSettings>> = new Map();

connection.onDidChangeConfiguration(change => {
	if (hasConfigurationCapability) {
		// Reset all cached document settings
		documentSettings.clear();
	} else {
		globalSettings = <ExampleSettings>
			(change.settings.serpentlanguageServer || defaultSettings);
	}

	// Revalidate all open text documents
	
});

function getDocumentSettings(resource: string): Thenable<ExampleSettings> {
	if (!hasConfigurationCapability) {
		return Promise.resolve(globalSettings);
	}
	let result = documentSettings.get(resource);
	if (!result) {
		result = connection.workspace.getConfiguration({
			scopeUri: resource,
			section: 'serpentlanguageServer'
		});
		documentSettings.set(resource, result);
	}
	return result;
}

// Only keep settings for open documents
documents.onDidClose(e => {
	documentSettings.delete(e.document.uri);
});


interface DiagnosticData {	
	severity:DiagnosticSeverity,
	range: Range,
	message:string,
	source:string,
	relatedInformation?: DiagnosticRelatedInformation[]
}
export function readDiagnosticInput(diagnosticData:Array<DiagnosticData>): Diagnostic[]{
	const diagnostics: Diagnostic[] = [];
	
	for (const d of diagnosticData){
		
		const diagnostic: Diagnostic = {
			severity: d.severity,
			range:  d.range,
			message: d.message,
			source: d.source
		}
		if(d.relatedInformation!==undefined){
			diagnostic.relatedInformation = d.relatedInformation;
		}
		diagnostics.push(diagnostic)
	}	
	return diagnostics;
}

connection.onDidChangeWatchedFiles(_change => {
	// Monitored files have change in VSCode
	connection.console.log('We received an file change event');
});
connection.onDidOpenTextDocument((params) => {
	// A text document was opened in VS Code.
	// params.uri uniquely identifies the document. For documents stored on disk, this is a file URI.
	// params.text the initial full content of the document.
	
	const doc = params.textDocument;	
	file.ActiveFile = params.textDocument.uri;
	file.AddNewFile = doc;

	const diagnostics = file.DiagnosticTokens;	
	connection.sendDiagnostics({ uri: params.textDocument.uri, diagnostics });
});

connection.onDidChangeTextDocument((params) => {
	// The content of a text document has change in VS Code.
	// params.uri uniquely identifies the document.
	// params.contentChanges describe the content changes to the document.		
	
	ReadBuffer.WriteToBuffer(params);
	file.IncrementalUpdate = params;
	const diagnostics = file.DiagnosticTokens;	
	connection.sendDiagnostics({ uri: params.textDocument.uri, diagnostics });
});

connection.onDidCloseTextDocument((params) => {
	// A text document was closed in VS Code.
	// params.uri uniquely identifies the document.
	
	documentSettings.delete(params.textDocument.uri)	
});

// This handler provides the initial list of the completion items.

connection.onCompletion(
	(_textDocumentPosition: TextDocumentPositionParams): CompletionItem[] => {
		// The pass parameter contains the position of the text document in
		// which code complete got requested. For the example we ignore this
		// info and always provide the same completion items.
		return [
			{
				label: 'TypeScript',
				kind: CompletionItemKind.Text,
				data: 1
			},
			{
				label: 'JavaScript',
				kind: CompletionItemKind.Text,
				data: 2
			}
		];
	}
);

// This handler resolves additional information for the item selected in
// the completion list.
connection.onCompletionResolve(
	(item: CompletionItem): CompletionItem => {
		if (item.data === 1) {
			item.detail = 'TypeScript details';
			item.documentation = 'TypeScript documentation';
		} else if (item.data === 2) {
			item.detail = 'JavaScript details';
			item.documentation = 'JavaScript documentation';
		}
		return item;
	}
);
// Make the text document manager listen on the connection
// for open, change and close text document events
//documents.listen(connection);

// Listen on the connection
connection.listen();