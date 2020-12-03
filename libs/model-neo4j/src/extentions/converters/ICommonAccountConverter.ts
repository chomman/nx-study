import { ITransaction } from '../../api-interface';
import { IAccountLinkedNodeMeta, IAccountLinkRequest } from '../';

export interface ICommonAccountConverter {
  convertTransactionToAccountLink: (
    transaction: ITransaction,
    transactionAmount: number
  ) => IAccountLinkedNodeMeta;
  convertToAccountLinkResponse: (
    currentTransaction: ITransaction,
    transactionUpdateRequest: ITransaction,
    linkingRelationship: string,
    currentTransactionAmount: number,
    updatedTransactionRequestAmount: number
  ) => IAccountLinkRequest;
}
