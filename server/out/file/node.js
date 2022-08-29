"use strict";
class AbstractNode {
}
class OpNode extends AbstractNode {
    constructor(op, nodes) {
        super();
        this.token = op;
        this.parameters = nodes;
    }
}
//# sourceMappingURL=node.js.map