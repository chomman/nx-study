import { IFormattedNode } from '../interface';
import { ICoreNode } from '../../api-interface';


export const getFormattedNode = (node: ICoreNode): IFormattedNode => ({
  id: node.id,
  value: node.name ?? 'not-sure-why-there-is-no-name',
})
