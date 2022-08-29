"use strict";
import { Token } from "./base_token";
export class CommandToken extends Token {	
}
class GeometryToken extends CommandToken {}
class MaterialToken extends CommandToken {}
class DetectorToken extends CommandToken {}
class SourceToken extends CommandToken {}
class PlotterToken extends CommandToken {}
class SpecialToken extends CommandToken {}