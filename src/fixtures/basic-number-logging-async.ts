import { FbpSocketTypes, FbpSocketPositions } from '../constants'
import { IFbpState } from '../types/state'
import { IFbpConnection } from '../types/connection'

const stateBasicAsync: IFbpState = {
	name: 'Random number logging',
	nodes: {
		rnd: {
			id: 'rnd',
			type: 'random-number-generator',
			async: true,
			sockets: [
				{
					id: 'sock-1',
					type: FbpSocketTypes.OUT,
					dataType: 'number',
					side: FbpSocketPositions.RIGHT,
				}
			],
			ui: {
				position: {
					left: 20, top: 30
				}
			}
		},
		log: {
			id: 'log',
			async: true,
			ui: {
				position: {
					left: 60, top: 70
				}
			},
			type: 'logger',
			sockets: [
				{
					id: 'sock-2',
					label: 'Input 1',
					type: FbpSocketTypes.IN,
					dataType: 'number',
					side: FbpSocketPositions.LEFT,
				},
				{
					id: 'sock-3',
					label: 'Output 1',
					type: FbpSocketTypes.OUT,
					dataType: 'number',
					side: FbpSocketPositions.RIGHT
				}
			]
		},
	},
	connections: {
		main: [
			{ 
				id: 'conn-a', 
				from: 'sock-1',
				fromNodeId: 'rnd',
				to: 'sock-2',
				toNodeId: 'log',
				dataType: 'number'
			} as IFbpConnection
		]
	}
}

export { stateBasicAsync }