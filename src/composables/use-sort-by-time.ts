import { orderBy, query, type CollectionReference } from "firebase/firestore";

/**
 * Use to sort firebase collection by timestamp ( createdAt ).
 * 
 * @param collection - collection Ref
 * @returns 
 */

export function useSortByTime(collection: CollectionReference) {
    return query(collection, orderBy('createdAt', 'desc'));
}