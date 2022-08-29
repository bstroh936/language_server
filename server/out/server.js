"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readDiagnosticInput = void 0;
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
const node_1 = require("vscode-languageserver/node");
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const manager_1 = require("./file/manager");
const reader_1 = require("./file/reader");
// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = (0, node_1.createConnection)(node_1.ProposedFeatures.all);
// Create a simple text document manager.
const documents = new node_1.TextDocuments(vscode_languageserver_textdocument_1.TextDocument);
const file = new manager_1.FileManager();
let hasConfigurationCapability = false;
let hasWorkspaceFolderCapability = false;
let hasDiagnosticRelatedInformationCapability = false;
connection.onInitialize((params) => {
    const capabilities = params.capabilities;
    const ini_params = params.initializationOptions;
    connection.console.log(`LSP provided init options:\n${JSON.stringify(ini_params)}`);
    // Does the client support the `workspace/configuration` request?
    // If not, we fall back using global settings.
    hasConfigurationCapability = !!(capabilities.workspace && !!capabilities.workspace.configuration);
    hasWorkspaceFolderCapability = !!(capabilities.workspace && !!capabilities.workspace.workspaceFolders);
    hasDiagnosticRelatedInformationCapability = !!(capabilities.textDocument &&
        capabilities.textDocument.publishDiagnostics &&
        capabilities.textDocument.publishDiagnostics.relatedInformation);
    const result = {
        capabilities: {
            hoverProvider: true,
            textDocumentSync: node_1.TextDocumentSyncKind.Incremental,
            // Tell the client that this server supports code completion.
            completionProvider: {
                resolveProvider: true
            } /*,
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
        connection.client.register(node_1.DidChangeConfigurationNotification.type, undefined);
    }
    if (hasWorkspaceFolderCapability) {
        connection.workspace.onDidChangeWorkspaceFolders(_event => {
            connection.console.log('Workspace folder change event received.');
        });
    }
});
connection.onHover((params) => {
    const content = {
        kind: node_1.MarkupKind.Markdown,
        value: `**hello**`,
    };
    return {
        contents: content,
    };
});
// The global settings, used when the `workspace/configuration` request is not supported by the client.
// Please note that this is not the case when using this server with the client provided in this example
// but could happen with other clients.
const defaultSettings = { maxNumberOfProblems: 1000 };
let globalSettings = defaultSettings;
// Cache the settings of all open documents
const documentSettings = new Map();
connection.onDidChangeConfiguration(change => {
    if (hasConfigurationCapability) {
        // Reset all cached document settings
        documentSettings.clear();
    }
    else {
        globalSettings = (change.settings.serpentlanguageServer || defaultSettings);
    }
    // Revalidate all open text documents
});
function getDocumentSettings(resource) {
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
function readDiagnosticInput(diagnosticData) {
    const diagnostics = [];
    for (const d of diagnosticData) {
        const diagnostic = {
            severity: d.severity,
            range: d.range,
            message: d.message,
            source: d.source
        };
        if (d.relatedInformation !== undefined) {
            diagnostic.relatedInformation = d.relatedInformation;
        }
        diagnostics.push(diagnostic);
    }
    return diagnostics;
}
exports.readDiagnosticInput = readDiagnosticInput;
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
    reader_1.ReadBuffer.WriteToBuffer(params);
    file.IncrementalUpdate = params;
    const diagnostics = file.DiagnosticTokens;
    connection.sendDiagnostics({ uri: params.textDocument.uri, diagnostics });
});
connection.onDidCloseTextDocument((params) => {
    // A text document was closed in VS Code.
    // params.uri uniquely identifies the document.
    documentSettings.delete(params.textDocument.uri);
});
// This handler provides the initial list of the completion items.
connection.onCompletion((_textDocumentPosition) => {
    // The pass parameter contains the position of the text document in
    // which code complete got requested. For the example we ignore this
    // info and always provide the same completion items.
    return [
        {
            label: 'TypeScript',
            kind: node_1.CompletionItemKind.Text,
            data: 1
        },
        {
            label: 'JavaScript',
            kind: node_1.CompletionItemKind.Text,
            data: 2
        }
    ];
});
// This handler resolves additional information for the item selected in
// the completion list.
connection.onCompletionResolve((item) => {
    if (item.data === 1) {
        item.detail = 'TypeScript details';
        item.documentation = 'TypeScript documentation';
    }
    else if (item.data === 2) {
        item.detail = 'JavaScript details';
        item.documentation = 'JavaScript documentation';
    }
    return item;
});
// Make the text document manager listen on the connection
// for open, change and close text document events
//documents.listen(connection);
// Listen on the connection
connection.listen();
//# sourceMappingURL=server.js.map