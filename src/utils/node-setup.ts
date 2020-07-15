import { IFbpNode, IFbpNodeUI } from '../types/node';

const UI_POSITION = {left: 50, top: 50 };

// export function prefillWithDefaults(node: IFbpNode = {}): IFbpNode {
// 	return {
// 		...node,
// 		ui: ui(node),
// 		...(!node.sockets && { sockets: {}})
// 	};
// }

function ui(node: IFbpNode): IFbpNodeUI {
	const out = {...(node.ui || { position: { ...UI_POSITION }}) };

	if (!out.position) {
		out.position = { ...UI_POSITION };
	}

	return out;
}