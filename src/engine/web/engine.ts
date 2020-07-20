import { IFbpNodeWorkerStatic } from '../../types';
import { FbpNodeManager } from '../fbp-node-manager';
import { AsyncNodeRunner } from './async-node-runner';

FbpNodeManager.asyncNode = AsyncNodeRunner as IFbpNodeWorkerStatic;