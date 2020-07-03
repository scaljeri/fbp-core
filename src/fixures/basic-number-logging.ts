import { FbpSocketTypes, FbpSocketPositions } from '../constants'
import { IFbpState } from '../types/state'

const stateBasic: IFbpState = {
	name: 'Random number logging',
	nodes: {
		rnd: {
			id: 'rnd',
			type: 'random-number-generator',
			sockets: {
				[FbpSocketPositions.RIGHT]: {
					items: [{
						id: 'sock-1',
						type: FbpSocketTypes.OUT,
						dataTypes: ['number']
					}]
				}
			},
			ui: {
				position :{
					left: 50, top: 50
				}
			}
		},
		log: {
			id: 'log',
			type: 'logger',
			sockets: {
				[FbpSocketPositions.LEFT]: {
					items: [
						{
							id: 'sock-2',
							label: 'Input 1',
							type: FbpSocketTypes.IN,
							dataTypes: ['number']
						}
					]
				},
				[FbpSocketPositions.RIGHT]: {
					items: [
						{
							id: 'sock-2',
							label: 'Output 1',
							type: FbpSocketTypes.OUT,
							dataTypes: ['number']
						}
					]
				}
			}
		},
	},
	connections: {}
}

export { stateBasic }